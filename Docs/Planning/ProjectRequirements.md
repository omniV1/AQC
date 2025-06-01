# LUNARA: Postpartum Support Platform

**Author(s):** Owen Lindsey, Carter Wright, Andrew Mack

**CST-451 Capstone Project Requirements Document**

**Grand Canyon University**

**Instructor:** Professor Amr Elchouemi

**Revision:** 2.0

**Date:** June 1, 2025



## TABLE OF CONTENTS

### 1. PROJECT OVERVIEW
- **Abstract** ................................................................. 3
- **Project Information** .................................................... 3
  - Author(s)
  - Course Details
  - Revision History

### 2. REQUIREMENTS SPECIFICATION
- **2.1 Functional Requirements** ............................................ 4
  - Use Cases Overview
  - Core Platform Features (FR1-FR15)
  - Priority Classifications
- **2.2 Non-Functional Requirements** ....................................... 8
  - System Quality Requirements (NFR1-NFR10)
  - Performance Standards
  - Security Specifications

### 3. TECHNICAL ARCHITECTURE
- **3.1 Technology Stack** .................................................. 11
  - Frontend Technologies
  - Backend Technologies
  - Third-Party Services
- **3.2 System Architecture** ............................................... 12
  - Layer Architecture Diagram
  - Component Interactions
- **3.3 Database Schema Design** ............................................ 13
  - MongoDB Collections
  - Data Relationships
  - Schema Specifications

### 4. PROJECT MANAGEMENT
- **4.1 Sprint Planning & Timeline** ........................................ 15
  - 20-Week Development Timeline
  - Sprint Breakdown (7 Sprints)
  - Resource Allocation
- **4.2 Features Roadmap** .................................................. 18
  - Launch Features
  - Post-Launch Phase 1
  - Future AI Integration

### 5. DESIGN & USER EXPERIENCE
- **5.1 User Interface Design** ............................................. 19
  - Design System
  - Key Interface Specifications
  - Mobile Responsiveness
- **5.2 Accessibility Requirements** ........................................ 21
  - WCAG 2.1 AA Compliance
  - Screen Reader Compatibility

### 6. SECURITY & PRIVACY
- **6.1 Data Protection Strategy** .......................................... 22
  - Security Measures
  - Privacy Compliance
- **6.2 Backup & Recovery** ................................................. 23
  - Data Backup Procedures
  - Disaster Recovery

### 7. QUALITY ASSURANCE
- **7.1 Testing Strategy** .................................................. 24
  - Unit Testing
  - Integration Testing
  - User Acceptance Testing
- **7.2 Performance Benchmarks** ............................................ 25
  - Load Time Requirements
  - API Response Standards

### 8. PROJECT GOVERNANCE
- **8.1 Risk Management** ................................................... 26
  - Technical Risks
  - Project Risks
  - Mitigation Strategies
- **8.2 Success Metrics & KPIs** ............................................ 27
  - Technical Performance
  - User Engagement
  - Business Metrics

### 9. DEPLOYMENT & OPERATIONS
- **9.1 Development Workflow** .............................................. 28
  - Git Flow Process
  - Code Review Standards
- **9.2 Deployment Strategy** ............................................... 29
  - Infrastructure Setup
  - Environment Management

### 10. APPENDICES
- **10.1 Requirements Traceability Matrix** ................................ 30
- **10.2 Change Management** ................................................ 31
  - Change Process
  - Change History
- **10.3 Team Signatures & Approval** ....................................... 32

---

## ABSTRACT

LUNARA is a comprehensive postpartum support platform designed to provide new parents with a digital sanctuary during their fourth trimester journey. The platform combines secure client management, personalized resources, and direct communication with doula support services. This project addresses the critical need for accessible, personalized postpartum care by creating a web-based platform that serves both clients seeking support and doulas providing care.

The system features secure authentication with OAuth integration, dynamic intake forms, personalized resource libraries, real-time messaging with push notifications, appointment scheduling, mood tracking, and unique features like daily "New Mama Horoscopes." For doulas, it provides comprehensive client management tools, template systems for care plans, and blog publishing capabilities. The platform prioritizes security, mobile responsiveness, and user experience while maintaining appropriate data protection for sensitive health information.

The completed platform will serve as a bridge between traditional doula services and modern digital accessibility, ensuring consistent, personalized care for new parents during their most vulnerable postpartum period.

---
**Terms Reference:** *Fourth Trimester, Doula, Postpartum* (see **GLOSSARY** sections D, F, P); *OAuth, Authentication* (see **GLOSSARY** sections O, A); *UI, UX* (see **ABBREVIATIONS & ACRONYMS**); *User Experience* (see **TECHNICAL TERMS REFERENCE - Quality Assurance**)

---

## Functional Requirements

### Use Cases

The following functional requirements define the core capabilities that the LUNARA platform must provide to support both clients (new parents) and service providers (doulas).

