import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/global.css'
import { LanguageProvider } from './context/LanguageContext'

console.log('React is attempting to mount...');

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {error: Error | null}> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    const error = this.state.error as Error | null;
    if (error) {
      return (
        <div style={{ padding: '20px', background: 'red', color: 'white' }}>
          <h2>Something went wrong.</h2>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
