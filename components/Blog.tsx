import { Link } from '@/i18n/navigation';
import { getLanguageFromLocale } from '@/hooks/useLanguage';
import { blogPosts } from '@/data/blog';
import type { BlogPost } from '../data';

const box = 'min-h-screen bg-[var(--cream)] text-[var(--warm-text)]';

const excerpt = (text: string) => text.replace(/\s+/g, ' ').trim().slice(0, 150);

export function BlogList({ locale, title }: { locale: string; title: string }) {
  const language = getLanguageFromLocale(locale);
  const isNl = language === 'NL';

  return (
    <div className="mx-auto px-4 py-8 bg-[var(--cream)]">
      <h1 className="text-4xl font-bold text-center font-display text-[var(--ink)] mb-8">{title}</h1>
      {blogPosts.length === 0 ? (
        <p className="text-center py-16 text-[var(--warm-text)] text-lg">
          {isNl ? 'Er zijn momenteel geen blogartikelen.' : 'There are currently no blog articles.'}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-[var(--cream)] shadow-md rounded-lg p-6 border border-[var(--border-warm)] hover:border-[var(--amber)]">
              <h2 className="text-2xl font-bold font-display text-[var(--ink)] mb-4">
                <Link href={`/blog/${post.id}`}>{post.title[language]}</Link>
              </h2>
              <p className="text-[var(--warm-text)] mb-4">{excerpt(post.content[language])}...</p>
              <Link href={`/blog/${post.id}`} className="text-[var(--amber-text)] hover:text-[var(--ink)]">
                {isNl ? 'Lees meer' : 'Read more'}
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export function FullPageBlogPost({ post, locale }: { post: BlogPost; locale: string }) {
  const language = getLanguageFromLocale(locale);
  return (
    <div className={`${box} py-12 px-4 sm:px-6 lg:px-8`}>
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold font-display text-[var(--ink)] mb-4">{post.title[language]}</h1>
          {post.date && <p className="text-sm text-on-light-subtle">{post.date}</p>}
        </header>
        <div className="prose prose-lg prose-neutral max-w-none">
          {post.content[language].split('\n').map((p, i) =>
            p.trim() ? <p key={i} className="mb-6">{p.trim()}</p> : null,
          )}
        </div>
      </article>
    </div>
  );
}
