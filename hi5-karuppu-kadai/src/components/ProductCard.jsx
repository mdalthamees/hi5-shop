import React from 'react';
import { MessageCircle, ChevronRight, Sparkles } from 'lucide-react';
import { SHOP_DETAILS } from '../data/shop';
import { generateWhatsAppUrl } from '../utils/whatsapp';

export default function ProductCard({ product, onSelect }) {
  return (
    <div className="group scroll-reveal bg-zinc-950 border border-zinc-800/80 rounded-sm overflow-hidden flex flex-col justify-between hover:border-red-900/60 transition-all duration-300 shadow-xl">
      <div className="relative overflow-hidden aspect-[3/4] bg-zinc-900">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute top-3 right-3 bg-black/80 border border-amber-500/30 text-amber-400 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-sm inline-flex items-center gap-1.5">
          {product.isNewArrival && <Sparkles size={11} />}
          {product.isNewArrival ? 'New Arrival' : 'Boutique Collection'}
        </div>

        {product.imageCredit && (
          <a
            href={product.imageCreditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-2 left-2 z-10 rounded-sm bg-black/75 px-2 py-1 text-[9px] text-zinc-200 underline decoration-zinc-500 underline-offset-2"
          >
            Photo: {product.imageCredit}
          </a>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-red-500 font-bold">{product.categoryLabel}</span>
          <h3 className="text-base font-semibold text-white mt-1 group-hover:text-amber-400 transition-colors">{product.name}</h3>
          <p className="text-[11px] text-zinc-400 mt-1">
            <span className="text-zinc-500">Fabric:</span> {product.fabric}
          </p>
          <p className="text-[11px] text-amber-300 mt-2 font-semibold">Ask for price & availability</p>
          {product.colors?.length > 0 && (
            <p className="text-[11px] text-zinc-400 mt-1">
              <span className="text-zinc-500">Colors:</span> {product.colors.join(', ')}
            </p>
          )}
          {product.sizes?.length > 0 && (
            <p className="text-[11px] text-zinc-400 mt-1">
              <span className="text-zinc-500">Sizes:</span> {product.sizes.slice(0, 4).join(', ')}
              {product.sizes.length > 4 ? ', +' + (product.sizes.length - 4) + ' more' : ''}
            </p>
          )}
          <p className="text-xs text-zinc-400 line-clamp-2 mt-1.5 font-light leading-relaxed">{product.description}</p>
        </div>

        <div className="mt-5 pt-4 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            onClick={onSelect}
            className="min-h-11 border border-zinc-700 text-zinc-100 hover:border-amber-500/60 hover:text-amber-300 py-2.5 rounded-sm text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
            aria-label={`View details for ${product.name}`}
          >
            View Details <ChevronRight size={14} />
          </button>
          <a
            href={generateWhatsAppUrl(product.name, '', product.categoryLabel, SHOP_DETAILS.whatsappPrimary)}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-11 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-sm text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
            aria-label={`Ask about ${product.name} on WhatsApp`}
          >
            <MessageCircle size={14} /> Ask on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
