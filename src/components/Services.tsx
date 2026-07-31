import React from "react";
import { motion } from "motion/react";
import {
  AnimatedHeading,
  AnimatedParagraph,
  ImageReveal,
  StaggerContainer,
  StaggerItem,
} from "./animations";

const execSearchIcon = "/assets(2)/excutive_cards.png";
const recruitSolIcon = '/assets(2)/Recruitment_cards.png';
const hrConsultingIcon = "/assets(2)/consulting_cards.png";
const learningDevIcon = "/assets(2)/learning_cards.png";
const candidateSourcing = "/assets(2)/services_candidate_sourcing.jpg";

interface ServicesProps {
  onServiceSelect?: (
    serviceType:
      | "executive-search"
      | "recruitment-solution"
      | "hr-consulting"
      | "learning-development",
  ) => void;
}

export function Services({ onServiceSelect }: ServicesProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: -240,
      rotate: -10,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 70,
        mass: 1.1,
      },
    },
  };

  const hoverAnimation = {
    y: -10,
    scale: 1.03,
    borderColor: "rgba(2, 132, 199, 0.4)",
    boxShadow: "0 20px 40px rgba(2, 132, 199, 0.08)",
    transition: { type: "spring", stiffness: 350, damping: 15 },
  };

  return (
    <section
      id="services"
      className="relative py-20 sm:py-28 bg-[#ffffff] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <AnimatedHeading
            text="Our Services"
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#011c30] tracking-tight leading-tight mb-4 text-center"
          />
          <AnimatedParagraph className="text-slate-500 font-sans text-sm sm:text-base leading-relaxed">
            Tailored HR and talent acquisition solutions designed to empower
            your organization and accelerate growth.
          </AnimatedParagraph>
        </div>

        {/* 4-Column Service Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 relative px-4"
        >
          {/* Card 1: Recruitment Solutions */}
          <motion.div
            variants={cardVariants}
            whileHover={hoverAnimation}
            onClick={() => onServiceSelect?.("recruitment-solution")}
            className="group flex flex-col items-center text-center p-8 bg-white border border-slate-100 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-colors duration-300 cursor-pointer hover:shadow-blue-100/50 hover:border-blue-300 relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

            <img
              src={recruitSolIcon}
              alt="Recruitment Solutions"
              className="w-16 h-16 object-contain mb-6 group-hover:scale-110 transition-transform duration-300 rounded-2xl"
            />

            <h3 className="text-[#011c30] font-bold font-display text-lg mb-3">
              Recruitment Solutions
            </h3>
            <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed">
              End-to-end recruitment support for junior, mid-level, and senior
              positions across multiple industries.
            </p>
          </motion.div>

          {/* Card 2: Executive Search */}
          <motion.div
            variants={cardVariants}
            whileHover={hoverAnimation}
            onClick={() => onServiceSelect?.("executive-search")}
            className="group flex flex-col items-center text-center p-8 bg-white border border-slate-100 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-colors duration-300 cursor-pointer hover:shadow-emerald-100/50 hover:border-emerald-300 relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

            <img
              src={execSearchIcon}
              alt="Executive Search"
              className="w-16 h-16 object-contain mb-6 group-hover:scale-110 transition-transform duration-300 rounded-2xl"
            />

            <h3 className="text-[#011c30] font-bold font-display text-lg mb-3">
              Executive Search
            </h3>
            <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed">
              Confidential headhunting and leadership hiring for critical
              management and executive roles.
            </p>
          </motion.div>

          {/* Card 3: HR Consulting */}
          <motion.div
            variants={cardVariants}
            whileHover={hoverAnimation}
            onClick={() => onServiceSelect?.("hr-consulting")}
            className="group flex flex-col items-center text-center p-8 bg-white border border-slate-100 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-colors duration-300 cursor-pointer hover:shadow-purple-100/50 hover:border-purple-300 relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

            <img
              src={hrConsultingIcon}
              alt="HR Consulting"
              className="w-16 h-16 object-contain mb-6 group-hover:scale-110 transition-transform duration-300 rounded-2xl"
            />

            <h3 className="text-[#011c30] font-bold font-display text-lg mb-3">
              HR Consulting
            </h3>
            <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed">
              Customized HR solutions including process development, HR audits,
              policy development, and organizational effectiveness.
            </p>
          </motion.div>

          {/* Card 4: Learning & Development */}
          <motion.div
            variants={cardVariants}
            whileHover={hoverAnimation}
            onClick={() => onServiceSelect?.("learning-development")}
            className="group flex flex-col items-center text-center p-8 bg-white border border-slate-100 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-colors duration-300 cursor-pointer hover:shadow-sky-100/50 hover:border-sky-300 relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-sky-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

            <div className="w-16 h-16 bg-[#e0f7fa] border border-[#b2ebf2] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 p-2.5">
              <img
                src={learningDevIcon}
                alt="Learning & Development"
                className="w-full h-full object-contain"
              />
            </div>

            <h3 className="text-[#011c30] font-bold font-display text-lg mb-3">
              Learning & Development
            </h3>
            <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed">
              Corporate training programs, leadership development workshops,
              competency assessments, and learning interventions.
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom Detailed Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <ImageReveal
              src={candidateSourcing}
              alt="Developer working on laptop"
              className="rounded-3xl aspect-[1.3] w-full shadow-lg"
            />
          </div>

          <div className="lg:col-span-6 flex flex-col text-left">
            <StaggerContainer className="flex flex-col gap-0 divide-y divide-slate-150">
              <StaggerItem direction="up">
                <div className="pb-6 text-left">
                  <h4 className="text-[#011c30] font-bold font-display text-base sm:text-lg mb-2">
                    About Bucks & Bricks
                  </h4>
                  <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed">
                    For over a decade, Bucks & Bricks has been helping
                    organizations solve their talent challenges through
                    strategic recruitment, executive search, HR consulting, and
                    workforce development solutions.
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem direction="up">
                <div className="py-6 text-left">
                  <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed">
                    Our mission is simple: connect businesses with exceptional
                    people and help professionals build rewarding careers.
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem direction="up">
                <div className="pt-6 text-left">
                  <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed">
                    We work as atrue business partner, understanding our
                    clients' goals and delivering customized solutions that
                    create measurable impact.
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
