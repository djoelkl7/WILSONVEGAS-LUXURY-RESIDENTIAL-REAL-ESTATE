import React, { useState } from 'react';
import { PropertyListing, ContractFormData } from '../types.ts';
import { PROPERTIES } from '../data/properties.ts';
import { 
  RotateCcw, 
  FileSignature, 
  CheckCircle, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  Mail, 
  Phone, 
  Building2, 
  Printer, 
  Lock,
  Info,
  AlertTriangle
} from 'lucide-react';

interface ContactRoomProps {
  initialProperty?: PropertyListing | null;
  onReturnToHallway: () => void;
  reducedMotion: boolean;
}

export const ContactRoom: React.FC<ContactRoomProps> = ({
  initialProperty,
  onReturnToHallway,
  reducedMotion,
}) => {
  const [formData, setFormData] = useState<ContractFormData>({
    legalName: '',
    email: '',
    phone: '',
    intent: initialProperty ? 'Property Acquisition Offer' : 'Private Viewing Tour',
    propertyId: initialProperty ? initialProperty.id : PROPERTIES[0]?.id || 'custom',
    priceRange: '$3,500,000 – $6,000,000',
    timeline: 'Within 30–60 Days',
    financingType: 'Private Cash / Liquidity',
    specialRequests: initialProperty 
      ? `Expressing formal interest in ${initialProperty.title} (${initialProperty.formattedPrice}). Requesting confidential private walkthrough and title dossier.`
      : '',
    signature: '',
    date: new Date().toISOString().split('T')[0],
    termsAgreed: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contractId, setContractId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [assistiveAnnouncement, setAssistiveAnnouncement] = useState('');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.legalName.trim()) {
      errs.legalName = 'Legal name is required for contract execution.';
    } else if (formData.legalName.trim().length < 3) {
      errs.legalName = 'Please enter your full legal first and last name.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Valid email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }

    if (!formData.signature.trim()) {
      errs.signature = 'Formal electronic signature is required.';
    } else if (formData.signature.trim().length < 2) {
      errs.signature = 'Please type your legal signature to authorize.';
    }

    if (!formData.termsAgreed) {
      errs.termsAgreed = 'You must acknowledge the representation terms.';
    }

    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      setAssistiveAnnouncement(`Form validation failed with ${Object.keys(errs).length} error(s). Please review the highlighted fields.`);
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);
    setAssistiveAnnouncement('Executing agreement and securing registration...');

    setTimeout(() => {
      const generatedId = `WV-NV-${Math.floor(100000 + Math.random() * 900000)}`;
      setContractId(generatedId);
      setIsSubmitted(true);
      setIsSubmitting(false);
      setAssistiveAnnouncement(`Agreement executed successfully. Your confirmation reference number is ${generatedId}.`);
    }, 300);
  };

  const selectedListing = PROPERTIES.find((p) => p.id === formData.propertyId);

  return (
    <section 
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-[#241713] text-[#F7F4F0] overflow-hidden"
      aria-label="Private Signing Room and Acquisition Agreement"
    >
      {/* Background Signing Room Visual */}
      <div className="absolute inset-0 z-0 no-print">
        <img
          src="https://wilsonvegas.com/wp-content/uploads/2026/09/wilsonvegas-contact-1536x864.webp"
          alt="Executive in-house signing library and business consultation area"
          className="w-full h-full object-cover object-center filter brightness-[0.35] contrast-[1.1]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#241713] via-[#241713]/85 to-[#241713]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Top Breadcrumb & Hallway Return */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#3B241B] pb-6 no-print">
          <button
            onClick={onReturnToHallway}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-md bg-[#3B241B] hover:bg-[#6B4634] text-[#C6A77A] hover:text-[#FFFFFF] border border-[#C6A77A]/30 text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer shadow-md min-h-[44px]"
            aria-label="Return to Grand Hallway with 3 Doors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>← Back into the Hallway</span>
          </button>

          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#3B241B]/80 border border-[#C6A77A]/30 text-xs text-[#E0C7A4]">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A77A]" />
            <span className="uppercase tracking-widest text-[11px]">Room 03 · The Signing Pavilion</span>
          </div>
        </div>

        {/* Room Header Text */}
        <div className="text-center max-w-2xl mx-auto mb-10 no-print">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C6A77A] font-semibold block mb-2">
            Confidential In-House Signing Desk
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury text-[#FFFFFF] font-normal">
            Execute Representation & <span className="italic text-[#E0C7A4]">Acquisition Intent.</span>
          </h2>
          <p className="text-sm text-[#F7F4F0]/80 font-light mt-2">
            Formalize your interest in acquiring a Las Vegas residence or initiate confidential buyer/seller representation.
          </p>
        </div>

        {/* Local Architecture Security & Distinction Notice */}
        <div className="mb-6 p-4 rounded-xl bg-[#3B241B]/70 border border-[#C6A77A]/30 text-xs text-[#E0C7A4] flex items-start space-x-3 no-print">
          <Info className="w-5 h-5 text-[#C6A77A] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-[#FFFFFF] font-medium block mb-0.5">
              Demonstration & Local Execution Notice:
            </strong>
            This interactive contract operates locally in your browser to demonstrate the client signing experience. Form submissions generate an authenticated local confirmation receipt with a unique transaction reference code. For production integration, submissions can be routed to a verified CRM or webhook endpoint.
          </div>
        </div>

        {/* Screen Reader Live Announcements */}
        <div className="sr-only" role="status" aria-live="polite">
          {assistiveAnnouncement}
        </div>

        {/* Contract Container */}
        {!isSubmitted ? (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-[#FFFFFF] text-[#241713] rounded-2xl shadow-2xl border-4 border-[#3B241B] p-6 sm:p-10 lg:p-12 relative overflow-hidden"
            aria-label="Acquisition Intent Form"
          >
            {/* Watermark & Security Seal */}
            <div className="absolute right-6 top-6 opacity-10 pointer-events-none select-none text-right hidden sm:block">
              <span className="font-serif-luxury text-8xl font-black block">WV</span>
              <span className="text-xs tracking-widest uppercase block -mt-4">OFFICIAL CONTRACT</span>
            </div>

            {/* Contract Header Banner */}
            <div className="border-b-2 border-[#241713] pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C5E3C] font-bold block">
                  State of Nevada · Clark County Real Estate Record
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#241713] tracking-wide">
                  WILSONVEGAS ACQUISITION & CONSULTATION INTENT
                </h3>
                <p className="text-xs text-[#3B241B]/70 mt-1">
                  Document Protocol: Residential Client Representation & Property Inquiry
                </p>
              </div>

              <div className="px-4 py-2 bg-[#F7F4F0] border border-[#3B241B]/20 rounded-md text-right shrink-0">
                <span className="text-[10px] uppercase tracking-wider text-[#3B241B]/60 block">Status:</span>
                <span className="text-xs font-mono font-bold text-[#8C5E3C] flex items-center justify-end space-x-1">
                  <Lock className="w-3 h-3 text-[#8C5E3C] inline" />
                  <span>DRAFT IN EXECUTION</span>
                </span>
              </div>
            </div>

            {/* Error Summary Banner (if validation errors exist) */}
            {Object.keys(errors).length > 0 && (
              <div 
                className="mb-8 p-4 rounded-lg bg-red-50 border-l-4 border-red-600 text-red-800 text-xs"
                role="alert"
              >
                <div className="flex items-center space-x-2 font-bold mb-1">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>Please resolve the following required items:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  {Object.values(errors).map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Section 1: Client Information */}
            <div className="mb-8">
              <h4 className="text-xs uppercase tracking-widest text-[#8C5E3C] font-bold border-b border-[#3B241B]/20 pb-2 mb-4">
                SECTION 01: PRINCIPAL / APPLICANT IDENTIFICATION
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label htmlFor="legalName" className="block text-xs font-semibold text-[#241713] mb-1.5 uppercase tracking-wide">
                    Full Legal Name *
                  </label>
                  <input
                    id="legalName"
                    name="legalName"
                    type="text"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.legalName}
                    aria-describedby={errors.legalName ? 'legalName-error' : undefined}
                    value={formData.legalName}
                    onChange={(e) => {
                      setFormData({ ...formData, legalName: e.target.value });
                      if (errors.legalName) setErrors({ ...errors, legalName: '' });
                    }}
                    placeholder="e.g. Jonathan Vance"
                    className={`w-full px-3.5 py-3 rounded border text-base bg-[#F7F4F0]/60 text-[#241713] focus:outline-none focus:ring-2 focus:ring-[#8C5E3C] min-h-[44px] ${
                      errors.legalName ? 'border-red-500 bg-red-50/50' : 'border-[#3B241B]/30'
                    }`}
                  />
                  {errors.legalName && (
                    <p id="legalName-error" className="text-xs text-red-600 font-medium mt-1">
                      {errors.legalName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-[#241713] mb-1.5 uppercase tracking-wide">
                    Confidential Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="e.g. j.vance@executive.com"
                    className={`w-full px-3.5 py-3 rounded border text-base bg-[#F7F4F0]/60 text-[#241713] focus:outline-none focus:ring-2 focus:ring-[#8C5E3C] min-h-[44px] ${
                      errors.email ? 'border-red-500 bg-red-50/50' : 'border-[#3B241B]/30'
                    }`}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-xs text-red-600 font-medium mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-[#241713] mb-1.5 uppercase tracking-wide">
                    Direct Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +1 (702) 555-0198"
                    className="w-full px-3.5 py-3 rounded border border-[#3B241B]/30 text-base bg-[#F7F4F0]/60 text-[#241713] focus:outline-none focus:ring-2 focus:ring-[#8C5E3C] min-h-[44px]"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Engagement Intent & Residence Association */}
            <div className="mb-8">
              <h4 className="text-xs uppercase tracking-widest text-[#8C5E3C] font-bold border-b border-[#3B241B]/20 pb-2 mb-4">
                SECTION 02: MANDATE TYPE & PROPERTY SELECTION
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-4">
                <div>
                  <label htmlFor="intent" className="block text-xs font-semibold text-[#241713] mb-1.5 uppercase tracking-wide">
                    Nature of Mandate
                  </label>
                  <select
                    id="intent"
                    name="intent"
                    value={formData.intent}
                    onChange={(e) => setFormData({ ...formData, intent: e.target.value as any })}
                    className="w-full px-3.5 py-3 rounded border border-[#3B241B]/30 text-base bg-[#F7F4F0]/60 text-[#241713] focus:outline-none focus:ring-2 focus:ring-[#8C5E3C] min-h-[44px]"
                  >
                    <option value="Property Acquisition Offer">Property Acquisition Intent</option>
                    <option value="Private Viewing Tour">Confidential Private Viewing Tour</option>
                    <option value="Buyer Representation">Exclusive Buyer Representation Agreement</option>
                    <option value="Exclusive Listing Inquiry">Exclusive Seller Listing Mandate</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="propertyId" className="block text-xs font-semibold text-[#241713] mb-1.5 uppercase tracking-wide">
                    Target Residence from Collection
                  </label>
                  <select
                    id="propertyId"
                    name="propertyId"
                    value={formData.propertyId}
                    onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
                    className="w-full px-3.5 py-3 rounded border border-[#3B241B]/30 text-base bg-[#F7F4F0]/60 text-[#241713] focus:outline-none focus:ring-2 focus:ring-[#8C5E3C] min-h-[44px]"
                  >
                    {PROPERTIES.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} · {p.formattedPrice} ({p.neighborhood})
                      </option>
                    ))}
                    <option value="custom">Custom Portfolio Search (Outside Current Catalog)</option>
                  </select>
                </div>
              </div>

              {selectedListing && (
                <div className="p-3.5 rounded bg-[#F7F4F0] border border-[#3B241B]/15 text-xs text-[#3B241B] flex items-center justify-between">
                  <span className="font-semibold text-[#241713]">
                    Selected Residence: {selectedListing.title} ({selectedListing.formattedPrice})
                  </span>
                  <span className="text-[11px] text-[#8C5E3C] font-mono">
                    {selectedListing.address}
                  </span>
                </div>
              )}
            </div>

            {/* Section 3: Financial Parameters & Timeline */}
            <div className="mb-8">
              <h4 className="text-xs uppercase tracking-widest text-[#8C5E3C] font-bold border-b border-[#3B241B]/20 pb-2 mb-4">
                SECTION 03: FINANCIAL PARAMETERS & TARGET TIMELINE
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label htmlFor="priceRange" className="block text-xs font-semibold text-[#241713] mb-1.5 uppercase tracking-wide">
                    Capital Allocation Bracket
                  </label>
                  <select
                    id="priceRange"
                    name="priceRange"
                    value={formData.priceRange}
                    onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                    className="w-full px-3 py-3 rounded border border-[#3B241B]/30 text-base bg-[#F7F4F0]/60 text-[#241713] focus:outline-none focus:ring-2 focus:ring-[#8C5E3C] min-h-[44px]"
                  >
                    <option value="$3,500,000 – $6,000,000">$3,500,000 – $6,000,000</option>
                    <option value="$6,000,000 – $10,000,000">$6,000,000 – $10,000,000</option>
                    <option value="$10,000,000+ Super-Prime">$10,000,000+ Super-Prime</option>
                    <option value="Confidential Portfolio Request">Confidential Portfolio Request</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="financingType" className="block text-xs font-semibold text-[#241713] mb-1.5 uppercase tracking-wide">
                    Financing Structure
                  </label>
                  <select
                    id="financingType"
                    name="financingType"
                    value={formData.financingType}
                    onChange={(e) => setFormData({ ...formData, financingType: e.target.value as any })}
                    className="w-full px-3 py-3 rounded border border-[#3B241B]/30 text-base bg-[#F7F4F0]/60 text-[#241713] focus:outline-none focus:ring-2 focus:ring-[#8C5E3C] min-h-[44px]"
                  >
                    <option value="Private Cash / Liquidity">Private Cash / Unencumbered Liquidity</option>
                    <option value="Private Banking Facility">Private Banking Facility / Credit Line</option>
                    <option value="Jumbo Portfolio Loan">Jumbo Portfolio Loan</option>
                    <option value="Undisclosed">Undisclosed at Present</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-xs font-semibold text-[#241713] mb-1.5 uppercase tracking-wide">
                    Acquisition Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-3 py-3 rounded border border-[#3B241B]/30 text-base bg-[#F7F4F0]/60 text-[#241713] focus:outline-none focus:ring-2 focus:ring-[#8C5E3C] min-h-[44px]"
                  >
                    <option value="Immediate 30-Day Close">Immediate 30-Day Closing Window</option>
                    <option value="Within 30–60 Days">Within 30–60 Days</option>
                    <option value="60–120 Days / Flexible">60–120 Days / Flexible</option>
                    <option value="Relocation Next Quarter">Relocation Next Quarter</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 4: Special Instructions */}
            <div className="mb-8">
              <label htmlFor="specialRequests" className="block text-xs font-semibold text-[#241713] mb-1.5 uppercase tracking-wide">
                Special Clauses, Privacy Instructions, or Viewing Schedule Preferences
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                rows={3}
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                placeholder="Specify preferred private tour times, NDA requirements, or specific architectural parameters..."
                className="w-full p-3.5 rounded border border-[#3B241B]/30 text-base bg-[#F7F4F0]/60 text-[#241713] focus:outline-none focus:ring-2 focus:ring-[#8C5E3C]"
              />
            </div>

            {/* Section 5: Signature & Execution */}
            <div className="border-t-2 border-[#241713] pt-6 mb-8">
              <h4 className="text-xs uppercase tracking-widest text-[#8C5E3C] font-bold mb-4">
                SECTION 05: LEGAL ACKNOWLEDGMENT & FORMAL DIGITAL SIGNATURE
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-end">
                {/* Signature input with cursive font feel */}
                <div className="sm:col-span-8">
                  <label htmlFor="signature" className="block text-xs font-semibold text-[#241713] mb-1.5 uppercase tracking-wide">
                    Authorized Electronic Signature *
                  </label>
                  <div className="relative">
                    <input
                      id="signature"
                      name="signature"
                      type="text"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.signature}
                      aria-describedby={errors.signature ? 'signature-error' : undefined}
                      value={formData.signature}
                      onChange={(e) => {
                        setFormData({ ...formData, signature: e.target.value });
                        if (errors.signature) setErrors({ ...errors, signature: '' });
                      }}
                      placeholder="Type your full legal name to sign"
                      className={`w-full px-4 py-3 rounded border text-xl font-serif-luxury italic text-[#241713] bg-[#F7F4F0]/80 focus:outline-none focus:ring-2 focus:ring-[#8C5E3C] min-h-[44px] ${
                        errors.signature ? 'border-red-500 bg-red-50/50' : 'border-[#3B241B]/40'
                      }`}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C5E3C] font-mono pointer-events-none">
                      [DIGITAL SIGNATURE]
                    </div>
                  </div>
                  {errors.signature && (
                    <p id="signature-error" className="text-xs text-red-600 font-medium mt-1">
                      {errors.signature}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="date" className="block text-xs font-semibold text-[#241713] mb-1.5 uppercase tracking-wide">
                    Execution Date
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    readOnly
                    value={formData.date}
                    className="w-full px-3.5 py-3 rounded border border-[#3B241B]/30 text-base font-mono bg-[#F7F4F0] text-[#241713] min-h-[44px]"
                  />
                </div>
              </div>

              {/* Checkbox Acknowledgment */}
              <div className="mt-5 flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formData.termsAgreed}
                  onChange={(e) => {
                    setFormData({ ...formData, termsAgreed: e.target.checked });
                    if (errors.termsAgreed) setErrors({ ...errors, termsAgreed: '' });
                  }}
                  className="mt-1 w-5 h-5 rounded border-[#3B241B] text-[#8C5E3C] focus:ring-[#8C5E3C] shrink-0"
                />
                <label htmlFor="terms" className="text-xs text-[#3B241B]/80 leading-relaxed cursor-pointer select-none">
                  I understand this submission constitutes a bona fide representation inquiry and intent for WilsonVegas. All information provided will be safeguarded with absolute confidentiality under Nevada real estate agency regulations.
                </label>
              </div>
              {errors.termsAgreed && (
                <p className="text-xs text-red-600 font-medium mt-1">
                  {errors.termsAgreed}
                </p>
              )}
            </div>

            {/* Submission Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#3B241B]/20">
              <div className="flex items-center space-x-2 text-xs text-[#8C5E3C]">
                <ShieldCheck className="w-4 h-4 text-[#8C5E3C]" />
                <span>Encrypted Session Transmission · Confidential Review by Darrel Wilson</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-auto px-10 py-4 rounded-md font-bold text-xs tracking-widest uppercase transition-all shadow-xl cursor-pointer flex items-center justify-center space-x-2 min-h-[44px] ${
                  isSubmitting
                    ? 'bg-[#3B241B]/60 text-[#FFFFFF]/50 cursor-not-allowed'
                    : 'bg-[#241713] hover:bg-[#3B241B] text-[#FFFFFF]'
                }`}
              >
                <FileSignature className="w-4 h-4 text-[#C6A77A]" />
                <span>{isSubmitting ? 'Executing Agreement...' : 'Execute & Transmit Agreement'}</span>
              </button>
            </div>
          </form>
        ) : (
          /* Formal Executed Contract Certificate Confirmation */
          <div className="print-only-certificate bg-[#FFFFFF] text-[#241713] rounded-2xl shadow-2xl border-4 border-[#C6A77A] p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#F7F4F0] border-2 border-[#C6A77A] flex items-center justify-center mx-auto text-[#8C5E3C] shadow-inner no-print">
              <CheckCircle className="w-8 h-8 text-[#8C5E3C]" />
            </div>

            <span className="text-xs uppercase tracking-[0.25em] text-[#8C5E3C] font-bold block">
              Official Acquisition Intent Confirmation
            </span>

            <h3 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#241713]">
              Agreement Transmitted Successfully
            </h3>

            {/* Formal Legal Distinction Notice */}
            <div className="max-w-xl mx-auto p-3 rounded bg-amber-50 border border-amber-200 text-amber-900 text-xs text-left leading-relaxed">
              <strong className="font-semibold block mb-0.5">Verification & Record Status:</strong>
              This certificate confirms your electronic representation intent has been recorded in the WilsonVegas client portal. It is a formal pre-acquisition inquiry and does not bind title transfer until official escrow deposit and escrow documentation are executed.
            </div>

            <p className="text-sm text-[#3B241B]/80 font-light max-w-xl mx-auto leading-relaxed">
              Thank you, <strong className="font-semibold text-[#241713]">{formData.legalName}</strong>. Your luxury representation and acquisition mandate has been registered under record <span className="font-mono font-bold text-[#8C5E3C]">{contractId}</span>. Darrel Wilson will personally review your file and contact you via <span className="font-mono text-xs text-[#8C5E3C]">{formData.email}</span> within 4 hours.
            </p>

            {/* Certificate Details Box */}
            <div className="max-w-md mx-auto p-5 rounded-xl bg-[#F7F4F0] border border-[#3B241B]/20 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-[#3B241B]/15 pb-1.5">
                <span className="text-[#3B241B]/70">Certificate Reference:</span>
                <span className="font-mono font-bold text-[#241713]">{contractId}</span>
              </div>
              <div className="flex justify-between border-b border-[#3B241B]/15 pb-1.5">
                <span className="text-[#3B241B]/70">Selected Residence:</span>
                <span className="font-semibold text-[#241713]">{selectedListing?.title || 'Custom Mandate'}</span>
              </div>
              <div className="flex justify-between border-b border-[#3B241B]/15 pb-1.5">
                <span className="text-[#3B241B]/70">Mandate Type:</span>
                <span className="font-medium text-[#241713]">{formData.intent}</span>
              </div>
              <div className="flex justify-between border-b border-[#3B241B]/15 pb-1.5">
                <span className="text-[#3B241B]/70">Capital Bracket:</span>
                <span className="font-medium text-[#241713]">{formData.priceRange}</span>
              </div>
              <div className="flex justify-between border-b border-[#3B241B]/15 pb-1.5">
                <span className="text-[#3B241B]/70">Authorized Signature:</span>
                <span className="font-serif-luxury italic font-bold text-[#8C5E3C] text-base">{formData.signature}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#3B241B]/70">Date Executed:</span>
                <span className="font-mono text-[11px] text-[#241713]">{formData.date}</span>
              </div>
            </div>

            {/* Print / Hallway Return Options */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4 no-print">
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-3 rounded bg-[#F7F4F0] hover:bg-[#3B241B]/10 text-[#241713] border border-[#3B241B]/30 text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer min-h-[44px]"
                aria-label="Print official certificate receipt"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Receipt</span>
              </button>

              <button
                type="button"
                onClick={onReturnToHallway}
                className="w-full sm:w-auto px-8 py-3 rounded bg-[#241713] hover:bg-[#3B241B] text-[#C6A77A] font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer shadow-lg min-h-[44px]"
                aria-label="Return to Central Hallway"
              >
                <RotateCcw className="w-4 h-4 text-[#C6A77A]" />
                <span>Return to Central Hallway</span>
              </button>
            </div>
          </div>
        )}

        {/* Ambient Footer Return */}
        <div className="mt-12 text-center no-print">
          <button
            onClick={onReturnToHallway}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-md bg-[#3B241B]/80 hover:bg-[#3B241B] text-[#E0C7A4] hover:text-[#FFFFFF] border border-[#C6A77A]/30 text-xs uppercase tracking-wider transition-all cursor-pointer min-h-[44px]"
          >
            <RotateCcw className="w-4 h-4 text-[#C6A77A]" />
            <span>Return to Hallway (Choose Another Door)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
