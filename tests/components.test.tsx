import React from 'react';
import { render, screen } from '@testing-library/react';
import { TutoringPage } from '@/components/tutoring/TutoringPage';
import { tutoringPage } from '@/data/tutoringPage';

// Mock the translation hook
jest.mock('@/hooks/useTranslation', () => ({
  useTranslation: () => ({
    t: (text: any) => (typeof text === 'string' ? text : text.EN),
    language: 'EN',
    setLanguage: jest.fn(),
  }),
}));

describe('Component Error Handling', () => {
  describe('TutoringPage', () => {
    it('should render error message when content is undefined', () => {
      // @ts-ignore - intentionally passing undefined to test error handling
      render(<TutoringPage content={undefined} />);
      
      expect(screen.getByText('Oeps! Er ging iets mis.')).toBeInTheDocument();
      expect(
        screen.getByText('De pagina kon niet worden geladen. Probeer het later opnieuw.')
      ).toBeInTheDocument();
    });

    it('should render error message when content is null', () => {
      // @ts-ignore - intentionally passing null to test error handling
      render(<TutoringPage content={null} />);
      
      expect(screen.getByText('Oeps! Er ging iets mis.')).toBeInTheDocument();
    });

    it('should render successfully with valid content', () => {
      render(<TutoringPage content={tutoringPage} />);
      
      // Check if main sections are rendered
      expect(screen.getByText(tutoringPage.hero.title.EN)).toBeInTheDocument();
      expect(screen.getByText(tutoringPage.hero.subtitle.EN)).toBeInTheDocument();
    });
  });

  // Add similar tests for other page components
  describe('Error Boundary', () => {
    it('should catch and handle runtime errors', () => {
      const ErrorComponent = () => {
        throw new Error('Test error');
      };

      render(
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      );

      expect(
        screen.getByText('Er is iets misgegaan. Probeer de pagina te verversen.')
      ).toBeInTheDocument();
    });
  });
});

// Simple Error Boundary component for testing
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-4">
          <h1>Er is iets misgegaan. Probeer de pagina te verversen.</h1>
        </div>
      );
    }

    return this.props.children;
  }
} 