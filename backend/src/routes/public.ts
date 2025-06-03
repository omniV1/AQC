import express, { Request, Response } from 'express';

const router = express.Router();

// Interface for platform info response
interface PlatformInfo {
  platform: string;
  description: string;
  services: string[];
  contact: {
    email: string;
    phone: string;
  };
  features: string[];
}

// Interface for doula profile response
interface DoulaProfile {
  name: string;
  credentials: string[];
  experience: string;
  bio: string;
  specialties: string[];
  testimonials: Array<{
    text: string;
    author: string;
  }>;
}

// Interface for contact form request body
interface ContactFormBody {
  name: string;
  email: string;
  phone?: string;
  message: string;
  dueDate?: string;
}

// Interface for contact form response
interface ContactFormResponse {
  message: string;
  status: string;
}

// Interface for error response
interface ErrorResponse {
  error: string;
  message: string;
}

/**
 * @swagger
 * /public/info:
 *   get:
 *     summary: Get basic platform information for public website
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: Platform information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 platform:
 *                   type: string
 *                 description:
 *                   type: string
 *                 services:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.get('/info', (req: Request, res: Response<PlatformInfo>) => {
  res.json({
    platform: 'LUNARA',
    description: 'Postpartum Support Platform',
    services: [
      'Personalized Postpartum Care',
      'Real-time Doula Support',
      'Resource Library Access',
      'Appointment Scheduling',
      'Daily Wellness Check-ins'
    ],
    contact: {
      email: 'support@lunara.com',
      phone: '+1 (555) 123-4567'
    },
    features: [
      'Secure messaging with certified doulas',
      'Personalized resource recommendations',
      'Daily wellness tracking',
      'Appointment scheduling',
      'Care plan management'
    ]
  });
});

/**
 * @swagger
 * /public/doula-profile:
 *   get:
 *     summary: Get doula profile information for public website
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: Doula profile information
 */
router.get('/doula-profile', (req: Request, res: Response<DoulaProfile>) => {
  res.json({
    name: 'Sarah Johnson, CD(DONA)',
    credentials: [
      'Certified Doula (DONA International)',
      'Postpartum Support Specialist',
      'Lactation Counselor (CLC)',
      'Infant Sleep Educator'
    ],
    experience: '8+ years supporting new families',
    bio: 'Sarah is passionate about empowering new parents during their fourth trimester journey. With over 8 years of experience, she combines evidence-based support with compassionate care to help families thrive during this transformative time.',
    specialties: [
      'Postpartum Recovery Support',
      'Breastfeeding/Chestfeeding Support',
      'Newborn Care Education',
      'Emotional Support',
      'Family Adjustment'
    ],
    testimonials: [
      {
        text: 'Sarah was a lifeline during those first few weeks. Her support made all the difference in my recovery.',
        author: 'Jessica M.'
      },
      {
        text: 'Professional, caring, and incredibly knowledgeable. I couldn\'t have navigated new motherhood without her.',
        author: 'Maria L.'
      }
    ]
  });
});

/**
 * @swagger
 * /public/contact:
 *   post:
 *     summary: Submit contact form from public website
 *     tags: [Public]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               message:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Contact form submitted successfully
 */
router.post('/contact', async (req: Request<{}, ContactFormResponse | ErrorResponse, ContactFormBody>, res: Response<ContactFormResponse | ErrorResponse>) => {
  try {
    const { name, email, phone, message, dueDate } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Name, email, and message are required'
      });
    }

    // TODO: In production, send email notification to doula
    // TODO: Store inquiry in database for follow-up
    
    console.log('Contact form submission:', {
      name,
      email,
      phone,
      message,
      dueDate,
      timestamp: new Date().toISOString()
    });

    res.json({
      message: 'Thank you for your inquiry! We will get back to you within 24 hours.',
      status: 'success'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to submit contact form'
    });
  }
});

export default router;