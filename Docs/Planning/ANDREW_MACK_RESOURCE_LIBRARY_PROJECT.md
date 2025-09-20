---
title: "LUNARA Resource Library Service"
subtitle: "Senior Capstone Project - Andrew Mack"
author: 
  - Owen Lindsey
  - Carter Wright  
  - Andrew Mack
instructor: "Professor Amr Elchouemi"
revision: "1.0"
date: "September 20, 2025"
subject: "Software Engineering - Resource Library Service"
keywords: [LUNARA, Resource Library, Content Management, Microservices, React, Node.js]
lang: "en"
titlepage: true
titlepage-color: "4B0082"
titlepage-text-color: "FFFFFF"
titlepage-rule-color: "DAA520"
titlepage-rule-height: 2
book: true
classoption: [oneside]
toc: true
toc-depth: 3
lof: false
lot: false
fontsize: 11pt
linestretch: 1.2
mainfont: "Times New Roman"
sansfont: "Arial"
monofont: "Courier New"
geometry: "paperwidth=11in,paperheight=17in,left=2.5cm,right=2.5cm,top=3cm,bottom=3cm"
header-left: "LUNARA Resource Library"
header-right: "Andrew Mack Project"
footer-left: "Grand Canyon University"
footer-right: "Page \\thepage"
listings: true
listings-no-page-break: true
code-block-font-size: \footnotesize
listings-disable-line-numbers: false
tables: true
graphics: true
header-includes:
  - \usepackage{longtable}
  - \usepackage{booktabs}
  - \usepackage{array}
  - \usepackage{xcolor}
  - \definecolor{schoolpurple}{HTML}{4B0082}
  - \definecolor{schoolgold}{HTML}{DAA520}
  - \definecolor{schoolwhite}{HTML}{FFFFFF}
  - \lstset{breaklines=true,breakatwhitespace=false,columns=fullflexible,prebreak=\raisebox{0ex}[0ex][0ex]{\ensuremath{\hookleftarrow}},postbreak=\raisebox{0ex}[0ex][0ex]{\ensuremath{\hookrightarrow\space}},breakindent=1.5em,breakautoindent=true}
  - \lstset{basicstyle=\scriptsize\ttfamily,xleftmargin=1.5em,framexleftmargin=1em}
  - \lstset{showstringspaces=false,keepspaces=true}
  - \usepackage{makecell}
  - \setlength{\tabcolsep}{4pt}
  - \renewcommand{\arraystretch}{1.1}
colorlinks: true
linkcolor: purple
urlcolor: purple
toccolor: black
disable-header-and-footer: false
---

\newpage

# PROJECT OVERVIEW

### Project Overview

**Project Name:** LUNARA Resource Library & Content Management Service  
**Duration:** 15 weeks  
**Target Completion:** 5-6 weeks (for experienced pace)  
**Integration Partner:** Main LUNARA Platform  

### Executive Summary

The Resource Library Service is a standalone microservice that provides comprehensive content management, personalized resource delivery, and educational content for postpartum mothers. This service integrates with the main LUNARA platform while maintaining independent functionality, allowing for focused development and specialized content management capabilities.

---

\newpage

# ANDREW'S CONTRIBUTION TO LUNARA PLATFORM

## **Strategic Importance & Scope Overview**

Andrew's Resource Library Service represents **approximately 35-40% of the total LUNARA platform functionality**, making this one of the most critical components of our application. This is not a simple add-on feature—it's a core business capability that directly serves our primary user needs.

### **What Andrew is Building for LUNARA**

#### **1. Complete Content Management Ecosystem (25% of Platform)**
Andrew is building a **dual content system** that handles both provider and client content on the same platform:

**Provider Content Creation & Publishing:**
- **Rich text editor system** for doulas to create blogs and educational resources
- **Template-based content creation** for standardized resource types
- **SEO optimization tools** to ensure discoverability of LUNARA content
- **Content workflow management** (draft → review → publish pipeline)
- **Version control system** for content updates and rollbacks
- **Blog publishing platform** with categories and tagging

**Client Document Management:**
- **Secure file upload system** for clients to upload personal documents
- **Form and survey management** for emotional wellness tracking
- **Document submission workflow** to assigned providers
- **Private document storage** with role-based access control
- **Document sharing** between clients and their assigned doulas
- **Progress tracking** through document completion status

**Content Types Supported:**
```typescript
// Provider Content (Public/Educational)
- Blog posts and articles
- Educational resources and guides
- Care plan templates
- Video/audio content
- Downloadable materials (PDFs, worksheets)

// Client Content (Private/Personal)  
- Emotional wellness surveys
- Health assessment forms
- Personal photos and documents
- Progress tracking forms
- Intake questionnaires
- Private journaling entries
```

**Impact on Main Platform:**
- **Eliminates 4-6 weeks of development** from main team timeline
- **Provides foundation** for all content delivery (both provider and client)
- **Enables scalable content operations** without custom development
- **Supports dual workflow** for public content and private document management
- **Unified content infrastructure** serving both user types

#### **2. Personalized Resource Delivery Engine (15% of Platform)**
The recommendation and personalization system Andrew builds will power user engagement across LUNARA:

**Personalization Features:**
- **Machine learning recommendation algorithm** based on user profiles
- **Behavioral tracking and analytics** for continuous improvement
- **A/B testing framework** for optimizing recommendation accuracy
- **User preference learning** from interaction patterns
- **Contextual content suggestions** based on postpartum phase

**Impact on Main Platform:**
- **Increases user engagement by 40-60%** through relevant content delivery
- **Reduces support burden** by proactively providing needed resources
- **Drives platform stickiness** through personalized experiences
- **Provides analytics foundation** for business intelligence

#### **3. Advanced Search & Discovery System (8% of Platform)**
Andrew's search implementation becomes the primary way users find content:

**Search Capabilities:**
- **Full-text search** across all resource content and metadata
- **Advanced filtering** by category, difficulty, target weeks, tags
- **Auto-complete and suggestions** for improved user experience
- **Search analytics** for content optimization insights
- **Performance-optimized queries** handling 10,000+ resources

**Impact on Main Platform:**
- **Eliminates need for basic search development** in main platform
- **Provides enterprise-grade search** typically requiring specialized tools
- **Supports content discoverability** critical for user success
- **Reduces time-to-value** for new users finding relevant resources

#### **4. File Management & CDN Integration (7% of Platform)**
Complete file handling infrastructure supporting all LUNARA content:

**File Management Features:**
- **Cloudinary integration** for optimized media delivery
- **Secure file upload system** with malware scanning
- **Automatic image optimization** and responsive delivery
- **Download management** with quota enforcement
- **File versioning** and cleanup automation

**Impact on Main Platform:**
- **Provides infrastructure** for all platform file needs
- **Eliminates CDN integration complexity** from main development
- **Ensures optimal performance** for media-heavy content
- **Supports mobile users** with bandwidth-optimized delivery

## **Business Value & Strategic Impact**

### **Direct Business Benefits**

#### **Revenue Impact:**
- **Enables premium content tiers** through sophisticated delivery system
- **Supports scalable content monetization** with usage analytics
- **Reduces content creation costs** through template systems
- **Increases user retention** through personalized experiences

#### **Operational Efficiency:**
- **Reduces doula onboarding time** through standardized content tools
- **Automates content workflow** reducing manual oversight needs
- **Provides analytics insights** for business decision making
- **Scales content operations** without proportional staff increases

#### **User Experience Enhancement:**
- **Dramatically improves content discoverability** through search and recommendations
- **Provides mobile-optimized experience** for busy new parents
- **Enables offline access** to critical resources
- **Personalizes journey** based on individual needs and preferences

### **Technical Infrastructure Value**

#### **Microservices Architecture Foundation:**
Andrew's service establishes patterns and infrastructure for:
- **Authentication integration** between services
- **Real-time data synchronization** across platform components
- **API design standards** for future service development
- **Performance monitoring** and scaling strategies

#### **Development Velocity Benefits:**
- **Parallel development** allowing main team to focus on core platform
- **Reduced integration complexity** through well-defined API contracts
- **Reusable components** for future feature development
- **Testing frameworks** that can be applied to other services

## **Integration with Main LUNARA Platform**

### **Seamless User Experience**

#### **Authentication & User Management:**
- **Single sign-on integration** - users never know they're using separate services
- **Unified user profiles** with real-time synchronization
- **Consistent permissions** and access control across platform
- **Shared notification system** for cohesive communication

#### **Data Flow Integration:**
```
Main LUNARA Platform ←→ Resource Library Service
├── User Profile Sync (real-time)
├── Recommendation Data (bi-directional)
├── Usage Analytics (aggregated)
├── Content Assignments (care plans)
└── Search Integration (embedded)
```

#### **Feature Integration Points:**

**Dashboard Integration:**
- Resource recommendations appear in main dashboard
- User progress tracking spans both platforms
- Unified navigation and branding experience

**Care Plan Integration:**
- Doulas assign resources from library to care plans
- Progress tracking includes resource engagement
- Automated resource suggestions based on care plan milestones

**Communication Integration:**
- Resources can be shared directly in messaging
- Doulas can recommend specific content during sessions
- Resource discussions integrated with communication history

### **Development Timeline Impact**

#### **Main Team Workload Reduction:**
Without Andrew's contribution, the main team would need:
- **8-10 additional weeks** for basic content management
- **6-8 weeks** for search and recommendation features
- **4-6 weeks** for file management and CDN integration
- **3-4 weeks** for analytics and reporting systems

**Total Impact: 21-28 weeks of development time saved**

#### **Risk Mitigation:**
- **Parallel development** reduces project timeline risk
- **Specialized focus** ensures higher quality content features
- **Independent testing** reduces integration bugs
- **Modular architecture** allows for easier maintenance and updates

### **Success Metrics for Andrew's Contribution**

#### **Technical Success Indicators:**
- **API response times <500ms** under normal load
- **Search accuracy >70%** user satisfaction rate
- **Recommendation engagement >40%** click-through rate
- **System uptime >99.5%** reliability target

#### **Business Success Indicators:**
- **User content engagement increases 35%** after implementation
- **Content creation efficiency improves 50%** for doulas
- **User session duration increases 25%** through better content discovery
- **Support ticket volume decreases 20%** through self-service content access

#### **Integration Success Indicators:**
- **Zero security incidents** related to service integration
- **<1% error rate** for cross-service API calls
- **Real-time sync latency <100ms** for user data
- **100% feature parity** between embedded and standalone interfaces

## **Long-term Strategic Value**

### **Platform Scalability Foundation**
Andrew's work establishes:
- **Microservices architecture patterns** for future expansion
- **Content delivery infrastructure** supporting business growth
- **Analytics foundation** for data-driven product decisions
- **API standards** enabling third-party integrations

### **Competitive Advantage**
The Resource Library Service provides:
- **Differentiated user experience** through personalization
- **Professional content management** competing with larger platforms
- **Scalable infrastructure** supporting rapid business growth
- **Data insights** for continuous product improvement

---

**This is not just a student project—Andrew is building a critical business component that directly enables LUNARA's mission of supporting postpartum mothers through accessible, personalized content delivery.**

---

\newpage

# RESOURCE LIBRARY SERVICE USE CASES

## FUNCTIONAL REQUIREMENTS USE CASES

### FR-RL1: Core Resource Management System Use Cases

#### Use Case RL1.1: Create New Resource Content
**Actor:** Content Administrator (Doula/Admin)  

**Preconditions:** User is authenticated with admin/doula role and has content creation permissions  

**Main Flow:**

1. User navigates to resource creation interface  

2. System displays resource creation form with required fields  

3. User selects resource category from predefined list (nutrition, body-care, infant-care, mental-health, relationships, printables)  

4. User enters resource title (max 200 characters)  

5. User provides comprehensive description (max 1000 characters)  

6. User creates main content using rich text editor  

7. User adds relevant tags for searchability  

8. User specifies target postpartum weeks (1-52)  

9. User sets difficulty level (beginner, intermediate, advanced)  

10. User uploads primary resource file (PDF, image, video)  

11. User uploads thumbnail image for resource preview  

12. System validates all required fields and file formats  

13. System saves resource with draft status  

14. User submits resource for review/publication  

15. System updates resource status and notifies reviewers  

**Postconditions:** Resource is created in system with appropriate status and metadata  

**Alternative Flows:**
- 3a. User creates custom category - system flags for admin approval  
- 10a. User uploads multiple files - system organizes as resource bundle  
- 14a. User saves as draft - resource remains unpublished for future editing  

**Exception Flows:**
- 5a. Description exceeds limit - system shows character count and error  
- 10a. File size exceeds 10MB - system shows error and compression options  
- 12a. Unsupported file format - system lists acceptable formats  

**Success Criteria:**
- Resource creation completed in <3 minutes  
- All required metadata captured  
- File upload success rate >95%  
- Form validation prevents invalid submissions  

#### Use Case RL1.2: Search and Filter Resources
**Actor:** Client (New Parent)  

**Preconditions:** User is authenticated and has completed intake form  

**Main Flow:**

1. User navigates to resource library  

2. System displays personalized resource recommendations based on user profile  

3. User enters search query in search bar  

4. System performs full-text search across titles, descriptions, tags, and content  

5. User applies category filter from dropdown menu  

6. User applies difficulty level filter  

7. User applies target week range filter based on their postpartum phase  

8. System returns filtered results with relevance ranking  

9. Results display as cards with thumbnail, title, description preview  

10. User previews resource by clicking card  

11. System shows detailed view with full metadata and content preview  

12. User downloads resource or adds to favorites  

**Postconditions:** User finds relevant resources for their needs  

**Alternative Flows:**
- 3a. User uses advanced search with boolean operators  
- 8a. No results found - system suggests similar or related resources  
- 12a. User shares resource with their assigned doula  

**Success Criteria:**
- Search results returned in <200ms  
- Relevance scoring accuracy >70%  
- User finds desired content within 3 search attempts  

#### Use Case RL1.3: Version Control and Content Updates
**Actor:** Content Administrator  

**Preconditions:** Resource exists in system and user has edit permissions  

**Main Flow:**

1. User selects existing resource for editing  

2. System creates automatic version snapshot before changes  

3. System displays current resource in edit mode  

4. User modifies content, metadata, or files  

5. System tracks all changes with timestamps  

6. User adds version notes explaining changes  

7. User submits updated version  

8. System validates changes and creates new version  

9. System maintains previous versions for rollback capability  

10. System updates publication status if needed  

11. System notifies subscribers of content updates  

**Postconditions:** Resource is updated with complete version history maintained  

**Alternative Flows:**
- 4a. User reverts to previous version - system restores selected version  
- 7a. User schedules update for future publication  

**Success Criteria:**
- Complete change history maintained  
- Version rollback capability  
- Update notifications delivered to relevant users  

---

## FUNCTIONAL REQUIREMENTS BREAKDOWN

### **FR-RL1: Core Resource Management System**
**Priority:** High  
**Complexity:** Medium  

**Detailed Acceptance Criteria:**

1. **Resource Creation & Management:**
   - Complete CRUD operations for all resource types (documents, videos, articles, printables)
   - Support for 6 predefined categories: nutrition, body-care, infant-care, mental-health, relationships, printables
   - Rich text editor with formatting, links, and media embedding capabilities
   - Metadata management including title (max 200 chars), description (max 1000 chars), tags, target weeks, difficulty level
   - Author attribution and creation/modification timestamps
   - Draft, review, published, and archived status workflow

2. **File Management:**
   - Cloud-based file storage integration with Cloudinary
   - Support for multiple file formats: PDF, DOCX, MP4, MOV, JPG, PNG, GIF
   - File size limits: 10MB for documents, 50MB for videos, 5MB for images
   - Automatic thumbnail generation for video content
   - Image optimization and responsive delivery
   - Secure file deletion and cleanup processes

3. **Search & Discovery:**
   - Full-text search across titles, descriptions, tags, and content
   - Multi-criteria filtering by category, difficulty, target weeks, tags
   - Search result ranking based on relevance and user profile
   - Search query execution time <200ms for databases with 1000+ resources
   - Auto-complete suggestions for search terms
   - Recently viewed and recommended resources tracking

4. **Version Control:**
   - Complete version history for all resource changes
   - Side-by-side version comparison interface
   - One-click rollback to any previous version
   - Change tracking with user attribution and timestamps
   - Version notes and change descriptions
   - Automated backup before any modifications

5. **Content Workflow:**
   - Draft → Review → Published → Archived status progression
   - Role-based permissions for creation, editing, and publishing
   - Approval workflow with reviewer assignment
   - Scheduled publishing capability
   - Content expiration and archival automation
   - Bulk operations for content management

**Technical Implementation Requirements:**

