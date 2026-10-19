import React, { useState } from 'react';
import { SceneState } from '../types.ts';
import { ArrowDown, ArrowRight, Compass, ShieldCheck, Sparkles, Building2 } from 'lucide-react';

interface ExteriorLandingProps {
  onEnterHallway: () => void;
  onDirectToListings: () => void;
  reducedMotion: boolean;
}

export const ExteriorLanding: React.FC<ExteriorLandingProps> = ({
  onEnterHallway,
  onDirectToListings,
  reducedMotion,
}) => {
  const [isHoveringEntrance, setIsHoveringEntrance] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[#241713]">
      {/* Background Exterior Twilight Panorama */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://wilsonvegas.com/wp-content/uploads/2026/09/wilsonvegas-exterior-1536x864.webp"
          alt="WilsonVegas Modern Luxury Architectural Residence in Las Vegas at Twilight"
          className={`w-full h-full object-cover object-center transition-transform duration-1000 ease-out ${
            !reducedMotion && isHoveringEntrance ? 'scale-105' : 'scale-100'
          }`}
          loading="eager"
        />
        {/* Subtle Brown-to-Espresso Luxury Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#241713] via-[#241713]/40 to-[#241713]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#241713]/85 via-transparent to-[#241713]/85" />
      </div>

      {/* Top Banner Notice */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#241713]/80 border border-[#C6A77A]/40 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#C6A77A]" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#E0C7A4] font-medium">
            Las Vegas Residential Real Estate · Private Portfolio
          </span>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-12">
        <div className="max-w-3xl">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#C6A77A] font-semibold mb-3 flex items-center">
            <span className="w-8 h-[1px] bg-[#C6A77A] mr-3 inline-block" />
            WilsonVegas Architectural Collection
          </p>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif-luxury font-normal text-[#FFFFFF] leading-[1.08] mb-6 drop-shadow-md">
            Discover Exceptional Living in <span className="italic text-[#E0C7A4]">Las Vegas.</span>
          </h1>

          <p className="text-base sm:text-xl text-[#F7F4F0]/90 font-light leading-relaxed mb-8 max-w-2xl drop-shadow">
            Explore distinguished homes, discover extraordinary properties, and step through the doors of an exclusive residential portfolio crafted for discerning buyers.
          </p>

          {/* Action Button Group */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-5">
            <button
              onClick={onEnterHallway}
              onMouseEnter={() => setIsHoveringEntrance(true)}
              onMouseLeave={() => setIsHoveringEntrance(false)}
              className="group relative px-8 py-4 rounded-md bg-gradient-to-r from-[#C6A77A] via-[#E0C7A4] to-[#C6A77A] text-[#241713] font-semibold text-sm tracking-wider uppercase transition-all duration-300 shadow-xl hover:shadow-[#C6A77A]/20 hover:scale-[1.02] cursor-pointer flex items-center justify-center space-x-3"
            >
              <span>Enter The Residence</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onDirectToListings}
              className="px-7 py-4 rounded-md bg-[#241713]/80 hover:bg-[#3B241B] text-[#FFFFFF] border border-[#C6A77A]/40 hover:border-[#C6A77A] font-medium text-sm tracking-wider uppercase transition-all duration-200 backdrop-blur-sm cursor-pointer flex items-center justify-center space-x-2"
            >
              <Building2 className="w-4 h-4 text-[#C6A77A]" />
              <span>Browse Listings Directly</span>
            </button>
          </div>

          {/* Key Value Points */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 border-t border-[#3B241B]/80 text-[#E0C7A4]">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#C6A77A] shrink-0" />
              <span className="text-xs tracking-wide">Confidential Representation</span>
            </div>
            <div className="flex items-center space-x-2">
              <Compass className="w-4 h-4 text-[#C6A77A] shrink-0" />
              <span className="text-xs tracking-wide">Premier Gated Enclaves</span>
            </div>
            <div className="flex items-center space-x-2 col-span-2 sm:col-span-1">
              <Sparkles className="w-4 h-4 text-[#C6A77A] shrink-0" />
              <span className="text-xs tracking-wide">Turnkey Architectural Estates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-[#E0C7A4]/80 pt-6">
        <div className="flex items-center space-x-2 mb-3 sm:mb-0">
          <span className="w-2 h-2 rounded-full bg-[#C6A77A] animate-ping" />
          <span className="tracking-wide">Current View: Private Foothills Residence Exterior · Las Vegas, NV</span>
        </div>

        <button
          onClick={onEnterHallway}
          className="flex items-center space-x-2 text-[#C6A77A] hover:text-[#FFFFFF] transition-colors py-2 px-3 rounded hover:bg-[#3B241B]/50 cursor-pointer"
        >
          <span className="uppercase tracking-widest text-[11px]">Scroll Down or Tap to Step Inside</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
