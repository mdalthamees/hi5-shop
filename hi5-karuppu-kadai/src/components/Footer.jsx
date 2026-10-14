import React from 'react';
import { Instagram, MapPin } from 'lucide-react';
import { SHOP_DETAILS } from '../data/shop';

const INSTAGRAM_LINKS = [
  { label: 'hi5_.footwears', url: 'https://www.instagram.com/hi5_.footwears?exln=MW8wanhkcnA3dDN4NA==' },
  { label: 'hi5_boutiques_', url: 'https://www.instagram.com/hi5_boutiques_?dlrf=aTZsYXZlM3gyd3I3' },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 text-xs py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="h-14 w-14 overflow-hidden rounded-full border border-amber-400/50 bg-white shadow-lg shadow-red-950/30">
              <img src="/images/hi5-logo.png" alt="HI-5 Karuppu Kadai logo" className="h-full w-full object-cover" loading="lazy" />
            </span>
            <h3 className="text-xl font-serif font-bold text-white">
              HI-5 <span className="text-rose-200">கருப்பு கடை</span>
            </h3>
          </div>
          <p className="text-zinc-500 leading-relaxed font-light">
            Occasion wear, festive clothing and footwear for the whole family, in Gandhi Street, RS Mangalam.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-white font-bold uppercase tracking-widest">Boutique Address</h4>
          <p className="text-zinc-400 leading-relaxed flex items-start gap-2">
            <MapPin size={16} className="text-red-500 shrink-0 mt-0.5" />
            {SHOP_DETAILS.address}
          </p>
          <a href={SHOP_DETAILS.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-red-500 font-bold inline-flex items-center gap-1 hover:underline">
            Get directions →
          </a>
        </div>

        <div className="space-y-3">
          <h4 className="text-white font-bold uppercase tracking-widest">Contact Phone Numbers</h4>
          <p className="text-zinc-400">
            Mobile 1: <a href={`tel:${SHOP_DETAILS.primaryMobile}`} className="text-white font-bold hover:underline">+91 {SHOP_DETAILS.primaryMobile}</a>
          </p>
          <p className="text-zinc-400">
            Mobile 2: <a href={`tel:${SHOP_DETAILS.secondaryMobile}`} className="text-white font-bold hover:underline">+91 {SHOP_DETAILS.secondaryMobile}</a>
          </p>

          <div className="pt-2 space-y-2">
            <h4 className="text-white font-bold uppercase tracking-widest">Instagram</h4>
            <div className="flex flex-col gap-2">
              {INSTAGRAM_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 hover:underline"
                >
                  <Instagram size={14} />
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 pt-6 border-t border-zinc-900 text-center text-zinc-600 text-[11px]">
        (c) 2026 HI-5 கருப்பு கடை | Gandhi Street, RS Mangalam, Ramanathapuram
      </div>
    </footer>
  );
}