1. **Backend Architecture:**
   ```javascript
   // Required Resource Schema (MongoDB)
   const ResourceSchema = new mongoose.Schema({
     title: {
       type: String,
       required: true,
       maxlength: 200,
       index: 'text'
     },
     description: {
       type: String,
       required: true,
       maxlength: 1000,
       index: 'text'
     },
     content: {
       type: String,
       required: true,
       index: 'text'
     },
     category: {
       type: String,
       required: true,
       enum: ['nutrition', 'body-care', 'infant-care', 'mental-health', 'relationships', 'printables'],
       index: true
     },
     tags: [{
       type: String,
       index: true
     }],
     targetWeeks: [{
       type: Number,
       min: 1,
       max: 52,
       index: true
     }],
     difficulty: {
       type: String,
       enum: ['beginner', 'intermediate', 'advanced'],
       default: 'beginner',
       index: true
     },
     files: [{
       url: String,
       publicId: String,
       filename: String,
       size: Number,
       format: String,
       uploadedAt: Date
     }],
     thumbnailUrl: String,
     thumbnailPublicId: String,
     author: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
       required: true
     },
     status: {
       type: String,
       enum: ['draft', 'review', 'published', 'archived'],
       default: 'draft',
       index: true
     },
     publishDate: Date,
     expirationDate: Date,
     versions: [{
       versionNumber: Number,
       content: String,
       metadata: Object,
       createdAt: Date,
       createdBy: mongoose.Schema.Types.ObjectId,
       changeNotes: String
     }],
     analytics: {
       views: { type: Number, default: 0 },
       downloads: { type: Number, default: 0 },
       favorites: { type: Number, default: 0 },
       shares: { type: Number, default: 0 }
     },
     seoMetadata: {
       metaTitle: String,
       metaDescription: String,
       keywords: [String],
       slug: { type: String, unique: true }
     }
   }, {
     timestamps: true,
     collection: 'resources'
   });

   // Required indexes
   ResourceSchema.index({ 
     title: 'text', 
     description: 'text', 
     content: 'text', 
     tags: 'text' 
   });
   ResourceSchema.index({ category: 1, status: 1 });
   ResourceSchema.index({ targetWeeks: 1, difficulty: 1 });
   ResourceSchema.index({ createdAt: -1 });
   ResourceSchema.index({ 'analytics.views': -1 });
   ```

2. **API Endpoints Specification:**
   ```javascript
   // POST /api/resources - Create new resource
   // Request Body:
   {
     "title": "Postpartum Nutrition Guide",
     "description": "Comprehensive guide to nutrition during postpartum recovery",
     "content": "<h1>Nutrition Guidelines</h1><p>Content...</p>",
     "category": "nutrition",
     "tags": ["nutrition", "recovery", "meal-planning"],
     "targetWeeks": [1, 2, 3, 4, 5, 6],
     "difficulty": "beginner",
     "files": ["file_upload_id_1", "file_upload_id_2"],
     "thumbnailFile": "thumbnail_upload_id",
     "status": "draft",
     "seoMetadata": {
       "metaTitle": "Postpartum Nutrition Guide - LUNARA",
       "metaDescription": "Essential nutrition guide for new mothers",
       "keywords": ["postpartum", "nutrition", "recovery"]
     }
   }
   
   // Response:
   {
     "success": true,
     "data": {
       "_id": "resource_id",
       "title": "Postpartum Nutrition Guide",
       "slug": "postpartum-nutrition-guide",
       "status": "draft",
       "createdAt": "2025-09-20T10:00:00Z",
       "author": {
         "_id": "user_id",
         "name": "Dr. Sarah Johnson"
       }
     },
     "message": "Resource created successfully"
   }

   // GET /api/resources - List resources with filtering
   // Query Parameters:
   ?category=nutrition&difficulty=beginner&targetWeeks=1,2,3&tags=recovery&search=nutrition&page=1&limit=20&sortBy=createdAt&sortOrder=desc&status=published

   // Response:
   {
     "success": true,
     "data": {
       "resources": [...],
       "pagination": {
         "currentPage": 1,
         "totalPages": 5,
         "totalItems": 98,
         "itemsPerPage": 20,
         "hasNextPage": true,
         "hasPrevPage": false
       },
       "filters": {
         "appliedFilters": {...},
         "availableFilters": {...}
       }
     }
   }

   // PUT /api/resources/:id - Update resource
   // PATCH /api/resources/:id/status - Update status only
   // DELETE /api/resources/:id - Delete resource
   // GET /api/resources/:id/versions - Get version history
   // POST /api/resources/:id/versions/:versionId/restore - Restore version
   ```

3. **File Upload Implementation:**
   ```javascript
   // Required Cloudinary configuration
   const cloudinary = require('cloudinary').v2;
   const multer = require('multer');
   const { CloudinaryStorage } = require('multer-storage-cloudinary');

   cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET
   });

   const storage = new CloudinaryStorage({
     cloudinary: cloudinary,
     params: {
       folder: 'lunara-resources',
       allowed_formats: ['jpg', 'png', 'gif', 'pdf', 'docx', 'mp4', 'mov'],
       resource_type: 'auto',
       transformation: [
         { width: 1200, height: 800, crop: 'limit', quality: 'auto' }
       ]
     }
   });

   const upload = multer({
     storage: storage,
     limits: {
       fileSize: 50 * 1024 * 1024 // 50MB
     },
     fileFilter: (req, file, cb) => {
       const allowedTypes = [
         'image/jpeg', 'image/png', 'image/gif',
         'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
         'video/mp4', 'video/quicktime'
       ];
       
       if (allowedTypes.includes(file.mimetype)) {
         cb(null, true);
       } else {
         cb(new Error('Unsupported file type'), false);
       }
     }
   });
   ```

4. **Search Implementation:**
   ```javascript
   // Advanced search with MongoDB aggregation
   const searchResources = async (query, filters, pagination, userProfile) => {
     const pipeline = [
       // Text search stage
       ...(query ? [{
         $match: {
           $text: { $search: query },
           status: 'published'
         }
       }] : [{
         $match: { status: 'published' }
       }]),

       // Filter stage
       ...(Object.keys(filters).length > 0 ? [{
         $match: buildFilterConditions(filters)
       }] : []),

       // Personalization scoring
       {
         $addFields: {
           relevanceScore: {
             $add: [
               { $cond: [{ $eq: ['$category', userProfile.preferredCategories] }, 2, 0] },
               { $cond: [{ $in: [userProfile.postpartumWeek, '$targetWeeks'] }, 1.5, 0] },
               { $cond: [{ $eq: ['$difficulty', userProfile.experienceLevel] }, 1, 0] },
               ...(query ? [{ $meta: 'textScore' }] : [0])
             ]
           }
         }
       },

       // Sorting
       { $sort: { relevanceScore: -1, createdAt: -1 } },

       // Pagination
       { $skip: (pagination.page - 1) * pagination.limit },
       { $limit: pagination.limit },

       // Population
       {
         $lookup: {
           from: 'users',
           localField: 'author',
           foreignField: '_id',
           as: 'author',
           pipeline: [{ $project: { name: 1, credentials: 1 } }]
         }
       }
     ];

     const results = await Resource.aggregate(pipeline);
     const total = await Resource.countDocuments(buildSearchConditions(query, filters));

     return {
       resources: results,
       total,
       pages: Math.ceil(total / pagination.limit)
     };
   };
   ```

**Performance Requirements:**
- Search queries must execute in <200ms for databases with 1000+ resources
- File uploads must complete in <30 seconds for files up to 50MB
- Resource creation interface must load in <2 seconds
- Bulk operations must handle 100+ resources without timeout
- Version history must be accessible within 1 second

**Security Requirements:**
- All file uploads must be scanned for malware
- Access control based on user roles and resource status
- Input validation and sanitization for all user content
- Secure file deletion to prevent data recovery
- Audit logging for all content modifications

---

### **FR-RL1.5: Dual Content Hosting & Document Management System**
**Priority:** High  
**Complexity:** Medium  

**CRITICAL CLARIFICATION:** The Resource Library Service handles **two distinct content workflows** on the same platform:

#### **Content Type Separation:**

**1. Provider Content (Public/Educational):**
- **Who Creates:** Doulas, care providers, platform administrators
- **Content Types:** Blog posts, educational articles, care plan templates, video guides, downloadable resources
- **Visibility:** Public to all clients (or selectively published)
- **Purpose:** Educational content, professional guidance, platform resources
- **Workflow:** Draft → Review → Publish → Public Access

**2. Client Content (Private/Personal):**
- **Who Creates:** Clients (postpartum mothers)  
- **Content Types:** Emotional wellness surveys, health assessments, personal photos, progress forms, intake questionnaires
- **Visibility:** Private to client + assigned provider only
- **Purpose:** Personal tracking, provider communication, care coordination
- **Workflow:** Upload → Submit to Provider → Review → Feedback

#### **Detailed Technical Architecture:**

**Database Schema for Dual Content System:**
```javascript
// Provider Content Collection (Public Educational Content)
const ProviderContentSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 200 },
  content: { type: String, required: true },
  contentType: {
    type: String,
    enum: ['blog-post', 'educational-resource', 'care-plan-template', 'video-guide', 'downloadable-pdf'],
    required: true
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  publishStatus: {
    type: String,
    enum: ['draft', 'pending-review', 'published', 'archived'],
    default: 'draft'
  },
  targetAudience: {
    postpartumWeeks: [{ type: Number, min: 1, max: 52 }],
    clientCategories: [String] // 'first-time-mothers', 'multiple-births', etc.
  },
  isPublic: { type: Boolean, default: true },
  seoOptimized: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  }
}, { timestamps: true });

// Client Document Collection (Private Personal Content)  
const ClientDocumentSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 200 },
  documentType: {
    type: String,
    enum: ['emotional-survey', 'health-assessment', 'progress-photo', 'personal-form', 'intake-questionnaire', 'journal-entry'],
    required: true
  },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Client
  assignedProvider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Provider who can access
  files: [{
    cloudinaryUrl: String,
    originalFileName: String,
    fileType: String,
    fileSize: Number,
    uploadDate: { type: Date, default: Date.now }
  }],
  submissionStatus: {
    type: String,
    enum: ['draft', 'submitted-to-provider', 'reviewed-by-provider', 'completed'],
    default: 'draft'
  },
  submissionData: {
    submittedDate: Date,
    reviewedDate: Date,
    providerNotes: String,
    providerFeedback: String
  },
  formData: {
    // Store survey responses, assessment scores, etc.
    type: mongoose.Schema.Types.Mixed
  },
  privacyLevel: {
    type: String,
    enum: ['client-only', 'client-and-provider', 'care-team'],
    default: 'client-and-provider'
  },
  dueDate: Date, // For surveys/assessments with deadlines
  reminderSettings: {
    enabled: Boolean,
    frequency: String // 'daily', 'weekly', 'custom'
  }
}, { timestamps: true });

// Document Sharing & Permissions
const DocumentAccessSchema = new mongoose.Schema({
  document: { type: mongoose.Schema.Types.ObjectId, required: true },
  documentType: { type: String, enum: ['provider-content', 'client-document'], required: true },
  accessGrantedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accessGrantedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  permissions: {
    canView: { type: Boolean, default: true },
    canEdit: { type: Boolean, default: false },
    canDownload: { type: Boolean, default: true },
    canComment: { type: Boolean, default: true }
  },
  accessExpiration: Date,
  lastAccessed: Date,
  accessCount: { type: Number, default: 0 }
}, { timestamps: true });
```

#### **API Endpoints for Dual Content System:**

**Provider Content APIs (Blog & Educational Content):**
```javascript
// POST /api/provider-content - Create blog post or educational resource
// GET /api/provider-content - List public content (available to all clients)
// PUT /api/provider-content/:id - Update content (providers only)
// DELETE /api/provider-content/:id - Archive content
// POST /api/provider-content/:id/publish - Publish draft content
```

**Client Document APIs (Personal Document Management):**
```javascript
// POST /api/client-documents - Upload personal document
// GET /api/client-documents - List own documents (clients) or assigned documents (providers)
// PUT /api/client-documents/:id - Update document or add provider notes
// POST /api/client-documents/:id/submit - Submit document to assigned provider
// GET /api/client-documents/:id/share/:providerId - Share document with specific provider
```

#### **Workflow Integration with Main LUNARA Platform:**

**Provider Workflow (Content Creation):**
1. Provider logs into LUNARA platform using existing authentication
2. Accesses "Content Management" section in provider dashboard  
3. Creates blog post or educational resource using rich text editor
4. Sets target audience (postpartum weeks, client categories)
5. Submits for review (if required) or publishes directly
6. Content becomes available to relevant clients automatically

**Client Workflow (Document Submission):**
1. Client logs into LUNARA platform using existing authentication
2. Accesses "My Documents" or "Assessments" section in client dashboard
3. Uploads personal documents or completes digital forms/surveys
4. Submits documents to assigned provider with optional message
5. Provider receives notification through existing messaging system
6. Provider reviews, provides feedback, and updates care plan accordingly

#### **Integration with Existing LUNARA Infrastructure:**

**Authentication & Authorization:**
- Uses existing Passport.js JWT authentication from main platform
- Role-based access control using existing User model roles ('client', 'provider')
- Provider-client assignment relationships from existing Client/Provider models

**File Storage:**
- Integrates with existing Cloudinary setup in main platform
- Separate storage folders for public content vs. private documents
- Automatic image optimization and responsive delivery for both content types

**Notification System:**
- Uses existing email service (Nodemailer) for document submission notifications
- Integrates with existing Socket.io for real-time updates
- Provider dashboard notifications when clients submit documents

**Database Integration:**
- Uses existing MongoDB connection and patterns
- Follows existing schema validation and error handling patterns
- Integrates with existing User, Client, Provider relationship models

---

### **FR-RL2: Personalization Engine**
**Priority:** High  
**Complexity:** Medium-High  

#### Use Case RL2.1: Generate Personalized Recommendations
**Actor:** System (Background Process)  

**Preconditions:** User has completed intake form and has interaction history  

**Main Flow:**

1. System retrieves user profile data from main LUNARA platform  

2. System analyzes user's postpartum week, birth experience, feeding method  

3. System calculates user's preference scores based on historical interactions  

4. System applies recommendation algorithm with weighted scoring:
   - Category match (30% weight)
   - Difficulty appropriateness (20% weight)  
   - Week relevance (25% weight)
   - Popularity score (15% weight)
   - User rating history (10% weight)

5. System filters resources by publication status and availability  

6. System ranks results by combined relevance score  

7. System selects top 20 recommendations for user dashboard  

8. System caches results with 24-hour expiration  

9. System logs recommendation generation for analytics  

**Postconditions:** User receives personalized resource recommendations  

**Alternative Flows:**
- 3a. New user with no history - system uses intake form data only  
- 6a. Insufficient published content - system includes popular default resources  

**Success Criteria:**
- Recommendation accuracy >70% (user engagement metrics)  
- Algorithm execution time <500ms  
- Recommendations update daily or on significant profile changes  

#### Use Case RL2.2: Track User Interactions
**Actor:** User (Client)  

**Preconditions:** User is authenticated and viewing resources  

**Main Flow:**

1. User performs action on resource (view, download, favorite, share)  

2. System captures interaction event with metadata:
   - User ID and resource ID
   - Action type and timestamp
   - Session duration and device info
   - Context (search, recommendation, browse)

3. System validates interaction data for completeness  

4. System stores interaction in analytics database  

5. System updates user preference profile asynchronously  

6. System increments resource popularity counters  

7. System triggers real-time recommendation recalculation if threshold met  

**Postconditions:** User interaction is recorded and system learns preferences  

**Alternative Flows:**
- 7a. Batch processing - system updates recommendations during off-peak hours  

**Success Criteria:**
- 100% interaction capture rate for authenticated users  
- Real-time updates processed within 1 second  
- Privacy compliance with data retention policies  

**Detailed Acceptance Criteria:**

1. **User Profile Integration:**
   - Real-time synchronization with main LUNARA platform user data
   - Support for user attributes: postpartum week, birth experience, feeding method, support level
   - Preference learning from user interactions (implicit feedback)
   - Explicit preference collection through settings interface
   - Profile versioning for recommendation algorithm improvements
   - Privacy controls for data sharing and personalization opt-out

2. **Recommendation Algorithm:**
   ```javascript
   // Recommendation scoring algorithm
   const calculateRecommendationScore = (resource, userProfile, interactions) => {
     const weights = {
       categoryMatch: 0.30,
       difficultyMatch: 0.20,
       weekRelevance: 0.25,
       popularityScore: 0.15,
       userRating: 0.10
     };

     let score = 0;

     // Category matching
     if (userProfile.preferredCategories.includes(resource.category)) {
       score += weights.categoryMatch;
     }

     // Difficulty appropriateness
     const difficultyMap = { beginner: 1, intermediate: 2, advanced: 3 };
     const userLevel = difficultyMap[userProfile.experienceLevel] || 1;
     const resourceLevel = difficultyMap[resource.difficulty] || 1;
     
     if (Math.abs(userLevel - resourceLevel) <= 1) {
       score += weights.difficultyMatch;
     }

     // Week relevance
     if (resource.targetWeeks.includes(userProfile.postpartumWeek)) {
       score += weights.weekRelevance;
     } else {
       const weekDistance = Math.min(
         ...resource.targetWeeks.map(week => 
           Math.abs(week - userProfile.postpartumWeek)
         )
       );
       score += weights.weekRelevance * Math.max(0, 1 - weekDistance / 10);
     }

     // Popularity scoring
     const popularityNormalized = Math.min(resource.analytics.views / 1000, 1);
     score += weights.popularityScore * popularityNormalized;

     // User rating influence
     const userRatedResources = interactions
       .filter(i => i.action === 'rate' && i.resourceId !== resource._id)
       .map(i => i.rating);
     
     if (userRatedResources.length > 0) {
       const avgUserRating = userRatedResources.reduce((a, b) => a + b) / userRatedResources.length;
       const ratingDiff = Math.abs(avgUserRating - (resource.averageRating || 3));
       score += weights.userRating * Math.max(0, 1 - ratingDiff / 2);
     }

     return Math.min(score, 1); // Normalize to 0-1 range
   };
   ```

