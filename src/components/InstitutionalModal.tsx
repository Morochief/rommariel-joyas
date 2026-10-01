import React from 'react';
import { X, Building2, Award, Clock, MapPin, Phone, Mail, ShieldAlert, Sparkles, ShoppingBag, Truck, CheckCircle2, ShieldCheck } from 'lucide-react';
import { StoreConfig } from '../types';

interface InstitutionalModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: StoreConfig;
  initialTab?: 'historia' | 'mayorista' | 'cambios' | 'contacto' | 'pagos';
}

export const InstitutionalModal: React.FC<InstitutionalModalProps> = ({
  isOpen,
  onClose,
  config,
  initialTab = 'historia'
}) => {
  const [activeTab, setActiveTab] = React.useState<'historia' | 'mayorista' | 'cambios' | 'contacto' | 'pagos'>(initialTab);

  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div
        id="institutional-modal"
        className="relative bg-white w-full max-w-3xl rounded-md shadow-2xl border border-[#E0D8CE] overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#673c0f] text-white border-b border-[#522e08] flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6ad60] font-semibold">
                AJM Import EAS
              </span>
              <span className="text-[10px] px-2 py-0.5 bg-white/10 text-[#e8d9ca] rounded">
                Fundación {config.foundationYear}
              </span>
            </div>
            <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-tight text-white">
              Rommariel Joyas
            </h2>
            <p className="text-xs text-[#e8d9ca]/80 italic mt-0.5">
              {config.slogans[0]} • {config.slogans[1]}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#e8d9ca] hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Cerrar ventana institucional"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center overflow-x-auto border-b border-[#e8d9ca] bg-[#FAF7F4] px-4 text-xs font-semibold tracking-wider uppercase">
          <button
            onClick={() => setActiveTab('historia')}
            className={`py-3 px-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'historia'
                ? 'border-[#d6ad60] text-[#673c0f] font-bold'
                : 'border-transparent text-[#cda174] hover:text-[#673c0f]'
            }`}
          >
            Nuestra Historia
          </button>
          <button
            onClick={() => setActiveTab('mayorista')}
            className={`py-3 px-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'mayorista'
                ? 'border-[#d6ad60] text-[#673c0f] font-bold'
                : 'border-transparent text-[#cda174] hover:text-[#673c0f]'
            }`}
          >
            Venta Mayorista
          </button>
          <button
            onClick={() => setActiveTab('cambios')}
            className={`py-3 px-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'cambios'
                ? 'border-[#d6ad60] text-[#673c0f] font-bold'
                : 'border-transparent text-[#cda174] hover:text-[#673c0f]'
            }`}
          >
            Política de Cambios
          </button>
          <button
            onClick={() => setActiveTab('pagos')}
            className={`py-3 px-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'pagos'
                ? 'border-[#d6ad60] text-[#673c0f] font-bold'
                : 'border-transparent text-[#cda174] hover:text-[#673c0f]'
            }`}
          >
            Formas de Pago
          </button>
          <button
            onClick={() => setActiveTab('contacto')}
            className={`py-3 px-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'contacto'
                ? 'border-[#d6ad60] text-[#673c0f] font-bold'
                : 'border-transparent text-[#cda174] hover:text-[#673c0f]'
            }`}
          >
            Contacto & Horarios
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs text-[#673c0f]/85 leading-relaxed">
          {activeTab === 'historia' && (
            <div className="space-y-4">
              <div className="border-l-2 border-[#d6ad60] pl-3 py-1">
                <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-[#673c0f]">
                  Más de 50 años acompañando el estilo de los paraguayos
                </h3>
                <p className="text-[11px] text-[#cda174] uppercase tracking-wider mt-0.5">
                  Marcas oficiales: Rommariel Joyas & JMmariel Joyas
                </p>
              </div>

              <p>
                Desde hace más de cinco décadas, Rommariel Joyas destaca en el rubro de la joyería fina y enchapada en Paraguay. Una trayectoria forjada con dedicación, excelencia artesanal y la confianza de miles de familias en los 17 departamentos del país.
              </p>

              <div className="p-4 bg-[#FAF7F4] border border-[#e8d9ca] rounded space-y-3">
                <h4 className="font-serif-luxury font-bold text-[#673c0f] text-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#d0883e]" />
                  <span>Calidad que se siente</span>
                </h4>
                
                <div className="space-y-1">
                  <p className="font-bold text-[#673c0f]">
                    Enchapado en Oro 18K (5 a 7 Láminas)
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#673c0f]/80">
                    Piezas elaboradas con entre 5 y 7 láminas de oro de 18 quilates, buscando ofrecer productos de excelente terminación y durabilidad.
                  </p>
                </div>

                <div className="space-y-1 pt-1 border-t border-[#e8d9ca]/60">
                  <p className="font-bold text-[#673c0f]">
                    Plata Italiana 925
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#673c0f]/80">
                    Selección exclusiva de modelos con diferentes acabados y piezas elaboradas en auténtica plata italiana 925.
                  </p>
                </div>

                <div className="space-y-1 pt-1 border-t border-[#e8d9ca]/60">
                  <p className="font-bold text-[#673c0f] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>100% Hipoalergénico (Piel Sensible)</span>
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#673c0f]/80">
                    Todos nuestros productos son hipoalergénicos, pensados para brindar mayor comodidad y ser adecuados para personas con piel sensible.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="font-serif-luxury font-bold text-[#673c0f] text-sm">
                  Ahora, Rommariel más cerca tuyo
                </h4>
                <p>
                  Con el paso del tiempo, también evolucionaron las formas de comprar. Por eso, pensamos en nuestros clientes y en la necesidad de acceder a nuestros productos de una manera más fácil, rápida y cómoda.
                </p>
                <p>
                  Creamos este espacio para que puedas conocer nuestros modelos, elegir tus favoritos y realizar tu compra desde donde estés: desde la comodidad de tu hogar, tu trabajo o cualquier otro lugar. Todo lo que buscás, a un clic de distancia.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'mayorista' && (
            <div className="space-y-4">
              <div className="border-l-2 border-[#d6ad60] pl-3 py-1">
                <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-[#673c0f]">
                  Nuestra Experiencia Mayorista
                </h3>
                <p className="text-[11px] text-[#cda174] uppercase tracking-wider mt-0.5">
                  Red comercial presente en los 17 departamentos del Paraguay
                </p>
              </div>

              <p>
                Además de nuestra propuesta para clientes finales, contamos con una amplia experiencia trabajando bajo la modalidad mayorista.
              </p>

              <p>
                Nuestros productos llegan a distintos puntos del Paraguay a través de cadenas de supermercados, farmacias, boutiques, salones de belleza y tiendas ubicadas en estaciones de servicio.
              </p>

              <div className="p-4 bg-[#FAF7F4] border border-[#e8d9ca] rounded space-y-3">
                <h4 className="font-serif-luxury font-bold text-[#673c0f] text-sm">
                  ¿Querés incorporar Rommariel Joyas a tu negocio?
                </h4>
                <p>
                  Si tenés un negocio y estás interesado en incorporar nuestros productos, estaremos encantados de brindarte toda la información sobre nuestra modalidad de trabajo y requisitos para compras mayoristas.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-white border border-[#e8d9ca] rounded">
                    <span className="text-[10px] uppercase tracking-wider text-[#cda174] block font-semibold mb-1">
                      Condiciones & Requisitos Mayoristas:
                    </span>
                    <p className="font-mono font-bold text-sm text-[#673c0f] mb-2">
                      0982 842 020
                    </p>
                    <a
                      href="https://wa.me/595982842020?text=Hola,%20deseo%20conocer%20los%20requisitos%20y%20condiciones%20para%20compras%20mayoristas."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#673c0f] text-[#e8d9ca] text-[11px] font-semibold uppercase tracking-wider rounded hover:bg-[#522e08] transition-colors"
                    >
                      <span>Contactar Mayorista</span>
                    </a>
                  </div>

                  <div className="p-3 bg-white border border-[#e8d9ca] rounded">
                    <span className="text-[10px] uppercase tracking-wider text-[#cda174] block font-semibold mb-1">
                      Productos de la Tienda Online:
                    </span>
                    <p className="font-mono font-bold text-sm text-[#673c0f] mb-2">
                      0994 398 050
                    </p>
                    <a
                      href="https://wa.me/595994398050?text=Hola,%20estoy%20interesado%20en%20incorporar%20productos%20de%20la%20tienda%20online%20a%20mi%20negocio."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#673c0f] text-[#e8d9ca] text-[11px] font-semibold uppercase tracking-wider rounded hover:bg-[#522e08] transition-colors"
                    >
                      <span>Consultar Catálogo</span>
                    </a>
                  </div>
                </div>

                <div className="p-3 bg-[#e8d9ca]/25 border border-[#cda174]/40 rounded text-[11px] text-[#673c0f]">
                  <p className="font-semibold mb-0.5">📦 Referencias Técnicas / SKUs:</p>
                  <p className="text-[#673c0f]/80">
                    Todas las piezas de nuestra tienda cuentan con un código de referencia único visible (ej: <code>Ref. AT02-1.RJ</code>, <code>Ref. AA03-1</code>). Podés ingresar estos códigos en el buscador o citarlos en tu pedido para una cotización mayorista inmediata.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cambios' && (
            <div className="space-y-4">
              <div className="border-l-2 border-[#d6ad60] pl-3 py-1">
                <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-[#673c0f]">
                  Política Oficial de Cambios
                </h3>
                <p className="text-[11px] text-[#cda174] uppercase tracking-wider mt-0.5">
                  Transparencia y respaldo en cada pedido
                </p>
              </div>

              <div className="p-4 bg-[#FAF7F4] border border-[#e8d9ca] rounded space-y-3">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-[#d0883e] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-[#673c0f] text-xs uppercase tracking-wider mb-1">
                      Plazo de Gestión: 5 Días Hábiles
                    </h4>
                    <p className="text-xs text-[#673c0f]/80">
                      Si recibís un producto diferente al solicitado, podrás solicitar el cambio dentro de los <strong>5 días hábiles</strong> posteriores a la compra.
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#e8d9ca] text-xs space-y-2">
                  <p>
                    Para gestionar un cambio, recomendamos comunicarte con nuestro equipo dentro del plazo establecido y conservar el producto en las condiciones en las que fue recibido (empaque original, sin indicios de uso ni daño).
                  </p>
                  <p>
                    Coordinamos el reemplazo o retiro correspondiente a la brevedad vía WhatsApp de ventas: <strong>0994 398 050</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pagos' && (
            <div className="space-y-4">
              <div className="border-l-2 border-[#d6ad60] pl-3 py-1">
                <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-[#673c0f]">
                  Formas de Pago Habilitadas
                </h3>
                <p className="text-[11px] text-[#cda174] uppercase tracking-wider mt-0.5">
                  Operaciones seguras y verificables
                </p>
              </div>

              <div className="p-4 bg-[#FAF7F4] border border-[#e8d9ca] rounded space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#673c0f]">
                  1. Transferencia Bancaria (UENO BANK)
                </h4>
                <div className="p-3 bg-white border border-[#e8d9ca] rounded font-mono text-xs space-y-1 text-[#673c0f]">
                  <p><span className="text-[#cda174]">Razón Social:</span> <strong>{config.bankAccount.companyName}</strong></p>
                  <p><span className="text-[#cda174]">RUC:</span> <strong>{config.bankAccount.ruc}</strong></p>
                  <p><span className="text-[#cda174]">Banco:</span> <strong>{config.bankAccount.bank}</strong></p>
                  <p><span className="text-[#cda174]">Cuenta N°:</span> <strong>{config.bankAccount.accountNumber}</strong></p>
                </div>
                <p className="text-[11px] text-[#cda174]">
                  Una vez realizada la transferencia, enviás el comprobante por WhatsApp al 0994 398 050 para procesar tu despacho de inmediato.
                </p>
              </div>

              <div className="p-4 bg-[#FAF7F4] border border-[#e8d9ca] rounded space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#673c0f]">
                  2. Pagopar
                </h4>
                <p className="text-xs text-[#673c0f]/80">
                  Plataforma de pagos digitales para abonar con tarjetas de crédito/débito, billeteras electrónicas y bocas de cobranza en todo Paraguay.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'contacto' && (
            <div className="space-y-4">
              <div className="border-l-2 border-[#d6ad60] pl-3 py-1">
                <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-[#673c0f]">
                  Datos de Contacto & Ubicación
                </h3>
                <p className="text-[11px] text-[#cda174] uppercase tracking-wider mt-0.5">
                  AJM Import EAS • RUC 80159811-7
                </p>
              </div>

              <div className="p-3.5 bg-[#e8d9ca]/30 border border-[#cda174]/40 rounded text-xs text-[#673c0f]">
                <strong>Importante:</strong> No contamos con showroom ni atención al público para exhibición de productos. Nuestra venta al cliente final se realiza exclusivamente de manera online con envíos a todo el país.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#d0883e] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#673c0f] block">Oficina Central:</span>
                      <span>{config.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#d0883e] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#673c0f] block">Horario de Atención:</span>
                      <span>Lunes a viernes: {config.workingHoursWeekdays}</span>
                      <br />
                      <span>Sábados: {config.workingHoursSaturday}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#673c0f] block">Teléfonos de Contacto:</span>
                      <span>WhatsApp Ventas: <strong>0994 398 050</strong></span>
                      <br />
                      <span>Mayoristas: <strong>0982 842 020</strong></span>
                      <br />
                      <span>Línea adicional: <strong>0992 629 900</strong></span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Mail className="w-4 h-4 text-[#d0883e] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#673c0f] block">Correo Electrónico:</span>
                      <a href={`mailto:${config.contactEmail}`} className="text-[#d0883e] underline">
                        {config.contactEmail}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FAF7F4] border-t border-[#e8d9ca] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-[#cda174] text-center sm:text-left">
            <span>{config.companyName} • RUC: <strong className="text-[#673c0f]">{config.ruc}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${config.whatsappPhone.replace(/\D/g, '')}?text=${encodeURIComponent('Hola, me comunico desde la web de Rommariel Joyas.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#673c0f] hover:bg-[#522e08] text-[#e8d9ca] font-bold uppercase tracking-wider rounded transition-colors text-[11px]"
            >
              Consultar por WhatsApp
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white border border-[#e8d9ca] text-[#673c0f] hover:text-[#d0883e] font-semibold rounded transition-colors text-[11px]"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
