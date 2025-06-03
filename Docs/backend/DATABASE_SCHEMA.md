# LUNARA Database Schema Documentation

## 🏗️ Overview
This document explains the database structure for LUNARA, a postpartum support platform that connects new mothers with doulas and support specialists.

## 📊 Data Relationships

```
User (Base Account)
├── Client Profile (if role = "client")
└── Provider Profile (if role = "provider")

Provider ──(1:many)──> Client (assigned clients)
```

## 🗂️ Collection Details

### 1. Users Collection (Base User Information)

**Purpose**: Every person using the platform (clients, providers, admins) has a User record.

**Think of it as**: The "login account" that stores basic info and permissions.

#### Key Fields Explained:

| Field | Type | Purpose | Example |
|-------|------|---------|---------|
| `firstName` | String | First name for personalization | "Sarah" |
| `lastName` | String | Last name for full identification | "Johnson" |
| `email` | String | Login email (must be unique) | "sarah@email.com" |
| `password` | String | Encrypted password (only for email/password login) | "*encrypted*" |
| `role` | String | Determines what they can do in the app | "client", "provider", "admin" |
| `isEmailVerified` | Boolean | Has the user confirmed their email? | true/false |
| `oauthProviders` | Array | Google/Apple login information | `[{provider: "google", providerId: "123"}]` |
| `profile.phone` | String | Contact phone number | "+1-555-123-4567" |
| `profile.timezone` | String | User's timezone for scheduling | "America/Phoenix" |

#### Special Features:
- **Password Hashing**: Passwords are automatically encrypted before saving
- **Virtual Field**: `fullName` combines first + last name automatically
- **Email Uniqueness**: No two users can have the same email
- **OAuth Support**: Users can login with Google/Apple instead of password

---

### 2. Clients Collection (Postpartum Mother Profiles)

**Purpose**: Extended information for mothers receiving postpartum support.

**Think of it as**: The detailed "intake form" with all the specific information doulas need to provide proper care.

#### Key Fields Explained:

| Field | Type | Purpose | Example |
|-------|------|---------|---------|
| `userId` | ObjectId | Links to their User account | "507f1f77bcf86cd799439011" |
| `babyBirthDate` | Date | When baby was born (for calculating postpartum week) | "2024-01-15" |
| `dueDate` | Date | Original due date | "2024-01-10" |
| `assignedProvider` | ObjectId | Which doula is helping them | "507f1f77bcf86cd799439012" |
| `intakeCompleted` | Boolean | Has intake questionnaire been finished? | true/false |

#### Intake Data Structure:
The `intakeData` object contains detailed questionnaire responses:

**Personal Information**:
- `partnerName` - Partner's name
- `partnerPhone` - Partner's phone number
- `address` - Home address
- `emergencyContact` - Who to call in emergency

**Birth & Baby Information**:
- `birthExperience.birthType` - "vaginal", "cesarean", or "vbac"
- `birthExperience.birthLocation` - "hospital", "birth_center", or "home"
- `birthExperience.complications` - Any complications during birth
- `numberOfChildren` - Total number of children

**Feeding & Care**:
- `feedingPreferences` - ["breastfeeding", "formula", "combination", "pumping"]
- `feedingChallenges` - Any feeding difficulties
- `supportNeeds` - What kind of help they need most

**Health Information**:
- `medicalHistory` - Past medical conditions
- `currentMedications` - Current medications
- `allergies` - Known allergies
- `postpartumMoodConcerns` - Mental health considerations

#### Automatic Calculations:
- `currentPostpartumWeek` - Automatically calculated from baby's birth date
- `isFourthTrimester` - True if less than 12 weeks postpartum
- `onboardingProgress` - Tracks completion of setup steps

---

### 3. Providers Collection (Doula/Support Specialist Profiles)

**Purpose**: Professional profiles for doulas and postpartum support specialists.

**Think of it as**: The "professional resume" with certifications, availability, and client management info.

#### Key Fields Explained:

| Field | Type | Purpose | Example |
|-------|------|---------|---------|
| `userId` | ObjectId | Links to their User account | "507f1f77bcf86cd799439012" |
| `professionalInfo.certifications` | Array | Professional certifications | ["DONA_Postpartum_Doula"] |
| `professionalInfo.yearsExperience` | Number | Years of doula experience | 5 |
| `professionalInfo.specialties` | Array | Areas of expertise | ["breastfeeding_support", "newborn_care"] |
| `serviceAreas` | Array | Geographic areas they serve | ["Phoenix", "Scottsdale"] |
| `availability.isAcceptingClients` | Boolean | Currently taking new clients? | true/false |
| `availability.maxClients` | Number | Maximum clients at one time | 8 |

