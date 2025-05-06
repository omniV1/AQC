import React from 'react';
// import aboutImage from '../assets/images/your-image.jpg'; // Optional: Add an image

export default function AboutPage() {
  return (
    <div className="w-full bg-cream min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Logo Section */}
        <div className="mb-16 text-center">
          <img 
            src="/images/logo.png"
            alt="Lunara Logo" 
            className="w-64 mx-auto mb-6"
          />
          <p className="text-lg text-brown/80 italic mt-2">
            Tender support for the story unfolding
          </p>
        </div>

        <div className="space-y-12">
          {/* About Section */}
          <section>
            <h2 className="text-2xl font-serif text-brown mb-3">
              About Lunara
            </h2>
          </section>

          {/* Philosophy Section */}
          <section>
            <h3 className="text-xl font-serif text-brown mb-3">
              Our Philosophy
            </h3>
            <p className="text-brown/90 leading-relaxed">
              Welcome! Lunara provides gentle, compassionate postpartum support for families in the West Valley. We believe the transition into parenthood deserves nurturing care, informed guidance, and a calm presence.
            </p>
            <p className="text-brown/90 leading-relaxed mt-4">
              Our approach is rooted in the understanding that every family's journey is unique. We offer personalized, non-clinical support that adapts to your specific needs and circumstances, creating a foundation of confidence and peace in your postpartum experience.
            </p>
          </section>

          {/* Meet Your Guide Section */}
          <section>
            <h3 className="text-xl font-serif text-brown mb-3">
              Meet Your Guide
            </h3>
            <p className="text-brown/90 leading-relaxed">
              I became passionate about postpartum care through my own experiences of navigating birth and the postpartum season three times. Each journey taught me invaluable lessons about the importance of support, self-care, and community during this transformative time.
            </p>
            <p className="text-brown/90 leading-relaxed mt-4">
              Currently pursuing certification as a postpartum doula through DONA International, I now offer non-clinical support to families in West Valley. My focus is on holistic, intuitive, and sustainable care. I believe everyone deserves to feel nurtured and supported in early parenthood.
            </p>
          </section>

          {/* Service Area Section */}
          <section>
            <h3 className="text-xl font-serif text-brown mb-3">
              Service Area
            </h3>
            <p className="text-brown/90 leading-relaxed">
              Based in Litchfield Park, I serve families throughout the West Valley area. Whether you're preparing for your postpartum journey or already in the midst of it, I'm here to provide the support you need.
            </p>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-brown/10 text-center text-sm text-brown/70">
          <p>© {new Date().getFullYear()} Lunara. All rights reserved.</p>
          <p className="mt-1">Serving Litchfield Park & the West Valley, AZ</p>
        </footer>
      </div>
    </div>
  );
} 