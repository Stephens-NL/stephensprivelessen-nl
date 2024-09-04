'use client';

import React, { useEffect, useRef, useState } from 'react';

import { useTranslation } from '../hooks/useTranslation';
import { motion, AnimatePresence } from 'framer-motion';
import { Text } from '@react-three/drei';
import Modal from './Modal'; // Zorg ervoor dat je een Modal component hebt
import { TextureLoader } from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
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

export const BlogList: React.FC<{ posts: BlogPosts }> = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<BlogPosts>([]);
  const [blogInfo, setBlogInfo] = useState<BlogInfo | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const [postsResponse, infoResponse] = await Promise.all([
          fetch('/blog/api'),
          fetch('/blog/api')
        ]);

        if (!postsResponse.ok || !infoResponse.ok) {
          throw new Error('Failed to fetch blog data');
        }

        const postsData: BlogPosts = await postsResponse.json();
        const infoData: BlogInfo = await infoResponse.json();

        setPosts(postsData);
        setBlogInfo(infoData);
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
        {blogInfo?.title || 'Blog'}
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


const ChalkText = ({ content, position, fontSize = 0.2 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = useRef(content);
  const index = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayedText((prev) => {
        if (index.current < fullText.current.length) {
          index.current += 1;
          return fullText.current.slice(0, index.current);
        }
        clearInterval(timer);
        return prev;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const chalkboardTexture = useLoader(TextureLoader, './chalk-texture.png'); // You'll need to provide this texture

  return (
    <Text
      position={position}
      fontSize={fontSize}
      color="#ffffff"
      anchorX="center"
      anchorY="middle"
      font="/chalk-font.ttf" // You'll need to provide a suitable font
      material={new THREE.MeshBasicMaterial({ map: chalkboardTexture, transparent: true })}
    >
      {displayedText}
    </Text>
  );
};

const ChalkboardBackground = () => {
  const chalkboardTexture = useLoader(TextureLoader, './chalk-texture.png'); // You'll need to provide this texture

  return (
    <mesh position={[0, 0, -1]}>
      <planeGeometry args={[20, 12]} />
      <meshBasicMaterial map={chalkboardTexture} />
    </mesh>
  );
};

const ThreeDContent = ({ post }: { post: BlogPost }) => {
  const { t } = useTranslation();

  return (
    <group>
      <ChalkboardBackground />
      <ChalkText content={t(post.title)} position={[0, 4, 0]} fontSize={0.5} />
      <ChalkText content={t(post.content).substring(0, 200) + '...'} position={[0, 2, 0]} fontSize={0.2} />
    </group>
  );
};

// export const FullPageBlogPost = ({ post }: { post: BlogPost }) => {
//   const { t } = useTranslation();

//   return (
//     <div className="h-screen w-full bg-gray-900">
//       {/* <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
//         <ambientLight intensity={0.5} />
//         <pointLight position={[10, 10, 10]} />
//         <ThreeDContent post={post} />
//       </Canvas> */}
//       <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
//         <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-2xl max-h-[80vh] overflow-auto pointer-events-auto">
//           <h1 className="text-4xl font-bold mb-4 text-gray-900">{t(post.title)}</h1>
//           <p className="text-gray-600 mb-4">{t('Published on')} {post.date}</p>
//           <div className="prose lg:prose-xl text-gray-800">
//             {t(post.content).split('\n').map((paragraph, index) => (
//               <p key={index} className="mb-4">{paragraph.trim()}</p>
//             ))}
//           </div>
//           <div className="mt-4">
//             <h3 className="text-xl font-semibold mb-2 text-gray-900">{t('Tags')}:</h3>
//             <div className="flex flex-wrap gap-2">
//               {post.tags.map((tag, index) => (
//                 <span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 rounded">
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

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



interface FullPageBlogPostProps {
  post: BlogPost | null;
  isLoading: boolean;
  error: string | null;
}

export const FullPageBlogPost: React.FC<FullPageBlogPostProps> = ({ post, isLoading, error }) => {
  const { t } = useTranslation();


  if (isLoading) {
    return <div className="h-screen w-full flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="h-screen w-full flex items-center justify-center">Error: {error}</div>;
  }

  if (!post) {
    return <div className="h-screen w-full flex items-center justify-center">No post data available.</div>;
  }

  return (
    <div className="h-screen w-full bg-gray-900">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {/* <ThreeDContent post={post}/> */}
      </Canvas>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-2xl max-h-[80vh] overflow-auto pointer-events-auto">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">{t(post.title)}</h1>
          <p className="text-gray-600 mb-4">{t('Published on')} {post.date}</p>
          <div className="prose lg:prose-xl text-gray-800">
            {t(post.content).split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph.trim()}</p>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{t('Tags')}:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;