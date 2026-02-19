/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Star, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Home, 
  Building2, 
  Trash2, 
  Menu, 
  X,
  ArrowRight,
  ChevronRight,
  Quote
} from 'lucide-react';

// --- Types ---
interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  price: string;
}

interface Review {
  id: string;
  author: string;
  text: string;
  rating: number;
  date: string;
}

// --- Constants ---
const SERVICES: Service[] = [
  {
    id: 'home',
    title: 'Čiščenje doma',
    description: 'Popolna čistoča vašega bivalnega prostora. Od kuhinje do spalnice, poskrbimo za vsak kotiček.',
    icon: <Home className="w-6 h-6" />,
    price: 'od 15€/h'
  },
  {
    id: 'office',
    title: 'Pisarniški prostori',
    description: 'Profesionalno okolje zahteva profesionalno čistočo. Redno ali občasno čiščenje poslovnih prostorov.',
    icon: <Building2 className="w-6 h-6" />,
    price: 'po dogovoru'
  },
  {
    id: 'deep',
    title: 'Globinsko čiščenje',
    description: 'Specializirano čiščenje preprog, sedežnih garnitur in vzmetnic z najsodobnejšo opremo.',
    icon: <Sparkles className="w-6 h-6" />,
    price: 'od 40€'
  },
  {
    id: 'post-construction',
    title: 'Po-gradbena čiščenja',
    description: 'Odstranjevanje prahu in ostankov gradbenih del. Pripravimo vaš novi prostor za vselitev.',
    icon: <Trash2 className="w-6 h-6" />,
    price: 'od 2.5€/m2'
  }
];

