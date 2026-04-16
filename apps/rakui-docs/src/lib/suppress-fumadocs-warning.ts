'use client';

// Suppress known Fumadocs + React 19 script tag warning
// This is a library-level compatibility issue that doesn't affect functionality
// https://github.com/fuma-nama/fumadocs/issues

const originalConsoleError = console.error;

const isFumadocsScriptWarning = (args: unknown[]): boolean => {
  if (args.length === 0) return false;
  const firstArg = args[0];
  if (typeof firstArg !== 'string') return false;
  return (
    firstArg.includes('Encountered a script tag while rendering React component') ||
    firstArg.includes('Scripts inside React components are never executed')
  );
};

export function suppressFumadocsWarning(): void {
  if (typeof window === 'undefined') return;

  console.error = (...args: unknown[]) => {
    if (isFumadocsScriptWarning(args)) {
      return;
    }
    originalConsoleError.apply(console, args);
  };
}

export function restoreConsoleError(): void {
  if (typeof window === 'undefined') return;
  console.error = originalConsoleError;
}
