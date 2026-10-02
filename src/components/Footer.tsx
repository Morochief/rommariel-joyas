import React from 'react';
import { MessageCircle, MapPin, Phone, Instagram, Facebook, ShieldCheck, Award, Clock, Building2, CreditCard, RefreshCw } from 'lucide-react';
import { StoreConfig } from '../types';

interface FooterProps {
  config: StoreConfig;
  onOpenRingGuide: () => void;
  onOpenSettings: () => void;
  onOpenInstitutional?: (tab: 'historia' | 'mayorista' | 'cambios' | 'contacto' | 'pagos') => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onOpenRingGuide,
  onOpenSettings,
  onOpenInstitutional
}) => {
  return (
    <footer id="main-footer" className="relative bg-[#4a2b0a] text-[#e8d9ca] pt-16 pb-10 border-t border-[#381f06] overflow-hidden">
      {/* Monumental Watermark in Footer */}
      <div className="absolute right-[-5%] bottom-[-10%] w-[380px] sm:w-[520px] md:w-[620px] opacity-[0.035] pointer-events-none select-none z-0">
        <img
          src="/images/brand/1. LOGO CUADRADO.png"
          alt=""
          className="w-full h-auto object-contain brightness-200"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand & Slogan Banner */}
        <div className="pb-12 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <img 
                src="/images/brand/1. LOGO CUADRADO.png" 
                alt="Emblema Rommariel" 
                className="h-12 sm:h-14 w-auto object-contain shrink-0 drop-shadow brightness-110"
              />
              <img 
                src="/images/brand/LOGO BLANCO.png" 
                alt="Rommariel Joyas Logo Blanco" 
                className="h-11 sm:h-12 w-auto min-w-[140px] sm:min-w-[170px] object-contain shrink-0 drop-shadow"
              />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-serif-luxury italic text-[#d6ad60]">
                &ldquo;Brilla con nosotros • La Joya eres tú, Rommariel tu complemento&rdquo;
              </p>
              <p className="text-[11px] text-[#e8d9ca]/70 font-light mt-0.5">
                AJM Import EAS • RUC 80159811-7 • Luque, Paraguay
              </p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${config.whatsappPhone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all shadow-sm"
              title="WhatsApp Ventas Online (0994 398 050)"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href={config.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/10 text-[#d6ad60] hover:bg-[#d6ad60] hover:text-[#4a2b0a] transition-all shadow-sm"
              title="Instagram @rommarieljoyas"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={config.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/10 text-[#d6ad60] hover:bg-[#d6ad60] hover:text-[#4a2b0a] transition-all shadow-sm"
              title="Facebook Oficial"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href={config.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-white/10 text-[#d6ad60] hover:bg-[#d6ad60] hover:text-[#4a2b0a] transition-all text-xs font-bold shadow-sm"
              title="TikTok Oficial"
            >
              TikTok
            </a>
          </div>
        </div>

        {/* 4 Balanced Grid Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 py-12 border-b border-white/10">
          
          {/* Col 1: Información & Institucional */}
          <div>
            <h4 className="font-serif-luxury text-sm font-semibold tracking-wider uppercase text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d6ad60]" />
              Institucional
            </h4>
            <ul className="space-y-2.5 text-xs text-[#e8d9ca]/85">
              <li>
                <button
                  onClick={() => onOpenInstitutional?.('historia')}
                  className="hover:text-[#d6ad60] transition-colors text-left font-medium"
                >
                  Nuestra Historia (+50 Años de Trayectoria)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenInstitutional?.('mayorista')}
                  className="hover:text-[#d6ad60] text-[#d6ad60] font-semibold transition-colors text-left flex items-center gap-1.5"
                >
                  <span>Ventas Mayoristas (17 Departamentos)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenInstitutional?.('cambios')}
                  className="hover:text-[#d6ad60] transition-colors text-left"
                >
                  Política de Cambios (5 días hábiles)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenInstitutional?.('pagos')}
                  className="hover:text-[#d6ad60] transition-colors text-left"
                >
                  Formas de Pago &amp; Transferencias
                </button>
              </li>
              <li>
                <button onClick={onOpenRingGuide} className="hover:text-[#d6ad60] transition-colors text-left">
                  Guía de Medidas de Anillos
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Líneas de Contacto Oficiales */}
          <div>
            <h4 className="font-serif-luxury text-sm font-semibold tracking-wider uppercase text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d6ad60]" />
              Líneas de Atención
            </h4>
            <ul className="space-y-3 text-xs text-[#e8d9ca]/85">
              <li className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Ventas Tienda Online:</span>
                  <a href="https://wa.me/595994398050" target="_blank" rel="noopener noreferrer" className="text-[#d6ad60] hover:underline font-mono">
                    (0994) 398-050
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#d6ad60] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Atención Mayorista:</span>
                  <a href="https://wa.me/595982842020" target="_blank" rel="noopener noreferrer" className="hover:underline font-mono">
                    (0982) 842-020
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#d6ad60] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Consultas Generales:</span>
                  <span className="font-mono">(0992) 629-900</span>
                </div>
              </li>
              <li className="text-[11px] text-[#e8d9ca]/70 pt-1">
                <span>Email: </span>
                <a href={`mailto:${config.contactEmail}`} className="text-white hover:underline">
                  {config.contactEmail}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Sede Central & Horarios */}
          <div>
            <h4 className="font-serif-luxury text-sm font-semibold tracking-wider uppercase text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d6ad60]" />
              Sede Central
            </h4>
            <div className="space-y-3 text-xs text-[#e8d9ca]/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d6ad60] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Dirección:</span>
                  <span>SENADOR FLECHA Nº 24 CASI TUYUTI</span>
                  <span className="block text-[#e8d9ca]/70">Luque, Paraguay</span>
                  <span className="inline-block mt-1 text-[10px] bg-white/10 text-[#d6ad60] px-2 py-0.5 rounded border border-white/10 font-medium">
                    Venta exclusiva online (sin showroom)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#d6ad60] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Horario de Despacho:</span>
                  <span>Lun a Vie: 07:00 a 13:00 y 14:00 a 17:00</span>
                  <br />
                  <span>Sáb: 08:00 a 13:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Garantía & Pagos Ueno */}
          <div>
            <h4 className="font-serif-luxury text-sm font-semibold tracking-wider uppercase text-white mb-4 flex items-center gap-2">
              <img src="/images/brand/1. LOGO CUADRADO.png" alt="" className="w-4 h-4 object-contain brightness-125" />
              Garantía &amp; Pagos
            </h4>
            <div className="space-y-3 text-xs text-[#e8d9ca]/85">
              <p className="flex items-center gap-2 text-white">
                <Award className="w-4 h-4 text-[#d6ad60] shrink-0" />
                <span>3 y 5 Láminas de Oro 18K</span>
              </p>
              <p className="flex items-center gap-2 text-white">
                <ShieldCheck className="w-4 h-4 text-[#d6ad60] shrink-0" />
                <span>100% Hipoalergénico (Piel sensible)</span>
              </p>
              
              <div className="p-3 bg-black/20 rounded border border-white/10 text-[11px] space-y-1">
                <span className="text-[#d6ad60] font-semibold block uppercase tracking-wider">
                  Transferencias Bancarias:
                </span>
                <p className="font-medium text-white">{config.bankAccount.bank}</p>
                <p>Cta: <span className="font-mono text-[#d6ad60] font-bold">{config.bankAccount.accountNumber}</span></p>
                <p className="text-[10px] text-[#e8d9ca]/80">Titular: {config.bankAccount.companyName}</p>
                <p className="text-[10px] text-[#e8d9ca]/80">RUC: {config.bankAccount.ruc}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#e8d9ca]/70 gap-3">
          <p>© 2026 {config.storeName} • {config.companyName}. Todos los derechos reservados.</p>
          <div className="text-[11px] flex items-center gap-2">
            <span className="text-[#d6ad60]">Envíos a Dpto. Central & Despachos al Interior</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
