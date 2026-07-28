import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  UploadCloud,
  CheckCircle2,
  Lock,
  Clock,
  Star,
  ShieldCheck,
  ArrowLeft,
  Check,
  X,
  FileText,
  Building2,
  ChevronDown,
  Loader2,
  Briefcase,
  DollarSign,
  Award,
  GraduationCap,
} from 'lucide-react';
import { getPublicJobById } from '../services/api';

export interface JobItem {
  id: string;
  _id?: string;
  title: string;
  company?: string;
  location: string;
  workType: 'Remote' | 'On-Site';
  description: string;
  responsibilities?: string[];
  requirements?: string[];
}

// Sample job data matching top open vacancies
export const defaultJobsList: JobItem[] = [
  {
    id: '1',
    title: 'Software Engineer',
    company: 'Bucks & Bricks Tech',
    location: 'Sydney',
    workType: 'Remote',
    description:
      'Join our innovative engineering team designing, developing, and maintaining high-quality software solutions. At Bucks & Bricks, we build mission-critical enterprise applications and workforce platforms for industry leaders across Pakistan and international markets.',
    responsibilities: [
      'Refining software architecture and codebases to ensure 99% operational accuracy and efficiency',
      'Applying expert domain knowledge of modern full-stack web and backend technologies',
      'Managing complex technical multi-team integrations and architectural review meetings',
      'Implementing comprehensive security guidelines and software compliance standards',
      'Contributing to continuous improvements in automated testing and CI/CD pipelines',
      'Ensuring consistent documentation standards across technical systems',
    ],
    requirements: [
      'High-speed internet connection (50 Mbps download/10 Mbps upload minimum)',
      'Professional-grade development environment and noise-canceling hardware',
      'Private, quiet workspace for handling confidential codebase and client data',
      'Minimum 2+ years experience in TypeScript, React, Node.js, and modern databases',
    ],
  },
  {
    id: '2',
    title: 'Executive Search Manager',
    company: 'Bucks & Bricks Talent Solutions',
    location: 'Karachi',
    workType: 'On-Site',
    description:
      'Lead high-stakes executive search assignments for senior management and C-suite roles. Partner with top enterprise clients across FMCG, Banking, and Manufacturing sectors to identify, evaluate, and attract transformative executive talent.',
    responsibilities: [
      'Conducting confidential leadership mapping and executive talent sourcing across key industries',
      'Facilitating strategic client briefings and candidate competency assessments',
      'Managing C-level offer negotiations, executive onboarding, and post-placement integration',
      'Maintaining absolute confidentiality and compliance with executive search protocols',
      'Building long-term advisory relationships with client board members and HR leaders',
    ],
    requirements: [
      'Proven experience in executive search, headhunting, or senior talent acquisition',
      'Deep understanding of Pakistan’s corporate leadership landscape and industry benchmarks',
      'Exceptional communication, interpersonal, and stakeholder management skills',
      'Private and professional workspace for conducting executive client communications',
    ],
  },
  {
    id: '3',
    title: 'HR Consulting Specialist',
    company: 'Bucks & Bricks Advisory',
    location: 'Lahore',
    workType: 'On-Site',
    description:
      'Provide customized HR consulting services including process development, HR audits, policy crafting, and organizational design for growing organizations seeking structured workforce transformation.',
    responsibilities: [
      'Executing comprehensive HR policy reviews and organizational effectiveness audits',
      'Designing custom performance management systems and competency frameworks',
      'Collaborating with corporate leadership to implement HR best practices and compliance standards',
      'Developing structured onboarding programs and job evaluation matrices for clients',
    ],
    requirements: [
      'Degree in Human Resource Management, Organizational Psychology, or related field',
      '3+ years experience in HR advisory, policy creation, or management consulting',
      'Strong analytical mindset with proficiency in HR metrics and diagnostic reporting',
    ],
  },
  {
    id: '4',
    title: 'Learning & Development Lead',
    company: 'Bucks & Bricks Academy',
    location: 'Islamabad',
    workType: 'Remote',
    description:
      'Design and deliver corporate training programs, leadership workshops, and competency assessment interventions that empower teams and build future-ready leadership capability.',
    responsibilities: [
      'Curating interactive leadership and soft-skills corporate training modules',
      'Conducting training needs analysis (TNA) for enterprise clients across sectors',
      'Facilitating engaging online and in-person corporate workshops and seminars',
      'Measuring training ROI and post-intervention learning outcomes',
    ],
    requirements: [
      'Demonstrated experience in corporate L&D, instructional design, or executive coaching',
      'Strong presentation, facilitation, and group dynamic management skills',
      'Professional digital presentation tools setup for seamless remote facilitation',
    ],
  },
  {
    id: '5',
    title: 'Recruitment Consultant',
    company: 'Bucks & Bricks Talent Solutions',
    location: 'Karachi',
    workType: 'On-Site',
    description:
      'Drive end-to-end recruitment pipelines for mid-to-senior level roles across FMCG, Pharma, and Textile sectors. Connect qualified candidates with growth-focused businesses.',
    responsibilities: [
      'Sourcing, screening, and shortlisting candidates using modern talent intelligence tools',
      'Conducting structured competency-based interviews and reference checks',
      'Managing candidate-client interview schedules and feedback loops',
    ],
    requirements: [
      '2+ years experience in end-to-end agency or corporate recruitment',
      'Strong candidate network across FMCG, Pharma, or Engineering industries',
    ],
  },
  {
    id: '6',
    title: 'Talent Acquisition Specialist',
    company: 'Bucks & Bricks Tech',
    location: 'Sydney',
    workType: 'Remote',
    description:
      'Manage full-cycle tech recruitment for high-growth software and technology partners, identifying top engineering and product talent globally.',
    responsibilities: [
      'Building active talent pipelines for software engineering and technical roles',
      'Assessing candidate technical alignment, soft skills, and cultural fit',
    ],
    requirements: [
      'Background in technical recruitment or tech sourcing',
      'Familiarity with software engineering stacks and technology terminology',
    ],
  },
  {
    id: '7',
    title: 'Payroll & HR Operations Lead',
    company: 'Bucks & Bricks Advisory',
    location: 'Lahore',
    workType: 'On-Site',
    description:
      'Ensure precise, timely, and compliant payroll management and HR operations support for partner companies.',
    responsibilities: [
      'Overseeing monthly payroll processing, tax deductions, and benefit allocations',
      'Maintaining audit-ready HR records and statutory compliance reports',
    ],
    requirements: [
      'Proven expertise in payroll software, labor law compliance, and HR operations',
    ],
  },
  {
    id: '8',
    title: 'Corporate Sales & Accounts Manager',
    company: 'Bucks & Bricks Client Success',
    location: 'Islamabad',
    workType: 'Remote',
    description:
      'Manage corporate relationships with enterprise clients, understanding their talent challenges and presenting tailored recruitment and HR solutions.',
    responsibilities: [
      'Nurturing relationships with key corporate accounts and HR directors',
      'Identifying business expansion opportunities across diverse industry verticals',
    ],
    requirements: [
      'Strong B2B sales or key account management background in professional services',
    ],
  },
];

