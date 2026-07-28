
import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { AnimatedHeading, AnimatedParagraph, StaggerContainer, StaggerItem } from './animations';
import { Team } from './Team';
import { JourneyTimeline } from './JourneyTimeline';
import { Contact } from './Contact';
const officeCollaboration = '/assets/office_collaboration_group.jpeg';
const digitalWorkplace = '/assets/recruitment_digital_workplace.jpeg';

export function AboutPage() {
  useEffect(() => {
    // Reset page scroll position to top instantly on mount
    const html = document.documentElement;
    const originalBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    html.scrollTop = 0;
    if (document.body) {
      document.body.scrollTop = 0;
    }
    const timer = setTimeout(() => {
      html.style.scrollBehavior = originalBehavior;
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="about" className="pt-24 pb-12 bg-[#fcfbfa]">
      {/* 1. Hero Section of the About Us Page */}
      <section id="about-hero" className="max-w-7xl mx-auto px-6 py-12 md:py-20 text-center relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
        
        <div className="relative z-10">
          {/* Centered Heading */}
          <AnimatedHeading
            text="Building Teams. Creating Futures."
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-[#011c30] tracking-tight leading-[1.1] mb-12 max-w-4xl mx-auto text-center"
            as="h1"
          />

          {/* Centered Image with left-to-right banner opening animation */}
          <div className="relative w-full max-w-5xl aspect-[16/9] md:aspect-[21/9] mx-auto rounded-3xl overflow-hidden shadow-2xl bg-slate-100 mb-16">
            {/* Banner slide overlay (opening left-to-right) */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
              style={{ originX: 1 }}
              className="absolute inset-0 bg-[#0b132a] z-10"
            />
            {/* Image with subtle zoom-out scale */}
            <motion.img
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, ease: 'easeOut', delay: 0.1 }}
              src={digitalWorkplace}
              alt="Building Teams. Creating Futures."
              className="w-full h-full object-cover"
              
            />
          </div>
        </div>
      </section>

      {/* 2. About Us Split Section */}
      <section id="about-details" className="relative py-16 sm:py-24 bg-white overflow-hidden border-t border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Centered Section Title */}
          <div className="mb-16 text-center">
            <AnimatedHeading
              text="About Bucks & Bricks"
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#011c30] tracking-tight text-center"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* Left Column: Image of professional working at a laptop with a red/warm mug */}
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: -30 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: false, margin: '-10% 0px' }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl aspect-[4/3] w-full overflow-hidden shadow-xl border border-slate-200/50 bg-slate-50 relative"
              >
                <img
                  src={officeCollaboration}
                  alt="Professional Specialist Working"
                  className="w-full h-full object-cover"
                  
                />
              </motion.div>
            </div>

            {/* Right Column: Key pillars of About Us */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <StaggerContainer className="flex flex-col gap-6 w-full">
                {/* Pillar 1: Strategic Solutions */}
                <StaggerItem direction="up" className="w-full">
                  <div className="border-b border-slate-100 pb-6">
                    <h3 className="text-[#011c30] font-bold font-display text-xl mb-2">
                      Strategic Solutions
                    </h3>
                    <p className="text-slate-600 font-sans text-xs sm:text-sm sm:leading-relaxed">
                      For over a decade, Bucks & Bricks has been helping organizations solve their talent challenges through strategic recruitment, executive search, HR consulting, and workforce development solutions.
                    </p>
                  </div>
                </StaggerItem>

                {/* Pillar 2: Talent Connection */}
                <StaggerItem direction="up" className="w-full">
                  <div className="border-b border-slate-100 pb-6">
                    <h3 className="text-[#011c30] font-bold font-display text-xl mb-2">
                      Our Goal
                    </h3>
                    <p className="text-slate-600 font-sans text-xs sm:text-sm sm:leading-relaxed">
                      Our mission is simple: connect businesses with exceptional people and help professionals build rewarding careers.
                    </p>
                  </div>
                </StaggerItem>

                {/* Pillar 3: True Business Partnership */}
                <StaggerItem direction="up" className="w-full">
                  <div className="pb-2">
                    <h3 className="text-[#011c30] font-bold font-display text-xl mb-2">
                      True Business Partnership
                    </h3>
                    <p className="text-slate-600 font-sans text-xs sm:text-sm sm:leading-relaxed">
                      We work as a true business partner, understanding our clients' goals and delivering customized solutions that create measurable impact.
                    </p>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Driven by Passion, Focused on Excellence Section */}
      <section id="about-pillars" className="relative py-16 sm:py-24 bg-[#fcfbfa] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Centered Heading */}
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <AnimatedHeading
              text="Driven by Passion, Focused on Excellence"
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#011c30] tracking-tight text-center"
            />
          </div>

          {/* 3-Column Grid for Mission, Image, Vision */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1: Our Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-[#0b132a] text-white p-8 rounded-3xl flex flex-col items-start text-left shadow-lg relative overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/10 border border-slate-800"
            >
              {/* Badge Number 01 */}
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm text-white mb-8 group-hover:scale-110 transition-transform duration-300">
                01
              </div>
              <h3 className="font-bold font-display text-xl mb-4 text-white">
                Our Mission
              </h3>
              <p className="text-slate-300 font-sans text-xs sm:text-sm leading-relaxed">
                To empower organizations with exceptional talent and innovative HR solutions while helping professionals build meaningful and rewarding careers.
              </p>
            </motion.div>

            {/* Card 2: Keyboard Typing Image Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="rounded-3xl overflow-hidden shadow-lg border border-slate-200/50 aspect-[4/3] md:aspect-auto md:h-full relative bg-slate-50 group transition-all duration-300 hover:shadow-2xl"
            >
              <img
                src={digitalWorkplace}
                alt="Keyboard Typing Hands"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                
              />
            </motion.div>

            {/* Card 3: Our Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="bg-[#0b132a] text-white p-8 rounded-3xl flex flex-col items-start text-left shadow-lg relative overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/10 border border-slate-800"
            >
              {/* Badge Number 02 */}
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm text-white mb-8 group-hover:scale-110 transition-transform duration-300">
                02
              </div>
              <h3 className="font-bold font-display text-xl mb-4 text-white">
                Our Vision
              </h3>
              <p className="text-slate-300 font-sans text-xs sm:text-sm leading-relaxed">
                To become Pakistan's most trusted talent management and HR consulting partner, recognized for transforming workplaces through people, innovation, and long-term partnerships.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Professional Core Members Grid (Reused from Team) */}
      <Team />

      {/* 5. Milestone Journey Wave Timeline (Reused from JourneyTimeline) */}
      <JourneyTimeline />

      {/* 6. Custom Form & Support Panel (Reused from Contact) */}
      <Contact />
    </div>
  );
}
