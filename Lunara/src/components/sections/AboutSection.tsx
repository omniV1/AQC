import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AboutSection() {
  const navigate = useNavigate();
  return (
    <section className="pt-8 pb-8">
      <div className="max-w-[900px] mx-auto px-4">
        <div className="space-y-8 mx-auto">
          <p style={{
            color: '#571E00',
            fontFamily: 'Luxurious Roman, serif',
            fontSize: '23px',
            fontWeight: 400,
            lineHeight: '25px',
            letterSpacing: '1.15px',
            fontStyle: 'normal',
          }}>
            At Lunara, we believe the postpartum window is sacred. It is a tender, often unseen space of becoming. Like the moon, this season is not linear. It waxes and wanes, asks for rest, and invites us inward.
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
            Our care is guided by the rhythms of nature, the wisdom of the body, and the quiet needs that arise after birth. We draw inspiration from Lucina, goddess of childbirth, and Luna, whose phases mirror the unfolding path into new parenthood. In this way, Lunara offers care that honors slowness, softness, and self-reclamation.
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
            We are also deeply committed to sustainability and conscious stewardship. From low-waste practices to herbal support and circular care models, every offering is rooted in reverence for the birthing body, the family, and the earth.
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
            Postpartum deserves more than recovery. It deserves ritual, restoration, and respect.
          </p>
          {/* Button */}
          <div className="flex justify-center pt-4">
            <button
              className="px-8 py-3 rounded-full bg-[#DED7CD] text-[#AA6641] font-['Luxurious_Roman'] text-[21px] tracking-wide border border-[#CAC3BC] shadow-inner transition"
              style={{
                fontFamily: 'Luxurious Roman, serif',
                fontWeight: 400,
                fontStyle: 'normal',
              }}
              onClick={() => navigate('/about-doula')}
            >
              Meet Your Doula
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 