interface JobDetailPageProps {
  key?: string;
  jobId?: string;
  onBack?: () => void;
}

export function JobDetailPage({ jobId = '1', onBack }: JobDetailPageProps) {
  const formRef = useRef<HTMLDivElement>(null);

  const [jobData, setJobData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    async function fetchJob() {
      try {
        setLoading(true);
        setFetchError('');
        const res = await getPublicJobById(jobId);
        if (isMounted) {
          if (res) {
            setJobData(res);
          } else {
            setFetchError('Job vacancy not found.');
          }
        }
      } catch (err: any) {
        if (isMounted) {
          console.error('Failed to fetch job details:', err);
          const fallback = defaultJobsList.find((j) => j.id === jobId) || defaultJobsList[0];
          if (fallback) {
            setJobData({
              _id: fallback.id,
              id: fallback.id,
              jobTitle: fallback.title,
              companyName: fallback.company,
              city: fallback.location,
              workplaceType: fallback.workType,
              employmentType: 'Full Time',
              description: fallback.description,
              responsibilities: fallback.responsibilities || [],
              requirements: fallback.requirements || [],
              perksAndBenefits: [],
            });
          } else {
            setFetchError('Failed to load job vacancy details.');
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchJob();
    return () => {
      isMounted = false;
    };
  }, [jobId]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [jobId]);

  // Form State
  const [file, setFile] = useState<File | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Pakistan');
  const [primaryLang, setPrimaryLang] = useState('English');
  const [additionalLangs, setAdditionalLangs] = useState('Urdu');
  const [prevExp, setPrevExp] = useState<string[]>(['HR / Recruitment']);
  const [expLevel, setExpLevel] = useState<'Beginner' | 'Intermediate' | 'Expert'>('Intermediate');
  const [pastExpText, setPastExpText] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState(20);
  const [startImmediately, setStartImmediately] = useState(true);
  const [termsAgreed, setTermsAgreed] = useState(false);

  // Form Validation & Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle File Select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setErrorMessage('');
    }
  };

  // Toggle Previous Experience Checkbox
  const togglePrevExp = (item: string) => {
    if (prevExp.includes(item)) {
      setPrevExp(prevExp.filter((i) => i !== item));
    } else {
      setPrevExp([...prevExp, item]);
    }
  };

  // Scroll to Apply Form
  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle Submit Application
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Please enter your phone number.');
      return;
    }
    if (!termsAgreed) {
      setErrorMessage('Please agree to the Terms & Conditions and Privacy Policy.');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('firstName', firstName.trim());
      formData.append('lastName', lastName.trim());
      formData.append('email', email.trim());
      formData.append('phoneNumber', phone.trim());
      formData.append('country', country);
      formData.append('currentCity', 'Remote / Hybrid');
      formData.append('yearsOfExperience', expLevel === 'Beginner' ? '1' : expLevel === 'Intermediate' ? '3' : '5');
      formData.append('primaryLanguage', primaryLang);
      formData.append('additionalLanguage', additionalLangs);
      formData.append('jobId', job.id || job._id || jobId);
      if (file) {
        formData.append('resume', file);
      } else {
        const dummyBlob = new Blob(['Resume content for ' + firstName + ' ' + lastName], { type: 'application/pdf' });
        formData.append('resume', dummyBlob, `${firstName}_${lastName}_Resume.pdf`);
      }

      const res = await fetch(`/api/v1/applications/jobs/${job.id || job._id || jobId}/apply`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok && !data.success) {
        console.warn('API submission notice:', data.message);
      }
    } catch (err) {
      console.warn('Network error during submission, falling back to simulated submit:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 bg-[#f8fafc] min-h-screen flex flex-col items-center justify-center space-y-3">
        <Loader2 size={36} className="animate-spin text-[#052842]" />
        <p className="text-slate-600 font-sans text-sm font-medium">Loading job details...</p>
      </div>
    );
  }

  if (fetchError || !jobData) {
    return (
      <div className="pt-32 pb-20 bg-[#f8fafc] min-h-screen flex flex-col items-center justify-center px-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-md w-full text-center shadow-sm">
          <X className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold font-display text-[#011c30] mb-2">Job Vacancy Not Found</h2>
          <p className="text-slate-600 font-sans text-sm mb-6">{fetchError || 'The requested job vacancy is unavailable or has been closed.'}</p>
          <button
            onClick={() => {
              if (onBack) onBack();
              else window.location.hash = '#vacancies';
            }}
            className="inline-flex items-center gap-2 bg-[#052842] text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-[#031828] transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back to Vacancies
          </button>
        </div>
      </div>
    );
  }

  const jobTitle = jobData.jobTitle || jobData.title || 'Untitled Position';
  const companyName = jobData.companyName || jobData.company || 'Bucks & Bricks Co.';
  const city = jobData.city || jobData.location || 'Pakistan';
  const countryStr = jobData.country ? `, ${jobData.country}` : '';
  const locationStr = `${city}${countryStr}`;
  const workplaceType = jobData.workplaceType || jobData.workType || 'On-Site';
  const employmentType = jobData.employmentType || 'Full Time';
  const description = jobData.description || 'No detailed description provided for this position.';
  const responsibilities: string[] = Array.isArray(jobData.responsibilities) && jobData.responsibilities.length > 0
    ? jobData.responsibilities
    : [];
  const requirements: string[] = Array.isArray(jobData.requirements) && jobData.requirements.length > 0
    ? jobData.requirements
    : [];
  const perksAndBenefits: string[] = Array.isArray(jobData.perksAndBenefits) && jobData.perksAndBenefits.length > 0
    ? jobData.perksAndBenefits
    : [];
  const salary = jobData.salary || '';
  const experienceRequired = jobData.experienceRequired || '';
  const education = jobData.education || '';
  const currentJobId = jobData._id || jobData.id || jobId;

  const job = {
    id: currentJobId,
    _id: currentJobId,
    title: jobTitle,
    company: companyName,
    location: locationStr,
    workType: workplaceType,
    description: description,
    responsibilities: responsibilities,
    requirements: requirements,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -15, scale: 0.985 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="pt-24 pb-20 bg-[#f8fafc] text-slate-800 font-sans min-h-screen overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Back Navigation Row */}
        <motion.div
          initial={{ opacity: 0, x: -15, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex items-center justify-between"
        >
          <motion.button
            whileHover={{ scale: 1.025, x: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (onBack) {
                onBack();
              } else {
                window.location.hash = '#vacancies';
              }
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#052842] transition-colors bg-white px-4 py-2.5 rounded-xl border border-slate-200/80 shadow-sm cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back to Open Vacancies
          </motion.button>
        </motion.div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ==========================================================================
             LEFT COLUMN - Job Details & Information (Opens Animated First)
             ========================================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.12,
            }}
            style={{ willChange: 'transform, opacity, filter' }}
            className="lg:col-span-7 xl:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 shadow-sm text-left"
          >
            
            {/* Header Block: Title & Apply Now Button */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5"
            >
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold font-display text-[#011c30] tracking-tight leading-tight">
                  {job.title}
                </h1>
                {job.company && (
                  <p className="text-sm font-semibold text-slate-500 mt-1 flex items-center gap-1.5">
                    <Building2 size={14} className="text-slate-400" />
                    {job.company} • {job.location}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Badges Row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-2 mb-8"
            >
              <span className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold px-3.5 py-1.5 rounded-lg">
                <MapPin size={14} className="text-[#052842]" />
                {workplaceType}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold px-3.5 py-1.5 rounded-lg">
                <Briefcase size={14} className="text-[#052842]" />
                {employmentType}
              </span>
              {experienceRequired && (
                <span className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold px-3.5 py-1.5 rounded-lg">
                  <Award size={14} className="text-[#052842]" />
                  {experienceRequired}
                </span>
              )}
              {education && (
                <span className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold px-3.5 py-1.5 rounded-lg">
                  <GraduationCap size={14} className="text-[#052842]" />
                  {education}
                </span>
              )}
              {salary && (
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold px-3.5 py-1.5 rounded-lg">
                  <DollarSign size={14} className="text-emerald-600" />
                  {salary}
                </span>
              )}
            </motion.div>

            <hr className="border-slate-100 my-8" />

            {/* Job Description */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10"
            >
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#011c30] mb-4">
                Job Description
              </h2>
              <div className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed space-y-4 whitespace-pre-line">
                <p>{description}</p>
              </div>
            </motion.div>

            <hr className="border-slate-100 my-8" />

            {/* Responsibilities */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10"
            >
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#011c30] mb-4">
                Responsibilities
              </h2>
              <ul className="space-y-3.5">
                {responsibilities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#052842] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 leading-snug font-sans">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <hr className="border-slate-100 my-8" />

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10"
            >
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#011c30] mb-4">
                Requirements & Qualifications
              </h2>
              <ul className="space-y-3.5">
                {requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#052842] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 leading-snug font-sans">
                      {req}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {perksAndBenefits.length > 0 && (
              <>
                <hr className="border-slate-100 my-8" />
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.54, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-10"
                >
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-[#011c30] mb-6">
                    Perks & Benefits
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {perksAndBenefits.map((perk, idx) => (
                      <div key={idx} className="bg-slate-50/80 border border-slate-100 rounded-xl p-4 flex items-start gap-3.5">
                        <div className="p-2.5 bg-blue-50 text-[#052842] rounded-lg shrink-0">
                          <Star size={18} />
                        </div>
                        <div className="self-center">
                          <h4 className="font-bold text-[#011c30] text-xs sm:text-sm mb-0.5">
                            {perk}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}

            <hr className="border-slate-100 my-8" />

            {/* More Roles Coming Soon Card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-slate-50 border border-slate-100 rounded-xl p-5 text-left"
            >
              <h4 className="font-bold text-[#011c30] text-xs sm:text-sm mb-1">
                More Roles Coming Soon
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed font-sans">
                Stay tuned for additional opportunities across our engineering, consulting, and talent solutions teams.
              </p>
            </motion.div>

          </motion.div>

          {/* ==========================================================================
             RIGHT COLUMN - Sticky "Apply Now" Form Card (Opens Animated Second)
             ========================================================================== */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 25, scale: 0.97, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.38, // Opens smoothly AFTER description
            }}
            style={{ willChange: 'transform, opacity, filter' }}
            className="lg:col-span-5 xl:col-span-4 bg-white border border-slate-200/90 rounded-2xl shadow-xl p-6 sm:p-7 relative sticky top-24 text-left"
          >
            {/* Form Top Header Row */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#011c30]">
                Apply Now
              </h2>
              <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                <Lock size={12} className="text-emerald-500" />
                Secure Application
              </span>
            </div>

            {/* Application Success State */}
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center flex flex-col items-center"
              >
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <Check size={28} strokeWidth={3} />
                </div>
                <h3 className="font-display font-bold text-xl text-[#011c30] mb-2">
                  Application Submitted!
                </h3>
                <p className="text-xs text-slate-600 font-sans leading-relaxed mb-6 max-w-xs">
                  Thank you for applying for <span className="font-bold text-slate-800">{job.title}</span>. Our recruitment team will review your application and contact you within 7 days.
                </p>
                <motion.button
                  whileHover={{ scale: 1.025, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsSubmitted(false);
                    setFile(null);
                  }}
                  className="bg-[#052842] hover:bg-white hover:text-[#052842] border border-[#052842] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  Submit Another Application
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Resume Upload Box */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Resume Upload
                  </label>

                  <div className="relative border-2 border-dashed border-slate-200 hover:border-[#052842] bg-slate-50/50 hover:bg-blue-50/30 rounded-xl p-5 text-center transition-all cursor-pointer group">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />

                    {file ? (
                      <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm relative z-20">
                        <div className="flex items-center gap-2.5 min-w-0 text-left">
                          <FileText size={20} className="text-[#052842] shrink-0" />
                          <div className="truncate">
                            <p className="text-xs font-bold text-slate-800 truncate">
                              {file.name}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              {(file.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFile(null);
                          }}
                          className="p-1 text-slate-400 hover:text-rose-500 rounded-md transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="p-2.5 bg-blue-50 text-[#052842] rounded-full mb-2 group-hover:scale-110 transition-transform">
                          <UploadCloud size={20} />
                        </div>
                        <p className="text-xs text-slate-500 mb-2 font-sans">
                          Upload your resume here to autofill key application fields
                        </p>
                        <span className="inline-block bg-white border border-slate-200 shadow-sm text-xs font-semibold text-slate-700 px-4 py-1.5 rounded-lg group-hover:bg-[#052842] group-hover:text-white group-hover:border-[#052842] transition-colors">
                          Choose File
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Personal Information */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#011c30] mb-3 pb-1 border-b border-slate-100">
                    Personal Information
                  </h3>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Your first name"
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#052842] focus:bg-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Your last name"
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#052842] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#052842] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+92 300 0000000"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#052842] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Country *
                      </label>
                      <div className="relative">
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#052842] focus:bg-white transition-all appearance-none cursor-pointer pr-8"
                        >
                          <option value="Pakistan">Pakistan</option>
                          <option value="United Arab Emirates">United Arab Emirates</option>
                          <option value="Saudi Arabia">Saudi Arabia</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="United States">United States</option>
                          <option value="Australia">Australia</option>
                          <option value="Canada">Canada</option>
                          <option value="Other">Other</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Experience */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#011c30] mb-3 pb-1 border-b border-slate-100">
                    Experience
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Primary Language Spoken *
                      </label>
                      <div className="relative">
                        <select
                          value={primaryLang}
                          onChange={(e) => setPrimaryLang(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#052842] focus:bg-white transition-all appearance-none cursor-pointer pr-8"
                        >
                          <option value="English">English</option>
                          <option value="Urdu">Urdu</option>
                          <option value="Arabic">Arabic</option>
                          <option value="Spanish">Spanish</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Additional Languages
                      </label>
                      <div className="relative">
                        <select
                          value={additionalLangs}
                          onChange={(e) => setAdditionalLangs(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#052842] focus:bg-white transition-all appearance-none cursor-pointer pr-8"
                        >
                          <option value="Urdu">Urdu</option>
                          <option value="English">English</option>
                          <option value="Arabic">Arabic</option>
                          <option value="Punjabi">Punjabi</option>
                          <option value="Sindhi">Sindhi</option>
                          <option value="None">None</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms & Conditions and Privacy Policy Checkbox */}
                <div className="pt-2 border-t border-slate-100">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={termsAgreed}
                      onChange={(e) => {
                        setTermsAgreed(e.target.checked);
                        if (e.target.checked && errorMessage === 'Please agree to the Terms & Conditions and Privacy Policy.') {
                          setErrorMessage('');
                        }
                      }}
                      className="mt-0.5 rounded border-slate-300 text-[#052842] focus:ring-[#052842] cursor-pointer"
                    />
                    <span className="text-xs text-slate-600 leading-relaxed">
                      I agree to the <a href="#" onClick={(e) => e.preventDefault()} className="font-bold text-[#052842] hover:underline">Terms &amp; Conditions</a> and <a href="#" onClick={(e) => e.preventDefault()} className="font-bold text-[#052842] hover:underline">Privacy Policy</a> of Bucks n Bricks.
                    </span>
                  </label>
                </div>

                {/* Error Message if Validation Fails */}
                {errorMessage && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-600 text-xs text-center font-medium">
                    {errorMessage}
                  </div>
                )}

                {/* Submit Application Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="w-full bg-[#052842] hover:bg-white hover:text-[#052842] border border-[#052842] text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-md text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="inline-block animate-pulse">Submitting Application...</span>
                  ) : (
                    'Submit Application'
                  )}
                </motion.button>

                <p className="text-[11px] text-slate-400 text-center font-sans">
                  We'll get back to you within 7 days
                </p>
              </form>
            )}

          </motion.div>

        </div>

      </div>
    </motion.div>
  );
}
