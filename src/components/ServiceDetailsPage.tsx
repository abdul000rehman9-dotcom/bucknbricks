
import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { AnimatedHeading, StaggerContainer, StaggerItem } from './animations';
import { Vacancies } from './Vacancies';
import { Contact } from './Contact';

const executiveSearchHeroImg = '/assets/executiveSearchHeroImg.jpg';
const executiveSearchDetailImg = '/assets/executiveSearchDetailImg.jpeg';

const recruitmentSolutionHeroImg = '/assets/recruitmentSolutionHeroImg.jpeg';
const recruitmentSolutionDetailImg = '/assets/recruitmentSolutionDetailImg.jpeg';

const hrConsultingHeroImg = '/assets/hrConsultingHeroImg.jpeg';
const hrConsultingDetailImg = '/assets/hrConsultingDetailImg.jpeg';

const learningDevelopmentHeroImg = '/assets/learningDevelopmentHeroImg.jpeg';
const learningDevelopmentDetailImg = '/assets/learningDevelopmentDetailImg.jpeg';

interface ServiceDetailsPageProps {
  serviceType: 'executive-search' | 'recruitment-solution' | 'hr-consulting' | 'learning-development';
}

export function ServiceDetailsPage({ serviceType }: ServiceDetailsPageProps) {
  useEffect(() => {
    // Reset page scroll position to top instantly on mount or serviceType change
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
  }, [serviceType]);

  // Determine dynamic heading, images, and content based on serviceType
  let title = '';
  let heroImg = '';
  let detailImg = '';
  let caseStudyTitle = '';
  let challengeText = '';
  let solutionText = '';
  let resultText = '';

  switch (serviceType) {
    case 'executive-search':
      title = 'Executive Search';
      heroImg = executiveSearchHeroImg;
      detailImg = executiveSearchDetailImg;
      caseStudyTitle = 'Executive Search Case Study';
      challengeText = 'A leading FMCG company required an experienced senior manager within a short timeframe.';
      solutionText = 'Targeted executive search and industry-specific talent mapping.';
      resultText = 'Position successfully filled with a highly qualified candidate within the agreed timeline.';
      break;
    case 'recruitment-solution':
      title = 'Recruitment Solutions';
      heroImg = recruitmentSolutionHeroImg;
      detailImg = recruitmentSolutionDetailImg;
      caseStudyTitle = 'Recruitment Solutions Case Study';
      challengeText = 'A rapidly growing organization needed to scale specialized teams across multiple departments.';
      solutionText = 'End-to-end candidate sourcing, screening, and streamlined placement workflow.';
      resultText = 'Multiple strategic roles filled efficiently with top-tier professional retention.';
      break;
    case 'hr-consulting':
      title = 'HR Consulting';
      heroImg = hrConsultingHeroImg;
      detailImg = hrConsultingDetailImg;
      caseStudyTitle = 'HR Consulting Case Study';
      challengeText = 'An expanding firm required policy alignment and workforce structure optimization.';
      solutionText = 'Comprehensive HR audit, organizational redesign, and strategic policy framework.';
      resultText = 'Significantly improved operational efficiency and organizational clarity.';
      break;
    case 'learning-development':
      title = 'Learning & Development';
      heroImg = learningDevelopmentHeroImg;
      detailImg = learningDevelopmentDetailImg;
      caseStudyTitle = 'Learning & Development Case Study';
      challengeText = 'A company sought to upskill team capabilities for digital transformation readiness.';
      solutionText = 'Customized leadership training modules and continuous talent development programs.';
      resultText = 'Achieved high engagement and measurable team performance enhancement.';
      break;
    default:
      title = 'Our Services';
      heroImg = recruitmentSolutionHeroImg;
      detailImg = recruitmentSolutionDetailImg;
      caseStudyTitle = 'Case Study';
      challengeText = 'Solving workforce challenges with targeted leadership.';
      solutionText = 'Delivering tailored recruitment and HR strategies.';
      resultText = 'Ensuring long-term success and organizational growth.';
  }

  return (
    <div className="pt-24 pb-12 bg-[#fcfbfa]">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

        <div className="relative z-10">
          <AnimatedHeading
            text={title}
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-[#011c30] tracking-tight leading-[1.1] mb-12 max-w-4xl mx-auto text-center"
            as="h1"
          />

          <div className="relative w-full max-w-5xl aspect-[16/9] md:aspect-[21/9] mx-auto rounded-3xl overflow-hidden shadow-2xl bg-slate-100 mb-16">
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
              style={{ originX: 1 }}
              className="absolute inset-0 bg-[#0b132a] z-10"
            />
              <motion.img
                initial={{ scale: 1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.6, ease: 'easeOut', delay: 0.1 }}
                src={heroImg}
                alt={title}
                className="w-full h-full object-fit"
              />
          </div>
        </div>
      </section>

      {/* Amazing Benefits Section */}
      <section className="relative py-16 sm:py-24 bg-white overflow-hidden border-t border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <AnimatedHeading
              text={caseStudyTitle}
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#011c30] tracking-tight text-center"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: -30 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: false, margin: '-10% 0px' }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl aspect-[4/3] w-full overflow-hidden shadow-xl border border-slate-200/50 bg-[#0b132a] relative flex items-center justify-center"
              >
                <img
                  src={detailImg}
                  alt={title}
                  className="w-full h-full object-fit"
                />
              </motion.div>
            </div>

            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <StaggerContainer className="flex flex-col gap-6 w-full">
                <StaggerItem direction="up" className="w-full">
                  <div className="border-b border-slate-100 pb-6">
                    <h3 className="text-[#011c30] font-bold font-display text-xl mb-2">Challenge</h3>
                    <p className="text-slate-600 font-sans text-xs sm:text-sm sm:leading-relaxed">
                      {challengeText}
                    </p>
                  </div>
                </StaggerItem>

                <StaggerItem direction="up" className="w-full">
                  <div className="border-b border-slate-100 pb-6">
                    <h3 className="text-[#011c30] font-bold font-display text-xl mb-2">Our Solution</h3>
                    <p className="text-slate-600 font-sans text-xs sm:text-sm sm:leading-relaxed">
                      {solutionText}
                    </p>
                  </div>
                </StaggerItem>

                <StaggerItem direction="up" className="w-full">
                  <div className="pb-2">
                    <h3 className="text-[#011c30] font-bold font-display text-xl mb-2">Result</h3>
                    <p className="text-slate-600 font-sans text-xs sm:text-sm sm:leading-relaxed">
                      {resultText}
                    </p>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>
      <Vacancies />
      <Contact />
      
    </div>
  );
}
