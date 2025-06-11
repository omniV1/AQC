import React from 'react';
import Header from '../components/layout/Header';

const LandingPage: React.FC = () => (
  <div className="w-full bg-[#FAF7F2] flex justify-center">
    <div className="w-full max-w-[1076px]">
      {/* Hero Section – pulled up so it tucks behind the scalloped header */}
      <div className="relative w-full h-[580px] -mt-[50px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 w-full h-full"
          style={{
            backgroundImage: `url('/images/ollie head.png')`,
            backgroundPosition: 'center top',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-start justify-center h-full pt-[190px] px-6 md:px-8">
          <h1 className="text-white text-[82px] font-['Luxurious_Script'] italic leading-relaxed drop-shadow-lg text-left">
            Rest-centered, postpartum
            <br />
            support for all families
          </h1>

          <div className="flex gap-4 mt-4">
            <button className="px-5 py-1 bg-white text-[#4E1B00] text-lg hover:bg-[#A27B5C] hover:text-white rounded-full shadow-md transition-all font-medium border border-[#AD714F] font-['Luxurious_Roman']">
              Services
            </button>
            <button className="px-5 py-1 bg-white text-[#4E1B00] text-lg hover:bg-[#A27B5C] hover:text-white rounded-full shadow-md transition-all font-medium border border-[#AD714F] font-['Luxurious_Roman']">
              Inquire
            </button>
          </div>
        </div>
      </div>

      {/* Header overlay */}
      <Header />

      {/* Letter Section */}
      <div className="bg-[#FAF7F2] w-full py-16">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Letter Content */}
            <div className="relative">
              <h2 className="text-[#4E1B00] text-[32px] font-['Luxurious_Script'] italic mb-6">
                Dear parent,
              </h2>
              <p className="text-[#4E1B00] leading-relaxed mb-6">
                Lunara is a place of softness, reverence, and support. We offer gentle transition care rooted in ancient wisdom and aligned with your natural rhythms of recovery.
              </p>
              <p className="text-[#4E1B00] leading-relaxed">
                Whether you're welcoming your first baby or your fifth, your needs matter just as much as your baby's.
              </p>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-6">
              <img 
                src="/images/baby-sleeping.jpg" 
                alt="Peaceful sleeping baby"
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
              <img 
                src="/images/cactus.jpg"
                alt="Decorative cactus"
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* Service Links */}
          <div className="flex justify-center space-x-8 mt-16">
            <a href="/ritual" className="text-[#4E1B00] uppercase tracking-wider text-sm hover:text-[#A27B5C] transition-colors">
              Ritual Support
            </a>
            <a href="/night-care" className="text-[#4E1B00] uppercase tracking-wider text-sm hover:text-[#A27B5C] transition-colors">
              Night Care
            </a>
            <a href="/planning" className="text-[#4E1B00] uppercase tracking-wider text-sm hover:text-[#A27B5C] transition-colors">
              Postpartum Planning
            </a>
            <a href="/sacred-rhythm" className="text-[#4E1B00] uppercase tracking-wider text-sm hover:text-[#A27B5C] transition-colors">
              Sacred Rhythm
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LandingPage;