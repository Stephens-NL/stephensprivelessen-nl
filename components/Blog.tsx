'use client';
import React, { useState } from 'react';
import { BlogPostsType, BlogPostType, blogInfo } from '../data';
import { useTranslation } from '../hooks/useTranslation';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from './Modal'; // Zorg ervoor dat je een Modal component hebt

const BlogPostSummary: React.FC<{ post: BlogPostType; onClick: () => void }> = ({ post, onClick }) => {
  const { t } = useTranslation();
  return (
    <motion.div
      className="bg-gray-900 shadow-md rounded-lg p-6 mb-6 border border-gray-800 hover:border-gray-700 cursor-pointer"
      whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <h2 className="text-2xl font-bold text-gray-100 mb-4 hover:text-cyan-400 transition-colors duration-300">
        {t(post.title)}
      </h2>
      <p className="text-sm text-gray-400 mb-2">
        by {post.author} on {new Date(post.date).toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      <div className="text-balance text-gray-300 mb-4">
        {t(post.content).substring(0, 150)}...
      </div>
      <span className="text-primary hover:text-cyan-400 transition-colors duration-300">Lees meer</span>
      <div className="mt-4">
        {post.tags.map(tag => (
          <motion.span
            key={tag}
            className="inline-block bg-gray-800 rounded-full px-3 py-1 text-xs font-semibold text-gray-300 mr-2 mb-2"
            whileHover={{ backgroundColor: "#374151", scale: 1.05 }}
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const BlogList: React.FC<{ posts: BlogPostsType }> = ({ posts }) => {
  const { t } = useTranslation();
  const [selectedPost, setSelectedPost] = useState<BlogPostType | null>(null);

  const title = t(blogInfo.title)
  const description = t(blogInfo.description)

  const handleClose = () => {
    setSelectedPost(null);
  };

  if (!posts || !Array.isArray(posts)) {
    return <p className="text-gray-300">No posts available.</p>;
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="mx-auto px-4 py-8 bg-gradient-to-br from-blue-100 to-gray-950">
      <motion.h1
        className="text-4xl font-bold text-center text-white mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {title}
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {posts.map((post) => (
          <motion.div key={post.id} variants={item}>
            <BlogPostSummary post={post} onClick={() => setSelectedPost(post)} />
          </motion.div>
        ))}
      </motion.div>
      <AnimatePresence>
        {selectedPost && (
          <Modal isOpen={!!selectedPost} onClose={handleClose}>
            <FullBlogPostModal post={selectedPost} onClose={handleClose} />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: { duration: 0.2 }
  }
};



export const FullPageBlogPost: React.FC<BlogPostType> = ({ post }) => {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">Published on {post.date}</p>
      <img 
        src={post.imageUrl} 
        alt={post.title} 
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <div className="prose lg:prose-xl"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
};

const FullBlogPostModal: React.FC<{ post: BlogPostType; onClose?: () => void }> = ({ post, onClose }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="bg-gray-900 rounded-lg shadow-xl overflow-hidden border border-gray-800 max-h-[90vh] overflow-y-auto w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-8">
        <motion.h1
          className="text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {t(post.title)}
        </motion.h1>
        <motion.p
          className="text-sm text-gray-400 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          by {post.author} on {new Date(post.date).toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}
        </motion.p>
        <motion.div
          className="prose prose-invert max-w-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          {t(post.content).split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-300">{paragraph}</p>
          ))}
        </motion.div>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          {post.tags.map(tag => (
            <span key={tag} className="inline-block bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2 hover:bg-gray-700 transition-colors duration-300">{tag}</span>
          ))}
        </motion.div>
      </div>
      {onClose && (
        <motion.div
          className="mt-8 text-center pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <button
            onClick={onClose}
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-cyan-400 transition-colors duration-300"
          >
            Terug naar alle blogs
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};


export { BlogList, FullBlogPostModal };