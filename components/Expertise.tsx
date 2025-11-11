
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';

const icons = ['◇', '◆', '◈', '◊'];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const Expertise: React.FC = () => {
    const { t } = useLanguage();
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
      });

  return (
    <section id="expertise" className="py-20 sm:py-24 md:py-32 lg:py-40 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] relative overflow-hidden">
      {/* Decorative neural pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-white rounded-full blur-[80px] sm:blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-white rounded-full blur-[80px] sm:blur-[120px]"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4 sm:mb-6 px-4">
            {t.expertise.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">{t.expertise.subtitle}</span>
          </h2>
          <div className="h-1 w-16 sm:w-24 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </motion.div>

        <motion.div 
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto"
        >
          {t.expertise.areas.map((area, index) => (
            <motion.div
              key={area.title}
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { duration: 0.3, ease: 'easeOut' }
              }}
              className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#333333] p-6 sm:p-8 md:p-10 transition-all duration-500 ease-out hover:border-white/50 hover:shadow-[0_0_50px_rgba(255,255,255,0.1)]"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)'
              }}
            >
              {/* Decorative corner element */}
              <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-r-2 border-b-2 border-white/20 group-hover:border-white transition-colors duration-500"></div>
              
              {/* Icon */}
              <div className="text-4xl sm:text-5xl md:text-6xl font-light text-white/20 group-hover:text-white/40 transition-colors duration-500 mb-4 sm:mb-6">
                {icons[index]}
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-500">
                {area.title}
              </h3>
              
              <p className="text-sm sm:text-base text-[#999999] leading-relaxed group-hover:text-[#b0b0b0] transition-colors duration-500">
                {area.description}
              </p>
              
              {/* Animated line */}
              <div className="mt-4 sm:mt-6 h-[1px] w-0 bg-gradient-to-r from-white to-transparent group-hover:w-full transition-all duration-700 ease-out"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Expertise;
