import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import passport from 'passport';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';

dotenv.config();

// Import passport configuration
import './config/passport';

// Import types
import { AuthenticatedRequest } from './types';

// Import routes
import appointmentsRouter from './routes/appointments';
import messagesRouter from './routes/messages';
import resourcesRouter from './routes/resources';
import checkinsRouter from './routes/checkins';
import blogRouter from './routes/blog';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Startup check for required environment variables
const REQUIRED_ENV_VARS = [
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
  'MONGODB_URI',
  'EMAIL_USER',
  'EMAIL_PASS',
  'FRONTEND_URL',
];

const missingVars = REQUIRED_ENV_VARS.filter((v) => !process.env[v]);
if (missingVars.length > 0) {
  console.error(`FATAL: Missing required environment variables: ${missingVars.join(', ')}`);
  process.exit(1);
}

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lunara', {
  // Note: useNewUrlParser and useUnifiedTopology are deprecated in newer versions
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err: Error) => console.error('MongoDB connection error:', err));

// Security Middleware
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'none'"],
      scriptSrc: ["'none'"],
      connectSrc: ["'self'", process.env.FRONTEND_URL].filter(Boolean) as string[],
      imgSrc: ["'none'"],
      styleSrc: ["'none'"],
      fontSrc: ["'none'"],
      objectSrc: ["'none'"],
      frameSrc: ["'none'"],
      baseUri: ["'none'"],
      formAction: ["'none'"],
    },
  })
);
app.use(compression());

// CORS Configuration
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  "https://lunara.onrender.com"
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Body Parsing Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
app.use(morgan('combined'));

// Passport middleware
app.use(passport.initialize());

// Swagger Documentation
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LUNARA API',
      version: '1.0.0',
      description: 'Postpartum Support Platform API',
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:5000/api',
      },
    ],
  },
  apis: ['./src/routes/**/*.ts', './src/models/**/*.ts'],
};

const specs = swaggerJsdoc(swaggerOptions);

// FIXED: Proper CSP middleware function
function swaggerCSPMiddleware(req: Request, res: Response, next: NextFunction): void {
  res.setHeader('Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data:; " +
    "font-src 'self'; " +
    "connect-src 'self'; " +
    "object-src 'none'; " +
    "frame-src 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self';"
  );
  next();
}

// FIXED: Separate middleware registration to avoid type conflicts
app.use('/api-docs', swaggerCSPMiddleware);
app.use('/api-docs', ...swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(specs));

// Routes
app.use('/api/appointments', appointmentsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/resources', resourcesRouter);
app.use('/api/checkins', checkinsRouter);
app.use('/api/blog', blogRouter);

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Socket.io for real-time messaging
interface MessageData {
  conversationId: string;
  message: string;
  sender: string;
  receiver: string;
  type?: 'text' | 'image' | 'file' | 'appointment_request' | 'system';
}

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_conversation', (conversationId: string) => {
    socket.join(conversationId);
    console.log(`User ${socket.id} joined conversation ${conversationId}`);
  });

  socket.on('send_message', async (messageData: MessageData) => {
    try {
      // Save message to database (implement in message service)
      const { conversationId, message } = messageData;
      
      // Emit to all users in the conversation
      io.to(conversationId).emit('new_message', messageData);
      
      // Trigger push notification for offline users
      // TODO: Implement push notification service
      
    } catch (error) {
      console.error('Error sending message:', error);
      socket.emit('message_error', { error: 'Failed to send message' });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Error handling interface
interface CustomError extends Error {
  status?: number;
  name: string;
}

// FIXED: Proper error handler function signature
function errorHandler(err: CustomError, req: Request, res: Response, next: NextFunction): void {
  console.error(err.stack);
  
  if (err.name === 'ValidationError') {
    res.status(400).json({
      error: 'Validation Error',
      details: err.message
    });
    return;
  }
  
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid token'
    });
    return;
  }
  
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
  });
}

app.use(errorHandler);

// 404 Handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource was not found'
  });
});

// FIXED: Proper port binding for Render
const PORT = parseInt(process.env.PORT || '', 10) || 10000;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});

export { app, server, io };