| ID  | Functional Requirement | Description | Acceptance Criteria | Priority |
|-----|----------------------|-------------|-------------------|----------|
| FR1 | **Public Website & Marketing** | Static website with information about services, doula profiles, and initial blog content to establish credibility and drive user acquisition. | Responsive landing page with service descriptions, doula biography and credentials, contact information and inquiry form, initial blog posts (static content), SEO optimization for local search, mobile-optimized design, fast loading times (<2 seconds) | High |
| FR2 | **Secure User Authentication & Registration** | Multi-method authentication system allowing email/password registration and OAuth integration with Google/Apple, all creating unified user accounts. | Email/password registration with validation, OAuth integration (Google/Apple) creating local user records, JWT-based session management with refresh tokens, role-based access control (Client, Doula, Admin), account linking for multiple auth methods, password reset functionality, email verification for new accounts | High |
| FR3 | **User Dashboard & Navigation** | Role-based dashboards providing personalized interfaces for clients and doulas with intuitive navigation between platform features. | Personalized welcome with user's name and current postpartum week (clients), quick access navigation to all platform features, role-based UI showing appropriate features only, mobile responsive design across all devices, activity feeds showing recent interactions, contextual help and onboarding for new users | High |
| FR4 | **Dynamic Intake & Onboarding Forms** | Clients complete comprehensive, mobile-optimized intake forms that adapt based on previous responses and save progress automatically. | Multi-step form with visual progress indicator, conditional field display based on previous answers, automatic progress saving between sections, mobile-friendly input controls and validation, form validation with helpful, contextual error messages, ability to return and edit previously completed sections | High |
| FR5 | **Real-time Secure Messaging** | Users can send and receive encrypted messages with their assigned doula, including file attachments, read receipts, and push notifications when offline. | Thread-based conversation organization, WebSocket implementation for real-time delivery, push notifications for offline users, read receipts and delivery confirmation, file and image attachment capability (max 10MB), message search and filtering functionality, message encryption for data protection | High |
| FR6 | **Appointment Scheduling & Management** | Clients can view available appointment slots, request bookings, and receive automated reminders via email and push notifications. | Interactive calendar view of available time slots, appointment request and confirmation workflow, automated email and push notification reminders, rescheduling and cancellation functionality, calendar export option (iCal format), appointment history and notes access, doula availability management | High |
| FR7 | **Personalized Resource Library** | The platform delivers a curated resource library with content recommendations based on user profiles, birth experience, feeding preferences, and recovery phase. | Categorized resources by type (nutrition, body care, infant care, mental health, relationships, printables), personalized recommendations based on user profile, search and filter functionality, ability to save favorite resources, resource preview cards with key information, downloadable guides and printable materials | Medium |
| FR8 | **Daily Check-ins & Mood Tracking** | The platform enables daily wellness check-ins with mood tracking, physical symptom logging, and trend visualization. | Daily prompt notifications for check-in completion, simple emotional well-being scale (1-10), physical symptom tracking with predefined options, weekly and monthly trend visualization, option to share results directly with assigned doula, historical data export capability, alerts for concerning patterns | Medium |
| FR9 | **Doula Client Management Dashboard** | Doulas can access comprehensive client overviews, upcoming sessions, wellness summaries, and administrative tools. | Client list with status indicators and recent activity, upcoming appointment calendar with client details, wellness check-in summaries and alerts, client communication history and notes, quick access to client resources and care plans, appointment scheduling and management tools, client progress tracking and reporting | Medium |
| FR10 | **Care Plan Template System** | Doulas can create, customize, and assign templated care plans and resource bundles to clients based on their specific needs. | Pre-built care plan templates for common scenarios, customizable template components and sections, drag-and-drop template builder interface, resource bundle creation and assignment, template sharing between doulas (with permission), client-specific template customization, progress tracking against care plan milestones | Medium |
| FR11 | **Blog Publishing Platform** | Doulas can create, edit, and publish blog posts that are publicly viewable, with content management and SEO optimization features. | Rich text blog post editor with media support, draft saving and publishing workflow, SEO optimization tools (meta descriptions, tags, titles), public blog view with responsive design, comment moderation system, blog post categorization and tagging, social media sharing integration, blog analytics and readership tracking | Medium |
| FR12 | **Digital Journaling Platform** | A private journaling space with guided prompts, media attachments, and milestone tracking capabilities. | Rich text editor with formatting options, optional guided prompts based on postpartum phase, photo and video attachment support, calendar view of journal entries, private by default with optional sharing to doula, milestone tracking and celebration features, entry export functionality for personal records | Low |
| FR13 | **New Mama Horoscope & Daily Insights** | Users receive personalized daily horoscopes combining astrological elements with practical postpartum guidance and baby development insights. | Daily updated content based on user's birth date and baby's age, personalized mood/energy forecasts, journal prompts and affirmation suggestions, baby development and behavior predictions, toggle between "whimsical" and "practical" content modes, shareable content for social media, integration with user's current postpartum phase | Low |
| FR14 | **Sleep & Feeding Trackers** | Optional tracking tools allow parents to monitor and log baby's sleep patterns, feeding schedules, and related data. | Intuitive data entry interface with minimal clicks, timeline visualization of sleep and feeding patterns, automatic pattern identification and insights, data export and sharing capability with doula, customizable tracking categories, weekly summary reports | Low |
| FR15 | **AI-Powered Note Summarization** | Doulas can convert session notes into structured follow-ups, care recommendations, and resource suggestions using AI assistance. | Voice-to-text note transcription, AI-powered summary generation from session notes, automatic action item extraction, suggested follow-up resources based on session content, template generation for care plans, integration with client messaging for follow-up delivery, note categorization and tagging system | Future |

---
**Terms Reference:** *Client, Doula* (see **GLOSSARY** sections C, D); *OAuth, Authentication, JWT* (see **GLOSSARY** sections O, A, J); *WebSocket, Push Notification* (see **GLOSSARY** sections W, P); *UI* (see **ABBREVIATIONS & ACRONYMS**); *User Story* (see **TECHNICAL TERMS REFERENCE - Development Methodologies**)

---

## Non-Functional Requirements

### System Quality Requirements

The following non-functional requirements define the quality attributes and constraints that the LUNARA platform must meet to ensure reliable, secure, and performant operation.

