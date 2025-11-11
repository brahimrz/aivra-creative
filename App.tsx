
import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import Projects from './components/Projects';
import Insights from './components/Insights';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ChatBot from './components/ChatBot';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="bg-[#0a0a0a] w-full overflow-x-hidden">
        <Header />
        <main>
          <Hero />
          <About />
          <Expertise />
          <Projects />
          <Insights />
          <Contact />
        </main>
        <Footer />
        <ChatBot />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  );
};

export default App;
