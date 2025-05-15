import React from 'react';
import polaroidFrame from '../../Assets/polaroid frame.png';
import babyOllie from '../../Assets/baby ollie.png';
import babyEli from '../../Assets/baby eli.png';

const Features: React.FC = () => {
  const features = [
    {
      title: "Natural Wellness",
      description: "Experience holistic healing approaches tailored to your needs",
      image: babyOllie
    },
    {
      title: "Personal Care",
      description: "Receive individualized attention and care for your journey",
      image: babyEli
    },
    {
      title: "Expert Guidance",
      description: "Learn from experienced practitioners dedicated to your wellness",
      image: polaroidFrame
    }
  ];

  return (
    <div className="bg-[#DCD7C9] py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2C3639] mb-12">
          Why Choose Lunara
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-[#2C3639] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#3F4E4F]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features; 