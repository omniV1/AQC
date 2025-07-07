import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../contexts/AuthContext';
import { ClientRegistrationData } from '../types/auth';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { registerClient } = useAuth();

  const schema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  });

  type FormValues = z.infer<typeof schema>;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await registerClient({ ...data, providerId: 0 }); // TODO: provider selection
      navigate('/dashboard');
    } catch (err) {
      /* handle in toast */
    }
  };

  return (
    <div className="w-full bg-cream">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Logo Section */}
        <div className="mb-16 text-center">
          <img 
            src="/images/logo.png"
            alt="Lunara Logo" 
            className="w-64 mx-auto mb-6"
          />
          <h1 className="text-3xl md:text-4xl font-serif text-brown">
            Begin Your Journey
          </h1>
          <p className="mt-4 text-brown/80">
            Create your account to access personalized postpartum support and resources
          </p>
        </div>
        
        {/* Registration Form */}
        <div className="space-y-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-serif text-brown">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-brown mb-1">
                    First Name
                  </label>
                  <input 
                    type="text" 
                    {...register('firstName')}
                    className="w-full px-4 py-2 border border-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple placeholder:text-brown/40"
                  />
                  {errors.firstName && <p className="text-xs text-red-600 mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-brown mb-1">
                    Last Name
                  </label>
                  <input 
                    type="text" 
                    {...register('lastName')}
                    className="w-full px-4 py-2 border border-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple placeholder:text-brown/40"
                  />
                  {errors.lastName && <p className="text-xs text-red-600 mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-brown mb-1">
                  Email
                </label>
                <input 
                  type="email" 
                  {...register('email')}
                  className="w-full px-4 py-2 border border-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple placeholder:text-brown/40"
                />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
                <p className="mt-1 text-xs text-brown/60">We'll use this email to send you important updates and resources</p>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-brown mb-1">
                  Password
                </label>
                <input 
                  type="password" 
                  {...register('password')}
                  className="w-full px-4 py-2 border border-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple placeholder:text-brown/40"
                />
                {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>}
                <p className="mt-1 text-xs text-brown/60">Must be at least 8 characters long</p>
              </div>
            </div>

            <div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-purple hover:bg-purple/80 text-white font-medium py-2.5 px-8 rounded transition-colors duration-300 disabled:opacity-50"
              >
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>

          {/* Additional Info */}
          <div className="text-center space-y-4 pt-8 border-t border-brown/10">
            <p className="text-brown/90">
              Already have an account?{' '}
              <Link to="/login" className="text-purple hover:text-purple/80 transition-colors duration-200">
                Sign in here
              </Link>
            </p>
            <p className="text-sm italic text-brown/70">
              We're honored to be part of your postpartum journey
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 