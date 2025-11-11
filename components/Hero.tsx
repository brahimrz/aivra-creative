
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { NeuralStructure } from './canvas/NeuralStructure';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="home" className="h-screen w-full relative flex items-center justify-center text-center bg-[#0a0a0a] overflow-hidden pt-20 sm:pt-24">
      <div className="absolute inset-0 top-20 sm:top-24 z-10">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.1} />
          <pointLight position={[10, 10, 10]} color="#ffffff" intensity={1.5} />
          <Suspense fallback={null}>
            <NeuralStructure />
          </Suspense>
        </Canvas>
      </div>
      <motion.div
        className="relative z-20 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tighter leading-tight max-w-4xl mx-auto px-4">
          {t.hero.title}
        </h1>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-[#b0b0b0] max-w-2xl mx-auto font-light px-4">
          {t.hero.subtitle}
        </p>
        <motion.a
          href="#projects"
          className="mt-8 sm:mt-10 inline-block border border-[#666666] text-[#e0e0e0] px-6 sm:px-8 py-2.5 sm:py-3 rounded-sm text-sm sm:text-md font-bold uppercase tracking-widest hover:bg-white hover:text-[#0a0a0a] transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t.hero.cta}
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
