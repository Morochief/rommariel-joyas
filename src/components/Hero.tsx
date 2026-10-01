import React from 'react';
import { ShieldCheck, Truck, Gift, Sparkles, ArrowRight, Award } from 'lucide-react';

interface HeroProps {
  onExploreCatalog: () => void;
  onOpenRingGuide: () => void;
  onOpenInstitutional?: (tab: 'historia' | 'mayorista' | 'cambios' | 'contacto' | 'pagos') => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCatalog,
  onOpenRingGuide,
  onOpenInstitutional
}) => {
  return (
    <section id="hero-section" className="relative overflow-hidden bg-[#241508] text-white">
      {/* Background Video & Luxury Chocolate Brown Ambient Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#170c04]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-opacity duration-1000 opacity-85"
        >
          <source src="/videos/video.mp4" type="video/mp4" />
        </video>

        {/* Difuminado de color marrón: 
            - Lado izquierdo: Marrón chocolate intenso (#170c04 / 92%) para máxima legibilidad del texto y botones.
            - Lado central: Transición gradual (#241306 / 70%).
            - Lado derecho: Difuminado suave (#170c04 / 20%) para que el movimiento y brillo de las joyas se aprecien con impacto cinematográfico. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#170c04] via-[#241306]/75 to-[#170c04]/25 z-10" />

        {/* Viñeta vertical para fusión elegante con el navbar y la barra de pilares */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#170c04]/60 via-transparent to-[#170c04]/90 z-10 pointer-events-none" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="max-w-2xl">
          {/* Eyebrow badge */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#d6ad60]/50 text-[#e8d9ca] text-xs font-semibold tracking-[0.2em] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#d6ad60] animate-twinkle" />
              <span>Más de 50 años en Paraguay</span>
            </div>
            <button
              onClick={() => onOpenInstitutional?.('historia')}
              className="px-3 py-1.5 text-xs text-[#e8d9ca] hover:text-[#d6ad60] border border-[#cda174]/40 hover:border-[#d6ad60] rounded-full transition-colors font-medium"
            >
              Conocé nuestra historia
            </button>
          </div>

          {/* Luxury Main Heading */}
          <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-[1.18] mb-3 sm:mb-4">
            Brilla con nosotros. <br />
            <span className="italic text-[#d6ad60] font-normal">La Joya eres tú, Rommariel tu complemento.</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-[#e8d9ca]/90 leading-relaxed mb-6 sm:mb-8 max-w-xl font-light">
            Líneas exclusivas en enchapado en oro de 18K (5 a 7 láminas) y piezas en plata italiana 925. Todos nuestros productos son hipoalergénicos y aptos para piel sensible. Venta exclusiva online con envíos a todo el país.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            <button
              id="hero-explore-btn"
              onClick={onExploreCatalog}
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-[#d6ad60] hover:bg-[#d0883e] text-[#673c0f] font-bold text-xs uppercase tracking-wider sm:tracking-[0.18em] rounded-sm transition-all duration-200 shadow-md active:scale-98"
            >
              <span>Ver Catálogo 2026</span>
              <ArrowRight className="w-4 h-4 text-[#673c0f]" />
            </button>

            <button
              id="hero-wholesale-btn"
              onClick={() => onOpenInstitutional?.('mayorista')}
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 bg-[#673c0f]/80 hover:bg-[#673c0f] text-[#e8d9ca] border border-[#d6ad60]/60 font-semibold text-xs uppercase tracking-wider sm:tracking-[0.16em] rounded-sm backdrop-blur-sm transition-all"
            >
              <span>Venta Mayorista</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real Trust Pillars Bar (100% Verifiable from documents) */}
      <div className="relative z-20 border-t border-[#e8d9ca]/20 bg-[#170c04]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div
              onClick={() => onOpenInstitutional?.('historia')}
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group hover:bg-white/5 p-1.5 sm:p-2 rounded transition-colors"
            >
              <div className="p-2 rounded-full bg-[#d6ad60]/15 text-[#d6ad60] shrink-0 group-hover:bg-[#d6ad60]/30">
                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] sm:text-xs font-semibold tracking-wide uppercase text-white group-hover:text-[#d6ad60] transition-colors truncate">
                  Enchapado Oro 18k
                </p>
                <p className="text-[10px] sm:text-[11px] text-[#cda174] truncate">5-7 láminas • Hipoalergénico</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 p-1.5 sm:p-2">
              <div className="p-2 rounded-full bg-[#d6ad60]/15 text-[#d6ad60] shrink-0">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] sm:text-xs font-semibold tracking-wide uppercase text-white truncate">
                  Envíos a Todo el País
                </p>
                <p className="text-[10px] sm:text-[11px] text-[#cda174] truncate">Asunción e Interior (17 dptos)</p>
              </div>
            </div>

            <div
              onClick={() => onOpenInstitutional?.('cambios')}
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group hover:bg-white/5 p-1.5 sm:p-2 rounded transition-colors"
            >
              <div className="p-2 rounded-full bg-[#d6ad60]/15 text-[#d6ad60] shrink-0 group-hover:bg-[#d6ad60]/30">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] sm:text-xs font-semibold tracking-wide uppercase text-white group-hover:text-[#d6ad60] transition-colors truncate">
                  Cambios en 5 Días
                </p>
                <p className="text-[10px] sm:text-[11px] text-[#cda174] truncate">Plazo oficial de gestión</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 p-1.5 sm:p-2">
              <div className="p-2 rounded-full bg-[#d6ad60]/15 text-[#d6ad60] shrink-0">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] sm:text-xs font-semibold tracking-wide uppercase text-white truncate">
                  Atención Directa
                </p>
                <p className="text-[10px] sm:text-[11px] text-[#cda174] truncate">Ventas WhatsApp 0994 398 050</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
