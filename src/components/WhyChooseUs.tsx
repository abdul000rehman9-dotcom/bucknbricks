import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { AnimatedHeading, AnimatedParagraph, StaggerContainer, StaggerItem } from './animations';

const partnershipHandshake = '/assets/WhyChooseUs.jpg';

export function WhyChooseUs() {
  const pillars = [
    {
      title: 'Industry Expertise',
      description: "Deep understanding of Pakistan's leading industries including FMCG, Textile, Pharma, Banking, Manufacturing, and Engineering.",
    },
    {
      title: 'Fast Turnaround',
      description: 'Efficient sourcing and screening processes that reduce hiring timelines.',
    },
    {
      title: 'Quality Talent Network',
      description: 'Access to a large pool of qualified and pre-screened professionals.',
    },
    {
      title: 'Personalized Service',
      description: 'Dedicated consultants focused on understanding your unique business needs.',
    },
    {
      title: 'Long-Term Partnership',
      description: "We don't just fill vacancies—we build lasting relationships that support business growth.",
    },
  ];

  return (
    <section id="why-choose-us" className="relative py-20 sm:py-28 bg-[#ffffff] overflow-hidden">
      {/* Grid vertically centered */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side Image: Slightly reduced height (Balanced size) */}
        <div className="lg:col-span-6 order-2 lg:order-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-50px' }}
            style={{ willChange: 'transform, opacity' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl w-full min-h-[480px] max-h-[680px] overflow-hidden shadow-xl border border-slate-200/50 relative bg-[#0b132a] select-none"
          >
            <img
              src={partnershipHandshake}
              alt="Why Choose Bucks & Bricks"
              className="w-full h-full object-fit"
            />
          </motion.div>
        </div>

        {/* Right Side Content */}
        <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center items-start text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-50px' }}
            style={{ willChange: 'transform, opacity' }}
            className="mb-4 text-left"
          >
            <span className="text-[11px] font-bold text-blue-600 font-sans tracking-widest uppercase">
              Why Choose Us?
            </span>
          </motion.div>

          {/* Heading */}
          <AnimatedHeading
            text="Why Choose Bucks & Bricks?"
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#011c30] tracking-tight leading-tight mb-6"
          />

          {/* Paragraph */}
          <AnimatedParagraph className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed mb-8">
            For over a decade, Bucks & Bricks has been helping organizations solve their talent challenges through strategic recruitment, executive search, HR consulting, and workforce development solutions.
          </AnimatedParagraph>

          {/* Bullet Points */}
          <StaggerContainer className="flex flex-col gap-6 w-full">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="w-full">
                <StaggerItem direction="up" className="w-full">
                  <div className="flex gap-4 items-start">
                    <div className="w-6 h-6 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} className="text-blue-600 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="text-[#011c30] font-bold font-display text-base mb-1">
                        {pillar.title}
                      </h4>
                      <p className="text-slate-600 font-sans text-xs sm:text-sm sm:leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              </div>
            ))}
          </StaggerContainer>
        </div>

      </div>
    </section>
  );
}