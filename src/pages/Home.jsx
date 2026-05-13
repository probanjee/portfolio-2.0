import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Experience from '../components/sections/Experience';
import Projects from '../components/sections/Projects';
import Skills from '../components/sections/Skills';
import EducationCertifications from '../components/sections/EducationCertifications';
import Contact from '../components/sections/Contact';

export const Home = () => {
  return (
    <div className="w-full space-y-16 sm:space-y-24">
      {/* 1. Futuristic Hero & Typewriter Banner */}
      <Hero />

      {/* 2. Frosted Bio Story & Metrics Board */}
      <About />

      {/* 3. Industry Engagement & Internship Timelines */}
      <Experience />

      {/* 4. Distributed Core Repositories Grid */}
      <Projects />

      {/* 5. low-level and high-level Skills Matrix */}
      <Skills />

      {/* 6. Academic Milestones & Credentials Grid */}
      <EducationCertifications />

      {/* 7. Comms Telemetry Gateway Form Section */}
      <Contact />
    </div>
  );
};

export default Home;
