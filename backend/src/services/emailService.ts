import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';

export interface EmailTemplateData {
  firstName?: string;
  verificationUrl?: string;
  resetUrl?: string;
  clientName?: string;
  doulaName?: string;
  appointmentDate?: string;
  appointmentTime?: string;
  appointmentType?: string;
  appointmentNotes?: string;
  [key: string]: any;
}

export interface EmailTemplate {
  subject: string;
  html: (data: EmailTemplateData) => string;
  text: (data: EmailTemplateData) => string;
}

export interface SendEmailOptions {
  to: string;
  template: string;
  data: EmailTemplateData;
  subject?: string;
}

export interface SendRawEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

// Create transporter using Gmail SMTP
const createTransporter = (): Transporter => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS! // Use app password for Gmail
    }
  });
};

/**
 * Email templates
 */
const emailTemplates: Record<string, EmailTemplate> = {
  welcome: {
    subject: 'Welcome to LUNARA - Verify Your Email',
    html: (data: EmailTemplateData): string => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to LUNARA</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #8FBC8F; }
          .content { padding: 30px 0; }
          .button { display: inline-block; background-color: #8FBC8F; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px 0; border-top: 1px solid #eee; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="color: #2F4F4F; margin: 0;">LUNARA</h1>
            <p style="margin: 10px 0; color: #666;">Postpartum Support Platform</p>
          </div>
          <div class="content">
            <h2>Welcome, ${data.firstName}!</h2>
            <p>Thank you for joining LUNARA, your dedicated postpartum support platform. We're here to support you through your fourth trimester journey with personalized care and resources.</p>
            
            <p>To get started, please verify your email address by clicking the button below:</p>
            
            <div style="text-align: center;">
              <a href="${data.verificationUrl}" class="button">Verify Email Address</a>
            </div>
            
            <p>Once verified, you'll be able to:</p>
            <ul>
              <li>Complete your intake form for personalized care</li>
              <li>Connect with your assigned doula</li>
              <li>Access our curated resource library</li>
              <li>Schedule appointments and send messages</li>
              <li>Track your wellness and recovery progress</li>
            </ul>
            
            <p>If you didn't create this account, please ignore this email.</p>
            
            <p>This verification link will expire in 24 hours.</p>
          </div>
          <div class="footer">
            <p>LUNARA - Supporting you through your postpartum journey</p>
            <p>If you have any questions, please contact us at support@lunara.com</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: (data: EmailTemplateData): string => `
      Welcome to LUNARA, ${data.firstName}!
      
      Thank you for joining our postpartum support platform. To complete your registration, please verify your email address by visiting:
      
      ${data.verificationUrl}
      
      This link will expire in 24 hours.
      
      If you didn't create this account, please ignore this email.
      
      Best regards,
      The LUNARA Team
    `
  },
  
  'password-reset': {
    subject: 'LUNARA - Password Reset Request',
    html: (data: EmailTemplateData): string => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset - LUNARA</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #8FBC8F; }
          .content { padding: 30px 0; }
          .button { display: inline-block; background-color: #8FBC8F; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px 0; border-top: 1px solid #eee; color: #666; }
          .warning { background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="color: #2F4F4F; margin: 0;">LUNARA</h1>
            <p style="margin: 10px 0; color: #666;">Postpartum Support Platform</p>
          </div>
          <div class="content">
            <h2>Password Reset Request</h2>
            <p>Hello ${data.firstName},</p>
            
            <p>We received a request to reset your password for your LUNARA account. If you made this request, click the button below to reset your password:</p>
            
            <div style="text-align: center;">
              <a href="${data.resetUrl}" class="button">Reset Password</a>
            </div>
            
            <div class="warning">
              <strong>Security Notice:</strong> This password reset link will expire in 30 minutes for your security. If you didn't request this reset, please ignore this email - your password will remain unchanged.
            </div>
            
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${data.resetUrl}</p>
          </div>
          <div class="footer">
            <p>LUNARA - Supporting you through your postpartum journey</p>
            <p>If you have any questions, please contact us at support@lunara.com</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: (data: EmailTemplateData): string => `
      Password Reset Request - LUNARA
      
      Hello ${data.firstName},
      
      We received a request to reset your password. If you made this request, please visit the following link to reset your password:
      
      ${data.resetUrl}
      
      This link will expire in 30 minutes for your security.
      
      If you didn't request this reset, please ignore this email.
      
      Best regards,
      The LUNARA Team
    `
  },
  
  appointment: {
    subject: 'LUNARA - Appointment Confirmation',
    html: (data: EmailTemplateData): string => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Appointment Confirmation - LUNARA</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #8FBC8F; }
          .content { padding: 30px 0; }
          .appointment-details { background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px 0; border-top: 1px solid #eee; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="color: #2F4F4F; margin: 0;">LUNARA</h1>
            <p style="margin: 10px 0; color: #666;">Postpartum Support Platform</p>
          </div>
          <div class="content">
            <h2>Appointment Confirmed</h2>
            <p>Hello ${data.clientName},</p>
            
            <p>Your appointment with ${data.doulaName} has been confirmed!</p>
            
            <div class="appointment-details">
              <h3 style="margin-top: 0;">Appointment Details</h3>
              <p><strong>Date:</strong> ${data.appointmentDate}</p>
              <p><strong>Time:</strong> ${data.appointmentTime}</p>
              <p><strong>Type:</strong> ${data.appointmentType}</p>
              ${data.appointmentNotes ? `<p><strong>Notes:</strong> ${data.appointmentNotes}</p>` : ''}
            </div>
            
            <p>We'll send you a reminder 24 hours before your appointment. If you need to reschedule or cancel, please log into your LUNARA account or contact your doula directly.</p>
          </div>
          <div class="footer">
            <p>LUNARA - Supporting you through your postpartum journey</p>
            <p>If you have any questions, please contact us at support@lunara.com</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: (data: EmailTemplateData): string => `
      Appointment Confirmed - LUNARA
      
      Hello ${data.clientName},
      
      Your appointment with ${data.doulaName} has been confirmed!
      
      Appointment Details:
      Date: ${data.appointmentDate}
      Time: ${data.appointmentTime}
      Type: ${data.appointmentType}
      ${data.appointmentNotes ? `Notes: ${data.appointmentNotes}` : ''}
      
      We'll send you a reminder 24 hours before your appointment.
      
      Best regards,
      The LUNARA Team
    `
  }
};

/**
 * Send an email using the specified template
 * @param options - Email options
 * @returns Promise that resolves when email is sent
 */
export const sendEmail = async (options: SendEmailOptions): Promise<any> => {
  try {
    const { to, template, data, subject } = options;
    
    const transporter = createTransporter();
    const emailTemplate = emailTemplates[template];
    
    if (!emailTemplate) {
      throw new Error(`Email template '${template}' not found`);
    }
    
    const mailOptions: SendMailOptions = {
      from: {
        name: process.env.EMAIL_FROM_NAME || 'LUNARA Platform',
        address: process.env.EMAIL_FROM || process.env.EMAIL_USER!
      },
      to: to,
      subject: subject || emailTemplate.subject,
      html: emailTemplate.html(data),
      text: emailTemplate.text(data)
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return result;
    
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

/**
 * Send a plain email without template
 * @param options - Email options
 * @returns Promise that resolves when email is sent
 */
export const sendRawEmail = async (options: SendRawEmailOptions): Promise<any> => {
  try {
    const { to, subject, html, text } = options;
    
    const transporter = createTransporter();
    
    const mailOptions: SendMailOptions = {
      from: {
        name: process.env.EMAIL_FROM_NAME || 'LUNARA Platform',
        address: process.env.EMAIL_FROM || process.env.EMAIL_USER!
      },
      to: to,
      subject: subject,
      html: html,
      text: text
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('Raw email sent successfully:', result.messageId);
    return result;
    
  } catch (error) {
    console.error('Raw email sending failed:', error);
    throw error;
  }
};

/**
 * Test email configuration
 * @returns Promise that resolves to true if configuration is valid
 */
export const testEmailConnection = async (): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('Email configuration is valid');
    return true;
  } catch (error) {
    console.error('Email configuration test failed:', error);
    return false;
  }
};

/**
 * Validate email environment variables
 * @throws Error if required environment variables are missing
 */
export const validateEmailEnvironment = (): void => {
  const requiredVars = ['EMAIL_USER', 'EMAIL_PASS'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required email environment variables: ${missingVars.join(', ')}`);
  }
};

export { emailTemplates }; 