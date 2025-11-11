
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const Insights: React.FC = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="insights" className="py-20 sm:py-24 md:py-32 lg:py-40 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-white rounded-full blur-[100px] sm:blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-white rounded-full blur-[100px] sm:blur-[150px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          ref={ref} 
          initial="hidden" 
          animate={inView ? 'visible' : 'hidden'} 
          variants={itemVariants}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4 sm:mb-6 px-4">
            {t.insights.title} & <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">{t.insights.subtitle}</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#999999] max-w-2xl mx-auto px-4">
            {t.insights.description}
          </p>
          <div className="h-1 w-16 sm:w-24 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-6 sm:mt-8"></div>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {t.insights.articles.map((insight, index) => (
            <motion.div
              key={insight.title}
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { duration: 0.3, ease: 'easeOut' }
              }}
              className="group relative bg-gradient-to-br from-[#1a1a1a] via-[#0a0a0a] to-[#1a1a1a] border border-[#333333] p-6 sm:p-8 flex flex-col hover:border-white/50 hover:shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all duration-500"
              style={{
                clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)'
              }}
            >
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-white/20 group-hover:border-white transition-colors duration-500"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-white/20 group-hover:border-white transition-colors duration-500"></div>
              
              {/* Content */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#666666] group-hover:text-white transition-colors duration-500">
                  {insight.date}
                </p>
                <div className="w-6 h-6 sm:w-8 sm:h-8 border border-[#333333] group-hover:border-white rotate-45 group-hover:rotate-0 transition-all duration-500"></div>
              </div>
              
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-500">
                {insight.title}
              </h3>
              
              <p className="text-sm sm:text-base text-[#999999] leading-relaxed flex-grow group-hover:text-[#b0b0b0] transition-colors duration-500">
                {insight.excerpt}
              </p>
              
              <div className="mt-4 sm:mt-6 flex items-center group">
                <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">{t.insights.readMore}</span>
                <div className="ml-2 h-[1px] w-0 bg-gradient-to-r from-white to-transparent group-hover:w-12 sm:group-hover:w-16 transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Insights;
