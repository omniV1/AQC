import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { JWTPayload } from '../types';

// JWT Strategy
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'your-secret-key'
}, async (jwt_payload: JWTPayload, done) => {
  try {
    const user = await User.findById(jwt_payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));

// Local Strategy (Email/Password)
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email: string, password: string, done) => {
  try {
    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    // Check if user registered via OAuth and has no password
    if (!user.password) {
      return done(null, false, { message: 'Please sign in with your social account' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return done(null, false, { message: 'Invalid credentials' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Google OAuth Strategy - only initialize if credentials are provided
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback'
  }, async (accessToken: string, refreshToken: string, profile: any, done) => {
  try {
    // Check if user already exists with this Google ID
    let user = await User.findOne({ 
      'oauthProviders.providerId': profile.id,
      'oauthProviders.provider': 'google'
    });

    if (user) {
      return done(null, user);
    }

    // Check if user exists with same email
    user = await User.findOne({ email: profile.emails[0].value.toLowerCase() });

    if (user) {
      // Link Google account to existing user
      user.oauthProviders.push({
        provider: 'google',
        providerId: profile.id,
        email: profile.emails[0].value
      });
      await user.save();
      return done(null, user);
    }

    // Create new user
    user = new User({
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value.toLowerCase(),
      role: 'client', // Default role, can be changed later
      isEmailVerified: true, // Google emails are already verified
      oauthProviders: [{
        provider: 'google',
        providerId: profile.id,
        email: profile.emails[0].value
      }]
    });

    await user.save();
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
  }));
} else {
  console.log('Google OAuth not configured - GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables are required');
}

// Serialize user for session
passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport; 