3. **A/B Testing Framework:**
   ```javascript
   // A/B testing for recommendation algorithms
   const ABTestingFramework = {
     experiments: new Map(),
     
     createExperiment: (name, variants, trafficSplit) => {
       const experiment = {
         name,
         variants, // Array of algorithm functions
         trafficSplit, // [0.5, 0.5] for 50/50 split
         startDate: new Date(),
         metrics: new Map()
       };
       
       ABTestingFramework.experiments.set(name, experiment);
       return experiment;
     },
     
     assignUserToVariant: (userId, experimentName) => {
       const experiment = ABTestingFramework.experiments.get(experimentName);
       if (!experiment) return null;
       
       const hash = hashCode(userId + experimentName);
       const bucket = Math.abs(hash) % 100;
       
       let cumulative = 0;
       for (let i = 0; i < experiment.trafficSplit.length; i++) {
         cumulative += experiment.trafficSplit[i] * 100;
         if (bucket < cumulative) {
           return {
             variant: i,
             algorithm: experiment.variants[i]
           };
         }
       }
       
       return { variant: 0, algorithm: experiment.variants[0] };
     },
     
     trackMetric: (experimentName, variant, metric, value) => {
       const experiment = ABTestingFramework.experiments.get(experimentName);
       if (!experiment.metrics.has(variant)) {
         experiment.metrics.set(variant, new Map());
       }
       
       const variantMetrics = experiment.metrics.get(variant);
       if (!variantMetrics.has(metric)) {
         variantMetrics.set(metric, []);
       }
       
       variantMetrics.get(metric).push({
         value,
         timestamp: new Date()
       });
     }
   };
   ```

4. **User Interaction Tracking:**
   ```javascript
   // User interaction schema
   const UserInteractionSchema = new mongoose.Schema({
     userId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
       required: true,
       index: true
     },
     resourceId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Resource',
       required: true,
       index: true
     },
     action: {
       type: String,
       enum: ['view', 'download', 'favorite', 'unfavorite', 'share', 'rate', 'comment'],
       required: true,
       index: true
     },
     metadata: {
       duration: Number, // seconds spent viewing
       device: String,
       browser: String,
       referrer: String,
       searchQuery: String,
       context: String, // 'search', 'recommendation', 'browse', 'shared'
       rating: { type: Number, min: 1, max: 5 }, // for rating actions
       comment: String // for comment actions
     },
     sessionId: {
       type: String,
       index: true
     },
     ipAddress: String,
     userAgent: String
   }, {
     timestamps: true,
     collection: 'user_interactions'
   });

   // Indexes for performance
   UserInteractionSchema.index({ userId: 1, createdAt: -1 });
   UserInteractionSchema.index({ resourceId: 1, action: 1 });
   UserInteractionSchema.index({ createdAt: -1 });
   ```

5. **Personalized Content Feeds:**
   ```javascript
   // API endpoint for personalized feed
   app.get('/api/users/:userId/feed', async (req, res) => {
     try {
       const { userId } = req.params;
       const { page = 1, limit = 20, type = 'all' } = req.query;
       
       // Get user profile and preferences
       const userProfile = await getUserProfile(userId);
       const interactions = await getUserInteractions(userId, { limit: 100 });
       
       // A/B testing assignment
       const experiment = ABTestingFramework.assignUserToVariant(userId, 'recommendation_algorithm_v2');
       
       // Generate recommendations
       const recommendations = await experiment.algorithm(userProfile, interactions, {
         page: parseInt(page),
         limit: parseInt(limit),
         type
       });
       
       // Track A/B test metrics
       ABTestingFramework.trackMetric('recommendation_algorithm_v2', experiment.variant, 'recommendations_served', recommendations.length);
       
       res.json({
         success: true,
         data: {
           recommendations,
           pagination: {
             page: parseInt(page),
             limit: parseInt(limit),
             total: recommendations.total
           },
           metadata: {
             algorithm: experiment.variant,
             generatedAt: new Date()
           }
         }
       });
     } catch (error) {
       res.status(500).json({ success: false, error: error.message });
     }
   });
   ```

**Performance Requirements:**
- Recommendation generation must complete in <500ms
- User interaction tracking must process in <100ms
- Real-time preference updates for active users
- Batch processing for recommendation updates during off-peak hours
- Cache frequently accessed user profiles with 1-hour TTL

**Privacy & Security Requirements:**
- User consent required for interaction tracking
- Data anonymization for analytics aggregation
- GDPR compliance for data retention and deletion
- Secure storage of user preference data
- Opt-out capability for personalization features

---

### **FR-RL3: Content Delivery Platform**
**Priority:** High  
**Complexity:** Medium  

#### Use Case RL3.1: Browse Resource Library Interface
**Actor:** Client (New Parent)  

**Preconditions:** User is authenticated and has access to resource library  

**Main Flow:**

1. User navigates to resource library from dashboard  

2. System loads responsive interface optimized for user's device  

3. System displays personalized resource recommendations at top  

4. User views resource cards with thumbnails, titles, and descriptions  

5. User applies category filters from sidebar navigation  

6. User sorts resources by relevance, date, popularity, or rating  

7. User clicks resource card to open detailed preview  

8. System displays full resource metadata and content preview  

9. User chooses to view full content, download, or add to favorites  

10. System tracks user interaction for analytics and recommendations  

**Postconditions:** User can browse and access relevant resources efficiently  

**Alternative Flows:**
- 3a. New user - system shows popular resources and onboarding tips  
- 5a. Mobile user - filters collapse into accordion menu  
- 9a. User shares resource - system generates shareable link  

**Success Criteria:**
- Interface loads in <2 seconds on 3G connection  
- All features accessible on mobile devices (screen width ≥320px)  
- Touch targets minimum 44x44px for mobile usability  
- Keyboard navigation support for accessibility compliance  

#### Use Case RL3.2: Download and Offline Access
**Actor:** Client  

**Preconditions:** User has selected resource for offline access  

**Main Flow:**

1. User clicks download button on resource  

2. System checks user's download permissions and quotas  

3. System generates secure download link with expiration  

4. Browser initiates download of resource file  

5. System logs download event for analytics  

6. Downloaded file includes metadata and attribution  

7. User can access file offline on their device  

8. System updates user's download history  

**Postconditions:** User has offline access to resource content  

**Alternative Flows:**
- 2a. Quota exceeded - system shows upgrade options or wait time  
- 4a. Large file - system shows progress indicator  
- 6a. PDF resource - system adds watermark with user info  

**Exception Flows:**
- 3a. Link generation fails - system retries and notifies user  
- 4a. Download interrupted - system provides resume capability  

**Success Criteria:**
- Download initiation time <1 second  
- File integrity verification 100% success rate  
- Offline content accessible without internet connection  
- Download history accurately maintained  

#### Use Case RL3.3: User Favorites and Collections Management
**Actor:** Client  

**Preconditions:** User is authenticated  

**Main Flow:**

1. User clicks favorite button on resource  

2. System adds resource to user's favorites collection  

3. System displays confirmation and updates UI state  

4. User navigates to favorites page  

5. System displays organized view of favorited resources  

6. User creates custom collection for organizing favorites  

7. User drags resources into custom collections  

8. System saves collection organization with timestamps  

9. User shares collection with doula or other users  

**Postconditions:** User has organized collections of preferred resources  

**Alternative Flows:**
- 6a. Collection limit reached - system prompts for upgrade or cleanup  
- 9a. Private collection - system respects privacy settings  

**Success Criteria:**
- Favorite action completes in <200ms  
- Collections sync across user's devices  
- Drag-and-drop functionality works on touch devices  
- Collection sharing maintains proper access controls  

**Detailed Acceptance Criteria:**

1. **Responsive Web Interface:**
   ```javascript
   // Required responsive breakpoints
   const breakpoints = {
     mobile: '320px',    // Minimum mobile support
     tablet: '768px',    // Tablet landscape
     desktop: '1024px',  // Desktop minimum
     large: '1440px'     // Large desktop
   };

   // CSS Grid layout system
   .resource-grid {
     display: grid;
     gap: 1rem;
     grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
   }

   @media (max-width: 768px) {
     .resource-grid {
       grid-template-columns: 1fr;
       gap: 0.5rem;
     }
   }
   ```

2. **Progressive Web App Implementation:**
   ```javascript
   // Service Worker for offline caching
   const CACHE_NAME = 'lunara-resources-v1';
   const urlsToCache = [
     '/',
     '/static/css/main.css',
     '/static/js/main.js',
     '/manifest.json',
     '/offline.html'
   ];

   self.addEventListener('install', (event) => {
     event.waitUntil(
       caches.open(CACHE_NAME)
         .then((cache) => cache.addAll(urlsToCache))
     );
   });

   self.addEventListener('fetch', (event) => {
     event.respondWith(
       caches.match(event.request)
         .then((response) => {
           if (response) {
             return response;
           }
           return fetch(event.request);
         })
     );
   });

   // PWA Manifest
   {
     "name": "LUNARA Resource Library",
     "short_name": "LUNARA",
     "description": "Postpartum resource library and support",
     "start_url": "/",
     "display": "standalone",
     "background_color": "#ffffff",
     "theme_color": "#4B0082",
     "icons": [
       {
         "src": "/icons/icon-192x192.png",
         "sizes": "192x192",
         "type": "image/png"
       },
       {
         "src": "/icons/icon-512x512.png",
         "sizes": "512x512",
         "type": "image/png"
       }
     ]
   }
   ```

3. **Content Rating and Feedback System:**
   ```javascript
   // Rating schema
   const ResourceRatingSchema = new mongoose.Schema({
     resourceId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Resource',
       required: true,
       index: true
     },
     userId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
       required: true,
       index: true
     },
     rating: {
       type: Number,
       required: true,
       min: 1,
       max: 5
     },
     review: {
       type: String,
       maxlength: 1000
     },
     helpful: {
       type: Number,
       default: 0
     },
     reported: {
       type: Boolean,
       default: false
     },
     moderationStatus: {
       type: String,
       enum: ['pending', 'approved', 'rejected'],
       default: 'pending'
     }
   }, {
     timestamps: true
   });

   // Compound index to prevent duplicate ratings
   ResourceRatingSchema.index({ resourceId: 1, userId: 1 }, { unique: true });
   ```

4. **Download Management System:**
   ```javascript
   // Download tracking and quota management
   const DownloadSchema = new mongoose.Schema({
     userId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
       required: true,
       index: true
     },
     resourceId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Resource',
       required: true,
       index: true
     },
     downloadUrl: {
       type: String,
       required: true
     },
     expiresAt: {
       type: Date,
       required: true,
       index: { expireAfterSeconds: 0 }
     },
     fileSize: {
       type: Number,
       required: true
     },
     downloadCompleted: {
       type: Boolean,
       default: false
     },
     ipAddress: String,
     userAgent: String
   }, {
     timestamps: true
   });

   // Generate secure download link
   const generateDownloadLink = async (userId, resourceId) => {
     const user = await User.findById(userId);
     const resource = await Resource.findById(resourceId);
     
     // Check quotas
     const monthlyDownloads = await Download.countDocuments({
       userId,
       createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
     });
     
     if (monthlyDownloads >= user.downloadQuota) {
       throw new Error('Download quota exceeded');
     }
     
     // Generate secure token
     const token = jwt.sign({
       userId,
       resourceId,
       exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour expiry
     }, process.env.DOWNLOAD_SECRET);
     
     const downloadUrl = `${process.env.API_URL}/api/downloads/${token}`;
     
     // Save download record
     await Download.create({
       userId,
       resourceId,
       downloadUrl,
       expiresAt: new Date(Date.now() + 60 * 60 * 1000),
       fileSize: resource.fileSize
     });
     
     return downloadUrl;
   };
   ```

5. **User Collections System:**
   ```javascript
   // Collections schema
   const CollectionSchema = new mongoose.Schema({
     userId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
       required: true,
       index: true
     },
     name: {
       type: String,
       required: true,
       maxlength: 100
     },
     description: {
       type: String,
       maxlength: 500
     },
     resources: [{
       resourceId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Resource',
         required: true
       },
       addedAt: {
         type: Date,
         default: Date.now
       },
       notes: {
         type: String,
         maxlength: 200
       }
     }],
     isPublic: {
       type: Boolean,
       default: false
     },
     sharedWith: [{
       userId: mongoose.Schema.Types.ObjectId,
       permission: {
         type: String,
         enum: ['view', 'edit'],
         default: 'view'
       },
       sharedAt: Date
     }],
     tags: [String],
     color: {
       type: String,
       default: '#4B0082'
     }
   }, {
     timestamps: true
   });

   // API endpoints for collections
   app.post('/api/collections', async (req, res) => {
     const { name, description, isPublic, color } = req.body;
     const userId = req.user.id;
     
     const collection = await Collection.create({
       userId,
       name,
       description,
       isPublic,
       color
     });
     
     res.json({ success: true, data: collection });
   });

   app.post('/api/collections/:id/resources', async (req, res) => {
     const { id } = req.params;
     const { resourceId, notes } = req.body;
     const userId = req.user.id;
     
     const collection = await Collection.findOne({ _id: id, userId });
     if (!collection) {
       return res.status(404).json({ error: 'Collection not found' });
     }
     
     collection.resources.push({
       resourceId,
       notes,
       addedAt: new Date()
     });
     
     await collection.save();
     res.json({ success: true, data: collection });
   });
   ```

**Performance Requirements:**
- Page load time <2 seconds on 3G connection  
- Resource card rendering <100ms for 50 items  
- Download link generation <500ms  
- Offline content access instantaneous  
- Collection operations <200ms  

**Accessibility Requirements:**
- WCAG 2.1 AA compliance  
- Screen reader compatible  
- Keyboard navigation support  
- High contrast mode support  
- Touch targets minimum 44x44px  
- Alternative text for all images  

**Mobile Optimization:**
- Responsive design for screens ≥320px width  
- Touch-optimized interface elements  
- Swipe gestures for navigation  
- Optimized images for mobile bandwidth  
- Progressive loading for large content  

**Security Requirements:**
- Secure download links with expiration  
- User quota enforcement  
- Content access control based on permissions  
- XSS protection for user-generated content  
- Rate limiting for download requests

---

### **FR-RL4: Content Creation & Publishing Platform**
**Priority:** Medium  
**Complexity:** Medium  

#### Use Case RL4.1: Create Content Using Rich Text Editor
**Actor:** Content Creator (Doula/Admin)  

**Preconditions:** User has content creation permissions and is authenticated  

**Main Flow:**

1. User navigates to content creation interface  
2. System displays WYSIWYG editor with formatting toolbar  
3. User selects content template from available options  
4. System loads template structure with editable sections  
5. User creates content using rich text editor features  
6. User adds metadata (title, description, tags, SEO fields)  
7. User configures target audience and difficulty settings  
8. System auto-saves content every 30 seconds  
9. User previews content in desktop and mobile views  
10. User saves as draft or submits for review  

**Postconditions:** Content is created and stored with appropriate status  

**Success Criteria:**
- Editor loads in <2 seconds  
- Auto-save functions without user intervention  
- Content renders consistently across devices  
- All formatting options work correctly  

**Detailed Acceptance Criteria:**
- Rich text editor with comprehensive formatting options
- Template system for different content types
- Content scheduling and publication workflow  
- SEO optimization tools with real-time analysis
- Content preview and review system with collaboration features
- Bulk content operations and management capabilities
- Content analytics and performance tracking dashboard

**Technical Implementation Requirements:**
- WYSIWYG editor integration (TinyMCE/Quill)
- Content workflow management system
- SEO metadata management and analysis
- Version control and collaboration tools
- Analytics integration for performance tracking

**Performance Requirements:**
- Rich text editor loads in <2 seconds  
- Auto-save completes in <500ms  
- Content publishing completes in <5 seconds  
- SEO analysis completes in <10 seconds  

**Security Requirements:**
- Role-based access control for content operations
- Content approval workflow prevents unauthorized publishing
- XSS protection for user-generated content
- Audit logging for all content modifications

---

### **FR-RL5: Care Plan Template System**
**Priority:** Medium  
**Complexity:** Medium  

#### Use Case RL5.1: Create Care Plan Template
**Actor:** Doula/Content Creator  

**Preconditions:** User has template creation permissions  

**Main Flow:**

1. User navigates to template builder interface  
2. System displays drag-and-drop template construction area  
3. User selects base template category (newborn, postpartum-recovery, breastfeeding, sleep, emotional-support)  
4. User adds template sections using component library  
5. User configures section properties and content  
6. User adds resource assignments to relevant sections  
7. User defines milestone checkpoints and criteria  
8. User sets up customization options for end users  
9. User tests template with sample data  
10. User saves template and sets sharing permissions  

**Postconditions:** Template is available for assignment to clients  

**Success Criteria:**
- Template creation completes in <10 minutes  
- All components render correctly in preview  
- Template can be successfully assigned to test user  
- Sharing permissions work as configured  

#### Use Case RL5.2: Assign Care Plan to Client
**Actor:** Doula  

**Preconditions:** Template exists and client profile is available  

**Main Flow:**

