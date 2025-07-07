import React from 'react';

/**
 * FAQPage (Sprint-1 scaffold)
 * ---------------------------
 * TODO (Carter):
 * 1. Replace static questions with data fetched from `/public/faq` once backend route exists.
 * 2. Convert to accordion component with smooth animations.
 * 3. Ensure the page is accessible (keyboard navigable, ARIA attributes).
 *
 * Design reference: https://www.figma.com/design/cdtATWBpZPGhK4Zz7jL0PS/Lunara?node-id=52-84&t=xw6y1BfnDJwu4YCs-4
 */

const sampleFaq = [
  {
    q: 'What is the fourth trimester?',
    a: 'The first 12 weeks after giving birth, a crucial recovery period for parents.'
  },
  {
    q: 'Do I need to live in Arizona to use LUNARA?',
    a: 'No – most of our services are delivered virtually, supporting families worldwide.'
  }
];

const FAQPage: React.FC = () => (
  <div className="max-w-3xl mx-auto px-4 py-16">
    <h1 className="text-4xl font-serif text-center mb-12">Frequently Asked Questions</h1>
    <div className="space-y-4">
      {sampleFaq.map((item, idx) => (
        <details key={idx} className="p-4 bg-white shadow rounded group">
          <summary className="cursor-pointer text-lg font-medium group-open:text-purple">
            {item.q}
          </summary>
          <p className="mt-2 text-brown/90">{item.a}</p>
        </details>
      ))}
    </div>
  </div>
);

export default FAQPage; 