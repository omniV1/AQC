import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for internal navigation

export default function CTASection() {
  return (
    // Using bg-white to contrast with the bg-brand-bg used in Testimonials
    <section id="cta" className="w-full bg-white py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-brand-secondary mb-6">
          Ready to Embrace a Supported Postpartum?
        </h2>
        <p className="text-lg text-brand-text/90 mb-8">
          Reach out to learn more about how The Quiet Chapter can support you during this transformative time. Let's chat about your needs and how we can help.
        </p>
        <Link 
          to="/contact" 
          className="inline-block bg-brand-primary hover:bg-brand-secondary text-white font-semibold py-3 px-10 rounded-md shadow-md transition-colors duration-300 text-lg"
        >
          Schedule a Consultation
        </Link>
      </div>
    </section>
  );
} 