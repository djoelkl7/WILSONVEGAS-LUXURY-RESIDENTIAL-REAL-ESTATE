export interface PropertyAngle {
  id: 'elevated' | 'front' | 'left' | 'right' | 'rear' | 'entry';
  label: string;
  description: string;
  imageUrl: string;
}

export interface PropertyListing {
  id: string;
  title: string;
  price: number;
  formattedPrice: string;
  address: string;
  neighborhood: string;
  beds: number;
  baths: number;
  sqft: number;
  lotSize: string;
  yearBuilt: number;
  propertyType: string;
  status: 'Available' | 'Under Contract' | 'Private Collection';
  headline: string;
  description: string;
  highlights: string[];
  features: string[];
  angles: PropertyAngle[];
}

export type SceneState = 
  | 'exterior' 
  | 'hallway' 
  | 'listings' 
  | 'inspection' 
  | 'team' 
  | 'contact';

export interface ContractFormData {
  legalName: string;
  email: string;
  phone: string;
  intent: 'Private Viewing Tour' | 'Buyer Representation' | 'Property Acquisition Offer' | 'Exclusive Listing Inquiry';
  propertyId: string;
  priceRange: string;
  timeline: string;
  financingType: 'Private Cash / Liquidity' | 'Jumbo Portfolio Loan' | 'Private Banking Facility' | 'Undisclosed';
  specialRequests: string;
  signature: string;
  date: string;
  termsAgreed: boolean;
}
