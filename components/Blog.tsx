'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from './Modal';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';
import { BlogInfo, BlogPost, BlogPosts } from '@/data';

const BlogPostSummary: React.FC<{ post: BlogPost; onClick: () => void }> = ({ post, onClick }) => {
  const { t } = useTranslation();
  return (
    <motion.div
      className="bg-gray-900 shadow-md rounded-lg p-6 mb-6 border border-gray-800 hover:border-gray-700 cursor-pointer"
      whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <h2 className="text-2xl font-bold text-gray-100 mb-4 hover:text-cyan-400 transition-colors duration-300">
        {String(t(post.title))}
      </h2>
      <p className="text-sm text-gray-400 mb-2">
        by {post.author} on {new Date(post.date).toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      <div className="text-balance text-gray-300 mb-4">
        {String(t(post.content)).substring(0, 150)}...
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

export const BlogList: React.FC = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<BlogPosts>([]);
  const [blogInfo, setBlogInfo] = useState<BlogInfo | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch('/api/blog');

        if (!response.ok) {
          throw new Error('Failed to fetch blog data');
        }

        const data = await response.json();
        setPosts(data.blogPosts);
        setBlogInfo(data.blogInfo);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching blog data:', err);
        setError('Failed to load blog posts');
        setIsLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  const handleClose = () => {
    setSelectedPost(null);
  };

  if (isLoading) {
    return <p className="text-gray-300">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!posts || posts.length === 0) {
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
        {blogInfo ? String(t(blogInfo.title)) : 'Blog'} 
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

const FullBlogPostModal: React.FC<{ post: BlogPost; onClose?: () => void }> = ({ post, onClose }) => {
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
          {String(t(post.title))}
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
          {String(t(post.content)).split('\n').map((paragraph, index) => (
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

interface FullPageBlogPostProps {
  post: BlogPost | null;
  loadingErrorState: {
    isLoading: boolean;
    error: string | null;
  };
}

export const FullPageBlogPost: React.FC<FullPageBlogPostProps> = ({ post, loadingErrorState }) => {
  const { t } = useTranslation();

  if (loadingErrorState.isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900 text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  if (loadingErrorState.error) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl text-red-400"
        >
          Error: {loadingErrorState.error}
        </motion.div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl"
        >
          No post data available.
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <header className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            {String(t(post.title))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg text-gray-400"
          >
            {String(t({EN: 'By', NL: 'Door'}))} {post.author} • {new Date(post.date).toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}
          </motion.p>
        </header>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="prose prose-lg prose-invert max-w-none"
        >
          {String(t(post.content)).split('\n').map((paragraph, index) => (
            <p key={index} className="mb-6">{paragraph.trim()}</p>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12"
        >
          <h3 className="text-xl font-semibold mb-4 text-cyan-400">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-800 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.article>
    </div>
  );
};

export default BlogList;