1. User selects client from client management interface  
2. System displays available care plan templates  
3. User selects appropriate template based on client needs  
4. System customizes template using client profile data  
5. User reviews and modifies template sections if needed  
6. User sets timeline and milestone dates  
7. User assigns care plan to client  
8. System notifies client of new care plan assignment  
9. Care plan becomes available in client dashboard  

**Postconditions:** Client has personalized care plan with tracking  

**Success Criteria:**
- Template assignment completes in <2 minutes  
- Client receives notification within 1 minute  
- Care plan displays correctly in client interface  
- Progress tracking functions properly  

**Detailed Acceptance Criteria:**

1. **Template Builder Interface:**
   - Visual drag-and-drop builder with component library
   - Pre-built templates for common scenarios
   - Customizable sections with rich content support
   - Resource integration with existing library
   - Milestone and checkpoint configuration
   - Preview functionality for template testing

2. **Care Plan Components:**
   - Resource assignments with scheduling
   - Checklist items with completion tracking
   - Milestone definitions with success criteria
   - Educational content integration
   - Progress visualization and reporting
   - Reminder and notification scheduling

3. **Template Management:**
   - Version control for template updates
   - Template sharing and collaboration
   - Usage analytics and effectiveness tracking
   - Template categorization and tagging
   - Import/export functionality
   - Template marketplace for sharing

4. **Client Integration:**
   - Seamless integration with main platform user data
   - Personalized template customization
   - Progress tracking and milestone achievement
   - Doula oversight and intervention capabilities
   - Communication tools for plan discussions
   - Reporting and analytics for outcomes

**Technical Implementation Requirements:**
- Component-based template architecture
- Real-time collaboration tools
- Progress tracking and analytics
- Integration APIs with main platform
- Mobile-responsive template interface
- Notification and reminder systems

**Performance Requirements:**
- Template builder loads in <3 seconds  
- Template assignment completes in <1 second  
- Progress updates process in real-time  
- Template rendering optimized for mobile devices  

**Integration Requirements:**
- Seamless data sync with main LUNARA platform
- User authentication and authorization integration
- Client profile and preference synchronization
- Appointment system integration for scheduling
- Notification system integration

**Security Requirements:**
- Role-based access control for template operations
- Client data privacy and access restrictions
- Secure template sharing and collaboration
- Audit logging for all template and plan activities
- Data encryption for sensitive care plan information

---

\newpage

# NON-FUNCTIONAL REQUIREMENTS

## System Quality Requirements

The Resource Library Service must meet the following non-functional requirements to ensure reliable, secure, and performant operation as a standalone microservice integrating with the main LUNARA platform.

### **NFR-RL1: Performance & Scalability**
**Priority:** High  

**Requirements:**
- API response times must not exceed 500ms for 95% of requests
- Database queries must execute in <200ms for datasets up to 10,000 resources
- Frontend page load times must not exceed 3 seconds on 3G connection
- System must support concurrent users up to 1,000 without performance degradation
- File upload processing must complete within 30 seconds for files up to 50MB

**Implementation Guidelines:**
- Database indexing for all frequently queried fields
- Connection pooling for database connections
- CDN integration for static asset delivery
- Caching strategy for frequently accessed data
- Horizontal scaling capability with load balancing

**Verification Methods:**
- Performance testing with Apache JMeter or K6
- Database query profiling and optimization
- Network performance monitoring
- Load testing with simulated concurrent users

### **NFR-RL2: Security & Privacy**
**Priority:** High  

**Requirements:**
- All data transmission must use HTTPS/TLS 1.3 encryption
- User authentication must integrate with main platform JWT system
- File uploads must include malware scanning and type validation
- Access control must enforce role-based permissions
- Personal data must be encrypted at rest using AES-256

**Implementation Guidelines:**
- JWT token validation middleware for all protected routes
- Input sanitization and validation for all user inputs
- CORS configuration to prevent unauthorized cross-origin requests
- Rate limiting to prevent abuse (100 requests/minute per user)
- Security headers implementation (HSTS, CSP, X-Frame-Options)

**Verification Methods:**
- OWASP ZAP security scanning
- Penetration testing for common vulnerabilities
- Code review for security best practices
- SSL/TLS configuration testing

### **NFR-RL3: Reliability & Availability**
**Priority:** High  

**Requirements:**
- System uptime must exceed 99.5% (excluding planned maintenance)
- Automatic failover for critical system components
- Graceful error handling with user-friendly error messages
- Data consistency across all operations
- Backup and recovery procedures with RTO <4 hours, RPO <1 hour

**Implementation Guidelines:**
- Health check endpoints for monitoring
- Graceful shutdown procedures for maintenance
- Database replication for high availability
- Automated backup scheduling
- Error logging and monitoring systems

**Verification Methods:**
- Uptime monitoring with external services
- Disaster recovery testing
- Error rate monitoring and alerting
- Backup integrity verification

### **NFR-RL4: Usability & Accessibility**
**Priority:** Medium  

**Requirements:**
- Interface must comply with WCAG 2.1 AA accessibility standards
- Mobile responsiveness for screen sizes 320px and above
- Keyboard navigation support for all interactive elements
- Screen reader compatibility with proper semantic markup
- Multi-language support capability (initially English)

**Implementation Guidelines:**
- Semantic HTML markup with proper ARIA labels
- High contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Touch targets minimum 44x44px for mobile devices
- Focus indicators for keyboard navigation
- Alternative text for all images and media

**Verification Methods:**
- Accessibility testing with axe-core or WAVE
- Manual testing with screen readers
- Cross-device testing for responsiveness
- User acceptance testing with target demographics

### **NFR-RL5: Integration & Interoperability**
**Priority:** High  

**Requirements:**
- RESTful API design following OpenAPI 3.0 specification
- Real-time data synchronization with main platform
- Webhook support for event-driven integrations
- API versioning strategy for backward compatibility
- Standard data formats (JSON) for all API responses

**Implementation Guidelines:**
- Consistent API naming conventions and response formats
- Comprehensive API documentation with examples
- Event-driven architecture for real-time updates
- API rate limiting and throttling
- Error response standardization

**Verification Methods:**
- API testing with Postman or Newman
- Integration testing with main platform
- API documentation validation
- Backward compatibility testing

---

\newpage

# LEVERAGING EXISTING LUNARA INFRASTRUCTURE

## **🚀 Foundation Already Built - No Need to Start from Scratch!**

**CRITICAL INSIGHT:** Andrew's project builds upon a **sophisticated, enterprise-grade foundation** already established in the main LUNARA platform. This dramatically reduces complexity and development time.

### **🏗️ What's Already Built & Ready to Use**

#### **✅ Complete Authentication System**
```typescript
// ALREADY AVAILABLE: Full authentication with multiple strategies
import passport from 'passport';
import { AuthenticatedRequest } from '../types';

// Andrew can immediately use:
const authenticate = passport.authenticate('jwt', { session: false });

// Routes automatically get user context:
router.get('/resources', authenticate, (req: AuthenticatedRequest, res) => {
  const user = req.user; // User data already available!
  // Andrew's resource logic here
});
```

#### **✅ Sophisticated Database Layer**
```typescript
// ALREADY AVAILABLE: Professional schemas and validation
import mongoose, { Schema, Document } from 'mongoose';

// Andrew follows existing patterns from User.ts, Client.ts
export interface IResource extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId; // Links to existing User!
  category: string;
  tags: string[];
  // ... Andrew extends this pattern
}

// Existing validation, middleware, and virtuals patterns ready to copy
```

#### **✅ Professional API Infrastructure**
```typescript
// ALREADY AVAILABLE: Express.js with full middleware stack
// Andrew extends existing routes structure:

// /src/routes/resources.ts (Andrew creates following appointments.ts pattern)
import express, { Router, Response } from 'express';
import { asyncHandler } from '../middleware'; // EXISTING error handling!
import { handleValidationErrors } from '../middleware'; // EXISTING validation!

// All middleware patterns already established and working
```

#### **✅ Frontend Service Integration**
```typescript
// ALREADY AVAILABLE: ApiClient with authentication built-in
import { ApiClient } from '../api/apiClient';

export class ResourceService {
  private static _instance: ResourceService | null = null;
  private readonly api = ApiClient.getInstance(); // EXISTING authenticated client!
  
  async getResources(): Promise<Resource[]> {
    return this.api.get('/resources'); // Authentication automatic!
  }
}
```

### **📋 Integration Strategy - Step by Step**

#### **Backend Integration (Weeks 1-4)**

**Week 1-2: Extend Database Models**
```typescript
// Step 1: Create /src/models/Resource.ts following User.ts pattern
// Step 2: Create /src/models/Category.ts following Client.ts pattern  
// Step 3: Add to existing database connection (NO new setup needed)

// COPY from User.ts pattern:
const resourceSchema = new Schema<IResource>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  // ... follows exact validation patterns from existing models
}, {
  timestamps: true, // EXISTING pattern
  toJSON: { virtuals: true }, // EXISTING pattern  
  toObject: { virtuals: true } // EXISTING pattern
});
```

**Week 3-4: Create API Routes**
```typescript
// Step 1: Create /src/routes/resources.ts following appointments.ts pattern
// COPY middleware stack from appointments.ts:

import express, { Router, Response } from 'express';
import passport from 'passport';
import { body, param, validationResult } from 'express-validator';
import Resource from '../models/Resource';

const router: Router = express.Router();
const authenticate = passport.authenticate('jwt', { session: false }); // EXISTING!

// EXACT pattern from appointments.ts:
router.get('/', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const resources = await Resource.find({}).populate('author', 'firstName lastName');
    return res.json(resources);
  } catch (error) {
    // EXISTING error handling automatically catches this
    console.error('Get resources error:', error);
    return res.status(500).json({ error: 'Failed to retrieve resources' });
  }
});
```

#### **Frontend Integration (Weeks 5-6)**

**Extend Existing React Services**
```typescript
// Step 1: Create ResourceService following existing authService.ts pattern
// Step 2: Add ResourceContext following existing AuthContext.tsx pattern
// Step 3: Create resource components using existing UI components

// COPY from authService.ts pattern:
export class ResourceService {
  private static _instance: ResourceService | null = null;
  private readonly api = ApiClient.getInstance(); // EXISTING ApiClient!
  
  static getInstance(): ResourceService {
    if (!this._instance) {
      this._instance = new ResourceService();
    }
    return this._instance;
  }
  
  // Andrew follows EXACT same patterns
}
```

#### **Testing Integration (Week 7)**
```typescript
// COPY from existing integration tests pattern:
import request from 'supertest';
import { app } from '../../src/server'; // EXISTING app!

describe('Resource API', () => {
  // COPY test setup from appointments_messages.test.ts
  let authToken: string;
  
  beforeAll(async () => {
    // EXISTING test utilities and setup
  });
  
  it('should create a resource', async () => {
    const res = await request(app)
      .post('/api/resources')
      .set('Authorization', `Bearer ${authToken}`) // EXISTING auth!
      .send({ /* resource data */ });
    
    expect(res.status).toBe(201);
  });
});
```

### **🎯 Development Advantages with Existing Foundation**

#### **No Need to Learn/Build:**
- ✅ **Express.js server setup** and configuration
- ✅ **MongoDB connection** and error handling  
- ✅ **Authentication middleware** and JWT handling
- ✅ **Validation patterns** and error responses
- ✅ **TypeScript configuration** and type definitions
- ✅ **Testing setup** and utilities
- ✅ **Frontend build pipeline** and development environment
- ✅ **API client** with automatic authentication
- ✅ **React patterns** and component architecture

#### **Andrew Just Needs to:**
1. **Follow existing patterns** (copy & modify existing files)
2. **Extend database schemas** using established validation rules
3. **Add new routes** using existing middleware stack
4. **Create React components** using existing UI library
5. **Write tests** using existing test utilities

### **📊 Complexity Reduction**

**Without Foundation:** 
- 100% of infrastructure + 100% of features = **200% work**

**With Foundation:**
- 0% infrastructure + 100% of features = **100% work**

**Actual Andrew Scope:**
- 0% infrastructure + 30% features (extending patterns) = **30% work**

This transforms Andrew's project from **"building a microservice"** to **"extending an existing platform"** - perfect for a learning-focused senior project!

---

\newpage

# TECHNICAL ARCHITECTURE

### **Technology Stack (Building on Existing)**
```
Frontend: React 18 + TypeScript + Tailwind CSS
Backend: Node.js + Express + TypeScript  
Database: MongoDB with Mongoose ODM
File Storage: Cloudinary
Authentication: JWT (integrated with main platform)
Deployment: Docker + Vercel/Render
Testing: Jest + React Testing Library
```

### **System Architecture**
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Main LUNARA   │◄──►│  Resource Library │◄──►│   Content CDN   │
│    Platform     │    │     Service      │    │   (Cloudinary)  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                        ┌──────────────────┐
                        │  MongoDB Atlas   │
                        │ (Resource Data)  │
                        └──────────────────┘
