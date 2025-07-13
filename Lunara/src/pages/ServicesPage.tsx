import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * ServicesPage (Sprint-1 scaffold)
 * --------------------------------
 * TODO (Carter):
 * 1. Replace placeholder cards with dynamic data once /public/info or /api/resources is ready.
 * 2. Add CTAs that navigate to signup / scheduling when backend endpoints are complete.
 * 3. Optimise for SEO – add meta tags via react-helmet.
 *
 * Design reference: https://www.figma.com/design/cdtATWBpZPGhK4Zz7jL0PS/Lunara?node-id=61-33&t=xw6y1BfnDJwu4YCs-4
 */

const ServicesPage: React.FC = () => {
  // Service packages reflected in Figma – copy is placeholder until backend provides full text
  const services = [
    {
      title: 'The Welcoming',
      description:
        'A gentle introduction to your fourth-trimester. Includes an initial virtual consultation, personalised postpartum plan, and access to our on-call doula chat for the first two weeks.'
    },
    {
      title: 'The Tending',
      description:
        'Ongoing emotional and practical support for new parents. Weekly video sessions, feeding guidance, and resource recommendations tailored to your family’s needs.'
    },
    {
      title: 'The Holding',
      description:
        'Hands-on help during the toughest nights. Overnight virtual doula availability, soothing strategies, and sleep-environment assessments.'
    },
    {
      title: 'The Nightwatch',
      description:
        'Specialised night-time care package focusing on infant sleep rhythms, nighttime feeding plans, and parental rest optimisation.'
    },
    {
      title: 'The Vigil',
      description:
        'A month-long immersion of daily check-ins, milestone monitoring, and progression tracking to ensure a smooth recovery and bonding period.'
    },
    {
      title: 'The Tether – For Existing Clients',
      description:
        'Follow-up mini-sessions and on-demand messaging for families who have already completed one of our core programmes.'
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0); // default open first item

  const toggleIndex = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div>
      {/* Hero section */}
      <section className="relative w-full h-64 md:h-[450px] overflow-hidden">
        <img
          src="/images/eli.png"
          alt="Mother reading with child"
          className="w-full h-full object-cover"
          style={{

          }}
        />
        {/* Overlay title */}
        <h1
          className="absolute inset-0 flex items-center justify-center text-white text-5xl md:text-7xl font-script tracking-wide drop-shadow-md transform translate-y-9"
          style={{ WebkitTextStroke: '1px rgba(87, 32, 3, 0.35)', letterSpacing: '0.07em' }}
        >
          Services
        </h1>

      </section>

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        {services.map((service, idx) => (
          <div key={idx} className="border-b last:border-none">
            <button
              onClick={() => toggleIndex(idx)}
              className="w-full flex justify-between items-center py-4 px-2 text-xl md:text-2xl font-playfair text-[#4E1B00] focus:outline-none"
            >
              <span>{service.title}</span>
              <svg
                className={`w-3 h-3 ml-2 text-inherit transform transition-transform ${
                  openIndex === idx ? 'rotate-90' : ''
                }`}
                viewBox="0 0 8 8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="0,0 8,4 0,8" />
              </svg>
            </button>
            {openIndex === idx && (
              <div className="pb-6 px-2 text-sm md:text-base text-brown/90 leading-relaxed font-['Luxurious_Roman']">
                {service.description}
              </div>
            )}
          </div>
        ))}

        {/* Inquiry CTA */}
        <div className="text-center mt-12">
          <Link
            to="/contact"
            className="px-5 py-1 bg-white text-[#4E1B00] text-lg font-['Luxurious_Roman'] hover:bg-brown hover:text-white rounded-full shadow-md transition-all font-medium border border-[#AD714F] font-['Luxurious_Roman']"
          >
            Inquire
          </Link>
        </div>
      </div>
    </div>
  );  
};

export default ServicesPage; 