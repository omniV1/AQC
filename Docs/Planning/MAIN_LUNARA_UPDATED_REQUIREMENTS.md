---
title: "LUNARA Main Platform Requirements"
subtitle: "Updated Requirements with Resource Library Service Extracted"
author: 
  - Owen Lindsey
  - Carter Wright  
  - Andrew Mack
instructor: "Professor Amr Elchouemi"
revision: "1.0"
date: "September 20, 2025"
subject: "Software Engineering - Updated Requirements"
keywords: [LUNARA, Platform Requirements, Microservices, API Integration, React, Node.js]
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
header-left: "LUNARA Main Platform"
header-right: "Updated Requirements"
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

# OVERVIEW OF CHANGES

### Overview of Changes

With Andrew Mack developing the Resource Library Service as a standalone project, the main LUNARA platform requirements have been updated to reflect:

1. **Extracted Features:** Resource library functionality moved to separate service
2. **Integration Points:** New API integration requirements for resource service
3. **Simplified Scope:** Reduced complexity for main platform development
4. **Enhanced Architecture:** Microservices approach with clear service boundaries

---

\newpage

# MODIFIED FUNCTIONAL REQUIREMENTS

### **~~FR7: Personalized Resource Library~~ → EXTRACTED TO SEPARATE SERVICE**

**Status:** **[REMOVED FROM MAIN PLATFORM]**  
**Replacement:** Integration with Resource Library Service API  

**New Requirement FR7-Integration:**
- **Description:** Integrate with external Resource Library Service for content delivery
- **Acceptance Criteria:**
  - API integration for fetching personalized content recommendations
  - User profile synchronization with resource service
  - Content interaction tracking and analytics sharing
  - Embedded resource viewer within main platform
  - Single sign-on integration with resource service

---

### **FR10: Care Plan Template System → MODIFIED SCOPE**

**Status:** **[SIMPLIFIED - BASIC TEMPLATES ONLY]**  
**Original Scope:** Full template system with customization  
**Updated Scope:** Basic care plan creation with resource integration  

**Modified Acceptance Criteria:**
- Pre-built care plan templates for common scenarios
- Basic care plan assignment to clients
- Integration with Resource Library Service for template content
- ~~Drag-and-drop template builder interface~~ **[MOVED TO RESOURCE SERVICE]**
- ~~Template sharing between doulas~~ **[MOVED TO RESOURCE SERVICE]**
- Progress tracking against care plan milestones

---

### **~~FR11: Blog Publishing Platform~~ → EXTRACTED TO SEPARATE SERVICE**

**Status:** **[REMOVED FROM MAIN PLATFORM]**  
**Replacement:** Integration with Resource Library Service content management  

**New Requirement FR11-Integration:**
- **Description:** Display and manage blog content from Resource Library Service
- **Acceptance Criteria:**
  - Display blog posts from resource service on public website
  - Content preview and sharing capabilities
  - SEO optimization for blog content display
  - Comment and interaction tracking

---

### **FR12: Digital Journaling Platform → DEFERRED**

**Status:** **[MOVED TO FUTURE RELEASE]**  
**Justification:** Reduced scope allows focus on core platform features  

---

### **~~FR13: New Mama Horoscope & Daily Insights~~ → EXTRACTED TO SEPARATE SERVICE**

**Status:** **[REMOVED FROM MAIN PLATFORM]**  
**Replacement:** Integration with Resource Library Service personalized content  

**New Requirement FR13-Integration:**
- **Description:** Display personalized daily content from Resource Library Service
- **Acceptance Criteria:**
  - Daily content recommendations in user dashboard
  - Personalized content based on postpartum phase
  - Content interaction and engagement tracking

---

\newpage

# NEW INTEGRATION REQUIREMENTS

### **FR-INT1: Resource Service Authentication Integration**
**Priority:** High  
**Description:** Seamless authentication between main platform and resource service  

**Acceptance Criteria:**
- JWT token sharing for single sign-on
- User session synchronization
- Role-based access control across services
- Secure API communication with resource service

### **FR-INT2: User Profile Synchronization**
**Priority:** High  
**Description:** Real-time user profile data sharing with resource service  

**Acceptance Criteria:**
- Automatic profile updates to resource service
- Postpartum phase tracking synchronization
- Preference and settings sharing
- Data consistency across services

### **FR-INT3: Content Integration & Display**
**Priority:** Medium  
**Description:** Embedded content viewing and interaction within main platform  

**Acceptance Criteria:**
- Embedded resource viewer components
- Content search and filtering from main dashboard
- User favorites and collections display
- Content recommendation integration

### **FR-INT4: Analytics and Tracking Integration**
**Priority:** Medium  
**Description:** Unified analytics across main platform and resource service  

**Acceptance Criteria:**
- User interaction tracking across services
- Unified reporting dashboard
- Content engagement analytics
- Performance metrics sharing

