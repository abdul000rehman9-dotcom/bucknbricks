import dotenv from 'dotenv';
import { logger } from '../utils/logger.js';

// Load environment variables from .env file into process.env before any other module loads
dotenv.config();

/**
 * Validate and document application environment startup variables.
 * Provides clean developer experience without crashing when running in demo/offline mode.
 */
export const validateEnvironment = () => {
  const env = process.env.NODE_ENV || 'development';
  const port = process.env.PORT || 3000;
  
  const checks = [
    {
      key: 'MONGODB_URI',
      name: 'MongoDB Database Connection',
      isSet: Boolean(process.env.MONGODB_URI && process.env.MONGODB_URI !== 'YOUR_MONGODB_URI' && (process.env.MONGODB_URI.startsWith('mongodb://') || process.env.MONGODB_URI.startsWith('mongodb+srv://'))),
      fallback: 'Offline memory-based fallback database enabled (100% functional demo mode)'
    },
    {
      key: 'GEMINI_API_KEY',
      name: 'Google Gemini AI (ATS & Chatbot)',
      isSet: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY'),
      fallback: 'Intelligent rule-based ATS scoring & gatekeeper chatbot fallback enabled'
    },
    {
      key: 'JWT_SECRET',
      name: 'JWT Authentication Secret',
      isSet: Boolean(process.env.JWT_SECRET && process.env.JWT_SECRET !== 'YOUR_JWT_SECRET'),
      fallback: 'Default secure development secret applied'
    },
    {
      key: 'RESEND_API_KEY',
      name: 'Resend Email Service',
      isSet: Boolean(process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'YOUR_RESEND_API_KEY'),
      fallback: 'Simulated email delivery log mode enabled'
    }
  ];

  logger.info(`=============================================================`);
  logger.info(`🚀 Starting AI Recruitment Platform [Mode: ${env.toUpperCase()}]`);
  logger.info(`=============================================================`);

  checks.forEach((check) => {
    if (check.isSet) {
      logger.info(`✅ [ENV] ${check.name} (${check.key}): Configured`);
    } else if (env === 'production') {
      logger.warn(`⚠️  [ENV WARNING] Production Mode: ${check.name} (${check.key}) is NOT set! Fallback active -> ${check.fallback}`);
    } else {
      logger.info(`ℹ️  [ENV INFO] Development Mode: ${check.name} (${check.key}) not set. Using local fallback -> ${check.fallback}`);
    }
  });

  logger.info(`-------------------------------------------------------------`);
  return { env, port };
};