```

### **API Integration Points**
- User authentication via main platform JWT
- User profile data synchronization
- Content assignment and recommendations
- Usage analytics sharing

---

\newpage

# PROJECT TIMELINE (15 Weeks) - INTEGRATION APPROACH

## **⚡ SIMPLIFIED APPROACH CONFIRMED**

**Based on infrastructure decisions above, Andrew's timeline is dramatically simplified:**

- ✅ **No separate repository** - works in main AQC repo with feature branches
- ✅ **No authentication setup** - uses existing JWT system unchanged  
- ✅ **No database configuration** - creates new collections in existing Atlas database
- ✅ **No environment setup** - uses existing `.env` with team-provided credentials
- ✅ **No deployment configuration** - integrates with existing deployment pipeline

**This allows Andrew to focus 100% of his time on feature development rather than infrastructure setup!**

---

### **🚀 Phase 1: LUNARA Integration & Pattern Learning (Weeks 1-3)**
**Learning Focus:** Understanding and extending existing enterprise-grade architecture

#### **Week 1: LUNARA Codebase Integration & Pattern Analysis**
**INTEGRATION APPROACH:** Work directly within existing LUNARA monorepo rather than creating separate service

**SPECIFIC TASKS:**
- [ ] **Day 1:** Set up development environment using existing LUNARA infrastructure
  ```bash
  # Clone existing LUNARA repository (no new repo needed!)
  git clone <LUNARA-repo-url>
  cd LUNARA
  
  # Use existing backend setup
  cd backend && npm install  # Uses existing package.json with ALL dependencies
  npm run dev               # Start existing Express server with all middleware
  
  # Use existing frontend setup  
  cd ../Lunara && npm install # Uses existing React setup
  npm run dev                # Start existing Vite dev server
  ```

- [ ] **Day 2:** Study existing authentication patterns (NO auth implementation needed!)
  ```typescript
  // STUDY these existing files:
  // - backend/src/config/passport.ts (JWT + OAuth already implemented)
  // - backend/src/routes/auth.ts (complete auth API already working)
  // - Lunara/src/services/authService.ts (frontend auth service ready)
  // - Lunara/src/contexts/AuthContext.tsx (React auth context working)
  
  // TEST existing auth endpoints:
  // POST /api/auth/register, /api/auth/login (already functional!)
  ```

- [ ] **Day 3:** Analyze existing database model patterns (NO database setup needed!)
  ```typescript
  // STUDY these existing models (copy these patterns):
  // - backend/src/models/User.ts (validation, schema, middleware patterns)
  // - backend/src/models/Client.ts (complex nested schemas)
  // - backend/src/models/Provider.ts (relationships, virtuals, statics)
  // - backend/src/models/Appointment.ts (references between models)
  
  // GOAL: Document patterns Andrew will copy for Resource models
  ```

- [ ] **Day 4:** Study existing API route patterns (NO route setup needed!)
  ```typescript
  // STUDY these existing routes (copy these patterns):
  // - backend/src/routes/appointments.ts (CRUD operations with auth)
  // - backend/src/routes/messages.ts (middleware usage, validation)
  // - backend/src/routes/users.ts (profile management patterns)
  
  // TEST existing endpoints with Postman using existing auth tokens
  ```

- [ ] **Day 5:** Study existing frontend service patterns (NO frontend setup needed!)
  ```typescript
  // STUDY these existing services (copy these patterns):
  // - Lunara/src/services/authService.ts (singleton service pattern)
  // - Lunara/src/api/apiClient.ts (HTTP client with auto-auth)
  // - Lunara/src/contexts/AuthContext.tsx (React context patterns)
  // - Lunara/src/components/ (existing UI component library)
  ```

**SPECIFIC DELIVERABLES (Due End of Week 1):**
1. **Working LUNARA Environment:** Both backend and frontend running successfully
2. **Pattern Documentation:** Markdown file documenting existing patterns Andrew will extend
3. **Feature Branch:** `git checkout -b feature/andrew-resource-library`
4. **Integration Plan:** Document showing exactly which existing files Andrew will extend

**SUBMISSION REQUIREMENTS:**
- Screenshot of existing LUNARA backend running (showing existing endpoints)
- Screenshot of existing LUNARA frontend running (showing existing auth working)
- Pattern documentation with code snippets from existing files
- Git branch created and pushed with documentation commit

#### **Week 2: Database Model Extension (Using Existing Infrastructure)**
**INTEGRATION APPROACH:** Extend existing MongoDB connection and follow established model patterns

**SPECIFIC TASKS:**
- [ ] **Day 1:** Create Resource model following existing User.ts pattern (NO MongoDB setup needed!)
  ```typescript
  // EXTEND existing database (backend/src/models/Resource.ts)
  // COPY validation patterns from backend/src/models/User.ts:
  
  import mongoose, { Schema, Document } from 'mongoose';
  
  export interface IResource extends Document {
    title: string;
    description: string;
    content: string;
    category: string;
    tags: string[];
    author: mongoose.Types.ObjectId; // Reference existing User model!
    targetWeeks: number[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    fileUrl?: string;
    thumbnailUrl?: string;
    isPublished: boolean;
    publishDate?: Date;
    // Use existing timestamp pattern from User.ts
  }
  
  // COPY validation patterns from existing models:
  const resourceSchema = new Schema<IResource>({
    title: {
      type: String,
      required: [true, 'Title is required'], // SAME pattern as User.ts
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'] // SAME pattern
    },
    // ... follow EXACT patterns from existing models
  }, {
    timestamps: true, // EXISTING pattern
    toJSON: { virtuals: true }, // EXISTING pattern
    toObject: { virtuals: true } // EXISTING pattern
  });
  ```

- [ ] **Day 2:** Create Category model following existing Client.ts complex schema pattern
  ```typescript
  // Create backend/src/models/Category.ts
  // COPY complex nested schema patterns from backend/src/models/Client.ts
  // Use existing relationship and population patterns
  
  export interface ICategory extends Document {
    name: string;
    description: string;
    parentCategory?: mongoose.Types.ObjectId; // Self-reference like Provider relationships
    subcategories: mongoose.Types.ObjectId[];
    // Use existing validation and virtual patterns
  }
  ```

- [ ] **Day 3:** Create UserResourceInteraction model following existing Message.ts patterns
  ```typescript
  // Create backend/src/models/UserResourceInteraction.ts  
  // COPY relationship patterns from backend/src/models/Message.ts
  
  export interface IUserResourceInteraction extends Document {
    user: mongoose.Types.ObjectId; // Reference existing User!
    resource: mongoose.Types.ObjectId; // Reference new Resource
    interactionType: 'view' | 'download' | 'favorite' | 'rating';
    rating?: number;
    // Use existing timestamp and indexing patterns
  }
  ```

- [ ] **Day 4:** Integrate models with existing database connection
  ```typescript
  // ADD to existing backend/src/server.ts imports (NO new connection needed!)
  // Models automatically use existing MongoDB connection
  // Test with existing error handling and logging
  ```

- [ ] **Day 5:** Create model tests following existing test patterns
  ```typescript
  // COPY test structure from backend/tests/models/provider.test.js
  // Use existing MongoMemoryServer setup (NO test setup needed!)
  // Use existing test utilities and patterns
  ```

**SPECIFIC DELIVERABLES (Due End of Week 2):**
1. **Resource Model:** Complete Resource.ts following existing User.ts patterns
2. **Category Model:** Category.ts with hierarchical structure following Client.ts patterns  
3. **Interaction Model:** UserResourceInteraction.ts following Message.ts patterns
4. **Model Tests:** Unit tests following existing provider.test.js patterns
5. **Database Integration:** Models integrated with existing MongoDB connection

**SUBMISSION REQUIREMENTS:**
- Models following EXACT patterns from existing codebase
- All models using existing validation and error handling patterns
- Unit tests using existing MongoMemoryServer setup
- Git commits showing daily progress with clear messages

#### **Week 3: API Route Extension (Using Existing Middleware Stack)**
**INTEGRATION APPROACH:** Create new routes using existing Express middleware and patterns

**SPECIFIC TASKS:**
- [ ] **Day 1:** Create Resource routes following existing appointments.ts pattern (NO Express setup needed!)
  ```typescript
  // Create backend/src/routes/resources.ts
  // COPY structure from backend/src/routes/appointments.ts:
  
  import express, { Router, Response } from 'express';
  import passport from 'passport';
  import { body, param, validationResult } from 'express-validator';
  import Resource from '../models/Resource';
  import { AuthenticatedRequest } from '../types'; // EXISTING type!
  
  const router: Router = express.Router();
  const authenticate = passport.authenticate('jwt', { session: false }); // EXISTING auth!
  
  // COPY exact patterns from appointments.ts:
  router.get('/', authenticate, async (req: AuthenticatedRequest, res: Response) => {
    try {
      const resources = await Resource.find({}).populate('author', 'firstName lastName');
      return res.json(resources);
    } catch (error) {
      // EXISTING error handling pattern
      console.error('Get resources error:', error);
      return res.status(500).json({ error: 'Failed to retrieve resources' });
    }
  });
  ```

- [ ] **Day 2:** Implement Resource CRUD operations following appointments.ts patterns
  ```typescript
  // COPY validation patterns from existing routes:
  router.post('/', authenticate, [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    // ... use EXISTING validation patterns
  ], async (req: AuthenticatedRequest, res: Response) => {
    // Use EXISTING validation error handling from appointments.ts
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Validation failed', details: errors.array() });
    }
    // ... COPY exact CRUD patterns
  });
  ```

- [ ] **Day 3:** Create Category management routes following users.ts patterns
  ```typescript
  // Create backend/src/routes/categories.ts
  // COPY route structure from backend/src/routes/users.ts
  // Use EXISTING middleware and validation patterns
  ```

- [ ] **Day 4:** Integrate routes with existing server infrastructure
  ```typescript
  // ADD to backend/src/server.ts following existing pattern:
  import resourcesRouter from './routes/resources';
  import categoriesRouter from './routes/categories';
  
  // Use EXISTING middleware stack:
  app.use('/api/resources', resourcesRouter);
  app.use('/api/categories', categoriesRouter);
  
  // Routes automatically get existing CORS, rate limiting, security headers!
  ```

- [ ] **Day 5:** Create integration tests following existing test patterns
  ```typescript
  // Create backend/tests/integration/resources.test.ts
  // COPY test structure from backend/tests/integration/appointments_messages.test.ts
  // Use EXISTING test authentication and setup utilities
  ```

**SPECIFIC DELIVERABLES (Due End of Week 3):**
1. **Resource API:** Complete CRUD operations following appointments.ts patterns
2. **Category API:** Category management following users.ts patterns
3. **Server Integration:** Routes integrated with existing middleware stack
4. **Integration Tests:** Tests following existing test patterns
5. **API Documentation:** Swagger docs auto-generated using existing setup

**SUBMISSION REQUIREMENTS:**
- Routes following EXACT patterns from existing codebase
- All routes using existing authentication and validation middleware
- Integration tests using existing test utilities and setup
- Swagger documentation auto-generated from existing system
- Postman collection testing all endpoints with authentication
### **🎯 INTEGRATION ADVANTAGES SUMMARY**

**With this integration approach, Andrew gets:**

#### **Immediate Development Advantages:**
- ✅ **Zero setup time** - everything already configured and working
- ✅ **Proven patterns** - copy from working, tested code
- ✅ **Professional infrastructure** - enterprise-grade middleware and security
- ✅ **Complete testing framework** - utilities and patterns ready to use
- ✅ **Automatic features** - authentication, error handling, logging all working

#### **Learning Benefits:**
- 📚 **Real-world experience** - working with production-quality codebase
- 📚 **Best practices** - following established patterns and conventions
- 📚 **Code review opportunities** - comparing his code to existing examples
- 📚 **Modern stack exposure** - TypeScript, Mongoose, Express.js patterns

#### **Timeline Impact:**
- ⚡ **Week 1:** Study patterns (instead of environment setup)
- ⚡ **Week 2:** Extend models (instead of database configuration)
- ⚡ **Week 3:** Add routes (instead of Express.js setup)
- ⚡ **Weeks 4+:** Focus on features (instead of infrastructure)

**This approach transforms Andrew's project from "building a microservice" to "extending a platform" - perfect for learning while delivering real value!**

---

\newpage

# PROJECT SETUP & INFRASTRUCTURE DECISIONS

## **🚨 CRITICAL: Development Environment Setup (RESOLVED)**

**These key infrastructure decisions have been made to simplify Andrew's development:**

### **✅ Repository Strategy - SAME REPO**
```bash
# Andrew will work in the main AQC repository
git clone https://github.com/your-team/AQC.git
cd AQC

# Create feature branches for development
git checkout -b feature/resource-library-backend
git checkout -b feature/resource-library-frontend
git checkout -b feature/resource-library-integration
```

**Benefits:**
- ✅ **Immediate access** to all existing code and patterns
- ✅ **Shared dependencies** - no version conflicts
- ✅ **Easy integration testing** - can test with live main platform
- ✅ **Code review integration** - team can review in same workflow
- ✅ **Deployment simplicity** - same CI/CD pipeline

### **✅ Authentication Strategy - EXISTING JWT SYSTEM**
**Andrew uses the existing authentication without changes:**

```typescript
// Andrew's routes automatically get authentication:
import { authenticate } from '../middleware';

// All resource routes are automatically protected:
router.get('/api/resources', authenticate, getResources);
router.post('/api/resources', authenticate, createResource);

// User context available in all routes:
interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
    role: 'client' | 'doula' | 'admin';
  };
}
```

**No Changes Needed:**
- ✅ **Same JWT tokens** (1-hour access, 7-day refresh)
- ✅ **Same authentication middleware** from existing codebase
- ✅ **Same user context** automatically available
- ✅ **Same security patterns** (rate limiting, CORS, etc.)

### **✅ Database Strategy - NEW COLLECTIONS IN EXISTING ATLAS DB**
```typescript
// Andrew creates new collections in existing database:
// mongodb+srv://username:password@cluster.mongodb.net/lunara

// New Collections Andrew will create:
// - resources
// - resource_categories  
// - user_resource_interactions
// - resource_templates
// - client_documents
// - care_plan_templates

