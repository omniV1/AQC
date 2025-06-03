# LUNARA Database Team Guide

## 👋 Welcome!

This guide is for the team member setting up our MongoDB database for LUNARA, our postpartum support platform. Everything you need is here!

## 📚 Documentation Overview

We've created comprehensive documentation to help you succeed:

### 🚀 **Start Here**: [MONGODB_SETUP_GUIDE.md](./MONGODB_SETUP_GUIDE.md)
**Purpose**: Step-by-step setup instructions in plain English
**When to use**: First time setting up the database
**What you'll learn**: 
- How to install MongoDB locally OR use MongoDB Atlas (cloud)
- How to create database users and configure network access
- How to test your connection
- Common troubleshooting solutions

### 📊 **Deep Dive**: [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)  
**Purpose**: Detailed explanation of our data structure
**When to use**: When you need to understand how data relates to each other
**What you'll learn**:
- What each collection stores (Users, Clients, Providers)
- How data connects between collections
- Field validation rules and business logic
- Performance optimizations we've built in

### ⚡ **Quick Reference**: [DATABASE_QUICK_REFERENCE.md](./DATABASE_QUICK_REFERENCE.md)
**Purpose**: Fast lookup for common operations
**When to use**: Day-to-day development work
**What you'll learn**:
- Common code snippets and queries
- Sample data for testing
- Quick troubleshooting tips

## 🎯 Your Mission

Your job is to get our MongoDB database running so the development team can:
1. **Test user registration** (creating accounts for mothers and doulas)
2. **Test client intake** (mothers filling out detailed questionnaires)  
3. **Test provider matching** (assigning doulas to mothers)
4. **Develop new features** with confidence that data is properly structured

## ✅ Step-by-Step Checklist

### Phase 1: Database Setup (Start Here!)
- [ ] Read [MONGODB_SETUP_GUIDE.md](./MONGODB_SETUP_GUIDE.md) completely
- [ ] Choose between local MongoDB or MongoDB Atlas (cloud)
- [ ] Set up your chosen option following the guide
- [ ] Create `.env` file with database connection string
- [ ] Test connection by running `npm run dev`
- [ ] Verify you see "MongoDB connected successfully" in console
- [ ] Visit `http://localhost:5000/api/health` to confirm API is working

### Phase 2: Understanding the Data (Important!)
- [ ] Read [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) sections:
   - Overview and Data Relationships
   - Users Collection explanation
   - Clients Collection explanation  
   - Providers Collection explanation
- [ ] Review the example data structures
- [ ] Understand the User → Client → Provider relationships

### Phase 3: Testing and Validation
- [ ] Use [DATABASE_QUICK_REFERENCE.md](./DATABASE_QUICK_REFERENCE.md) for testing
- [ ] Try creating sample data using the provided examples
- [ ] Test the common queries listed in the reference guide
- [ ] Verify data validation is working (try creating invalid data)

### Phase 4: Team Handoff
- [ ] Document any issues you encountered and how you solved them
- [ ] Share your database connection details with the team (securely!)
- [ ] Walk through the setup with at least one other team member
- [ ] Create admin access for the development team lead

## 🚨 Important Notes

### Security First
- **Never commit `.env` files** to Git (they're already in .gitignore)
- **Use strong passwords** for database users
- **For production**: Restrict network access to specific IP addresses
- **For development**: Placeholder values are fine for OAuth credentials

### Data Structure Key Points
1. **Every user has a User record** (this is their login account)
2. **Clients get an additional Client record** (with postpartum-specific info)
3. **Providers get an additional Provider record** (with professional info)
4. **One provider can support multiple clients** (1:many relationship)

### Common "Gotchas"
- The Google OAuth error is **already fixed** - don't worry about it!
- MongoDB collection names are **automatically created** - you don't need to make them manually
- Data validation happens **automatically** based on our schema definitions
- Indexes are **automatically created** for fast searching

## 🆘 When You Need Help

### First Steps
1. **Check the console output** - error messages are usually very helpful
2. **Review the relevant guide** - we've tried to cover common issues
3. **Test your connection string** using MongoDB Compass (GUI tool)

### Getting Support
**For technical issues**:
- Copy the exact error message
- Note what you were trying to do when the error occurred
- Check which guide you were following

**For questions about data structure**:
- Reference the [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) document
- Look at the example data in [DATABASE_QUICK_REFERENCE.md](./DATABASE_QUICK_REFERENCE.md)

## 🎉 Success Criteria

You'll know you're successful when:

✅ **Server starts without errors**
```
Server running on port 5000
MongoDB connected successfully
```

✅ **Health check works**  
Visit `http://localhost:5000/api/health` and see a success response

✅ **API documentation loads**
Visit `http://localhost:5000/api-docs` and see the Swagger interface

✅ **No authentication errors**
No more "OAuth2Strategy requires a clientID" errors (this is already fixed!)

## 🚀 Next Steps After Setup

Once the database is running, the development team can:

1. **Build authentication features** (user registration, login)
2. **Create client intake forms** (detailed questionnaires for mothers)
3. **Develop provider matching** (assign doulas to clients)
4. **Add messaging systems** (secure communication between users)
5. **Build care tracking** (monitor postpartum recovery progress)

## 📞 Final Notes

- **You've got this!** We've documented everything thoroughly
- **Start with the setup guide** and work through it step by step  
- **Don't hesitate to ask questions** - better to clarify than guess
- **Your work enables the entire team** - this is a crucial foundation piece

The LUNARA platform will help countless new mothers get the support they need during their postpartum journey. Your database setup work is making that possible! 🌟

---

**Ready to start?** → Open [MONGODB_SETUP_GUIDE.md](./MONGODB_SETUP_GUIDE.md) and let's get this database running! 