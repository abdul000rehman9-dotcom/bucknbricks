import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

/**
 * Connect to MongoDB Atlas via Mongoose
 */
export const connectDB = async () => {
  try {
    let mongoURI = process.env.MONGODB_URI;

    if (!mongoURI || mongoURI === 'YOUR_MONGODB_URI' || (!mongoURI.startsWith('mongodb://') && !mongoURI.startsWith('mongodb+srv://'))) {
      const msg = 'MONGODB_URI is not defined or is set to placeholder. Running in offline database fallback mode.';
      if (process.env.NODE_ENV === 'production') {
        logger.warn(`⚠️  [DATABASE WARNING] Production Mode: ${msg} Please configure MONGODB_URI for production persistence.`);
      } else {
        logger.info(`ℹ️  [DATABASE INFO] Development Mode: ${msg}`);
      }
      mongoose.set('bufferCommands', false);
      return false;
    }

    // Sanitize user typos such as angle brackets around username/password placeholders in Atlas URIs
    mongoURI = mongoURI.replace(/<([^>]+)>/g, '$1');

    const options = {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    const conn = await mongoose.connect(mongoURI, options);

    logger.info(`MongoDB Connected Successfully: ${conn.connection.host} / Database: ${conn.connection.name}`);

    // Connection Event Listeners
    mongoose.connection.on('error', (err) => {
      logger.warn(`MongoDB connection notice: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected successfully.');
    });

    return true;
  } catch (error) {
    const msg = `MongoDB Atlas connection failed: ${error.message}. Running in offline database fallback mode.`;
    if (process.env.NODE_ENV === 'production') {
      logger.warn(`⚠️  [DATABASE WARNING] Production Mode: ${msg}`);
    } else {
      logger.info(`ℹ️  [DATABASE INFO] Development Mode: ${msg}`);
    }
    // Non-blocking for development setup - disable buffering to prevent 10s query hangs
    mongoose.set('bufferCommands', false);
    return false;
  }
};

/**
 * Disconnect from MongoDB
 */
export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    logger.info('MongoDB disconnected cleanly.');
  } catch (error) {
    logger.error(`Error disconnecting MongoDB: ${error.message}`);
  }
};
