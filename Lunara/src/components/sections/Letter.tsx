import React from 'react';
import babyImage from '../../Assets/baby eli.png';
import beeImage from '../../Assets/image 2.png';
import noteImage from '../../Assets/note.png';
import meadowBg from '../../Assets/meadow background.png';
import Testimonials from './Testimonials';

const Letter: React.FC = () => {
  return (
    <>
      <div className="relative w-full pb-8 md:pb-16 -mt-16 md:-mt-32">
        <div className="max-w-6xl mx-auto px-4">
          <div 
            className="bg-cover bg-center rounded-b-lg"
            style={{ backgroundImage: `url(${meadowBg})` }}
          >
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 pt-24 md:pt-48">
              {/* Letter Content */}
              <div className="relative w-full max-w-[364px]">
                <img 
                  src={noteImage} 
                  alt="A handwritten note to parents about Lunara's fourth trimester care services" 
                  className="w-full rotate-[4.17deg]"
                />
                <img 
                  src={beeImage} 
                  alt="" 
                  className="absolute left-0 -top-4 w-24 md:w-32 h-24 md:h-32 object-contain rotate-[25deg]"
                />
              </div>

              {/* Polaroid Image */}
              <div className="relative mt-8 md:mt-0">
                <div className="relative w-64 md:w-80">
                  <img 
                    src={babyImage} 
                    alt="Peaceful baby moment" 
                    className="absolute top-4 left-4 right-4 bottom-16 w-[calc(100%-2rem)] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Testimonials />
    </>
  );
};

export default Letter; 