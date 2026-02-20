import { Bilingual } from '@/data/types';

/**
 * Tests if a field has both EN and NL translations
 * @param field The bilingual field to test
 * @param path The path to the field (for error messages)
 */
function testBilingualContent<T>(field: Bilingual<T>, path: string = ''): void {
  const errorPrefix = path ? `${path}: ` : '';
  
  // Check if field exists
  expect(field).toBeDefined();
  expect(field).not.toBeNull();
  
  // Check if both languages exist
  expect(field).toHaveProperty('EN');
  expect(field).toHaveProperty('NL');
  
  // Check if values are of the same type
  expect(typeof field.EN).toBe(typeof field.NL);
  
  // For string translations, check if they're not empty
  if (typeof field.EN === 'string' && typeof field.NL === 'string') {
    expect((field.EN as string).trim()).not.toBe('');
    expect((field.NL as string).trim()).not.toBe('');
  }
  
  // For arrays, check if they have the same length
  if (Array.isArray(field.EN) && Array.isArray(field.NL)) {
    expect(field.EN.length).toBe(field.NL.length);
  }
}

/**
 * Recursively checks all translations in an object
 * @param obj The object to check
 * @param path The current path (for error messages)
 */
function checkAllTranslations(obj: any, path: string = ''): void {
  if (!obj) return;

  if (typeof obj === 'object' && !Array.isArray(obj)) {
    // Check if this is a translation object
    if ('EN' in obj && 'NL' in obj) {
      testBilingualContent(obj, path);
    } else {
      // Check nested objects
      Object.entries(obj).forEach(([key, value]) => {
        const newPath = path ? `${path}.${key}` : key;
        checkAllTranslations(value, newPath);
      });
    }
  } else if (Array.isArray(obj)) {
    // Check array items
    obj.forEach((item, index) => {
      checkAllTranslations(item, `${path}[${index}]`);
    });
  }
}

/**
 * Tests if a component's content has all required translations
 * @param content The content object to test
 * @param componentName The name of the component (for error messages)
 */
export function testComponentTranslations(content: any, componentName: string): void {
  try {
    checkAllTranslations(content, componentName);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Translation error in ${componentName}: ${error.message}`);
    }
    throw error;
  }
} 