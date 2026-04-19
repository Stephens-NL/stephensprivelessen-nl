'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { m, AnimatePresence } from 'framer-motion';
import Modal from './Modal';
import { BlogPost } from '../data';
import { useLanguage } from '@/hooks/useLanguage';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const BLOG_COUNT = 10;

const BlogPostSummary: React.FC<{ index: number; onClick: () => void }> = ({ index, onClick }) => {
  const t = useTranslations('blog');
  const language = useLanguage();
  const isNl = language === 'NL';
  return (
    <m.div
      className="bg-[var(--cream)] shadow-md rounded-lg p-6 mb-6 border border-[var(--border-warm)] hover:border-[var(--amber)] cursor-pointer"
      whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <h2 className="text-2xl font-bold font-display text-[var(--ink)] mb-4 hover:text-[var(--amber)] transition-colors duration-300">
        {t(`items.${index}.title`)}
      </h2>
      <div className="text-balance text-[var(--warm-text)] mb-4">
        {t(`items.${index}.content`).substring(0, 150)}...
      </div>
      <span className="text-[var(--amber)] hover:text-[var(--amber-hover)] transition-colors duration-300">{isNl ? 'Lees meer' : 'Read more'}</span>
    </m.div>
  );
};

export const BlogList: React.FC = () => {
  const t = useTranslations('blog');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleClose = () => {
    setSelectedIndex(null);
  };

  return (
    <div className="mx-auto px-4 py-8 bg-[var(--cream)]">
      <m.h1
        className="text-4xl font-bold text-center font-display text-[var(--ink)] mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {t('title')}
      </m.h1>
      <m.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {Array.from({ length: BLOG_COUNT }, (_, index) => (
          <m.div key={index} variants={fadeInUp}>
            <BlogPostSummary index={index} onClick={() => setSelectedIndex(index)} />
          </m.div>
        ))}
      </m.div>
      <AnimatePresence>
        {selectedIndex !== null && (
          <Modal isOpen={true} onClose={handleClose}>
            <FullBlogPostModal index={selectedIndex} onClose={handleClose} />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

const FullBlogPostModal: React.FC<{ index: number; onClose?: () => void }> = ({ index, onClose }) => {
  const t = useTranslations('blog');
  const language = useLanguage();
  const isNl = language === 'NL';

  return (
    <m.div
      className="bg-[var(--cream)] rounded-lg shadow-xl overflow-hidden border border-[var(--border-warm)] max-h-[90vh] overflow-y-auto w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-8">
        <m.h1
          className="text-4xl font-bold font-display text-[var(--ink)] mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {t(`items.${index}.title`)}
        </m.h1>
        <m.div
          className="prose prose-neutral max-w-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          {t(`items.${index}.content`).split('\n').map((paragraph, pIndex) => (
            <p key={paragraph ? `${paragraph.slice(0, 30)}-${pIndex}` : `para-${pIndex}`} className="mb-4 text-[var(--warm-text)]">{paragraph}</p>
          ))}
        </m.div>
      </div>
      {onClose && (
        <m.div
          className="mt-8 text-center pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <button
            onClick={onClose}
            className="inline-block bg-[var(--ink)] text-[var(--cream)] px-6 py-3 rounded-lg hover:bg-[var(--ink-light)] transition-colors duration-300"
          >
            {isNl ? 'Terug naar alle blogs' : 'Back to all blogs'}
          </button>
        </m.div>
      )}
    </m.div>
  );
};

interface LoadingErrorState {
  isLoading: boolean;
  error: string | null;
}

export const FullPageBlogPost: React.FC<{ post: BlogPost | null; loadingErrorState: LoadingErrorState }> = ({ post, loadingErrorState }) => {
  const { isLoading, error } = loadingErrorState;
  const language = useLanguage();

  if (isLoading) {
    return <div className="min-h-screen bg-[var(--cream)] flex items-center justify-center text-[var(--warm-text)]">Laden...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-[var(--cream)] flex items-center justify-center text-[var(--warm-text)]">{error}</div>;
  }

  if (!post) {
    return <div className="min-h-screen bg-[var(--cream)] flex items-center justify-center text-[var(--warm-text)]">Blog post niet gevonden.</div>;
  }

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--warm-text)] py-12 px-4 sm:px-6 lg:px-8">
      <m.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <header className="mb-8">
          <m.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold font-display text-[var(--ink)] mb-4"
          >
            {post.title[language]}
          </m.h1>
          {post.date && (
            <p className="text-sm text-[var(--warm-text)] opacity-60">{post.date}</p>
          )}
        </header>

        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="prose prose-lg prose-neutral max-w-none"
        >
          {post.content[language].split('\n').map((paragraph, pIndex) => (
            paragraph.trim() ? (
              <p key={`para-${pIndex}`} className="mb-6">{paragraph.trim()}</p>
            ) : null
          ))}
        </m.div>
      </m.article>
    </div>
  );
};
