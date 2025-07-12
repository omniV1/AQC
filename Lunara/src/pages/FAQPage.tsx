import React, { useState } from 'react';

/**
 * FAQPage
 * -------
 * Updated to match Figma node 52-84:
 * 1. Reuses global <Header /> and <Footer /> components.
 * 2. Adds a hero banner with the baby ollie image tucked under the scalloped header.
 * 3. Retains sample FAQ accordion (to be replaced with dynamic data later).
 */

const sampleFaq = [
  {
    q: 'What does a postpartum doula do?',
    a: 'A postpartum doula offers emotional, physical, and informational support to families in the early weeks after birth. This can include helping with newborn care, parent education, light household tasks, meal preparation, and ensuring parents are well-rested and confident.'
  },
  {
    q: 'Is this support only for people who gave birth, or also adoptive / surrogate / partnered parents?',
    a: 'We welcome and support all family constellations. Whether you have carried the pregnancy, are adopting, using a surrogate, or are supporting a partner, our care plans can be tailored to meet your unique needs.'
  },
  {
    q: 'How do I book a package?',
    a: 'You can book directly through our Services page or reach out via our contact form. We will schedule a complimentary consultation to explore your needs and match you with the right care package.'
  },
  {
    q: 'Can I schedule care before I give birth?',
    a: 'Absolutely! Many families book prenatal planning sessions so care is in place when baby arrives. Early booking ensures availability for your preferred dates.'
  },
  {
    q: 'What is your cancellation / rescheduling policy?',
    a: 'We understand plans change. Sessions can be rescheduled up to 24 hours prior without cost. Cancellations within 24 hours may incur a small fee—please see our full policy during booking.'
  },
  {
    q: 'Do you offer payment plans?',
    a: 'Yes. We strive to make care accessible and offer flexible installment options. Let us know during your consultation and we can create a plan that works for you.'
  }
];

const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="w-full bg-[#FAF7F2] flex justify-center">
      <div className="w-full max-w-[1076px]">
        {/* Hero Section – positioned below scalloped header */}
        <div className="relative w-full h-[500px] -mt-[30px] md:h-[640px]">
          {/* Background Image */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url('/images/baby%20ollie.png')`,
              backgroundPosition: 'center',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}
          />
          {/* Dark overlay with fade to avoid darkening beyond image edges */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent mix-blend-multiply" />
          {/* Hero Content */}
          <div className="relative z-10 flex flex-col items-center justify-start h-full pt-48 md:pt-60 px-6 md:px-10 text-center max-w-2xl mx-auto">
            {/* Visually hidden heading for accessibility/SEO */}
            <h1 className="sr-only">Frequently Asked Questions</h1>

            <p
              className="text-white text-3xl md:text-5xl lg:text-6xl font-script tracking-wide drop-shadow-md text-center px-6 md:px-10"
              style={{ WebkitTextStroke: '1px rgba(87, 32, 3, 0.35)', letterSpacing: '0.07em' }}
            >
            Frequently Asked Questions
            </p>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-4 -mt-12 md:-mt-16 pt-0 pb-10 md:pb-14">
          {sampleFaq.map((item, idx) => (
            <div key={idx} className="border-b last:border-none">
              <button
                onClick={() => toggleIndex(idx)}
                className="w-full flex justify-between items-center py-4 px-2 text-lg md:text-xl font-playfair text-[#4E1B00] focus:outline-none"
              >
                <span>{item.q}</span>
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
                <p className="pb-6 px-2 text-brown/90 text-[#4E1B00]/90 leading-relaxed font-['Luxurious_Roman']">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage; 