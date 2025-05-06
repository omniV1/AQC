# Lunara Backend Documentation - Sprint 1

## Overview
The Lunara backend is built using Spring Boot 3.1.0 and provides a RESTful API for the postpartum support platform. The backend handles user authentication, profile management, appointments, messaging, and daily wellness tracking.

## Architecture
- **Framework**: Spring Boot 3.1.0
- **Security**: JWT-based authentication
- **Database**: PostgreSQL
- **API Documentation**: OpenAPI/Swagger
- **Base URL**: `http://localhost:8081/api`

## Core Features

### 1. Authentication System
**Base Path**: `/api/v1/auth`

#### Endpoints:
- `POST /register` - Register a new user
  ```json
  {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "password": "string"
  }
  ```
- `POST /authenticate` - Login and get JWT token
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

### 2. User Profile Management
**Base Path**: `/api/v1/profile`

#### Data Model:
```java
public class UserProfile {
    private Long id;
    private User user;
    private LocalDate dueDate;
    private LocalDate birthDate;
    private BirthType birthType;
    private FeedingStyle feedingStyle;
    private String birthLocation;
    private String supportSystem;
    private String concerns;
    private String goals;
}
```

#### Endpoints:
- `GET /` - Get user profile
- `PUT /` - Update user profile

### 3. Appointment Management
**Base Path**: `/api/v1/appointments`

#### Data Model:
```java
public class Appointment {
    private Long id;
    private User client;
    private User provider;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String status;
    private String notes;
    private String location;
}
```

#### Endpoints:
- `POST /` - Create new appointment
- `GET /` - Get all appointments
- `GET /{id}` - Get specific appointment
- `PUT /{id}/status` - Update appointment status
- `GET /range` - Get appointments by date range

### 4. Messaging System
**Base Path**: `/api/v1/messages`

#### Data Model:
```java
public class Message {
    private Long id;
    private User sender;
    private User recipient;
    private String content;
    private boolean read;
    private LocalDateTime createdAt;
}
```

#### Endpoints:
- `POST /` - Send new message
- `GET /` - Get all messages
- `GET /unread` - Get unread messages
- `PUT /{id}/read` - Mark message as read
- `GET /unread/count` - Get unread message count

### 5. Daily Check-ins
**Base Path**: `/api/v1/checkins`

#### Data Model:
```java
public class DailyCheckIn {
    private Long id;
    private User user;
    private MoodLevel moodLevel;
    private String physicalSymptoms;
    private String emotionalNotes;
    private Integer sleepHours;
    private Boolean tookMedication;
    private String medicationNotes;
    private String supportNeeded;
    private LocalDateTime createdAt;
}
```

#### Mood Levels:
- VERY_LOW: "Very Low - Need immediate support"
- LOW: "Low - Struggling"
- NEUTRAL: "Neutral - Managing"
- GOOD: "Good - Doing well"
- EXCELLENT: "Excellent - Feeling great"

#### Endpoints:
- `POST /` - Submit daily check-in
- `GET /` - Get check-in history
- `GET /range` - Get check-ins by date range

## Security

### JWT Authentication
- Token-based authentication using JWT
- Token expiration: 24 hours
- Refresh token expiration: 7 days
- All endpoints except `/api/v1/auth/*` require authentication

### CORS Configuration
- Allowed origins: http://localhost:5173
- Allowed methods: GET, POST, PUT, DELETE, OPTIONS
- Allowed headers: *
- Allow credentials: true

## Database Schema

### Tables:
1. `_user` - User information
2. `user_profiles` - Extended user profile data
3. `appointments` - Appointment records
4. `messages` - Communication records
5. `daily_checkins` - Daily wellness tracking

## Error Handling

### Global Exception Handler
The application implements a centralized error handling mechanism through `GlobalExceptionHandler`:

- **ResourceNotFoundException**: For 404 errors when resources are not found
- **BadCredentialsException**: For invalid login credentials
- **AuthenticationException**: For general authentication failures
- **MethodArgumentNotValidException**: For request validation failures
- **Generic Exception Handler**: For unexpected errors

### HTTP Status Codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

### Error Response Format:
```json
{
    "message": "Error description",
    "code": "ERROR_CODE",
    "timestamp": "2024-01-01T12:00:00"
}
```

Example error codes:
- RESOURCE_NOT_FOUND
- INVALID_CREDENTIALS
- AUTHENTICATION_FAILED
- VALIDATION_FAILED
- INTERNAL_SERVER_ERROR

## API Documentation
- Swagger UI: http://localhost:8081/api/swagger-ui/index.html
- OpenAPI JSON: http://localhost:8081/api/v3/api-docs

## Development Setup

### Prerequisites:
1. Java 17
2. PostgreSQL 15+
3. Maven

### Configuration:
Key configurations in `application.yml`:
```yaml
server:
  port: 8081
  servlet:
    context-path: /api

spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/lunara_db
    username: your_username
    password: your_password

security:
  jwt:
    secret-key: your_secret_key
    expiration: 86400000
    refresh-token:
      expiration: 604800000
```

### Building and Running:
```bash
mvn clean install
mvn spring-boot:run
```
