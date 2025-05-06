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
            Care that honors the sacred rhythms of birth, rest, and renewal.
          </p>
        </div>

        <div className="space-y-12">
          {/* Philosophy Section */}
          <section>
            <h3 className="text-xl font-serif text-brown mb-3">
              Our Philosophy
            </h3>
            <p className="text-brown/90 leading-relaxed">
              Welcome! Lunara provides gentle, compassionate postpartum support for families in the West Valley. We believe the transition into parenthood deserves nurturing care, informed guidance, and a calm presence.
            </p>
            <p className="text-brown/90 leading-relaxed mt-4">
              Lunara was created to honor the sacred, often unseen space that follows birth—a season of softness and shifting identity. The name is inspired by Lucina, the Roman goddess of childbirth, and luna, the moon, whose phases reflect the cyclical rhythms of the body and the journey into new parenthood. Like the moon, postpartum is not linear; it waxes and wanes, asks for rest, and gently calls us inward.
            </p>
            <p className="text-brown/90 leading-relaxed mt-4">
              At Lunara, we believe postpartum care should mirror these natural rhythms. Rooted in the wisdom of the earth and the intuition of the body, our care supports not just physical healing, but emotional renewal and reconnection.
            </p>  
            <p className="text-brown/90 leading-relaxed mt-4">
              What sets Lunara apart is our commitment to both people and planet. We weave sustainability into every offering—from low-waste resources and herbal healing tools to mindful packaging and circular support models. Your postpartum care is not only intentional—it's earth-conscious, rooted, and reverent.
            </p>
          </section>

          {/* Sarah's Story Section */}
          <section>
            <h3 className="text-xl font-serif text-brown mb-3">
              Meet the Founder
            </h3>
            <p className="text-brown/90 leading-relaxed">
              I'm Sarah, a postpartum support provider and mother of three living in Litchfield Park, Arizona.
            </p>
            <p className="text-brown/90 leading-relaxed mt-4">
              I started Lunara after experiencing firsthand how isolating the postpartum period can be. While there's so much focus on birth, I found myself craving grounded, compassionate support in the quiet weeks that followed; support that honored rest, emotional shifts, and the daily realities of new parenthood.
            </p>
            <p className="text-brown/90 leading-relaxed mt-4">
              Lunara is my response to that gap. My work centers around offering gentle, intentional care during the fourth trimester—care that is practical, nourishing, and rooted in natural cycles. I aim to bring a calm presence, an eye for small details, and deep respect for every family's unique story.
            </p>
            <p className="text-brown/90 leading-relaxed mt-4">
              I'm especially passionate about sustainability, inclusive care, and creating resources that support the parent, not just the baby. Whether through in-person visits or virtual tools, my goal is always the same: to help you feel seen, supported, and genuinely held during this tender season.
            </p>
          </section>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-brown/10 text-center text-sm text-brown/70">
            <p>© {new Date().getFullYear()} Lunara. All rights reserved.</p>
            <p className="mt-1">Serving Litchfield Park & the West Valley, AZ</p>
          </footer>
        </div>
      </div>
    </div>
  );
} 