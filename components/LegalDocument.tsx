import { Fragment, type ReactNode } from 'react';

export type LegalBlock = { type: 'p'; text: string } | { type: 'ul'; items: string[] };
export type LegalDoc = {
  title: string;
  intro: string[];
  sections: { title: string; blocks: LegalBlock[] }[];
};

const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*|[\w.-]+@[\w-]+(?:\.[\w-]+)+|autoriteitpersoonsgegevens\.nl)/g;

/** Minimal inline markdown: **bold**, *italic*, `code`, e-mail and AP links. */
function inline(text: string): ReactNode {
  return text.split(INLINE).map((part, i) => {
    if (!part) return null;
    if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>;
    if (part.startsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>;
    if (part.includes('@')) return <a key={i} className="underline" href={`mailto:${part}`}>{part}</a>;
    if (part === 'autoriteitpersoonsgegevens.nl') {
      return <a key={i} className="underline" href={`https://${part}`}>{part}</a>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export default function LegalDocument({ doc, children }: { doc: LegalDoc; children?: ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">{doc.title}</h1>
      {doc.intro.map((p, i) => (
        <p key={i} className="text-muted-text mb-2">{inline(p)}</p>
      ))}
      {doc.sections.map((section) => (
        <section key={section.title} className="mt-8">
          <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
          {section.blocks.map((block, i) =>
            block.type === 'ul' ? (
              <ul key={i} className="space-y-2 text-warm-text mb-3 list-disc pl-5">
                {block.items.map((item, j) => <li key={j}>{inline(item)}</li>)}
              </ul>
            ) : (
              <p key={i} className="text-warm-text mb-3">{inline(block.text)}</p>
            ),
          )}
        </section>
      ))}
      {children}
    </div>
  );
}