#### Professional Information Structure:

**Certifications** (predefined options):
- `DONA_Birth_Doula`, `DONA_Postpartum_Doula`
- `CAPPA_Birth_Doula`, `CAPPA_Postpartum_Doula`
- `Lactation_Consultant_IBCLC`
- `Childbirth_Educator`
- And more...

**Specialties** (what they're best at):
- `first_time_parents` - Great with new parents
- `breastfeeding_support` - Lactation help
- `high_risk_pregnancies` - Special medical needs
- `postpartum_depression` - Mental health support
- `multiples_twins` - Twin/triplet experience

#### Client Management:
The `clients` array tracks assigned clients:
```json
{
  "clientId": "user_id_of_client",
  "assignedDate": "2024-01-15",
  "status": "active", // active, completed, paused
  "serviceType": "postpartum"
}
```

#### Automatic Features:
- `currentClientCount` - Calculates active clients automatically
- `availabilityStatus` - "available", "full", or "not_accepting"
- Client assignment validation prevents overbooking

---

## 🔗 Data Relationships Explained

### User → Client Relationship (1:1)
- Every Client record must link to exactly one User record
- The User record stores login info, the Client record stores postpartum-specific info
- Example: Sarah Johnson has User account + Client profile

### User → Provider Relationship (1:1)
- Every Provider record must link to exactly one User record  
- The User record stores login info, the Provider record stores professional info
- Example: Mary Smith has User account + Provider profile

### Provider → Client Relationship (1:Many)
- One Provider (doula) can be assigned to multiple Clients
- One Client can only have one assigned Provider at a time
- The assignment is stored in both:
  - `Client.assignedProvider` field
  - `Provider.clients[]` array

### Example Data Flow:
1. Sarah registers → Creates User record with role="client"
2. Sarah completes intake → Creates Client record linked to her User
3. System assigns Mary (provider) → Updates both Client.assignedProvider and Provider.clients[]

---

## 📝 Field Validation Rules

### Email Addresses
- Must be valid email format
- Must be unique across all users
- Automatically converted to lowercase

### Phone Numbers
- Accepts various formats: +1-555-123-4567, (555) 123-4567, etc.
- International numbers supported

### Dates
- Birth dates validated to be in the past
- Due dates can be future or past

### Enums (Predefined Options)
- Role: Must be "client", "provider", or "admin"
- Birth type: Must be "vaginal", "cesarean", or "vbac"
- Many other fields have predefined valid options

---

## 🚀 Performance Features

### Database Indexes
Indexes make searching faster. We have indexes on:

**Users Collection**:
- `email` - Fast login lookup
- `role` - Quick filtering by user type

**Clients Collection**:
- `userId` - Fast user-to-client lookup
- `assignedProvider` - Quick provider client lists
- `babyBirthDate` - Sorting by postpartum week

**Providers Collection**:
- `serviceAreas` - Geographic searching
- `specialties` - Finding providers by expertise
- `availability.isAcceptingClients` - Finding available providers

### Automatic Data Management
- **Timestamps**: `createdAt` and `updatedAt` added automatically
- **Password Hashing**: Passwords encrypted before saving
- **Data Cleanup**: Sensitive fields removed from API responses
- **Validation**: All data validated before saving

---

## 🔧 Development Tips

### Adding New Fields
1. Update the schema in the model file
2. Add validation rules if needed
3. Update the API documentation (Swagger comments)
4. Test with sample data

### Querying Data
```javascript
// Find all clients of a specific provider
Client.find({ assignedProvider: providerId })

// Find available providers in Phoenix
Provider.find({ 
  serviceAreas: "Phoenix",
  "availability.isAcceptingClients": true 
})

// Find clients in their first month postpartum
Client.find({ postpartumWeek: { $lte: 4 } })
```

### Common Operations
- **User Registration**: Create User → Create Client/Provider profile
- **Provider Assignment**: Update Client.assignedProvider + Provider.clients[]
- **Intake Completion**: Update Client.intakeData + intakeCompleted=true

---

## 🎯 Business Logic Summary

1. **User Signs Up** → User record created with basic info
2. **Role-Specific Profile** → Client or Provider profile created
3. **Intake Process** → Client completes detailed questionnaire
4. **Provider Assignment** → System/admin assigns doula to client
5. **Service Delivery** → Provider supports client through postpartum period
6. **Completion** → Client status updated to "completed"

This structure supports the full lifecycle of postpartum care delivery! 