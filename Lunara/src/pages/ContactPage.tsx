import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
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
// 6. Align UI with Figma mockup (node 52-526).
// -----------------------------

export default function ContactPage() {
  const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    pronouns: z.string().optional(),
    phoneNumber: z.string().min(7, 'Enter a valid phone number'),
    zipCode: z.string().min(3, 'ZIP required'),
    dueDate: z.string().optional(),
    message: z.string().min(10, 'Message must be at least 10 characters'),
    hearAbout: z.string().optional(),
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
    <div className="w-full bg-[#FAF7F2] flex justify-center">
      {/* Top padding gives room for absolute header from MainLayout */}
      <section className="w-full max-w-[1076px] px-6 md:px-8 pt-[220px] pb-24 grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Intro & contact details */}
        <div className="space-y-8">
          <h1 className="text-[#4E1B00] text-[64px] leading-none font-['Luxurious_Script'] italic">
            Inquire
          </h1>
          <p className="text-[#4E1B00] font-['Luxurious_Roman'] text-lg leading-relaxed max-w-md">
            Whether you have a quick question or you’re ready to begin your postpartum journey with us, we’d love to hear from you. Fill out the form or reach us directly:
          </p>

          <div className="space-y-4 font-['Luxurious_Roman'] text-[#4E1B00]">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faEnvelope} className="text-purple" />
              <a href="mailto:hello@thequietchapter.com" className="hover:text-purple transition-colors duration-200">
                hello@thequietchapter.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faPhone} className="text-purple" />
              <a href="tel:+16235551234" className="hover:text-purple transition-colors duration-200">
                +1 (623) 555-1234
              </a>
            </div>
            <p className="text-sm italic text-brown/70">We typically respond within 24-48 business hours.</p>
          </div>
        </div>

        {/* Contact form – bubbly card */}
        <div className="w-full bg-[#F5EFE5] border border-[#E8DED1] shadow-[0_4px_20px_rgba(0,0,0,0.06)] rounded-[3rem] p-10 md:p-14">
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Row 1: Name, Pronouns */}
            <div>
              <label htmlFor="name" className="block text-xs font-medium text-[#4E1B00] mb-1 font-['Luxurious_Roman']">Name</label>
              <input type="text" {...register('name')} className="w-full px-3 py-2 border border-[#AD714F]/40 rounded bg-white/90 focus:outline-none focus:ring-1 focus:ring-purple text-sm font-['Luxurious_Roman']" />
              {errors.name && <p className="text-[10px] text-red-600 mt-1 font-['Luxurious_Roman']">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="pronouns" className="block text-xs font-medium text-[#4E1B00] mb-1 font-['Luxurious_Roman']">Pronouns</label>
              <input type="text" {...register('pronouns')} className="w-full px-3 py-2 border border-[#AD714F]/40 rounded bg-white/90 focus:outline-none focus:ring-1 focus:ring-purple text-sm font-['Luxurious_Roman']" />
            </div>

            {/* Row 2: Phone, Zip */}
            <div>
              <label htmlFor="phoneNumber" className="block text-xs font-medium text-[#4E1B00] mb-1 font-['Luxurious_Roman']">Phone Number</label>
              <input type="tel" {...register('phoneNumber')} className="w-full px-3 py-2 border border-[#AD714F]/40 rounded bg-white/90 focus:outline-none focus:ring-1 focus:ring-purple text-sm font-['Luxurious_Roman']" />
              {errors.phoneNumber && <p className="text-[10px] text-red-600 mt-1 font-['Luxurious_Roman']">{errors.phoneNumber.message}</p>}
            </div>
            <div>
              <label htmlFor="zipCode" className="block text-xs font-medium text-[#4E1B00] mb-1 font-['Luxurious_Roman']">ZIP Code</label>
              <input type="text" {...register('zipCode')} className="w-full px-3 py-2 border border-[#AD714F]/40 rounded bg-white/90 focus:outline-none focus:ring-1 focus:ring-purple text-sm font-['Luxurious_Roman']" />
            </div>

            {/* Row 3: Email, Due Date */}
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-[#4E1B00] mb-1 font-['Luxurious_Roman']">Email</label>
              <input type="email" {...register('email')} className="w-full px-3 py-2 border border-[#AD714F]/40 rounded bg-white/90 focus:outline-none focus:ring-1 focus:ring-purple text-sm font-['Luxurious_Roman']" />
              {errors.email && <p className="text-[10px] text-red-600 mt-1 font-['Luxurious_Roman']">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="dueDate" className="block text-xs font-medium text-[#4E1B00] mb-1 font-['Luxurious_Roman']">Due Date</label>
              <input type="date" {...register('dueDate')} className="w-full px-3 py-2 border border-[#AD714F]/40 rounded bg-white/90 focus:outline-none focus:ring-1 focus:ring-purple text-sm font-['Luxurious_Roman']" />
            </div>

            {/* Message – span 2 */}
            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-xs font-medium text-[#4E1B00] mb-1 font-['Luxurious_Roman']">What are you needing most right now?</label>
              <textarea {...register('message')} rows={4} className="w-full px-3 py-2 border border-[#AD714F]/40 rounded bg-white/90 focus:outline-none focus:ring-1 focus:ring-purple text-sm font-['Luxurious_Roman']" />
              {errors.message && <p className="text-[10px] text-red-600 mt-1 font-['Luxurious_Roman']">{errors.message.message}</p>}
            </div>

            {/* Hear about – span 2 */}
            <div className="md:col-span-2">
              <label htmlFor="hearAbout" className="block text-xs font-medium text-[#4E1B00] mb-1 font-['Luxurious_Roman']">How did you hear about us?</label>
              <input type="text" {...register('hearAbout')} className="w-full px-3 py-2 border border-[#AD714F]/40 rounded bg-white/90 focus:outline-none focus:ring-1 focus:ring-purple text-sm font-['Luxurious_Roman']" />
            </div>

            {/* Submit button – centered */}
            <div className="md:col-span-2 flex justify-center mt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-40 px-5 py-2 bg-white text-[#4E1B00] text-lg font-['Luxurious_Roman'] hover:bg-brown hover:text-white rounded-full shadow-md transition-all font-medium border border-brown flex justify-center"
              >
                {isSubmitting ? 'Sending…' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
} 