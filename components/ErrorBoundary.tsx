'use client';

import React from 'react';
import { Button } from './ui/button';
import { useTranslations } from 'next-intl';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorBoundaryContent
          error={this.state.error}
          onRefresh={() => window.location.reload()}
          onHome={() => window.location.href = '/'}
        />
      );
    }

    return this.props.children;
  }
}

interface ErrorBoundaryContentProps {
  error?: Error;
  onRefresh: () => void;
  onHome: () => void;
}

const ErrorBoundaryContent: React.FC<ErrorBoundaryContentProps> = ({ error, onRefresh, onHome }) => {
  const t = useTranslations('errors');

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--cream)]">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-2xl font-bold font-display text-[var(--ink)] mb-4">
          {t('error.title')}
        </h1>
        <p className="text-[var(--muted-text)] mb-6">
          {t('error.defaultMessage')}
        </p>
        {error && (
          <pre className="bg-[var(--cream-dark)] p-4 rounded-lg text-sm text-[var(--warm-text)] mb-6 overflow-auto">
            {error.message}
          </pre>
        )}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={onRefresh}
            variant="outline"
          >
            {t('error.tryAgain')}
          </Button>
          <Button
            onClick={onHome}
          >
            {t('notFound.returnHome')}
          </Button>
        </div>
      </div>
    </div>
  );
};
