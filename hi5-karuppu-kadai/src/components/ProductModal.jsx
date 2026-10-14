import React, { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { SHOP_DETAILS } from '../data/shop';
import { generateWhatsAppUrl } from '../utils/whatsapp';

export default function ProductModal({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    setSelectedSize(product.sizes?.length ? product.sizes[0] : '');
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        className="bg-zinc-950 border border-zinc-800 max-w-2xl w-full rounded-sm overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto"
      >
        <button onClick={onClose} aria-label="Close product details" className="absolute top-4 right-4 z-10 bg-black/80 border border-zinc-800 text-white p-2 rounded-full hover:bg-red-600 transition-colors">
          <X size={18} />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative aspect-[3/4] bg-zinc-900">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
            {product.imageCredit && (
              <a
                href={product.imageCreditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2 left-2 rounded-sm bg-black/75 px-2 py-1 text-[9px] text-zinc-200 underline decoration-zinc-500 underline-offset-2"
              >
                Photo: {product.imageCredit}
              </a>
            )}
          </div>

          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-red-500 font-bold">{product.categoryLabel}</span>
            <h3 id="product-modal-title" className="text-xl font-serif font-bold text-white mt-1">{product.name}</h3>
            <p className="text-sm text-amber-300 font-semibold mt-2">Ask us for current price and availability.</p>

            <div className="mt-3 text-[11px] text-zinc-400">
              <span className="text-amber-400 font-bold block">Fabric & Material:</span>
              {product.fabric}
            </div>

            <p className="text-xs text-zinc-400 mt-3 leading-relaxed font-light">{product.description}</p>

            {product.colors?.length > 0 && (
              <div className="mt-4">
                <span className="text-[11px] uppercase tracking-widest text-zinc-400 block mb-2 font-bold">Available colors / variants:</span>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <span key={color} className="text-xs px-3 py-1.5 rounded-sm border border-zinc-800 text-zinc-300">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {product.sizes?.length > 0 && (
              <div className="mt-4">
                  <span className="text-[11px] uppercase tracking-widest text-zinc-400 block mb-2 font-bold">Select Size Option:</span>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`text-xs px-3 py-1.5 rounded-sm border uppercase font-bold transition-all ${
                          selectedSize === s ? 'border-red-600 bg-red-600 text-white' : 'border-zinc-800 text-zinc-400 hover:border-zinc-600'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-zinc-800 space-y-2">
              <p className="text-[10px] text-zinc-400 text-center uppercase tracking-wider mb-1">Direct WhatsApp Order:</p>
              <a
                href={generateWhatsAppUrl(product.name, selectedSize, product.categoryLabel, SHOP_DETAILS.whatsappPrimary)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageCircle size={16} /> Order on WhatsApp ({SHOP_DETAILS.primaryMobile})
              </a>
              <a
                href={generateWhatsAppUrl(product.name, selectedSize, product.categoryLabel, SHOP_DETAILS.whatsappSecondary)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 py-3 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle size={16} className="text-red-500" /> Order on WhatsApp ({SHOP_DETAILS.secondaryMobile})
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
