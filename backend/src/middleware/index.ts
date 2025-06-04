import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { APIError, handleMongooseError, handleJWTError, isOperationalError, ValidationError } from '../utils/errors';

// Extend Express Request interface to include custom properties
declare global {
  namespace Express {
    interface Request {
      startTime?: number;
    }
    interface Response {
      success?: (data: any, message?: string, statusCode?: number) => void;
      error?: (message: string, statusCode?: number, details?: any) => void;
    }
  }
}

/**
 * Request timing and logging middleware
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  req.startTime = Date.now();
  
  // Log request
  const requestInfo = {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  };
  
  console.log(`📥 ${req.method} ${req.originalUrl} - ${req.ip}`);
  
  // Log response on finish
  res.on('finish', () => {
    const duration = Date.now() - (req.startTime || 0);
    const logLevel = res.statusCode >= 400 ? '❌' : '✅';
    
    console.log(`${logLevel} ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`);
  });
  
  next();
};

/**
 * Validation error handler middleware
 */
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const validationErrors = errors.array().map((error: any) => ({
      field: error.param,
      message: error.msg,
      value: error.value
    }));
    
    res.status(422).json({
      success: false,
      error: 'Validation failed',
      details: validationErrors
    });
    return;
  }
  
  next();
};

/**
 * Async error wrapper to catch async route errors
 */
export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Global error handling middleware
 */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  let error = { ...err };
  error.message = err.message;

  console.error('🔥 Error:', err);

  // Mongoose validation errors
  if (err.name === 'ValidationError' || err.name === 'CastError' || err.code === 11000) {
    error = handleMongooseError(err);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    error = handleJWTError(err);
  }

  // API Errors (our custom errors)
  if (error instanceof APIError) {
    res.status(error.statusCode).json({
      success: false,
      error: error.message,
      ...(error instanceof ValidationError && error.details ? { details: error.details } : {})
    });
    return;
  }

  // Express validation errors
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      success: false,
      error: 'Invalid token'
    });
    return;
  }

  // Default server error
  const statusCode = error.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' && statusCode === 500 
    ? 'Internal Server Error' 
    : error.message;

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

/**
 * 404 handler for undefined routes
 */
export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: `The endpoint ${req.method} ${req.originalUrl} does not exist`
  });
};

/**
 * Rate limiting error handler
 */
export const rateLimitHandler = (req: Request, res: Response): void => {
  res.status(429).json({
    success: false,
    error: 'Too many requests',
    message: 'Please try again later',
    retryAfter: req.rateLimit?.resetTime
  });
};

/**
 * CORS error handler
 */
export const corsHandler = (req: Request, res: Response, next: NextFunction): void => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  
  next();
};

/**
 * Security headers middleware
 */
export const securityHeaders = (req: Request, res: Response, next: NextFunction): void => {
  // Remove Express signature
  res.removeHeader('X-Powered-By');
  
  // Add security headers
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  next();
};

/**
 * Request sanitization middleware
 */
export const sanitizeRequest = (req: Request, res: Response, next: NextFunction): void => {
  // Remove any potentially dangerous characters from request body
  if (req.body && typeof req.body === 'object') {
    const sanitize = (obj: any): void => {
      for (const key in obj) {
        if (typeof obj[key] === 'string') {
          obj[key] = obj[key].trim();
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          sanitize(obj[key]);
        }
      }
    };
    sanitize(req.body);
  }
  
  next();
};

/**
 * Response format middleware
 */
export const responseFormatter = (req: Request, res: Response, next: NextFunction): void => {
  // Add success response helper
  res.success = (data: any, message: string = 'Success', statusCode: number = 200): void => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    });
  };

  // Add error response helper
  res.error = (message: string, statusCode: number = 500, details: any = null): void => {
    res.status(statusCode).json({
      success: false,
      error: message,
      ...(details && { details }),
      timestamp: new Date().toISOString()
    });
  };

  next();
}; 