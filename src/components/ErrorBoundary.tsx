'use client';

import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Global error boundary for graceful error handling.
 * Catches runtime errors and shows a user-friendly fallback.
 */
export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <AlertTriangle size={48} style={{ color: 'var(--yellow)', marginBottom: '1rem' }} />
          <h2
            style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '0.5rem',
              color: 'var(--text)',
            }}
          >
            Something went wrong
          </h2>
          <p
            style={{
              fontSize: '0.9rem',
              color: 'var(--text-muted)',
              marginBottom: '1.5rem',
              maxWidth: '400px',
            }}
          >
            An unexpected error occurred. Don't worry, your practice data is safe.
          </p>
          <button
            onClick={this.handleReset}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              border: 'none',
              background: 'var(--accent)',
              color: '#fff',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <RotateCcw size={16} />
            Try Again
          </button>
          {this.state.error && (
            <details
              style={{
                marginTop: '1.5rem',
                padding: '1rem',
                borderRadius: '8px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                maxWidth: '500px',
                width: '100%',
              }}
            >
              <summary
                style={{
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                }}
              >
                Technical details
              </summary>
              <pre
                style={{
                  marginTop: '0.5rem',
                  fontSize: '0.75rem',
                  color: 'var(--red)',
                  overflow: 'auto',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {this.state.error.message}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
