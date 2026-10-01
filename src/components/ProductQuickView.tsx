import React, { useState, useRef } from 'react';
import { X, ShoppingBag, MessageCircle, Sparkles, Check, ZoomIn, ZoomOut, Maximize2, ShieldCheck } from 'lucide-react';
import { Product, StoreConfig } from '../types';
import { formatGuaranies } from '../data/products';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size?: string, metal?: string, note?: string) => void;
  config: StoreConfig;
  onOpenInstitutional?: (tab: 'historia' | 'mayorista' | 'cambios' | 'contacto' | 'pagos') => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  onClose,
  onAddToCart,
  config,
  onOpenInstitutional
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState<string>(product.img);
  const [customNote, setCustomNote] = useState<string>('');
  const [isAdded, setIsAdded] = useState(false);

  // Full-Container Luxury Zoom state
  const [isZooming, setIsZooming] = useState<boolean>(false);
  const [zoomOrigin, setZoomOrigin] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxZoom, setLightboxZoom] = useState<number>(1);
  const [lightboxOrigin, setLightboxOrigin] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const lightboxViewportRef = useRef<HTMLDivElement>(null);

  const resetLightboxZoom = () => {
    setLightboxZoom(1);
    setLightboxOrigin({ x: 50, y: 50 });
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
  };

  const handleLightboxMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (lightboxZoom <= 1) return;
    
    // If user is dragging (mouse button held down), pan by drag offset
    if (isDragging) {
      setDragOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
      return;
    }

    // Interactive cursor-following pan: smoothly tracks mouse across the image
    if (lightboxViewportRef.current) {
      const rect = lightboxViewportRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      setLightboxOrigin({ x, y });
    }
  };

  const handleLightboxMouseDown = (e: React.MouseEvent) => {
    if (lightboxZoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
  };

  const handleLightboxMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomOrigin({ x, y });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current || !e.touches[0]) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.touches[0].clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.touches[0].clientY - rect.top) / rect.height) * 100));
    setZoomOrigin({ x, y });
  };

  const handleAdd = () => {
    onAddToCart(product, undefined, product.material, customNote.trim() || undefined);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  const handleDirectWhatsApp = () => {
    let text = `Hola *${config.storeName}*, me interesa consultar por la joya: *${product.name}* (Ref. ${product.sku}) (${formatGuaranies(product.price)}).\n`;
    if (customNote.trim()) text += `- Indicación especial: ${customNote.trim()}\n`;
    text += `\n¿Tienen disponibilidad y tiempo estimado de despacho?`;

    const cleanPhone = config.whatsappPhone.replace(/\D/g, '') || '595994398050';
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
        <div
          id="quick-view-modal"
          className="relative bg-white w-full max-w-4xl rounded-md shadow-2xl border border-[#d6ad60]/50 overflow-hidden flex flex-col md:flex-row max-h-[92vh]"
        >
          {/* Close button */}
          <button
            id="close-quickview-btn"
            onClick={onClose}
            className="absolute top-3 right-3 z-30 p-2 text-[#673c0f] hover:text-[#d0883e] bg-white/90 hover:bg-white rounded-full transition-colors shadow border border-[#e8d9ca]"
            aria-label="Cerrar vista rápida"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Image Showcase & Interactive Zoom */}
          <div className="w-full md:w-1/2 bg-[#FAF7F4] p-3 sm:p-5 flex flex-col justify-between items-center border-b md:border-b-0 md:border-r border-[#e8d9ca] shrink-0">
            <div className="w-full flex flex-col items-center">
              {/* Inspection Bar */}
              <div className="w-full flex items-center justify-between mb-1.5 sm:mb-2 px-1">
                <span className="text-[10px] uppercase tracking-widest text-[#cda174] font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#d6ad60]" />
                  <span>Inspección de Joyería</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="text-[10px] sm:text-[11px] px-2.5 py-1 rounded flex items-center gap-1.5 bg-white text-[#673c0f] border border-[#e8d9ca] hover:border-[#d6ad60] transition-colors shadow-2xs hover:shadow-xs active:scale-98"
                  title="Abrir en pantalla completa para ver la foto en alta resolución"
                >
                  <Maximize2 className="w-3 h-3 text-[#d0883e]" />
                  <span className="font-medium">Pantalla Completa HD</span>
                </button>
              </div>

              {/* Interactive Image Container with Full Luxury Zoom */}
              <div
                ref={imageContainerRef}
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                onClick={() => setIsLightboxOpen(true)}
                className="w-full max-w-[260px] sm:max-w-[340px] md:max-w-none aspect-square relative rounded overflow-hidden bg-white border border-[#e8d9ca] flex items-center justify-center cursor-zoom-in shadow-sm select-none mx-auto group"
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  style={{
                    transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                    transform: isZooming ? 'scale(2.6)' : 'scale(1)',
                    transition: isZooming ? 'transform 0.08s ease-out' : 'transform 0.25s ease-out'
                  }}
                  className="w-full h-full object-cover pointer-events-none"
                />



                {/* Bestseller Badge */}
                {product.isBestseller && (
                  <span className="absolute top-2.5 left-2.5 bg-[#673c0f] text-[#e8d9ca] text-[9px] sm:text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded shadow z-10 flex items-center gap-1 pointer-events-none">
                    <Sparkles className="w-3 h-3 text-[#d6ad60]" />
                    Alta Joyería Rommariel
                  </span>
                )}
              </div>
            </div>

          {/* Thumbnail strip */}
          <div className="flex items-center gap-2 mt-2.5 sm:mt-3 w-full justify-center">
            <button
              onClick={() => setActiveImage(product.img)}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded border-2 overflow-hidden transition-all ${
                activeImage === product.img
                  ? 'border-[#d6ad60] scale-105 shadow-sm'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={product.img} alt="Vista frontal" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </button>
            {product.secondaryImg && (
              <button
                onClick={() => setActiveImage(product.secondaryImg!)}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded border-2 overflow-hidden transition-all ${
                  activeImage === product.secondaryImg
                    ? 'border-[#d6ad60] scale-105 shadow-sm'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={product.secondaryImg} alt="Vista detalle" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Product specs & Purchase Actions */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 lg:p-7 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-[0.2em] text-[#cda174]">
                {product.categoryName}
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-[#673c0f] bg-[#e8d9ca]/50 border border-[#e8d9ca] px-2 py-0.5 rounded">
                {product.material}
              </span>
            </div>

            <h2 className="font-serif-luxury text-lg sm:text-xl lg:text-2xl font-bold text-[#673c0f] leading-tight mb-1.5">
              {product.name}
            </h2>

            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs text-[#673c0f] font-semibold bg-[#FAF7F4] border border-[#e8d9ca] px-2 py-0.5 rounded">
                Ref. {product.sku}
              </span>
              <span className="text-[11px] text-[#cda174]">• Código Mayorista / Referencia Técnica</span>
            </div>

            <div className="flex items-baseline mb-3">
              <span className="text-xl sm:text-2xl font-bold text-[#673c0f] tracking-tight">
                {formatGuaranies(product.price)}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#673c0f]/80 leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Technical Specs List with Brand Watermark */}
            <div className="relative overflow-hidden bg-[#e8d9ca]/25 p-3.5 rounded border border-[#e8d9ca] mb-4 text-[11px] sm:text-xs space-y-1.5 text-[#673c0f]">
              {/* Subtle Brand Watermark inside Specs */}
              <div className="absolute right-[-10px] bottom-[-10px] w-28 h-28 opacity-[0.06] pointer-events-none select-none z-0">
                <img src="/images/brand/1. LOGO CUADRADO.png" alt="" className="w-full h-full object-contain" />
              </div>

              {product.sku && (
                <div className="flex justify-between items-center gap-2 relative z-10">
                  <span className="text-[#cda174] shrink-0">Código / Modelo:</span>
                  <span className="font-mono font-semibold text-[#673c0f] text-right truncate">{product.sku}</span>
                </div>
              )}
              {product.brand && (
                <div className="flex justify-between items-center gap-2 relative z-10">
                  <span className="text-[#cda174] shrink-0">Marca Oficial:</span>
                  <span className="font-semibold text-[#673c0f] text-right truncate flex items-center gap-1.5">
                    <img src="/images/brand/1. LOGO CUADRADO.png" alt="" className="w-3.5 h-3.5 object-contain inline-block" />
                    {product.brand}
                  </span>
                </div>
              )}
              {product.layers && (
                <div className="flex justify-between items-center gap-2 relative z-10">
                  <span className="text-[#cda174] shrink-0">Enchapado:</span>
                  <span className="font-semibold text-[#673c0f] text-right truncate">{product.layers}</span>
                </div>
              )}
              <div className="flex justify-between items-center gap-2">
                <span className="text-[#cda174] shrink-0">Propiedad:</span>
                <span className="font-semibold text-[#d0883e] text-right">100% Hipoalergénico (Pieles Sensibles)</span>
              </div>
              {product.specs.dimensions && (
                <div className="flex justify-between items-center gap-2">
                  <span className="text-[#cda174] shrink-0">Dimensiones:</span>
                  <span className="font-semibold text-[#673c0f] text-right">{product.specs.dimensions}</span>
                </div>
              )}
              {product.specs.closure && (
                <div className="flex justify-between items-center gap-2">
                  <span className="text-[#cda174] shrink-0">Sistema de Cierre:</span>
                  <span className="font-semibold text-[#673c0f] text-right">{product.specs.closure}</span>
                </div>
              )}
              {product.usage && (
                <div className="flex justify-between items-center gap-2">
                  <span className="text-[#cda174] shrink-0">Recomendación:</span>
                  <span className="font-semibold text-[#673c0f] text-right">{product.usage}</span>
                </div>
              )}
              {product.specs.gemstone && (
                <div className="flex justify-between items-center gap-2">
                  <span className="text-[#cda174] shrink-0">Gemas / Detalles:</span>
                  <span className="font-semibold text-[#673c0f] text-right">{product.specs.gemstone}</span>
                </div>
              )}
              {product.stock && (
                <div className="flex justify-between items-center gap-2">
                  <span className="text-[#cda174] shrink-0">Disponibilidad:</span>
                  <span className="font-semibold text-[#673c0f] text-right">{product.stock} unidades en stock</span>
                </div>
              )}
              {product.specs.warranty && (
                <div className="flex justify-between items-center gap-2">
                  <span className="text-[#cda174] shrink-0">Política de Cambios:</span>
                  <span className="font-semibold text-[#673c0f] text-right">{product.specs.warranty}</span>
                </div>
              )}
            </div>

            {/* Material & Propiedad Verificada */}
            <div className="mb-4 p-3 bg-[#FAF7F4] border border-[#e8d9ca] rounded flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#cda174] font-semibold block">
                  Material &amp; Calidad
                </span>
                <span className="text-xs font-bold text-[#673c0f]">
                  Enchapado en Oro 18K (5 a 7 láminas)
                </span>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#25D366] bg-green-50 border border-green-200 px-2 py-0.5 rounded">
                100% Hipoalergénico
              </span>
            </div>

            {/* Política Oficial de Cambios */}
            <div className="mb-4 p-3 bg-white border border-[#e8d9ca] rounded text-xs text-[#673c0f]/85 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#d0883e] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#673c0f] block text-[11px] uppercase tracking-wider">
                  Política Oficial de Cambios (5 Días Hábiles)
                </span>
                <p className="text-[11px] text-[#673c0f]/75 mt-0.5">
                  Si recibís un producto diferente al solicitado, podrás solicitar el cambio dentro de los 5 días hábiles posteriores a la compra en sus condiciones originales.
                </p>
              </div>
            </div>

            {/* Optional note or personalization */}
            <div className="mb-4">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#cda174] block mb-1">
                Nota o indicación para el pedido (Opcional):
              </label>
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Ej: Aclaración sobre el modelo, horario de entrega preferido..."
                className="w-full text-xs px-3 py-2 rounded border border-[#e8d9ca] focus:border-[#d6ad60] focus:outline-none bg-white text-[#673c0f]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-[#e8d9ca] flex flex-col gap-2">
            <button
              id="modal-add-to-cart-btn"
              onClick={handleAdd}
              className={`w-full py-3 px-4 rounded-sm text-xs font-bold tracking-[0.18em] uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-md ${
                isAdded
                  ? 'bg-[#25D366] text-white'
                  : 'bg-[#673c0f] hover:bg-[#522e08] text-[#e8d9ca] active:scale-98'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>¡Agregado a tu Bolsa!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#d6ad60]" />
                  <span>Agregar a la Bolsa ({formatGuaranies(product.price)})</span>
                </>
              )}
            </button>

            <button
              id="modal-direct-whatsapp-btn"
              onClick={handleDirectWhatsApp}
              className="w-full py-2.5 px-4 rounded-sm text-xs font-semibold tracking-wider uppercase bg-[#e8d9ca]/50 hover:bg-[#e8d9ca] text-[#673c0f] transition-colors flex items-center justify-center gap-2 border border-[#cda174]"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Consultar Esta Joya por WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Fullscreen High-Resolution Lightbox Modal */}
    {isLightboxOpen && (
      <div
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 animate-fadeIn select-none"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsLightboxOpen(false);
            setLightboxZoom(1);
          }
        }}
      >
        {/* Top bar controls */}
        <div className="w-full max-w-5xl mx-auto flex items-center justify-between pb-3 border-b border-white/15 text-white">
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#d6ad60] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#d6ad60]" />
              Fotografía Oficial HD • Rommariel
            </span>
            <h3 className="font-serif-luxury text-sm sm:text-lg font-bold text-white tracking-wide truncate max-w-[260px] sm:max-w-md">
              {product.name} <span className="font-mono text-xs text-[#cda174] font-normal">(Ref. {product.sku})</span>
            </h3>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Zoom controls */}
            <div className="flex items-center bg-white/10 rounded border border-white/20 px-1 py-0.5">
              <button
                type="button"
                onClick={() => {
                  setLightboxZoom((prev) => {
                    const next = Math.max(1, prev - 0.5);
                    if (next === 1) {
                      setLightboxOrigin({ x: 50, y: 50 });
                      setDragOffset({ x: 0, y: 0 });
                    }
                    return next;
                  });
                }}
                disabled={lightboxZoom <= 1}
                className="p-1.5 hover:bg-white/15 disabled:opacity-30 rounded transition-colors text-white"
                title="Alejar"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="font-mono text-xs font-semibold px-2 min-w-[42px] text-center text-[#d6ad60]">
                {lightboxZoom.toFixed(1)}x
              </span>
              <button
                type="button"
                onClick={() => setLightboxZoom((prev) => Math.min(4, prev + 0.5))}
                disabled={lightboxZoom >= 4}
                className="p-1.5 hover:bg-white/15 disabled:opacity-30 rounded transition-colors text-white"
                title="Acercar"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              {lightboxZoom > 1 && (
                <button
                  type="button"
                  onClick={resetLightboxZoom}
                  className="text-[10px] uppercase font-bold text-[#d6ad60] hover:text-white px-1.5 py-0.5 ml-1 rounded hover:bg-white/10 transition-colors"
                  title="Restablecer tamaño original"
                >
                  1.0x
                </button>
              )}
            </div>

            {/* Close Lightbox */}
            <button
              type="button"
              onClick={() => {
                setIsLightboxOpen(false);
                resetLightboxZoom();
              }}
              className="p-2 bg-white/10 hover:bg-white/25 rounded-full border border-white/20 transition-colors text-white"
              aria-label="Cerrar pantalla completa"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Interactive Pan/Drag Viewport */}
        <div 
          ref={lightboxViewportRef}
          onMouseDown={handleLightboxMouseDown}
          onMouseMove={handleLightboxMouseMove}
          onMouseUp={handleLightboxMouseUp}
          onMouseLeave={handleLightboxMouseUp}
          className={`flex-1 w-full max-w-6xl mx-auto flex items-center justify-center overflow-hidden my-2 p-2 relative select-none ${
            lightboxZoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
          }`}
        >
          <div
            onClick={() => {
              if (lightboxZoom === 1) {
                setLightboxZoom(2.5);
              } else if (!isDragging) {
                resetLightboxZoom();
              }
            }}
            style={{
              transformOrigin: `${lightboxOrigin.x}% ${lightboxOrigin.y}%`,
              transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) scale(${lightboxZoom})`,
              transition: isDragging ? 'none' : 'transform 0.12s ease-out'
            }}
            className="flex items-center justify-center will-change-transform"
          >
            <img
              src={activeImage}
              alt={product.name}
              draggable={false}
              referrerPolicy="no-referrer"
              className="max-h-[72vh] max-w-[85vw] object-contain rounded shadow-2xl pointer-events-none drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>

        {/* Bottom thumbnail & hint bar */}
        <div className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between pt-3 border-t border-white/15 text-white/70 text-xs gap-2">
          <span className="text-[11px] text-white/75 text-center sm:text-left flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#d6ad60] shrink-0" />
            <span>
              {lightboxZoom > 1 
                ? 'Arrastrá con el ratón para recorrer los detalles • Clic para alejar' 
                : 'Hacé clic sobre la joya o usá los botones para zoom hasta 4.0x'}
            </span>
          </span>

          {/* Thumbnails in lightbox */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveImage(product.img)}
              className={`w-10 h-10 rounded border-2 overflow-hidden transition-all ${
                activeImage === product.img
                  ? 'border-[#d6ad60] scale-105'
                  : 'border-white/20 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={product.img} alt="Vista frontal" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </button>
            {product.secondaryImg && (
              <button
                type="button"
                onClick={() => setActiveImage(product.secondaryImg!)}
                className={`w-10 h-10 rounded border-2 overflow-hidden transition-all ${
                  activeImage === product.secondaryImg
                    ? 'border-[#d6ad60] scale-105'
                    : 'border-white/20 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={product.secondaryImg} alt="Vista detalle" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </button>
            )}
          </div>
        </div>
      </div>
    )}
  </>
  );
};