| ID | Non-Functional Requirement | Description | Implementation Guidelines | Priority |
|----|---------------------------|-------------|--------------------------|----------|
| NFR1 | **Data Security & Privacy** | The platform implements comprehensive security measures for all data transmission and storage, with appropriate protection for sensitive health information. | HTTPS/TLS 1.3 for all connections, bcrypt password hashing, JWT tokens with proper expiration and refresh, secure file upload handling, input validation and sanitization, regular security audits, protection against common vulnerabilities (XSS, CSRF, SQL injection) | High |
| NFR2 | **Mobile Responsiveness** | The application interface provides optimal user experience across all device types, screen sizes, and orientations. | Mobile-first responsive design using CSS Grid and Flexbox, touch-optimized interface elements, Progressive Web App (PWA) capabilities, cross-browser compatibility (Chrome, Firefox, Safari, Edge), accessibility compliance (WCAG 2.1 AA), performance optimization for mobile networks | High |
| NFR3 | **System Reliability & Performance** | The platform maintains high availability with fast response times and robust error handling. | 99.5% uptime target with monitoring, page load times under 3 seconds, API response times under 1 second, graceful error handling and user feedback, comprehensive error logging, automated health checks | High |
| NFR4 | **Real-time Communication** | Messaging and notifications work reliably with minimal delay, including offline notification delivery. | WebSocket connections for real-time messaging, push notification service integration, connection fallback and retry logic, message queuing for offline users, delivery confirmation and read receipts, notification preference management | High |
| NFR5 | **Scalability & Growth** | The system architecture supports growing user bases and content volume without significant performance degradation. | Horizontal scaling capabilities with cloud infrastructure, database indexing and query optimization, efficient file storage and CDN usage, API rate limiting and resource management, caching strategies for frequently accessed content | Medium |
| NFR6 | **User Experience & Accessibility** | The platform provides an intuitive, accessible user experience that accommodates users with varying technical skills and abilities. | Intuitive navigation and information architecture, WCAG 2.1 AA accessibility compliance, screen reader compatibility and keyboard navigation, context-sensitive help and documentation, progressive disclosure of complex features, consistent design patterns throughout | Medium |
| NFR7 | **Data Backup & Recovery** | Automated backup systems ensure data protection and enable recovery from system failures or data loss. | Daily automated database backups, secure backup storage, point-in-time recovery capabilities, regular backup integrity testing, documented recovery procedures, data retention policies (daily for 30 days, weekly for 1 year) | Medium |
| NFR8 | **Integration Capability** | The platform supports integration with external services and APIs commonly used in healthcare and wellness. | RESTful API design for external integrations, email service provider integration, push notification service integration, calendar service integration (Google Calendar), standardized data export formats (JSON, CSV, PDF), webhook support for real-time updates | Medium |
| NFR9 | **Content Management** | Efficient content creation, editing, and management tools support dynamic resource libraries and blog publishing. | Version control for content updates, content scheduling and publication workflows, SEO optimization tools and guidance, content categorization and tagging systems, media library management with optimization, WYSIWYG editor for non-technical users | Low |
| NFR10 | **Monitoring & Analytics** | System monitoring and user analytics provide insights for optimization and improvement. | Application performance monitoring, error tracking and automated notification, user behavior analytics and reporting, system health dashboards, usage statistics and trend analysis, custom reporting capabilities | Low |

---
**Terms Reference:** *HTTPS, TLS, bcrypt, JWT, XSS, CSRF* (see **GLOSSARY** sections H, T, B, J, X, C); *PWA, CSS, WCAG, API, CDN, REST* (see **ABBREVIATIONS & ACRONYMS**); *WYSIWYG* (see **GLOSSARY** section W); *Component-Based Architecture, RESTful API* (see **TECHNICAL TERMS REFERENCE - Architecture Patterns**)

---

## Technical Architecture

### Technology Stack

| Category | Technology | Purpose | Justification |
|----------|------------|---------|---------------|
| **Frontend Framework** | **React 18 with Vite** | Fast, modern frontend development with excellent DX | Superior development experience, fast HMR, optimized builds |
| **Frontend Styling** | **CSS Modules + SCSS** | Scoped, maintainable styling with advanced features | Component-scoped styles, variables, mixins, responsive design |
| **Backend Framework** | **Express.js (Node.js)** | Lightweight, flexible API server | JavaScript ecosystem consistency, extensive middleware |
| **Database** | **MongoDB with Mongoose** | Document-based storage with ODM | Flexible schemas, excellent Node.js integration, easy scaling |
| **Real-time Communication** | **Socket.io** | WebSocket implementation for messaging | Reliable real-time communication with fallbacks |
| **Authentication** | **Passport.js + JWT** | Multi-strategy authentication | OAuth integration, secure session management |
| **File Storage** | **Cloudinary** | Image/file upload and optimization | CDN delivery, automatic optimization, generous free tier |
| **Push Notifications** | **Web Push API** | Browser push notifications | Native browser support, no third-party dependencies initially |
| **Email Service** | **Nodemailer + Gmail SMTP** | Transactional emails | Cost-effective, reliable, easy setup |
| **Frontend Deployment** | **Vercel** | Static site hosting with edge functions | Excellent React/Vite support, automatic deployments |
| **Backend Deployment** | **Render** | Container-based backend hosting | Free tier, automatic deployments, easy scaling |
| **Database Hosting** | **MongoDB Atlas** | Managed MongoDB hosting | Free tier, automatic backups, global distribution |

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   Web Browser   │  │  Mobile Browser │  │  PWA         │ │
│  │   (React SPA)   │  │   (React SPA)   │  │  (Cached)    │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
                             ↕ HTTPS/WSS
