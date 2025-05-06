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
    // Changed background, updated structure to match reference
    <section id="services-overview" className="services-overview-section">
      <div className="services-overview-content-wrapper">
        <h2 className="services-overview-title">
          Support Services (Non-Clinical)
        </h2>
        <div className="services-overview-intro-text">
           <p>
            As I complete my postpartum doula certification, I'm offering gentle, in-home support to a limited number of families. These are non-medical services rooted in compassion, experience, and a desire to make your life easier.
          </p>
        </div>
        
        {/* Bulleted list from reference image */}
        <ul className="services-overview-list">
          {serviceItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {/* Optional: Link to full services page (kept from previous version) */}
        <div className="services-overview-link-container">
          <a 
            href="/services" 
            className="services-overview-link"
          >
            Learn More About Services &rarr;
          </a>
        </div>
      </div>
    </section>
  );
} 