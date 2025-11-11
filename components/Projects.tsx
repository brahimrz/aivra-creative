
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const projectData = [
  { id: 1, title: 'E-Commerce Platform', categoryKey: 'cognitiveAutomation', height: 'h-80', description: 'Full-stack online store with payment integration', icon: 'shopping' },
  { id: 2, title: 'Analytics Dashboard', categoryKey: 'predictiveAnalytics', height: 'h-96', description: 'Real-time data visualization desktop application', icon: 'chart' },
  { id: 3, title: 'Corporate Website', categoryKey: 'dataSynthesis', height: 'h-80', description: 'Professional business website with CMS', icon: 'globe' },
  { id: 4, title: 'AI Customer Support', categoryKey: 'agentInfrastructure', height: 'h-96', description: 'Intelligent chatbot automation system', icon: 'ai' },
  { id: 5, title: 'Inventory Manager', categoryKey: 'neuralNetworks', height: 'h-96', description: 'Desktop app for warehouse management', icon: 'desktop' },
  { id: 6, title: 'Marketing Automation', categoryKey: 'systemOptimization', height: 'h-80', description: 'AI-powered email and social media agent', icon: 'automation' },
];

// Animated Icon Components
const AnimatedIcon: React.FC<{ type: string }> = ({ type }) => {
  const iconVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const pathVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
      pathLength: 1, 
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse" as const,
        repeatDelay: 0.5
      }
    }
  };

  switch(type) {
    case 'shopping':
      return (
        <motion.svg variants={iconVariants} initial="initial" animate="animate" whileHover="hover" className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <motion.path variants={pathVariants} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" />
          <motion.circle cx="9" cy="19" r="1.5" fill="currentColor" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <motion.circle cx="17" cy="19" r="1.5" fill="currentColor" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} />
        </motion.svg>
      );
    case 'chart':
      return (
        <motion.svg variants={iconVariants} initial="initial" animate="animate" whileHover="hover" className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <motion.path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" 
            animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
          <motion.path d="M5 19V13" strokeLinecap="round" animate={{ pathLength: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.path d="M13 19V9" strokeLinecap="round" animate={{ pathLength: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />
          <motion.path d="M19 19V5" strokeLinecap="round" animate={{ pathLength: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} />
        </motion.svg>
      );
    case 'globe':
      return (
        <motion.svg variants={iconVariants} initial="initial" animate="animate" whileHover="hover" className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <motion.circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
          <motion.path variants={pathVariants} d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" strokeLinecap="round" strokeLinejoin="round" />
          <motion.circle cx="12" cy="12" r="3" fill="currentColor" animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
        </motion.svg>
      );
    case 'ai':
      return (
        <motion.svg variants={iconVariants} initial="initial" animate="animate" whileHover="hover" className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <motion.path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
          <motion.circle cx="9" cy="9" r="1.5" fill="currentColor" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <motion.circle cx="15" cy="9" r="1.5" fill="currentColor" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} />
          <motion.path d="M12 9v2" strokeLinecap="round" animate={{ y: [0, 2, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
        </motion.svg>
      );
    case 'desktop':
      return (
        <motion.svg variants={iconVariants} initial="initial" animate="animate" whileHover="hover" className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <motion.rect x="2" y="3" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" variants={pathVariants} />
          <motion.path d="M8 21h8M12 17v4" strokeLinecap="round" strokeLinejoin="round" />
          <motion.path d="M7 8h10M7 12h6" strokeLinecap="round" animate={{ x: [0, 2, 0] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.circle cx="18" cy="10" r="1" fill="currentColor" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} />
        </motion.svg>
      );
    case 'automation':
      return (
        <motion.svg variants={iconVariants} initial="initial" animate="animate" whileHover="hover" className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <motion.path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" 
            animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <motion.circle cx="12" cy="12" r="8" strokeDasharray="2 4" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
          <motion.path d="M12 2v2M12 20v2M2 12h2M20 12h2" strokeLinecap="round" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
        </motion.svg>
      );
    default:
      return null;
  }
};

const ProjectCard: React.FC<{ project: typeof projectData[0] }> = ({ project }) => {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden group h-64 sm:h-72 md:${project.height} bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] hover:border-[#4a4a4a] transition-all duration-300 rounded-lg shadow-xl hover:shadow-2xl`}
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.4, 0, 0.2, 1],
        delay: (project.id % 3) * 0.1
      }}
    >
      {/* Animated Icon Background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <motion.div 
          className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 text-white/10 group-hover:text-white/20 transition-colors duration-500"
          initial={{ scale: 0.8, rotate: -10 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <AnimatedIcon type={project.icon} />
        </motion.div>
      </div>
      
      {/* Modern gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a]/60 via-[#0a0a0a]/40 to-[#0a0a0a]/80 group-hover:from-[#0a0a0a]/50 group-hover:via-[#0a0a0a]/30 group-hover:to-[#0a0a0a]/70 transition-all duration-500"></div>
      
      {/* Decorative accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:via-white/60 transition-colors duration-300"></div>
      
      {/* Content overlay */}
      <div className="absolute inset-0 p-5 sm:p-6 md:p-8 flex flex-col justify-between">
        {/* Top badge */}
        <div className="flex justify-between items-start">
          <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-[10px] sm:text-xs font-semibold text-white uppercase tracking-wider">
            {t.projects.categories[project.categoryKey as keyof typeof t.projects.categories]}
          </span>
          <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-white/20 rounded-lg flex items-center justify-center group-hover:border-white/60 group-hover:rotate-12 transition-all duration-300">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
        
        {/* Bottom content */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight group-hover:translate-x-2 transition-transform duration-300">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#b0b0b0] leading-relaxed max-w-md">
            {project.description}
          </p>
          <div className="flex items-center gap-2 pt-2">
            <div className="h-[2px] w-12 bg-gradient-to-r from-white/60 to-transparent group-hover:w-20 transition-all duration-300"></div>
            <span className="text-xs text-white/60 group-hover:text-white transition-colors duration-300 uppercase tracking-wider">View Project</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="projects" className="py-20 sm:py-24 md:py-32 lg:py-40 bg-gradient-to-b from-[#0a0a0a] via-[#000000] to-[#0a0a0a] relative overflow-hidden">
      {/* Modern background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #fff 1px, transparent 1px),
            linear-gradient(to bottom, #fff 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-12 sm:mb-16 md:mb-20 max-w-4xl mx-auto"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-xs sm:text-sm text-white/80 uppercase tracking-widest">
              Portfolio
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 px-4">
            {t.projects.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white">{t.projects.subtitle}</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#b0b0b0] max-w-2xl mx-auto leading-relaxed px-4">
            {t.projects.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {projectData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
