import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';

export default function AboutDoulaPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-cream flex justify-center">
      <div className="w-full max-w-[1076px]">
        {/* Sarah Hero Section – tucked under header, like LandingPage */}
        <div className="relative w-full h-[580px] -mt-[50px]">
          {/* Sarah Background Image */}
          <div
            className="absolute inset-0 z-0 w-full h-full"
            style={{
              backgroundImage: `url('/images/sarah.png')`,
              backgroundPosition: 'center top',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          />
          {/* Overlay Heading */}
          <h1
            className="text-white text-[82px] font-['Luxurious_Script'] text-center absolute left-1/2 top-[65%] transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none select-none"
            style={{
              WebkitTextStroke: '1px rgba(87, 32, 3, 0.35)',
              lineHeight: '74px',
              letterSpacing: '2.46px'
            }}
          >
            Deep Roots, Gentle Hands
          </h1>
          {/* Algiz Icon - larger, no brown border */}
          <div
            className="absolute left-1/2 -bottom-16 transform -translate-x-1/2 z-20 bg-white rounded-full shadow-lg flex items-center justify-center"
            style={{ width: '120px', height: '120px' }}
          >
            <img
              src="/images/algiz.png"
              alt="Algiz Rune"
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>

        {/* Header overlay */}
        <Header />
        
        {/* Sarah's Story Section */}
        <div className="w-full px-8 mt-20 pb-16">
        <div className="flex gap-12 items-start">
          {/* Text Content */}
          <div className="flex-1 space-y-8">
            <p style={{
              color: '#571E00',
              fontFamily: 'Luxurious Roman, serif',
              fontSize: '23px',
              fontWeight: 400,
              lineHeight: '25px',
              letterSpacing: '1.15px',
              fontStyle: 'normal',
            }}>
              I was raised in the mountains of eastern Tennessee, molded by slow living and the quiet wisdom of 
              women who knew how to tend what matters. I'm Sarah, a postpartum doula and mother of three. I now 
              live in Arizona, bringing that same spirit into the homes I serve.
            </p>
            
            <p style={{
              color: '#571E00',
              fontFamily: 'Luxurious Roman, serif',
              fontSize: '23px',
              fontWeight: 400,
              lineHeight: '25px',
              letterSpacing: '1.15px',
              fontStyle: 'normal',
            }}>
              I knew I wanted to become a doula after navigating postpartum alone. I've known the ache of early days, 
              the fog of exhaustion, the quiet beauty, and the deep overwhelm. What I longed for in those moments 
              wasn't advice or fixes; it was presence. Someone to show up with calm hands, a warm meal, and no 
              expectation. That's the kind of care I strive to offer: steady, intentional, and deeply human.
            </p>
            
            <p style={{
              color: '#571E00',
              fontFamily: 'Luxurious Roman, serif',
              fontSize: '23px',
              fontWeight: 400,
              lineHeight: '25px',
              letterSpacing: '1.15px',
              fontStyle: 'normal',
            }}>
              My approach is shaped by both traditional practices and current, evidence-based postpartum care. I 
              support families through the fourth trimester with services like newborn guidance, emotional support, 
              warm meals, overnight care, and planning for rest.
            </p>
            
            <p style={{
              color: '#571E00',
              fontFamily: 'Luxurious Roman, serif',
              fontSize: '23px',
              fontWeight: 400,
              lineHeight: '25px',
              letterSpacing: '1.15px',
              fontStyle: 'normal',
            }}>
              I hold space for all birthing bodies and family structures, offering inclusive, trauma-aware care that 
              respects autonomy, identity, and lived experience. Every visit is built around your needs; anchored in 
              rhythm, reverence, and presence.
            </p>
          </div>
          
          {/* Portrait Image and Button */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <img
              src="/images/portrait.png"
              alt="Sarah Portrait"
              className="w-80 h-auto object-contain rounded-3xl mb-6"
            />
            
            {/* Our Philosophy Button */}
            <button
              className="px-8 py-3 rounded-full bg-[#DED7CD] text-[#AA6641] font-['Luxurious_Roman'] text-[21px] tracking-wide border border-[#CAC3BC] shadow-inner transition"
              style={{
                fontFamily: 'Luxurious Roman, serif',
                fontWeight: 400,
                fontStyle: 'normal',
              }}
              onClick={() => navigate('/about')}
            >
              Our Philosophy
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
