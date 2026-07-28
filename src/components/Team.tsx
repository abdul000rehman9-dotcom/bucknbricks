
import React, { useState } from "react";
import { motion } from "motion/react";
import { User, Sparkles } from "lucide-react";
import {
  AnimatedHeading,
  AnimatedParagraph,
  StaggerContainer,
  StaggerItem,
} from "./animations";
import { TeamMember } from "../types";

const professionalHandshake = '/assets/professional_handshake_greeting.jpeg';
const candidateSourcing = '/assets/candidate_recruitment_sourcing.jpeg';
const digitalWorkplace = '/assets/recruitment_digital_workplace.jpeg';
const recruitmentScreening = '/assets/recruitment_process_screening.jpeg';

export function Team() {
  const [activeId, setActiveId] = useState<string>("1");

  const team: TeamMember[] = [
    {
      id: "1",
      name: "Mr. Mark",
      role: "Talent Acquisition Director",
      image: professionalHandshake,
      bgColor: "bg-gradient-to-b from-sky-400/90 to-sky-600/95",
    },
    {
      id: "2",
      name: "Nadia Lestary",
      role: "Senior Recruiting Partner",
      image: candidateSourcing,
      bgColor: "bg-gradient-to-b from-rose-400/90 to-rose-600/95",
    },
    {
      id: "3",
      name: "Evan Caster Lee",
      role: "HR Tech Systems Specialist",
      image: digitalWorkplace,
      bgColor: "bg-gradient-to-b from-teal-400/90 to-teal-600/95",
    },
    {
      id: "4",
      name: "Stefy Catlyna",
      role: "Operations & Payroll Lead",
      image: recruitmentScreening,
      bgColor: "bg-gradient-to-b from-purple-400/90 to-purple-600/95",
    },
  ];

  return (
    <section
      id="team"
      className="relative py-20 sm:py-28 bg-[#f8fafc] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16 max-w-2xl mx-auto flex flex-col items-center justify-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-50px' }}
            style={{ willChange: 'transform, opacity' }}
            className="mb-4 text-center w-full"
          >
            <span className="text-[11px] font-bold text-slate-800 font-sans tracking-tight uppercase block text-center">
              Our Professionals
            </span>
          </motion.div>

          {/* Main Heading wrapped in a full-width container to force layout centering */}
          <div className="w-full text-center flex justify-center">
            <AnimatedHeading
              text="Meet Our Team"
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#011c30] tracking-tight leading-none mb-4 text-center block w-full mx-auto"
            />
          </div>

          {/* Paragraph */}
          <AnimatedParagraph className="text-slate-500 font-sans text-sm sm:text-base leading-relaxed text-center mx-auto">
            The skilled HR experts behind our innovative services, helping you
            manage, hire, and scale with ease.
          </AnimatedParagraph>
        </div>

        {/* Flexible Accordion Team Container */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-3 max-w-5xl mx-auto min-h-[440px] md:h-[440px]">
          {team.map((member) => {
            const isActive = activeId === member.id;

            // First is wide by default, others shrink. Hover transitions active card.
            const flexClass = isActive
              ? "md:flex-[2.5] flex-[2.0]"
              : "md:flex-[0.6] flex-[0.5]";

            return (
              <motion.div
                key={member.id}
                layout
                style={{ willChange: 'flex-grow, transform' }}
                onMouseEnter={() => setActiveId(member.id)}
                transition={{
                  type: "spring",
                  stiffness: 160,
                  damping: 24,
                }}
                className={`relative rounded-3xl overflow-hidden shadow-lg border border-slate-100/50 cursor-pointer transition-all duration-300 flex flex-col justify-between p-6 ${flexClass} ${member.bgColor}`}
              >
                {/* Overlay background texture pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-[size:10px_10px] mix-blend-overlay" />

                {/* Team Image with beautiful overlay */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover brightness-95 contrast-[1.02] transition-all duration-500"
                    
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                </div>

                {/* Card Content Label */}
                <div className="relative z-10 flex flex-col text-left h-full justify-end">
                  {/* Bottom: Name */}
                  <div className="flex flex-col items-start gap-1 pb-2">
                    <motion.h4
                      layout="position"
                      className={`text-white font-bold font-display tracking-tight leading-tight ${
                        isActive
                          ? "text-2xl sm:text-3xl md:text-4xl"
                          : "text-sm md:text-base"
                      }`}
                    >
                      {member.name}
                    </motion.h4>
                  </div>
                </div>

                {/* Hover sparkle accent icon */}
                <div className="absolute top-4 right-4 text-white/40 group-hover:text-white transition-colors duration-300">
                  <User size={16} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
