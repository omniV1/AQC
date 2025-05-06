import React from 'react';
// import ServicesOverview from '../components/sections/ServicesOverview'; // Reuse the overview component

interface ServiceFeature {
  name: string;
  details: string;
  features: string[];
}

// Detailed service descriptions
const detailedServices: ServiceFeature[] = [
  {
    name: 'Postpartum Doula Support',
    details: 'Comprehensive in-home support tailored to your unique needs. Services include emotional check-ins, infant care assistance while you rest or shower, feeding support, light household tasks (laundry, dishes, tidying), simple meal and snack preparation, herbal bath setup, and sibling integration support. Available in flexible packages to match your family\'s needs.',
    features: [
      'Emotional and physical recovery support',
      'Infant feeding guidance (breast, bottle, or combination)',
      'Baby care assistance and education',
      'Light household help to ease your transition',
      'Sibling adjustment support',
      'Daytime and overnight support options'
    ]
  },
  {
    name: 'Newborn Care Education',
    details: 'Private, tailored sessions in your home covering essential newborn care skills. Learn gentle techniques for soothing, feeding, diapering, and understanding your baby\'s unique cues. Sessions are personalized to your parenting style and specific concerns.',
    features: [
      'Infant soothing techniques',
      'Safe sleep practices',
      'Bathing and diapering guidance',
      'Babywearing basics',
      'Understanding newborn behavior',
      'Feeding position and timing tips'
    ]
  },
  {
    name: 'Postpartum Wellness Planning',
    details: 'Create a comprehensive plan for your fourth trimester that addresses physical recovery, emotional wellbeing, and family adjustment. Includes personalized recommendations for nutrition, rest, healing practices, and support system coordination.',
    features: [
      'Customized recovery timeline',
      'Nutrition and hydration guidance',
      'Rest and sleep strategies',
      'Support circle coordination',
      'Self-care ritual planning',
      'Resource recommendations'
    ]
  },
  {
    name: 'Holistic Care Services',
    details: 'Supporting your physical and emotional recovery through gentle, natural approaches. Services include herbal bath preparation, aromatherapy guidance, light massage techniques, and recommendations for healing foods and teas.',
    features: [
      'Herbal bath preparation',
      'Aromatherapy guidance',
      'Comfort measures',
      'Healing food suggestions',
      'Gentle movement support',
      'Relaxation techniques'
    ]
  },
  {
    name: 'Digital Support Access',
    details: 'Complement your in-person care with our digital support platform. Access personalized resources, track your recovery journey, and stay connected between visits through our beautiful, intuitive interface.',
    features: [
      'Personalized dashboard',
      'Daily wellness tracking',
      'Resource library access',
      'Secure messaging system',
      'Appointment scheduling',
      'Custom care plan viewing'
    ]
  }
];

export default function ServicesPage(): JSX.Element {
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
              As a DONA-certified postpartum doula, I offer gentle, in-home support to families 
              in the West Valley area. My services are non-medical and rooted in compassion, 
              experience, and a desire to make your fourth trimester journey easier and more 
              peaceful.
            </p>
          </section>

          {/* Detailed Services */}
          {detailedServices.map((service) => (
            <section key={service.name} className="space-y-4 border-b border-brown/10 pb-8">
              <h2 className="text-2xl font-serif text-brown">
                {service.name}
              </h2>
              <p className="text-brown/90 leading-relaxed">
                {service.details}
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {service.features.map((feature) => (
                  <li key={feature} className="text-brown/80 flex items-start">
                    <span className="text-purple mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {/* Call to Action */}
          <div className="text-center pt-8">
            <h3 className="text-xl font-serif text-brown mb-4">
              Ready to Discuss Your Needs?
            </h3>
            <p className="text-brown/80 mb-6">
              Every family's journey is unique. Let's talk about how I can best support yours.
            </p>
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