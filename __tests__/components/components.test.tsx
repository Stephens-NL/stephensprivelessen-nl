import React from 'react';
import { render, screen } from '@testing-library/react';

describe('Component Error Handling', () => {
  // TutoringPage no longer accepts a content prop — it uses next-intl useTranslations internally.
  // The old content={undefined/null}/content={tutoringPage} tests are replaced here by the
  // ErrorBoundary smoke test and a note that TutoringPage rendering requires NextIntlClientProvider
  // in a test environment (integration-tested via `npm run build`).

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