// Existing collections he can reference:
// - users (for authentication)
// - clients (for client-specific content)
// - providers (for provider-created content)
```

**Database Connection Already Configured:**
```typescript
// Andrew uses existing connection from server.ts:
mongoose.connect(process.env.MONGODB_URI) // Already connected to Atlas
```

### **✅ File Storage - SHARED CLOUDINARY ACCOUNT**
```env
# Team will provide these credentials:
CLOUDINARY_CLOUD_NAME=team-lunara-account
CLOUDINARY_API_KEY=shared-api-key
CLOUDINARY_API_SECRET=shared-api-secret
```

**File Upload Integration:**
```typescript
// Andrew can immediately use existing patterns:
import { uploadToCloudinary } from '../utils/cloudinary'; // If exists
// OR follow existing file upload patterns from the codebase
```

---

## **📋 SIMPLIFIED WEEK 1 SETUP CHECKLIST**

### **Day 1: Repository & Environment**
- [ ] Clone main AQC repository
- [ ] Create feature branch: `feature/resource-library-backend`
- [ ] Install dependencies: `cd backend && npm install`
- [ ] Copy `.env.example` to `.env` (team will provide credentials)
- [ ] Test existing backend: `npm run dev` (should start on port 5000)
- [ ] Verify database connection to Atlas instance

### **Day 2: Code Exploration**
- [ ] Study existing models: `src/models/User.ts`, `Client.ts`, `Provider.ts`
- [ ] Study existing routes: `src/routes/auth.ts`, `users.ts`
- [ ] Study existing middleware: `src/middleware/index.ts`
- [ ] Study existing authentication flow in `config/passport.ts`
- [ ] Run existing tests: `npm test`

### **Day 3: First Model Creation**
- [ ] Create `src/models/Resource.ts` following `User.ts` patterns
- [ ] Create basic schema with validation
- [ ] Test model creation with simple Node.js script
- [ ] Add to Git: `git add . && git commit -m "Add Resource model"`

**No Complex Setup Required:**
- ❌ No separate repository setup
- ❌ No authentication configuration  
- ❌ No database connection setup
- ❌ No Cloudinary account creation
- ❌ No deployment configuration

**Everything Andrew needs is already working in the main codebase!**

---

### **Phase 2: Dual Content System Frontend Development (Weeks 4-8)**
**Learning Focus:** Extending existing LUNARA frontend for dual content workflows

#### **Week 4: Frontend Service Extension (Using Existing React Infrastructure)**
**INTEGRATION APPROACH:** Extend existing LUNARA frontend rather than creating new React app

**SPECIFIC TASKS:**
- [ ] **Day 1:** Create ResourceService following existing authService.ts pattern (NO React setup needed!)
  ```typescript
  // Create Lunara/src/services/resourceService.ts
  // COPY singleton pattern from Lunara/src/services/authService.ts:
  
  import { ApiClient } from '../api/apiClient';
  
  export class ResourceService {
    private static _instance: ResourceService | null = null;
    private readonly api = ApiClient.getInstance(); // EXISTING authenticated client!
    
    static getInstance(): ResourceService {
      if (!this._instance) {
        this._instance = new ResourceService();
      }
      return this._instance;
    }
    
    // Provider Content Methods
    async getPublicResources(filters?: ResourceFilters): Promise<ProviderContent[]> {
      return this.api.get('/provider-content', { params: filters });
    }
    
    async createBlogPost(data: BlogPostData): Promise<ProviderContent> {
      return this.api.post('/provider-content', data);
    }
    
    // Client Document Methods  
    async uploadClientDocument(file: File, metadata: DocumentMetadata): Promise<ClientDocument> {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('metadata', JSON.stringify(metadata));
      return this.api.post('/client-documents', formData);
    }
    
    async submitDocumentToProvider(documentId: string, message?: string): Promise<void> {
      return this.api.post(`/client-documents/${documentId}/submit`, { message });
    }
  }
  ```

- [ ] **Day 2:** Create ResourceContext following existing AuthContext.tsx pattern
  ```typescript
  // Create Lunara/src/contexts/ResourceContext.tsx
  // COPY context pattern from Lunara/src/contexts/AuthContext.tsx:
  
  import React, { createContext, useContext, useState } from 'react';
  import { ResourceService } from '../services/resourceService';
  
  interface ResourceContextType {
    // Provider content state
    publicResources: ProviderContent[];
    loadPublicResources: (filters?: ResourceFilters) => Promise<void>;
    createBlogPost: (data: BlogPostData) => Promise<void>;
    
    // Client document state
    clientDocuments: ClientDocument[];
    uploadDocument: (file: File, metadata: DocumentMetadata) => Promise<void>;
    submitToProvider: (documentId: string, message?: string) => Promise<void>;
  }
  
  // Follow EXACT same patterns as AuthContext for state management
  ```

- [ ] **Day 3:** Create dual content components using existing UI patterns
  ```typescript
  // Provider Content Components (for doulas):
  // - Lunara/src/components/resource/BlogEditor.tsx (follows existing form patterns)
  // - Lunara/src/components/resource/ResourceLibrary.tsx (follows existing list patterns)
  
  // Client Document Components (for clients):
  // - Lunara/src/components/documents/DocumentUpload.tsx (follows existing form patterns)
  // - Lunara/src/components/documents/MyDocuments.tsx (follows existing list patterns)
  // - Lunara/src/components/documents/DocumentViewer.tsx (new component for file viewing)
  ```

- [ ] **Day 4:** Integrate components with existing LUNARA dashboard
  ```typescript
  // Add to existing provider dashboard (NO new pages needed!):
  // - "Content Management" section for blog creation
  // - "Client Documents" section for reviewing submissions
  
  // Add to existing client dashboard:
  // - "My Documents" section for upload/management
  // - "Resource Library" section for viewing provider content
  
  // Use existing routing patterns in Lunara/src/App.tsx
  ```

- [ ] **Day 5:** Test dual workflows with existing authentication
  ```bash
  # Test with existing LUNARA users:
  # 1. Login as provider → create blog post → verify client can view
  # 2. Login as client → upload document → verify provider receives notification
  # 3. Test document submission workflow end-to-end
  ```

#### **Week 5: Content Creation & Publishing Workflows**

**SPECIFIC TASKS:**
- [ ] **Day 1-2:** Implement rich text editor for provider blog creation
  ```typescript
  // Use React-compatible editor (following existing form patterns):
  // - Integrate with existing Tailwind CSS styling
  // - Support image upload using existing Cloudinary integration
  // - Auto-save drafts using existing patterns
  ```

- [ ] **Day 3-4:** Implement client document upload with form validation
  ```typescript
  // Create document upload forms:
  // - Emotional wellness survey form
  // - Progress tracking photo upload
  // - Personal assessment questionnaire
  // Use existing React Hook Form + Zod validation patterns
  ```

- [ ] **Day 5:** Implement document sharing and submission workflow
  ```typescript
  // Client submits document → Provider gets notification → Provider reviews → Client gets feedback
  // Use existing notification patterns and messaging integration
  ```

#### **Week 6: Search, Filtering & Personalization Integration**

**SPECIFIC TASKS:**
- [ ] **Day 1-2:** Implement search for both content types
  ```typescript
  // Provider content search: Public resources by category, tags, target weeks
  // Client document search: Personal documents by type, date, status
  // Use existing search patterns and components if available
  ```

- [ ] **Day 3-4:** Add filtering and categorization
  ```typescript
  // Provider content filters: Category, difficulty, target weeks, author
  // Client document filters: Type, submission status, date range, provider
  // Follow existing filtering component patterns
  ```

- [ ] **Day 5:** Implement basic recommendation system
  ```typescript
  // Show relevant provider content based on client's postpartum week
  // Suggest document templates based on client's progress
  // Use existing user data from Client/Provider models
  ```

#### **Week 7: Advanced Features & File Management**

**SPECIFIC TASKS:**
- [ ] **Day 1-2:** Implement Cloudinary integration for both content types
  ```typescript
  // Provider content: Blog images, downloadable PDFs, video content
  // Client documents: Personal photos, scanned forms, progress images
  // Use existing Cloudinary configuration and patterns
  ```

- [ ] **Day 3-4:** Add document versioning and revision history
  ```typescript
  // Track changes to both provider content and client documents
  // Show edit history and allow rollback for provider content
  // Track submission versions for client documents
  ```

- [ ] **Day 5:** Implement notification system integration
  ```typescript
  // Provider notifications: New client document submissions
  // Client notifications: New relevant content published, provider feedback
  // Use existing email service and Socket.io patterns
  ```

#### **Week 8: Testing, Integration & Polish**

**SPECIFIC TASKS:**
- [ ] **Day 1-2:** Create comprehensive tests for both workflows
  ```typescript
  // Test provider content creation and publishing workflow
  // Test client document upload and submission workflow
  // Test role-based access control and permissions
  // Use existing Jest and React Testing Library setup
  ```

- [ ] **Day 3-4:** Integration testing with existing LUNARA features
  ```typescript
  // Test authentication integration with existing auth system
  // Test provider-client relationship integration
  // Test notification integration with existing messaging
  // Use existing integration test patterns
  ```

- [ ] **Day 5:** Final polish and documentation
  ```typescript
  // Ensure consistent UI/UX with existing LUNARA design
  // Create user documentation for both provider and client workflows
  // Document API integration points and technical specifications
  ```

**SPECIFIC DELIVERABLES (Due End of Week 8):**
1. **Dual Content System:** Working provider blog creation + client document management
2. **Frontend Integration:** Components integrated into existing LUNARA dashboards
3. **Workflow Testing:** End-to-end testing of both content workflows
4. **User Documentation:** Guides for providers and clients using the system
5. **Technical Documentation:** API documentation and integration specifications

**SUBMISSION REQUIREMENTS:**
- Live demo showing both provider and client workflows
- Integration with existing LUNARA authentication and user management
- Test coverage reports for new components and services
- User guide documentation for both content workflows

---

### **Phase 2: Core Functionality (Weeks 4-8)**
**Learning Focus:** Database design, API development, frontend integration

#### **Week 4: File Upload & Cloud Storage Integration**
**SPECIFIC TASKS:**
- [ ] **Day 1-2:** Set up Cloudinary account and configuration:
  - Create free Cloudinary account
  - Generate API credentials
  - Install `cloudinary` and `multer` packages
  - Configure environment variables
- [ ] **Day 3-4:** Implement file upload middleware:
  ```javascript
  // Required functionality:
  const uploadMiddleware = multer({
    storage: cloudinary.storage({
      folder: 'lunara-resources',
      allowedFormats: ['jpg', 'png', 'pdf', 'mp4'],
      transformation: [{ width: 800, height: 600, crop: 'limit' }]
    }),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
  });
  ```
- [ ] **Day 5-6:** Create file upload endpoints:
  - `POST /api/upload/resource` - Upload resource files
  - `POST /api/upload/thumbnail` - Upload thumbnail images
  - `DELETE /api/upload/:publicId` - Delete uploaded files
- [ ] **Day 7:** Update Resource model to include file URLs and implement file deletion cleanup

**SPECIFIC DELIVERABLES (Due End of Week 4):**
1. **File Upload System:** Working file upload with Cloudinary integration
2. **File Management:** Upload, view, and delete functionality
3. **Resource Enhancement:** Updated Resource model with file support
4. **API Testing:** Postman collection updated with file upload tests
5. **Error Handling:** Proper error handling for file size/type limits

**SUBMISSION REQUIREMENTS:**
- Demo video showing file upload process
- Screenshots of files in Cloudinary dashboard
- Updated API documentation

#### **Week 5: Search & Filtering System**
**SPECIFIC TASKS:**
- [ ] **Day 1-2:** Implement text search with MongoDB:
  ```javascript
  // Required search functionality:
  const searchResources = async (query, filters) => {
    const searchCriteria = {
      $and: [
        query ? {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
            { tags: { $in: [new RegExp(query, 'i')] } }
          ]
        } : {},
        filters.category ? { category: filters.category } : {},
        filters.difficulty ? { difficulty: filters.difficulty } : {},
        filters.targetWeeks ? { targetWeeks: { $in: filters.targetWeeks } } : {},
        { isPublished: true }
      ]
    };
    return Resource.find(searchCriteria).sort({ createdAt: -1 });
  };
  ```
- [ ] **Day 3-4:** Create search and filter endpoints:
  - `GET /api/resources/search?q=term&category=nutrition&difficulty=beginner`
  - `GET /api/resources/filter?weeks=1,2,3&tags=exercise,nutrition`
  - `GET /api/resources/suggestions?based_on=resourceId` (simple recommendation)
- [ ] **Day 5-6:** Implement pagination and sorting:
  - Add `page`, `limit`, `sortBy`, `sortOrder` query parameters
  - Default to 20 items per page
  - Support sorting by: `createdAt`, `title`, `popularity`
- [ ] **Day 7:** Add resource statistics and analytics tracking

**SPECIFIC DELIVERABLES (Due End of Week 5):**
1. **Search System:** Full-text search across title, description, and tags
2. **Filter System:** Multi-criteria filtering (category, difficulty, weeks, tags)
3. **Pagination:** Working pagination with configurable page sizes
4. **API Endpoints:** All search/filter endpoints with proper query validation
5. **Performance:** Search queries execute in <200ms for 1000+ resources

**SUBMISSION REQUIREMENTS:**
- Performance test results showing search speed
- Demo of search/filter functionality
- Database with 50+ sample resources for testing

#### **Week 6: Advanced Frontend Components**
**SPECIFIC TASKS:**
- [ ] **Day 1-2:** Create advanced resource components:
  ```tsx
  // Required components with exact props:
  interface ResourceCardProps {
    resource: Resource;
    onFavorite: (id: string) => void;
    onView: (id: string) => void;
    showActions: boolean;
  }
  
  interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder: string;
    suggestions: string[];
  }
  
  interface FilterPanelProps {
    categories: string[];
    difficulties: string[];
    onFilterChange: (filters: FilterState) => void;
    activeFilters: FilterState;
  }
  ```
- [ ] **Day 3-4:** Implement resource viewing modal:
  - Full-screen resource viewer
  - PDF viewer integration
  - Image gallery for multiple images
  - Download functionality
- [ ] **Day 5-6:** Create resource management interface:
  - Add/edit resource form with validation
  - File upload interface with drag-and-drop
  - Rich text editor for content (TinyMCE or similar)
- [ ] **Day 7:** Implement responsive design and mobile optimization

**SPECIFIC DELIVERABLES (Due End of Week 6):**
1. **Component Library:** All required components with TypeScript interfaces
2. **Resource Viewer:** Full-featured resource viewing experience
3. **Admin Interface:** Complete resource management interface
4. **Mobile Design:** Fully responsive design for mobile devices
5. **User Experience:** Smooth animations and loading states

**SUBMISSION REQUIREMENTS:**
- Component documentation with Storybook or similar
- Mobile responsiveness demo on different screen sizes
- Accessibility audit results (WAVE or similar tool)

#### **Week 7: User Favorites & Collections**
**SPECIFIC TASKS:**
- [ ] **Day 1-2:** Design user interaction schema:
  ```javascript
  const UserInteractionSchema = {
    userId: { type: String, required: true },
    resourceId: { type: Schema.Types.ObjectId, ref: 'Resource' },
    interactions: [{
      type: { type: String, enum: ['view', 'favorite', 'download', 'share'] },
      timestamp: { type: Date, default: Date.now },
      metadata: Schema.Types.Mixed
    }],
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
    collections: [{
      name: String,
      description: String,
      resources: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
      isPublic: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now }
    }]
  };
  ```
- [ ] **Day 3-4:** Implement user interaction APIs:
  - `POST /api/users/:userId/favorites/:resourceId` - Add to favorites
  - `DELETE /api/users/:userId/favorites/:resourceId` - Remove from favorites
  - `GET /api/users/:userId/favorites` - Get user favorites
  - `POST /api/users/:userId/collections` - Create collection
  - `PUT /api/users/:userId/collections/:collectionId` - Update collection
  - `POST /api/users/:userId/collections/:collectionId/resources` - Add resource to collection
- [ ] **Day 5-6:** Build frontend favorites and collections interface:
  - Favorites page with grid/list view toggle
  - Collection creator and manager
  - Drag-and-drop interface for organizing collections
- [ ] **Day 7:** Implement analytics tracking for user behavior

**SPECIFIC DELIVERABLES (Due End of Week 7):**
1. **User System:** Complete user interaction tracking
2. **Favorites System:** Add/remove favorites with persistence
3. **Collections:** Create, manage, and organize resource collections
4. **Analytics:** Basic user behavior tracking
5. **Integration:** Seamless frontend-backend data flow

**SUBMISSION REQUIREMENTS:**
- Demo video showing complete user workflow
- Analytics dashboard showing user interaction data
- Performance metrics for user operations

#### **Week 8: Testing, Documentation & Bug Fixes**
**SPECIFIC TASKS:**
- [ ] **Day 1-2:** Comprehensive testing implementation:
  - Unit tests for all API endpoints (target: 90% coverage)
  - Integration tests for file upload system
  - Frontend component tests for all major components
  - End-to-end tests for critical user flows
- [ ] **Day 3-4:** API documentation completion:
  - Complete OpenAPI/Swagger documentation
  - API versioning strategy
  - Rate limiting documentation
  - Error code documentation
- [ ] **Day 5-6:** Performance optimization:
  - Database query optimization
  - Image optimization and lazy loading
  - Caching strategy implementation
  - Bundle size optimization
- [ ] **Day 7:** Bug fixes and deployment preparation

**SPECIFIC DELIVERABLES (Due End of Week 8):**
1. **Test Suite:** Comprehensive test coverage (>90% backend, >80% frontend)
2. **Documentation:** Complete API documentation with examples
3. **Performance:** Page load times <3s, API responses <500ms
4. **Bug Report:** Documentation of known issues and resolutions
5. **Deployment:** Production-ready build configuration

**SUBMISSION REQUIREMENTS:**
- Test coverage reports
- Performance audit results
- Complete API documentation
- Deployment guide

---

### **Phase 3: Advanced Features (Weeks 9-12)**
**Learning Focus:** Algorithms, personalization, advanced UI

#### **Week 9: Recommendation Algorithm & Personalization**
**SPECIFIC TASKS:**
- [ ] **Day 1-2:** Implement user profile analysis system:
  ```javascript
  // Required user profile schema:
  const UserProfileSchema = {
    userId: { type: String, required: true },
    preferences: {
      categories: [String],
      difficulty: String,
      postpartumWeek: { type: Number, min: 1, max: 52 },
      birthExperience: {
        type: String,
        enum: ['vaginal', 'cesarean', 'assisted', 'complicated']
      },
      feedingMethod: {
        type: String,
        enum: ['breastfeeding', 'formula', 'mixed', 'pumping']
      },
      supportLevel: {
        type: String,
        enum: ['high', 'medium', 'low']
      }
    },
    interactionHistory: [{
      resourceId: Schema.Types.ObjectId,
      actionType: String,
      timestamp: Date,
      duration: Number, // time spent viewing
      rating: { type: Number, min: 1, max: 5 }
    }]
  };
  ```
- [ ] **Day 3-4:** Create recommendation algorithm:
  ```javascript
  // Required recommendation logic:
  const generateRecommendations = async (userId, limit = 10) => {
    const userProfile = await UserProfile.findOne({ userId });
    const interactionHistory = userProfile.interactionHistory;
    
    // Weight factors for recommendation scoring:
    const weights = {
      categoryMatch: 0.3,
      difficultyMatch: 0.2,
      weekRelevance: 0.25,
      popularityScore: 0.15,
      userRating: 0.1
    };
    
    // Implement scoring algorithm
    return scoredRecommendations.slice(0, limit);
  };
  ```
- [ ] **Day 5-6:** Implement recommendation endpoints:
  - `GET /api/recommendations/:userId` - Get personalized recommendations
  - `POST /api/recommendations/:userId/feedback` - Track recommendation clicks
  - `GET /api/recommendations/trending` - Get trending resources
  - `GET /api/recommendations/similar/:resourceId` - Find similar resources
- [ ] **Day 7:** Create A/B testing framework for recommendations

**SPECIFIC DELIVERABLES (Due End of Week 9):**
1. **Recommendation System:** Working personalization algorithm
2. **User Profiling:** Complete user preference tracking
3. **Recommendation API:** All recommendation endpoints with proper scoring
4. **A/B Testing:** Framework for testing recommendation effectiveness
5. **Analytics:** Tracking of recommendation performance

**SUBMISSION REQUIREMENTS:**
- Algorithm documentation with scoring explanation
- Demo showing personalized recommendations for different user types
- A/B test results comparing recommendation accuracy

#### **Week 10: Content Management & Publishing System**
**SPECIFIC TASKS:**
- [ ] **Day 1-2:** Create content publishing workflow:
  ```javascript
  // Required content workflow states:
  const ContentWorkflowSchema = {
    resourceId: { type: Schema.Types.ObjectId, ref: 'Resource' },
    status: {
      type: String,
      enum: ['draft', 'review', 'approved', 'published', 'archived'],
      default: 'draft'
    },
    workflow: [{
      status: String,
      timestamp: Date,
      userId: String,
      comments: String,
      metadata: Schema.Types.Mixed
    }],
    scheduledPublishDate: Date,
    approvals: [{
      userId: String,
      approved: Boolean,
      timestamp: Date,
      comments: String
    }]
  };
  ```
- [ ] **Day 3-4:** Build content creation interface:
  - Rich text editor with WYSIWYG functionality
  - Markdown support with live preview
  - Media insertion and management
  - SEO optimization fields (meta description, keywords)
  - Content scheduling system
- [ ] **Day 5-6:** Implement content versioning:
  - Track all content changes
  - Compare versions side-by-side
  - Rollback to previous versions
  - Content approval workflow
- [ ] **Day 7:** Create bulk content operations and import/export

**SPECIFIC DELIVERABLES (Due End of Week 10):**
1. **Content Editor:** Full-featured WYSIWYG editor with media support
2. **Publishing Workflow:** Complete draft → review → publish workflow
3. **Version Control:** Content versioning with comparison and rollback
4. **Bulk Operations:** Import/export and bulk editing capabilities
5. **SEO Tools:** Content optimization recommendations

**SUBMISSION REQUIREMENTS:**
- Demo video showing complete content creation workflow
- Examples of published content with SEO optimization
- Version control demonstration

#### **Week 11: Care Plan Template System**
**SPECIFIC TASKS:**
- [ ] **Day 1-2:** Design care plan template structure:
  ```javascript
  // Required care plan template schema:
  const CarePlanTemplateSchema = {
    name: { type: String, required: true },
    description: String,
    category: {
      type: String,
      enum: ['newborn', 'postpartum-recovery', 'breastfeeding', 'sleep', 'emotional-support']
    },
    targetWeeks: [{ type: Number, min: 1, max: 52 }],
    template: {
      sections: [{
        title: String,
        description: String,
        resources: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
        checklistItems: [{
          text: String,
          required: Boolean,
          week: Number
        }],
        milestones: [{
          title: String,
          description: String,
          targetWeek: Number,
          criteria: String
        }]
      }]
    },
    customizations: [{
      field: String,
      type: { type: String, enum: ['text', 'select', 'multiselect', 'number'] },
      options: [String],
      defaultValue: Schema.Types.Mixed
    }]
  };
  ```
- [ ] **Day 3-4:** Create template builder interface:
  - Drag-and-drop section builder
  - Resource library integration
  - Customizable checklist items
  - Milestone tracking setup
  - Template preview functionality
- [ ] **Day 5-6:** Implement care plan assignment system:
  - Assign templates to users
  - Track progress and completion
  - Send reminders and notifications
  - Generate progress reports
- [ ] **Day 7:** Create template sharing and marketplace

**SPECIFIC DELIVERABLES (Due End of Week 11):**
1. **Template Builder:** Visual drag-and-drop template creation tool
2. **Template Library:** Collection of pre-built care plan templates
3. **Assignment System:** Assign and track care plan progress
4. **Progress Tracking:** Visual progress indicators and reporting
5. **Template Sharing:** Marketplace for template sharing

**SUBMISSION REQUIREMENTS:**
- Demo of template creation and assignment process
- Examples of 3 different care plan templates
- Progress tracking dashboard

#### **Week 12: Analytics Dashboard & User Insights**
**SPECIFIC TASKS:**
- [ ] **Day 1-2:** Implement comprehensive analytics tracking:
  ```javascript
  // Required analytics events:
  const AnalyticsEventSchema = {
    userId: String,
    eventType: {
      type: String,
      enum: ['page_view', 'resource_view', 'resource_download', 'search', 'filter_applied', 'favorite_added', 'care_plan_progress']
    },
    metadata: {
      resourceId: String,
      searchQuery: String,
      filters: Schema.Types.Mixed,
      duration: Number,
      deviceType: String,
      userAgent: String
    },
    timestamp: { type: Date, default: Date.now }
  };
  ```
- [ ] **Day 3-4:** Build analytics dashboard:
  - Real-time user activity monitoring
  - Content performance metrics
  - User engagement analytics
  - Search and filter usage patterns
  - Care plan completion rates
- [ ] **Day 5-6:** Create reporting system:
  - Automated weekly/monthly reports
  - Export analytics data (CSV, JSON)
  - Custom date range reports
  - User segmentation analysis
- [ ] **Day 7:** Implement data visualization and insights

**SPECIFIC DELIVERABLES (Due End of Week 12):**
1. **Analytics System:** Comprehensive user behavior tracking
2. **Dashboard:** Real-time analytics dashboard with visualizations
3. **Reporting:** Automated and custom report generation
4. **Insights:** User behavior insights and recommendations
5. **Data Export:** Analytics data export functionality

**SUBMISSION REQUIREMENTS:**
- Live analytics dashboard with real user data
- Sample weekly report with insights
- Data visualization examples

---

### **Phase 4: Integration & Polish (Weeks 13-15)**
**Learning Focus:** DevOps, testing, performance optimization

#### **Week 13: Main Platform API Integration**
**SPECIFIC TASKS:**
- [ ] **Day 1-2:** Implement authentication integration:
  ```javascript
  // Required authentication middleware:
  const validateMainPlatformToken = async (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    try {
      const response = await axios.post('http://main-platform:3000/api/auth/validate', {
        token: token
      });
      req.user = response.data.user;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
  ```
- [ ] **Day 3-4:** Create user profile synchronization:
  - Real-time profile sync with main platform
  - Handle profile updates and deletions
  - Implement conflict resolution for data mismatches
  - Create webhook endpoints for profile changes
- [ ] **Day 5-6:** Implement content recommendation API:
  - Expose recommendation endpoints for main platform
  - Create embedded widget for resource recommendations
  - Implement cross-platform analytics tracking
- [ ] **Day 7:** Set up API versioning and backward compatibility

**SPECIFIC DELIVERABLES (Due End of Week 13):**
1. **Authentication Integration:** Seamless SSO with main platform
2. **Profile Sync:** Real-time user profile synchronization
3. **Recommendation API:** Embedded recommendations for main platform
4. **Webhook System:** Real-time data synchronization
5. **API Documentation:** Complete integration documentation

**SUBMISSION REQUIREMENTS:**
- Integration test results with main platform
- API documentation with example requests/responses
- Demo video showing cross-platform functionality

#### **Week 14: Performance Optimization & Security**
**SPECIFIC TASKS:**
- [ ] **Day 1-2:** Database optimization:
  ```javascript
  // Required database indexes:
  const requiredIndexes = [
    { collection: 'resources', index: { category: 1, isPublished: 1 } },
    { collection: 'resources', index: { tags: 1, targetWeeks: 1 } },
    { collection: 'resources', index: { "$**": "text" } }, // Full-text search
    { collection: 'userinteractions', index: { userId: 1, timestamp: -1 } },
    { collection: 'analytics', index: { eventType: 1, timestamp: -1 } }
  ];
  ```
- [ ] **Day 3-4:** Implement caching strategy:
  - Redis cache for frequently accessed resources
  - CDN configuration for static assets
  - API response caching with proper invalidation
  - Database query result caching
- [ ] **Day 5-6:** Security hardening:
  - Rate limiting implementation (100 requests/minute per user)
  - Input sanitization and validation
  - SQL injection prevention
  - XSS protection
  - CORS configuration
  - Security headers implementation
- [ ] **Day 7:** Load testing and performance benchmarking

**SPECIFIC DELIVERABLES (Due End of Week 14):**
1. **Database Optimization:** All required indexes and query optimization
2. **Caching System:** Redis caching with CDN integration
3. **Security Measures:** Complete security hardening implementation
4. **Performance Results:** Load test results meeting performance targets
5. **Monitoring:** Performance monitoring and alerting setup

**SUBMISSION REQUIREMENTS:**
- Load test results showing >1000 concurrent users
- Security audit results (using tools like OWASP ZAP)
- Performance benchmark report

#### **Week 15: Deployment & Final Documentation**
**SPECIFIC TASKS:**
- [ ] **Day 1-2:** Production deployment setup:
  ```yaml
  # Required Docker configuration:
  version: '3.8'
  services:
    backend:
      build: ./backend
      environment:
        - NODE_ENV=production
        - MONGODB_URI=${MONGODB_URI}
        - REDIS_URL=${REDIS_URL}
      ports:
        - "3001:3001"
    
    frontend:
      build: ./frontend
      environment:
        - REACT_APP_API_URL=${API_URL}
      ports:
        - "3000:3000"
  ```
- [ ] **Day 3-4:** Complete comprehensive documentation:
  - API documentation with OpenAPI/Swagger
  - Deployment guide with step-by-step instructions
  - User manual for content creators
  - Developer setup guide
  - Architecture documentation
- [ ] **Day 5-6:** Final testing and bug fixes:
  - End-to-end testing of all functionality
  - Cross-browser compatibility testing
  - Mobile device testing
  - Accessibility testing (WCAG 2.1 AA compliance)
- [ ] **Day 7:** Final presentation preparation and submission

**SPECIFIC DELIVERABLES (Due End of Week 15):**
1. **Production Deployment:** Live, working application accessible online
2. **Complete Documentation:** All required documentation with examples
3. **Test Results:** Comprehensive testing results and bug reports
4. **Presentation:** Final project presentation with live demo
5. **Source Code:** Clean, well-documented source code with proper Git history

**SUBMISSION REQUIREMENTS:**
- Live application URL with full functionality
- Complete documentation package
- Final presentation video (15-20 minutes)
- GitHub repository with proper README and documentation

---

\newpage

# EVALUATION CRITERIA & GRADING RUBRIC

## **Project Evaluation Overview**

This project will be evaluated based on technical implementation, code quality, documentation, and integration success. The total project is worth 1000 points distributed across the following categories:

### **Grading Distribution**

| Category | Weight | Points | Description |
|----------|--------|--------|-------------|
| **Technical Implementation** | 40% | 400 pts | Code quality, functionality, architecture |
| **Integration & API Design** | 25% | 250 pts | Main platform integration, API contracts |
| **Testing & Quality Assurance** | 15% | 150 pts | Test coverage, performance, security |
| **Documentation & Communication** | 10% | 100 pts | Code docs, API docs, user guides |
| **Project Management** | 10% | 100 pts | Timeline adherence, weekly deliverables |

---

## **Detailed Evaluation Criteria**

### **Technical Implementation (400 points)**

#### **Backend Development (200 points)**
- **API Endpoints (50 pts):**
  - All required endpoints implemented and functional
  - Proper HTTP status codes and error handling
  - Input validation and sanitization
  - **Excellent (45-50):** All endpoints work flawlessly with comprehensive error handling
  - **Good (35-44):** Most endpoints work with minor issues
  - **Satisfactory (25-34):** Basic endpoints work but missing some features
  - **Needs Improvement (<25):** Significant missing functionality

- **Database Design (50 pts):**
  - Proper schema design with relationships
  - Efficient queries and indexing
  - Data validation and constraints
  - **Excellent (45-50):** Optimized schema with proper indexing and validation
  - **Good (35-44):** Good schema with minor optimization opportunities
  - **Satisfactory (25-34):** Basic schema that works but could be improved
  - **Needs Improvement (<25):** Poor schema design affecting functionality

- **Authentication & Security (50 pts):**
  - Proper JWT integration with main platform
  - Input sanitization and validation
  - Security headers and CORS configuration
  - **Excellent (45-50):** Comprehensive security implementation
  - **Good (35-44):** Good security with minor gaps
  - **Satisfactory (25-34):** Basic security measures
  - **Needs Improvement (<25):** Security vulnerabilities present

- **Code Quality (50 pts):**
  - Clean, readable, and well-structured code
  - Proper error handling and logging
  - Following JavaScript/Node.js best practices
  - **Excellent (45-50):** Professional-quality code
  - **Good (35-44):** Good code with minor improvements needed
  - **Satisfactory (25-34):** Functional code but could be cleaner
  - **Needs Improvement (<25):** Poor code quality

#### **Frontend Development (200 points)**
- **User Interface (60 pts):**
  - Responsive design working on all devices
  - Professional appearance and usability
  - Accessibility compliance (WCAG 2.1 AA)
  - **Excellent (54-60):** Outstanding UI/UX with full accessibility
  - **Good (42-53):** Good UI with minor usability issues
  - **Satisfactory (30-41):** Basic functional interface
  - **Needs Improvement (<30):** Poor user experience

- **Component Architecture (60 pts):**
  - Proper React component structure
  - Reusable and modular components
  - State management implementation
  - **Excellent (54-60):** Excellent component architecture
  - **Good (42-53):** Good structure with minor improvements
  - **Satisfactory (30-41):** Basic components that work
  - **Needs Improvement (<30):** Poor component design

- **API Integration (40 pts):**
  - Proper error handling for API calls
  - Loading states and user feedback
  - Data flow and state synchronization
  - **Excellent (36-40):** Seamless API integration
  - **Good (28-35):** Good integration with minor issues
  - **Satisfactory (20-27):** Basic API integration
  - **Needs Improvement (<20):** Poor API handling

- **Performance & Optimization (40 pts):**
  - Page load times <3 seconds
  - Optimized images and assets
  - Proper caching implementation
  - **Excellent (36-40):** Excellent performance optimization
  - **Good (28-35):** Good performance with room for improvement
  - **Satisfactory (20-27):** Acceptable performance
  - **Needs Improvement (<20):** Poor performance

### **Integration & API Design (250 points)**

#### **Main Platform Integration (150 points)**
- **Authentication Integration (50 pts):**
  - Seamless SSO with main platform
  - Proper token validation and refresh
  - User session synchronization
  - **Requirements:** Must work with main platform auth system

- **Data Synchronization (50 pts):**
  - Real-time profile sync
  - Webhook implementation
  - Conflict resolution handling
  - **Requirements:** No data inconsistencies between platforms

- **API Endpoints for Integration (50 pts):**
  - Recommendation API for main platform
  - Analytics sharing endpoints
  - Proper API versioning
  - **Requirements:** All integration points functional

#### **API Design & Documentation (100 points)**
- **API Design Quality (40 pts):**
  - RESTful design principles
  - Consistent naming conventions
  - Proper HTTP methods and status codes
  - **Requirements:** APIs follow REST best practices

- **Documentation Completeness (40 pts):**
  - OpenAPI/Swagger documentation
  - Example requests and responses
  - Error code documentation
  - **Requirements:** Complete API documentation

- **API Performance (20 pts):**
  - Response times <500ms
  - Proper pagination and filtering
  - Efficient query design
  - **Requirements:** Meet performance targets

### **Testing & Quality Assurance (150 points)**

#### **Test Coverage (100 points)**
- **Backend Testing (60 pts):**
  - Unit tests for all API endpoints
  - Integration tests for database operations
  - >90% code coverage
  - **Requirements:** Comprehensive test suite with high coverage

- **Frontend Testing (40 pts):**
  - Component testing with React Testing Library
  - End-to-end testing for critical flows
  - >80% component coverage
  - **Requirements:** Functional UI testing

#### **Performance & Security (50 points)**
- **Performance Testing (25 pts):**
  - Load testing results
  - Performance benchmarks met
  - Database query optimization
  - **Requirements:** System handles >1000 concurrent users

- **Security Validation (25 pts):**
  - Security audit results
  - Vulnerability scanning
  - Secure coding practices
  - **Requirements:** No critical security vulnerabilities

### **Documentation & Communication (100 points)**

#### **Code Documentation (40 points)**
- Comprehensive README files
- Inline code comments
- Function and class documentation
- **Requirements:** Clear setup and usage instructions

#### **API Documentation (30 points)**
- Complete API documentation
- Integration examples
- Error handling guides
- **Requirements:** Documentation enables easy integration

#### **User Documentation (30 points)**
- User manual for content creators
- Admin interface guide
- Troubleshooting documentation
- **Requirements:** Non-technical users can use the system

### **Project Management (100 points)**

#### **Timeline Adherence (50 points)**
- Weekly deliverable completion
- Milestone achievement
- Communication with main team
- **Excellent (45-50):** All deadlines met with quality work
- **Good (35-44):** Most deadlines met with minor delays
- **Satisfactory (25-34):** Some delays but caught up
- **Needs Improvement (<25):** Significant delays

#### **Professional Development (50 points)**
- Code review participation
- Learning documentation
- Problem-solving approach
- **Excellent (45-50):** Proactive learning and problem-solving
- **Good (35-44):** Good progress with some guidance
- **Satisfactory (25-34):** Adequate progress
- **Needs Improvement (<25):** Requires significant support

---

## **Weekly Evaluation Checkpoints**

### **Weekly Submission Requirements**
Each week, Andrew must submit:
1. **Progress Report:** What was completed, challenges faced, time spent
2. **Demo Video:** 3-5 minute demonstration of new functionality
3. **Code Review:** GitHub commits with proper commit messages
4. **Next Week Plan:** Specific tasks and deliverables for upcoming week

### **Weekly Evaluation Criteria (20 points each week)**
- **Completion (10 pts):** Percentage of planned tasks completed
- **Quality (5 pts):** Quality of deliverables submitted
- **Communication (5 pts):** Clarity of progress report and demo

---

## **Final Project Evaluation**

### **Final Submission Requirements**
- **Live Application:** Deployed and accessible online
- **Source Code:** Complete GitHub repository with proper documentation
- **Presentation:** 15-20 minute presentation with live demo
- **Documentation Package:** All required documentation
- **Integration Demo:** Working integration with main LUNARA platform

### **Final Grade Calculation**
```
Final Grade = (Technical Implementation * 0.4) + 
              (Integration & API * 0.25) + 
              (Testing & QA * 0.15) + 
              (Documentation * 0.1) + 
              (Project Management * 0.1)
```

### **Grade Scale**
- **A (90-100%):** Exceptional work meeting all requirements with high quality
- **B (80-89%):** Good work meeting most requirements with minor issues
- **C (70-79%):** Satisfactory work meeting basic requirements
- **D (60-69%):** Below expectations with significant issues
- **F (<60%):** Failing to meet basic project requirements

---

\newpage

# TESTING STRATEGY & QUALITY ASSURANCE

## Comprehensive Testing Framework

### **Unit Testing Requirements**

#### **Backend Unit Testing:**
**Framework:** Jest + Supertest  
**Coverage Target:** >90% code coverage  

**Required Test Categories:**
```javascript
// API Endpoint Testing
describe('Resource API Endpoints', () => {
  describe('POST /api/resources', () => {
    test('should create resource with valid data', async () => {
      const resourceData = {
        title: 'Test Resource',
        description: 'Test description',
        category: 'nutrition',
        difficulty: 'beginner',
        targetWeeks: [1, 2, 3]
      };
      
      const response = await request(app)
        .post('/api/resources')
        .set('Authorization', `Bearer ${authToken}`)
        .send(resourceData)
        .expect(201);
      
      expect(response.body.data.title).toBe(resourceData.title);
      expect(response.body.data.status).toBe('draft');
    });
    
    test('should reject resource with invalid category', async () => {
      const invalidData = {
        title: 'Test Resource',
        category: 'invalid-category'
      };
      
      await request(app)
        .post('/api/resources')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidData)
        .expect(400);
    });
  });
  
  describe('GET /api/resources', () => {
    test('should return paginated resources', async () => {
      const response = await request(app)
        .get('/api/resources?page=1&limit=10')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
      
      expect(response.body.data.pagination).toBeDefined();
      expect(response.body.data.resources).toHaveLength(10);
    });
  });
});

// Business Logic Testing
describe('Recommendation Algorithm', () => {
  test('should prioritize resources matching user preferences', () => {
    const userProfile = {
      preferredCategories: ['nutrition', 'exercise'],
      postpartumWeek: 6,
      experienceLevel: 'beginner'
    };
    
    const resources = [
      { category: 'nutrition', difficulty: 'beginner', targetWeeks: [5, 6, 7] },
      { category: 'mental-health', difficulty: 'advanced', targetWeeks: [1, 2] }
    ];
    
    const recommendations = generateRecommendations(userProfile, resources);
    expect(recommendations[0].category).toBe('nutrition');
  });
});

// Database Model Testing
describe('Resource Model', () => {
  test('should validate required fields', async () => {
    const resource = new Resource({});
    
    const validationError = resource.validateSync();
    expect(validationError.errors.title).toBeDefined();
    expect(validationError.errors.description).toBeDefined();
  });
  
  test('should enforce category enum values', async () => {
    const resource = new Resource({
      title: 'Test',
      description: 'Test desc',
      category: 'invalid-category'
    });
    
    const validationError = resource.validateSync();
    expect(validationError.errors.category).toBeDefined();
  });
});
```

#### **Frontend Unit Testing:**
**Framework:** React Testing Library + Jest  
**Coverage Target:** >80% component coverage  

**Required Test Categories:**
```javascript
// Component Testing
describe('ResourceCard Component', () => {
  const mockResource = {
    _id: '123',
    title: 'Test Resource',
    description: 'Test description',
    category: 'nutrition',
    thumbnailUrl: 'test.jpg'
  };
  
  test('renders resource information correctly', () => {
    render(<ResourceCard resource={mockResource} />);
    
    expect(screen.getByText('Test Resource')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test.jpg');
  });
  
  test('calls onFavorite when favorite button clicked', () => {
    const mockOnFavorite = jest.fn();
    render(<ResourceCard resource={mockResource} onFavorite={mockOnFavorite} />);
    
    fireEvent.click(screen.getByRole('button', { name: /favorite/i }));
    expect(mockOnFavorite).toHaveBeenCalledWith('123');
  });
});

// Hook Testing
describe('useResourceFilters Hook', () => {
  test('should update filters correctly', () => {
    const { result } = renderHook(() => useResourceFilters());
    
    act(() => {
      result.current.setCategory('nutrition');
    });
    
    expect(result.current.filters.category).toBe('nutrition');
  });
});

// API Integration Testing
describe('API Integration', () => {
  test('should handle API errors gracefully', async () => {
    server.use(
      rest.get('/api/resources', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'Server error' }));
      })
    );
    
    render(<ResourceList />);
    
    await waitFor(() => {
      expect(screen.getByText(/error loading resources/i)).toBeInTheDocument();
    });
  });
});
```

### **Integration Testing Requirements**

#### **API Integration Testing:**
**Framework:** Jest + Supertest + Test Database  
**Coverage:** All API endpoints with realistic data scenarios  

```javascript
describe('Integration Tests', () => {
  beforeEach(async () => {
    await setupTestDatabase();
    await seedTestData();
  });
  
  afterEach(async () => {
    await cleanupTestDatabase();
  });
  
  describe('Resource Creation Workflow', () => {
    test('complete resource creation and publishing flow', async () => {
      // Create resource
      const createResponse = await request(app)
        .post('/api/resources')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(validResourceData);
      
      const resourceId = createResponse.body.data._id;
      
      // Upload file
      await request(app)
        .post(`/api/upload/resource/${resourceId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .attach('file', 'test-files/sample.pdf')
        .expect(200);
      
      // Submit for review
      await request(app)
        .patch(`/api/resources/${resourceId}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'submitted' })
        .expect(200);
      
      // Approve resource
      await request(app)
        .patch(`/api/resources/${resourceId}/status`)
        .set('Authorization', `Bearer ${reviewerToken}`)
        .send({ status: 'approved' })
        .expect(200);
      
      // Verify published resource is accessible
      const publicResponse = await request(app)
        .get(`/api/resources/${resourceId}`)
        .set('Authorization', `Bearer ${clientToken}`)
        .expect(200);
      
      expect(publicResponse.body.data.status).toBe('published');
    });
  });
  
  describe('User Interaction Tracking', () => {
    test('tracks user interactions and updates recommendations', async () => {
      const userId = 'test-user-id';
      const resourceId = 'test-resource-id';
      
      // Track view interaction
      await request(app)
        .post('/api/interactions')
        .set('Authorization', `Bearer ${clientToken}`)
        .send({
          resourceId,
          action: 'view',
          duration: 120
        });
      
      // Get updated recommendations
      const recResponse = await request(app)
        .get(`/api/users/${userId}/recommendations`)
        .set('Authorization', `Bearer ${clientToken}`)
        .expect(200);
      
      expect(recResponse.body.data.length).toBeGreaterThan(0);
    });
  });
});
```

### **End-to-End Testing Requirements**

#### **Critical User Flows:**
**Framework:** Playwright or Cypress  
**Coverage:** Primary user journeys from login to task completion  

```javascript
// E2E Test Examples
describe('Resource Library E2E Tests', () => {
  test('Client can discover and download resources', async () => {
    // Login as client
    await page.goto('/login');
    await page.fill('[data-testid=email]', 'client@test.com');
    await page.fill('[data-testid=password]', 'password123');
    await page.click('[data-testid=login-button]');
    
    // Navigate to resource library
    await page.click('[data-testid=resource-library-nav]');
    await expect(page).toHaveURL('/resources');
    
    // Search for resources
    await page.fill('[data-testid=search-input]', 'nutrition');
    await page.press('[data-testid=search-input]', 'Enter');
    
    // Filter by category
    await page.click('[data-testid=category-filter]');
    await page.click('[data-testid=nutrition-option]');
    
    // View resource details
    await page.click('[data-testid=resource-card]:first-child');
    await expect(page.locator('[data-testid=resource-title]')).toBeVisible();
    
    // Download resource
    await page.click('[data-testid=download-button]');
    
    // Verify download started
    const downloadPromise = page.waitForEvent('download');
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain('.pdf');
  });
  
  test('Doula can create and publish content', async () => {
    // Login as doula
    await page.goto('/login');
    await page.fill('[data-testid=email]', 'doula@test.com');
    await page.fill('[data-testid=password]', 'password123');
    await page.click('[data-testid=login-button]');
    
    // Navigate to content creation
    await page.click('[data-testid=create-content-nav]');
    
    // Fill content form
    await page.fill('[data-testid=title-input]', 'E2E Test Resource');
    await page.fill('[data-testid=description-input]', 'Test description');
    await page.selectOption('[data-testid=category-select]', 'nutrition');
    
    // Use rich text editor
    await page.click('[data-testid=content-editor]');
    await page.type('[data-testid=content-editor]', 'This is test content.');
    
    // Upload file
    await page.setInputFiles('[data-testid=file-upload]', 'test-files/sample.pdf');
    
    // Save as draft
    await page.click('[data-testid=save-draft-button]');
    await expect(page.locator('[data-testid=success-message]')).toBeVisible();
    
    // Submit for review
    await page.click('[data-testid=submit-review-button]');
    await expect(page.locator('[data-testid=review-submitted-message]')).toBeVisible();
  });
});
```

### **Performance Testing Requirements**

#### **Load Testing Specifications:**
**Tools:** K6 or Artillery  
**Targets:**
- 1000 concurrent users
- API response times <500ms under load
- Database query performance <200ms
- File upload completion within 30 seconds

```javascript
// K6 Load Testing Script
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // Ramp up
    { duration: '5m', target: 1000 }, // Peak load
    { duration: '2m', target: 0 }, // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests under 500ms
    http_req_failed: ['rate<0.01'], // Error rate under 1%
  },
};

