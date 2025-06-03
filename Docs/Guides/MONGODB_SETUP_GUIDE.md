# LUNARA MongoDB Database Setup Guide

## 📋 Overview
This guide will help you set up the MongoDB database for the LUNARA postpartum support platform. The database stores information about users, clients (new mothers), and providers (doulas/support specialists).

## 🗄️ Database Structure Overview

### Main Collections
Your MongoDB database will automatically create these collections when the app runs:

1. **users** - All platform users (clients, providers, admins)
2. **clients** - Detailed profiles for postpartum mothers
3. **providers** - Detailed profiles for doulas and support specialists

## 🚀 Setup Options

### Option 1: Local MongoDB (For Development)
If you want to run MongoDB on your local computer:

#### Step 1: Install MongoDB
1. Go to [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Download MongoDB Community Server for Windows
3. Run the installer and follow the setup wizard
4. Choose "Complete" installation
5. Install MongoDB as a Windows Service (recommended)

#### Step 2: Verify Installation
1. Open Command Prompt as Administrator
2. Type: `mongod --version`
3. You should see version information

#### Step 3: Start MongoDB
MongoDB should start automatically as a Windows service. If not:
1. Open Command Prompt as Administrator
2. Type: `net start MongoDB`

#### Step 4: Update Environment Variables
In your `.env` file, make sure you have:
```
MONGODB_URI=mongodb://localhost:27017/lunara
```

### Option 2: MongoDB Atlas (Cloud Database - Recommended)
This is easier and more reliable for team development:

#### Step 1: Create Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project called "LUNARA"

#### Step 2: Create a Cluster
1. Click "Build a Database"
2. Choose "M0 Sandbox" (Free tier)
3. Select a cloud provider and region close to you
4. Name your cluster "lunara-cluster"
5. Click "Create Cluster"

#### Step 3: Setup Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username (like `lunara-admin`) and strong password
5. Set privileges to "Read and write to any database"
6. Click "Add User"

#### Step 4: Setup Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production, add only your server's IP address

#### Step 5: Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. It looks like: `mongodb+srv://<username>:<password>@lunara-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority`

#### Step 6: Update Environment Variables
In your `.env` file, update:
```
MONGODB_URI=mongodb+srv://your-username:your-password@lunara-cluster.xxxxx.mongodb.net/lunara?retryWrites=true&w=majority
```

## 📊 Database Collections Explained

### 1. Users Collection
**Purpose**: Stores basic information for all platform users

**Main Fields**:
- `firstName`, `lastName` - User's name
- `email` - Login email (unique)
- `password` - Encrypted password (for email/password login)
- `role` - Either "client", "provider", or "admin"
- `isEmailVerified` - Whether they verified their email
- `oauthProviders` - Google/Apple login information
- `profile.phone` - Phone number
- `profile.timezone` - User's timezone (defaults to Arizona)

**Example User**:
```json
{
  "firstName": "Sarah",
  "lastName": "Johnson", 
  "email": "sarah@example.com",
  "role": "client",
  "isEmailVerified": true,
  "profile": {
    "phone": "+1-555-123-4567",
    "timezone": "America/Phoenix"
  }
}
```

### 2. Clients Collection
**Purpose**: Extended profile for postpartum mothers with detailed intake information

**Main Fields**:
- `userId` - Links to the User record
- `babyBirthDate` - When the baby was born
- `dueDate` - Original due date
- `assignedProvider` - Which doula is helping them
- `intakeData` - Detailed questionnaire responses including:
  - Birth experience details
  - Feeding preferences
  - Support needs
  - Medical history
  - Emergency contacts

**Example Client**:
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "babyBirthDate": "2024-01-15T00:00:00.000Z",
  "assignedProvider": "507f1f77bcf86cd799439012",
  "intakeData": {
    "feedingPreferences": ["breastfeeding", "pumping"],
    "supportNeeds": ["breastfeeding_support", "newborn_care"],
    "birthExperience": {
      "birthType": "vaginal",
      "birthLocation": "hospital"
    }
  }
}
```

### 3. Providers Collection
**Purpose**: Extended profile for doulas and support specialists

**Main Fields**:
- `userId` - Links to the User record
- `professionalInfo` - Certifications, experience, specialties
- `serviceAreas` - Geographic areas they serve
- `availability` - Whether accepting new clients, schedule
- `clients` - List of assigned clients
- `pricing` - Service rates and packages

**Example Provider**:
```json
{
  "userId": "507f1f77bcf86cd799439012",
  "professionalInfo": {
    "certifications": ["DONA_Postpartum_Doula"],
    "yearsExperience": 5,
    "specialties": ["breastfeeding_support", "newborn_care"]
  },
  "serviceAreas": ["Phoenix", "Scottsdale", "Tempe"],
  "availability": {
    "isAcceptingClients": true,
    "maxClients": 8
  }
}
```

## 🔧 Testing Your Database Setup

### Step 1: Start Your Application
```bash
cd backend
npm run dev
```

### Step 2: Check Console Output
You should see:
- "MongoDB connected successfully" - ✅ Good!
- "MongoDB connection error" - ❌ Check your connection string

### Step 3: Test API Endpoints
1. Open your browser to `http://localhost:5000/api/health`
2. You should see a status response
3. Visit `http://localhost:5000/api-docs` to see the API documentation

## 🔍 Common Issues and Solutions

### Problem: "MongooseServerSelectionError"
**Solution**: 
- Check your internet connection
- Verify the MongoDB URI in your `.env` file
- For Atlas: Check your username/password and network access settings

### Problem: "Authentication failed"
**Solution**:
- Double-check your database username and password
- Make sure you're using the correct database user (not your Atlas account)

### Problem: App starts but no database connection
**Solution**:
- Make sure your `.env` file exists in the backend folder
- Check that the `MONGODB_URI` variable is correctly set

## 📋 Initial Data Setup

The application will automatically:
1. Create the database collections when they're first used
2. Set up proper indexes for fast searching
3. Validate data according to the schemas

You don't need to manually create any collections or tables!

## 🔐 Security Notes

### For Development:
- Use placeholder values in `.env` for OAuth credentials
- Local MongoDB doesn't require authentication by default

### For Production:
- Use strong, unique passwords
- Restrict network access to specific IP addresses
- Enable MongoDB authentication
- Use environment variables for all sensitive data

## 📞 Getting Help

If you run into issues:
1. Check the console output for specific error messages
2. Verify your `.env` file has all required variables
3. Test your MongoDB connection using MongoDB Compass (GUI tool)
4. Ask the team for help with the specific error message

## ✅ Checklist

- [ ] MongoDB installed or Atlas cluster created
- [ ] Database user created with read/write permissions
- [ ] Network access configured
- [ ] `.env` file updated with correct `MONGODB_URI`
- [ ] Application starts without database errors
- [ ] Can access API documentation at `/api-docs`

---

**Next Steps**: Once the database is running, the development team can start testing user registration, client intake, and provider management features! 