import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Vision from '../components/Vision';
import About from '../components/About';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page-root">
      <Navbar />
      <main>
        <Hero />
        <Vision />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
