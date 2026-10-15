import React, { useState, useEffect } from 'react';
import {
  Phone, MapPin, MessageCircle, ArrowRight, CheckCircle, Send,
  Navigation, ChevronRight, Filter, Crown, Clock, Compass, Instagram, Search, Truck, Zap, Star,
} from 'lucide-react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import { PRODUCTS } from './data/products';
import { SHOP_DETAILS, FILTERS, CATEGORY_IDS, SHOWCASES } from './data/shop';
import { generateContactWhatsAppUrl, generateWhatsAppUrl } from './utils/whatsapp';

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const CUSTOMER_REVIEWS = [
  {
    title: 'Great Collection',
    text: 'Beautiful collection of ladies’ footwear! Lots of trendy designs at affordable prices. Loved the shopping experience at HI5!',
  },
  {
    title: 'Affordable Prices',
    text: 'Best place to buy stylish footwear within budget. Good quality, reasonable prices, and so many designs to choose from!',
  },
  {
    title: 'Kids Collection',
    text: 'Really cute and lovely footwear collections for kids. The designs are attractive, and the prices are budget-friendly. Highly recommended!',
  },
  {
    title: 'Friendly Service',
    text: 'Excellent customer service and a wonderful collection of ladies’ and kids’ footwear. Very happy with my purchase. Will definitely visit again!',
  },
  {
    title: 'Best Shopping Experience',
    text: 'HI5 Footwear is a great place for trendy flats, heels, and kids’ footwear. Affordable prices and stylish collections make it worth visiting!',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', phone: '', category: '', message: '' });
  const [filterCategory, setFilterCategory] = useState('all');
  const [productSearch, setProductSearch] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.scroll-reveal').forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const revealElements = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [activeTab]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavigate = (id) => {
    setActiveTab(id);
    setProductSearch('');
    if (id === 'address') {
      setTimeout(() => scrollToSection('store-location'), 50);
    } else if (CATEGORY_IDS.includes(id)) {
      setFilterCategory(id);
      scrollTop();
    } else {
      setFilterCategory('all');
      scrollTop();
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone || !contactForm.category || !contactForm.message) return;

    const payload = {
      name: contactForm.name.trim(),
      phone: contactForm.phone.trim(),
      category: contactForm.category.trim(),
      message: contactForm.message.trim(),
    };

    const whatsappUrl = generateContactWhatsAppUrl({
      ...payload,
      targetNumber: SHOP_DETAILS.whatsappPrimary,
    });

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setContactSubmitted(true);
    setTimeout(() => {
      setContactForm({ name: '', phone: '', category: '', message: '' });
      setContactSubmitted(false);
    }, 2500);
  };

  const handleWhatsAppQuickSend = () => {
    if (!contactForm.name || !contactForm.phone || !contactForm.category || !contactForm.message) return;

    const whatsappUrl = generateContactWhatsAppUrl({
      name: contactForm.name.trim(),
      phone: contactForm.phone.trim(),
      category: contactForm.category.trim(),
      message: contactForm.message.trim(),
      targetNumber: SHOP_DETAILS.whatsappPrimary,
    });

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const filteredProducts = PRODUCTS.filter((p) => filterCategory === 'all' || p.category === filterCategory);
  const matchingProducts = filteredProducts.filter((product) => {
    const searchText = [
      product.name,
      product.categoryLabel,
      product.fabric,
      product.description,
      ...(product.colors || []),
      ...(product.sizes || []),
    ].join(' ').toLowerCase();

    return searchText.includes(productSearch.trim().toLowerCase());
  });
  const newArrivals = PRODUCTS.filter((product) => product.isNewArrival).slice(0, 4);
  const isHome = activeTab === 'home' || activeTab === 'address';

  return (
    <div className="min-h-screen bg-[#080808] text-slate-100 font-sans selection:bg-red-600 selection:text-white flex flex-col justify-between overflow-x-hidden">
      <Navbar
        scrolled={scrolled}
        activeTab={activeTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onNavigate={handleNavigate}
        onLogoClick={() => { handleNavigate('home'); }}
      />

      <main className="flex-grow pt-16 sm:pt-20">
        {isHome && (
          <>
            <section className="relative min-h-[72vh] sm:min-h-[92vh] flex items-center justify-center px-3 sm:px-6 overflow-hidden bg-[#090909]">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,191,36,0.12),transparent_25%),linear-gradient(135deg,_rgba(120,15,15,0.35),rgba(8,8,8,0.32)_55%,rgba(8,8,8,0.92))]" />
                <img
                  src="/images/ladies-bridal-lehenga.png"
                  alt="Festive occasion wear from HI-5 Karuppu Kadai"
                  className="w-full h-full object-cover opacity-35 contrast-110 brightness-[0.7] scale-105 animate-hero-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/55 to-black/70" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-transparent to-black/25" />
              </div>

              <div className="relative z-10 text-center max-w-5xl mx-auto py-8 sm:py-16 px-1 sm:px-0">
                <div className="hero-entrance hero-entrance-1 inline-flex items-center gap-2 bg-red-950/80 border border-amber-500/40 text-amber-300 px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] uppercase tracking-widest font-bold mb-6 backdrop-blur-md shadow-xl">
                  <Crown size={14} className="text-amber-400" /> A family boutique in RS Mangalam
                </div>

                <h1 className="hero-entrance hero-entrance-2 hero-title text-[2.2rem] sm:text-6xl md:text-7xl font-bold tracking-wider font-serif text-white mb-4 leading-[0.92] sm:leading-tight">
                  <span className="hero-brand-english">HI-5</span>{' '}
                  <span className="hero-title-accent hero-brand-tamil block sm:inline">கருப்பு கடை</span>
                </h1>

                <p className="hero-entrance hero-entrance-3 text-zinc-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 font-light tracking-wide leading-relaxed px-2 sm:px-0">
                  Festive outfits, special occasion wear and everyday favourites for every generation of your family.
                </p>

                <div className="hero-entrance hero-entrance-4 flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto px-1 sm:px-0">
                  <button
                    onClick={() => scrollToSection('ladies-showcase')}
                    className="hero-primary-cta bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all shadow-xl shadow-red-950/60 flex items-center justify-center gap-2 rounded-sm w-full sm:w-auto"
                  >
                    Explore the collection <ArrowRight size={15} />
                  </button>

                  <a
                    href={generateWhatsAppUrl('General Boutique Inquiry')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-secondary-cta bg-zinc-950/90 border border-zinc-800 hover:border-red-600 text-white px-7 py-4 text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 rounded-sm w-full sm:w-auto"
                  >
                    <MessageCircle size={15} className="text-red-500" /> WhatsApp Inquiry
                  </a>
                </div>

                <div className="hero-entrance hero-entrance-5 mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-zinc-400">
                  <span className="uppercase tracking-widest">Follow us</span>
                  <a
                    href="https://www.instagram.com/hi5_boutiques_?dlrf=aTZsYXZlM3gyd3I3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-amber-300 transition-colors"
                  >
                    <Instagram size={14} /> Boutique
                  </a>
                  <a
                    href="https://www.instagram.com/hi5_.footwears?exln=MW8wanhkcnA3dDN4NA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-amber-300 transition-colors"
                  >
                    <Instagram size={14} /> Footwear
                  </a>
                </div>

                <div className="mt-12 pt-8 border-t border-zinc-800/80 max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  <div className="hero-entrance hero-entrance-6 hero-info-card flex items-start gap-3 bg-zinc-950/60 p-3 rounded border border-zinc-900">
                    <MapPin size={20} className="text-red-500 shrink-0 mt-0.5" />
                    <div className="text-[11px] text-zinc-300">
                      <span className="text-amber-400 font-bold block uppercase tracking-wider">Studio Address</span>
                      Gandhi Street, RS Mangalam, Ramanathapuram
                    </div>
                  </div>
                  <div className="hero-entrance hero-entrance-7 hero-info-card flex items-start gap-3 bg-zinc-950/60 p-3 rounded border border-zinc-900">
                    <Phone size={20} className="text-red-500 shrink-0 mt-0.5" />
                    <div className="text-[11px] text-zinc-300">
                      <span className="text-amber-400 font-bold block uppercase tracking-wider">Direct WhatsApp Order</span>
                      +91 {SHOP_DETAILS.primaryMobile} / {SHOP_DETAILS.secondaryMobile}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="scroll-reveal max-w-7xl mx-auto px-4 sm:px-6 py-20">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {[
                  {
                    category: 'sarees',
                    title: 'Saree Collection',
                    subtitle: 'Explore graceful sarees for celebrations and special occasions.',
                    image: '/images/saree-black-magenta.png',
                  },
                  {
                    category: 'ladies-dress',
                    title: 'Wedding Ethnic Wear',
                    subtitle: 'Explore festive gowns, lehengas and embroidered styles.',
                    image: '/images/ladies-floral-anarkali.png',
                  },
                  {
                    category: 'kids-dress',
                    title: 'Festive Kids Collections',
                    subtitle: 'Pattu pavadai, little-kid casuals and Tamil traditional wear.',
                    image: '/images/kids-pattu-festival.png',
                  },
                  {
                    category: 'group-dress',
                    title: 'Group Dress Collection',
                    subtitle: 'Coordinated looks for family, friends and celebrations.',
                    image: '/images/group-veshti-shirts.png',
                  },
                  {
                    category: 'footwear',
                    title: 'Traditional Footwear',
                    subtitle: 'Explore stylish slides and comfortable everyday sandals.',
                    image: '/images/footwear-teal-premium-sandal.png',
                  },
                ].map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => handleNavigate(item.category)}
                    className="group relative w-full overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950 text-left shadow-[0_25px_60px_rgba(0,0,0,0.35)] animate-fade-up focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
                    style={{ animationDelay: `${index * 120}ms` }}
                    aria-label={`Browse ${item.title}`}
                  >
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-red-400">Featured</p>
                      <h3 className="mt-2 text-2xl font-serif text-white">{item.title}</h3>
                      <p className="mt-2 text-sm text-zinc-200/90">{item.subtitle}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="scroll-reveal max-w-7xl mx-auto px-4 sm:px-6 pb-16">
              <div className="grid overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950 shadow-[0_25px_60px_rgba(0,0,0,0.35)] md:grid-cols-2">
                <div className="relative min-h-64 overflow-hidden bg-zinc-900 sm:min-h-80">
                  <img
                    src="/images/boutique-promo.gif"
                    alt="Animated delivery vans on the road"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex flex-col justify-center gap-6 p-6 sm:p-10">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-red-500">From our boutique to you</span>
                    <h2 className="mt-2 font-serif text-2xl font-bold text-white sm:text-3xl">Delivery, made simple</h2>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-3 border border-zinc-800 bg-zinc-900/70 p-4">
                      <Truck size={22} className="shrink-0 text-amber-400" aria-hidden="true" />
                      <span className="text-sm font-semibold text-white">Free Delivery</span>
                    </div>
                    <div className="flex items-center gap-3 border border-zinc-800 bg-zinc-900/70 p-4">
                      <Zap size={22} className="shrink-0 text-red-400" aria-hidden="true" />
                      <span className="text-sm font-semibold text-white">Fast Delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="scroll-reveal overflow-hidden border-y border-zinc-900 bg-[#0d0b0b] py-14 sm:py-16" aria-labelledby="customer-reviews-heading">
              <div className="mx-auto mb-8 max-w-7xl px-4 text-center sm:px-6">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">Kind words from our shoppers</span>
                <h2 id="customer-reviews-heading" className="mt-2 font-serif text-2xl font-bold text-white sm:text-4xl">
                  Customer Reviews
                </h2>
                <p className="mt-2 text-sm text-zinc-400">Thank you for shopping with HI-5.</p>
              </div>
              <div className="reviews-marquee" role="group" aria-label="Five-star customer reviews; the carousel pauses when hovered or focused">
                {[0, 1].map((copy) => (
                  <div key={copy} className="reviews-marquee-lane" aria-hidden={copy === 1}>
                    {CUSTOMER_REVIEWS.map((review) => (
                      <article key={`${copy}-${review.title}`} className="review-card">
                        <div className="flex gap-1 text-amber-400" aria-label="5 out of 5 stars">
                          {Array.from({ length: 5 }, (_, index) => (
                            <Star key={index} size={16} fill="currentColor" aria-hidden="true" />
                          ))}
                        </div>
                        <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-white">{review.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-zinc-300">“{review.text}”</p>
                        <p className="mt-4 text-xs font-semibold text-amber-400">HI-5 Customer</p>
                      </article>
                    ))}
                  </div>
                ))}
              </div>
              <ul className="sr-only">
                {CUSTOMER_REVIEWS.map((review) => (
                  <li key={review.title}>
                    5 out of 5 stars. {review.title}. {review.text}
                  </li>
                ))}
              </ul>
            </section>

            {newArrivals.length > 0 && (
              <section className="scroll-reveal max-w-7xl mx-auto px-4 sm:px-6 pb-20">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-red-500 font-bold">Fresh from the boutique</span>
                    <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mt-1">New Arrivals</h2>
                    <p className="text-sm text-zinc-400 mt-2">Message us to check current sizes, colours and prices.</p>
                  </div>
                  <button
                    onClick={() => handleNavigate('order')}
                    className="text-xs uppercase tracking-widest text-amber-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    Browse all products <ChevronRight size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {newArrivals.map((product) => (
                    <ProductCard key={product.id} product={product} onSelect={() => setSelectedProduct(product)} />
                  ))}
                </div>
              </section>
            )}

            {SHOWCASES.map((s) => (
              <section
                key={s.category}
                id={s.sectionId}
                className={`scroll-reveal max-w-7xl mx-auto px-4 sm:px-6 py-20 ${
                  ['footwear', 'kids-footwear'].includes(s.category)
                    ? 'mb-8 rounded-2xl border border-zinc-800/80 bg-zinc-950/40 shadow-xl'
                    : 'border-b border-zinc-900'
                }`}
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-12 gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-red-500 font-bold">{s.eyebrow}</span>
                    <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mt-1">{s.title}</h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={generateWhatsAppUrl(s.waTitle, '', s.waCategory)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-600/20 border border-red-600/50 hover:bg-red-600 text-white px-4 py-2 text-xs uppercase font-bold tracking-widest rounded-sm flex items-center gap-1.5 transition-all"
                    >
                      <MessageCircle size={13} /> Order Category on WhatsApp
                    </a>
                    <button
                      onClick={() => handleNavigate(s.category)}
                      className="text-xs uppercase tracking-widest text-amber-400 hover:text-red-400 flex items-center gap-1 transition-colors"
                    >
                      {s.viewAll} <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                <div className={`grid grid-cols-1 sm:grid-cols-2 ${s.gridClass} gap-8`}>
                  {PRODUCTS.filter((p) => p.category === s.category).map((product) => (
                    <ProductCard key={product.id} product={product} onSelect={() => setSelectedProduct(product)} />
                  ))}
                </div>
              </section>
            ))}

            <section id="store-location" className="scroll-reveal max-w-7xl mx-auto px-4 sm:px-6 py-20 border-b border-zinc-900">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-xs uppercase tracking-widest text-red-500 font-bold flex items-center justify-center gap-2">
                  <Compass size={14} /> Visit Our Boutique
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-2">
                  Find HI-5 கருப்பு கடை in RS Mangalam
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-light">
                  Gandhi Street, RS Mangalam, Ramanathapuram District, Tamil Nadu.
                </p>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-sm overflow-hidden p-2 shadow-2xl">
                <div className="w-full h-[400px] rounded-sm overflow-hidden relative">
                  <iframe
                    title="HI-5 Karuppu Kadai Google Maps Location"
                    src={SHOP_DETAILS.embedMapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div className="p-6 bg-zinc-950 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <MapPin size={24} className="text-red-500 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-white">Gandhi Street, RS Mangalam</p>
                      <p className="text-xs text-zinc-400">Ramanathapuram District • Tamil Nadu</p>
                    </div>
                  </div>

                  <a
                    href={SHOP_DETAILS.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    <Navigation size={15} /> Get Directions on Google Maps
                  </a>
                </div>
              </div>
            </section>

            <section className="scroll-reveal max-w-7xl mx-auto px-4 sm:px-6 py-20">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-sm space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-red-500 font-bold">Store Details</span>
                    <h3 className="text-2xl font-serif font-bold text-white mt-1">HI-5 கருப்பு கடை Studio</h3>
                  </div>

                  <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
                    <div className="flex items-start gap-3">
                      <MapPin size={20} className="text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-400 block uppercase tracking-wider text-[11px]">Boutique Address</span>
                        <p className="text-zinc-300 mt-0.5">{SHOP_DETAILS.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone size={20} className="text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-400 block uppercase tracking-wider text-[11px]">Direct Phone Lines</span>
                        <div className="flex flex-wrap gap-4 mt-1 text-white font-bold">
                          <a href={`tel:${SHOP_DETAILS.primaryMobile}`} className="hover:text-red-400 underline">+91 {SHOP_DETAILS.primaryMobile}</a>
                          <a href={`tel:${SHOP_DETAILS.secondaryMobile}`} className="hover:text-red-400 underline">+91 {SHOP_DETAILS.secondaryMobile}</a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MessageCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-400 block uppercase tracking-wider text-[11px]">Instagram Profiles</span>
                        <div className="flex flex-col gap-2 mt-1 text-white font-bold">
                          <a href="https://www.instagram.com/hi5_.footwears?exln=MW8wanhkcnA3dDN4NA==" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 underline">hi5_.footwears</a>
                          <a href="https://www.instagram.com/hi5_boutiques_?dlrf=aTZsYXZlM3gyd3I3" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 underline">hi5_boutiques_</a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock size={20} className="text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-400 block uppercase tracking-wider text-[11px]">Working Hours</span>
                        <p className="text-zinc-300 mt-0.5">Monday – Sunday: 9:00 AM to 9:00 PM</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-800 space-y-2">
                    <a
                      href={generateWhatsAppUrl('Direct Inquiry', '', '', SHOP_DETAILS.whatsappPrimary)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all"
                    >
                      <MessageCircle size={16} /> Order via WhatsApp ({SHOP_DETAILS.primaryMobile})
                    </a>
                    <a
                      href={generateWhatsAppUrl('Direct Inquiry', '', '', SHOP_DETAILS.whatsappSecondary)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white py-3 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                    >
                      <MessageCircle size={16} className="text-red-500" /> Order via WhatsApp ({SHOP_DETAILS.secondaryMobile})
                    </a>
                  </div>
                </div>

                <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-sm">
                  {contactSubmitted ? (
                    <div className="text-center py-16 space-y-4">
                      <CheckCircle size={48} className="text-red-500 mx-auto animate-bounce" />
                      <h3 className="text-2xl font-serif text-white">நன்றி! (Thank You)</h3>
                      <p className="text-xs text-zinc-400">
                        Your inquiry has been submitted. We will contact you back shortly from HI-5 கருப்பு கடை.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div>
                        <span className="text-xs uppercase tracking-widest text-red-500 font-bold">Quick Contact Form</span>
                        <h3 className="text-2xl font-serif font-bold text-white mt-1">Send Message To Boutique</h3>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-amber-400 mb-1 font-semibold">Customer Name</label>
                        <input
                          type="text" required value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-white p-3 rounded-sm focus:border-red-600 focus:outline-none"
                          placeholder="Your Name"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-amber-400 mb-1 font-semibold">Mobile Number</label>
                        <input
                          type="tel" required value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-white p-3 rounded-sm focus:border-red-600 focus:outline-none"
                          placeholder="Mobile Number"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-amber-400 mb-1 font-semibold">Category</label>
                        <select
                          required value={contactForm.category}
                          onChange={(e) => setContactForm({ ...contactForm, category: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-white p-3 rounded-sm focus:border-red-600 focus:outline-none"
                        >
                          <option value="" disabled className="text-white bg-zinc-900">Select Category</option>
                          {FILTERS.filter((item) => item.id !== 'all').map((item) => (
                            <option key={item.id} value={item.label} className="text-white bg-zinc-900">{item.label}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-amber-400 mb-1 font-semibold">Inquiry Details</label>
                        <textarea
                          rows="4" required value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-white p-3 rounded-sm focus:border-red-600 focus:outline-none resize-none"
                          placeholder="Inquire about custom sizes, colors, or availability..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg"
                      >
                        <Send size={14} /> Send Message To Studio
                      </button>

                      <button
                        type="button"
                        onClick={handleWhatsAppQuickSend}
                        className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white py-3 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                      >
                        <MessageCircle size={14} className="text-red-500" /> Send Message To WhatsApp
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </section>
          </>
        )}

        {[...CATEGORY_IDS, 'order'].includes(activeTab) && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-zinc-800 gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-red-500 font-bold">Catalog Showcase</span>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white capitalize mt-1">
                  {activeTab === 'order' ? 'All Boutique Items' : activeTab.replace('-', ' ')}
                </h1>
                <p className="text-sm text-zinc-400 mt-2">{matchingProducts.length} {matchingProducts.length === 1 ? 'item' : 'items'} found</p>
              </div>

              <div className="w-full md:w-auto flex flex-col gap-3">
                <label className="relative block w-full md:w-80">
                  <span className="sr-only">Search products</span>
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" aria-hidden="true" />
                  <input
                    type="search"
                    value={productSearch}
                    onChange={(event) => setProductSearch(event.target.value)}
                    placeholder="Search products, colors, sizes..."
                    className="w-full bg-zinc-950 border border-zinc-800 text-sm text-white placeholder:text-zinc-500 pl-10 pr-3 py-3 rounded-sm focus:border-amber-500 focus:outline-none"
                  />
                </label>
                <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-zinc-500 mr-2 flex items-center gap-1">
                  <Filter size={12} /> Category Filter:
                </span>
                {FILTERS.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFilterCategory(cat.id)}
                    className={`text-xs px-3 py-1.5 rounded-sm border uppercase tracking-wider transition-all ${
                      filterCategory === cat.id
                        ? 'bg-red-600 border-red-600 text-white font-bold'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {matchingProducts.map((product) => (
                <ProductCard key={product.id} product={product} onSelect={() => setSelectedProduct(product)} />
              ))}
            </div>
            {matchingProducts.length === 0 && (
              <div className="text-center py-16 border border-dashed border-zinc-800 rounded-sm">
                <p className="text-lg font-serif text-white">No matching products found</p>
                <p className="text-sm text-zinc-400 mt-2">Try another keyword or choose a different category.</p>
                <button
                  onClick={() => { setProductSearch(''); setFilterCategory('all'); }}
                  className="mt-5 text-sm font-bold text-amber-400 hover:text-white underline underline-offset-4"
                >
                  Clear search and filters
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}

      <Footer />
    </div>
  );
}
