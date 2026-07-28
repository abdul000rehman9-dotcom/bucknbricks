/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { AnimatedButton } from './animations';
import logoImg from '/assets/logo-main.png';

interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  contentParagraphs: string[];
}

export function JourneyTimeline() {
  const [activeMilestone, setActiveMilestone] = useState<string | null>(null);

  // Full image text split paragraph-by-paragraph
  const fullContent = [
    "Since 2011, Bucks & Bricks has been helping organizations build stronger teams through strategic recruitment, executive search, HR consulting, and learning & development solutions.",
    "What began as a recruitment consultancy has grown into a trusted HR partner for businesses across Pakistan, serving industries including FMCG, Pharmaceuticals, Banking, Manufacturing, Engineering, Textile, Hospitality, and Technology.",
    "We believe recruitment is more than filling vacancies — it's about creating lasting partnerships, empowering people, and helping businesses achieve sustainable growth.",
    "Today, we continue to connect exceptional talent with forward-thinking organizations, delivering customized workforce solutions that create measurable impact."
  ];

  const milestones: TimelineMilestone[] = [
    {
      id: '1',
      year: '2011',
      title: 'Strategic Solutions',
      contentParagraphs: fullContent,
    },
    {
      id: '2',
      year: '2016',
      title: 'Lasting Partnerships',
      contentParagraphs: fullContent,
    },
    {
      id: '3',
      year: '2026',
      title: 'Measurable Impact',
      contentParagraphs: fullContent,
    }
  ];

  // Perfectly smooth, mathematically continuous cubic bezier spline path matching the image
  const svgPath = 'M 100 320 C 130 350, 160 380, 200 380 C 250 380, 320 260, 370 260 C 420 260, 470 310, 515 310 C 580 310, 660 120, 730 120 C 780 120, 850 120, 920 120';

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 2.2, delay: 0.5, ease: 'easeInOut' },
    },
  };

  const bgNumVariants = (delay: number) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.05,
      transition: { duration: 1.0, delay },
    },
  });

  const nodeVariants = (delay: number) => ({
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15, delay },
    },
  });

  return (
    <section id="journey" className="relative py-20 sm:py-28 bg-[#fcfbfa] overflow-hidden w-full">
      {/* Invisible backdrop to dismiss milestone popup on outside click (mobile only) */}
      {activeMilestone && (
        <div
          className="sm:hidden fixed inset-0 z-[9980] bg-slate-900/10 backdrop-blur-[1px]"
          onClick={() => setActiveMilestone(null)}
        />
      )}

      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Main Wrapper: Full Width Responsive Canvas */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{ willChange: 'transform, opacity' }}
          variants={containerVariants}
          className="relative w-full flex flex-col lg:block"
        >
          
          {/* 1. Left-Side Intro Content */}
          <div className="relative lg:absolute lg:left-0 lg:top-0 z-30 max-w-sm flex flex-col items-start text-left pointer-events-auto mb-8 lg:mb-0">
            <motion.span
              variants={fadeInUp}
              className="text-[10px] font-bold text-blue-600 uppercase tracking-widest font-sans mb-3 bg-blue-50 px-3 py-1 rounded-md"
            >
              Our Story
            </motion.span>

            {/* Added "Our Journey" Main Heading Here */}
            <motion.h2
              variants={fadeInUp}
              className="font-display font-extrabold text-3xl sm:text-4xl text-[#011c30] tracking-tight mb-4"
            >
              Our Journey
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-slate-600 font-sans text-xs lg:text-sm leading-relaxed mb-8"
            >
              Since 2011, Bucks & Bricks has been helping organizations build stronger teams through strategic recruitment, executive search, HR consulting, and learning & development solutions.
            </motion.p>

 
          </div>

          {/* 2. Timeline Canvas Container */}
          <div className="relative w-full aspect-[1000/550] min-h-[420px] sm:min-h-[500px] lg:min-h-[550px]">
            {/* Full-Width SVG S-Wave Timeline Grid */}
            <div className="absolute inset-0 pointer-events-none z-10 w-full h-full">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 520" fill="none" preserveAspectRatio="none">
                <defs>
                  <filter id="wave-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="16" stdDeviation="12" floodColor="#0b1c24" floodOpacity="0.12" />
                  </filter>
                </defs>

                <path
                  d={svgPath}
                  stroke="#0b1c24"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0.04"
                />

                <motion.path
                  d={svgPath}
                  stroke="#0b1c24"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  filter="url(#wave-shadow)"
                  variants={pathVariants}
                />
              </svg>
            </div>

            {/* Giant Background Decorative Numbers */}
            <motion.div
              variants={bgNumVariants(1.0)}
              style={{ left: '30%', top: '75%' }}
              className="absolute text-[120px] sm:text-[180px] font-black font-display text-slate-400 select-none pointer-events-none -z-10 leading-none -translate-x-1/2 -translate-y-1/2"
            >
              1
            </motion.div>

            <motion.div
              variants={bgNumVariants(1.6)}
              style={{ left: '61.5%', top: '61.5%' }}
              className="absolute text-[120px] sm:text-[180px] font-black font-display text-slate-400 select-none pointer-events-none -z-10 leading-none -translate-x-1/2 -translate-y-1/2"
            >
              2
            </motion.div>

            <motion.div
              variants={bgNumVariants(2.2)}
              style={{ left: '83%', top: '25%' }}
              className="absolute text-[120px] sm:text-[180px] font-black font-display text-slate-400 select-none pointer-events-none -z-10 leading-none -translate-x-1/2 -translate-y-1/2"
            >
              3
            </motion.div>

            {/* 1. 2009 Milestone Node */}
            <div
              style={{ left: '20%', top: '73.08%' }}
              className={`absolute flex flex-col items-start -ml-[22px] -mt-[22px] pointer-events-auto transition-all ${
                activeMilestone === '1' ? 'z-[9999]' : 'z-20'
              }`}
              onMouseEnter={() => {
                if (typeof window !== 'undefined' && window.innerWidth >= 640) {
                  setActiveMilestone('1');
                }
              }}
              onMouseLeave={() => {
                if (typeof window !== 'undefined' && window.innerWidth >= 640) {
                  setActiveMilestone(null);
                }
              }}
            >
              <div className="relative mb-3">
                <motion.button
                  variants={nodeVariants(1.0)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMilestone(activeMilestone === '1' ? null : '1');
                  }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="View 2009 milestone details"
                  className={`w-9 h-9 sm:w-12 sm:h-12 rounded-2xl bg-white border flex items-center justify-center transition-all duration-300 z-30 relative shadow-[0_8px_22px_rgba(11,28,36,0.06)] hover:border-slate-400 ${
                    activeMilestone === '1' ? 'border-slate-900 ring-4 ring-blue-500/20 shadow-xl' : 'border-slate-200'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full transition-colors duration-300 ${
                    activeMilestone === '1' ? 'bg-[#0b1c24]' : 'bg-slate-300'
                  }`} />
                </motion.button>

                <AnimatePresence>
                  {activeMilestone === '1' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute left-[-20px] sm:left-1/2 transform translate-x-0 sm:-translate-x-1/2 z-[9999] bg-white border border-slate-200/90 shadow-2xl p-3.5 sm:p-5 rounded-2xl w-[280px] xs:w-[320px] sm:w-[400px] max-w-[calc(100vw-32px)] bottom-12 sm:bottom-16 text-left"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="absolute left-7 sm:left-1/2 transform translate-x-0 sm:-translate-x-1/2 w-3 h-3 bg-white border-r border-b border-slate-200 rotate-45 -bottom-1.5" />
                      
                      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-5 sm:h-7 bg-[#0b1c24] rounded-full" />
                          <h3 className="font-display font-bold text-base sm:text-xl text-[#011c30] tracking-tight">{milestones[0].title}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <img src={logoImg} alt="Bucks & Bricks Logo" className="h-5 sm:h-7 w-auto object-contain" />
                          <button 
                            onClick={(e) => { e.stopPropagation(); setActiveMilestone(null); }}
                            className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-colors"
                            aria-label="Close"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Scrollable Container for Full Content */}
                      <div className="max-h-[220px] sm:max-h-[280px] overflow-y-auto pr-2 space-y-3 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans scrollbar-thin scrollbar-thumb-slate-300">
                        {milestones[0].contentParagraphs.map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.div
                variants={fadeInUp}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMilestone(activeMilestone === '1' ? null : '1');
                }}
                className="px-1 flex flex-col items-start text-left cursor-pointer group"
              >
                <span className={`font-display font-bold text-xs sm:text-sm mb-1 transition-colors ${
                  activeMilestone === '1' ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'
                }`}>
                  {milestones[0].year}
                </span>
              </motion.div>
            </div>

            {/* 2. 2013 Milestone Node */}
            <div
              style={{ left: '51.5%', top: '59.62%' }}
              className={`absolute flex flex-col items-start -ml-[22px] -mt-[22px] pointer-events-auto transition-all ${
                activeMilestone === '2' ? 'z-[9999]' : 'z-20'
              }`}
              onMouseEnter={() => {
                if (typeof window !== 'undefined' && window.innerWidth >= 640) {
                  setActiveMilestone('2');
                }
              }}
              onMouseLeave={() => {
                if (typeof window !== 'undefined' && window.innerWidth >= 640) {
                  setActiveMilestone(null);
                }
              }}
            >
              <div className="relative mb-3">
                <motion.button
                  variants={nodeVariants(1.6)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMilestone(activeMilestone === '2' ? null : '2');
                  }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="View milestone details"
                  className={`w-9 h-9 sm:w-12 sm:h-12 rounded-2xl bg-white border flex items-center justify-center transition-all duration-300 z-30 relative shadow-[0_8px_22px_rgba(11,28,36,0.06)] hover:border-slate-400 ${
                    activeMilestone === '2' ? 'border-slate-900 ring-4 ring-blue-500/20 shadow-xl' : 'border-slate-200'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full transition-colors duration-300 ${
                    activeMilestone === '2' ? 'bg-[#0b1c24]' : 'bg-slate-300'
                  }`} />
                </motion.button>

                <AnimatePresence>
                  {activeMilestone === '2' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute left-1/2 transform -translate-x-1/2 z-[9999] bg-white border border-slate-200/90 shadow-2xl p-3.5 sm:p-5 rounded-2xl w-[280px] xs:w-[320px] sm:w-[400px] max-w-[calc(100vw-32px)] bottom-12 sm:bottom-16 text-left"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-slate-200 rotate-45 -bottom-1.5" />
                      
                      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-5 sm:h-7 bg-[#0b1c24] rounded-full" />
                          <h3 className="font-display font-bold text-base sm:text-xl text-[#011c30] tracking-tight">{milestones[1].title}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <img src={logoImg} alt="Bucks & Bricks Logo" className="h-5 sm:h-7 w-auto object-contain" />
                          <button 
                            onClick={(e) => { e.stopPropagation(); setActiveMilestone(null); }}
                            className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-colors"
                            aria-label="Close"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Scrollable Container for Full Content */}
                      <div className="max-h-[220px] sm:max-h-[280px] overflow-y-auto pr-2 space-y-3 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans scrollbar-thin scrollbar-thumb-slate-300">
                        {milestones[1].contentParagraphs.map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.div
                variants={fadeInUp}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMilestone(activeMilestone === '2' ? null : '2');
                }}
                className="px-1 flex flex-col items-start text-left cursor-pointer group"
              >
                <span className={`font-display font-bold text-xs sm:text-sm mb-1 transition-colors ${
                  activeMilestone === '2' ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'
                }`}>
                  {milestones[1].year}
                </span>
              </motion.div>
            </div>

            {/* 3. 2025 Milestone Node */}
            <div
              style={{ left: '73%', top: '23.08%' }}
              className={`absolute flex flex-col items-start -ml-[22px] -mt-[22px] pointer-events-auto transition-all ${
                activeMilestone === '3' ? 'z-[9999]' : 'z-20'
              }`}
              onMouseEnter={() => {
                if (typeof window !== 'undefined' && window.innerWidth >= 640) {
                  setActiveMilestone('3');
                }
              }}
              onMouseLeave={() => {
                if (typeof window !== 'undefined' && window.innerWidth >= 640) {
                  setActiveMilestone(null);
                }
              }}
            >
              <div className="relative mb-3">
                <motion.button
                  variants={nodeVariants(2.2)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMilestone(activeMilestone === '3' ? null : '3');
                  }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="View milestone details"
                  className={`w-9 h-9 sm:w-12 sm:h-12 rounded-2xl bg-white border flex items-center justify-center transition-all duration-300 z-30 relative shadow-[0_8px_22px_rgba(11,28,36,0.06)] hover:border-slate-400 ${
                    activeMilestone === '3' ? 'border-slate-900 ring-4 ring-blue-500/20 shadow-xl' : 'border-slate-200'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full transition-colors duration-300 ${
                    activeMilestone === '3' ? 'bg-[#0b1c24]' : 'bg-slate-300'
                  }`} />
                </motion.button>

                <AnimatePresence>
                  {activeMilestone === '3' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute right-[-28px] sm:right-auto sm:left-1/2 transform translate-x-0 sm:-translate-x-1/2 z-[9999] bg-white border border-slate-200/90 shadow-2xl p-3.5 sm:p-5 rounded-2xl w-[280px] xs:w-[320px] sm:w-[400px] max-w-[calc(100vw-32px)] top-12 sm:top-16 text-left"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="absolute right-8 sm:right-auto sm:left-1/2 transform translate-x-0 sm:-translate-x-1/2 w-3 h-3 bg-white border-l border-t border-slate-200 rotate-45 -top-1.5" />
                      
                      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-5 sm:h-7 bg-[#0b1c24] rounded-full" />
                          <h3 className="font-display font-bold text-base sm:text-xl text-[#011c30] tracking-tight">{milestones[2].title}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <img src={logoImg} alt="Bucks & Bricks Logo" className="h-5 sm:h-7 w-auto object-contain" />
                          <button 
                            onClick={(e) => { e.stopPropagation(); setActiveMilestone(null); }}
                            className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-colors"
                            aria-label="Close"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Scrollable Container for Full Content */}
                      <div className="max-h-[220px] sm:max-h-[280px] overflow-y-auto pr-2 space-y-3 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans scrollbar-thin scrollbar-thumb-slate-300">
                        {milestones[2].contentParagraphs.map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.div
                variants={fadeInUp}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMilestone(activeMilestone === '3' ? null : '3');
                }}
                className="px-1 flex flex-col items-start text-left cursor-pointer group"
              >
                <span className={`font-display font-bold text-xs sm:text-sm mb-1 transition-colors ${
                  activeMilestone === '3' ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'
                }`}>
                  {milestones[2].year}
                </span>
              </motion.div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}