import React from 'react';
// import ServicesOverview from '../components/sections/ServicesOverview'; // Reuse the overview component

// Placeholder for more detailed service descriptions
const detailedServices = [
  {
    name: 'Postpartum Doula Support',
    details: 'Comprehensive in-home support including emotional check-ins, newborn care assistance, infant feeding support, light household tasks, and sibling integration. Packages available for various needs.',
    // Add pricing or link to pricing info if applicable
  },
  {
    name: 'Lactation Counseling',
    details: 'Personalized, in-home or virtual lactation support covering latch issues, milk supply concerns, pumping guidance, weaning, and more. Judgement-free, evidence-based care.',
  },
  {
    name: 'Newborn Care Education',
    details: 'Private, tailored sessions covering infant soothing techniques, bathing, diapering, safe sleep practices, babywearing basics, and understanding newborn cues.',
  },
  // Add other specific services
];

export default function ServicesPage() {
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
            Our Services
          </h1>
        </div>

        <div className="space-y-12">
          {/* Services Overview */}
          <section>
            <p className="text-brown/90 text-center leading-relaxed">
              As I complete my postpartum doula certification, I'm offering gentle, in-home 
              support to a limited number of families. These are non-medical services rooted 
              in compassion, experience, and a desire to make your life easier.
            </p>
          </section>

          {/* Detailed Services */}
          {detailedServices.map((service) => (
            <section key={service.name} className="space-y-4">
              <h2 className="text-2xl font-serif text-brown">
                {service.name}
              </h2>
              <p className="text-brown/90 leading-relaxed">
                {service.details}
              </p>
            </section>
          ))}

          {/* Call to Action */}
          <div className="text-center pt-8">
            <h3 className="text-xl font-serif text-brown mb-4">
              Ready to Discuss Your Needs?
            </h3>
            <a 
              href="/contact" 
              className="inline-block bg-purple hover:bg-purple/80 text-white font-medium py-2.5 px-8 rounded transition-colors duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 