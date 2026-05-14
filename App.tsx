import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import CareerTimeline from './components/CareerTimeline';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Experience from './components/Experience';

const App: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <Navbar />
      <main className="flex-grow flex flex-col w-full">
        <section id="about">
          <Hero />
        </section>

        <section id="experience">
          <Experience />
        </section>
        
        <section id="careertimeline">
          <CareerTimeline />
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