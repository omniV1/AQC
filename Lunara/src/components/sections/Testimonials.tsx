import React from 'react';

// Placeholder testimonial data
const testimonials = [
  {
    quote: "Working with [Your Name/Business Name] was the best decision we made for our postpartum journey. The support was invaluable.",
    author: "- A. R., Litchfield Park",
  },
  {
    quote: "The guidance and reassurance provided made such a difference during those early weeks. Highly recommend!",
    author: "- S. M., West Valley",
  },
  // Add more testimonials as needed
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="w-full bg-brand-bg py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-brand-secondary mb-12">Kind Words From Families</h2>
        <div className="space-y-8">
          {testimonials.map((testimonial, index) => (
            <blockquote key={index} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border-l-4 border-brand-primary">
              <p className="text-lg italic text-brand-text/90 mb-4">"{testimonial.quote}"</p>
              <cite className="block text-md font-semibold text-brand-secondary not-italic">{testimonial.author}</cite>
            </blockquote>
          ))}
        </div>
        {/* Optional: Link to a dedicated testimonials page or contact */}
      </div>
    </section>
  );
} 