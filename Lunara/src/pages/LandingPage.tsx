import React from 'react';
import { Link } from 'react-router-dom';

// Types
interface HeroBannerProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaButtons: {
    text: string;
    link: string;
  }[];
}

// Components
const HeroBanner: React.FC<HeroBannerProps> = ({ title, subtitle, backgroundImage, ctaButtons }) => (
  <div className="relative min-h-[calc(100vh-200px)] flex items-center justify-center mt-[200px]">
    {/* Background Image with Overlay */}
    <div className="absolute inset-0">
      <img 
        src={backgroundImage} 
        alt="Hero background" 
        className="w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-black/30" /> {/* Overlay */}
    </div>

    {/* Content */}
    <div className="relative z-1 text-center px-4">
      <h1 className="font-['Luxurious_Roman'] text-white text-5xl md:text-7xl mb-6">
        {title}
      </h1>
      <p className="text-white text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light">
        {subtitle}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        {ctaButtons.map((button, index) => (
          <Link 
            key={index}
            to={button.link} 
            className="inline-block px-8 py-3 text-lg font-['Luxurious_Roman'] transition-all
                     bg-[#FAF7F2] text-[#571E00] hover:bg-[#571E00] hover:text-[#FAF7F2]
                     rounded-full shadow-lg hover:shadow-xl"
          >
            {button.text}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

const LandingPage: React.FC = () => {
  const heroContent: HeroBannerProps = {
    title: "Welcome to Lunara",
    subtitle: "Experience the art of beauty and wellness in our luxurious sanctuary",
    backgroundImage: "/images/hero-background.svg",
    ctaButtons: [
      {
        text: "Book Appointment",
        link: "/appointments"
      },
      {
        text: "Our Services",
        link: "/services"
      }
    ]
  };

  return (
    <HeroBanner {...heroContent} />
  );
};

export default LandingPage;
