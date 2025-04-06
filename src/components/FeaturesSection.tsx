import React from 'react';
import { motion } from 'framer-motion';
import MorphingSection from './MorphingSection';
import LogoSlider from './LogoSlider';
import { 
  Users, 
  Briefcase, 
  Code2, 
  LightbulbIcon, 
  Ear, 
  Pencil,
  Rocket,
  Building,
  Workflow,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
          className="mb-20"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl -ml-32 -mb-32 pointer-events-none"></div>
            
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-3xl sm:text-4xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                  {whoWeAre.title}
                </span>
              </CardTitle>
              <CardDescription className="text-xl text-slate-300 max-w-3xl mx-auto mt-2">
                {whoWeAre.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-4">
              <div className="max-w-3xl mx-auto space-y-4 relative z-10">
                {whoWeAre.content.map((paragraph, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">{idx + 1}</span>
                    </div>
                    <p className="text-lg text-slate-300">{paragraph}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* The Ecosystem Section */}
        <motion.div 
          className="mt-24 mb-16"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 overflow-hidden relative mb-12">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl -ml-32 -mt-32 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl -mr-32 -mb-32 pointer-events-none"></div>
            
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-3xl sm:text-4xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                  The Ecosystem
                </span>
              </CardTitle>
              <CardDescription className="text-xl text-slate-300 max-w-3xl mx-auto mt-2">
                One studio. Many pathways.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-4 text-center">
              <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-6">
                Whether you're building, investing, collaborating, or advising—Coact is a launchpad for creators of the next era.
              </p>
              
              <div className="relative w-full max-w-4xl mx-auto h-64 my-8">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center z-20">
                    <span className="text-white font-bold text-lg">COACT</span>
                  </div>
                  <div className="absolute inset-0 bg-slate-800/30 rounded-full scale-[1.8] backdrop-blur-sm"></div>
                </div>
                
                {ecosystem.map((item, index) => {
                  const angle = (index * (360 / ecosystem.length)) * (Math.PI / 180);
                  const x = Math.cos(angle) * 120;
                  const y = Math.sin(angle) * 120;
                  
                  return (
                    <motion.div
                      key={index}
                      className="absolute w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center z-10"
                      style={{ 
                        left: `calc(50% + ${x}px - 2rem)`, 
                        top: `calc(50% + ${y}px - 2rem)` 
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="text-blue-500">
                        {item.icon}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {ecosystem.map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-slate-900/70 border-slate-700 h-full overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                        {item.icon}
                      </div>
                      <CardTitle>{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-slate-300 mb-4">{item.description}</p>
                    <div className="flex items-start gap-2 text-slate-400">
                      <ArrowRight size={16} className="mt-1 flex-shrink-0 text-blue-500" />
                      <p>{item.content}</p>
                    </div>
                  </CardContent>
                </Card>
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
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 overflow-hidden relative mb-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl -ml-32 -mb-32 pointer-events-none"></div>
            
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-3xl sm:text-4xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                  The Coact Method: Our Open Playbook
                </span>
              </CardTitle>
              <CardDescription className="text-xl text-slate-300 max-w-3xl mx-auto mt-2">
                We don't just build startups. We build systems that evolve.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {coactMethod.map((method, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } }
                    }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="bg-slate-800/50 border-slate-700 h-full overflow-hidden relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                      
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                            {method.icon}
                          </div>
                          <CardTitle className="text-lg">{method.title}</CardTitle>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-4">
                        <p className="text-slate-300 mb-4">{method.description}</p>
                        <div className="flex items-start gap-2 text-slate-400 mt-4 pt-4 border-t border-slate-700">
                          <p>{method.content}</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {index < coactMethod.length - 1 && (
                      <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
                        <ArrowRight className="text-blue-500" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-center mt-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/70 border border-slate-700 text-sm text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Our methodology is constantly evolving
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sectors We're Exploring Section */}
        <motion.div 
          className="mt-24"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 overflow-hidden relative mb-16">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl -ml-32 -mb-32 pointer-events-none"></div>
            
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-3xl sm:text-4xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                  Explore Our Ecosystem
                </span>
              </CardTitle>
              <CardDescription className="text-xl text-slate-300 max-w-3xl mx-auto mt-2">
                Our ventures span across the essentials of life, work, and the future.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-4">
              <p className="text-lg text-slate-300 max-w-3xl mx-auto text-center mb-8">
                Every venture is designed to question the norm, push boundaries, and deliver measurable impact.
              </p>
              
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold mb-6 text-center text-slate-200">
                  Sectors We're Exploring:
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {sectors.map((sector, index) => (
                    <motion.div
                      key={index}
                      className="relative overflow-hidden group"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.05 } }
                      }}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="h-full bg-slate-800/50 border-slate-700 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        
                        <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                          <Badge variant="outline" className="mb-2 bg-slate-900/50 border-slate-600">
                            Sector
                          </Badge>
                          <p className="text-lg font-medium text-slate-200">{sector}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <p className="text-xl text-slate-300 max-w-3xl mx-auto text-center mt-12 mb-8">
                Each venture is a living experiment—systematically designed, continuously improved, built to scale.
              </p>
            </CardContent>
          </Card>
          
          {/* Portfolio Logo Slider */}
          <motion.div
            className="mb-16"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            <LogoSlider />
          </motion.div>

          {/* Closing Section */}
          <motion.div
            className="mt-16 text-center bg-slate-900/70 backdrop-blur-sm border border-slate-800 rounded-xl p-8"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            <h3 className="text-2xl font-bold mb-4 text-slate-200">
              A World in Motion, Built by the Curious
            </h3>
            <div className="max-w-2xl mx-auto space-y-4">
              <p className="text-lg text-slate-300">We build. We explore. We challenge.</p>
              <p className="text-lg text-slate-300">Always with purpose. Always for progress.</p>
              <p className="text-lg text-slate-300 mb-6">Join us as we shape what's next.</p>
              
              <div className="pt-4 border-t border-slate-800">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/70 border border-slate-700 text-sm text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  Building tomorrow's ventures today
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeaturesSection;