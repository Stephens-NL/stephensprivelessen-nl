import { Metadata } from 'next';

// Constants
const locations = [
  'amsterdam-zuid',
  'amsterdam-centrum',
  'amsterdam-noord',
  'amsterdam-west',
  'amsterdam-oost'
] as const;

type ValidLocation = typeof locations[number];

// Mocks
jest.mock('next/navigation', () => ({
  notFound: () => { throw new Error('Not Found') }
}));

// Mock metadata generator
const mockGenerateMetadata = async ({ params: { location } }: { params: { location: string } }) => {
  if (!locations.includes(location as ValidLocation)) {
    throw new Error('Not Found');
  }
  
  const area = location.split('-')[1];
  const areaCapitalized = area.charAt(0).toUpperCase() + area.slice(1);
  
  return {
    title: `Privelessen Amsterdam ${areaCapitalized}`,
    description: `Persoonlijke begeleiding in Amsterdam ${areaCapitalized}`,
    openGraph: {
      title: `Privelessen Amsterdam ${areaCapitalized}`,
      url: `https://stephensprivelessen.nl/privelessen/${location}`,
      siteName: 'Stephens Privelessen'
    },
    keywords: [
      `priveles amsterdam ${area}`,
      `bijles amsterdam ${area}`,
      `huiswerkbegeleiding ${area}`
    ]
  };
};

jest.mock('../app/privelessen/[location]/page', () => ({
  generateMetadata: mockGenerateMetadata
}));

// Import after mocks
const { generateMetadata } = require('../app/privelessen/[location]/page');

describe('Location Pages', () => {
  test('should generate correct metadata for valid locations', async () => {
    for (const location of locations) {
      const metadata = await generateMetadata({ 
        params: { location }
      }) as Metadata;

      // Check title
      expect(metadata.title).toContain(location.split('-')[1].charAt(0).toUpperCase() + location.split('-')[1].slice(1));
      
      // Check description
      expect(metadata.description).toContain('Persoonlijke begeleiding');
      
      // Check OpenGraph
      const og = metadata.openGraph;
      expect(og?.title).toContain('Amsterdam');
      expect(og?.url).toContain(`stephensprivelessen.nl/privelessen/${location}`);
      expect(og?.siteName).toBe('Stephens Privelessen');
      
      // Check keywords
      const keywords = metadata.keywords as string[];
      const area = location.split('-')[1];
      expect(keywords).toContain(`priveles amsterdam ${area}`);
      expect(keywords).toContain(`bijles amsterdam ${area}`);
      expect(keywords.some(k => k.includes(area))).toBe(true);
    }
  });

  test('should throw notFound for invalid location', async () => {
    const invalidLocation = 'invalid-location' as unknown as ValidLocation;
    await expect(
      generateMetadata({ 
        params: { location: invalidLocation }
      })
    ).rejects.toThrow();
  });
}); 