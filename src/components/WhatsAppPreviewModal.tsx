import React, { useState } from 'react';
import { X, MessageCircle, Copy, Check, ExternalLink } from 'lucide-react';
import { CartItem, CustomerOrderDetails, StoreConfig } from '../types';
import { buildWhatsAppMessage, openWhatsAppCheckout } from '../utils/whatsapp';

interface WhatsAppPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  orderDetails: CustomerOrderDetails;
  config: StoreConfig;
}

export const WhatsAppPreviewModal: React.FC<WhatsAppPreviewModalProps> = ({
  isOpen,
  onClose,
  cart,
  orderDetails,
  config
}) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  let shippingCost = 0;
  if (subtotal >= config.freeShippingThreshold) {
    shippingCost = 0;
  } else if (orderDetails.deliveryType === 'delivery_asuncion') {
    shippingCost = config.shippingCostAsuncion;
  } else if (orderDetails.deliveryType === 'envio_interior') {
    shippingCost = config.shippingCostInterior;
  }

  const grandTotal = subtotal + shippingCost;
  const rawMessage = buildWhatsAppMessage(cart, orderDetails, config, grandTotal, shippingCost);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
    openWhatsAppCheckout(config.whatsappPhone, rawMessage);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div
        id="whatsapp-preview-modal"
        className="relative bg-white w-full max-w-lg rounded-md shadow-2xl border border-[#e8d9ca] p-5 sm:p-6 overflow-hidden flex flex-col max-h-[90vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#cda174] hover:text-[#673c0f] rounded-full hover:bg-[#FAF7F4] transition-colors"
          aria-label="Cerrar vista previa"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-3 relative z-10">
          <div className="w-10 h-10 rounded-full bg-[#FAF7F4] p-1.5 border border-[#d6ad60]/50 flex items-center justify-center shrink-0">
            <img src="/images/brand/1. LOGO CUADRADO.png" alt="Rommariel" className="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className="font-serif-luxury text-lg font-bold text-[#673c0f]">
              Pedido Oficial Rommariel Joyas
            </h2>
            <p className="text-xs text-[#cda174]">
              Destino: +{config.whatsappPhone} ({config.storeName})
            </p>
          </div>
        </div>

        {/* WhatsApp Chat simulation bubble with Brand Watermark */}
        <div className="flex-1 overflow-y-auto bg-[#E5DDD5] p-3.5 rounded-lg border border-[#D5CBC2] my-2 relative overflow-hidden">
          {/* Subtle Watermark */}
          <div className="absolute right-2 bottom-2 w-48 opacity-[0.05] pointer-events-none select-none z-0">
            <img src="/images/brand/1. LOGO CUADRADO.png" alt="" className="w-full h-auto object-contain" />
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm text-xs font-mono text-[#673c0f] whitespace-pre-wrap leading-relaxed max-w-full relative z-10">
            {rawMessage}
          </div>
        </div>

        {/* Action controls */}
        <div className="mt-3 pt-3 border-t border-[#e8d9ca] flex flex-col sm:flex-row gap-2.5 justify-end">
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-white border border-[#e8d9ca] text-[#673c0f] hover:text-[#d0883e] hover:bg-[#FAF7F4] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#25D366]" />
                <span>¡Copiado al Portapapeles!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Texto</span>
              </>
            )}
          </button>

          <button
            onClick={handleSend}
            className="px-5 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Abrir WhatsApp Ahora</span>
          </button>
        </div>
      </div>
    </div>
  );
};