---

\newpage

# UPDATED SPRINT PLANNING

### **Sprint 2-3: Core Platform Features (Updated Scope)**
**Reduced Complexity:** With resource library extracted, focus on core functionality

**New Priorities:**
1. **Appointment Scheduling & Management (FR6)** - Full implementation
2. **Real-time Secure Messaging (FR5)** - Enhanced focus
3. **Daily Check-ins & Mood Tracking (FR8)** - Promoted priority
4. **Basic Resource Integration** - Integration with Andrew's service

### **Sprint 4-5: Integration & Enhancement**
**Enhanced Focus:** Deep integration with resource service

**Priorities:**
1. **Resource Service Integration (FR-INT1-4)** - Complete integration
2. **Doula Client Management Dashboard (FR9)** - Enhanced features
3. **Care Plan Templates (FR10 - Simplified)** - Basic implementation
4. **Platform Optimization** - Performance and user experience

### **Sprint 6-7: Advanced Features & Polish**
**Strategic Focus:** Platform maturity and market readiness

**Priorities:**
1. **Advanced Messaging Features** - File sharing, group messaging
2. **Appointment Enhancements** - Calendar integration, reminders
3. **Mobile App Development** - Native mobile experience
4. **Performance Optimization** - Scalability and reliability

---

\newpage

# BENEFITS OF EXTRACTION

### **For Main Platform Development**
- **Reduced Complexity:** 40% reduction in backend features to develop
- **Faster Development:** Focus on core user journeys and platform stability
- **Specialized Expertise:** Resource management handled by dedicated service
- **Scalability:** Independent scaling of content-heavy features

### **For Overall Project**
- **Parallel Development:** Two teams working simultaneously
- **Risk Distribution:** Reduced single points of failure
- **Expertise Development:** Team members gain microservices experience
- **Future Flexibility:** Easier to enhance or replace content management

### **For Andrew's Learning**
- **Full Ownership:** Complete responsibility for significant platform component
- **Modern Architecture:** Experience with microservices and API design
- **Business Impact:** Direct contribution to platform success
- **Portfolio Project:** Substantial standalone project for career development

---

\newpage

# TECHNICAL INTEGRATION ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────┐
│                    MAIN LUNARA PLATFORM                    │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐│
│  │   Client    │ │   Doula     │ │      Appointment        ││
│  │ Dashboard   │ │ Dashboard   │ │     Management          ││
│  └─────────────┘ └─────────────┘ └─────────────────────────┘│
│                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐│
│  │ Messaging   │ │ User Mgmt   │ │    Resource Display     ││
│  │  Service    │ │  Service    │ │   (Integrated Views)    ││
│  └─────────────┘ └─────────────┘ └─────────────────────────┘│
└─────────────────────────┬───────────────────────────────────┘
                          │ API Integration
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              ANDREW'S RESOURCE LIBRARY SERVICE             │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐│
│  │  Content    │ │Personalized │ │     Template            ││
│  │ Management  │ │Recommenda-  │ │     System              ││
│  │             │ │   tions     │ │                         ││
│  └─────────────┘ └─────────────┘ └─────────────────────────┘│
│                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐│
│  │    Blog     │ │   Daily     │ │      Resource           ││
│  │ Publishing  │ │ Insights    │ │      Library            ││
│  └─────────────┘ └─────────────┘ └─────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

\newpage

# TIMELINE COORDINATION

### **Parallel Development Schedule**

**Weeks 1-4: Foundation Phase**
- Main Platform: Authentication, basic user management
- Resource Service: Project setup, basic content management

**Weeks 5-8: Core Development**
- Main Platform: Messaging, appointments, user dashboards
- Resource Service: Personalization engine, content delivery

**Weeks 9-12: Integration Phase**
- Main Platform: API integration points, embedded resource views
- Resource Service: Template system, advanced features

**Weeks 13-16: Enhancement & Testing**
- Main Platform: Advanced features, mobile optimization
- Resource Service: Performance optimization, final integration

**Weeks 17-20: Final Integration & Launch**
- Both Teams: End-to-end testing, performance validation, launch preparation

---

\newpage

# SUCCESS METRICS (UPDATED)

### **Main Platform Metrics**
- User registration and engagement rates
- Appointment booking and completion rates
- Messaging system usage and response times
- Overall platform performance and uptime

### **Integration Success Metrics**
- Resource service API response times (<500ms)
- User experience seamlessness across services
- Data synchronization accuracy (99.9%+)
- Zero authentication or authorization issues

### **Combined Platform Metrics**
- End-to-end user journey completion rates
- Content engagement and utilization rates
- Platform scalability under load
- User satisfaction and Net Promoter Score

---

This updated architecture provides a clear path for both the main platform development and Andrew's specialized resource service, ensuring both projects contribute effectively to the overall LUNARA platform success while providing substantial learning opportunities for all team members.
