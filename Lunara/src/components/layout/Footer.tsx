import React from 'react';

/**
 * New footer implementation based on the latest Figma design (node 128-2).
 * The design features:
 * 1. A dark brown announcement bar containing service categories separated by pipes.
 * 2. A light cream section that centres two brand images – the "Ally" badge and the Lunara stamp logo.
 * 3. A simple copyright line.
 */

export const Footer: React.FC = () => {
  const categories = [
    'HERBAL SUPPORT',
    'NIGHT CARE',
    'POSTPARTUM PLANNING',
    'POSTPARTUM AFTERCARE'
  ];

  return (
    <footer className="w-full">
      {/* Category / Announcement bar */}
      <div className="w-full bg-[#7B3F26] py-2 px-4 flex justify-center">
        <ul className="flex flex-wrap justify-center items-center gap-2 md:gap-4 text-[#FAF7F2] font-['Luxurious_Roman'] text-sm md:text-base font-['Luxurious_Roman'] tracking-wider">
          {categories.map((label, idx) => (
            <React.Fragment key={label}>
              {idx !== 0 && <span className="hidden md:inline text-[#FAF7F2]">|</span>}
              <li className="whitespace-nowrap uppercase">{label}</li>
            </React.Fragment>
          ))}
        </ul>
      </div>

      {/* Main footer body */}
      <div className="bg-[#FAF7F2] text-[#4E1B00] pt-12 pb-8">
        {/* Brand icons – grid ensures the stamp stays perfectly centered */}
        <div className="grid grid-cols-3 items-center justify-items-center max-w-[1076px] mx-auto">
          {/* Ally badge – right-aligned within the first column so it sits closer to the centre */}
          <img
            src="/images/ally.png"
            alt="Ally icon"
            className="justify-self-end mr-16 md:mr-14 w-20 h-16 md:w-20 md:h-20 object-contain"
          />

          {/* Lunara stamp – centred in the middle column, aligning with the wax seal in the header */}
          <img
            src="/images/lunara%20stamp.png"
            alt="Lunara stamp logo"
            className="w-24 h-24 md:w-32 md:h-32 object-contain"
          />

          {/* Empty third column acts as spacer to keep the overall grid symmetric */}
          <span className="hidden" />
        </div>

        {/* Divider */}
        <div className="max-w-[900px] mx-auto my-8 border-t border-[#4E1B00]/20" />

        {/* Copyright */}
        <p className="text-center text-xs md:text-sm tracking-wide">
          © {new Date().getFullYear()} Lunara. All rights reserved.
        </p>
      </div>
    </footer>
  );
};


