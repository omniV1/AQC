import React from 'react';

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
  const placeholderServices = [
    {
      title: 'Personalised Postpartum Care',
      description: 'One-on-one virtual sessions tailored to your recovery.'
    },
    {
      title: 'Real-time Doula Support',
      description: 'Chat with certified doulas 7 days a week.'
    },
    {
      title: 'Resource Library',
      description: 'Curated articles, videos and checklists for new parents.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-serif text-center mb-12">Our Services</h1>
      <div className="grid gap-8 md:grid-cols-3">
        {placeholderServices.map((service, idx) => (
          <div key={idx} className="p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-semibold mb-2">{service.title}</h2>
            <p className="text-brown/90">{service.description}</p>
            {/* TODO: Link to detailed page or modal */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage; 