import React from 'react';
import { SceneState } from '../types.ts';
import { Building2, DoorClosed, Users, FileSignature, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (scene: SceneState) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#1A100D] border-t border-[#3B241B] text-[#F7F4F0] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#3B241B]/80">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('exterior')}>
              <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[#C6A77A] to-[#8C5E3C] flex items-center justify-center text-[#241713] font-bold font-serif-luxury text-xl">
                WV
              </div>
              <div>
                <span className="text-2xl font-serif-luxury font-medium tracking-[0.2em] text-[#FFFFFF] block">
                  WILSONVEGAS
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A77A] font-medium block">
                  Luxury Residential Real Estate · Las Vegas
                </span>
              </div>
            </div>

            <p className="text-xs text-[#E0C7A4]/80 font-light leading-relaxed max-w-md">
              Specializing in the confidential acquisition and representation of distinguished residential properties across Summerlin, The Ridges, MacDonald Highlands, and greater Southern Nevada.
            </p>

            <div className="pt-2 text-xs text-[#E0C7A4]/60 space-y-1">
              <p>Darrel Wilson · Principal & Luxury Property Broker</p>
              <p>Las Vegas, Nevada · Confidential Consultations by Appointment</p>
            </div>
          </div>

          {/* Architectural Journey Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#C6A77A] font-semibold mb-4">
              Visual Tour Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E0C7A4]/80">
              <li>
                <button
                  onClick={() => onNavigate('exterior')}
                  className="hover:text-[#FFFFFF] transition-colors flex items-center space-x-2 cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#C6A77A]" />
                  <span>Main Entrance & Exterior</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('hallway')}
                  className="hover:text-[#FFFFFF] transition-colors flex items-center space-x-2 cursor-pointer"
                >
                  <DoorClosed className="w-3.5 h-3.5 text-[#C6A77A]" />
                  <span>The Grand Hallway (3 Doors)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('listings')}
                  className="hover:text-[#FFFFFF] transition-colors flex items-center space-x-2 cursor-pointer"
                >
                  <span className="text-[#C6A77A] font-mono text-[10px]">01</span>
                  <span>The Listings Living Room</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('team')}
                  className="hover:text-[#FFFFFF] transition-colors flex items-center space-x-2 cursor-pointer"
                >
                  <span className="text-[#C6A77A] font-mono text-[10px]">02</span>
                  <span>Executive Boardroom (Our Team)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#FFFFFF] transition-colors flex items-center space-x-2 cursor-pointer"
                >
                  <span className="text-[#C6A77A] font-mono text-[10px]">03</span>
                  <span>Signing Pavilion (Contract)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Prime Communities & Legal */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#C6A77A] font-semibold mb-4">
              Featured Enclaves
            </h4>
            <ul className="space-y-2 text-xs text-[#E0C7A4]/80 mb-6">
              <li>The Ridges · Summerlin</li>
              <li>MacDonald Highlands · DragonRidge</li>
              <li>Ascaya · Henderson Luxury Foothills</li>
              <li>Red Rock Country Club & Canyon</li>
              <li>Southern Highlands Custom Estates</li>
            </ul>

            <div className="flex items-center space-x-2 text-xs text-[#C6A77A]">
              <ShieldCheck className="w-4 h-4" />
              <span>Equal Housing Opportunity</span>
            </div>
          </div>
        </div>

        {/* Bottom Disclosures & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#E0C7A4]/60 gap-4">
          <p>
            © {new Date().getFullYear()} WilsonVegas. All rights reserved. Creative Direction by Dynamic Manifesto (DDMGURU).
          </p>
          <p className="max-w-xl text-center sm:text-right">
            Disclosures: Listing specifications and property pricing are illustrative demonstrations. Photography reflects authentic architectural projects. Licensed under Nevada Real Estate Division guidelines.
          </p>
        </div>
      </div>
    </footer>
  );
};
