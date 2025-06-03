# LUNARA Backend API

Express.js backend for the LUNARA Postpartum Support Platform.

## Technology Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with Passport.js
- **OAuth**: Google OAuth 2.0
- **Email**: Nodemailer (Gmail SMTP)
- **Real-time**: Socket.IO
- **Documentation**: Swagger/OpenAPI
- **Security**: Helmet, CORS, Rate Limiting
- **Testing**: Jest with Supertest

## Features

### Sprint 1 (Current)
- ✅ User authentication (email/password + OAuth)
- ✅ JWT token management with refresh tokens
- ✅ Email verification and password reset
- ✅ User profile management
- ✅ MongoDB data models
- ✅ API documentation with Swagger
- ✅ Security middleware and rate limiting
- ✅ Real-time messaging infrastructure

### Sprint 2-3 (Planned)
- 🔄 Client intake form and profile management
- 🔄 Doula assignment and client management
- 🔄 Appointment scheduling system
- 🔄 Messaging between clients and doulas
- 🔄 Resource library management
- 🔄 Wellness check-ins and tracking
- 🔄 Blog/content management
- 🔄 Push notifications
- 🔄 File upload with Cloudinary

## Getting Started

### Prerequisites

- Node.js 18 or higher
- MongoDB (local or Atlas)
- Gmail account for email service

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   # Copy environment template
   cp env.example .env
   
   # Edit .env with your configuration
   ```

3. **Required Environment Variables**
   ```env
   # Server
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/lunara
   
   # JWT Secrets (generate secure random strings)
   JWT_SECRET=your-jwt-secret
   JWT_REFRESH_SECRET=your-refresh-secret
   
   # Email (Gmail)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   
   # OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Access API Documentation**
   - Swagger UI: http://localhost:5000/api-docs
   - Health Check: http://localhost:5000/api/health

## 📚 Database Documentation

We have comprehensive database documentation for the team:

- **🚀 [DATABASE_TEAM_GUIDE.md](./DATABASE_TEAM_GUIDE.md)** - **START HERE!** Complete guide for team members setting up MongoDB
- **📖 [MONGODB_SETUP_GUIDE.md](./MONGODB_SETUP_GUIDE.md)** - Step-by-step setup instructions in plain English
- **📊 [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** - Detailed data structure and relationships explanation
- **⚡ [DATABASE_QUICK_REFERENCE.md](./DATABASE_QUICK_REFERENCE.md)** - Quick reference for developers

**For the team member setting up the database**: Start with [DATABASE_TEAM_GUIDE.md](./DATABASE_TEAM_GUIDE.md) - it has everything you need!

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Email/password login
- `GET /api/auth/google` - Google OAuth login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/verify-email` - Verify email address
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Future Endpoints (Sprint 2-3)
- Clients: `/api/clients/*`
- Providers: `/api/providers/*`
- Appointments: `/api/appointments/*`
- Messages: `/api/messages/*`
- Resources: `/api/resources/*`
- Check-ins: `/api/checkins/*`
- Blog: `/api/blog/*`

## Data Models

### User
- Basic user information (name, email, role)
- Authentication data (password hash, tokens)
- OAuth provider information
- Profile settings and preferences

### Client
- References User model (role: 'client')
- Intake form data
- Birth and pregnancy information
- Provider assignment
- Onboarding progress tracking

### Provider
- References User model (role: 'doula')
- Professional certifications and experience
- Specialties and services offered
- Availability and client management
- Service areas and pricing

## Security Features

- JWT access tokens (1 hour expiry)
- Refresh tokens (7 day expiry)
- Password hashing with bcrypt
- Rate limiting (100 requests/15 minutes)
- Helmet security headers
- CORS configuration
- Input validation and sanitization

## Email Templates

Pre-built email templates for:
- Welcome/email verification
- Password reset
- Appointment confirmations

## Development

### Scripts
```bash
npm run dev        # Start with nodemon
npm start          # Production start
npm test           # Run tests
npm run test:watch # Watch mode testing
```

### Testing
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### Database Operations

The application automatically handles:
- MongoDB connection
- Schema validation
- Automatic timestamps
- Index creation
- Relationship population

## Deployment

### Environment Variables for Production

Ensure these are set in production:
- `NODE_ENV=production`
- Strong JWT secrets
- MongoDB Atlas connection string
- Gmail app password
- Google OAuth credentials
- Frontend URL for CORS

### Docker Support

Dockerfile included for containerized deployment.

## Migration from Spring Boot

This Express.js backend replaces the previous Spring Boot implementation:

### Mapping
- Spring Controllers → Express Routes
- JPA Entities → Mongoose Models
- Spring Security → Passport.js + JWT
- Spring Data JPA → Mongoose ODM
- PostgreSQL → MongoDB

### Key Differences
- Document-based storage vs relational
- Embedded documents vs foreign keys
- JSON-based configuration vs annotations
- Middleware pattern vs AOP

## Contributing

1. Follow existing code patterns
2. Add tests for new features
3. Update API documentation
4. Validate with existing environment

## Support

For development questions or issues, refer to:
- API Documentation: `/api-docs`
- Health Check: `/api/health`
- Console logs for debugging 