const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Marko P.',
    text: 'Najboljša ekipa! Naša hiša še nikoli ni bila tako čista. Zelo zanesljivi in natančni.',
    rating: 5,
    date: 'pred 2 tednoma'
  },
  {
    id: '2',
    author: 'Ana K.',
    text: 'Redno uporabljam njihove storitve za pisarno. Vedno pridejo ob dogovorjenem času. Priporočam!',
    rating: 5,
    date: 'pred 1 mesecem'
  },
  {
    id: '3',
    author: 'Luka M.',
    text: 'Globinsko čiščenje kavča je preseglo moja pričakovanja. Izgleda kot nov.',
    rating: 5,
    date: 'pred 3 dnevi'
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-brand-accent p-1.5 rounded-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className={`text-2xl font-serif font-bold tracking-tight ${isScrolled ? 'text-brand-primary' : 'text-white'}`}>
            Čisto<span className="text-brand-accent">.</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Storitve', 'Cenik', 'O nas', 'Mnenja'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className={`text-sm font-medium hover:text-brand-accent transition-colors ${isScrolled ? 'text-brand-primary' : 'text-white'}`}
            >
              {item}
            </a>
          ))}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${isScrolled ? 'border-brand-primary/10 text-brand-primary' : 'border-white/20 text-white'}`}>
            <Phone className="w-4 h-4" />
            <span className="text-sm font-semibold">041 123 456</span>
          </div>
          <button className="bg-brand-accent hover:bg-emerald-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-emerald-500/20">
            Pridobi ponudbo
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? 'text-brand-primary' : 'text-white'} />
          ) : (
            <Menu className={isScrolled ? 'text-brand-primary' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-black/5 p-6 md:hidden shadow-xl"
          >
            <div className="flex flex-col gap-6">
              {['Storitve', 'Cenik', 'O nas', 'Mnenja'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-lg font-medium text-brand-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <hr className="border-black/5" />
              <div className="flex items-center gap-3 text-brand-primary">
                <Phone className="w-5 h-5 text-brand-accent" />
                <span className="text-lg font-semibold">041 123 456</span>
              </div>
              <button className="w-full bg-brand-accent text-white py-4 rounded-xl font-bold text-lg">
                Pridobi ponudbo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/clean-home/1920/1080" 
          alt="Sparkling clean living room" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-8">
            <ShieldCheck className="w-4 h-4 text-brand-accent" />
            <span className="text-white text-xs font-bold uppercase tracking-widest">Preverjeno & Zanesljivo</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[1.1] mb-8 tracking-tight">
            Profesionalno <br />
            <span className="text-brand-accent italic">čiščenje</span> za vaš dom
          </h1>
          
          <p className="text-xl text-white/80 mb-10 max-w-xl leading-relaxed">
            Pozabite na umazanijo in stres. Naša ekipa poskrbi, da vaš dom ali pisarna zasijeta v polnem sijaju, medtem ko vi uživate v prostem času.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="w-full sm:w-auto bg-brand-accent hover:bg-emerald-600 text-white px-10 py-5 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-2xl shadow-emerald-500/30 flex items-center justify-center gap-2">
              Pridobi ponudbo <ArrowRight className="w-5 h-5" />
            </button>
            <a href="tel:+38641123456" className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-5 rounded-full border border-white/30 text-white font-bold hover:bg-white/10 transition-all">
              <Phone className="w-5 h-5" /> 041 123 456
            </a>
          </div>

          <div className="mt-16 flex items-center gap-8">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <img 
                  key={i}
                  src={`https://picsum.photos/seed/user${i}/100/100`} 
                  className="w-12 h-12 rounded-full border-2 border-brand-primary object-cover"
                  alt="User"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-white/60 text-sm font-medium">Več kot 500+ zadovoljnih strank</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="storitve" className="py-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-brand-accent uppercase tracking-[0.2em] mb-4">Naše Storitve</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary">Vse za bleščečo čistočo</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white p-8 rounded-3xl border border-black/5 hover:border-brand-accent/20 hover:shadow-2xl hover:shadow-brand-accent/5 transition-all duration-500"
            >
              <div className="w-14 h-14 bg-zinc-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-accent group-hover:text-white transition-colors duration-500">
                {service.icon}
              </div>
              <h4 className="text-xl font-bold mb-4">{service.title}</h4>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-zinc-100">
                <span className="text-brand-accent font-bold">{service.price}</span>
                <button className="text-zinc-400 group-hover:text-brand-primary transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  return (
    <section id="cenik" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm font-bold text-brand-accent uppercase tracking-[0.2em] mb-4">Cenik</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary mb-8">Transparentne cene brez skritih stroškov</h3>
            <p className="text-zinc-500 text-lg mb-10 leading-relaxed">
              Verjamemo v pošteno plačilo za vrhunsko opravljeno delo. Naše cene so oblikovane tako, da so dostopne, hkrati pa zagotavljajo najvišjo kakovost storitve.
            </p>
            
            <div className="space-y-6">
              {[
                'Brezplačen ogled in svetovanje',
                'Vsa čistila in oprema vključena',
                'Zavarovanje odgovornosti',
                '100% garancija na zadovoljstvo'
              ].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-accent" />
                  <span className="font-medium text-zinc-700">{item}</span>
                </div>
              ))}
            </div>

            <button className="mt-12 bg-brand-primary text-white px-8 py-4 rounded-full font-bold hover:bg-zinc-800 transition-all">
              Prenesi celoten cenik (PDF)
            </button>
          </div>

          <div className="bg-zinc-900 rounded-[40px] p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 blur-[100px] rounded-full" />
            
            <h4 className="text-2xl font-bold mb-8">Najbolj priljubljeno</h4>
            
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                  <p className="font-bold text-lg">Generalno čiščenje</p>
                  <p className="text-white/50 text-sm">Stanovanje do 60m2</p>
                </div>
                <span className="text-2xl font-serif font-bold text-brand-accent">90€</span>
              </div>
              
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                  <p className="font-bold text-lg">Redno tedensko čiščenje</p>
                  <p className="text-white/50 text-sm">Cena na uro</p>
                </div>
                <span className="text-2xl font-serif font-bold text-brand-accent">15€/h</span>
              </div>

              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                  <p className="font-bold text-lg">Čiščenje oken</p>
                  <p className="text-white/50 text-sm">Po kvadratnem metru</p>
                </div>
                <span className="text-2xl font-serif font-bold text-brand-accent">2.5€/m2</span>
              </div>
            </div>

            <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-sm text-white/70 italic">
                * Cene so informativne narave. Za natančno ponudbo nas kontaktirajte za brezplačen ogled.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  return (
    <section id="mnenja" className="py-24 bg-zinc-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-sm font-bold text-brand-accent uppercase tracking-[0.2em] mb-4">Mnenja strank</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary">Kaj pravijo tisti, ki nam zaupajo</h3>
          </div>
          
          {/* Trustindex Badge Style */}
          <div className="bg-white p-6 rounded-2xl border border-black/5 flex items-center gap-6 shadow-sm">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-brand-primary leading-none">4.9</span>
              <div className="flex gap-0.5 mt-2">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
              </div>
            </div>
            <div className="h-12 w-px bg-zinc-200" />
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Google Reviews</p>
              <p className="text-sm font-bold text-brand-primary">Zelo priporočljivo</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, idx) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 rounded-[32px] border border-black/5 relative"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-zinc-50" />
              <div className="flex gap-1 mb-6 relative z-10">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-zinc-600 text-lg leading-relaxed mb-8 relative z-10 italic">
                "{review.text}"
              </p>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center font-bold text-brand-primary">
                  {review.author[0]}
                </div>
                <div>
                  <p className="font-bold text-brand-primary">{review.author}</p>
                  <p className="text-xs text-zinc-400">{review.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FounderStory = () => {
  return (
    <section id="o-nas" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/founder/800/1000" 
                alt="Founder of Čisto d.o.o." 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating Stats */}
            <div className="absolute -bottom-10 -right-10 bg-brand-accent p-8 rounded-3xl text-white shadow-xl hidden md:block">
              <p className="text-4xl font-serif font-bold mb-1">10+</p>
              <p className="text-sm font-medium opacity-80">Let izkušenj</p>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-brand-accent uppercase tracking-[0.2em] mb-4">Naša Zgodba</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary mb-8">Več kot le čiščenje – skrb za vaš dom</h3>
            <p className="text-zinc-500 text-lg mb-6 leading-relaxed">
              Moje ime je Maja in pred desetimi leti sem ustanovila podjetje Čisto z eno samo vizijo: ponuditi storitev, ki bi jo sama pričakovala v svojem domu.
            </p>
            <p className="text-zinc-500 text-lg mb-10 leading-relaxed">
              Danes smo ekipa 15 predanih strokovnjakov, ki ne le čistijo, ampak ustvarjajo prostor za vaše najlepše trenutke. Verjamemo v osebni pristop, uporabo okolju prijaznih čistil in brezkompromisno kakovost.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div>
                <Clock className="w-8 h-8 text-brand-accent mb-4" />
                <h5 className="font-bold mb-2">Prilagodljivost</h5>
                <p className="text-sm text-zinc-500">Pridemo takrat, ko vam najbolj ustreza.</p>
              </div>
              <div>
                <ShieldCheck className="w-8 h-8 text-brand-accent mb-4" />
                <h5 className="font-bold mb-2">Varnost</h5>
                <p className="text-sm text-zinc-500">Vsi zaposleni so preverjeni in zavarovani.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <img 
                src="https://picsum.photos/seed/sig/150/60" 
                alt="Signature" 
                className="h-12 opacity-50 grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="h-10 w-px bg-zinc-200" />
              <div>
                <p className="font-bold text-brand-primary">Maja Novak</p>
                <p className="text-xs text-zinc-400 uppercase tracking-widest">Ustanoviteljica</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-primary text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-brand-accent p-1.5 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-serif font-bold tracking-tight">
                Čisto<span className="text-brand-accent">.</span>
              </span>
            </div>
            <p className="text-white/50 leading-relaxed mb-8">
              Vaš partner za profesionalno čiščenje v Ljubljani in okolici. Ustvarjamo bivalne prostore, v katerih boste uživali.
            </p>
            <div className="flex gap-4">
              {['FB', 'IG', 'LI'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-xs font-bold hover:bg-white hover:text-brand-primary transition-all">
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-bold mb-8 text-lg">Hitre povezave</h5>
            <ul className="space-y-4 text-white/60">
              {['Storitve', 'Cenik', 'O nas', 'Mnenja', 'Kontakt'].map(link => (
                <li key={link}>
                  <a href="#" className="hover:text-brand-accent transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-8 text-lg">Kontakt</h5>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-brand-accent shrink-0" />
                <div>
                  <p className="text-sm text-white/50 mb-1">Pokličite nas</p>
                  <p className="font-bold">041 123 456</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-brand-accent shrink-0" />
                <div>
                  <p className="text-sm text-white/50 mb-1">Pišite nam</p>
                  <p className="font-bold">info@cisto.si</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-brand-accent shrink-0" />
                <div>
                  <p className="text-sm text-white/50 mb-1">Lokacija</p>
                  <p className="font-bold">Ljubljanska cesta 1, 1000 Ljubljana</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-8 text-lg">Delovni čas</h5>
            <ul className="space-y-4 text-white/60">
              <li className="flex justify-between">
                <span>Pon - Pet:</span>
                <span className="text-white font-medium">08:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sobota:</span>
                <span className="text-white font-medium">09:00 - 14:00</span>
              </li>
              <li className="flex justify-between">
                <span>Nedelja:</span>
                <span className="text-brand-accent font-medium">Zaprto</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} Čisto d.o.o. Vse pravice pridržane.
          </p>
          <div className="flex gap-8 text-white/30 text-sm">
            <a href="#" className="hover:text-white transition-colors">Politika zasebnosti</a>
            <a href="#" className="hover:text-white transition-colors">Piškotki</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Pricing />
        <Reviews />
        <FounderStory />
      </main>
      <Footer />

      {/* Floating CTA for Mobile */}
      <div className="fixed bottom-6 left-6 right-6 z-40 md:hidden">
        <button className="w-full bg-brand-accent text-white py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-emerald-500/40 flex items-center justify-center gap-2">
          <Phone className="w-5 h-5" /> Pokliči za ponudbo
        </button>
      </div>
    </div>
  );
}
