import React from 'react';
import { motion } from 'framer-motion';
import MorphingSection from './MorphingSection';
import { 
  Users, 
  Briefcase, 
  Code2, 
  LightbulbIcon, 
  Ear, 
  Pencil,
  Rocket,
  Building,
  Workflow
} from 'lucide-react';

const FeaturesSection: React.FC = () => {
  // Who We Are section
  const whoWeAre = {
    title: "Who We Are",
    description: "Coact is a venture studio for the builders, the thinkers, and the quietly rebellious.",
    content: [
      "We question what is and imagine what could be. Our mission is simple:",
      "Build what people truly need to thrive today—while designing for the future we believe in.",
      "We operate at the edge of what's possible.",
      "We explore deeply.",
      "We build deliberately."
    ]
  };
  
  // The Ecosystem section
  const ecosystem = [
    {
      title: 'For Founders',
      description: 'Join forces with experienced operators, validated playbooks, and mission-aligned resources to launch and scale impactful ventures.',
      icon: <Rocket size={24} />,
      content: 'Access our network, resources, and expertise to build ventures that matter.'
    },
    {
      title: 'For Investors',
      description: 'Access vetted opportunities built from first principles—designed to solve real problems in real markets.',
      icon: <Briefcase size={24} />,
      content: 'Invest in ventures that have been rigorously validated and built with purpose.'
    },
    {
      title: 'For Operators',
      description: 'Help shape bold ventures. Collaborate with mission-led teams solving complex, meaningful problems.',
      icon: <Code2 size={24} />,
      content: 'Join our team of builders and contribute your skills to ventures that make a difference.'
    },
    {
      title: 'For Advisors',
      description: 'Bring your wisdom. Co-create long-term impact. Guide visionary founders toward clarity, structure, and traction.',
      icon: <LightbulbIcon size={24} />,
      content: 'Share your expertise and help shape the next generation of impactful ventures.'
    }
  ];
  
  // The Coact Method section
  const coactMethod = [
    {
      title: '1. First, We Listen',
      description: 'We tune into patterns, timing, data, and the silent gaps between industries.',
      icon: <Ear size={24} />,
      content: 'Our process begins with deep listening to identify opportunities that others miss.'
    },
    {
      title: '2. Then, We Design',
      description: 'We architect adaptable systems—not just products—designed for scale and longevity.',
      icon: <Pencil size={24} />,
      content: 'We design holistic solutions that can evolve and adapt to changing conditions.'
    },
    {
      title: '3. Finally, We Build',
      description: 'We execute with surgical focus, guided by insight, not hype. We build ventures that stand the test of time.',
      icon: <Building size={24} />,
      content: 'Our execution is deliberate, focused, and built on a foundation of deep understanding.'
    }
  ];
  
  // Sectors We're Exploring
  const sectors = [
    "Work & Wealth",
    "Knowledge & Thought",
    "Energy & Resources",
    "Exploration & Discovery",
    "Trade & Commerce",
    "Mobility & Logistics",
    "Food & Systems",
    "Media & Influence"
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
        {/* Who We Are Section */}
        <motion.div 
          className="text-center mb-16"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              {whoWeAre.title}
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            {whoWeAre.description}
          </p>
          <div className="max-w-3xl mx-auto text-left space-y-4">
            {whoWeAre.content.map((paragraph, idx) => (
              <p key={idx} className="text-lg text-slate-300">{paragraph}</p>
            ))}
          </div>
        </motion.div>

        {/* The Ecosystem Section */}
        <motion.div 
          className="mt-24 mb-16"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              The Ecosystem
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto text-center mb-12">
            One studio. Many pathways.
          </p>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto text-center mb-12">
            Whether you're building, investing, collaborating, or advising—Coact is a launchpad for creators of the next era.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {ecosystem.map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >
                <MorphingSection
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                >
                  <p className="text-slate-400">🔹 {item.content}</p>
                </MorphingSection>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* The Coact Method Section */}
        <motion.div 
          className="mt-24 mb-16"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              The Coact Method: Our Open Playbook
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto text-center mb-12">
            We don't just build startups. We build systems that evolve.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coactMethod.map((method, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >
                <MorphingSection
                  title={method.title}
                  description={method.description}
                  icon={method.icon}
                >
                  <p className="text-slate-400">{method.content}</p>
                </MorphingSection>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sectors We're Exploring Section */}
        <motion.div 
          className="mt-24"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              Explore Our Ecosystem
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto text-center mb-4">
            Our ventures span across the essentials of life, work, and the future.
          </p>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto text-center mb-12">
            Every venture is designed to question the norm, push boundaries, and deliver measurable impact.
          </p>

          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center text-slate-200">
              Sectors We're Exploring:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sectors.map((sector, index) => (
                <motion.div
                  key={index}
                  className="p-4 border border-slate-700 rounded-lg bg-slate-900/50 backdrop-blur-sm"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.05 } }
                  }}
                >
                  <p className="text-lg text-slate-300">🔹 {sector}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto text-center mt-12 mb-4">
            Each venture is a living experiment—systematically designed, continuously improved, built to scale.
          </p>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-4 text-slate-200">
              A World in Motion, Built by the Curious
            </h3>
            <p className="text-lg text-slate-300 mb-2">We build. We explore. We challenge.</p>
            <p className="text-lg text-slate-300 mb-2">Always with purpose. Always for progress.</p>
            <p className="text-lg text-slate-300">Join us as we shape what's next.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeaturesSection;