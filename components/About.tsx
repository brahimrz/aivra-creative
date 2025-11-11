
import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { NeuralBrain } from './canvas/NeuralBrain';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };

  const statsVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="about" ref={ref} className="py-20 sm:py-24 md:py-32 lg:py-40 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] relative overflow-hidden">
      {/* Decorative grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #333 1px, transparent 1px),
            linear-gradient(to bottom, #333 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center relative z-10">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={variants}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
          className="relative"
        >
          {/* Decorative elements */}
          <motion.div 
            className="hidden md:block absolute -left-4 top-0 w-1 h-24 bg-gradient-to-b from-white to-transparent"
            initial={{ height: 0 }}
            animate={inView ? { height: 96 } : { height: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          ></motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            {t.about.title1}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              {t.about.title2}
            </span>
          </h2>
          
          <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
            <p className="text-base sm:text-lg text-[#b0b0b0] leading-relaxed">
              {t.about.desc1}
            </p>
            <p className="text-base sm:text-lg text-[#999999] leading-relaxed">
              {t.about.desc2}
            </p>
          </div>

          {/* Stats or features */}
          <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            <motion.div 
              className="border-l-2 border-white/30 pl-4"
              custom={0}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={statsVariants}
            >
              <div className="text-2xl sm:text-3xl font-bold text-white">100+</div>
              <div className="text-[10px] sm:text-xs uppercase tracking-wider text-[#666666] mt-1">{t.about.stats.systems}</div>
            </motion.div>
            <motion.div 
              className="border-l-2 border-white/30 pl-2 sm:pl-4"
              custom={1}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={statsVariants}
            >
              <div className="text-2xl sm:text-3xl font-bold text-white">24/7</div>
              <div className="text-[10px] sm:text-xs uppercase tracking-wider text-[#666666] mt-1">{t.about.stats.active}</div>
            </motion.div>
            <motion.div 
              className="border-l-2 border-white/30 pl-2 sm:pl-4"
              custom={2}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={statsVariants}
            >
              <div className="text-2xl sm:text-3xl font-bold text-white">∞</div>
              <div className="text-[10px] sm:text-xs uppercase tracking-wider text-[#666666] mt-1">{t.about.stats.evolving}</div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
            className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full relative"
            initial={{ opacity: 0 }}
            animate={inView ? 'visible' : 'hidden'}
            variants={{ visible: { opacity: 1 }, hidden: { opacity: 0 } }}
            transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Frame decoration */}
          <div className="absolute inset-0 border border-[#333333] pointer-events-none z-10" style={{
            clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)'
          }}>
            <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-white/50"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-white/50"></div>
          </div>
          
          <Canvas className="rounded-sm" camera={{ position: [0, 0, 4], fov: 50 }}>
            <ambientLight intensity={0.2} />
            <Suspense fallback={null}>
              <NeuralBrain />
            </Suspense>
          </Canvas>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