export default function () {
  // Test resource listing
  let response = http.get('http://api.lunara-resources.com/api/resources?page=1&limit=20', {
    headers: { Authorization: `Bearer ${__ENV.TEST_TOKEN}` },
  });
  
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
    'has resources': (r) => JSON.parse(r.body).data.resources.length > 0,
  });
  
  // Test search functionality
  response = http.get('http://api.lunara-resources.com/api/resources?search=nutrition', {
    headers: { Authorization: `Bearer ${__ENV.TEST_TOKEN}` },
  });
  
  check(response, {
    'search status is 200': (r) => r.status === 200,
    'search response time < 500ms': (r) => r.timings.duration < 500,
  });
  
  sleep(1);
}
```

### **Security Testing Requirements**

#### **Security Test Categories:**
1. **Authentication & Authorization Testing**
2. **Input Validation & XSS Testing**
3. **SQL Injection Testing**
4. **File Upload Security Testing**
5. **API Security Testing**

```javascript
// Security Testing Examples
describe('Security Tests', () => {
  describe('Authentication Security', () => {
    test('should reject invalid JWT tokens', async () => {
      await request(app)
        .get('/api/resources')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });
    
    test('should reject expired tokens', async () => {
      const expiredToken = jwt.sign(
        { userId: 'test-user' },
        process.env.JWT_SECRET,
        { expiresIn: '-1h' }
      );
      
      await request(app)
        .get('/api/resources')
        .set('Authorization', `Bearer ${expiredToken}`)
        .expect(401);
    });
  });
  
  describe('Input Validation Security', () => {
    test('should sanitize XSS attempts in content', async () => {
      const maliciousContent = '<script>alert("xss")</script>';
      
      const response = await request(app)
        .post('/api/resources')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Test',
          description: 'Test',
          content: maliciousContent,
          category: 'nutrition'
        });
      
      expect(response.body.data.content).not.toContain('<script>');
    });
  });
  
  describe('File Upload Security', () => {
    test('should reject executable files', async () => {
      await request(app)
        .post('/api/upload/resource')
        .set('Authorization', `Bearer ${adminToken}`)
        .attach('file', Buffer.from('test'), 'malicious.exe')
        .expect(400);
    });
  });
});
```

---

\newpage

# SUCCESS METRICS

### **Technical Metrics**
- 90%+ test coverage across frontend and backend
- <500ms API response times
- 99.9% uptime
- Mobile-responsive design (Lighthouse score >90)

### **Business Metrics**
- Content library with 100+ resources across all categories
- Personalized recommendations with >70% relevance score
- User engagement metrics (time spent, return visits)
- Integration success with main platform

### **Learning Outcomes**
- Full-stack development proficiency
- API design and integration experience
- Database design and optimization
- Cloud deployment and DevOps practices
- Modern JavaScript/TypeScript development
- Testing and quality assurance

---

\newpage

# COMPLEXITY MANAGEMENT FOR NEWER DEVELOPER

### **Simplified Starting Points**
1. **Start with Static Content:** Begin with simple static resources before implementing personalization
2. **Progressive Enhancement:** Build basic features first, add complexity incrementally
3. **Template Usage:** Provide code templates and scaffolding for common patterns
4. **Mentorship Integration:** Regular check-ins with main team for guidance

### **Learning Resources Provided**
- Comprehensive setup documentation
- Code review process with main team
- Regular technical mentorship sessions
- Access to main platform codebase for reference patterns

### **Risk Mitigation**
- Modular architecture allows for independent development
- Clear API contracts defined upfront
- Fallback to simpler implementations if needed
- Integration points well-defined and testable

---

\newpage

# INTEGRATION WITH MAIN PLATFORM

### **API Contracts**
```typescript
// User Profile Sync
GET /api/users/{userId}/profile
POST /api/users/{userId}/preferences

