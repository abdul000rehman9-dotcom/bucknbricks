import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { StaggerContainer, StaggerItem } from './animations';
import { Vacancies } from './Vacancies';
import { Contact } from './Contact';

const recruitmentSolutionImg = '/assets/recruitment_process_screening.jpeg';
const specialistImg = '/assets/hiring_process_handshake.jpeg';

export function CareerPage() {
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
    <div className="pt-24 pb-12 bg-[#fcfbfa]">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

        <div className="relative z-10">
          {/* Heading fades in while moving upward slightly */}
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            style={{ willChange: 'transform, opacity' }}
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
              }
            }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-[#011c30] tracking-tight leading-[1.1] mb-12 max-w-4xl mx-auto text-center"
          >
            Grow Your Skills With Our Team
          </motion.h1>

          {/* Banner image smoothly reveals with a soft scale (0.96 -> 1) and fade-in */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            style={{ willChange: 'transform, opacity' }}
            variants={{
              hidden: { opacity: 0, scale: 0.96 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 1.1,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.25
                }
              }
            }}
            className="relative w-full max-w-5xl aspect-[16/9] md:aspect-[21/9] mx-auto rounded-3xl overflow-hidden shadow-2xl bg-slate-100 mb-16"
          >
            <img
              src={recruitmentSolutionImg}
              alt="Grow Your Skills With Our Team"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Amazing Benefits Section */}
      <section className="relative py-16 sm:py-24 bg-white overflow-hidden border-t border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            {/* Reusable slide up and fade text */}
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                }
              }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#011c30] tracking-tight text-center"
            >
              Amazing Benefits To Boost Your Career
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: '-10% 0px' }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl aspect-[4/3] w-full overflow-hidden shadow-xl border border-slate-200/50 bg-slate-50 relative"
              >
                <img
                  src={specialistImg}
                  alt="Professional Specialist Working"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <StaggerContainer className="flex flex-col gap-6 w-full">
                <StaggerItem direction="up" className="w-full">
                  <div className="border-b border-slate-100 pb-6">
                    <h3 className="text-[#011c30] font-bold font-display text-xl mb-2">Competitive Salary</h3>
                    <p className="text-slate-600 font-sans text-xs sm:text-sm sm:leading-relaxed">
                      Offer attractive and competitive salaries to retain top talent, motivate employees, and stay ahead in the market.
                    </p>
                  </div>
                </StaggerItem>

                <StaggerItem direction="up" className="w-full">
                  <div className="border-b border-slate-100 pb-6">
                    <h3 className="text-[#011c30] font-bold font-display text-xl mb-2">Wellness Programs</h3>
                    <p className="text-slate-600 font-sans text-xs sm:text-sm sm:leading-relaxed">
                      Implement comprehensive wellness programs that support employee health, boost engagement, and improve productivity.
                    </p>
                  </div>
                </StaggerItem>

                <StaggerItem direction="up" className="w-full">
                  <div className="pb-2">
                    <h3 className="text-[#011c30] font-bold font-display text-xl mb-2">Hybrid Work Options</h3>
                    <p className="text-slate-600 font-sans text-xs sm:text-sm sm:leading-relaxed">
                      Offer flexible hybrid work options that balance remote and in-office schedules, enhancing employee satisfaction.
                    </p>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Top Open Vacancies with instant scroll to top on selection */}
      <Vacancies
        limit={8}
        showDetails={true}
        onSelectJob={(jobId) => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
          });
          window.location.hash = `#job-${jobId}`;
        }}
      />

      {/* Reusable Contact section */}
      <Contact />
    </div>
  );
}
