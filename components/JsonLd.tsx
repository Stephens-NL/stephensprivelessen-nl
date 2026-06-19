/**
 * Server-side JSON-LD structured data component.
 * Renders a <script type="application/ld+json"> tag directly into server HTML
 * without requiring any client-side JavaScript.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
