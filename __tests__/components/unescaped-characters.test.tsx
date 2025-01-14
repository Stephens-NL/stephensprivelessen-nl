import fs from 'fs';
import path from 'path';

describe('React Components', () => {
  const componentsDir = path.join(process.cwd(), 'components');
  const unescapedCharRegex = /(?<!="){"|'(?!'s|'t|'m|'ll|'ve|'re|'d)/g;

  const getAllFiles = (dir: string): string[] => {
    const files = fs.readdirSync(dir);
    const allFiles: string[] = [];

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        allFiles.push(...getAllFiles(filePath));
      } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
        allFiles.push(filePath);
      }
    });

    return allFiles;
  };

  const getUnescapedCharacters = (content: string): { line: number; char: string; context: string }[] => {
    const lines = content.split('\n');
    const issues: { line: number; char: string; context: string }[] = [];

    lines.forEach((line, index) => {
      const matches = line.match(unescapedCharRegex);
      if (matches) {
        matches.forEach(match => {
          // Skip if the quote is part of a JSX attribute
          if (!line.includes('={') && !line.includes('="') && !line.includes("='")) {
            issues.push({
              line: index + 1,
              char: match,
              context: line.trim()
            });
          }
        });
      }
    });

    return issues;
  };

  test('components should not contain unescaped quotes', () => {
    const componentFiles = getAllFiles(componentsDir);
    const issues: { file: string; issues: { line: number; char: string; context: string }[] }[] = [];

    componentFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf-8');
      const fileIssues = getUnescapedCharacters(content);

      if (fileIssues.length > 0) {
        issues.push({
          file: path.relative(process.cwd(), file),
          issues: fileIssues
        });
      }
    });

    const formatIssues = () => {
      if (issues.length === 0) return '';

      return '\n\nFound unescaped characters in the following files:\n' +
        issues.map(({ file, issues }) => 
          `\n${file}:\n` +
          issues.map(issue => 
            `  Line ${issue.line}: Found unescaped ${issue.char} in:\n    ${issue.context}\n` +
            `    Fix: Replace ${issue.char} with ${issue.char === '"' ? '&quot;' : '&apos;'}`
          ).join('\n')
        ).join('\n');
    };

    expect(issues).toEqual([], formatIssues());
  });

  test('should provide helpful suggestions for fixing unescaped characters', () => {
    const sampleContent = `
      <div>This is a "quote" that needs escaping</div>
      <div>Here's a valid contraction</div>
      <div className="valid-attribute">Valid attribute</div>
      <div>Another "quote" to fix</div>
    `;

    const issues = getUnescapedCharacters(sampleContent);
    
    expect(issues).toHaveLength(2);
    expect(issues[0].char).toBe('"');
    expect(issues[0].context).toContain('This is a "quote"');
    expect(issues[1].char).toBe('"');
    expect(issues[1].context).toContain('Another "quote"');
  });
}); 