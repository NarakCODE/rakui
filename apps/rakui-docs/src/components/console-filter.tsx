'use client';

import { useEffect } from 'react';
import { suppressFumadocsWarning } from '@/lib/suppress-fumadocs-warning';

/**
 * Client component that suppresses known Fumadocs + React 19 warnings.
 * Mount this in your root layout to filter console noise during development.
 */
export function ConsoleFilter() {
  useEffect(() => {
    suppressFumadocsWarning();
  }, []);

  return null;
}
