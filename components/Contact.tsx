
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { LightPattern } from './canvas/LightPattern';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="contact" className="py-20 sm:py-24 md:py-32 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
            <Canvas>
                <Suspense fallback={null}>
                    <LightPattern color="#e0e0e0"/>
                </Suspense>
            </Canvas>
        </div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{t.contact.title}</h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-[#b0b0b0]">
              {t.contact.description}
            </p>
          </motion.div>
          <motion.form
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, amount: 0.3 }}
             transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99], delay: 0.2 }}
             className="space-y-4 sm:space-y-6"
            >
            <motion.input
              type="text"
              placeholder={t.contact.form.fullName}
              className="w-full bg-[#1a1a1a] text-[#e0e0e0] p-3 sm:p-4 text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#666666] transition-all duration-300"
              whileFocus={{ scale: 1.01, boxShadow: '0 0 20px rgba(255,255,255,0.1)' }}
            />
            <motion.input
              type="email"
              placeholder={t.contact.form.email}
              className="w-full bg-[#1a1a1a] text-[#e0e0e0] p-3 sm:p-4 text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#666666] transition-all duration-300"
              whileFocus={{ scale: 1.01, boxShadow: '0 0 20px rgba(255,255,255,0.1)' }}
            />
            <motion.textarea
              placeholder={t.contact.form.projectDetails}
              rows={4}
              className="w-full bg-[#1a1a1a] text-[#e0e0e0] p-3 sm:p-4 text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#666666] transition-all duration-300"
              whileFocus={{ scale: 1.01, boxShadow: '0 0 20px rgba(255,255,255,0.1)' }}
            ></motion.textarea>
            <motion.button
              type="submit"
              className="w-full bg-[#333333] text-white p-3 sm:p-4 text-sm sm:text-base font-bold uppercase tracking-widest hover:bg-white hover:text-[#0a0a0a] transition-colors duration-300"
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.98 }}
            >
              {t.contact.form.submit}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
