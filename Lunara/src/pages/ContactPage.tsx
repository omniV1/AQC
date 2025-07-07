import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope/*, faPhone*/ } from '@fortawesome/free-solid-svg-icons'; // Assuming you might want a phone icon

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
  // Basic state for form fields (consider using a form library later)
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Placeholder: Add form submission logic here (e.g., send to email, API)
    console.log('Form data submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    // Reset form (optional)
    setFormData({ name: '', email: '', message: '' });
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-brown mb-1">Name</label>
              <input 
                type="text" 
                name="name" 
                id="name" 
                required 
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brown mb-1">Email</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                required 
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-brown mb-1">Message</label>
              <textarea 
                name="message" 
                id="message" 
                rows={5} 
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple"
              ></textarea>
            </div>
            <div>
              <button 
                type="submit" 
                className="w-full bg-purple hover:bg-purple/80 text-white font-medium py-2.5 px-8 rounded transition-colors duration-300"
              >
                Send Message
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