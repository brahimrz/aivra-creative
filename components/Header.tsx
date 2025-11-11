
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Language } from '../contexts/LanguageContext';
import logoImage from '../assets/Black White Modern Letter AG Logo (1).png';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  
  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'ar', label: 'AR', flag: '🇸🇦' }
  ];

  const navLinks = [
    { key: 'about', href: 'about' },
    { key: 'expertise', href: 'expertise' },
    { key: 'projects', href: 'projects' },
    { key: 'insights', href: 'insights' },
    { key: 'contact', href: 'contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg"
    >
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center">
        <a href="#home" aria-label="Aivra Creative Home" className="flex-shrink-0 flex items-center gap-3 sm:gap-4">
          <img src={logoImage} alt="Aivra Creative Logo" className="h-12 sm:h-14 md:h-16 w-auto" />
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0a0a0a] tracking-tight">Aivra</span>
            <span className="text-sm sm:text-base md:text-lg text-[#666666] font-light tracking-wide">Creative</span>
          </div>
        </a>
        <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
          {navLinks.map((link, index) => (
            <a
              key={link.key}
              href={`#${link.href}`}
              className="text-[#1a1a1a] hover:text-[#0a0a0a] font-mono text-sm uppercase tracking-wider relative font-semibold group transition-colors duration-200 ease-out"
            >
              {t.nav[link.key as keyof typeof t.nav]}
              <span className="absolute bottom-0 left-0 h-[2px] bg-[#0a0a0a] w-0 group-hover:w-full transition-all duration-300 ease-out" />
            </a>
          ))}
        </nav>
        
        {/* Language Switcher */}
        <div className="flex items-center space-x-1 sm:space-x-2 border border-[#d0d0d0] rounded-sm overflow-hidden bg-white shadow-sm">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 ease-out ${
                language === lang.code
                  ? 'bg-[#0a0a0a] text-white'
                  : 'bg-transparent text-[#666666] hover:text-[#0a0a0a]'
              }`}
            >
              <span className="mr-0.5 sm:mr-1">{lang.flag}</span>
              <span className="hidden sm:inline">{lang.label}</span>
            </button>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden lg:inline-block bg-[#0a0a0a] text-white px-4 xl:px-6 py-2 rounded-sm text-xs xl:text-sm font-bold uppercase tracking-widest hover:bg-[#333333] transition-all duration-200 ease-out shadow-md hover:shadow-lg"
        >
          {t.nav.getInTouch}
        </a>

        {/* Mobile menu button */}
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex flex-col items-center justify-center w-10 h-10 space-y-1.5 z-50"
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle mobile menu"
        >
          <motion.span
            className="w-6 h-0.5 bg-[#0a0a0a]"
            animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="w-6 h-0.5 bg-[#0a0a0a]"
            animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="w-6 h-0.5 bg-[#0a0a0a]"
            animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 top-[80px] sm:top-[90px] bg-white z-40 shadow-xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="container mx-auto px-6 py-8 flex flex-col space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={`#${link.href}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#1a1a1a] hover:text-[#0a0a0a] transition-colors duration-200 ease-out font-mono text-lg uppercase tracking-wider border-b border-[#e0e0e0] pb-4 font-semibold"
                >
                  {t.nav[link.key as keyof typeof t.nav]}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-block bg-[#0a0a0a] text-white px-6 py-3 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-[#333333] transition-all duration-200 ease-out text-center mt-4 shadow-md"
              >
                {t.nav.getInTouch}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
