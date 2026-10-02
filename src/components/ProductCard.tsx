import React, { useState } from 'react';
import { Eye, ShoppingBag, Check, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { formatGuaranies } from '../data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col bg-white rounded-md border border-[#e8d9ca] overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_16px_32px_rgba(103,60,15,0.12)] hover:border-[#d6ad60]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container with Swarovski-style Shimmer */}
      <div
        className="luxury-shimmer-container relative aspect-square w-full overflow-hidden bg-white cursor-pointer p-3 flex items-center justify-center"
        onClick={() => onQuickView(product)}
      >
        <img
          src={isHovered && product.secondaryImg ? product.secondaryImg : product.img}
          alt={product.name}
          loading="lazy"
          className="max-h-full max-w-full object-contain transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 max-w-[85%]">
          {product.isBestseller && (
            <span className="inline-flex items-center gap-1 bg-[#673c0f] text-[#e8d9ca] text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded shadow-xs">
              <Sparkles className="w-2.5 h-2.5 text-[#d6ad60] shrink-0 animate-twinkle" />
              Más Vendidos
            </span>
          )}
          {product.isNew && !product.isBestseller && (
            <span className="bg-[#d0883e] text-white text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded shadow-xs">
              Nuevo
            </span>
          )}
        </div>

        {/* Quick View Button overlay (Desktop) */}
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex items-center justify-center p-4">
          <button
            id={`quick-view-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white text-[#673c0f] hover:bg-[#FAF7F4] text-xs font-semibold uppercase tracking-wider rounded-sm shadow-md transition-all transform translate-y-2 group-hover:translate-y-0 border border-[#e8d9ca]"
          >
            <Eye className="w-3.5 h-3.5 text-[#d0883e]" />
            <span>Vista Rápida</span>
          </button>
        </div>
      </div>

      {/* Product Content & Pricing */}
      <div className="flex flex-col flex-1 p-3 sm:p-4 justify-between bg-white border-t border-[#e8d9ca]/40">
        <div>
          <div className="flex items-center justify-between text-[10px] text-[#cda174] mb-1 gap-2">
            <span className="font-semibold uppercase tracking-wider text-[#cda174] truncate">{product.categoryName}</span>
            <span className="font-mono text-[9px] text-[#cda174]/90 uppercase tracking-widest bg-[#FAF7F4] px-1.5 py-0.5 rounded border border-[#e8d9ca]/60 shrink-0 font-medium" title="Código de referencia mayorista">
              Ref. {product.sku}
            </span>
          </div>
          <h3
            onClick={() => onQuickView(product)}
            className="font-serif-luxury text-xs sm:text-sm font-semibold text-[#673c0f] line-clamp-2 min-h-[32px] sm:min-h-[36px] cursor-pointer hover:text-[#d0883e] transition-colors leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1 text-[10px] sm:text-[11px] text-[#673c0f]/75">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d6ad60] shrink-0" />
            <span className="truncate">3-5 láminas • Hipoalergénico</span>
          </div>
        </div>

        <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-[#e8d9ca]/60">
          <div className="flex items-baseline mb-2 sm:mb-3">
            <span className="text-xs sm:text-base font-bold text-[#673c0f] tracking-tight font-sans">
              {formatGuaranies(product.price)}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            id={`add-to-cart-btn-${product.id}`}
            onClick={handleAdd}
            className={`w-full flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-2 sm:px-3 rounded-sm text-[11px] sm:text-xs font-semibold tracking-wide sm:tracking-wider uppercase transition-all duration-200 ${
              isAdded
                ? 'bg-[#25D366] text-white'
                : 'bg-[#673c0f] hover:bg-[#522e08] text-[#e8d9ca] active:scale-98 shadow-sm'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-white shrink-0" />
                <span>¡Agregado!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#d6ad60] shrink-0" />
                <span className="sm:inline hidden">Agregar al Carrito</span>
                <span className="sm:hidden">Agregar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
