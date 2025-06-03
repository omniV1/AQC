# LUNARA Database Quick Reference

## 🚀 Quick Setup
```bash
# 1. Copy environment file
copy env.example .env

# 2. Update MongoDB connection in .env
MONGODB_URI=mongodb://localhost:27017/lunara
# OR for MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lunara

# 3. Start the server
npm run dev
```

## 📋 Collections Overview

| Collection | Purpose | Example Use |
|------------|---------|-------------|
| `users` | Login accounts for all users | Authentication, basic profile |
| `clients` | Postpartum mother profiles | Intake data, care tracking |
| `providers` | Doula/specialist profiles | Professional info, availability |

## 🔗 Key Relationships

```javascript
// Every Client belongs to a User
Client.userId → User._id

// Every Provider belongs to a User  
Provider.userId → User._id

// Providers can have multiple Clients
Provider.clients[] ← Client.assignedProvider
```

## 💻 Common Database Operations

### User Operations
```javascript
// Create new user
const user = new User({
  firstName: "Sarah",
  lastName: "Johnson", 
  email: "sarah@example.com",
  role: "client"
});

// Find user by email
const user = await User.findByEmail("sarah@example.com");

// Check password
const isValid = await user.comparePassword("password123");
```

### Client Operations
```javascript
// Create client profile
const client = new Client({
  userId: user._id,
  babyBirthDate: new Date("2024-01-15"),
  intakeCompleted: false
});

// Get current postpartum week
const week = client.currentPostpartumWeek; // Auto-calculated

// Check onboarding progress
const progress = client.getOnboardingProgress();
```

### Provider Operations
```javascript
// Create provider profile
const provider = new Provider({
  userId: user._id,
  professionalInfo: {
    certifications: ["DONA_Postpartum_Doula"],
    specialties: ["breastfeeding_support"]
  },
  serviceAreas: ["Phoenix", "Scottsdale"]
});

// Assign client to provider
provider.addClient(clientUserId, "postpartum");

// Check availability
const canAccept = provider.canAcceptNewClient();
```

## 🔍 Useful Queries

```javascript
// Find available providers in an area
const providers = await Provider.findAvailableInArea("Phoenix");

// Find clients needing attention
const clients = await Client.findNeedingAttention();

// Find all clients of a specific provider
const clients = await Client.find({ assignedProvider: providerId });

// Find providers by specialty
const specialists = await Provider.findBySpecialty("breastfeeding_support");

// Find clients in fourth trimester (first 12 weeks)
const newMoms = await Client.find({ postpartumWeek: { $lte: 12 } });
```

## 📊 Data Validation

### Required Fields
**User**: `firstName`, `lastName`, `email`, `role`
**Client**: `userId`
**Provider**: `userId`

### Enum Values
**User.role**: `"client"`, `"provider"`, `"admin"`
**Birth type**: `"vaginal"`, `"cesarean"`, `"vbac"`
**Provider status**: `"active"`, `"inactive"`, `"pending_approval"`, `"suspended"`

### Auto-Generated
- `_id` - Unique identifier
- `createdAt` - When record was created
- `updatedAt` - When record was last modified
- `currentPostpartumWeek` - Calculated from baby birth date

## 🛠️ Environment Variables

```bash
# Required for basic operation
MONGODB_URI=mongodb://localhost:27017/lunara
JWT_SECRET=your-secret-key

# Optional (use placeholders for development)
GOOGLE_CLIENT_ID=placeholder-value
GOOGLE_CLIENT_SECRET=placeholder-value
EMAIL_USER=placeholder@gmail.com
EMAIL_PASS=placeholder-password
```

## ⚡ Development Tips

### Testing Database Connection
1. Start your app: `npm run dev`
2. Look for: `MongoDB connected successfully`
3. Visit: `http://localhost:5000/api/health`

### Adding New Fields
1. Update schema in model file
2. Add validation if needed
3. Test with sample data
4. Update API documentation

### Common Errors
- **"OAuth2Strategy requires a clientID"** → Missing Google OAuth config (now handled gracefully)
- **"MongooseServerSelectionError"** → Check MongoDB connection string
- **"User validation failed"** → Check required fields

### Sample Data for Testing
```javascript
// Sample User
{
  firstName: "Sarah",
  lastName: "Johnson",
  email: "sarah@test.com", 
  role: "client",
  isEmailVerified: true
}

// Sample Client  
{
  userId: "user_id_here",
  babyBirthDate: "2024-01-15",
  intakeData: {
    feedingPreferences: ["breastfeeding"],
    supportNeeds: ["breastfeeding_support", "newborn_care"]
  }
}

// Sample Provider
{
  userId: "user_id_here",
  professionalInfo: {
    certifications: ["DONA_Postpartum_Doula"],
    yearsExperience: 3,
    specialties: ["first_time_parents"]
  },
  serviceAreas: ["Phoenix"]
}
```

## 📞 Quick Help

**Database not connecting?**
1. Check `.env` file exists
2. Verify `MONGODB_URI` format
3. Test MongoDB is running (if local)

**Server won't start?** 
1. Run `npm install` 
2. Check for TypeScript errors: `npm run build`
3. Look at console error messages

**Need to reset data?**
- Drop collections in MongoDB Compass
- Or use: `db.users.drop()`, `db.clients.drop()`, etc.

---

**Next**: Check out `MONGODB_SETUP_GUIDE.md` for detailed setup instructions! 