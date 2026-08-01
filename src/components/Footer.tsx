
import React from 'react';
import { motion } from 'motion/react';
import { Facebook, Twitter, Linkedin, Instagram, ArrowUp, Send } from 'lucide-react';
import { StaggerContainer, StaggerItem, AnimatedButton } from './animations';
const logoImg = '/logo_main.png';

interface FooterProps {
  onPageChange?: (page: string) => void;
}

export function Footer({ onPageChange }: FooterProps) {
  const socialIcons = [
    { icon: <Facebook size={16} />, href: '#', label: 'Facebook' },
    { icon: <Twitter size={16} />, href: '#', label: 'Twitter' },
    { icon: <Linkedin size={16} />, href: '#', label: 'LinkedIn' },
    { icon: <Instagram size={16} />, href: '#', label: 'Instagram' },
  ];

  const columns = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#about' },
        { label: 'Our Impact', href: '#impact' },
        { label: 'Blog', href: '#blog' },
        { label: 'Founders', href: '#ceo' },
        { label: 'Careers', href: '#career' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Executive Search', href: '#executive-search' },
        { label: 'Recruitment Solutions', href: '#recruitment-solution' },
        { label: 'HR Consulting', href: '#hr-consulting' },
        { label: 'Learning & Development', href: '#learning-development' },
        { label: 'Contact Support', href: '#contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Pricing Info', href: '#' },
        { label: 'Knowledge Base', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms & Conditions', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Get in Touch', href: '#contact' },
        { label: 'Help Center', href: '#' },
        { label: 'Sitemap', href: '#' },
        { label: 'Affiliate Program', href: '#' },
      ],
    },
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const standalonePages = ['career', 'about', 'executive-search', 'recruitment-solution', 'hr-consulting', 'learning-development', 'blog', 'ceo', 'impact'];
    const pageName = href.replace('#', '');

    if (standalonePages.includes(pageName) && onPageChange) {
      e.preventDefault();
      onPageChange(pageName);
      window.scrollTo(0, 0);
    } else if (href === '#contact' && onPageChange) {
      e.preventDefault();
      onPageChange('home');
      setTimeout(() => {
        const element = document.getElementById('contact');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-100 pt-16 pb-12 overflow-hidden text-left">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Banner Row (Logo and Get Started CTA) */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-slate-150 mb-12">
          {/* Logo aligned left */}
          <div className="flex items-center">
            <img
              src={logoImg}
              alt="BucksnBricks Logo"
              className="h-11 w-auto object-contain cursor-pointer"
              onClick={() => onPageChange?.('home')}
              
            />
          </div>

          {/* GET STARTED Banner aligned right with custom image style contact button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-7 w-full md:w-auto">
            
            {/* Large premium white rectangular card-button with dark bold navy text & deep soft shadow */}
            <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            whileHover={{ y: -3 }}
              onClick={() => {
                if (onPageChange) {
                  onPageChange('home');
                }
                setTimeout(() => {
                  const element = document.getElementById('contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 150);
              }}
              className="bg-white hover:bg-slate-50 text-slate-900 font-sans text-xs font-black tracking-widest py-4 px-10 rounded-md shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100/50 uppercase transition-all cursor-pointer w-full sm:w-auto"
            >
              CONTACT US
            </motion.button>
          </div>
        </div>

        {/* Bottom Columns Grid (Socials and 4 Link Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12">
          
          {/* Column 1: Socials Description and Icons */}
          <div className="md:col-span-4 flex flex-col items-start">
            <h4 className="text-[#011c30] font-bold font-display text-base mb-1">
              Bucks & Bricks
            </h4>
            <p className="text-blue-600 font-sans text-xs font-semibold italic mb-6">
              "Bringing You Bricks So That You Can Make Bucks."
            </p>

            {/* Social Icons stagger */}
            <StaggerContainer className="flex gap-2.5">
              {socialIcons.map((social, index) => (
                <div key={index}>
                  <StaggerItem direction="up">
                    <motion.a
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-blue-500 hover:border-blue-500 flex items-center justify-center transition-colors shadow-sm"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  </StaggerItem>
                </div>
              ))}
            </StaggerContainer>
          </div>

          {/* Column 2-5: Dynamic columns fading in */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {columns.map((col, colIdx) => (
              <motion.div
                key={colIdx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: colIdx * 0.1 }}
                className="flex flex-col items-start"
              >
                <h5 className="text-[#011c30] font-bold font-display text-xs uppercase tracking-wider mb-4">
                  {col.title}
                </h5>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="text-slate-500 hover:text-blue-500 font-sans text-xs sm:text-sm transition-colors duration-150"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Footnote and Scroll to Top */}
        <div className="pt-8 border-t border-slate-150/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 font-sans text-xs">
            &copy; {new Date().getFullYear()} Bucks n Bricks Talent Management Solutions. All rights reserved.
          </p>

          <motion.button
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScrollToTop}
            className="p-2.5 bg-white border border-slate-200 hover:border-blue-500 rounded-full text-slate-500 hover:text-blue-500 shadow-sm cursor-pointer transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>

      </div>
    </footer>
  );
}
