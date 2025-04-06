import React from 'react';
import { motion } from 'framer-motion';
import MorphingSection from './MorphingSection';
import { 
  Layers, 
  BrainCircuit, 
  Eye, 
  Wand2, 
  Fingerprint, 
  Sparkles 
} from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: 'Adaptive UI: The Living Interface',
      description: 'Our interfaces breathe with users, responding to their thoughts, needs, and actions in real-time.',
      icon: <Layers size={24} />,
      content: 'Fluid layouts that morph dynamically, reshaping to offer personalized journeys. The interface changes color, typography, and micro-interactions based on your engagement patterns.'
    },
    {
      title: 'AI-Powered Decision Making',
      description: 'Intelligent systems that detect how users engage and adapt the experience accordingly.',
      icon: <BrainCircuit size={24} />,
      content: 'Our AI analyzes scroll speed, reading patterns, and interaction styles to adjust content presentation, creating experiences that feel intuitive and responsive to your unique behavior.'
    },
    {
      title: 'Immersive Interactions',
      description: 'Beyond clicks and scrolls, our interfaces create emotionally resonant digital symbiosis.',
      icon: <Eye size={24} />,
      content: 'Interactive elements that respond to your movements, creating a sense of depth and dimension. Holographic-like layers float within the browser, giving users a multi-dimensional experience.'
    },
    {
      title: 'Nova: Conversational Intelligence',
      description: 'Our AI assistant understands context from your words, emotions, and engagement style.',
      icon: <Wand2 size={24} />,
      content: 'Nova doesn't just respond to queries—she proactively suggests pathways based on emotional cues and curiosity signals, creating a truly personalized guidance experience.'
    },
    {
      title: 'Dynamic Data Storytelling',
      description: 'Visualize entire ecosystems as interactive 3D worlds that evolve in real-time.',
      icon: <Sparkles size={24} />,
      content: 'Data becomes an experience as ventures, progress, and metrics unfold before your eyes. Clicking on any element reveals evolving timelines and connections within the ecosystem.'
    },
    {
      title: 'Hyper-Personalized Pathways',
      description: 'The platform adapts dynamically to your intent and actions, creating unique journeys.',
      icon: <Fingerprint size={24} />,
      content: 'Based on AI analysis of your behavior, the site alters its layout and content in real-time, focusing on what's most relevant to you at that moment.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div 
          className="text-center mb-16"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              The Living Web Experience
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            This is not your typical web experience. Here, the interface itself reacts to, learns from, and guides your curiosity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <MorphingSection
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              >
                <p className="text-slate-400">{feature.content}</p>
              </MorphingSection>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FeaturesSection;