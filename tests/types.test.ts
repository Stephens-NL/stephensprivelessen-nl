import { 
  Language, 
  BlogPost, 
  Workshop, 
  Service, 
  Question,
  FormResponse,
  WorkshopType,
  WorkshopLevel,
  WorkshopFormat,
  WorkshopSchedule,
  QuestionType,
  Bilingual
} from '@/data/types';

// Helper function to test bilingual fields
const testBilingualField = (field: Bilingual<any>) => {
  expect(field).toHaveProperty('EN');
  expect(field).toHaveProperty('NL');
};

// Type assertion tests
describe('Type Definitions', () => {
  describe('Language and Bilingual', () => {
    test('Language type should only accept EN or NL', () => {
      const validLanguages: Language[] = ['EN', 'NL'];
      // @ts-expect-error - Should error on invalid language
      const invalidLanguage: Language = 'FR';
      
      expect(validLanguages).toHaveLength(2);
    });

    test('Bilingual type should work with different value types', () => {
      const bilingualString: Bilingual = {
        EN: 'English',
        NL: 'Nederlands'
      };
      testBilingualField(bilingualString);

      const bilingualStringArray: Bilingual<string[]> = {
        EN: ['one', 'two'],
        NL: ['een', 'twee']
      };
      testBilingualField(bilingualStringArray);

      const bilingualObject: Bilingual<{count: number}> = {
        EN: { count: 1 },
        NL: { count: 1 }
      };
      testBilingualField(bilingualObject);
    });
  });

  describe('BlogPost', () => {
    test('BlogPost should handle required and optional properties', () => {
      // Minimal valid blog post
      const minimalBlogPost: BlogPost = {
        id: 1,
        title: {
          EN: 'Test Post',
          NL: 'Test Bericht'
        },
        content: {
          EN: 'Content in English',
          NL: 'Inhoud in Nederlands'
        },
        author: 'John Doe',
        date: '2024-03-20',
        tags: ['test']
      };
      expect(minimalBlogPost).toBeDefined();

      // Full blog post with optional properties
      const fullBlogPost: BlogPost = {
        ...minimalBlogPost,
        imageUrl: 'https://example.com/image.jpg',
        altText: {
          EN: 'Image description',
          NL: 'Afbeelding beschrijving'
        }
      };
      expect(fullBlogPost.imageUrl).toBeDefined();
      expect(fullBlogPost.altText).toBeDefined();
      testBilingualField(fullBlogPost.altText!);
    });
  });

  describe('Workshop', () => {
    test('Workshop enums should only accept valid values', () => {
      const validTypes: WorkshopType[] = ['academic', 'creative'];
      const validLevels: WorkshopLevel[] = ['beginner', 'intermediate', 'advanced', 'professional', 'all_levels'];
      const validFormats: WorkshopFormat[] = [
        'interactive', 'practical', 'technical', 'creative', 
        'professional', 'media', 'flexible', 'hands-on', 'wellness'
      ];
      const validSchedules: WorkshopSchedule[] = ['single', 'weekly', 'monthly'];

      // @ts-expect-error - Should error on invalid type
      const invalidType: WorkshopType = 'invalid';
      // @ts-expect-error - Should error on invalid level
      const invalidLevel: WorkshopLevel = 'expert';
      // @ts-expect-error - Should error on invalid format
      const invalidFormat: WorkshopFormat = 'invalid';
      // @ts-expect-error - Should error on invalid schedule
      const invalidSchedule: WorkshopSchedule = 'daily';

      const workshop: Workshop = {
        id: 'test-workshop',
        type: 'academic',
        title: { EN: 'Title', NL: 'Titel' },
        description: { EN: 'Desc', NL: 'Beschrijving' },
        durationMinutes: 60,
        durationText: { EN: '1 hour', NL: '1 uur' },
        level: 'beginner',
        format: 'interactive',
        details: { EN: ['Detail'], NL: ['Detail'] },
        price: { EN: '€100', NL: '€100' },
        maxParticipants: 10,
        prerequisites: { EN: 'None', NL: 'Geen' },
        materials: { EN: 'Laptop', NL: 'Laptop' },
        location: { EN: 'Online', NL: 'Online' },
        schedule: 'single'
      };

      expect(validTypes).toContain(workshop.type);
      expect(validLevels).toContain(workshop.level);
      expect(validFormats).toContain(workshop.format);
      expect(validSchedules).toContain(workshop.schedule);
    });

    test('Workshop should handle optional fields correctly', () => {
      const minimalWorkshop: Workshop = {
        id: 'minimal',
        type: 'academic',
        title: { EN: 'Title', NL: 'Titel' },
        description: { EN: 'Desc', NL: 'Beschrijving' },
        durationMinutes: 60,
        durationText: { EN: '1 hour', NL: '1 uur' },
        level: 'beginner',
        format: 'interactive',
        details: { EN: ['Detail'], NL: ['Detail'] },
        price: { EN: '€100', NL: '€100' },
        maxParticipants: 10,
        prerequisites: { EN: 'None', NL: 'Geen' },
        materials: { EN: 'Laptop', NL: 'Laptop' },
        location: { EN: 'Online', NL: 'Online' },
        schedule: 'single'
      };

      const fullWorkshop: Workshop = {
        ...minimalWorkshop,
        totalSessions: 4,
        minParticipants: 5,
        sessionStructure: 'series'
      };

      expect(minimalWorkshop.totalSessions).toBeUndefined();
      expect(fullWorkshop.totalSessions).toBe(4);
      expect(fullWorkshop.sessionStructure).toBe('series');
    });
  });

  describe('Question Types', () => {
    test('should support all question types with their specific properties', () => {
      const questionTypes: QuestionType[] = [
        'text', 'textarea', 'email', 'number', 
        'vakkenSelector', 'multipleChoice', 'rating'
      ];

      // Text Question
      const textQuestion: Question = {
        id: 'text1',
        type: 'text',
        label: { EN: 'Text', NL: 'Tekst' },
        required: true,
        placeholder: { EN: 'Enter', NL: 'Invoeren' }
      };
      expect(questionTypes).toContain(textQuestion.type);

      // Number Question with min/max
      const numberQuestion: Question = {
        id: 'num1',
        type: 'number',
        label: { EN: 'Number', NL: 'Nummer' },
        required: true,
        min: 0,
        max: 100
      };
      expect(numberQuestion.min).toBe(0);
      expect(numberQuestion.max).toBe(100);

      // Rating Question
      const ratingQuestion: Question = {
        id: 'rate1',
        type: 'rating',
        label: { EN: 'Rate', NL: 'Beoordeel' },
        required: true,
        max: 5
      };
      expect(ratingQuestion.max).toBe(5);

      // Conditional Question
      const conditionalQuestion: Question = {
        id: 'cond1',
        type: 'text',
        label: { EN: 'Conditional', NL: 'Voorwaardelijk' },
        required: true,
        conditional: {
          dependsOn: 'otherQuestion',
          showIf: 'yes'
        }
      };
      expect(conditionalQuestion.conditional).toBeDefined();
      expect(conditionalQuestion.conditional?.dependsOn).toBe('otherQuestion');
    });
  });

  describe('FormResponse', () => {
    test('should handle complex nested response structures', () => {
      const complexResponse: FormResponse = {
        id: 'response-1',
        formId: 'complex-form',
        respondentId: 'user123',
        responses: {
          text: 'Simple text',
          numbers: '1,2,3',
          rating: 5,
          multiSelect: ['option1', 'option2'],
          customData: {
            key1: 'value1',
            key2: 42
          }
        },
        timestamp: new Date()
      };

      expect(complexResponse.id).toBe('response-1');
      expect(complexResponse.formId).toBe('complex-form');
      expect(typeof complexResponse.responses.numbers).toBe('string');
      expect(typeof complexResponse.responses.rating).toBe('number');
      expect(Array.isArray(complexResponse.responses.multiSelect)).toBe(true);
      expect(typeof complexResponse.responses.customData).toBe('object');
      expect(complexResponse.timestamp).toBeInstanceOf(Date);
    });
  });
}); 