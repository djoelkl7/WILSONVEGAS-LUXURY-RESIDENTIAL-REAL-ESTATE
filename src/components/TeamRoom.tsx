import React, { useState } from 'react';
import { 
  RotateCcw, 
  Award, 
  ShieldCheck, 
  TrendingUp, 
  Briefcase, 
  CheckCircle, 
  FileSignature, 
  Sparkles, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';

interface TeamRoomProps {
  onReturnToHallway: () => void;
  onProceedToSigning: () => void;
  reducedMotion: boolean;
}

export const TeamRoom: React.FC<TeamRoomProps> = ({
  onReturnToHallway,
  onProceedToSigning,
  reducedMotion,
}) => {
  const [imageError, setImageError] = useState(false);

  const awards = [
    {
      title: 'Top 1% Luxury Producer',
      organization: 'Greater Las Vegas Association of Realtors',
      year: '2023 – 2026',
      description: 'Recognized consecutively for top-tier residential volume across Summerlin and MacDonald Highlands.',
      icon: <Award className="w-5 h-5 text-[#C6A77A]" />,
    },
    {
      title: 'Certified Luxury Home Marketing Specialist (CLHMS™)',
      organization: 'The Institute for Luxury Home Marketing',
      year: 'Million Dollar Guild Member',
      description: 'Designated authority for marketing and acquiring prime architectural estates valued over $3M+.',
      icon: <ShieldCheck className="w-5 h-5 text-[#C6A77A]" />,
    },
    {
      title: 'Over $180M+ In Curated Transactions',
      organization: 'Private Wealth & Residential Portfolio',
      year: 'Career Benchmark',
      description: 'Proven track record of discrete, confidential purchases and off-market estate acquisitions.',
      icon: <TrendingUp className="w-5 h-5 text-[#C6A77A]" />,
    },
    {
      title: 'Bespoke Architectural Advisory',
      organization: 'Custom Residential Representation',
      year: 'Bespoke Service',
      description: 'Advising private clients on estate positioning, architectural acoustics, and site security.',
      icon: <Briefcase className="w-5 h-5 text-[#C6A77A]" />,
    },
  ];

  const coreSkills = [
    'Confidential Negotiation & Client Anonymity Safeguards',
    'Private Off-Market & Pocket Listing Access across Southern Nevada',
    'Comprehensive Architectural, Structural & Land Appraisals',
    'Custom Estate Development & Builder Representation',
    'Cross-Border & Relocation Advisory for High-Net-Worth Principals',
    'Precision Contract Structuring & Closing Escrow Management',
  ];

  return (
    <section 
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-[#241713] text-[#F7F4F0] overflow-hidden"
      aria-label="Room 02 - Executive Boardroom and Team Profile"
    >
      {/* Top Breadcrumb & Hallway Return */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#3B241B] pb-6 no-print">
        <button
          onClick={onReturnToHallway}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-md bg-[#3B241B] hover:bg-[#6B4634] text-[#C6A77A] hover:text-[#FFFFFF] border border-[#C6A77A]/30 text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer shadow-md min-h-[44px]"
          aria-label="Return to Grand Hallway with 3 Doors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>← Back into the Hallway</span>
        </button>

        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#3B241B]/70 border border-[#C6A77A]/25 text-xs text-[#E0C7A4]">
          <Sparkles className="w-3.5 h-3.5 text-[#C6A77A]" />
          <span className="uppercase tracking-widest text-[11px]">Room 02 · The Executive Boardroom</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Main Boardroom Visual Hero */}
        <div className="relative rounded-2xl overflow-hidden border border-[#C6A77A]/30 shadow-2xl bg-black">
          <div className="relative h-80 sm:h-[440px] w-full">
            {!imageError ? (
              <img
                src="https://wilsonvegas.com/wp-content/uploads/2026/09/wilsonvegas-team-wide-1536x864.webp"
                alt="Darrel Wilson at the head of the conference table in the luxury boardroom"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-center filter brightness-[0.9] contrast-[1.05]"
                loading="eager"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#241713] text-[#E0C7A4]">
                <AlertCircle className="w-10 h-10 text-[#C6A77A] mb-2" />
                <span className="text-lg font-serif-luxury">Darrel Wilson · Principal & Luxury Advisor</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#241713] via-[#241713]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#241713]/80 via-transparent to-[#241713]/80" />

            {/* Inset Label */}
            <div className="absolute bottom-6 left-6 sm:left-10 right-6 max-w-2xl">
              <span className="px-3 py-1 rounded bg-[#241713]/90 text-[#C6A77A] border border-[#C6A77A]/40 text-xs uppercase tracking-widest font-semibold inline-block mb-3">
                Principal & Luxury Advisor
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif-luxury font-medium text-[#FFFFFF] leading-tight">
                Darrel Wilson.
              </h2>
              <p className="text-sm sm:text-base text-[#F7F4F0]/90 font-light mt-2">
                Guiding discerning buyers, private investors, and luxury homeowners through Las Vegas's most distinguished residential acquisitions.
              </p>
            </div>
          </div>
        </div>

        {/* Narrative & Skills Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Executive Biography (7 Cols) */}
          <div className="lg:col-span-7 bg-gradient-to-b from-[#3B241B]/70 to-[#241713] p-8 rounded-2xl border border-[#3B241B] space-y-6">
            <div className="flex items-center space-x-2 text-[#C6A77A] text-xs uppercase tracking-widest font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Bespoke Residential Representation</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif-luxury text-[#FFFFFF] font-normal leading-snug">
              "Every exceptional residence has a soul. Our duty is uniting the right owner with their architectural sanctuary."
            </h3>

            <p className="text-sm text-[#F7F4F0]/85 font-light leading-relaxed">
              At WilsonVegas, luxury real estate is never transactional. Founded by Darrel Wilson, our practice is built on complete discretion, intimate neighborhood intelligence, and a meticulous command of high-end design.
            </p>

            <p className="text-sm text-[#F7F4F0]/85 font-light leading-relaxed">
              Whether you are acquiring a contemporary ridge estate in The Ridges of Summerlin, building a custom compound in MacDonald Highlands, or seeking a quiet, confidential sale, we provide unwavering advocacy from initial inspection through final signing.
            </p>

            {/* Core Skills Checklist */}
            <div className="pt-4 border-t border-[#3B241B]">
              <h4 className="text-xs uppercase tracking-widest text-[#C6A77A] font-semibold mb-3">
                Key Professional Competencies
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {coreSkills.map((skill, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-[#E0C7A4]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#C6A77A] shrink-0 mt-0.5" />
                    <span className="leading-tight">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Honest Disclosure Note */}
            <p className="text-[11px] text-[#E0C7A4]/60 italic pt-2">
              * Note: Executive portrait is based on authentic principal photography; boardroom styling and conference setting are illustrative representations.
            </p>
          </div>

          {/* Awards & Recognition Showcase (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-[#241713] border border-[#C6A77A]/30 shadow-xl space-y-5">
              <h3 className="text-xl font-serif-luxury text-[#FFFFFF] font-medium flex items-center justify-between">
                <span>Honors & Credentials</span>
                <Award className="w-5 h-5 text-[#C6A77A]" />
              </h3>

              <div className="space-y-4">
                {awards.map((award, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-[#3B241B]/40 border border-[#3B241B] hover:border-[#C6A77A]/50 transition-colors"
                  >
                    <div className="flex items-center space-x-2.5 mb-1">
                      {award.icon}
                      <span className="text-sm font-serif-luxury font-semibold text-[#FFFFFF]">
                        {award.title}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#C6A77A] mb-1.5 font-medium">
                      <span>{award.organization}</span>
                      <span>{award.year}</span>
                    </div>
                    <p className="text-xs text-[#F7F4F0]/75 font-light leading-snug">
                      {award.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action: Proceed to Signing Room */}
              <div className="pt-2">
                <button
                  onClick={onProceedToSigning}
                  className="w-full py-4 px-4 rounded-md bg-gradient-to-r from-[#C6A77A] to-[#8C5E3C] hover:from-[#E0C7A4] hover:to-[#C6A77A] text-[#241713] font-bold text-xs tracking-wider uppercase transition-all shadow-lg cursor-pointer flex items-center justify-center space-x-2 min-h-[44px]"
                  aria-label="Proceed to Signing Room to discuss consultation"
                >
                  <FileSignature className="w-4 h-4" />
                  <span>Enter Signing Room for Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Return Strip */}
        <div className="text-center pt-4">
          <button
            onClick={onReturnToHallway}
            className="inline-flex items-center space-x-2 px-7 py-3 rounded-md bg-[#3B241B] hover:bg-[#6B4634] text-[#C6A77A] hover:text-[#FFFFFF] border border-[#C6A77A]/40 text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer shadow-md min-h-[44px]"
            aria-label="Return to Grand Hallway with 3 Doors"
          >
            <RotateCcw className="w-4 h-4 text-[#C6A77A]" />
            <span>Return to Hallway (Choose Another Door)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
