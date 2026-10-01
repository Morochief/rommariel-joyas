import React from 'react';
import { ShoppingBag, CheckCircle2, X } from 'lucide-react';
import { Product } from '../types';
import { formatGuaranies } from '../data/products';

interface ToastProps {
  product: Product | null;
  onClose: () => void;
  onOpenCart: () => void;
}

export const Toast: React.FC<ToastProps> = ({ product, onClose, onOpenCart }) => {
  if (!product) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-slideInRight max-w-sm w-full">
      <div className="bg-[#673c0f] text-white p-3.5 rounded shadow-2xl border border-[#d6ad60]/50 flex items-center gap-3">
        <img
          src={product.img}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-12 h-12 rounded object-cover border border-[#d6ad60]/30 shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] text-[#25D366] font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Agregado a tu bolsa</span>
          </div>
          <p className="font-serif-luxury text-xs font-bold text-white truncate">
            {product.name}
          </p>
          <p className="text-xs text-[#d6ad60] font-semibold font-sans">
            {formatGuaranies(product.price)}
          </p>
        </div>
        <div className="flex flex-col gap-1.5 shrink-0">
          <button
            onClick={() => {
              onClose();
              onOpenCart();
            }}
            className="px-2.5 py-1 bg-[#d6ad60] hover:bg-[#cda174] text-[#673c0f] font-bold text-[10px] uppercase tracking-wider rounded transition-colors"
          >
            Ver Bolsa
          </button>
          <button
            onClick={onClose}
            className="text-[#e8d9ca]/70 hover:text-white text-center text-xs"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};
