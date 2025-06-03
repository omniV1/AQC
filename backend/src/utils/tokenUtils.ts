import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

interface IUser {
  _id: Types.ObjectId;
  email: string;
  role: string;
}

interface TokenPayload {
  id: string;
  email: string;
  role: string;
  exp?: number;
}

/**
 * Generate access and refresh tokens for a user
 * @param user - User object
 * @returns Object containing accessToken and refreshToken
 */
export const generateTokens = (user: IUser): { accessToken: string; refreshToken: string } => {
  const payload: TokenPayload = {
    id: user._id.toString(),
    email: user.email,
    role: user.role
  };

  const accessToken = jwt.sign(
    payload,
    process.env.JWT_SECRET!,
    { 
      expiresIn: process.env.JWT_EXPIRE || '1h',
      issuer: 'lunara-api',
      audience: 'lunara-frontend'
    }
  );

  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET!,
    { 
      expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d',
      issuer: 'lunara-api',
      audience: 'lunara-frontend'
    }
  );

  return {
    accessToken,
    refreshToken
  };
};

/**
 * Verify an access token
 * @param token - JWT access token
 * @returns Decoded token payload
 * @throws Error - If token is invalid or expired
 */
export const verifyAccessToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!, {
      issuer: 'lunara-api',
      audience: 'lunara-frontend'
    }) as TokenPayload;
  } catch (error) {
    throw new Error('Invalid access token');
  }
};

/**
 * Verify a refresh token
 * @param token - JWT refresh token
 * @returns Decoded token payload
 * @throws Error - If token is invalid or expired
 */
export const verifyRefreshToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET!, {
      issuer: 'lunara-api',
      audience: 'lunara-frontend'
    }) as TokenPayload;
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};

/**
 * Decode a JWT token without verification (for debugging)
 * @param token - JWT token
 * @returns Decoded token payload
 */
export const decodeToken = (token: string): TokenPayload | null => {
  try {
    return jwt.decode(token) as TokenPayload;
  } catch (error) {
    return null;
  }
};

/**
 * Check if a token is expired
 * @param token - JWT token
 * @returns True if token is expired
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwt.decode(token) as TokenPayload;
    if (!decoded || !decoded.exp) {
      return true;
    }
    
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

/**
 * Get token expiration time
 * @param token - JWT token
 * @returns Expiration date or null if invalid
 */
export const getTokenExpiration = (token: string): Date | null => {
  try {
    const decoded = jwt.decode(token) as TokenPayload;
    if (!decoded || !decoded.exp) {
      return null;
    }
    
    return new Date(decoded.exp * 1000);
  } catch (error) {
    return null;
  }
};

/**
 * Extract user ID from token
 * @param token - JWT token
 * @returns User ID or null if invalid
 */
export const getUserIdFromToken = (token: string): string | null => {
  try {
    const decoded = jwt.decode(token) as TokenPayload;
    return decoded?.id || null;
  } catch (error) {
    return null;
  }
};

/**
 * Get token time until expiration in seconds
 * @param token - JWT token
 * @returns Seconds until expiration or null if invalid/expired
 */
export const getTokenTimeToExpiry = (token: string): number | null => {
  try {
    const decoded = jwt.decode(token) as TokenPayload;
    if (!decoded || !decoded.exp) {
      return null;
    }
    
    const currentTime = Math.floor(Date.now() / 1000);
    const timeToExpiry = decoded.exp - currentTime;
    
    return timeToExpiry > 0 ? timeToExpiry : null;
  } catch (error) {
    console.error('Failed to get token time to expiry:', error);
    return null;
  }
};

/**
 * Validate JWT environment variables
 * @throws Error if required environment variables are missing
 */
export const validateJWTEnvironment = (): void => {
  const requiredVars = ['JWT_SECRET', 'JWT_REFRESH_SECRET'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required JWT environment variables: ${missingVars.join(', ')}`);
  }
  
  if (process.env.JWT_SECRET === process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_SECRET and JWT_REFRESH_SECRET must be different');
  }
}; 