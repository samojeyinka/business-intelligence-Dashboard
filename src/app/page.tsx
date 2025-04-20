'use client';
import React, { useState, useEffect } from "react";
import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  ChevronRight,
  ExternalLink,
  Heart,
  Sun,
  Moon,
  Check,
  Star,
  ArrowRight,
  Code,
  FileText,
  Video,
  Grid,
  FileSpreadsheet,
  FileEdit,
  Users
} from "lucide-react";
import '../styles/globals.css'
import Header from "@/components/globals/Header";
 import { useThemeStore } from "@/lib/stores/themeStore";

// Main App Component
export default function Home() {
  const [animationStep, setAnimationStep] = useState(0);
  const [showHandwriting, setShowHandwriting] = useState(false);

  // Cycle through animation steps
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Toggle handwriting effect with delay
  useEffect(() => {
    const timer = setInterval(() => {
      setShowHandwriting((prev) => !prev);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // Files for conversion showcase
  const fileTypes = [
    { name: "PDF", color: "bg-red-500", icon: <FileText size={20} /> },
    { name: "DOC", color: "bg-blue-500", icon: <FileText size={20} /> },
    { name: "XLS", color: "bg-green-500", icon: <FileSpreadsheet size={20} /> },
    { name: "TXT", color: "bg-gray-500", icon: <FileText size={20} /> },
    { name: "CODE", color: "bg-purple-500", icon: <Code size={20} /> },
  ];

  const darkMode = useThemeStore((state) => state.darkMode);
  
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Navbar */}
     <Header/>

      <section
        className={`relative overflow-hidden ${
          darkMode
            ? "bg-gray-900"
            : "bg-gradient-to-br from-blue-50 via-white to-indigo-50"
        }`}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating paper elements */}
          <div
            className={`absolute top-1/4 left-1/6 w-48 h-64 ${
              darkMode ? "bg-gray-800/40" : "bg-white/60"
            } rounded-lg shadow-lg transform -rotate-6 animate-float-slow`}
          ></div>
          <div
            className={`absolute top-1/2 right-1/6 w-32 h-48 ${
              darkMode ? "bg-gray-800/30" : "bg-white/50"
            } rounded-lg shadow-lg transform rotate-12 animate-float-slower`}
          ></div>

          {/* Decorative elements */}
          <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 opacity-10 blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-10 blur-3xl animate-pulse-slower"></div>

          {/* Paper lines */}
          <div
            className={`absolute inset-0 ${
              darkMode ? "opacity-5" : "opacity-10"
            }`}
          >
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 32px, #88B9EF 33px)",
                backgroundSize: "100% 33px",
              }}
            ></div>
          </div>

          {/* Code snippet decoration */}
          <div
            className={`absolute -bottom-8 -left-8 w-64 h-64 rounded-full ${
              darkMode ? "bg-blue-900/20" : "bg-blue-100/50"
            }`}
          >
            <div
              className={`absolute inset-0 overflow-hidden rounded-full opacity-30`}
            >
              <pre className="text-[8px] text-blue-600 p-12 transform rotate-12">
                {`function analyzeNotes() {
  const text = document.getElementById('notes').value;
  const keywords = extractKeywords(text);
  const summary = generateSummary(text);
  return { keywords, summary };
}

function extractKeywords(text) {
  // AI processing
  return text.split(' ')
    .filter(word => word.length > 5)
    .slice(0, 10);
}

function generateSummary(text) {
  // AI summarization
  return text.split('. ')
    .slice(0, 3)
    .join('. ') + '.';
}`}
              </pre>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-8 mb-12 lg:mb-0">
              <div className="relative mb-6">
                <div
                  className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-2 ${
                    darkMode
                      ? "bg-blue-900/50 text-blue-300"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  Intelligent Workspace
                </div>
                <div className="flex items-center space-x-1 text-xs">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      darkMode ? "bg-green-400" : "bg-green-500"
                    }`}
                  ></span>
                  <span className="opacity-70">3,450 active users now</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="inline relative">
                  <span className="relative z-10">Transform</span>
                  <span
                    className={`absolute bottom-2 left-0 w-full h-3 ${
                      darkMode ? "bg-blue-700/30" : "bg-blue-200"
                    } -z-10 transform -rotate-1`}
                  ></span>
                </span>{" "}
                Your Notes with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                  AI Magic
                </span>
              </h1>

              <p className="text-lg md:text-xl mb-8 opacity-80 leading-relaxed">
                Capture, transform, and collaborate with our intelligent
                note-taking platform. Convert between formats, edit PDFs,
                generate code, and study together—all powered by AI.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                {[
                  {
                    label: "File Formats",
                    icon: <FileEdit size={18} />,
                    count: "15+",
                  },
                  {
                    label: "Collaborators",
                    icon: <Users size={18} />,
                    count: "Unlimited",
                  },
                  {
                    label: "AI Features",
                    icon: <Code size={18} />,
                    count: "25+",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className={`flex items-center px-4 py-2 rounded-lg ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    } shadow-sm border ${
                      darkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    <div
                      className={`mr-3 p-2 rounded-md ${
                        darkMode ? "bg-gray-700" : "bg-blue-50"
                      }`}
                    >
                      {stat.icon}
                    </div>
                    <div>
                      <div className="font-semibold">{stat.count}</div>
                      <div className="text-xs opacity-70">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 transition-all transform hover:scale-105 flex items-center justify-center">
                  <span>Start Creating</span>
                  <ArrowRight size={18} className="ml-2" />
                </button>
                <button
                  className={`px-8 py-3 ${
                    darkMode
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-white hover:bg-gray-50"
                  } font-medium rounded-lg shadow-md transition-all border ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  } flex items-center justify-center`}
                >
                  <span>Watch Demo</span>
                  <div
                    className={`ml-2 w-4 h-4 rounded-full ${
                      darkMode ? "bg-blue-500" : "bg-blue-600"
                    } flex items-center justify-center`}
                  >
                    <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-white border-b-[4px] border-b-transparent ml-[1px]"></div>
                  </div>
                </button>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              {/* Main application window with animated content */}
              <div
                className={`rounded-2xl overflow-hidden shadow-2xl border ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                } relative z-20`}
              >
                <div
                  className={`p-2 ${
                    darkMode ? "bg-gray-800" : "bg-gray-100"
                  } flex items-center space-x-2`}
                >
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <div className="flex-1 text-center">
                    <span className="text-xs opacity-60">
                      Notepaper AI Workspace
                    </span>
                  </div>
                </div>

                <div className={`${darkMode ? "bg-gray-800" : "bg-white"}`}>
                  {/* Tabs navigation */}
                  <div
                    className={`flex ${
                      darkMode
                        ? "border-b border-gray-700"
                        : "border-b border-gray-200"
                    }`}
                  >
                    {["Notes", "PDF Editor", "Collaboration", "Study"].map(
                      (tab, index) => (
                        <div
                          key={index}
                          className={`px-4 py-2 text-sm ${
                            animationStep === index
                              ? darkMode
                                ? "border-b-2 border-blue-500 text-blue-400"
                                : "border-b-2 border-blue-600 text-blue-700"
                              : "opacity-70"
                          }`}
                        >
                          {tab}
                        </div>
                      )
                    )}
                  </div>

                  {/* App content - animated based on step */}
                  <div className="p-4 h-[350px]">
                    {/* Note taking content */}
                    {animationStep === 0 && (
                      <div className="h-full flex flex-col">
                        <div className="flex mb-4">
                          <div
                            className={`px-3 py-1 text-xs rounded-md mr-2 ${
                              darkMode
                                ? "bg-blue-900/40 text-blue-300"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            Meeting Notes
                          </div>
                          <div
                            className={`px-3 py-1 text-xs rounded-md ${
                              darkMode
                                ? "bg-gray-700 text-gray-300"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            Project Update
                          </div>
                        </div>

                        <div className="flex-1 overflow-hidden">
                          <h3 className="text-lg font-semibold mb-2">
                            Team Sync - March 28, 2025
                          </h3>

                          <div
                            className={`p-4 rounded-lg mb-3 ${
                              darkMode ? "bg-gray-700/50" : "bg-gray-50"
                            }`}
                          >
                            <p
                              className={`${
                                showHandwriting ? "font-handwriting italic" : ""
                              }`}
                            >
                              Key discussion points from today's meeting:
                            </p>
                            <ul
                              className={`list-disc pl-5 mt-2 space-y-1 ${
                                showHandwriting ? "font-handwriting italic" : ""
                              }`}
                            >
                              <li>Website redesign to launch by April 15</li>
                              <li>Marketing campaign briefing scheduled</li>
                              <li>New feature prioritization for Q2</li>
                            </ul>
                          </div>

                          <div
                            className={`p-3 rounded-lg ${
                              darkMode
                                ? "bg-blue-900/20 border border-blue-900/40"
                                : "bg-blue-50 border border-blue-100"
                            }`}
                          >
                            <div className="flex items-start">
                              <div
                                className={`p-1 rounded mr-2 ${
                                  darkMode ? "bg-blue-800/50" : "bg-blue-100"
                                }`}
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  />
                                  <path
                                    d="M12 16V12M12 8H12.01"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </div>
                              <div>
                                <p className="text-xs font-medium">
                                  AI Suggestion
                                </p>
                                <p className="text-xs opacity-90">
                                  I've detected action items. Would you like me
                                  to create tasks and set reminders?
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* File conversion content */}
                    {animationStep === 1 && (
                      <div className="h-full flex flex-col">
                        <h3 className="text-lg font-semibold mb-4">
                          PDF Management & Conversion
                        </h3>

                        <div
                          className={`flex-1 rounded-lg p-4 ${
                            darkMode ? "bg-gray-700/50" : "bg-gray-50"
                          }`}
                        >
                          <div className="grid grid-cols-3 gap-4">
                            {/* Source file */}
                            <div
                              className={`p-4 rounded-lg ${
                                darkMode ? "bg-gray-800" : "bg-white"
                              } shadow-sm border ${
                                darkMode ? "border-gray-700" : "border-gray-200"
                              } flex flex-col items-center`}
                            >
                              <div
                                className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 ${
                                  darkMode
                                    ? "bg-red-900/30 text-red-400"
                                    : "bg-red-100 text-red-600"
                                }`}
                              >
                                <FileText size={24} />
                              </div>
                              <span className="text-sm font-medium">
                                presentation.pdf
                              </span>
                              <span className="text-xs opacity-60">2.4 MB</span>
                            </div>

                            {/* Arrow animation */}
                            <div className="flex items-center justify-center">
                              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent relative">
                                <div className="absolute -right-1 -top-[5px] w-0 h-0 border-t-[6px] border-t-transparent border-l-[8px] border-l-blue-500 border-b-[6px] border-b-transparent animate-pulse"></div>
                              </div>
                            </div>

                            {/* Target formats */}
                            <div
                              className={`flex flex-col gap-2 justify-center`}
                            >
                              {fileTypes.map((type, index) => (
                                <div
                                  key={index}
                                  className={`flex items-center p-2 rounded ${
                                    darkMode
                                      ? "bg-gray-800 hover:bg-gray-700"
                                      : "bg-white hover:bg-gray-50"
                                  } shadow-sm transition-colors cursor-pointer border ${
                                    darkMode
                                      ? "border-gray-700"
                                      : "border-gray-200"
                                  } ${
                                    index === 0
                                      ? "ring-2 ring-blue-500 ring-opacity-50"
                                      : ""
                                  }`}
                                >
                                  <div
                                    className={`w-6 h-6 rounded flex items-center justify-center mr-2 ${type.color} text-white`}
                                  >
                                    {type.icon}
                                  </div>
                                  <span className="text-xs font-medium">
                                    {type.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div
                            className={`mt-4 p-3 rounded-lg ${
                              darkMode
                                ? "bg-blue-900/20 border border-blue-900/40"
                                : "bg-blue-50 border border-blue-100"
                            }`}
                          >
                            <div className="flex items-center">
                              <svg
                                className="animate-spin -ml-1 mr-3 h-4 w-4 text-blue-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              <span className="text-sm">
                                Converting to DOC format, preserving all
                                formatting...
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Collaboration content */}
                    {animationStep === 2 && (
                      <div className="h-full flex flex-col">
                        <h3 className="text-lg font-semibold mb-4">
                          Real-Time Collaboration
                        </h3>

                        <div
                          className={`flex-1 rounded-lg p-4 ${
                            darkMode ? "bg-gray-700/50" : "bg-gray-50"
                          } relative`}
                        >
                          <div className="absolute top-3 right-3 flex -space-x-2">
                            {[
                              "bg-purple-500",
                              "bg-green-500",
                              "bg-orange-500",
                            ].map((color, i) => (
                              <div
                                key={i}
                                className={`w-8 h-8 rounded-full ${color} flex items-center justify-center text-white text-xs border-2 ${
                                  darkMode ? "border-gray-700" : "border-white"
                                }`}
                              >
                                {["JL", "MK", "AR"][i]}
                              </div>
                            ))}
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs border-2 ${
                                darkMode
                                  ? "bg-blue-600 border-gray-700"
                                  : "bg-blue-500 border-white"
                              } text-white`}
                            >
                              You
                            </div>
                          </div>

                          <div
                            className={`p-3 mb-4 rounded-lg ${
                              darkMode
                                ? "bg-gray-800 border border-gray-700"
                                : "bg-white border border-gray-200"
                            }`}
                          >
                            <div className="flex items-start mb-1">
                              <div
                                className={`w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs mr-2`}
                              >
                                JL
                              </div>
                              <div>
                                <p className="text-xs font-medium">
                                  Jessica Liu{" "}
                                  <span className="opacity-50">
                                    is editing...
                                  </span>
                                </p>
                                <div
                                  className={`mt-1 p-2 rounded ${
                                    darkMode ? "bg-gray-700" : "bg-gray-50"
                                  }`}
                                >
                                  <p className="text-sm">
                                    The latest market research suggests we
                                    should focus on
                                    <span className="bg-purple-200 text-purple-800 px-1 rounded">
                                      mobile app features first
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            className={`p-3 mb-4 rounded-lg ${
                              darkMode
                                ? "bg-gray-800 border border-gray-700"
                                : "bg-white border border-gray-200"
                            }`}
                          >
                            <div className="flex items-start">
                              <div
                                className={`w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs mr-2`}
                              >
                                MK
                              </div>
                              <div className="flex-1">
                                <p className="text-xs font-medium">
                                  Michael Kim{" "}
                                  <span className="opacity-50">
                                    left a comment
                                  </span>
                                </p>
                                <div
                                  className={`mt-1 p-2 rounded ${
                                    darkMode ? "bg-gray-700" : "bg-gray-50"
                                  }`}
                                >
                                  <p className="text-sm">
                                    We could integrate this with our existing
                                    analytics platform
                                  </p>
                                </div>

                                <div className="flex mt-2">
                                  <button
                                    className={`px-2 py-1 text-xs rounded ${
                                      darkMode
                                        ? "bg-gray-700 hover:bg-gray-600"
                                        : "bg-gray-100 hover:bg-gray-200"
                                    } mr-2`}
                                  >
                                    Reply
                                  </button>
                                  <button
                                    className={`px-2 py-1 text-xs rounded ${
                                      darkMode
                                        ? "bg-blue-900/30 text-blue-400"
                                        : "bg-blue-100 text-blue-700"
                                    }`}
                                  >
                                    <span>👍</span> Agree
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            className={`p-2 rounded-lg flex ${
                              darkMode
                                ? "bg-gray-800 border border-gray-700"
                                : "bg-white border border-gray-200"
                            }`}
                          >
                            <input
                              type="text"
                              placeholder="Add your comment or edit directly..."
                              className={`flex-1 bg-transparent text-sm px-2 py-1 focus:outline-none`}
                            />
                            <button
                              className={`px-3 py-1 text-xs rounded ${
                                darkMode
                                  ? "bg-blue-600 hover:bg-blue-500"
                                  : "bg-blue-500 hover:bg-blue-600"
                              } text-white`}
                            >
                              Send
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Study mode content */}
                    {animationStep === 3 && (
                      <div className="h-full flex flex-col">
                        <h3 className="text-lg font-semibold mb-4">
                          AI Study Companion
                        </h3>

                        <div
                          className={`flex-1 rounded-lg ${
                            darkMode ? "bg-gray-700/50" : "bg-gray-50"
                          } overflow-hidden flex flex-col`}
                        >
                          <div
                            className={`p-3 ${
                              darkMode
                                ? "bg-gray-800 border-b border-gray-700"
                                : "bg-white border-b border-gray-200"
                            }`}
                          >
                            <div className="flex items-center">
                              <div
                                className={`p-2 rounded-md mr-3 ${
                                  darkMode ? "bg-blue-900/40" : "bg-blue-100"
                                }`}
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M21 15C21 17.2091 19.2091 19 17 19H7C4.79086 19 3 17.2091 3 15V9C3 6.79086 4.79086 5 7 5H17C19.2091 5 21 6.79086 21 9V15Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  />
                                  <path
                                    d="M7 8L17 8"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M7 12L17 12"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M7 16L12 16"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </div>
                              <span className="font-medium">Studying: </span>
                              <span className="ml-2 opacity-80">
                                Machine Learning Fundamentals
                              </span>
                            </div>
                          </div>

                          <div className={`p-4 flex-1 overflow-auto`}>
                            <div
                              className={`p-3 rounded-lg mb-3 ${
                                darkMode ? "bg-gray-800" : "bg-white"
                              } border ${
                                darkMode ? "border-gray-700" : "border-gray-200"
                              }`}
                            >
                              <div className="flex items-start">
                                <div
                                  className={`mr-3 p-1 rounded-full ${
                                    darkMode ? "bg-blue-600" : "bg-blue-500"
                                  } text-white`}
                                >
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                      fill="currentColor"
                                      opacity="0.2"
                                    />
                                    <path
                                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                    />
                                    <path
                                      d="M12 16V12M12 8H12.01"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">
                                    AI Tutor
                                  </p>
                                  <p className="text-sm mt-1">
                                    Great answer! Can you give an example of
                                    each type?
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            className={`p-3 ${
                              darkMode
                                ? "bg-gray-800 border-t border-gray-700"
                                : "bg-white border-t border-gray-200"
                            } flex`}
                          >
                            <input
                              type="text"
                              placeholder="Type your answer..."
                              className={`flex-1 bg-transparent text-sm px-2 py-1 focus:outline-none`}
                            />
                            <button
                              className={`px-3 py-1 ml-2 text-xs rounded ${
                                darkMode
                                  ? "bg-blue-600 hover:bg-blue-500"
                                  : "bg-blue-500 hover:bg-blue-600"
                              } text-white`}
                            >
                              Answer
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 transform rotate-12 w-16 h-24 bg-gradient-to-b from-pink-500 to-purple-500 rounded opacity-30 blur-md"></div>
              <div className="absolute -bottom-4 -left-4 transform -rotate-12 w-16 h-24 bg-gradient-to-b from-blue-500 to-indigo-500 rounded opacity-30 blur-md"></div>

              {/* File conversion floating badge */}
              <div
                className={`absolute -bottom-6 right-12 transform translate-y-1/2 px-4 py-2 rounded-lg shadow-lg ${
                  darkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200"
                } z-30`}
              >
                <div className="flex items-center">
                  <div
                    className={`relative mr-3 p-2 rounded-md ${
                      darkMode ? "bg-indigo-900/50" : "bg-indigo-100"
                    }`}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 17H17.01M17.4 14H18C19.1046 14 20 14.8954 20 16V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V16C4 14.8954 4.89543 14 6 14H6.6M12 2V14M12 2L8 6M12 2L16 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <p className="text-xs font-medium">Effortless Conversion</p>
                    <p className="text-xs opacity-60">15+ formats supported</p>
                  </div>
                </div>
              </div>

              {/* Collaboration floating badge */}
              <div
                className={`absolute -top-6 left-12 transform -translate-y-1/2 px-4 py-2 rounded-lg shadow-lg ${
                  darkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200"
                } z-30`}
              >
                <div className="flex items-center">
                  <div
                    className={`mr-3 p-2 rounded-md ${
                      darkMode ? "bg-green-900/50" : "bg-green-100"
                    }`}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 20H7C4.79086 20 3 18.2091 3 16V8C3 5.79086 4.79086 4 7 4H17C19.2091 4 21 5.79086 21 8V16C21 18.2091 19.2091 20 17 20Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 7V7.01"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium">Collaborative</p>
                    <p className="text-xs opacity-60">
                      Edit together in real-time
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className={`w-full h-12 ${
              darkMode ? "text-gray-800" : "text-white"
            }`}
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className={`py-12 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-medium mb-8 opacity-70">
            Trusted by innovative teams
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {["Microsoft", "Google", "Stanford University", "MIT"].map(
              (company, index) => (
                <div
                  key={index}
                  className={`text-xl font-semibold ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {company}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className={`py-20 ${darkMode ? "bg-gray-900" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="max-w-2xl mx-auto text-lg opacity-80">
              Everything you need to capture, organize, and transform your ideas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Note-Taking",
                description:
                  "Record, transcribe, and convert notes into multiple formats with intelligent auto-formatting.",
                icon: <FileText size={24} className="text-blue-500" />,
                details: [
                  "Record and auto-transcribe",
                  "Convert to various formats",
                  "Handwritten-style output",
                  "Auto-format structure",
                ],
              },
              {
                title: "AI Study Companion",
                description:
                  "Upload materials, create study rooms, and interact with AI that helps you learn more effectively.",
                icon: <Users size={24} className="text-purple-500" />,
                details: [
                  "Video and document uploads",
                  "Virtual study rooms",
                  "AI-assisted learning",
                  "Email collaboration",
                ],
              },
              {
                title: "Draggable Code Blocks",
                description:
                  "Drag, drop, and run code directly in your notes with AI assistance for better programming.",
                icon: <Code size={24} className="text-green-500" />,
                details: [
                  "Interactive code execution",
                  "Terminal result blocks",
                  "AI code generation",
                  "Idea blocks for concepts",
                ],
              },
              {
                title: "Custom Writing Frames",
                description:
                  "Write on beautiful templates and patterns, then export in the format that works for you.",
                icon: <Grid size={24} className="text-yellow-500" />,
                details: [
                  "Decorative frame patterns",
                  "Grid and line templates",
                  "Export as images or PDFs",
                  "Customizable layouts",
                ],
              },
              {
                title: "Roadmap Creator",
                description:
                  "Build visual roadmaps with pre-made templates or start from scratch with a blank canvas.",
                icon: <ArrowRight size={24} className="text-orange-500" />,
                details: [
                  "Pre-made templates",
                  "Drag-and-drop objects",
                  "Collaborative editing",
                  "Export options",
                ],
              },
              {
                title: "Comprehensive PDF Tools",
                description:
                  "Edit, merge, extract data, and more with our complete suite of PDF management tools.",
                icon: <FileEdit size={24} className="text-red-500" />,
                details: [
                  "Edit and manipulate PDFs",
                  "OCR text extraction",
                  "AI-powered summarization",
                  "Multi-format integration",
                ],
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl transition-all hover:shadow-lg ${
                  darkMode
                    ? "bg-gray-800 border border-gray-700 hover:border-blue-900"
                    : "bg-white border border-gray-100 hover:border-blue-100"
                }`}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="mb-4 opacity-80">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <Check
                        size={16}
                        className="mt-1 text-blue-500 flex-shrink-0"
                      />
                      <span className="text-sm opacity-90">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Handwriting Feature Highlight */}
      <section className={`py-16 ${darkMode ? "bg-gray-800" : "bg-blue-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">
                Your Digital Handwriting
              </h2>
              <p className="text-lg mb-6 opacity-80">
                Type normally and get notes that look like they were written by
                hand—in your own unique style.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Personalized handwriting style",
                  "Multiple font options",
                  "Adjustable slant and spacing",
                  "Perfect for personal notes and study materials",
                ].map((point, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check
                      size={18}
                      className="text-blue-500 mt-1 flex-shrink-0"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                Try Handwriting Feature
              </button>
            </div>
            <div className="md:w-1/2">
              <div
                className={`rounded-xl overflow-hidden shadow-lg ${
                  darkMode ? "bg-gray-700" : "bg-white"
                }`}
              >
                <div
                  className={`p-2 ${
                    darkMode ? "bg-gray-600" : "bg-gray-100"
                  } flex items-center space-x-2`}
                >
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="p-6">
                  <div
                    className={`p-4 mb-4 ${
                      darkMode ? "bg-gray-600" : "bg-gray-50"
                    } rounded-md`}
                  >
                    <span className="text-sm font-medium">Type your text:</span>
                    <p className="mt-2 font-mono p-2 rounded bg-white/20">
                      These are my meeting notes from today's call.
                    </p>
                  </div>
                  <div
                    className={`p-4 rounded-md ${
                      darkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-blue-50 border-blue-100"
                    } border`}
                  >
                    <span
                      className={`text-sm font-medium ${
                        darkMode ? "text-blue-300" : "text-blue-600"
                      }`}
                    >
                      Your handwritten style:
                    </span>
                    <div className="mt-2 p-3">
                      <p
                        className="italic text-lg leading-relaxed"
                        style={{ fontFamily: "cursive" }}
                      >
                        These are my meeting notes from today's call.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <button
                      className={`px-3 py-1 text-sm rounded ${
                        darkMode
                          ? "bg-gray-600 hover:bg-gray-500"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      Change Style
                    </button>
                    <button
                      className={`px-3 py-1 text-sm rounded ${
                        darkMode
                          ? "bg-blue-600 hover:bg-blue-500"
                          : "bg-blue-500 hover:bg-blue-600"
                      } text-white`}
                    >
                      Export
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className={`py-20 ${darkMode ? "bg-gray-900" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="max-w-2xl mx-auto text-lg opacity-80">
              Join thousands of students, researchers, and professionals who
              love Notepaper AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Chen",
                role: "Computer Science Student",
                quote:
                  "The AI study companion is like having a personal tutor. It asks me questions that make me think deeper about the material.",
                stars: 5,
              },
              {
                name: "Sarah Johnson",
                role: "UX Researcher",
                quote:
                  "Converting my handwritten notes to organized documents used to take hours. Notepaper AI does it in seconds with incredible accuracy.",
                stars: 5,
              },
              {
                name: "Michael Lee",
                role: "Software Engineer",
                quote:
                  "The code blocks feature is a game-changer. I can test ideas right in my notes without switching between applications.",
                stars: 4,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${
                  darkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200 shadow-sm"
                }`}
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill={i < testimonial.stars ? "currentColor" : "none"}
                      className={
                        i < testimonial.stars
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <p className="mb-6 italic opacity-90">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      darkMode ? "bg-gray-700" : "bg-blue-100"
                    }`}
                  >
                    <span className="text-blue-600 font-medium">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm opacity-70">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className={`py-20 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="max-w-2xl mx-auto text-lg opacity-80">
              Choose the plan that works for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Free",
                price: "$0",
                period: "forever",
                description: "Perfect for getting started",
                features: [
                  "Basic note-taking",
                  "5 PDF conversions per month",
                  "Basic handwriting styles",
                  "1 study room",
                ],
                buttonText: "Get Started",
                highlighted: false,
              },
              {
                name: "Pro",
                price: "$12",
                period: "per month",
                description: "Everything you need for serious work",
                features: [
                  "Unlimited note-taking",
                  "Unlimited PDF features",
                  "Custom handwriting styles",
                  "10 study rooms",
                  "Advanced code blocks",
                  "Priority support",
                ],
                buttonText: "Start 14-Day Trial",
                highlighted: true,
              },
              {
                name: "Team",
                price: "$49",
                period: "per month",
                description: "Collaborative power for teams",
                features: [
                  "Everything in Pro",
                  "Unlimited study rooms",
                  "Team collaboration",
                  "Admin dashboard",
                  "API access",
                  "24/7 support",
                ],
                buttonText: "Contact Sales",
                highlighted: false,
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${
                  plan.highlighted
                    ? darkMode
                      ? "bg-blue-900 border-2 border-blue-700 shadow-lg shadow-blue-900/20"
                      : "bg-white border-2 border-blue-500 shadow-lg shadow-blue-500/10"
                    : darkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200 shadow-sm"
                }`}
              >
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    plan.highlighted ? "text-blue-500" : ""
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="ml-2 opacity-70">/{plan.period}</span>
                </div>
                <p className="mb-6 opacity-80">{plan.description}</p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <Check
                        size={18}
                        className={`${
                          plan.highlighted ? "text-blue-400" : "text-blue-500"
                        } mt-1 flex-shrink-0`}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2 rounded-md transition-colors ${
                    plan.highlighted
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : darkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Creator Section */}
      <section
        id="roadmap"
        className={`py-20 ${darkMode ? "bg-gray-900" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">
                Visual Roadmap Creator
              </h2>
              <p className="text-lg mb-6 opacity-80">
                Design beautiful roadmaps, flowcharts, and mind maps with our
                intuitive drag-and-drop interface.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Start with templates or blank canvas",
                  "Collaborate in real-time with team members",
                  "Export to multiple formats",
                  "Integrate with your notes",
                ].map((point, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check
                      size={18}
                      className="text-blue-500 mt-1 flex-shrink-0"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                Try Roadmap Creator
              </button>
            </div>
            <div className="md:w-1/2">
              <div
                className={`rounded-xl overflow-hidden shadow-lg ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div
                  className={`p-2 ${
                    darkMode ? "bg-gray-700" : "bg-gray-100"
                  } flex items-center space-x-2`}
                >
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="p-6">
                  <div
                    className={`rounded-md overflow-hidden border ${
                      darkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    <div
                      className={`p-3 ${
                        darkMode ? "bg-gray-700" : "bg-gray-100"
                      } flex justify-between items-center`}
                    >
                      <span className="font-medium">Product Roadmap</span>
                      <div className="flex space-x-2">
                        <button
                          className={`px-2 py-1 rounded text-xs ${
                            darkMode ? "bg-gray-600" : "bg-white"
                          }`}
                        >
                          Share
                        </button>
                        <button
                          className={`px-2 py-1 rounded text-xs ${
                            darkMode ? "bg-blue-600" : "bg-blue-500"
                          } text-white`}
                        >
                          Export
                        </button>
                      </div>
                    </div>
                    <div
                      className={`p-4 ${darkMode ? "bg-gray-800" : "bg-white"}`}
                    >
                      <div className="flex justify-between relative pb-10">
                        {/* Timeline connector */}
                        <div className="absolute top-8 left-28 right-28 h-1 bg-blue-200 z-0"></div>

                        {/* Milestones */}
                        {["Q1", "Q2", "Q3", "Q4"].map((quarter, index) => (
                          <div
                            key={index}
                            className="relative z-10 flex flex-col items-center"
                          >
                            <div
                              className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                                darkMode ? "bg-blue-900" : "bg-blue-100"
                              }`}
                            >
                              <span
                                className={`font-bold ${
                                  darkMode ? "text-blue-300" : "text-blue-700"
                                }`}
                              >
                                {quarter}
                              </span>
                            </div>
                            <div
                              className={`text-center p-2 rounded w-24 ${
                                darkMode
                                  ? "bg-gray-700"
                                  : "bg-white border border-gray-200"
                              }`}
                            >
                              <p className="text-xs font-medium">
                                {index === 0
                                  ? "Research"
                                  : index === 1
                                  ? "Design"
                                  : index === 2
                                  ? "Develop"
                                  : "Launch"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-4">
                        {[
                          "Feature 1",
                          "Feature 2",
                          "Feature 3",
                          "Feature 4",
                        ].map((feature, index) => (
                          <div
                            key={index}
                            className={`p-2 rounded text-xs ${
                              darkMode
                                ? "bg-gray-700 border border-gray-600"
                                : "bg-gray-50 border border-gray-200"
                            }`}
                          >
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PDF Features Section */}
      <section
        className={`py-20 relative overflow-hidden ${
          darkMode ? "bg-gray-800" : "bg-gradient-to-br from-blue-50 to-white"
        }`}
      >
        {/* Decorative elements */}
        <div className="absolute -z-10 top-1/3 left-1/4 w-64 h-64 bg-blue-400 rounded-full opacity-10 filter blur-3xl"></div>
        <div className="absolute -z-10 bottom-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full opacity-10 filter blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className={`inline-block p-2 px-4 rounded-full text-sm font-medium mb-4 ${
                darkMode
                  ? "bg-blue-900/50 text-blue-300"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              PDF SUPERPOWERS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Unlock The Full Potential of Your Documents
            </h2>
            <p className="max-w-2xl mx-auto text-lg opacity-80">
              Transform how you work with PDFs using our comprehensive suite of
              intelligent tools
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 mb-16">
            <div
              className={`lg:w-1/2 rounded-xl overflow-hidden border ${
                darkMode
                  ? "bg-gray-900 border-gray-700"
                  : "bg-white border-gray-200"
              } shadow-lg transition-all`}
            >
              <div className="relative">
                <div
                  className={`absolute inset-0 ${
                    darkMode
                      ? "bg-gradient-to-b from-transparent to-gray-900"
                      : "bg-gradient-to-b from-transparent to-white"
                  }`}
                ></div>
                <div className="p-8 relative z-10">
                  <h3 className="text-2xl font-bold mb-4">Edit & Manipulate</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: "Edit Text", icon: "✏️" },
                      { name: "Add Images", icon: "🖼️" },
                      { name: "Merge Files", icon: "🔗" },
                      { name: "Split Pages", icon: "✂️" },
                      { name: "Compress", icon: "🗜️" },
                      { name: "Convert Format", icon: "🔄" },
                      { name: "Protect/Unlock", icon: "🔒" },
                      { name: "Sign Documents", icon: "✍️" },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className={`flex items-center p-3 rounded-lg ${
                          darkMode
                            ? "bg-gray-800 hover:bg-gray-700"
                            : "bg-gray-50 hover:bg-blue-50"
                        } transition-colors cursor-pointer`}
                      >
                        <span className="text-xl mr-3">{feature.icon}</span>
                        <span className="text-sm font-medium">
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`lg:w-1/2 rounded-xl overflow-hidden ${
                darkMode
                  ? "bg-gray-900 border-gray-700"
                  : "bg-white border-gray-200"
              } border shadow-lg transition-all`}
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">AI-Powered Analysis</h3>
                <div className="space-y-6">
                  <div
                    className={`p-4 rounded-lg ${
                      darkMode ? "bg-gray-800" : "bg-blue-50"
                    }`}
                  >
                    <div className="flex items-center mb-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                          darkMode ? "bg-blue-900" : "bg-blue-100"
                        }`}
                      >
                        <span className="text-lg">🔍</span>
                      </div>
                      <span className="font-medium">OCR & Text Extraction</span>
                    </div>
                    <p className="text-sm opacity-80">
                      Convert scanned documents to searchable, editable text
                      with industry-leading accuracy.
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-lg ${
                      darkMode ? "bg-gray-800" : "bg-blue-50"
                    }`}
                  >
                    <div className="flex items-center mb-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                          darkMode ? "bg-blue-900" : "bg-blue-100"
                        }`}
                      >
                        <span className="text-lg">💬</span>
                      </div>
                      <span className="font-medium">
                        Chat with Your Documents
                      </span>
                    </div>
                    <p className="text-sm opacity-80">
                      Ask questions and get instant answers from your PDFs, no
                      matter how long or complex.
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-lg ${
                      darkMode ? "bg-gray-800" : "bg-blue-50"
                    }`}
                  >
                    <div className="flex items-center mb-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                          darkMode ? "bg-blue-900" : "bg-blue-100"
                        }`}
                      >
                        <span className="text-lg">📊</span>
                      </div>
                      <span className="font-medium">
                        Data Extraction & Analysis
                      </span>
                    </div>
                    <p className="text-sm opacity-80">
                      Automatically identify and extract tables, charts and key
                      figures for quick analysis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* File Format Compatibility Section */}
          <div
            className={`p-8 rounded-xl ${
              darkMode
                ? "bg-gray-900/50 border border-gray-700"
                : "bg-white/80 border border-gray-200 backdrop-blur-sm"
            } shadow-lg`}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">
                Universal Compatibility
              </h3>
              <p className="opacity-80">
                Seamlessly work with multiple document formats
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {[
                { format: "PDF", color: "red" },
                { format: "EPUB", color: "green" },
                { format: "HTML", color: "orange" },
                { format: "XML", color: "blue" },
                { format: "JSON", color: "yellow" },
                { format: "CAD", color: "purple" },
                { format: "TXT", color: "gray" },
                { format: "DOC", color: "indigo" },
                { format: "XLS", color: "emerald" },
                { format: "PPT", color: "red" },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`py-2 px-4 rounded-full text-sm font-mono font-bold ${
                    darkMode
                      ? `bg-${item.color}-900/30 text-${item.color}-300 border border-${item.color}-800/50`
                      : `bg-${item.color}-100 text-${item.color}-700`
                  }`}
                >
                  {item.format}
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button
                className={`px-6 py-3 rounded-lg ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-500"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white font-medium transition-colors`}
              >
                Try PDF Tools Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Handwriting Feature Highlight */}
      <section className={`py-16 ${darkMode ? "bg-gray-800" : "bg-blue-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">
                Your Digital Handwriting
              </h2>
              <p className="text-lg mb-6 opacity-80">
                Type normally and get notes that look like they were written by
                hand—in your own unique style.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Personalized handwriting style",
                  "Multiple font options",
                  "Adjustable slant and spacing",
                  "Perfect for personal notes and study materials",
                ].map((point, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check
                      size={18}
                      className="text-blue-500 mt-1 flex-shrink-0"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                Try Handwriting Feature
              </button>
            </div>
            <div className="md:w-1/2">
              <div
                className={`rounded-xl overflow-hidden shadow-lg ${
                  darkMode ? "bg-gray-700" : "bg-white"
                }`}
              >
                <div
                  className={`p-2 ${
                    darkMode ? "bg-gray-600" : "bg-gray-100"
                  } flex items-center space-x-2`}
                >
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="p-6">
                  <div
                    className={`p-4 mb-4 ${
                      darkMode ? "bg-gray-600" : "bg-gray-50"
                    } rounded-md`}
                  >
                    <span className="text-sm font-medium">Type your text:</span>
                    <p className="mt-2 font-mono p-2 rounded bg-white/20">
                      These are my meeting notes from today's call.
                    </p>
                  </div>
                  <div
                    className={`p-4 rounded-md ${
                      darkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-blue-50 border-blue-100"
                    } border`}
                  >
                    <span
                      className={`text-sm font-medium ${
                        darkMode ? "text-blue-300" : "text-blue-600"
                      }`}
                    >
                      Your handwritten style:
                    </span>
                    <div className="mt-2 p-3">
                      <p
                        className="italic text-lg leading-relaxed"
                        style={{ fontFamily: "cursive" }}
                      >
                        These are my meeting notes from today's call.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <button
                      className={`px-3 py-1 text-sm rounded ${
                        darkMode
                          ? "bg-gray-600 hover:bg-gray-500"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      Change Style
                    </button>
                    <button
                      className={`px-3 py-1 text-sm rounded ${
                        darkMode
                          ? "bg-blue-600 hover:bg-blue-500"
                          : "bg-blue-500 hover:bg-blue-600"
                      } text-white`}
                    >
                      Export
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`py-24 relative ${darkMode ? "bg-gray-900" : "bg-white"}`}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-24 overflow-hidden">
          <div
            className={`h-24 w-full ${darkMode ? "opacity-10" : "opacity-5"}`}
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 23px, #88B9EF 24px)",
              backgroundSize: "100% 24px",
            }}
          ></div>
        </div>
        <div className="absolute bottom-0 right-0 w-full h-32 overflow-hidden">
          <div
            className={`h-32 w-full ${darkMode ? "opacity-10" : "opacity-5"}`}
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 23px, #88B9EF 24px)",
              backgroundSize: "24px 100%",
            }}
          ></div>
        </div>

        {/* Small notebook decoration */}
        <div className="absolute top-16 right-8 w-16 h-20 hidden lg:block">
          <div
            className={`w-full h-full rounded-md transform rotate-12 ${
              darkMode ? "bg-gray-800" : "bg-amber-50"
            } shadow-md border-l-4 ${
              darkMode ? "border-blue-700" : "border-amber-300"
            }`}
          ></div>
          <div
            className={`absolute inset-0 opacity-20`}
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 5px, #6B7280 5.5px)",
              backgroundSize: "100% 6px",
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div
              className={`inline-block p-2 px-4 rounded-full text-sm font-medium mb-4 ${
                darkMode
                  ? "bg-indigo-900/50 text-indigo-300"
                  : "bg-indigo-100 text-indigo-700"
              }`}
            >
              CREATIVE WRITING
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Express Your Ideas Beautifully
            </h2>
            <p className="max-w-2xl mx-auto text-lg opacity-80">
              Create stunning notes, diagrams, and documents with powerful
              writing tools
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center mb-16">
            {/* Large writing showcase image - spans 3 columns */}
            <div className="lg:col-span-3 relative">
              <div
                className={`rounded-2xl overflow-hidden shadow-xl border ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <div
                  className={`p-2 ${
                    darkMode ? "bg-gray-800" : "bg-gray-100"
                  } flex items-center space-x-2`}
                >
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-xs opacity-50 ml-2">
                    Creative Workspace
                  </span>
                </div>
                <div className={`p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                  <div
                    className={`rounded-xl overflow-hidden ${
                      darkMode ? "bg-gray-900" : "bg-blue-50"
                    } p-6 shadow-inner`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl font-bold">
                          Physics Notes: Gravity & Motion
                        </h3>
                        <p className="text-sm opacity-70">
                          Last edited 2 hours ago
                        </p>
                      </div>
                      <div
                        className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs ${
                          darkMode
                            ? "bg-blue-900/50 text-blue-300"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        <span>3 Collaborators</span>
                      </div>
                    </div>

                    <div className="flex space-x-4 mb-6">
                      {/* Writing tools mockup */}
                      <div
                        className={`flex rounded-lg overflow-hidden shadow-sm ${
                          darkMode
                            ? "bg-gray-800 border border-gray-700"
                            : "bg-white border border-gray-200"
                        }`}
                      >
                        {["T", "B", "I", "U", "∑"].map((tool, i) => (
                          <button
                            key={i}
                            className={`w-8 h-8 flex items-center justify-center text-sm ${
                              i === 4
                                ? darkMode
                                  ? "bg-blue-900/50 text-blue-300"
                                  : "bg-blue-100 text-blue-700"
                                : ""
                            }`}
                          >
                            {tool}
                          </button>
                        ))}
                      </div>

                      <div
                        className={`flex rounded-lg overflow-hidden shadow-sm ${
                          darkMode
                            ? "bg-gray-800 border border-gray-700"
                            : "bg-white border border-gray-200"
                        }`}
                      >
                        {["◻", "◯", "△", "↗", "↔"].map((shape, i) => (
                          <button
                            key={i}
                            className={`w-8 h-8 flex items-center justify-center ${
                              i === 2
                                ? darkMode
                                  ? "bg-green-900/50 text-green-300"
                                  : "bg-green-100 text-green-700"
                                : ""
                            }`}
                          >
                            {shape}
                          </button>
                        ))}
                      </div>

                      <div
                        className={`flex rounded-lg overflow-hidden shadow-sm ${
                          darkMode
                            ? "bg-gray-800 border border-gray-700"
                            : "bg-white border border-gray-200"
                        }`}
                      >
                        <div className="w-6 h-8 bg-red-500"></div>
                        <div className="w-6 h-8 bg-blue-500"></div>
                        <div className="w-6 h-8 bg-green-500"></div>
                        <div className="w-6 h-8 bg-yellow-500"></div>
                        <div className="w-6 h-8 bg-purple-500"></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Handwritten math equation */}
                      <div
                        className={`p-4 rounded-xl ${
                          darkMode ? "bg-gray-800" : "bg-white"
                        } shadow`}
                      >
                        <p className="text-sm mb-2 font-medium">
                          Gravitational Force:
                        </p>
                        <div className="flex items-center justify-center py-3">
                          <p className="text-lg font-mono">F = G × (m₁m₂)/r²</p>
                        </div>
                        <div
                          className={`mt-2 p-2 rounded text-xs ${
                            darkMode ? "bg-gray-700" : "bg-blue-50"
                          }`}
                        >
                          <p>Newton's law of universal gravitation</p>
                        </div>
                      </div>

                      {/* Simple diagram */}
                      <div
                        className={`p-4 rounded-xl ${
                          darkMode ? "bg-gray-800" : "bg-white"
                        } shadow`}
                      >
                        <p className="text-sm mb-2 font-medium">
                          Free Fall Motion:
                        </p>
                        <div className="relative h-24 flex justify-center">
                          <div
                            className={`absolute h-full w-1 ${
                              darkMode ? "bg-gray-700" : "bg-gray-200"
                            }`}
                          ></div>
                          <div className="absolute top-0 w-6 h-6 rounded-full bg-blue-500 transform -translate-x-1/2"></div>
                          <div className="absolute top-1/3 w-6 h-6 rounded-full bg-blue-500 transform -translate-x-1/2"></div>
                          <div className="absolute top-2/3 w-6 h-6 rounded-full bg-blue-500 transform -translate-x-1/2"></div>
                          <div className="absolute bottom-0 w-6 h-6 rounded-full bg-blue-500 transform -translate-x-1/2"></div>
                        </div>
                        <div
                          className={`mt-2 p-2 rounded text-xs ${
                            darkMode ? "bg-gray-700" : "bg-blue-50"
                          }`}
                        >
                          <p>d = ½gt²</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating avatar indicators */}
              <div className="absolute bottom-4 right-4 flex -space-x-2">
                {["bg-pink-500", "bg-green-500", "bg-yellow-500"].map(
                  (color, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full ${color} flex items-center justify-center text-white text-xs border-2 ${
                        darkMode ? "border-gray-800" : "border-white"
                      }`}
                    >
                      {["AJ", "TR", "MK"][i]}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Feature list - spans 2 columns */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-6">
                Rich Writing Experience
              </h3>

              <div className="space-y-6">
                {[
                  {
                    title: "Beautiful Templates & Frames",
                    desc: "Choose from lined, grid, dot, or decorative background patterns",
                    icon: "🖌️",
                  },
                  {
                    title: "Mathematical Expressions",
                    desc: "Write complex equations with intuitive LaTeX support",
                    icon: "∑",
                  },
                  {
                    title: "Shapes & Diagrams",
                    desc: "Insert and customize shapes, arrows, and connectors",
                    icon: "◯",
                  },
                  {
                    title: "Real-Time Collaboration",
                    desc: "Invite teammates to edit and comment simultaneously",
                    icon: "👥",
                  },
                  {
                    title: "Color Coding & Highlighting",
                    desc: "Organize your notes with visual color emphasis",
                    icon: "🎨",
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-lg mr-4 flex items-center justify-center text-xl ${
                        darkMode ? "bg-gray-800" : "bg-indigo-100"
                      }`}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{feature.title}</h4>
                      <p className="text-sm opacity-80">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors">
                Explore Writing Tools
              </button>
            </div>
          </div>

          {/* Paper styles showcase */}
          <div
            className={`p-8 rounded-xl ${
              darkMode ? "bg-gray-800" : "bg-indigo-50"
            } shadow-lg text-center mb-8`}
          >
            <h3 className="text-xl font-bold mb-6">
              Choose Your Perfect Paper Style
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  name: "Classic Lined",
                  bg: "repeating-linear-gradient(0deg, transparent, transparent 23px, #88B9EF 24px)",
                },
                {
                  name: "Grid Paper",
                  bg: "linear-gradient(#88B9EF 1px, transparent 1px), linear-gradient(90deg, #88B9EF 1px, transparent 1px)",
                },
                {
                  name: "Dot Grid",
                  bg: "radial-gradient(circle, #88B9EF 1px, transparent 1px)",
                },
                {
                  name: "Cornell Notes",
                  bg: "linear-gradient(90deg, #88B9EF 2px, transparent 2px), repeating-linear-gradient(0deg, transparent, transparent 23px, #88B9EF 24px)",
                },
              ].map((style, index) => (
                <div key={index} className="group cursor-pointer">
                  <div
                    className={`aspect-w-4 aspect-h-5 mb-2 rounded overflow-hidden ${
                      darkMode ? "bg-gray-900" : "bg-white"
                    } shadow-md group-hover:shadow-lg transition-shadow border ${
                      darkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: style.bg,
                        backgroundSize:
                          style.name === "Grid Paper"
                            ? "24px 24px"
                            : style.name === "Dot Grid"
                            ? "24px 24px"
                            : "100% 24px",
                        backgroundPosition: "center",
                        opacity: darkMode ? 0.3 : 0.4,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm font-medium">{style.name}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm opacity-70">
              Plus many more custom paper styles and templates
            </p>
          </div>

          {/* Collaborative element */}
          <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl overflow-hidden shadow-lg">
            <div className="md:w-1/2 p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Collaborate in Real-Time
              </h3>
              <p className="mb-6 text-indigo-100">
                Invite teammates, classmates, or colleagues to join your
                workspace. Everyone can edit, comment, and contribute
                simultaneously.
              </p>
              <div className="flex items-center space-x-2">
                <button className="px-5 py-2 bg-white text-indigo-700 rounded-md font-medium">
                  Start Collaborating
                </button>
                <button className="px-5 py-2 bg-indigo-800 text-white rounded-md font-medium">
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-1/2 p-8 flex justify-center">
              <div className="relative">
                <div
                  className={`w-48 h-64 rounded-lg ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } shadow-lg transform -rotate-6`}
                ></div>
                <div
                  className={`absolute top-4 left-4 w-48 h-64 rounded-lg ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } shadow-lg transform rotate-3`}
                ></div>
                <div className="absolute top-8 left-8 w-48 h-64 rounded-lg bg-indigo-100 shadow-lg border border-indigo-200 z-10">
                  <div className="h-full w-full p-4">
                    <div className="w-full h-4 bg-indigo-200 rounded mb-3"></div>
                    <div className="w-3/4 h-4 bg-indigo-200 rounded mb-6"></div>
                    <div className="w-full h-2 bg-indigo-200 rounded mb-2"></div>
                    <div className="w-full h-2 bg-indigo-200 rounded mb-2"></div>
                    <div className="w-4/5 h-2 bg-indigo-200 rounded mb-6"></div>
                    <div className="flex space-x-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-pink-300 flex items-center justify-center text-xs">
                        AJ
                      </div>
                      <div className="flex-1 h-8 bg-indigo-200 rounded"></div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 rounded-full bg-green-300 flex items-center justify-center text-xs">
                        TR
                      </div>
                      <div className="flex-1 h-8 bg-indigo-200 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Floating cursors to show collaboration */}
                <div className="absolute top-16 right-12 w-6 h-6 z-20">
                  <div className="w-4 h-4 transform rotate-45 bg-pink-500"></div>
                </div>
                <div className="absolute top-36 left-20 w-6 h-6 z-20">
                  <div className="w-4 h-4 transform rotate-45 bg-green-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}