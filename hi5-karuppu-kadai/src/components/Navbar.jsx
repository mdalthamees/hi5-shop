import React from 'react';
import { Menu, X, Phone, MapPin, MessageCircle, Navigation } from 'lucide-react';
import { SHOP_DETAILS, NAV_ITEMS } from '../data/shop';
import { generateWhatsAppUrl } from '../utils/whatsapp';

const PRIMARY_NAV_IDS = ['home', 'sarees', 'ladies-dress', 'kids-dress'];
const PRIMARY_NAV_ITEMS = NAV_ITEMS.filter((tab) => PRIMARY_NAV_IDS.includes(tab.id));
const MORE_NAV_ITEMS = NAV_ITEMS.filter((tab) => !PRIMARY_NAV_IDS.includes(tab.id));

export default function Navbar({ scrolled, activeTab, mobileMenuOpen, setMobileMenuOpen, onNavigate, onLogoClick }) {
  const renderNavItem = (tab, compact = false) => {
    const isActive = activeTab === tab.id;
    return (
      <button
        key={tab.id}
        onClick={(event) => {
          event.currentTarget.closest('details')?.removeAttribute('open');
          onNavigate(tab.id);
        }}
        className={`relative whitespace-nowrap text-left text-xs font-semibold uppercase tracking-wider transition-colors ${
          compact ? 'w-full rounded-sm px-3 py-2.5 hover:bg-zinc-900' : 'py-2'
        } ${isActive ? 'text-red-500 font-bold' : 'text-zinc-300 hover:text-amber-400'}`}
      >
        {tab.label}
        {!compact && isActive && (
          <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-red-600 shadow-[0_0_10px_#dc2626]" />
        )}
      </button>
    );
  };

  return (
    <nav
      className={`nav-shell sticky top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-red-950/60 bg-[#050505]/95 py-3 shadow-2xl backdrop-blur-md'
          : 'border-b border-zinc-900/80 bg-[#050505]/95 py-3 sm:py-4 shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 sm:px-6">
        <button onClick={onLogoClick} aria-label="HI-5 கருப்பு கடை home" className="group flex min-w-0 shrink items-center gap-2 text-left sm:gap-3">
          <span className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-amber-400/70 bg-white shadow-[0_0_18px_rgba(239,68,68,0.3)] sm:h-12 sm:w-12 xl:h-14 xl:w-14">
            <img src="/images/hi5-logo.png" alt="" className="h-full w-full object-cover" />
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="whitespace-nowrap font-serif text-base font-black uppercase leading-none tracking-[0.08em] text-white sm:text-xl xl:text-2xl">
              HI-5 <span className="text-red-600 group-hover:text-red-500 transition-colors">கருப்பு கடை</span>
            </span>
            <span className="mt-1 hidden whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] text-amber-500/80 sm:block">
              Gandhi Street • RS Mangalam • Ramanathapuram
            </span>
          </span>
        </button>

        <div className="hidden shrink-0 items-center gap-3 lg:flex xl:gap-5">
          {PRIMARY_NAV_ITEMS.map((tab) => renderNavItem(tab))}
          <details className="group/more relative">
            <summary
              className={`flex cursor-pointer list-none items-center gap-1 py-2 text-xs font-semibold uppercase tracking-wider transition-colors [&::-webkit-details-marker]:hidden ${
                MORE_NAV_ITEMS.some((tab) => tab.id === activeTab) ? 'text-red-500' : 'text-zinc-300 hover:text-amber-400'
              }`}
            >
              More
              <span className="text-[10px] transition-transform group-open/more:rotate-180">▾</span>
            </summary>
            <div className="absolute right-0 top-full z-50 mt-3 max-h-[70vh] min-w-52 overflow-y-auto rounded-sm border border-zinc-800 bg-zinc-950 p-2 shadow-2xl">
              {MORE_NAV_ITEMS.map((tab) => renderNavItem(tab, true))}
            </div>
          </details>
        </div>

        <div className="hidden shrink-0 items-center gap-2 2xl:flex">
          <a
            href={SHOP_DETAILS.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-sm border border-amber-500/30 bg-zinc-950/90 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-amber-400/90 transition-colors hover:border-red-600 hover:text-white"
            title="Google Maps Directions"
          >
            <MapPin size={13} className="text-red-500" /> Map
          </a>
          <a
            href={generateWhatsAppUrl('Direct Boutique Inquiry')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-sm bg-red-600 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-red-950/50 transition-all hover:bg-red-700"
          >
            <MessageCircle size={14} /> WhatsApp
          </a>
        </div>

        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-sm p-2 text-white transition-colors hover:text-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={25} className="text-red-500" /> : <Menu size={25} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-red-950 bg-black/95 px-4 py-4 backdrop-blur-xl animate-fadeIn sm:px-6 lg:hidden">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-1 sm:grid-cols-3">
            {NAV_ITEMS.map((tab) => (
              <div
                key={tab.id}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate(tab.id);
                }}
              >
                {renderNavItem(tab, true)}
              </div>
            ))}
          </div>

          <div className="mx-auto max-w-7xl space-y-2 pt-4">
            <a
              href={SHOP_DETAILS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-sm border border-amber-500/30 bg-zinc-900 px-4 py-3 text-xs font-semibold text-amber-400"
            >
              <Navigation size={15} /> Open Google Maps Directions
            </a>
            <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
              <a href={`tel:${SHOP_DETAILS.primaryMobile}`} className="flex items-center justify-center gap-1 rounded-sm border border-red-600/60 bg-red-600/30 py-2.5 text-center text-xs font-bold text-white">
                <Phone size={13} /> {SHOP_DETAILS.primaryMobile}
              </a>
              <a href={`tel:${SHOP_DETAILS.secondaryMobile}`} className="flex items-center justify-center gap-1 rounded-sm border border-zinc-800 bg-zinc-900 py-2.5 text-center text-xs font-bold text-white">
                <Phone size={13} /> {SHOP_DETAILS.secondaryMobile}
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
