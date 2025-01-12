import Link from 'next/link';
import { FiHome, FiAlertCircle } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-12 text-center text-white">
        <div className="mb-8 flex justify-center">
          <FiAlertCircle className="w-20 h-20 text-yellow-300" />
        </div>
        <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
        <p className="text-xl text-blue-100 mb-12">
          We couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <FiHome className="w-5 h-5" />
          Return Home
        </Link>
      </div>
    </div>
  );
} 