┌──────────────────────────────────────────────────────────────┐
│                   APPLICATION LAYER                          │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              Express.js Application                     │ │
│  │  ┌──────────────┐ ┌──────────────┐ ┌─────────────────┐  │ │
│  │  │   Routes     │ │  Middleware  │ │   Controllers   │  │ │
│  │  │  (REST API)  │ │ (Auth, CORS, │ │  (Business      │  │ │
│  │  │              │ │  Validation) │ │   Logic)        │  │ │
│  │  └──────────────┘ └──────────────┘ └─────────────────┘  │ │
│  │                                                         │ │
│  │  ┌──────────────┐ ┌──────────────┐ ┌─────────────────┐  │ │
│  │  │  Socket.io   │ │   Services   │ │    Models       │  │ │
│  │  │ (Real-time)  │ │(Email, Push) │ │  (Mongoose)     │  │ │
│  │  └──────────────┘ └──────────────┘ └─────────────────┘  │ │
│  └─────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
                             ↕ TCP/HTTP
┌─────────────────────────────────────────────────────────────┐
│                     DATA LAYER                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   MongoDB       │  │   Cloudinary    │  │  File System │ │
│  │   (Atlas)       │  │  (Media CDN)    │  │   (Logs)     │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Database Schema Design

The MongoDB collections will be structured as follows:

**Users Collection:**
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed), // null for OAuth-only users
  oauthProviders: [{
    provider: String, // 'google', 'apple'
    providerId: String,
    email: String
  }],
  role: String, // 'client', 'doula', 'admin'
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    timezone: String,
    preferences: Object
  },
  isEmailVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

