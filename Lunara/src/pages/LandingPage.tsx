import React from "react";
import Header from "../components/layout/Header";

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
            backgroundPosition: "center top",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-start justify-center h-full pt-[190px] pb-12 px-8 md:px-12">
          <h1 className="text-white text-[82px] font-['Luxurious_Script'] italic leading-relaxed drop-shadow-lg text-left">
            Rest-centered, postpartum
            <br />
            support for all families
          </h1>

          <div className="flex gap-4 mt-4">
            <button className="px-5 py-1 bg-white text-[#4E1B00] text-lg font-['Luxurious_Roman'] hover:bg-[#A27B5C] hover:text-white rounded-full shadow-md transition-all font-medium border border-[#AD714F] font-['Luxurious_Roman']">
              Services
            </button>
            <button className="px-5 py-1 bg-white text-[#4E1B00] text-lg font-['Luxurious_Roman'] hover:bg-[#A27B5C] hover:text-white rounded-full shadow-md transition-all font-medium border border-[#AD714F] font-['Luxurious_Roman']">
              Inquire
            </button>
          </div>
        </div>
      </div>

      {/* Header overlay */}
      <Header />

      {/* Letter Section */}
      <div className="relative bg-[#FAF7F2] w-full pt-16 pb-40 md:pb-64">
        {/* Full-width letter background */}
        <img
          src="/images/bknds.png"
          alt="Background texture"
          className="hidden md:block absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Coffee-stained paper graphic (overlays left side) */}
        <img
          src="/images/option%202.png"
          alt="Decorative coffee-stained paper"
          className="hidden md:block absolute left-0 top-0 -bottom-24 lg:-bottom-40 w-[560px] select-none pointer-events-none object-cover object-left"
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Letter Content */}
            <div className="relative">
              <h2 className="text-[#4E1B00] text-[40px] md:text-[52px] font-['Luxurious_Script'] italic mb-6 tracking-wide">
                Dear parent,
              </h2>
              <p className="text-[#4E1B00] font-['Luxurious_Roman'] leading-relaxed mb-6 tracking-wide text-[17px] md:text-lg">
                Lunara is a place of softness, reverence, and support. We offer
                gentle transition care rooted in ancient wisdom and aligned with
                your natural rhythms of recovery.
              </p>
              <p className="text-[#4E1B00] font-['Luxurious_Roman'] leading-relaxed mb-6 tracking-wide text-[17px] md:text-lg">
                Whether you're welcoming your first baby or your fifth, your
                needs matter just as much as your baby's.
              </p>
              <p className="text-[#4E1B00] font-['Luxurious_Roman'] leading-relaxed tracking-wide text-[17px] md:text-lg">
                With gentle rituals, warm guidance, and practical care, we will
                be here to walk beside you in the early days, the long nights,
                and everything in between.
              </p>
            </div>

            {/* Image Stack – floating framed photos */}
            <div className="flex flex-col gap-6 items-start md:absolute md:top-4 md:right-6 lg:right-16 md:z-20">
              {/* Baby Eli photo */}
              <div className="w-56 md:w-72 h-36 md:h-48 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/images/baby%20eli.png"
                  alt="Baby Eli sleeping peacefully"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Belly photo */}
              <div className="w-56 md:w-72 h-36 md:h-48 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/images/belly.png"
                  alt="Pregnant belly with hand resting"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LandingPage;
