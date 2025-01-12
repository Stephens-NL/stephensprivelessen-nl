import { FiLoader } from 'react-icons/fi';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-12 text-center text-white">
        <div className="mb-8 flex justify-center">
          <FiLoader className="w-20 h-20 text-yellow-300 animate-spin" />
        </div>
        <h2 className="text-4xl font-bold mb-4">Loading...</h2>
        <p className="text-xl text-blue-100">
          Please wait while we prepare your content.
        </p>
      </div>
    </div>
  );
} 