**Client Profiles Collection:**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  birthDate: Date,
  babyBirthDate: Date,
  postpartumWeek: Number,
  birthExperience: Object,
  feedingPreferences: [String],
  assignedDoula: ObjectId (ref: Users),
  intakeCompleted: Boolean,
  intakeData: Object,
  createdAt: Date,
  updatedAt: Date
}
```

**Messages Collection:**
```javascript
{
  _id: ObjectId,
  conversationId: String,
  sender: ObjectId (ref: Users),
  recipient: ObjectId (ref: Users),
  content: String,
  attachments: [String], // Cloudinary URLs
  isRead: Boolean,
  readAt: Date,
  createdAt: Date
}
```

**Appointments Collection:**
```javascript
{
  _id: ObjectId,
  client: ObjectId (ref: Users),
  doula: ObjectId (ref: Users),
  scheduledDate: Date,
  duration: Number, // minutes
  type: String, // 'virtual', 'in-person'
  status: String, // 'requested', 'confirmed', 'completed', 'cancelled'
  notes: String,
  remindersSent: [Date],
  createdAt: Date,
  updatedAt: Date
}
```

---
**Terms Reference:** *React, Vite, DX, HMR, CSS, SCSS, Express.js, Node.js, MongoDB, Mongoose, Socket.io, Passport.js, JWT, Cloudinary, CDN, Vercel, Render* (see **GLOSSARY** sections R, V, D, H, C, S, E, N, M, S, P, J, C, C, V, R); *API, ODM, PWA, SPA, WSS, HTTPS, REST, CORS* (see **ABBREVIATIONS & ACRONYMS**); *Component-Based Architecture, RESTful API* (see **TECHNICAL TERMS REFERENCE - Architecture Patterns**)

---

## Sprint Planning & Timeline

### 20-Week Development Timeline (7 Sprints)

**Sprint Duration:** ~3 weeks each
**Team:** 3 Full-stack developers
**Total Capacity:** ~420 developer hours (20 weeks × 21 hours/week/developer)

### Sprint Breakdown

#### Sprint 1 (Weeks 1-3): Foundation & Public Website
**Goal:** Establish project foundation and public presence
**Developer Focus:**
- **Owen:** Project setup, architecture, basic Express server
- **Carter:** Public website design and React components
- **Andrew:** CI/CD pipeline, deployment setup, database schema

**Deliverables:**
- [x] Project repository and development environment setup
- [x] Public website (FR1) - Static pages with doula information
- [x] Basic React application structure with routing
- [x] Express.js server with MongoDB connection
- [x] Deployment pipeline (Vercel + Render)
- [x] Basic authentication scaffolding

**Story Points:** 65 points

#### Sprint 2 (Weeks 4-6): Authentication & User Management
**Goal:** Complete user registration and authentication system
**Developer Focus:**
- **Owen:** Authentication API, JWT implementation, OAuth setup
- **Carter:** Registration/login UI, form validation, user dashboard layouts
- **Andrew:** Security middleware, password reset system, email integration

**Deliverables:**
- [ ] User registration and login system (FR2)
- [ ] OAuth integration (Google/Apple)
- [ ] Email verification and password reset
- [ ] Basic role-based dashboards (FR3)
- [ ] Security middleware and validation
- [ ] User profile management

**Story Points:** 75 points

#### Sprint 3 (Weeks 7-9): Core Client Features
**Goal:** Essential client-facing functionality
**Developer Focus:**
- **Owen:** Intake form API, data validation, client profile management
- **Carter:** Dynamic intake forms UI, progress tracking, dashboard completion
- **Andrew:** File upload system, data backup implementation

**Deliverables:**
- [ ] Dynamic intake and onboarding forms (FR4)
- [ ] Client dashboard with personalized content (FR3)
- [ ] File upload functionality
- [ ] Basic resource library structure (FR7)
- [ ] User profile completion flows

**Story Points:** 70 points

#### Sprint 4 (Weeks 10-12): Real-time Messaging
**Goal:** Complete messaging system with real-time capabilities
**Developer Focus:**
- **Owen:** Socket.io implementation, message API, conversation management
- **Carter:** Messaging UI, real-time updates, mobile-optimized chat interface
- **Andrew:** Push notification setup, message encryption, offline handling

**Deliverables:**
- [ ] Real-time secure messaging system (FR5)
- [ ] Push notifications for offline users
- [ ] File attachment support
- [ ] Message read receipts and delivery confirmation
- [ ] Conversation management and search

**Story Points:** 80 points

#### Sprint 5 (Weeks 13-15): Scheduling & Resource Management
**Goal:** Appointment system and resource library
**Developer Focus:**
- **Owen:** Appointment API, calendar integration, availability management
- **Carter:** Calendar UI, appointment booking flow, resource library interface
- **Andrew:** Email notifications, reminder system, resource categorization

**Deliverables:**
- [ ] Appointment scheduling and management (FR6)
- [ ] Interactive calendar interface
- [ ] Personalized resource library (FR7)
- [ ] Automated reminder system
- [ ] Resource recommendation engine

**Story Points:** 75 points

#### Sprint 6 (Weeks 16-18): Doula Portal & Content Management
**Goal:** Doula-specific features and content management
**Developer Focus:**
- **Owen:** Doula dashboard API, client management system, care plan templates
- **Carter:** Doula portal UI, client overview interface, template builder
- **Andrew:** Blog publishing system, SEO optimization, analytics setup

**Deliverables:**
- [ ] Doula client management dashboard (FR9)
- [ ] Care plan template system (FR10)
- [ ] Blog publishing platform (FR11)
- [ ] Daily check-ins and mood tracking (FR8)
- [ ] Client progress tracking

**Story Points:** 85 points

#### Sprint 7 (Weeks 19-20): Polish & Launch Preparation
**Goal:** Final testing, optimization, and launch readiness
**Developer Focus:**
- **Owen:** Performance optimization, security audit, documentation
- **Carter:** UI/UX polish, accessibility improvements, mobile optimization
- **Andrew:** Monitoring setup, error tracking, production preparation

**Deliverables:**
- [ ] Performance optimization and testing
- [ ] Security audit and penetration testing
- [ ] Accessibility compliance (WCAG 2.1 AA)
- [ ] Comprehensive documentation
- [ ] Production monitoring and alerting
- [ ] Launch preparation and go-live

**Story Points:** 50 points

### Features Deferred to Post-Launch

**Future Phase 1 (After Launch):**
- Digital journaling platform (FR12)
- New Mama Horoscope feature (FR13)
- Sleep & feeding trackers (FR14)

**Future Phase 2 (AI Integration):**
- AI-powered note summarization (FR15)
- Advanced analytics and insights
- Machine learning recommendations

---
**Terms Reference:** *Sprint* (see **GLOSSARY** section S); *Express.js, React, MongoDB, Socket.io, OAuth, JWT* (see **GLOSSARY** sections E, R, M, S, O, J); *CI/CD, UI, UX, API, WCAG* (see **ABBREVIATIONS & ACRONYMS**); *Agile Development, Sprint Planning, User Story* (see **TECHNICAL TERMS REFERENCE - Development Methodologies**)

---

## User Interface Design

### Design System
- **Color Palette**: Warm, nurturing tones (sage greens, soft peaches, cream whites, warm grays)
- **Typography**: Inter for UI, Lora for content (accessible, readable fonts)
- **Spacing**: 8px grid system for consistent alignment
- **Components**: Reusable component library with consistent patterns

### Key Interface Specifications

#### 1. Public Website
- Hero section with clear value proposition
- Services overview with pricing transparency
- Doula biography and credentials
- Contact form and booking CTA
- Blog section with latest posts
- Mobile-first responsive design

#### 2. Authentication Flows
- Clean, minimal login/register forms
- OAuth buttons with clear branding
- Progressive registration with email verification
- Password strength indicators
- Accessible error messages and validation

#### 3. Client Dashboard
- Personalized welcome with postpartum week progress
- Quick action cards (message doula, book appointment, daily check-in)
- Recent activity feed
- Resource recommendations
- Appointment reminders and upcoming sessions

#### 4. Messaging Interface
- WhatsApp-style conversation threads
- Real-time message delivery indicators
- File attachment with drag-and-drop
- Emoji picker and message formatting
- Search and filter conversations

#### 5. Appointment Scheduling
- Calendar grid with available slots highlighted
- Time zone awareness and conversion
- Appointment type selection (virtual/in-person)
- Confirmation flow with calendar integration
- Reminder preference settings

#### 6. Doula Portal
- Client overview dashboard with status indicators
- Quick client communication access
- Appointment management calendar
- Care plan template library
- Blog post creation and management

### Mobile Responsiveness Requirements
- Touch targets minimum 44px
- Swipe navigation where appropriate
- Optimized form inputs for mobile keyboards
- Progressive Web App capabilities
- Offline functionality for core features

---
**Terms Reference:** *UI, UX* (see **ABBREVIATIONS & ACRONYMS**); *OAuth, PWA* (see **GLOSSARY** sections O, P); *Component-Based Architecture* (see **TECHNICAL TERMS REFERENCE - Architecture Patterns**)

---

## Security & Privacy Specifications

### Data Protection Strategy
While LUNARA is positioned as a wellness and support platform rather than a medical application, we implement strong privacy protections due to the sensitive nature of postpartum information.

#### Security Measures
- **Authentication**: JWT tokens with refresh rotation, secure password hashing (bcrypt)
- **Data Transmission**: HTTPS/TLS 1.3 for all communications, WSS for WebSocket connections
- **Input Validation**: Comprehensive server-side validation, XSS protection, CSRF tokens
- **File Uploads**: Virus scanning, file type validation, secure storage with Cloudinary
- **API Security**: Rate limiting, request validation, SQL injection prevention

#### Privacy Compliance
- Clear privacy policy and terms of service
- User consent management for data collection
- Data retention policies (user-controlled deletion)
- Minimal data collection principle
- Regular security audits and vulnerability assessments

#### Data Backup & Recovery
- Daily automated MongoDB Atlas backups
- Encrypted backup storage
- 30-day point-in-time recovery
- Disaster recovery procedures documented
- Regular backup integrity testing

---
**Terms Reference:** *JWT, bcrypt, HTTPS, TLS, WSS, WebSocket, XSS, CSRF, Cloudinary, MongoDB* (see **GLOSSARY** sections J, B, H, T, W, W, X, C, C, M); *API* (see **ABBREVIATIONS & ACRONYMS**)

---

## Quality Assurance & Testing

### Testing Strategy

#### Unit Testing
- **Frontend**: React Testing Library + Jest for component testing
- **Backend**: Jest + Supertest for API endpoint testing
- **Coverage Target**: 80% code coverage minimum

#### Integration Testing
- API integration testing with test database
- Authentication flow testing
- Real-time messaging system testing
- File upload and storage testing

#### User Acceptance Testing
- Accessibility testing with screen readers
- Cross-browser compatibility testing
- Mobile device testing on various screen sizes
- Performance testing under load

#### Security Testing
- Penetration testing for common vulnerabilities
- Authentication and authorization testing
- Data encryption verification
- Input validation and sanitization testing

### Performance Benchmarks
- Page load time: <3 seconds on 3G connection
- API response time: <1 second for standard operations
- Real-time message delivery: <500ms
- Database query optimization with proper indexing

---
**Terms Reference:** *React, Jest, API* (see **GLOSSARY** sections R, J, A); *Unit Testing, Integration Testing, User Acceptance Testing* (see **TECHNICAL TERMS REFERENCE - Quality Assurance**)

---

## Risk Management

### Technical Risks
| Risk | Impact | Likelihood | Mitigation Strategy |
|------|--------|------------|-------------------|
| OAuth API rate limits/costs | High | Medium | Implement email/password as primary, OAuth as optional |
| Real-time messaging complexity | Medium | High | Start with basic implementation, enhance iteratively |
| Mobile performance issues | Medium | Medium | Performance testing throughout development |
| Third-party service outages | Medium | Low | Graceful degradation, fallback options |

### Project Risks
| Risk | Impact | Likelihood | Mitigation Strategy |
|------|--------|------------|-------------------|
| Scope creep | High | Medium | Strict sprint planning, change management process |
| Team member availability | High | Low | Cross-training, documentation, backup plans |
| Timeline pressure | Medium | Medium | Regular sprint reviews, priority adjustment |
| User adoption challenges | Medium | Low | User testing, feedback integration, marketing strategy |

---
**Terms Reference:** *OAuth, API* (see **GLOSSARY** sections O, A); *Sprint* (see **GLOSSARY** section S); *Risk Assessment, Project Management* (see **TECHNICAL TERMS REFERENCE - Project Management**)

---

## Success Metrics & KPIs

### Technical Performance
- System uptime: >99.5%
- Page load speeds: <3 seconds
- API response times: <1 second
- Mobile performance scores: >90 (Lighthouse)

### User Engagement
- User registration completion rate: >80%
- Daily active users: Track growth
- Message response time: <2 hours average
- Appointment booking completion: >90%

### Business Metrics
- User retention: >70% after 30 days
- Feature adoption rates by priority
- Support ticket volume and resolution time
- User satisfaction scores from feedback

---
**Terms Reference:** *KPI* (see **ABBREVIATIONS & ACRONYMS**); *API* (see **GLOSSARY** section A); *Performance Metrics, User Analytics* (see **TECHNICAL TERMS REFERENCE - Analytics & Monitoring**)

---

## Deployment & DevOps

### Development Workflow
- **Git Flow**: Feature branches, pull requests, protected main branch
- **Code Review**: Required PR reviews, automated testing
- **Continuous Integration**: GitHub Actions for testing and deployment
- **Environment Management**: Development, staging, production environments

### Deployment Strategy
- **Frontend**: Vercel with automatic deployments from main branch
- **Backend**: Render with Docker containers, automatic deployments
- **Database**: MongoDB Atlas with automated backups
- **Monitoring**: Basic monitoring with alerting for system health

### Infrastructure
- **CDN**: Cloudinary for media files and optimization
- **Email**: Gmail SMTP for transactional emails
- **Push Notifications**: Web Push API with service worker
- **Error Tracking**: Basic error logging and monitoring

---
**Terms Reference:** *Git Flow, CI/CD, CDN* (see **GLOSSARY** sections G, C, C); *Vercel, Render, MongoDB, Cloudinary* (see **GLOSSARY** sections V, R, M, C); *DevOps, Continuous Integration* (see **TECHNICAL TERMS REFERENCE - Development Operations**)

---

## Requirements Traceability Matrix

| User Story | Priority | Functional Requirement | Sprint | Status |
|------------|----------|----------------------|---------|---------|
| Public website presence | High | FR1 | Sprint 1 | ✅ Completed |
| Secure user registration | High | FR2 | Sprint 2 | 🔄 In Progress |
| User dashboard access | High | FR3 | Sprint 2-3 | 📋 Planned |
| Client intake process | High | FR4 | Sprint 3 | 📋 Planned |
| Real-time messaging | High | FR5 | Sprint 4 | 📋 Planned |
| Appointment scheduling | High | FR6 | Sprint 5 | 📋 Planned |
| Resource library | Medium | FR7 | Sprint 3-5 | 📋 Planned |
| Daily check-ins | Medium | FR8 | Sprint 6 | 📋 Planned |
| Doula client management | Medium | FR9 | Sprint 6 | 📋 Planned |
| Care plan templates | Medium | FR10 | Sprint 6 | 📋 Planned |
| Blog publishing | Medium | FR11 | Sprint 6 | 📋 Planned |
| Digital journaling | Low | FR12 | Future | ⏳ Deferred |
| Daily horoscopes | Low | FR13 | Future | ⏳ Deferred |
| Sleep/feeding tracking | Low | FR14 | Future | ⏳ Deferred |
| AI note summarization | Future | FR15 | Future | ⏳ Deferred |

---
**Terms Reference:** *Sprint* (see **GLOSSARY** section S); *User Story* (see **TECHNICAL TERMS REFERENCE - Development Methodologies**); *Requirements Traceability, Project Tracking* (see **TECHNICAL TERMS REFERENCE - Project Management**)

---

## Change Management

### Requirements Change Process
1. **Change Request**: Document proposed change with justification
2. **Impact Assessment**: Evaluate timeline, resource, and scope impact
3. **Team Review**: Discuss with all team members
4. **Approval**: Get instructor approval for significant changes
5. **Documentation**: Update requirements document
6. **Communication**: Inform all stakeholders of approved changes

### Change History

| Date | Requestor | Change Description | Approval Status | Impact |
|------|-----------|-------------------|----------------|--------|
| 2025-06-01 | Team | Updated technology stack from Next.js/Spring Boot to React/Express | ✅ Approved | Medium - Architecture change |
| | | | | |

---
**Terms Reference:** *React, Express* (see **GLOSSARY** sections R, E); *Change Management, Impact Assessment* (see **TECHNICAL TERMS REFERENCE - Project Management**)

---

**Development Team Signatures:**

**Owen Lindsey** - Project Lead & DevOps Engineer & UI/UX Developer & Full Stack Developer  
*Responsibilities: Architecture, Backend APIs, Project Management*

**Carter Wright** - Frontend Lead & DevOps Engineer & UI/UX Developer & Full Stack Developer   
*Responsibilities: React Development, Design System, User Experience*

**Andrew Mack** - Backend Lead & DevOps Engineer & UI/UX Developer & Full Stack Developer  
*Responsibilities: Infrastructure, Security, CI/CD, System Integration*

---

**Instructor Approval:**

**Professor Amr Elchouemi** - Course Instructor  
*Date: ________________*

## GLOSSARY

### A
**API (Application Programming Interface)**  
A set of protocols and tools for building software applications, allowing different software components to communicate.

**Authentication**  
The process of verifying the identity of a user or system before granting access to resources.

**Authorization**  
The process of determining what actions an authenticated user is permitted to perform.

### B
**bcrypt**  
A password hashing function designed to be computationally expensive to resist brute-force attacks.

**Backend**  
The server-side of an application that handles data processing, storage, and business logic.

### C
**CDN (Content Delivery Network)**  
A distributed network of servers that deliver web content to users based on their geographic location.

**CI/CD (Continuous Integration/Continuous Deployment)**  
Development practices that involve frequent code integration and automated deployment processes.

**Client**  
In LUNARA context: A new parent using the platform for postpartum support. In technical context: The frontend application or user interface.

**Cloudinary**  
A cloud-based service for managing and optimizing images and videos.

**CORS (Cross-Origin Resource Sharing)**  
A security feature implemented by web browsers to control how web pages access resources from other domains.

**CSRF (Cross-Site Request Forgery)**  
A type of malicious attack that tricks users into performing unwanted actions on web applications.

### D
**Doula**  
A trained professional who provides physical, emotional, and informational support to mothers before, during, and after childbirth.

**DX (Developer Experience)**  
The overall experience developers have when working with tools, frameworks, and development environments.

### E
**Express.js**  
A minimal and flexible Node.js web application framework for building APIs and web applications.

### F
**Fourth Trimester**  
The first three months after childbirth, focusing on the mother's physical and emotional recovery.

**Frontend**  
The client-side of an application that users interact with directly, including the user interface and user experience.

### G
**Git Flow**  
A branching model for Git that defines specific branch types and their purposes in the development workflow.

### H
**HTTPS (HyperText Transfer Protocol Secure)**  
The secure version of HTTP that encrypts data transmitted between web browsers and servers.

**HMR (Hot Module Replacement)**  
A development feature that allows modules to be updated in real-time without requiring a full page reload.

### I
**Intake Form**  
A comprehensive questionnaire that collects essential information about a client's needs, preferences, and circumstances.

### J
**Jest**  
A JavaScript testing framework designed to ensure correctness of any JavaScript codebase.

**JWT (JSON Web Token)**  
A compact, URL-safe token format used for securely transmitting information between parties.

### L
**Lighthouse**  
An open-source tool for measuring web page quality, including performance, accessibility, and SEO.

**LUNARA**  
The name of the postpartum support platform being developed (derived from "Luna" meaning moon, symbolizing cycles and nurturing).

### M
**MongoDB**  
A NoSQL document database that stores data in flexible, JSON-like documents.

**Mongoose**  
An Object Document Mapper (ODM) library for MongoDB and Node.js that provides schema validation and query building.

### N
**Node.js**  
A JavaScript runtime environment that allows JavaScript to be executed on the server side.

**NFR (Non-Functional Requirement)**  
Requirements that specify system quality attributes like performance, security, and usability rather than specific functionality.

### O
**OAuth**  
An open standard for access delegation, commonly used for secure authentication with third-party services.

**ODM (Object Document Mapper)**  
A programming technique for converting data between incompatible type systems in object-oriented programming languages and document databases.

### P
**Passport.js**  
An authentication middleware for Node.js that supports various authentication strategies.

**Postpartum**  
The period following childbirth, typically referring to the first six weeks to several months after delivery.

**Progressive Web App (PWA)**  
A web application that uses modern web capabilities to provide an app-like experience to users.

**Push Notification**  
Messages that are pushed from a server to user devices, even when the application is not actively being used.

### R
**React**  
A JavaScript library for building user interfaces, particularly single-page applications with dynamic content.

**Render**  
A cloud platform that provides hosting services for web applications and APIs.

**REST (Representational State Transfer)**  
An architectural style for designing networked applications using standard HTTP methods.

### S
**SCSS (Sassy CSS)**  
A CSS preprocessor that adds features like variables, nesting, and mixins to standard CSS.

**Socket.io**  
A JavaScript library that enables real-time, bidirectional communication between web clients and servers.

**SPA (Single Page Application)**  
A web application that loads a single HTML page and dynamically updates content as users interact with the app.

**Sprint**  
A fixed time period (typically 2-4 weeks) during which specific development work is completed in Agile methodology.

**Supertest**  
A JavaScript library for testing HTTP servers, commonly used with Node.js applications.

### T
**TLS (Transport Layer Security)**  
A cryptographic protocol that provides secure communication over a computer network.

### U
**UI (User Interface)**  
The visual elements and interactive components that users interact with in an application.

**UX (User Experience)**  
The overall experience and satisfaction a user has when interacting with a product or system.

### V
**Vercel**  
A cloud platform for deploying and hosting frontend applications with automatic scaling and optimization.

**Vite**  
A build tool that provides fast development server and optimized production builds for modern web applications.

### W
**WCAG (Web Content Accessibility Guidelines)**  
International standards for making web content accessible to people with disabilities.

**WebSocket**  
A communication protocol that provides full-duplex communication channels over a single TCP connection.

**WSS (WebSocket Secure)**  
The secure version of WebSocket protocol that uses TLS/SSL encryption.

**WYSIWYG (What You See Is What You Get)**  
A type of editor that allows users to edit content in a format that closely resembles the final output.

### X
**XSS (Cross-Site Scripting)**  
A type of security vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users.

---

## ABBREVIATIONS & ACRONYMS

| Abbreviation | Full Term | Context |
|--------------|-----------|---------|
| API | Application Programming Interface | Technical |
| CDN | Content Delivery Network | Infrastructure |
| CI/CD | Continuous Integration/Continuous Deployment | Development |
| CORS | Cross-Origin Resource Sharing | Security |
| CSRF | Cross-Site Request Forgery | Security |
| CSS | Cascading Style Sheets | Frontend |
| DX | Developer Experience | Development |
| FR | Functional Requirement | Requirements |
| HTTPS | HyperText Transfer Protocol Secure | Security |
| JWT | JSON Web Token | Authentication |
| KPI | Key Performance Indicator | Metrics |
| NFR | Non-Functional Requirement | Requirements |
| ODM | Object Document Mapper | Database |
| PWA | Progressive Web App | Frontend |
| REST | Representational State Transfer | API Architecture |
| SCSS | Sassy CSS | Styling |
| SPA | Single Page Application | Frontend |
| TLS | Transport Layer Security | Security |
| UI | User Interface | Design |
| UX | User Experience | Design |
| WCAG | Web Content Accessibility Guidelines | Accessibility |
| WSS | WebSocket Secure | Communication |
| XSS | Cross-Site Scripting | Security |

---

## TECHNICAL TERMS REFERENCE

### Development Methodologies
- **Agile Development**: Iterative development approach with short sprints and continuous feedback
- **Sprint Planning**: Process of defining work to be completed in upcoming development sprints
- **User Story**: Brief description of a feature from the user's perspective

### Architecture Patterns
- **RESTful API**: API design following REST architectural principles
- **Component-Based Architecture**: Breaking applications into reusable, independent components
- **Service-Oriented Architecture**: Designing applications as a collection of loosely coupled services

### Quality Assurance
- **Unit Testing**: Testing individual components or functions in isolation
- **Integration Testing**: Testing the interaction between different components or systems
- **User Acceptance Testing**: Testing performed by end users to validate system functionality

### Project Management
- **Risk Assessment**: Process of identifying and evaluating potential project risks
- **Project Management**: Planning, organizing, and managing resources to achieve project goals
- **Change Management**: Systematic approach to dealing with project scope and requirement changes
- **Impact Assessment**: Evaluation of how changes will affect project timeline, resources, and deliverables
- **Requirements Traceability**: Process of tracking requirements from inception through implementation
- **Project Tracking**: Monitoring project progress against planned milestones and deliverables

### Development Operations
- **DevOps**: Practices that combine software development and IT operations for faster delivery
- **Continuous Integration**: Development practice of frequently integrating code changes
- **Deployment Pipeline**: Automated process for moving code from development to production
- **Infrastructure as Code**: Managing infrastructure through machine-readable definition files

### Analytics & Monitoring
- **Performance Metrics**: Quantitative measures of system performance and efficiency
- **User Analytics**: Collection and analysis of user behavior data
- **System Monitoring**: Continuous observation of system performance and health
- **Error Tracking**: Process of identifying, logging, and resolving application errors

---