import React, { useState, useMemo } from 'react';
import { PropertyListing } from '../types.ts';
import { PROPERTIES } from '../data/properties.ts';
import { 
  Building2, 
  RotateCcw, 
  Bed, 
  Bath, 
  Maximize2, 
  Calendar, 
  Search, 
  Filter, 
  ArrowRight, 
  Camera, 
  FileSignature, 
  Sparkles,
  MapPin,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

interface ListingsRoomProps {
  onReturnToHallway: () => void;
  onInspectProperty: (property: PropertyListing) => void;
  onSelectPropertyForContract: (property: PropertyListing) => void;
  reducedMotion: boolean;
}

export const ListingsRoom: React.FC<ListingsRoomProps> = ({
  onReturnToHallway,
  onInspectProperty,
  onSelectPropertyForContract,
  reducedMotion,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'sqft'>('featured');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((prop) => {
      const matchesSearch =
        prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.neighborhood.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesNeighborhood =
        selectedNeighborhood === 'All' || prop.neighborhood.includes(selectedNeighborhood);

      return matchesSearch && matchesNeighborhood;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'sqft') return b.sqft - a.sqft;
      return 0;
    });
  }, [searchQuery, selectedNeighborhood, sortBy]);

  const neighborhoods = ['All', 'Summerlin', 'The Ridges', 'MacDonald Highlands'];

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedNeighborhood('All');
    setSortBy('featured');
  };

  return (
    <section 
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F4F0] text-[#241713] transition-colors"
      aria-label="Listings Room - Curated Residential Living Room Salon"
    >
      {/* Top Atmospheric Living Room Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-12 shadow-2xl border border-[#3B241B]/20 bg-[#241713] max-w-7xl mx-auto">
        <div className="relative h-80 sm:h-96 w-full">
          <img
            src="https://wilsonvegas.com/wp-content/uploads/2026/09/wilsonvegas-listings-1536x864.webp"
            alt="High-end living room interior displaying luxury real estate"
            className="w-full h-full object-cover object-center filter brightness-[0.6] contrast-[1.05]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#241713] via-[#241713]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#241713]/80 via-transparent to-[#241713]/80" />

          {/* Living Room Interior Tag & Breadcrumbs */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
            <button
              onClick={onReturnToHallway}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-md bg-[#241713]/90 hover:bg-[#3B241B] text-[#C6A77A] hover:text-[#FFFFFF] border border-[#C6A77A]/40 text-xs font-semibold tracking-wider uppercase transition-all backdrop-blur-md cursor-pointer shadow-lg min-h-[44px]"
              aria-label="Return to Grand Hallway with 3 Doors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>← Back into the Hallway</span>
            </button>

            <span className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#241713]/80 border border-[#C6A77A]/30 text-[11px] text-[#E0C7A4] uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A77A]" />
              <span>Room 01 · The Living Room Salon</span>
            </span>
          </div>

          {/* Living Room Room Headline */}
          <div className="absolute bottom-8 left-6 sm:left-12 right-6 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] text-[#C6A77A] font-semibold mb-2">
              Curated Residential Collection
            </p>
            <h2 className="text-3xl sm:text-5xl font-serif-luxury text-[#FFFFFF] font-normal leading-tight">
              A place to call <span className="italic text-[#E0C7A4]">entirely your own.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#F7F4F0]/85 font-light mt-2 max-w-2xl">
              Inspect our featured residential properties. Click any home to view all exterior angles, elevations, and architectural specifications.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Search, Filter & Neighborhood Controls */}
        <div className="bg-[#FFFFFF] p-6 rounded-xl border border-[#3B241B]/15 shadow-md mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3B241B]/50" />
            <input
              type="text"
              aria-label="Search properties by title, neighborhood, or address"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by residence title, neighborhood, or address..."
              className="w-full pl-11 pr-4 py-3 rounded-lg border border-[#3B241B]/20 bg-[#F7F4F0]/50 text-[#241713] text-base focus:outline-none focus:ring-2 focus:ring-[#C6A77A] focus:border-transparent transition-all placeholder:text-[#3B241B]/40 min-h-[44px]"
            />
          </div>

          {/* Neighborhood Quick Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[#3B241B]/70 font-semibold mr-1 flex items-center">
              <Filter className="w-3.5 h-3.5 mr-1" />
              Area:
            </span>
            {neighborhoods.map((area) => (
              <button
                key={area}
                onClick={() => setSelectedNeighborhood(area)}
                className={`px-3.5 py-2 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer min-h-[44px] ${
                  selectedNeighborhood === area
                    ? 'bg-[#3B241B] text-[#FFFFFF] shadow-sm'
                    : 'bg-[#F7F4F0] text-[#3B241B] hover:bg-[#3B241B]/10'
                }`}
                aria-pressed={selectedNeighborhood === area}
              >
                {area}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2 shrink-0">
            <label htmlFor="propertySort" className="text-xs uppercase tracking-wider text-[#3B241B]/70 font-semibold">
              Sort:
            </label>
            <select
              id="propertySort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2.5 rounded-lg border border-[#3B241B]/20 bg-[#FFFFFF] text-base font-medium text-[#241713] focus:outline-none focus:ring-2 focus:ring-[#C6A77A] min-h-[44px]"
            >
              <option value="featured">Featured Collection</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="sqft">Square Footage</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-xs uppercase tracking-widest text-[#3B241B]/70 font-semibold">
            Showing {filteredProperties.length} of {PROPERTIES.length} Luxury Residences
          </p>
          <span className="text-xs text-[#3B241B]/60 font-light italic hidden sm:inline">
            Click any residence to inspect all exterior angles
          </span>
        </div>

        {/* Property Cards Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <article
                key={property.id}
                className="group bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#3B241B]/15 shadow-lg hover:shadow-2xl hover:border-[#C6A77A] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Main Exterior Image */}
                <div 
                  className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#241713] cursor-pointer"
                  onClick={() => onInspectProperty(property)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onInspectProperty(property);
                    }
                  }}
                  aria-label={`Inspect exterior angles for ${property.title}`}
                >
                  {!imageErrors[property.angles[0]?.imageUrl || ''] ? (
                    <img
                      src={property.angles[0]?.imageUrl}
                      alt={property.title}
                      onError={() => setImageErrors((prev) => ({ ...prev, [property.angles[0]?.imageUrl || '']: true }))}
                      className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                        !reducedMotion ? 'group-hover:scale-105' : ''
                      }`}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#241713] text-[#E0C7A4]">
                      <AlertCircle className="w-8 h-8 text-[#C6A77A] mb-2" />
                      <span className="text-xs">{property.title}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#241713]/80 via-transparent to-black/30" />

                  {/* Status & Neighborhood Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#241713]/80 backdrop-blur-md text-[#E0C7A4] border border-[#C6A77A]/30 text-[11px] font-semibold tracking-wider uppercase">
                      {property.status}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#241713]/80 backdrop-blur-md text-[#FFFFFF] text-[10px] font-medium tracking-wide flex items-center">
                      <MapPin className="w-3 h-3 text-[#C6A77A] mr-1" />
                      {property.neighborhood}
                    </span>
                  </div>

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-4 left-4">
                    <span className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#FFFFFF] drop-shadow-md">
                      {property.formattedPrice}
                    </span>
                  </div>

                  {/* Camera Angle Count Indicator */}
                  <div className="absolute bottom-4 right-4 flex items-center space-x-1 px-2.5 py-1.5 rounded-md bg-[#241713]/90 text-[#C6A77A] border border-[#C6A77A]/40 text-xs font-medium backdrop-blur-sm group-hover:bg-[#C6A77A] group-hover:text-[#241713] transition-colors">
                    <Camera className="w-3.5 h-3.5" />
                    <span>{property.angles.length} Exterior Angles</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 
                      onClick={() => onInspectProperty(property)}
                      className="text-2xl font-serif-luxury font-medium text-[#241713] group-hover:text-[#8C5E3C] transition-colors cursor-pointer mb-1"
                    >
                      {property.title}
                    </h3>
                    <p className="text-xs text-[#3B241B]/70 font-light mb-4">
                      {property.address} · {property.neighborhood}
                    </p>

                    <p className="text-xs text-[#3B241B]/85 font-normal leading-relaxed line-clamp-2 mb-5">
                      {property.headline}
                    </p>

                    {/* Property Specifications Grid */}
                    <div className="grid grid-cols-4 gap-2 py-3 px-3 rounded-lg bg-[#F7F4F0] text-center border border-[#3B241B]/10 mb-6">
                      <div>
                        <div className="flex items-center justify-center space-x-1 text-[#3B241B]">
                          <Bed className="w-3.5 h-3.5 text-[#8C5E3C]" />
                          <span className="font-semibold text-xs">{property.beds}</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-[#3B241B]/60 block mt-0.5">Beds</span>
                      </div>

                      <div>
                        <div className="flex items-center justify-center space-x-1 text-[#3B241B]">
                          <Bath className="w-3.5 h-3.5 text-[#8C5E3C]" />
                          <span className="font-semibold text-xs">{property.baths}</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-[#3B241B]/60 block mt-0.5">Baths</span>
                      </div>

                      <div>
                        <div className="flex items-center justify-center space-x-1 text-[#3B241B]">
                          <Maximize2 className="w-3.5 h-3.5 text-[#8C5E3C]" />
                          <span className="font-semibold text-xs">{property.sqft.toLocaleString()}</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-[#3B241B]/60 block mt-0.5">Sq Ft</span>
                      </div>

                      <div>
                        <div className="flex items-center justify-center space-x-1 text-[#3B241B]">
                          <Calendar className="w-3.5 h-3.5 text-[#8C5E3C]" />
                          <span className="font-semibold text-xs">{property.yearBuilt}</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-[#3B241B]/60 block mt-0.5">Built</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Buttons (Min 44x44px touch targets) */}
                  <div className="space-y-2 pt-2 border-t border-[#3B241B]/10">
                    <button
                      onClick={() => onInspectProperty(property)}
                      className="w-full py-3.5 px-4 rounded-md bg-[#241713] hover:bg-[#3B241B] text-[#FFFFFF] text-xs font-semibold tracking-wider uppercase transition-colors shadow flex items-center justify-center space-x-2 cursor-pointer min-h-[44px]"
                    >
                      <Camera className="w-3.5 h-3.5 text-[#C6A77A]" />
                      <span>See All Outside Angles</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </button>

                    <button
                      onClick={() => onSelectPropertyForContract(property)}
                      className="w-full py-3 px-4 rounded-md bg-transparent hover:bg-[#F7F4F0] text-[#3B241B] hover:text-[#241713] border border-[#3B241B]/20 text-xs font-medium tracking-wide transition-colors flex items-center justify-center space-x-1.5 cursor-pointer min-h-[44px]"
                    >
                      <FileSignature className="w-3.5 h-3.5 text-[#8C5E3C]" />
                      <span>Sign Acquisition Contract</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="bg-[#FFFFFF] p-12 rounded-2xl border border-[#3B241B]/20 text-center max-w-lg mx-auto space-y-4 shadow-md">
            <AlertCircle className="w-12 h-12 text-[#8C5E3C] mx-auto" />
            <h3 className="text-2xl font-serif-luxury font-medium text-[#241713]">
              No Residences Match Your Criteria
            </h3>
            <p className="text-xs text-[#3B241B]/70 leading-relaxed">
              We couldn't find any properties matching "{searchQuery}". Try selecting another neighborhood or reset your filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 rounded-md bg-[#241713] text-[#C6A77A] hover:bg-[#3B241B] text-xs font-semibold uppercase tracking-wider transition-all inline-flex items-center space-x-2 cursor-pointer min-h-[44px]"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

        {/* Bottom Navigation Return Strip */}
        <div className="mt-16 text-center">
          <button
            onClick={onReturnToHallway}
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-md bg-[#241713] hover:bg-[#3B241B] text-[#C6A77A] hover:text-[#FFFFFF] border border-[#C6A77A]/40 text-xs font-semibold tracking-wider uppercase transition-all shadow-xl cursor-pointer min-h-[44px]"
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
