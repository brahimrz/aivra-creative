
import React from 'react';
import { LogoIcon, TwitterIcon, LinkedInIcon, GithubIcon } from '../assets/icons';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-[#1a1a1a] text-[#b0b0b0]">
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-6 md:space-y-0 gap-6">
          <div className="flex flex-col items-center md:items-start">
            <LogoIcon className="h-6 sm:h-8 w-auto mb-2" />
            <p className="text-xs sm:text-sm max-w-xs">{t.footer.tagline}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
            <a href="#about" className="text-sm hover:text-white transition-colors">{t.nav.about}</a>
            <a href="#expertise" className="text-sm hover:text-white transition-colors">{t.nav.expertise}</a>
            <a href="#projects" className="text-sm hover:text-white transition-colors">{t.nav.projects}</a>
            <a href="#contact" className="text-sm hover:text-white transition-colors">{t.nav.contact}</a>
          </div>
          <div className="flex space-x-4 sm:space-x-6">
            <a href="#" aria-label="Twitter" className="hover:text-white transition-colors"><TwitterIcon className="h-5 w-5 sm:h-6 sm:w-6" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors"><LinkedInIcon className="h-5 w-5 sm:h-6 sm:w-6" /></a>
            <a href="#" aria-label="GitHub" className="hover:text-white transition-colors"><GithubIcon className="h-5 w-5 sm:h-6 sm:w-6" /></a>
          </div>
        </div>
        <div className="mt-8 sm:mt-12 border-t border-[#666666] pt-6 sm:pt-8 text-center text-xs sm:text-sm">
          <p>&copy; {new Date().getFullYear()} Aether Systems AI. {t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
