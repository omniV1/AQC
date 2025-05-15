import React, { useEffect, useState } from 'react';
import ladybug from '../../Assets/IMG_1153 1.png';
import leaf from '../../Assets/left leaf.png';

// Placeholder testimonial data
const testimonials = [
  {
    quote: "Working with Lunara was the best decision we made for our postpartum journey. The support was invaluable.",
    author: "- A. R., Litchfield Park",
  },
  {
    quote: "The guidance and reassurance provided made such a difference during those early weeks. Highly recommend!",
    author: "- S. M., West Valley",
  },
  {
    quote: "Such a gentle and supportive presence during our fourth trimester. Forever grateful.",
    author: "- L. K., Phoenix",
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full py-8 md:py-16 bg-[#FFFBF5]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Testimonial Content */}
        <div className="text-center max-w-[280px] md:max-w-2xl mx-auto min-h-[120px] md:min-h-[100px] transition-opacity duration-500">
          <p className="text-[#2C3639] italic text-base md:text-lg mb-2">{testimonials[currentIndex].quote}</p>
          <p className="text-[#2C3639] text-sm md:text-base">{testimonials[currentIndex].author}</p>
        </div>

        {/* Decorative Elements */}
        <div className="relative h-16 md:h-24 mt-4 md:mt-8">
          <img 
            src={leaf} 
            alt="" 
            className="absolute right-0 md:right-4 top-1/2 transform -translate-y-1/2 w-24 md:w-40 h-auto"
          />
          <img 
            src={ladybug} 
            alt="" 
            className="absolute right-8 md:right-12 top-1/2 transform -translate-y-1/2 w-12 md:w-16 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Testimonials; 