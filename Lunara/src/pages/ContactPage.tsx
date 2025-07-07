import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// TODO: replace with real API call
import axios from 'axios';

// -----------------------------
// TODO (Carter – Sprint-1)
// 1. Replace custom state management with `react-hook-form`.
// 2. Add `zod` schema for field validation (name, email, message, phone, dueDate).
// 3. On submit, POST to `/public/contact` backend endpoint using fetch/axios.
// 4. Display success & error toasts.
// 5. After Sprint-1, move contact info to environment-driven config.
// 6. Align UI with Figma mockup: https://www.figma.com/design/cdtATWBpZPGhK4Zz7jL0PS/Lunara?node-id=52-526&t=xw6y1BfnDJwu4YCs-4
// -----------------------------

export default function ContactPage() {
  const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
  });

  type FormValues = z.infer<typeof schema>;

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await axios.post('/api/public/contact', data);
      alert('Thank you for your message! We will get back to you soon.');
      reset();
    } catch (err) {
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="w-full bg-cream">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Logo Section */}
        <div className="mb-16 text-center">
          <img 
            src="/images/logo.png"
            alt="The Quiet Chapter Logo" 
            className="w-64 mx-auto mb-6"
          />
          <h1 className="text-3xl md:text-4xl font-serif text-brown">
            Get In Touch
          </h1>
        </div>
        
        {/* Contact Form */}
        <div className="space-y-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-brown mb-1">Name</label>
              <input 
                type="text" 
                {...register('name')}
                className="w-full px-4 py-2 border border-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple"
              />
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brown mb-1">Email</label>
              <input 
                type="email" 
                {...register('email')}
                className="w-full px-4 py-2 border border-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple"
              />
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-brown mb-1">Message</label>
              <textarea 
                {...register('message')}
                rows={5}
                className="w-full px-4 py-2 border border-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple"
              ></textarea>
              {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message.message}</p>}
            </div>
            <div>
              <button 
                type="submit" 
                className="w-full bg-purple hover:bg-purple/80 text-white font-medium py-2.5 px-8 rounded transition-colors duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>

          {/* Contact Info */}
          <div className="text-center space-y-4 pt-8 border-t border-brown/10">
            <h2 className="text-xl font-serif text-brown">Contact Information</h2>
            <p className="text-brown/90">
              Based in Litchfield Park, serving families throughout the West Valley, AZ.
            </p>
            <div className="flex justify-center items-center space-x-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-purple" />
              <a 
                href="mailto:hello@thequietchapter.com" 
                className="text-brown hover:text-purple transition-colors duration-200"
              >
                hello@thequietchapter.com
              </a>
            </div>
            <p className="text-sm italic text-brown/70">
              We typically respond within 24-48 business hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 