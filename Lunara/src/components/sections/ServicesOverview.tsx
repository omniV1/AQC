import React from 'react';

// Service items from reference image
const serviceItems = [
  'Emotional check-ins and listening support',
  'Infant care while you rest, eat, or shower',
  'Light household tasks (laundry, dishes, tidying)',
  'Simple meal/snack prep',
  'Herbal bath setup and postpartum self-care',
  'Sibling transitions',
  'Local referrals (lactation, mental health, pelvic care, etc.)',
];

export default function ServicesOverview() {
  return (
    <section className="bg-cream py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="font-heading text-4xl text-warm-brown text-center mb-8">
          Support Services (Non-Clinical)
        </h2>
        <div className="text-center mb-12 text-lg text-warm-brown/80 max-w-2xl mx-auto">
          <p>
            As I complete my postpartum doula certification, I'm offering gentle, in-home support to a limited number of families. These are non-medical services rooted in compassion, experience, and a desire to make your life easier.
          </p>
        </div>
        
        <ul className="space-y-4 text-lg text-warm-brown/80 max-w-2xl mx-auto">
          {serviceItems.map((item) => (
            <li key={item} className="flex items-center">
              <span className="text-sage mr-3">•</span>
              {item}
            </li>
          ))}
        </ul>

        <div className="text-center mt-12">
          <a 
            href="/services" 
            className="inline-block px-8 py-3 bg-sage text-white rounded-lg hover:bg-sage/90 transition-colors duration-200"
          >
            Learn More About Services &rarr;
          </a>
        </div>
      </div>
    </section>
  );
} 