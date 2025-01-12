'use client';

import React from 'react';
import { Button } from './ui/button';

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
    // You can log the error to an error reporting service here
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
          <div className="text-center p-8 max-w-md">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Oeps! Er ging iets mis.
            </h1>
            <p className="text-gray-600 mb-6">
              Er is een onverwachte fout opgetreden. Probeer de pagina te verversen of ga terug naar de homepagina.
            </p>
            {this.state.error && (
              <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700 mb-6 overflow-auto">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Pagina verversen
              </Button>
              <Button
                onClick={() => window.location.href = '/'}
              >
                Naar homepagina
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 