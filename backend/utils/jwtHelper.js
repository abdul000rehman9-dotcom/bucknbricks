import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/constants.js';

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret === 'YOUR_JWT_SECRET') {
    return JWT_CONFIG.DEFAULT_SECRET;
  }
  return secret;
};

/**
 * Generate a signed JWT token for an admin
 * @param {Object} payload - Object containing admin id, email, role
 * @returns {string} Signed JWT token
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: JWT_CONFIG.EXPIRES_IN,
  });
};

/**
 * Verify and decode a JWT token
 * @param {string} token - JWT token string
 * @returns {Object} Decoded payload
 */
export const verifyToken = (token) => {
  return jwt.verify(token, getJwtSecret());
};
