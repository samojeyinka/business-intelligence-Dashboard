'use client';
import { useThemeStore } from '@/lib/stores/themeStore';
import { ArrowRight, ChevronRight, ExternalLink, Github, Heart, Instagram, Linkedin, Mail, Twitter } from 'lucide-react';

export default function Footer() {
    const { darkMode ,toggleDarkMode} = useThemeStore();
    return (
        <>
        
              <footer
                className={`relative overflow-hidden ${
                  darkMode ? "bg-gray-900 text-gray-300" : "bg-white text-gray-700"
                }`}
              >
                {/* Top wave decoration */}
                <div className="absolute top-0 left-0 w-full overflow-hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className={`w-full h-16 rotate-180 ${
                      darkMode ? "text-gray-800" : "text-gray-50"
                    }`}
                  >
                    <path
                      d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
        
                {/* Newsletter & CTA Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-6 relative z-10">
                  <div
                    className={`rounded-3xl overflow-hidden ${
                      darkMode
                        ? "bg-gradient-to-br from-blue-900 to-indigo-900"
                        : "bg-gradient-to-br from-blue-500 to-indigo-600"
                    }`}
                  >
                    <div className="relative p-8 md:p-12">
                      {/* Background decoration */}
                      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 opacity-20 blur-3xl"></div>
                      <div className="absolute bottom-0 left-1/4 -mb-16 w-64 h-64 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 opacity-20 blur-3xl"></div>
        
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Stay Updated with Notepaper AI
                          </h2>
                          <p className="text-blue-100 mb-4 md:pr-12">
                            Get the latest news, product updates, and exclusive tips
                            delivered to your inbox.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                            <input
                              type="email"
                              placeholder="Enter your email"
                              className={`flex-1 px-5 py-3 rounded-l-lg focus:outline-none ${
                                darkMode
                                  ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                                  : "bg-white text-gray-900 border-gray-200 placeholder-gray-500"
                              } border`}
                            />
                            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-r-lg transition-colors flex items-center justify-center">
                              Subscribe
                              <ArrowRight size={16} className="ml-2" />
                            </button>
                          </div>
                          <p className="mt-3 text-sm text-blue-200">
                            No spam, ever. We respect your privacy.
                          </p>
                        </div>
        
                        <div className="flex justify-center md:justify-end">
                          <div
                            className={`rounded-2xl ${
                              darkMode ? "bg-gray-800" : "bg-white"
                            } shadow-xl p-4 max-w-xs transform rotate-2 hover:rotate-0 transition-all duration-300`}
                          >
                            <div
                              className={`p-2 ${
                                darkMode ? "bg-gray-900" : "bg-gray-100"
                              } rounded-lg mb-3 flex items-center`}
                            >
                              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs mr-2">
                                NP
                              </div>
                              <div className="flex-1">
                                <div className="h-3 w-3/4 rounded-full bg-gray-300 mb-1"></div>
                                <div className="h-2 w-1/2 rounded-full bg-gray-300"></div>
                              </div>
                            </div>
                            <p
                              className={`text-sm ${
                                darkMode ? "text-blue-300" : "text-blue-700"
                              } ml-1 mb-1`}
                            >
                              Latest feature:
                            </p>
                            <h3
                              className={`text-base font-semibold ${
                                darkMode ? "text-white" : "text-gray-900"
                              } mb-2`}
                            >
                              AI-Enhanced Handwriting
                            </h3>
                            <div
                              className={`rounded-lg ${
                                darkMode ? "bg-gray-900" : "bg-blue-50"
                              } p-3 mb-2`}
                            >
                              <p
                                className="text-sm italic"
                                style={{ fontFamily: "cursive" }}
                              >
                                Your digital handwriting has never looked so
                                authentic...
                              </p>
                            </div>
                            <div className="flex justify-end">
                              <button
                                className={`text-xs px-3 py-1 rounded-full ${
                                  darkMode
                                    ? "bg-blue-900 text-blue-300"
                                    : "bg-blue-100 text-blue-700"
                                } flex items-center`}
                              >
                                Learn more <ChevronRight size={12} className="ml-1" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
        
                {/* Main Footer Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                    <div className="md:col-span-4">
                      <div className="flex items-center mb-6">
                        <span
                          className={`text-xl font-bold ${
                            darkMode ? "text-white" : "text-gray-900"
                          } mr-3`}
                        >
                          Notepaper AI
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            darkMode
                              ? "bg-blue-900 text-blue-200"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          Beta
                        </span>
                      </div>
                      <p
                        className={`mb-6 ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Transform your note-taking experience with AI-powered tools.
                        Create, collaborate, and convert between formats seamlessly.
                      </p>
                      <div className="flex space-x-4 mb-8">
                        {[
                          { icon: <Twitter size={18} />, label: "Twitter" },
                          { icon: <Github size={18} />, label: "GitHub" },
                          { icon: <Linkedin size={18} />, label: "LinkedIn" },
                          { icon: <Instagram size={18} />, label: "Instagram" },
                        ].map((social, index) => (
                          <a
                            key={index}
                            href="#"
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                              darkMode
                                ? "bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900"
                            }`}
                            aria-label={social.label}
                          >
                            {social.icon}
                          </a>
                        ))}
                      </div>
        
                      <div
                        className={`p-4 rounded-xl ${
                          darkMode ? "bg-gray-800" : "bg-blue-50"
                        } flex items-center`}
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            darkMode ? "bg-gray-700" : "bg-blue-100"
                          } mr-4`}
                        >
                          <Mail
                            size={20}
                            className={darkMode ? "text-blue-400" : "text-blue-700"}
                          />
                        </div>
                        <div>
                          <p
                            className={`text-sm font-medium ${
                              darkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            Need help?
                          </p>
                          <a
                            href="mailto:support@notepaperapp.com"
                            className={`text-xs ${
                              darkMode ? "text-blue-400" : "text-blue-700"
                            } hover:underline`}
                          >
                            support@notepaperapp.com
                          </a>
                        </div>
                      </div>
                    </div>
        
                    <div className="md:col-span-8">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {[
                          {
                            title: "Product",
                            links: [
                              "Features",
                              "Pricing",
                              "Roadmap",
                              "Early Access",
                              "Security",
                            ],
                          },
                          {
                            title: "Company",
                            links: ["About", "Jobs", "Press Kit", "Investors", "Blog"],
                          },
                          {
                            title: "Resources",
                            links: [
                              "Documentation",
                              "Tutorials",
                              "Support Center",
                              "API Reference",
                              "Status",
                            ],
                          },
                          {
                            title: "Legal",
                            links: [
                              "Terms of Service",
                              "Privacy Policy",
                              "Cookie Policy",
                              "GDPR",
                              "Accessibility",
                            ],
                          },
                        ].map((category, catIndex) => (
                          <div key={catIndex}>
                            <h3
                              className={`text-sm font-semibold ${
                                darkMode ? "text-white" : "text-gray-900"
                              } mb-4`}
                            >
                              {category.title}
                            </h3>
                            <ul className="space-y-3">
                              {category.links.map((link, linkIndex) => (
                                <li key={linkIndex}>
                                  <a
                                    href="#"
                                    className={`text-sm ${
                                      darkMode
                                        ? "text-gray-400 hover:text-white"
                                        : "text-gray-600 hover:text-gray-900"
                                    } hover:underline flex items-center`}
                                  >
                                    <span>{link}</span>
                                    {(link === "API Reference" ||
                                      link === "Documentation") && (
                                      <ExternalLink
                                        size={12}
                                        className="ml-1 opacity-70"
                                      />
                                    )}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
        
                  {/* Bottom bar */}
                  <div
                    className={`mt-12 pt-8 ${
                      darkMode ? "border-t border-gray-800" : "border-t border-gray-200"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                      <div className="flex items-center mb-4 sm:mb-0">
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-500" : "text-gray-600"
                          }`}
                        >
                          &copy; {new Date().getFullYear()} Notepaper AI. All rights
                          reserved.
                        </p>
                        <div
                          className={`ml-4 pl-4 ${
                            darkMode
                              ? "border-l border-gray-700"
                              : "border-l border-gray-300"
                          }`}
                        >
                          <span className="text-xs flex items-center">
                            Made with{" "}
                            <Heart
                              size={12}
                              className={`mx-1 ${
                                darkMode ? "text-red-400" : "text-red-500"
                              }`}
                            />{" "}
                            by dedicated note-takers
                          </span>
                        </div>
                      </div>
        
                      <div className="flex items-center space-x-6">
                        <select
                          className={`text-sm px-2 py-1 rounded ${
                            darkMode
                              ? "bg-gray-800 border-gray-700 text-gray-300"
                              : "bg-gray-100 border-gray-200 text-gray-700"
                          } border focus:outline-none`}
                        >
                          <option value="en">English (US)</option>
                          <option value="es">Español</option>
                          <option value="fr">Français</option>
                          <option value="de">Deutsch</option>
                          <option value="jp">日本語</option>
                        </select>
        
                        <button
                          className={`text-sm flex items-center ${
                            darkMode
                              ? "text-gray-400 hover:text-white"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                              fill="currentColor"
                              opacity="0.2"
                            />
                            <path
                              d="M12 20V21M18.3614 18.3614L19.0682 19.0682M20 12H21M18.3614 5.64202L19.0682 4.93524M12 4V3M5.64224 5.64223L4.93546 4.93546M4 12H3M5.64142 18.364L4.93463 19.0708"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                          Switch theme
                        </button>
        
                        <a
                          href="#"
                          className={`text-sm ${
                            darkMode
                              ? "text-gray-400 hover:text-white"
                              : "text-gray-600 hover:text-gray-900"
                          } hover:underline`}
                        >
                          Sitemap
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
        
                {/* Animated background gradient */}
                <div className="absolute inset-0 -z-10 overflow-hidden opacity-10">
                  <div className="absolute -top-[40%] -right-[40%] w-[80%] h-[80%] rounded-full bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 blur-3xl animate-pulse-slow"></div>
                  <div className="absolute -bottom-[30%] -left-[30%] w-[60%] h-[60%] rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 blur-3xl animate-pulse-slow"></div>
                </div>
              </footer>
        </>
    )
}