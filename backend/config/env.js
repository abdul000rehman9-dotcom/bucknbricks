import dotenv from 'dotenv';
import { logger } from '../utils/logger.js';

// Load environment variables from .env file into process.env before any other module loads
dotenv.config();

/**
 * Validate application environment startup variables.
 * Fails fast with a clear error message if any required configuration is missing or invalid.
 */
export const validateEnvironment = () => {
  const env = process.env.NODE_ENV || 'development';
  const port = process.env.PORT || 3000;

  const requiredVariables = [
    {
      key: 'MONGODB_URI',
      name: 'MongoDB Database Connection',
      validator: (val) => Boolean(val && val !== 'YOUR_MONGODB_URI' && !val.startsWith('YOUR_') && (val.startsWith('mongodb://') || val.startsWith('mongodb+srv://'))),
      expected: 'A valid MongoDB connection string starting with mongodb:// or mongodb+srv://'
    },
    {
      key: 'JWT_SECRET',
      name: 'JWT Authentication Secret',
      validator: (val) => Boolean(val && val !== 'YOUR_JWT_SECRET' && !val.startsWith('YOUR_')),
      expected: 'A secure secret string for signing JWT tokens'
    },
    {
      key: 'GEMINI_API_KEY',
      name: 'Google Gemini API Key',
      validator: (val) => Boolean(val && val !== 'YOUR_GEMINI_API_KEY' && !val.startsWith('YOUR_')),
      expected: 'A valid Google AI Studio Gemini API key'
    },
    {
      key: 'RESEND_API_KEY',
      name: 'Resend Email Service API Key',
      validator: (val) => Boolean(val && val !== 'YOUR_RESEND_API_KEY' && !val.startsWith('YOUR_')),
      expected: 'A valid Resend API key'
    }
  ];

  logger.info(`=============================================================`);
  logger.info(`🚀 Starting AI Recruitment Platform [Mode: ${env.toUpperCase()}]`);
  logger.info(`=============================================================`);

  const missingOrInvalid = [];

  requiredVariables.forEach((reqVar) => {
    const val = process.env[reqVar.key];
    if (!reqVar.validator(val)) {
      missingOrInvalid.push(reqVar);
      logger.error(`❌ [ENV ERROR] ${reqVar.name} (${reqVar.key}) is missing or invalid.`);
      logger.error(`   Expected: ${reqVar.expected}`);
    } else {
      logger.info(`✅ [ENV] ${reqVar.name} (${reqVar.key}): Configured`);
    }
  });

  if (missingOrInvalid.length > 0) {
    const missingKeys = missingOrInvalid.map((v) => v.key).join(', ');
    const errorMsg = `Startup Error: Missing or invalid required environment variables: ${missingKeys}. Please check your .env file.`;
    logger.error(`=============================================================`);
    logger.error(`❌ FATAL CONFIGURATION ERROR`);
    logger.error(errorMsg);
    logger.error(`=============================================================`);
    throw new Error(errorMsg);
  }

  logger.info(`-------------------------------------------------------------`);
  return { env, port };
};
