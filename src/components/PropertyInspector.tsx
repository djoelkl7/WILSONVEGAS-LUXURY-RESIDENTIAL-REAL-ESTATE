import React, { useState, useEffect } from 'react';
import { PropertyListing, PropertyAngle } from '../types.ts';
import { 
  RotateCcw, 
  ArrowLeft, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Camera, 
  Bed, 
  Bath, 
  Maximize2, 
  CheckCircle2, 
  FileSignature, 
  MapPin, 
  Share2, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface PropertyInspectorProps {
  property: PropertyListing;
  onBackToListings: () => void;
  onReturnToHallway: () => void;
  onSignContract: (property: PropertyListing) => void;
  reducedMotion: boolean;
}

export const PropertyInspector: React.FC<PropertyInspectorProps> = ({
  property,
  onBackToListings,
  onReturnToHallway,
  onSignContract,
  reducedMotion,
}) => {
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const currentAngle: PropertyAngle = property.angles[activeAngleIndex] || property.angles[0];

  const handlePrevAngle = () => {
    setActiveAngleIndex((prev) => (prev === 0 ? property.angles.length - 1 : prev - 1));
  };

  const handleNextAngle = () => {
    setActiveAngleIndex((prev) => (prev === property.angles.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation for exterior angles (Left/Right arrow keys)
  // Ensure keyboard navigation only runs when focus is NOT inside an input or form control
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInputFocused = activeEl && ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(activeEl.tagName);

      if (e.key === 'ArrowLeft') {
        if (!isInputFocused) {
          e.preventDefault();
          handlePrevAngle();
        }
      } else if (e.key === 'ArrowRight') {
        if (!isInputFocused) {
          e.preventDefault();
          handleNextAngle();
        }
      } else if (e.key === 'Escape') {
        onBackToListings();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [property.angles.length]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleImageError = (imgKey: string) => {
    setImageErrorMap((prev) => ({ ...prev, [imgKey]: true }));
  };

  return (
    <section 
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-[#241713] text-[#F7F4F0] overflow-hidden"
      aria-label="Property Exterior Angle Inspector"
    >
      {/* Top Floating Return Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#3B241B] pb-6 no-print">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToListings}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-md bg-[#3B241B] hover:bg-[#6B4634] text-[#C6A77A] hover:text-[#FFFFFF] border border-[#C6A77A]/30 text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer min-h-[44px]"
            aria-label="Return to Listings Room"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to Listings Room</span>
          </button>

          <button
            onClick={onReturnToHallway}
            className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-md bg-[#241713] hover:bg-[#3B241B] text-[#E0C7A4] border border-[#3B241B] text-xs font-medium uppercase tracking-wider transition-all cursor-pointer min-h-[44px]"
            aria-label="Return to Grand Hallway with 3 Doors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#C6A77A]" />
            <span className="hidden sm:inline">Grand Hallway (3 Doors)</span>
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleShare}
            className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-md bg-[#3B241B]/70 hover:bg-[#3B241B] text-[#E0C7A4] border border-[#C6A77A]/20 text-xs cursor-pointer min-h-[44px]"
            aria-label="Share this property"
          >
            <Share2 className="w-3.5 h-3.5 text-[#C6A77A]" />
            <span>{copiedLink ? 'Link Copied!' : 'Share Residence'}</span>
          </button>

          <button
            onClick={() => onSignContract(property)}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-md bg-gradient-to-r from-[#C6A77A] to-[#8C5E3C] hover:from-[#E0C7A4] hover:to-[#C6A77A] text-[#241713] font-semibold text-xs tracking-wider uppercase transition-all shadow-lg cursor-pointer min-h-[44px]"
            aria-label="Proceed to sign purchase intent for this property"
          >
            <FileSignature className="w-4 h-4" />
            <span>Sign Purchase Intent</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Multi-Angle Visual Showcase (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-5">
          {/* Main Visual Display */}
          <div 
            className="relative h-[420px] sm:h-[520px] rounded-2xl overflow-hidden bg-black/60 border border-[#C6A77A]/30 shadow-2xl group"
            role="region"
            aria-roledescription="carousel"
            aria-label={`Exterior image of ${property.title}, angle ${activeAngleIndex + 1} of ${property.angles.length}: ${currentAngle.label}`}
          >
            {!imageErrorMap[currentAngle.imageUrl] ? (
              <img
                src={currentAngle.imageUrl}
                alt={`${property.title} - ${currentAngle.label} perspective. ${currentAngle.description}`}
                onError={() => handleImageError(currentAngle.imageUrl)}
                className={`w-full h-full object-cover transition-all duration-500 ease-out ${
                  !reducedMotion ? 'scale-100 group-hover:scale-[1.02]' : ''
                }`}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#3B241B]/80 text-[#E0C7A4] p-6 text-center">
                <AlertCircle className="w-10 h-10 text-[#C6A77A] mb-2" />
                <p className="text-sm font-semibold">{currentAngle.label} Elevation</p>
                <p className="text-xs text-[#E0C7A4]/70 mt-1">High-resolution exterior plate available upon private request.</p>
              </div>
            )}

            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#241713] via-transparent to-black/40 pointer-events-none" />

            {/* Angle Badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
              <span className="px-3.5 py-1.5 rounded-md bg-[#241713]/90 backdrop-blur-md border border-[#C6A77A]/40 text-xs font-semibold text-[#C6A77A] flex items-center space-x-1.5 shadow-lg">
                <Camera className="w-3.5 h-3.5" />
                <span>Angle {activeAngleIndex + 1} of {property.angles.length}: {currentAngle.label}</span>
              </span>
            </div>

            {/* Left / Right Arrow Buttons (Min 44x44px touch targets) */}
            <button
              onClick={handlePrevAngle}
              aria-label="Previous exterior angle"
              className="absolute left-4 top-1/2 -translate-y-1/2 min-w-[48px] min-h-[48px] rounded-full bg-[#241713]/85 hover:bg-[#C6A77A] text-[#FFFFFF] hover:text-[#241713] border border-[#C6A77A]/40 transition-all cursor-pointer backdrop-blur-sm shadow-xl flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNextAngle}
              aria-label="Next exterior angle"
              className="absolute right-4 top-1/2 -translate-y-1/2 min-w-[48px] min-h-[48px] rounded-full bg-[#241713]/85 hover:bg-[#C6A77A] text-[#FFFFFF] hover:text-[#241713] border border-[#C6A77A]/40 transition-all cursor-pointer backdrop-blur-sm shadow-xl flex items-center justify-center"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Bottom Caption */}
            <div 
              className="absolute bottom-4 left-4 right-4 z-10 p-4 rounded-xl bg-[#241713]/90 backdrop-blur-md border border-[#3B241B]"
              aria-live="polite"
            >
              <p className="text-sm font-medium text-[#FFFFFF] mb-1">
                {currentAngle.label}
              </p>
              <p className="text-xs text-[#E0C7A4]/90 font-light">
                {currentAngle.description}
              </p>
            </div>
          </div>

          {/* Exterior Angle Thumbnail Selector Bar */}
          <div className="bg-[#3B241B]/40 p-4 rounded-xl border border-[#3B241B] flex flex-col space-y-3">
            <div className="flex items-center justify-between text-xs text-[#E0C7A4]">
              <span className="font-semibold uppercase tracking-wider text-[11px] flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-[#C6A77A]" />
                <span>Select Exterior Angle or use Keyboard Arrow Keys (← / →)</span>
              </span>
              <span className="text-[11px] text-[#C6A77A]">360° Perimeter View</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3" role="tablist" aria-label="Property Angles">
              {property.angles.map((angle, idx) => {
                const isActive = idx === activeAngleIndex;
                return (
                  <button
                    key={angle.id + idx}
                    onClick={() => setActiveAngleIndex(idx)}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`View angle ${idx + 1}: ${angle.label}`}
                    className={`relative rounded-lg overflow-hidden border-2 text-left transition-all p-1.5 cursor-pointer min-h-[48px] ${
                      isActive
                        ? 'border-[#C6A77A] bg-[#C6A77A]/20 scale-102 shadow-lg ring-1 ring-[#C6A77A]'
                        : 'border-[#3B241B] hover:border-[#C6A77A]/50 bg-[#241713]'
                    }`}
                  >
                    <div className="h-16 w-full rounded overflow-hidden bg-black/40">
                      <img
                        src={angle.imageUrl}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="block text-[11px] font-medium text-[#FFFFFF] mt-1.5 truncate">
                      {angle.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Architectural Overview Narrative */}
          <div className="bg-[#241713] p-7 rounded-2xl border border-[#3B241B] space-y-4">
            <h3 className="text-2xl font-serif-luxury text-[#FFFFFF] font-normal">
              Architectural Concept & Setting
            </h3>
            <p className="text-sm text-[#F7F4F0]/85 font-light leading-relaxed">
              {property.description}
            </p>
          </div>
        </div>

        {/* Right Column: Specifications & Acquisition Trigger (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          {/* Main Price & Title Card */}
          <div className="bg-gradient-to-b from-[#3B241B]/90 to-[#241713] p-7 rounded-2xl border border-[#C6A77A]/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#241713] text-[#C6A77A] border border-[#C6A77A]/40 text-xs uppercase tracking-widest font-semibold">
                {property.status}
              </span>
              <span className="text-xs text-[#E0C7A4] font-medium font-mono">Ref: {property.id.toUpperCase()}</span>
            </div>

            <div>
              <h2 className="text-3xl font-serif-luxury text-[#FFFFFF] font-medium mb-1">
                {property.title}
              </h2>
              <p className="text-xs text-[#E0C7A4] flex items-center">
                <MapPin className="w-3.5 h-3.5 text-[#C6A77A] mr-1 shrink-0" />
                {property.address}, {property.neighborhood}
              </p>
            </div>

            <div className="pt-2 border-t border-[#3B241B]">
              <span className="text-xs uppercase tracking-wider text-[#E0C7A4]/70 block">Listing Price</span>
              <span className="text-4xl font-serif-luxury font-bold text-[#FFFFFF] text-[#C6A77A]">
                {property.formattedPrice}
              </span>
            </div>

            {/* Quick Spec Metrics */}
            <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-lg bg-[#241713]/80 border border-[#3B241B] text-center">
              <div>
                <div className="flex items-center justify-center space-x-1 text-[#FFFFFF]">
                  <Bed className="w-4 h-4 text-[#C6A77A]" />
                  <span className="font-semibold text-sm">{property.beds}</span>
                </div>
                <span className="text-[10px] uppercase text-[#E0C7A4]/70">Beds</span>
              </div>

              <div>
                <div className="flex items-center justify-center space-x-1 text-[#FFFFFF]">
                  <Bath className="w-4 h-4 text-[#C6A77A]" />
                  <span className="font-semibold text-sm">{property.baths}</span>
                </div>
                <span className="text-[10px] uppercase text-[#E0C7A4]/70">Baths</span>
              </div>

              <div>
                <div className="flex items-center justify-center space-x-1 text-[#FFFFFF]">
                  <Maximize2 className="w-4 h-4 text-[#C6A77A]" />
                  <span className="font-semibold text-sm">{property.sqft.toLocaleString()}</span>
                </div>
                <span className="text-[10px] uppercase text-[#E0C7A4]/70">Sq Ft</span>
              </div>
            </div>

            {/* Additional Specs */}
            <div className="text-xs space-y-2 pt-2 text-[#F7F4F0]/80">
              <div className="flex justify-between py-1 border-b border-[#3B241B]/80">
                <span className="text-[#E0C7A4]">Lot Dimension:</span>
                <span className="font-medium text-[#FFFFFF]">{property.lotSize}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#3B241B]/80">
                <span className="text-[#E0C7A4]">Year Completed:</span>
                <span className="font-medium text-[#FFFFFF]">{property.yearBuilt}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#3B241B]/80">
                <span className="text-[#E0C7A4]">Architectural Style:</span>
                <span className="font-medium text-[#FFFFFF]">{property.propertyType}</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-4">
              <button
                onClick={() => onSignContract(property)}
                className="w-full py-4 px-6 rounded-md bg-gradient-to-r from-[#C6A77A] via-[#E0C7A4] to-[#C6A77A] hover:opacity-95 text-[#241713] font-bold text-xs tracking-widest uppercase transition-all shadow-xl cursor-pointer flex items-center justify-center space-x-2 min-h-[44px]"
              >
                <FileSignature className="w-4 h-4" />
                <span>Sign Intent for this Residence</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-center text-[#E0C7A4]/70 mt-2">
                Opens Room 3 (Signing Pavilion) with this property pre-selected.
              </p>
            </div>
          </div>

          {/* Key Architectural Highlights */}
          <div className="bg-[#241713] p-6 rounded-2xl border border-[#3B241B] space-y-4">
            <h4 className="text-sm uppercase tracking-widest text-[#C6A77A] font-semibold">
              Estate Highlights
            </h4>
            <ul className="space-y-2.5">
              {property.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start space-x-2.5 text-xs text-[#F7F4F0]/90">
                  <CheckCircle2 className="w-4 h-4 text-[#C6A77A] shrink-0 mt-0.5" />
                  <span className="leading-snug">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
