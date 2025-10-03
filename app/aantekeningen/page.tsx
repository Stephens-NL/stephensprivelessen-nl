"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AantekeningenPage() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  // Google Apps Script web app URL - WITH DOM TIMING FIX
  const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwVn9Z-b5dYo8uFV-nnlWzsSRIx_UNXUzav-_DteS_jzOLFIdV7ZfyBEy5boamBxoEh/exec";

  useEffect(() => {
    // You can add any initialization logic here
  }, []);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  const handleIframeError = () => {
    setIframeError(true);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Compact Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">📚 Aantekeningen</h1>
            <p className="text-blue-100 text-sm">Stephen's Privelessen</p>
          </div>
          <div className="text-sm text-blue-100">
            <Link href="/" className="hover:text-white transition-colors">← Terug naar website</Link>
          </div>
        </div>
      </div>

      {/* Fullscreen Content */}
      <div className="flex-1 relative">
        {/* Loading State */}
        {!iframeLoaded && !iframeError && (
          <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Aantekeningen dashboard wordt geladen...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {iframeError && (
          <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
            <div className="max-w-md mx-auto p-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <span className="text-red-600 text-2xl">❌</span>
                  <div>
                    <h3 className="font-medium text-red-800 mb-2">Dashboard niet beschikbaar</h3>
                    <p className="text-red-700 mb-3">
                      Het aantekeningen dashboard kan momenteel niet worden geladen.
                    </p>
                    <div className="text-sm text-red-600">
                      <p><strong>Mogelijke oplossingen:</strong></p>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Controleer je internetverbinding</li>
                        <li>Probeer de pagina te vernieuwen</li>
                        <li>Neem contact op met Stephen voor hulp</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fullscreen Iframe */}
        <iframe
          src={GOOGLE_APPS_SCRIPT_URL}
          className="w-full h-full border-0"
          title="Aantekeningen Dashboard"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      </div>

      {/* Compact Privacy Notice */}
      <div className="bg-gray-50 border-t border-gray-200 p-3">
        <div className="container mx-auto">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center gap-4">
              <span>🔒 Privacy: Alleen je voornaam wordt gebruikt</span>
              <span>•</span>
              <span>👨‍👩‍👧‍👦 Ouders: gebruik de voornaam van je kind</span>
            </div>
            <Link href="/contact" className="text-blue-600 hover:underline">Contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
