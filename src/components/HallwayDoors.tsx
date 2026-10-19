import React, { useState } from 'react';
import { SceneState } from '../types.ts';
import { 
  Building2, 
  Users, 
  FileSignature, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  DoorOpen,
  AlertCircle
} from 'lucide-react';

interface HallwayDoorsProps {
  onSelectDoor: (scene: SceneState) => void;
  onReturnToExterior: () => void;
  reducedMotion: boolean;
}

export const HallwayDoors: React.FC<HallwayDoorsProps> = ({
  onSelectDoor,
  onReturnToExterior,
  reducedMotion,
}) => {
  const [hoveredDoor, setHoveredDoor] = useState<SceneState | null>(null);
  const [doorImageErrors, setDoorImageErrors] = useState<Record<string, boolean>>({});

  const doors = [
    {
      id: 'listings' as SceneState,
      doorNumber: '01',
      title: 'Listings',
      subtitle: 'The Curated Residential Salon',
      description:
        'Step through this door to browse our exclusive Las Vegas luxury homes, architectural specifications, and multi-angle exterior photo collections.',
      previewImage: 'https://wilsonvegas.com/wp-content/uploads/2026/09/wilsonvegas-listings-1536x864.webp',
      buttonLabel: 'Enter Listings Room',
      icon: <Building2 className="w-5 h-5 text-[#C6A77A]" />,
      badge: '3 Active Residences',
    },
    {
      id: 'team' as SceneState,
      doorNumber: '02',
      title: 'Our Team',
      subtitle: 'The Executive Boardroom',
      description:
        'Step inside to meet Darrel Wilson, discover our advisory ethos, and review our awards, luxury certifications, and track record.',
      previewImage: 'https://wilsonvegas.com/wp-content/uploads/2026/09/wilsonvegas-team-wide-1536x864.webp',
      buttonLabel: 'Meet Darrel & The Team',
      icon: <Users className="w-5 h-5 text-[#C6A77A]" />,
      badge: 'Principal & Advisory',
    },
    {
      id: 'contact' as SceneState,
      doorNumber: '03',
      title: 'Contact Us',
      subtitle: 'The Private Signing Pavilion',
      description:
        'Enter our business-oriented signing area to execute an acquisition agreement, arrange private tours, or begin your home sale.',
      previewImage: 'https://wilsonvegas.com/wp-content/uploads/2026/09/wilsonvegas-contact-1536x864.webp',
      buttonLabel: 'Enter Signing Room',
      icon: <FileSignature className="w-5 h-5 text-[#C6A77A]" />,
      badge: 'Official Agreements',
    },
  ];

  return (
    <section 
      className="relative min-h-screen py-28 px-4 sm:px-6 lg:px-8 bg-[#241713] overflow-hidden flex flex-col justify-center"
      aria-label="The Grand Hallway with Three Destination Doors"
    >
      {/* Background Architectural Hallway / Entrance Walkway */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://wilsonvegas.com/wp-content/uploads/2026/09/wilsonvegas-near-1536x864.webp"
          alt="Architectural entrance walkway and corridor of the residence"
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.08]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#241713] via-[#241713]/80 to-[#241713]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Top Header & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-[#3B241B]">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#3B241B]/80 border border-[#C6A77A]/30 text-xs text-[#E0C7A4] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A77A]" />
              <span className="uppercase tracking-widest text-[11px]">The Grand Central Gallery</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#FFFFFF]">
              Where would you like to <span className="italic text-[#E0C7A4]">begin?</span>
            </h2>
            <p className="text-sm sm:text-base text-[#F7F4F0]/80 mt-2 max-w-2xl font-light">
              You are now inside the residence. Three private doors stand before you—choose a destination below to visually enter each dedicated room.
            </p>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <button
              onClick={onReturnToExterior}
              className="px-4 py-2.5 rounded bg-[#3B241B]/90 hover:bg-[#3B241B] text-[#E0C7A4] hover:text-[#FFFFFF] border border-[#C6A77A]/30 text-xs uppercase tracking-wider transition-all flex items-center space-x-2 cursor-pointer min-h-[44px]"
              aria-label="Return to Exterior Landing"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#C6A77A]" />
              <span>Back to Exterior</span>
            </button>
          </div>
        </div>

        {/* The 3 Doors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {doors.map((door) => {
            const isHovered = hoveredDoor === door.id;
            return (
              <div
                key={door.id}
                onMouseEnter={() => setHoveredDoor(door.id)}
                onMouseLeave={() => setHoveredDoor(null)}
                className={`group relative rounded-xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                  isHovered
                    ? 'border-[#C6A77A] shadow-2xl shadow-[#C6A77A]/15 -translate-y-1.5'
                    : 'border-[#3B241B] hover:border-[#C6A77A]/50 bg-[#241713]/90'
                }`}
              >
                {/* Door Frame & Visual Preview Area */}
                <div 
                  className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#241713] cursor-pointer"
                  onClick={() => onSelectDoor(door.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectDoor(door.id);
                    }
                  }}
                  aria-label={`Open Door ${door.doorNumber}: ${door.title}`}
                >
                  {!doorImageErrors[door.previewImage] ? (
                    <img
                      src={door.previewImage}
                      alt={`${door.title} preview`}
                      onError={() => setDoorImageErrors((prev) => ({ ...prev, [door.previewImage]: true }))}
                      className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                        !reducedMotion && isHovered ? 'scale-110 brightness-105' : 'scale-100 brightness-90'
                      }`}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#241713] text-[#E0C7A4]">
                      <AlertCircle className="w-8 h-8 text-[#C6A77A] mb-2" />
                      <span className="text-xs">{door.title}</span>
                    </div>
                  )}

                  {/* Glass & Shadow Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#241713] via-[#241713]/30 to-transparent" />

                  {/* Door Number & Tag */}
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded bg-[#241713]/80 border border-[#C6A77A]/40 text-[#C6A77A] font-serif-luxury text-sm font-semibold tracking-wider">
                      DOOR {door.doorNumber}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#3B241B]/90 text-[10px] uppercase tracking-wider text-[#E0C7A4]">
                      {door.badge}
                    </span>
                  </div>

                  {/* Door Portal Icon Cue */}
                  <div className="absolute bottom-4 right-4 p-2.5 rounded-full bg-[#241713]/80 border border-[#C6A77A]/40 text-[#C6A77A] backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <DoorOpen className="w-5 h-5" />
                  </div>
                </div>

                {/* Door Body Information */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#241713] to-[#3B241B]/40">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      {door.icon}
                      <span className="text-xs uppercase tracking-widest text-[#C6A77A] font-semibold">
                        {door.subtitle}
                      </span>
                    </div>

                    <h3 
                      onClick={() => onSelectDoor(door.id)}
                      className="text-2xl sm:text-3xl font-serif-luxury font-medium text-[#FFFFFF] mb-3 group-hover:text-[#E0C7A4] transition-colors cursor-pointer"
                    >
                      {door.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#F7F4F0]/75 font-light leading-relaxed mb-6">
                      {door.description}
                    </p>
                  </div>

                  {/* Below Door Action Button (Min 44x44px touch target) */}
                  <button
                    onClick={() => onSelectDoor(door.id)}
                    className="w-full py-4 px-4 rounded-md bg-gradient-to-r from-[#3B241B] via-[#6B4634] to-[#8C5E3C] hover:from-[#C6A77A] hover:via-[#E0C7A4] hover:to-[#C6A77A] text-[#F7F4F0] hover:text-[#241713] border border-[#C6A77A]/30 hover:border-[#C6A77A] text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center space-x-2 group-hover:shadow-lg min-h-[44px]"
                    aria-label={`Enter ${door.title} Room`}
                  >
                    <span>{door.buttonLabel}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ambient Hallway Floor Bar */}
        <div className="mt-12 p-4 rounded-lg bg-[#3B241B]/40 border border-[#3B241B] text-center text-xs text-[#E0C7A4]/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="tracking-wide">
            Interactive Experience: Each room reveals bespoke content, architectural photography, and allows continuous return to this hallway.
          </span>
          <span className="text-[#C6A77A] font-medium tracking-widest uppercase text-[11px]">
            WilsonVegas Private Interior Tour
          </span>
        </div>
      </div>
    </section>
  );
};
