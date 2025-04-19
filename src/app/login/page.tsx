'use client';
import '../../styles/globals.css'
import { useState, useEffect } from 'react';
import { useThemeStore } from '@/lib/stores/themeStore';
import { Apple, Github, Mail, Facebook } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';
import Header from '@/components/globals/Header';

export default function LoginPage() {
  const { darkMode } = useThemeStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log('Login attempted with:', email, password);
  };

  return (
    <>
       <Head>
        <title>Login to Notepaper AI - Transform Your Notes with AI Magic</title>
        <meta name="description" content="Login to your Notepaper AI account to access intelligent note-taking features. Convert documents, edit PDFs, generate code, and collaborate with AI-powered tools." />
        <meta name="keywords" content="AI notes, PDF editor, document conversion, collaborative notes, OCR, text extraction, data analysis, Notepaper AI login" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/login" />
        <meta property="og:title" content="Login to Notepaper AI - Transform Your Notes with AI Magic" />
        <meta property="og:description" content="Access your Notepaper AI account to transform your notes with powerful AI tools." />
        <meta property="og:image" content="https://yourdomain.com/images/notepaper-ai-social.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://yourdomain.com/login" />
        <meta name="twitter:title" content="Login to Notepaper AI - Transform Your Notes with AI Magic" />
        <meta name="twitter:description" content="Access your Notepaper AI account to transform your notes with powerful AI tools." />
        <meta name="twitter:image" content="https://yourdomain.com/images/notepaper-ai-social.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://yourdomain.com/login" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Notepaper AI Login",
            "description": "Login page for Notepaper AI - AI-powered note transformation platform",
            "url": "https://yourdomain.com/login",
            "potentialAction": {
              "@type": "LoginAction",
              "target": "https://yourdomain.com/api/login",
              "method": "POST"
            }
          })}
        </script>
      </Head>
      <Header/>
    <div className={`flex min-h-screen items-center justify-center ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}>

      <div className={`w-[95%] md:w-[80%] md:h-[70%] flex  mx-auto rounded-xl border border-blue-800 ${darkMode ? "bg-gray-800" : "bg-white"}`}>

        <div className="w-full  flex gap-5 items-center justify-center md:p-8">
          <div className={`w-full md:w-1/2  max-w-md p-8 space-y-6 ${darkMode ? "bg-gray-800" : "bg-white"
            }`}>
            <div>
              <h1 className="text-3xl font-bold text-blue-600 text-center md:text-left ">Notepaper AI</h1>
              <h2 className="mt-4 text-2xl font-bold text-center md:text-left ">Welcome back</h2>
              <p className={`mt-2 text-center md:text-left ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Login to your Notepaper AI account
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                    }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                    }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${darkMode ? "bg-gray-700" : "bg-white"
                      }`}
                  />
                  <label htmlFor="remember-me" className={`ml-2 block text-sm ${darkMode ? "text-gray-300" : "text-gray-900"
                    }`}>
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className={`text-center text-sm ${darkMode ? "text-gray-300" : "text-gray-600"
              }`}>
              <p>Or continue with</p>
              <div className="mt-4 flex justify-center space-x-4">
                <button className={`p-2 rounded-full ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                  } transition-colors`}>
                  <Apple size={20} />
                </button>
                <button className={`p-2 rounded-full ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                  } transition-colors`}>
                  <Mail size={20} />
                </button>
                <button className={`p-2 rounded-full ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                  } transition-colors`}>
                  <Github size={20} />
                </button>
                <button className={`p-2 rounded-full ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                  } transition-colors`}>
                  <Facebook size={20} />
                </button>
              </div>
            </div>

            <div className="text-center">
              <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                Don't have an account?{' '}
                <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
          <div className={`w-full md:w-1/2 hidden md:flex ${darkMode ? "bg-gray-800" : "bg-blue-50"
            }`}>
            <div className="w-full h-full">
              <InteractiveIllustration darkMode={darkMode} />
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}


function InteractiveIllustration({ darkMode }) {
  useEffect(() => {
    const interval = setInterval(() => {
      const fileElements = document.querySelectorAll('.file-element');
      fileElements.forEach(el => {
        el.classList.add('animate-pulse');
        setTimeout(() => el.classList.remove('animate-pulse'), 1000);
      });

      // Move the connector animation
      const connector = document.getElementById('connector-path');
      if (connector) {
        connector.classList.add('path-animation');
        setTimeout(() => connector.classList.remove('path-animation'), 1500);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      viewBox="0 0 500 400"
      className="w-full h-full"
    >
      <defs>
        <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
            
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.6; }
            }
            
            @keyframes dash {
              to {
                stroke-dashoffset: 0;
              }
            }
            
            .floating {
              animation: float 3s ease-in-out infinite;
            }
            
            .pulsing {
              animation: pulse 2s ease-in-out infinite;
            }
            
            .path-animation {
              stroke-dasharray: 1000;
              stroke-dashoffset: 1000;
              animation: dash 1.5s linear forwards;
            }
          `}
        </style>
      </defs>

      {/* Background Grid */}
      <g className={darkMode ? "text-gray-700" : "text-gray-200"}>
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`grid-h-${i}`}
            x1="0"
            y1={i * 40}
            x2="500"
            y2={i * 40}
            stroke="currentColor"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 13 }).map((_, i) => (
          <line
            key={`grid-v-${i}`}
            x1={i * 40}
            y1="0"
            x2={i * 40}
            y2="400"
            stroke="currentColor"
            strokeWidth="1"
          />
        ))}
      </g>

      {/* Central Workspace */}
      <g className="floating" style={{ transformOrigin: '250px 200px' }}>
        <rect
          x="150"
          y="150"
          width="200"
          height="140"
          rx="10"
          fill={darkMode ? "#1F2937" : "#FFFFFF"}
          stroke={darkMode ? "#4B5563" : "#E5E7EB"}
          strokeWidth="2"
          filter="url(#glow)"
        />
        <text
          x="250"
          y="180"
          fontFamily="Arial"
          fontSize="14"
          fontWeight="bold"
          fill={darkMode ? "#F9FAFB" : "#111827"}
          textAnchor="middle"
        >
          Notepaper AI Workspace
        </text>

        {/* AI Processing Icon */}
        <circle
          cx="250"
          cy="220"
          r="20"
          fill="url(#blue-gradient)"
          className="pulsing"
        />
        <text
          x="250"
          y="225"
          fontFamily="Arial"
          fontSize="18"
          fontWeight="bold"
          fill="#FFFFFF"
          textAnchor="middle"
        >
          AI
        </text>
      </g>

      {/* PDF Document */}
      <g className="file-element" style={{ transformOrigin: '100px 100px' }}>
        <rect
          x="70"
          y="80"
          width="60"
          height="80"
          rx="5"
          fill={darkMode ? "#374151" : "#FEE2E2"}
          stroke={darkMode ? "#4B5563" : "#EF4444"}
          strokeWidth="2"
        />
        <text
          x="100"
          y="125"
          fontFamily="Arial"
          fontSize="12"
          fill={darkMode ? "#F9FAFB" : "#111827"}
          textAnchor="middle"
        >
          PDF
        </text>
      </g>

      {/* Document File */}
      <g className="file-element" style={{ transformOrigin: '400px 100px' }}>
        <rect
          x="370"
          y="80"
          width="60"
          height="80"
          rx="5"
          fill={darkMode ? "#374151" : "#DBEAFE"}
          stroke={darkMode ? "#4B5563" : "#3B82F6"}
          strokeWidth="2"
        />
        <text
          x="400"
          y="125"
          fontFamily="Arial"
          fontSize="12"
          fill={darkMode ? "#F9FAFB" : "#111827"}
          textAnchor="middle"
        >
          DOC
        </text>
      </g>

      {/* Code File */}
      <g className="file-element" style={{ transformOrigin: '100px 300px' }}>
        <rect
          x="70"
          y="280"
          width="60"
          height="80"
          rx="5"
          fill={darkMode ? "#374151" : "#D1FAE5"}
          stroke={darkMode ? "#4B5563" : "#10B981"}
          strokeWidth="2"
        />
        <path
          d="M85 315 L95 305 L105 315 L95 325 Z"
          fill={darkMode ? "#F9FAFB" : "#059669"}
        />
        <path
          d="M115 305 L115 325"
          stroke={darkMode ? "#F9FAFB" : "#059669"}
          strokeWidth="3"
        />
      </g>

      {/* Notes File */}
      <g className="file-element" style={{ transformOrigin: '400px 300px' }}>
        <rect
          x="370"
          y="280"
          width="60"
          height="80"
          rx="5"
          fill={darkMode ? "#374151" : "#FEF3C7"}
          stroke={darkMode ? "#4B5563" : "#F59E0B"}
          strokeWidth="2"
        />
        <line
          x1="380"
          y1="300"
          x2="420"
          y2="300"
          stroke={darkMode ? "#F9FAFB" : "#D97706"}
          strokeWidth="2"
        />
        <line
          x1="380"
          y1="315"
          x2="420"
          y2="315"
          stroke={darkMode ? "#F9FAFB" : "#D97706"}
          strokeWidth="2"
        />
        <line
          x1="380"
          y1="330"
          x2="410"
          y2="330"
          stroke={darkMode ? "#F9FAFB" : "#D97706"}
          strokeWidth="2"
        />
      </g>

      {/* Connection Lines */}
      <path
        id="connector-path"
        d="M130 120 Q 190 120, 190 170 T 250 200 T 310 170 T 370 120
           M130 320 Q 190 320, 190 270 T 250 240 T 310 270 T 370 320"
        fill="none"
        stroke="url(#blue-gradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="5,5"
        opacity="0.7"
      />

      {/* Small Connection Circles */}
      <circle cx="130" cy="120" r="4" fill="url(#blue-gradient)" />
      <circle cx="370" cy="120" r="4" fill="url(#blue-gradient)" />
      <circle cx="130" cy="320" r="4" fill="url(#blue-gradient)" />
      <circle cx="370" cy="320" r="4" fill="url(#blue-gradient)" />
    </svg>
  );
}