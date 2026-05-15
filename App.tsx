import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Achievements from './components/Achievements';
import CareerTimeline from './components/CareerTimeline';
import AiWorkflow from './components/AiWorkflow';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useTranslation } from './lib/i18n/use-translation';

const App: React.FC = () => {
  const { t } = useTranslation();

  // Keep document.title synced with the active locale (announced by screen
  // readers + shown in browser tab + used by social previews when no OG override).
  useEffect(() => {
    document.title = t.meta.pageTitle;
  }, [t.meta.pageTitle]);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <a href="#main-content" className="skip-to-content">
        {t.a11y.skipToContent}
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-grow flex flex-col w-full">
        <section id="about">
          <Hero />
        </section>

        <section id="achievements">
          <Achievements />
        </section>

        <section id="careertimeline">
          <CareerTimeline />
        </section>

        <section id="aiworkflow">
          <AiWorkflow />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
