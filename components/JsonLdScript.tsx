'use client';

import { useEffect } from 'react';

/**
 * Injects JSON-LD structured data into the document head.
 * Uses DOM APIs instead of dangerouslySetInnerHTML for safer script injection.
 */
export function JsonLdScript({ data }: { data: object }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    script.setAttribute('data-jsonld', 'true');
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, [data]);

  return null;
}