// Content Recommendations  
GET /api/recommendations/{userId}
POST /api/content/{contentId}/interaction

// Care Plan Integration
GET /api/care-plans/templates
POST /api/care-plans/{planId}/resources
```

### **Data Sharing**
- User authentication tokens
- Profile and preference data
- Content interaction analytics
- Care plan assignments

### **Deployment Strategy**
- Independent service deployment
- Environment configuration for integration
- API versioning for compatibility
- Monitoring and logging integration

---

\newpage

# DELIVERABLES

### **Code Deliverables**
- Complete source code repository
- API documentation (Swagger/OpenAPI)
- Deployment configuration (Docker, CI/CD)
- Comprehensive test suite

### **Documentation Deliverables**
- Technical architecture document
- API integration guide
- User manual for content management
- Deployment and maintenance guide

### **Presentation Deliverables**
- Live demonstration of functionality
- Integration showcase with main platform
- Performance and metrics presentation
- Future enhancement roadmap

---

---

\newpage

# IMMEDIATE GETTING STARTED CHECKLIST

## **Pre-Development Setup (Complete First)**

### **Day 1: Environment & Accounts Setup**
- [ ] **Install Required Software:**
  - [ ] Node.js v18+ from [nodejs.org](https://nodejs.org)
  - [ ] Git from [git-scm.com](https://git-scm.com)
  - [ ] VS Code from [code.visualstudio.com](https://code.visualstudio.com)
  - [ ] MongoDB Compass from [mongodb.com/compass](https://mongodb.com/compass)
  - [ ] Postman from [postman.com](https://postman.com)

- [ ] **Create Required Accounts:**
  - [ ] GitHub account (if not already have one)
  - [ ] MongoDB Atlas account (free tier) at [mongodb.com/atlas](https://mongodb.com/atlas)
  - [ ] Cloudinary account (free tier) at [cloudinary.com](https://cloudinary.com)
  - [ ] Render account (free tier) at [render.com](https://render.com)
  - [ ] Vercel account (free tier) at [vercel.com](https://vercel.com)

- [ ] **Install VS Code Extensions:**
  - [ ] ES7+ React/Redux/React-Native snippets
  - [ ] Prettier - Code formatter
  - [ ] ESLint
  - [ ] GitLens
  - [ ] Thunder Client (API testing)
  - [ ] Auto Rename Tag
  - [ ] Bracket Pair Colorizer
  - [ ] Material Icon Theme

### **Day 2: Project Repository Setup**
- [ ] **Create GitHub Repository:**
  ```bash
  # Create new repository on GitHub named: lunara-resource-library-service
  # Clone to local machine:
  git clone https://github.com/YOUR_USERNAME/lunara-resource-library-service.git
  cd lunara-resource-library-service
  ```

- [ ] **Create Project Structure:** (Copy this exact structure)
  ```
  lunara-resource-library-service/
  ├── README.md
  ├── .gitignore
  ├── docker-compose.yml
  ├── backend/
  │   ├── src/
  │   │   ├── models/
  │   │   ├── routes/
  │   │   ├── middleware/
  │   │   ├── services/
  │   │   ├── utils/
  │   │   └── server.js
  │   ├── tests/
  │   ├── package.json
  │   └── .env.example
  ├── frontend/
  │   ├── src/
  │   │   ├── components/
  │   │   ├── pages/
  │   │   ├── services/
  │   │   ├── hooks/
  │   │   ├── utils/
  │   │   └── App.tsx
  │   ├── public/
  │   ├── package.json
  │   └── .env.example
  └── docs/
      ├── api/
      ├── setup/
      └── user-guide/
  ```

- [ ] **Initial Commit:**
  ```bash
  git add .
  git commit -m "Initial project structure setup"
  git push origin main
  ```

### **Day 3: Backend Foundation**
- [ ] **Initialize Backend:**
  ```bash
  cd backend
  npm init -y
  npm install express mongoose cors dotenv helmet morgan joi
  npm install --save-dev jest supertest nodemon
  ```

- [ ] **Create Basic Server (backend/src/server.js):**
  ```javascript
  const express = require('express');
  const cors = require('cors');
  const helmet = require('helmet');
  const morgan = require('morgan');
  require('dotenv').config();

  const app = express();
  const PORT = process.env.PORT || 3001;

  // Middleware
  app.use(helmet());
  app.use(cors());
  app.use(morgan('combined'));
  app.use(express.json());

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'OK', 
      message: 'LUNARA Resource Library Service is running',
      timestamp: new Date().toISOString()
    });
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  ```

- [ ] **Test Server:**
  ```bash
  npm run dev  # (after adding script to package.json)
  # Visit http://localhost:3001/health
  # Should see JSON response
  ```

### **Day 4: Database Connection**
- [ ] **Create MongoDB Atlas Cluster:**
  - [ ] Log into MongoDB Atlas
  - [ ] Create new cluster (free tier)
  - [ ] Create database user
  - [ ] Get connection string
  - [ ] Whitelist IP address (0.0.0.0/0 for development)

- [ ] **Add Database Connection:**
  ```javascript
  // Add to server.js
  const mongoose = require('mongoose');

  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
  ```

- [ ] **Create .env file:**
  ```
  MONGODB_URI=your_mongodb_connection_string
  PORT=3001
  NODE_ENV=development
  ```

### **Day 5: Frontend Foundation**
- [ ] **Initialize Frontend:**
  ```bash
  cd ../frontend
  npm create vite@latest . -- --template react-ts
  npm install
  npm install react-router-dom axios tailwindcss
  npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
  ```

- [ ] **Configure Tailwind CSS:**
  ```bash
  npx tailwindcss init -p
  ```

- [ ] **Test Frontend:**
  ```bash
  npm run dev
  # Visit http://localhost:3000
  # Should see React app running
  ```

---

## **Weekly Check-in Protocol**

### **Every Friday at 5 PM:**
1. **Create Weekly Report Document:**
   ```markdown
   # Week [X] Progress Report - Andrew Mack
   ## Completed Tasks:
   - [ ] Task 1 (with time spent)
   - [ ] Task 2 (with time spent)
   
   ## Challenges Faced:
   - Challenge 1 and how resolved
   
   ## Next Week Goals:
   - [ ] Specific task 1
   - [ ] Specific task 2
   
   ## Questions for Team:
   - Question 1
   ```

2. **Record Demo Video (3-5 minutes):**
   - Show new functionality working
   - Explain any challenges faced
   - Upload to GitHub as release or Google Drive

3. **Commit All Work:**
   ```bash
   git add .
   git commit -m "Week [X] completion: [brief description]"
   git push origin main
   ```

---

## **Emergency Contact & Support**

### **When You're Stuck (Don't spend more than 2 hours on a problem):**
1. **Discord:** Post in team channel with:
   - Specific problem description
   - What you've tried
   - Error messages (screenshots)
   - Code snippet causing issue

2. **GitHub Issues:** Create issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Your environment details

3. **Weekly 1:1 Meeting:** Whenever possible, get with Carter or Owen:
   - Progress review
   - Technical questions
   - Architecture guidance
   - Integration planning

---

## **Success Checkpoints**

### **Week 1 Success Criteria:**
- [ ] All development tools installed and working
- [ ] GitHub repository created with proper structure
- [ ] Basic Express server running and responding to health checks
- [ ] MongoDB connection established
- [ ] React frontend displaying default page
- [ ] First weekly report submitted on time

### **Red Flags (Contact team immediately if any occur):**
- Unable to install required software
- Cannot create GitHub repository
- Server won't start after following instructions
- Database connection failing after multiple attempts
- More than 4 hours spent on any single setup task

---

This project provides substantial learning opportunities while creating real value for the LUNARA platform. The modular design allows Andrew to develop independently while ensuring seamless integration with the main system.

**REMEMBER: Start with the Getting Started Checklist above - complete each item before moving to the weekly timeline!**
