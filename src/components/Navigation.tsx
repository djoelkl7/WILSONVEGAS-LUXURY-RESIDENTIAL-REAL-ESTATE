import React, { useState } from 'react';
import { SceneState } from '../types.ts';
import { 
  Building2, 
  DoorClosed, 
  Users, 
  FileSignature, 
  Eye, 
  Menu, 
  X, 
  Sparkles, 
  Compass, 
  RotateCcw 
} from 'lucide-react';

interface NavigationProps {
  currentScene: SceneState;
  onNavigate: (scene: SceneState) => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentScene,
  onNavigate,
  reducedMotion,
  onToggleReducedMotion,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getSceneTitle = (scene: SceneState) => {
    switch (scene) {
      case 'exterior':
        return 'Exterior Landing';
      case 'hallway':
        return 'The Grand Hallway · 3 Doors';
      case 'listings':
        return 'Room 1 · The Listings Salon';
      case 'inspection':
        return 'Architectural Exterior Inspector';
      case 'team':
        return 'Room 2 · Executive Leadership';
      case 'contact':
        return 'Room 3 · Signing Pavilion';
      default:
        return 'WilsonVegas';
    }
  };

  const navItems: { scene: SceneState; label: string; icon: React.ReactNode }[] = [
    { scene: 'exterior', label: 'Entrance', icon: <Building2 className="w-4 h-4" /> },
    { scene: 'hallway', label: 'Grand Hallway (3 Doors)', icon: <DoorClosed className="w-4 h-4" /> },
    { scene: 'listings', label: 'Listings', icon: <Eye className="w-4 h-4" /> },
    { scene: 'team', label: 'Our Team', icon: <Users className="w-4 h-4" /> },
    { scene: 'contact', label: 'Sign / Contact', icon: <FileSignature className="w-4 h-4" /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#241713]/90 backdrop-blur-md border-b border-[#3B241B] transition-all duration-300 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <button 
            type="button"
            className="flex items-center space-x-3 cursor-pointer text-left bg-transparent border-none p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A77A] rounded"
            onClick={() => onNavigate('exterior')}
            aria-label="WilsonVegas Home - Return to Entrance"
          >
            <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[#C6A77A] to-[#8C5E3C] flex items-center justify-center shadow-lg border border-[#C6A77A]/40 text-[#241713] font-bold font-serif-luxury text-xl tracking-widest shrink-0">
              WV
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-serif-luxury font-medium tracking-[0.2em] text-[#FFFFFF] block">
                WILSONVEGAS
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A77A] font-medium block">
                Luxury Residential Real Estate
              </span>
            </div>
          </button>

          {/* Current Location Badge (Desktop) */}
          <div className="hidden lg:flex items-center px-3.5 py-1.5 rounded-full bg-[#3B241B]/60 border border-[#C6A77A]/20 text-xs text-[#E0C7A4]">
            <Compass className="w-3.5 h-3.5 mr-2 text-[#C6A77A]" />
            <span className="text-[#C6A77A] font-semibold mr-1.5">Location:</span>
            <span>{getSceneTitle(currentScene)}</span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = currentScene === item.scene;
              return (
                <button
                  key={item.scene}
                  onClick={() => onNavigate(item.scene)}
                  className={`flex items-center space-x-1.5 px-3.5 py-2.5 rounded-md text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer min-h-[44px] ${
                    isActive
                      ? 'bg-[#C6A77A] text-[#241713] font-semibold shadow-md'
                      : 'text-[#F7F4F0]/80 hover:text-[#FFFFFF] hover:bg-[#3B241B]/50'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Quick Return to Hallway button when inside a room */}
            {(currentScene === 'listings' || currentScene === 'inspection' || currentScene === 'team' || currentScene === 'contact') && (
              <button
                onClick={() => onNavigate('hallway')}
                className="ml-2 flex items-center space-x-1.5 px-3.5 py-2 rounded-md text-xs font-medium tracking-wide uppercase bg-gradient-to-r from-[#3B241B] to-[#6B4634] text-[#C6A77A] border border-[#C6A77A]/30 hover:border-[#C6A77A] transition-all cursor-pointer shadow-sm min-h-[44px]"
                title="Return directly to the 3 doors in the hallway"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Hallway</span>
              </button>
            )}

            {/* Motion Accessibility Toggle (Clear Display: Motion: On / Motion: Off) */}
            <button
              onClick={onToggleReducedMotion}
              className={`ml-2 px-3 py-2 rounded-md border text-xs flex items-center space-x-1.5 cursor-pointer transition-colors min-h-[44px] ${
                reducedMotion
                  ? 'bg-amber-950/70 border-amber-500/60 text-amber-200'
                  : 'bg-[#3B241B] border-[#C6A77A]/30 text-[#E0C7A4] hover:text-[#C6A77A]'
              }`}
              title={reducedMotion ? 'Switch to Motion: On (enable cinematic zooms)' : 'Switch to Motion: Off (reduced motion mode)'}
              aria-label={`Toggle motion animations. Currently: ${reducedMotion ? 'Motion: Off' : 'Motion: On'}`}
              aria-pressed={!reducedMotion}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C6A77A]" />
              <span className="text-xs font-medium tracking-wider uppercase">
                {reducedMotion ? 'Motion: Off' : 'Motion: On'}
              </span>
            </button>
          </nav>

          {/* Mobile Actions: Hallway shortcut, Motion toggle, Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Mobile Motion Toggle */}
            <button
              onClick={onToggleReducedMotion}
              className={`p-2 rounded-md border text-[11px] font-medium flex items-center space-x-1 cursor-pointer min-h-[44px] min-w-[44px] justify-center ${
                reducedMotion
                  ? 'bg-amber-950/70 border-amber-500 text-amber-200'
                  : 'bg-[#3B241B] border-[#C6A77A]/30 text-[#E0C7A4]'
              }`}
              aria-label={`Motion is ${reducedMotion ? 'Off' : 'On'}. Tap to toggle.`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C6A77A]" />
              <span className="text-[10px] uppercase font-bold">{reducedMotion ? 'Off' : 'On'}</span>
            </button>

            {(currentScene !== 'hallway' && currentScene !== 'exterior') && (
              <button
                onClick={() => onNavigate('hallway')}
                className="px-2.5 py-2 rounded bg-[#3B241B] text-[#C6A77A] border border-[#C6A77A]/40 text-xs flex items-center space-x-1 min-h-[44px] cursor-pointer"
                aria-label="Back to Hallway"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">Hallway</span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-md text-[#F7F4F0] hover:bg-[#3B241B] border border-[#3B241B] min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#C6A77A]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#241713] border-b border-[#3B241B] px-4 pt-3 pb-6 space-y-2 shadow-2xl">
          <div className="py-2.5 px-3.5 text-xs text-[#C6A77A] bg-[#3B241B]/60 rounded mb-3 flex items-center">
            <Compass className="w-4 h-4 mr-2" />
            <span>Currently: {getSceneTitle(currentScene)}</span>
          </div>

          {navItems.map((item) => (
            <button
              key={item.scene}
              onClick={() => {
                onNavigate(item.scene);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium tracking-wider uppercase transition-colors min-h-[44px] cursor-pointer ${
                currentScene === item.scene
                  ? 'bg-[#C6A77A] text-[#241713] font-semibold'
                  : 'text-[#F7F4F0] hover:bg-[#3B241B]/70'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}

          <div className="pt-3 border-t border-[#3B241B]/80 flex items-center justify-between">
            <span className="text-xs text-[#E0C7A4]">Cinematic Motion Setting:</span>
            <button
              onClick={onToggleReducedMotion}
              className="px-3.5 py-2 rounded text-xs bg-[#3B241B] text-[#C6A77A] border border-[#C6A77A]/40 min-h-[44px] font-semibold"
            >
              {reducedMotion ? 'Motion: Off (Static Mode)' : 'Motion: On (Cinematic Mode)'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
