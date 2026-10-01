import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Sparkles, MessageCircle, Menu, X, Phone } from 'lucide-react';
import { CategoryType, StoreConfig } from '../types';
import { CATEGORIES } from '../data/products';

interface NavbarProps {
  totalCartItems: number;
  onOpenCart: () => void;
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  config: StoreConfig;
  onOpenSettings?: () => void;
  onOpenRingGuide: () => void;
  onOpenInstitutional?: (tab: 'historia' | 'mayorista' | 'cambios' | 'contacto' | 'pagos') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalCartItems,
  onOpenCart,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  config,
  onOpenSettings,
  onOpenRingGuide,
  onOpenInstitutional
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E5E0D8]'
          : 'bg-[#FAFAFA] border-b border-[#ECE7E1]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Bar: Left Nav | Centered Logo | Right Actions */}
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-20 sm:h-22' : 'h-24 sm:h-28 md:h-32'
        }`}>
          
          {/* Left: Mobile Menu & Clean Desktop Catalog Link */}
          <div className="flex items-center gap-3 sm:gap-4 flex-1 justify-start">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-[#673c0f] hover:text-[#d0883e] transition-colors focus:outline-none md:hidden"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hidden md:inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#673c0f] hover:text-[#d0883e] transition-colors py-2 group"
            >
              <span>Catálogo 2026</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#d6ad60] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          {/* Center: Luxury Brand Logo (Crisp, High Res, Prominent) */}
          <div className="flex items-center justify-center py-2 px-2 shrink-0">
            <a
              href="#"
              className="flex items-center group transition-transform duration-300 hover:scale-[1.02] active:scale-98"
            >
              <img 
                src="/images/brand/LOGO EN COLOR.png" 
                alt={config.storeName} 
                className={`${
                  isScrolled 
                    ? 'h-14 sm:h-16 md:h-18 max-w-[260px] sm:max-w-[320px]' 
                    : 'h-18 sm:h-22 md:h-26 max-w-[320px] sm:max-w-[440px] md:max-w-[540px]'
                } w-auto object-contain shrink-0 drop-shadow-[0_2px_8px_rgba(103,60,15,0.12)] transition-all duration-300`}
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />
            </a>
          </div>

          {/* Right Action Icons: Search & Cart (Symmetric Balance) */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-1 justify-end">
            {/* Search toggler */}
            <div className="relative">
              {isSearchVisible ? (
                <div className="flex items-center bg-white border border-[#d6ad60] rounded-full px-3 py-1 shadow-sm">
                  <Search className="w-4 h-4 text-[#cda174] mr-2" />
                  <input
                    id="nav-search-input"
                    type="text"
                    placeholder="Buscar por modelo, aro, piedra..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    autoFocus
                    className="w-32 sm:w-48 text-xs bg-transparent focus:outline-none text-[#673c0f]"
                  />
                  <button
                    onClick={() => {
                      setIsSearchVisible(false);
                      onSearchChange('');
                    }}
                    className="text-[#cda174] hover:text-[#673c0f] ml-1 text-xs"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <button
                  id="nav-search-btn"
                  onClick={() => setIsSearchVisible(true)}
                  className="p-2 text-[#673c0f] hover:text-[#d0883e] hover:bg-[#e8d9ca]/30 rounded-full transition-colors"
                  title="Buscar joyas"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Cart Drawer Trigger Button */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="relative flex items-center justify-center p-2.5 bg-[#673c0f] text-white hover:bg-[#532e09] rounded-full shadow-md transition-all transform active:scale-95 group"
              aria-label="Ver carrito"
            >
              <ShoppingBag className="w-5 h-5 text-[#d6ad60] group-hover:scale-110 transition-transform" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#d0883e] text-[10px] font-bold text-white shadow">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#e8d9ca] bg-white px-4 pt-3 pb-5 shadow-lg">
          <div className="mb-3">
            <input
              id="mobile-search-input"
              type="text"
              placeholder="Buscar joyas en catálogo..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-md border border-[#cda174] focus:border-[#d6ad60] focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id as CategoryType);
                  setIsMobileMenuOpen(false);
                  const catalogEl = document.getElementById('catalog-section');
                  if (catalogEl) {
                    catalogEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`text-left px-3 py-2 text-xs uppercase tracking-wider rounded font-medium ${
                  selectedCategory === cat.id
                    ? 'bg-[#673c0f] text-[#e8d9ca] font-bold'
                    : 'text-[#673c0f]/80 hover:bg-[#e8d9ca]/30'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-[#e8d9ca] flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onOpenInstitutional?.('historia');
                  setIsMobileMenuOpen(false);
                }}
                className="py-2 px-2 text-center text-[11px] uppercase tracking-wider rounded bg-[#FAF7F4] text-[#673c0f] font-semibold border border-[#e8d9ca]"
              >
                +50 Años Historia
              </button>
              <button
                onClick={() => {
                  onOpenInstitutional?.('mayorista');
                  setIsMobileMenuOpen(false);
                }}
                className="py-2 px-2 text-center text-[11px] uppercase tracking-wider rounded bg-[#FAF7F4] text-[#673c0f] font-semibold border border-[#e8d9ca]"
              >
                Venta Mayorista
              </button>
            </div>

            <button
              onClick={() => {
                onOpenInstitutional?.('cambios');
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 text-left text-xs uppercase tracking-wider rounded bg-[#e8d9ca]/30 text-[#673c0f] font-bold border border-[#cda174] flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#d6ad60]" />
              <span>Política de Cambios (5 Días)</span>
            </button>

            <div className="flex items-center justify-between text-xs text-[#673c0f]/80 pt-1">
              <button
                onClick={() => {
                  onOpenRingGuide();
                  setIsMobileMenuOpen(false);
                }}
                className="underline text-[#d0883e] font-medium"
              >
                Guía de Medidas
              </button>
              <div className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                <span>+{config.whatsappPhone}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
