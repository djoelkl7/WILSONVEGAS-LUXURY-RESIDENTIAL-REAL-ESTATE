/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { SceneState, PropertyListing } from './types.ts';
import { PROPERTIES } from './data/properties.ts';
import { Navigation } from './components/Navigation.tsx';
import { ExteriorLanding } from './components/ExteriorLanding.tsx';
import { HallwayDoors } from './components/HallwayDoors.tsx';
import { ListingsRoom } from './components/ListingsRoom.tsx';
import { PropertyInspector } from './components/PropertyInspector.tsx';
import { TeamRoom } from './components/TeamRoom.tsx';
import { ContactRoom } from './components/ContactRoom.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  const [currentScene, setCurrentScene] = useState<SceneState>('exterior');
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(PROPERTIES[0] || null);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Initialize and listen to prefers-reduced-motion media query
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Hash route synchronization for browser back/forward buttons
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace('#', '') as SceneState;
      const validScenes: SceneState[] = ['exterior', 'hallway', 'listings', 'inspection', 'team', 'contact'];
      if (validScenes.includes(hash)) {
        setCurrentScene(hash);
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  // Smooth scroll to top whenever scene changes
  const handleNavigate = useCallback((scene: SceneState) => {
    setCurrentScene(scene);
    window.location.hash = scene;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  }, [reducedMotion]);

  const handleInspectProperty = (property: PropertyListing) => {
    setSelectedProperty(property);
    setCurrentScene('inspection');
    window.location.hash = 'inspection';
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const handleSelectPropertyForContract = (property: PropertyListing) => {
    setSelectedProperty(property);
    setCurrentScene('contact');
    window.location.hash = 'contact';
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  // Safe fallback if in inspection without explicit selection
  const activeInspectionProperty = selectedProperty || PROPERTIES[0];

  return (
    <div className="min-h-screen bg-[#241713] text-[#F7F4F0] flex flex-col font-sans selection:bg-[#C6A77A] selection:text-[#241713]">
      {/* Global Navigation Bar */}
      <Navigation
        currentScene={currentScene}
        onNavigate={handleNavigate}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
      />

      {/* Main Interactive Stage */}
      <main className="flex-1 w-full" id="wv-main" tabIndex={-1}>
        {currentScene === 'exterior' && (
          <ExteriorLanding
            onEnterHallway={() => handleNavigate('hallway')}
            onDirectToListings={() => handleNavigate('listings')}
            reducedMotion={reducedMotion}
          />
        )}

        {currentScene === 'hallway' && (
          <HallwayDoors
            onSelectDoor={(doorScene) => handleNavigate(doorScene)}
            onReturnToExterior={() => handleNavigate('exterior')}
            reducedMotion={reducedMotion}
          />
        )}

        {currentScene === 'listings' && (
          <ListingsRoom
            onReturnToHallway={() => handleNavigate('hallway')}
            onInspectProperty={handleInspectProperty}
            onSelectPropertyForContract={handleSelectPropertyForContract}
            reducedMotion={reducedMotion}
          />
        )}

        {currentScene === 'inspection' && activeInspectionProperty && (
          <PropertyInspector
            property={activeInspectionProperty}
            onBackToListings={() => handleNavigate('listings')}
            onReturnToHallway={() => handleNavigate('hallway')}
            onSignContract={handleSelectPropertyForContract}
            reducedMotion={reducedMotion}
          />
        )}

        {currentScene === 'team' && (
          <TeamRoom
            onReturnToHallway={() => handleNavigate('hallway')}
            onProceedToSigning={() => handleNavigate('contact')}
            reducedMotion={reducedMotion}
          />
        )}

        {currentScene === 'contact' && (
          <ContactRoom
            initialProperty={selectedProperty}
            onReturnToHallway={() => handleNavigate('hallway')}
            reducedMotion={reducedMotion}
          />
        )}
      </main>

      {/* Global Luxury Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
