import React from 'react';
import { Award, ShieldCheck, MapPin, Sparkles, ArrowRight, Building2, HeartHandshake, Package } from 'lucide-react';

interface HeritageSectionProps {
  onOpenInstitutional: (tab: 'historia' | 'mayorista' | 'cambios' | 'contacto' | 'pagos') => void;
}

export const HeritageSection: React.FC<HeritageSectionProps> = ({
  onOpenInstitutional
}) => {
  return (
    <section id="heritage-section" className="relative py-20 sm:py-28 bg-[#FAF7F2] text-[#3A2B1D] border-t border-b border-[#E8D9CA] overflow-hidden">
      {/* Subtle Background Pattern / Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#d6ad60_0.7px,transparent_0.7px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Monumental Brand Watermark in Background */}
      <div className="absolute right-[-8%] sm:right-[2%] top-1/2 -translate-y-1/2 w-[380px] sm:w-[580px] md:w-[700px] opacity-[0.045] pointer-events-none select-none z-0">
        <img
          src="/images/brand/1. LOGO CUADRADO.png"
          alt=""
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Top Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          {/* Brand Seal / Crest */}
          <div className="flex justify-center mb-5">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-[#d6ad60]/30 rounded-full blur-xs opacity-70 group-hover:opacity-100 transition-opacity" />
              <img
                src="/images/brand/1. LOGO CUADRADO.png"
                alt="Emblema Rommariel Joyas"
                className="relative w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_4px_12px_rgba(103,60,15,0.15)] transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8d9ca]/60 border border-[#cda174]/50 text-[#673c0f] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#d0883e]" />
            <span>Tradición &amp; Calidad • Rommariel Joyas</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-normal text-[#673c0f] tracking-tight leading-[1.18] mb-4">
            Más de 50 años acompañando el estilo de los paraguayos
          </h2>

          <p className="font-serif-luxury italic text-lg sm:text-xl text-[#d0883e] mb-6">
            &ldquo;La joya eres tú, nosotros tu complemento&rdquo;
          </p>

          <p className="text-sm sm:text-base text-[#673c0f]/80 leading-relaxed max-w-2xl mx-auto font-light">
            Desde hace más de 50 años, Rommariel Joyas forma parte del rubro de la joyería fina y enchapada en Paraguay, construyendo una trayectoria basada en el esfuerzo, la dedicación, la calidad y la confianza de nuestros clientes en los 17 departamentos del país.
          </p>
        </div>

        {/* 4 Brand Pillars (100% Sustentados en Documentación Oficial) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          
          {/* Pillar 1: Enchapado Oro 18K */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg border border-[#E8D9CA] shadow-sm hover:shadow-md hover:border-[#d6ad60] transition-all group text-center sm:text-left flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#e8d9ca]/50 flex items-center justify-center text-[#673c0f] group-hover:bg-[#d6ad60] group-hover:text-white transition-colors mb-6 mx-auto sm:mx-0">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-lg font-semibold text-[#673c0f] mb-2 leading-snug">
                Enchapado en Oro 18K (5 a 7 Láminas)
              </h3>
              <p className="text-xs sm:text-sm text-[#673c0f]/75 font-light leading-relaxed">
                Piezas elaboradas con entre 5 y 7 láminas de oro de 18 quilates, buscando ofrecer productos de excelente terminación y durabilidad.
              </p>
            </div>
            <span className="inline-block text-[11px] uppercase tracking-widest text-[#d0883e] font-semibold mt-4">
              Calidad que se siente
            </span>
          </div>

          {/* Pillar 2: Plata Italiana 925 */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg border border-[#E8D9CA] shadow-sm hover:shadow-md hover:border-[#d6ad60] transition-all group text-center sm:text-left flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#e8d9ca]/50 flex items-center justify-center text-[#673c0f] group-hover:bg-[#d6ad60] group-hover:text-white transition-colors mb-6 mx-auto sm:mx-0">
                <Sparkles className="w-6 h-6 text-[#d6ad60]" />
              </div>
              <h3 className="font-serif-luxury text-lg font-semibold text-[#673c0f] mb-2 leading-snug">
                Plata Italiana 925
              </h3>
              <p className="text-xs sm:text-sm text-[#673c0f]/75 font-light leading-relaxed">
                Selección exclusiva de modelos con diferentes acabados y piezas elaboradas en auténtica plata italiana 925.
              </p>
            </div>
            <span className="inline-block text-[11px] uppercase tracking-widest text-[#d0883e] font-semibold mt-4">
              Plata Italiana 925
            </span>
          </div>

          {/* Pillar 3: 100% Hipoalergénico */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg border border-[#E8D9CA] shadow-sm hover:shadow-md hover:border-[#d6ad60] transition-all group text-center sm:text-left flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#e8d9ca]/50 flex items-center justify-center text-[#673c0f] group-hover:bg-[#d6ad60] group-hover:text-white transition-colors mb-6 mx-auto sm:mx-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-lg font-semibold text-[#673c0f] mb-2 leading-snug">
                100% Hipoalergénico (Piel Sensible)
              </h3>
              <p className="text-xs sm:text-sm text-[#673c0f]/75 font-light leading-relaxed">
                Todos nuestros productos son hipoalergénicos, pensados para brindar mayor comodidad y ser adecuados para personas con piel sensible.
              </p>
            </div>
            <span className="inline-block text-[11px] uppercase tracking-widest text-[#d0883e] font-semibold mt-4">
              Piel Sensible
            </span>
          </div>

          {/* Pillar 4: Trayectoria y Red Nacional */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg border border-[#E8D9CA] shadow-sm hover:shadow-md hover:border-[#d6ad60] transition-all group text-center sm:text-left flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#e8d9ca]/50 flex items-center justify-center text-[#673c0f] group-hover:bg-[#d6ad60] group-hover:text-white transition-colors mb-6 mx-auto sm:mx-0">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-lg font-semibold text-[#673c0f] mb-2 leading-snug">
                Presencia en los 17 Dptos.
              </h3>
              <p className="text-xs sm:text-sm text-[#673c0f]/75 font-light leading-relaxed">
                Más de 50 años acompañando el estilo de los paraguayos con una amplia red comercial y envíos a todo el país.
              </p>
            </div>
            <span className="inline-block text-[11px] uppercase tracking-widest text-[#d0883e] font-semibold mt-4">
              Red Nacional
            </span>
          </div>

        </div>

        {/* Storytelling Split Card with Quote & Actions */}
        <div className="bg-[#673c0f] text-white rounded-xl p-8 sm:p-12 lg:p-14 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          <div className="lg:col-span-2 space-y-4">
            <span className="text-[#d6ad60] text-xs font-semibold uppercase tracking-[0.25em] block">
              AJM Import EAS • Luque, Paraguay
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#FAF7F2] leading-snug">
              Una historia de pasión por la joyería fina y enchapada en Paraguay
            </h3>
            <p className="text-xs sm:text-sm text-[#e8d9ca]/90 leading-relaxed font-light max-w-2xl">
              Nuestra sede en Senador Flecha Nº 24 casi Tuyutí (Luque) coordina las ventas online y los despachos a todo el país. 
              No contamos con showroom ni atención al público para exhibición de productos: nuestra venta al cliente final se realiza exclusivamente de manera online.
            </p>
          </div>

          <div className="flex flex-col gap-3 justify-center">
            <button
              onClick={() => onOpenInstitutional('historia')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#d6ad60] hover:bg-[#d0883e] text-[#673c0f] font-bold text-xs uppercase tracking-[0.16em] rounded-sm transition-all shadow-md active:scale-98"
            >
              <span>Leer Historia Completa</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenInstitutional('mayorista')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-[#e8d9ca] border border-[#d6ad60]/50 font-semibold text-xs uppercase tracking-[0.16em] rounded-sm transition-all"
            >
              <span>Requisitos Mayoristas</span>
            </button>

            <button
              onClick={() => onOpenInstitutional('cambios')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent hover:text-white text-[#d6ad60] text-xs uppercase tracking-[0.16em] transition-colors"
            >
              <span>Ver Política de Cambios</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
