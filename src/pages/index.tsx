import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import CtaSection from "@/components/CtaSection";
import InteractiveBackground from "@/components/InteractiveBackground";
import DynamicCursor from "@/components/DynamicCursor";
import Nova from "@/components/Nova";
import ChatBox from "./ChatBox";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Only show dynamic cursor on client-side to prevent hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>Venture Studio | Building Tomorrow's Ventures Today</title>
        <meta name="description" content="A collaborative ecosystem for founders, investors, operators, and advisors, dedicated to purposeful innovation and impactful ventures." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="bg-slate-950 text-white min-h-screen flex flex-col relative overflow-hidden">
        {/* Interactive background with particles */}
        <InteractiveBackground />
        
        {/* Dynamic cursor (client-side only) */}
        {isMounted && <DynamicCursor />}
        
        {/* Header */}
        <Header />
        
        {/* Main content */}
        <main className="flex-1 flex flex-col pt-20">
          {/* Hero section */}
          <HeroSection />
          
          {/* Features section */}
          <FeaturesSection />
          
          {/* CTA section */}
          <CtaSection />
        </main>
        

        <ChatBox/>
        {/* Footer */}
        <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} Venture Studio. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
