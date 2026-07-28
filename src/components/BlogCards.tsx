import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { AnimatedHeading, AnimatedParagraph } from './animations';
import { BlogPost } from '../types';

const hrRecruitmentProcess = '/assets/hr_recruitment_process.jpeg';
const recruitmentDigitalWorkplace = '/assets/recruitment_digital_workplace.jpeg';
const hrRecruitmentServices = '/assets/hr_recruitment_services.jpeg';

const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };

// ✨ Premium Pop-up & Scale-in Variant (Bina kisi jhatke ke perfectly smooth)
const popUpVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,        // Halki si initial bottom position
    scale: 0.92,  // Halka sa shrunk frame jo zoom-in hoga
  },
  visible: (index: number) => ({
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: 'spring',
      stiffness: 70,   // Optimized structural feel
      damping: 16,     // Shaking aur overshooting ko eliminate karne ke liye
      mass: 0.8,       // Light and swift loading
      delay: index * 0.12, // Khubsoorat cascading sequence effect
    } 
  }),
};

const BlogCardInner: React.FC<{ post: BlogPost; index: number }> = ({ post, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const moveX = useTransform(x, [-100, 100], [-8, 8]);
  const moveY = useTransform(y, [-100, 100], [-8, 8]);
  const rotateY = useTransform(x, [-100, 100], [-3, 3]);

  const imageX = useSpring(moveX, springConfig);
  const imageY = useSpring(moveY, springConfig);
  const cardRotateY = useSpring(rotateY, springConfig);

  const imageScale = useMotionValue(1);
  const smoothScale = useSpring(imageScale, springConfig);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
    imageScale.set(1.06);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current && cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
    if (!rectRef.current) return;
    const rect = rectRef.current;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    x.set(0);
    y.set(0);
    imageScale.set(1);
  };

  return (
    <motion.div
      ref={cardRef}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-50px' }}
      variants={popUpVariants}
      style={{ rotateY: cardRotateY, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.02,
        y: -8,
        boxShadow: '0 20px 35px rgba(0,0,0,0.06), 0 10px 15px rgba(0,0,0,0.03)',
      }}
      // [will-change] property hardware acceleration ko secure karti hai aur animations butter-smooth chalti hain
      className="group bg-white rounded-3xl overflow-hidden border border-slate-100/90 transition-all duration-300 flex flex-col justify-between text-left cursor-pointer [will-change:transform,opacity]"
    >
      {/* Dynamic Image Container */}
      <div className="relative aspect-[1.5] w-full overflow-hidden bg-slate-100 shrink-0">
        <motion.img
          src={post.image}
          alt={post.title}
          style={{
            x: imageX,
            y: imageY,
            scale: smoothScale,
          }}
          className="w-full h-full object-cover origin-center"
          
        />
        <span className="absolute top-4 left-4 z-10 text-[10px] font-extrabold uppercase tracking-widest text-slate-800 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded">
          {post.category}
        </span>
      </div>

      {/* Content area */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between gap-4">
        <div className="flex items-center gap-1.5 text-slate-400 font-sans text-[11px] font-semibold">
          <Calendar size={13} />
          <span>{post.date}</span>
        </div>

        <h4 className="text-[#011c30] font-bold font-display text-base sm:text-lg leading-snug group-hover:text-blue-600 transition-colors flex-1">
          {post.title}
        </h4>

        <div className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-xs font-bold tracking-wider uppercase mt-2 group-hover:translate-x-1.5 transition-transform duration-200">
          <span>Read Article</span>
          <ArrowUpRight size={14} />
        </div>
      </div>
    </motion.div>
  );
};

export function BlogCards() {
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      category: 'Automation',
      date: '07 Nov 2025',
      title: 'Payroll HR With Automated Workforce Management',
      image: hrRecruitmentProcess,
    },
    {
      id: '2',
      category: 'Efficiency',
      date: '07 Nov 2025',
      title: 'Improve Employee Efficiency Using HRM Solutions',
      image: recruitmentDigitalWorkplace,
    },
    {
      id: '3',
      category: 'Payroll',
      date: '07 Nov 2025',
      title: 'Boost Productivity With Efficient Time HR Systems',
      image: hrRecruitmentServices,
    },
  ];

  return (
    <section id="blog" className="relative py-20 sm:py-28 bg-[#f8fafc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="mb-4 text-center"
          >
            <span className="text-[11px] font-bold text-slate-800 font-sans tracking-tight uppercase">
              Latest Insights
            </span>
          </motion.div>
          
          <AnimatedHeading
            text="Complete HR Solutions & Blog"
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#011c30] tracking-tight leading-none mb-4 text-center"
          />
          <AnimatedParagraph className="text-slate-500 font-sans text-sm sm:text-base leading-relaxed">
            Stay updated with cutting-edge HR trends, tech insights, and automated operations advice from experts.
          </AnimatedParagraph>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto py-4">
          {blogPosts.map((post, index) => (
            <BlogCardInner key={post.id} post={post} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}