import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductQuickView } from './components/ProductQuickView';
import { CartDrawer } from './components/CartDrawer';
import { RingSizeGuideModal } from './components/RingSizeGuideModal';
import { WhatsAppPreviewModal } from './components/WhatsAppPreviewModal';
import { StoreSettingsModal } from './components/StoreSettingsModal';
import { InstitutionalModal } from './components/InstitutionalModal';
import { HeritageSection } from './components/HeritageSection';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { Product, CartItem, CategoryType, CustomerOrderDetails, StoreConfig } from './types';
import { PRODUCTS, CATEGORIES, STORE_CONFIG, formatGuaranies } from './data/products';
import { Sparkles, SlidersHorizontal, ArrowUpDown, Filter, RotateCcw, Building2, Phone, ArrowRight, MessageCircle } from 'lucide-react';

const CART_STORAGE_KEY = 'rommariel_cart_v3';
const CONFIG_STORAGE_KEY = 'rommariel_config_v3';
const ORDER_DETAILS_STORAGE_KEY = 'rommariel_order_v3';

export default function App() {
  // Config & Store state
  const [config, setConfig] = useState<StoreConfig>(() => {
    try {
      const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.bankAccount && parsed.companyName) {
          return parsed;
        }
      }
      return STORE_CONFIG;
    } catch {
      return STORE_CONFIG;
    }
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Order & Customer Details state
  const [orderDetails, setOrderDetails] = useState<CustomerOrderDetails>(() => {
    try {
      const saved = localStorage.getItem(ORDER_DETAILS_STORAGE_KEY);
      return saved
        ? JSON.parse(saved)
        : {
            customerName: '',
            phone: '',
            city: 'Asunción',
            address: '',
            deliveryType: 'delivery_asuncion',
            paymentMethod: 'transferencia_ueno',
            specialNotes: ''
          };
    } catch {
      return {
        customerName: '',
        phone: '',
        city: 'Asunción',
        address: '',
        deliveryType: 'delivery_asuncion',
        paymentMethod: 'transferencia_ueno',
        specialNotes: ''
      };
    }
  });

  // UI state
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('todos');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isRingGuideOpen, setIsRingGuideOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInstitutionalOpen, setIsInstitutionalOpen] = useState(false);
  const [institutionalTab, setInstitutionalTab] = useState<'historia' | 'mayorista' | 'cambios' | 'contacto' | 'pagos'>('historia');
  const [toastProduct, setToastProduct] = useState<Product | null>(null);

  const handleOpenInstitutional = (tab: 'historia' | 'mayorista' | 'cambios' | 'contacto' | 'pagos' = 'historia') => {
    setInstitutionalTab(tab);
    setIsInstitutionalOpen(true);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.error(e);
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDER_DETAILS_STORAGE_KEY, JSON.stringify(orderDetails));
    } catch (e) {
      console.error(e);
    }
  }, [orderDetails]);

  // Cart operations
  const handleAddToCart = (
    product: Product,
    selectedSize?: string,
    selectedMetal?: string,
    customNote?: string
  ) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedMetal === (selectedMetal || product.material)
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].qty += 1;
        if (customNote) updated[existingIdx].customNote = customNote;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            qty: 1,
            selectedSize,
            selectedMetal: selectedMetal || product.material,
            customNote
          }
        ];
      }
    });

    setToastProduct(product);
  };

  const handleUpdateQty = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], qty: newQty };
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleUpdateOrderDetails = (partial: Partial<CustomerOrderDetails>) => {
    setOrderDetails((prev) => ({ ...prev, ...partial }));
  };

  // Filter & Sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'todos' && item.category !== selectedCategory) {
        return false;
      }
      // Material filter
      if (selectedMaterial !== 'todos' && !item.material.includes(selectedMaterial)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesMaterial = item.material.toLowerCase().includes(q);
        const matchesCategory = item.categoryName.toLowerCase().includes(q);
        const matchesSku = item.sku.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesMaterial && !matchesCategory && !matchesSku) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      // Default: featured (bestsellers first)
      if (a.isBestseller && !b.isBestseller) return -1;
      if (!a.isBestseller && b.isBestseller) return 1;
      return a.id - b.id;
    });
  }, [selectedCategory, selectedMaterial, searchQuery, sortBy]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F4] flex flex-col selection:bg-[#d6ad60] selection:text-[#673c0f]">
      {/* Fixed Luxury Header */}
      <Navbar
        totalCartItems={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        config={config}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenRingGuide={() => setIsRingGuideOpen(true)}
        onOpenInstitutional={handleOpenInstitutional}
      />

      {/* Hero Banner with Luxury Showcase */}
      <Hero
        onExploreCatalog={() => {
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenRingGuide={() => setIsRingGuideOpen(true)}
        onOpenInstitutional={handleOpenInstitutional}
      />

      {/* Main Catalog Section */}
      <main id="catalog-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative overflow-hidden">
        {/* Subtle Luxury Catalog Watermark */}
        <div className="absolute right-[-6%] top-20 w-[420px] opacity-[0.025] pointer-events-none select-none z-0">
          <img src="/images/brand/1. LOGO CUADRADO.png" alt="" className="w-full h-auto object-contain" />
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#e8d9ca] gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-1.5 text-[#d0883e] text-xs font-bold uppercase tracking-[0.2em] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#d6ad60]" />
              <span>Catálogo Exclusivo</span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-bold text-[#673c0f]">
              {selectedCategory === 'todos'
                ? 'Todas las Joyas'
                : CATEGORIES.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#cda174] mt-1 font-light">
              Mostrando {filteredProducts.length} {filteredProducts.length === 1 ? 'pieza disponible' : 'piezas disponibles'} con cotización en Guaraníes
            </p>
          </div>

          {/* Filter & Sort Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Material Filter */}
            <div className="flex items-center bg-white border border-[#e8d9ca] rounded px-2.5 py-1.5 shadow-2xs text-xs">
              <Filter className="w-3.5 h-3.5 text-[#cda174] mr-1.5" />
              <select
                id="material-filter-select"
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="bg-transparent text-xs text-[#673c0f] font-medium focus:outline-none cursor-pointer"
              >
                <option value="todos">Todos los acabados</option>
                <option value="Enchapado">Enchapado en Oro 18k</option>
                <option value="Circones">Con Circones</option>
                <option value="Perlas">Con Perlas</option>
                <option value="Cristales">Con Cristales</option>
                <option value="Piedras">Con Piedras</option>
              </select>
            </div>

            {/* Sorting */}
            <div className="flex items-center bg-white border border-[#e8d9ca] rounded px-2.5 py-1.5 shadow-2xs text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#cda174] mr-1.5" />
              <select
                id="sort-by-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-transparent text-xs text-[#673c0f] font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured">Destacados & Más Vendidos</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
              </select>
            </div>

            {/* Reset Filters button if any is active */}
            {(selectedCategory !== 'todos' || selectedMaterial !== 'todos' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('todos');
                  setSelectedMaterial('todos');
                  setSearchQuery('');
                }}
                className="p-1.5 text-xs text-[#cda174] hover:text-[#673c0f] hover:bg-white rounded transition-colors flex items-center gap-1"
                title="Limpiar filtros"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Limpiar</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Bar on Mobile / Tablet */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as CategoryType)}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-full whitespace-nowrap transition-all ${
                  active
                    ? 'bg-[#673c0f] text-[#e8d9ca] font-bold shadow-sm'
                    : 'bg-white text-[#673c0f]/80 border border-[#e8d9ca] hover:border-[#d6ad60] hover:text-[#673c0f]'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Product Grid: 2 columns in mobile, 4 columns in desktop as requested */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-lg border border-[#e8d9ca] p-12 text-center my-8 relative overflow-hidden">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 opacity-80">
              <img
                src="/images/brand/1. LOGO CUADRADO.png"
                alt="Rommariel Joyas"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="font-serif-luxury text-lg font-bold text-[#673c0f] mb-2">
              No se encontraron piezas con estos filtros
            </p>
            <p className="text-xs text-[#cda174] mb-4">
              Probá restableciendo los términos de búsqueda o seleccionando otra categoría.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('todos');
                setSelectedMaterial('todos');
                setSearchQuery('');
              }}
              className="px-5 py-2 bg-[#673c0f] hover:bg-[#522e08] text-[#e8d9ca] text-xs font-semibold uppercase tracking-wider rounded transition-colors"
            >
              Ver Todo el Catálogo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(p) => handleAddToCart(p)}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}

        {/* Brand Heritage & 50+ Years Story Section */}
        <HeritageSection
          onOpenInstitutional={handleOpenInstitutional}
        />

        {/* Wholesale & Commercial Banner */}
        <div className="relative overflow-hidden mt-14 bg-gradient-to-r from-[#673c0f] via-[#522e08] to-[#3a1e04] rounded-lg p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-[#855019]/40 shadow-xl">
          {/* Subtle Watermark in Wholesale Banner */}
          <div className="absolute right-[-15px] top-1/2 -translate-y-1/2 w-64 sm:w-80 opacity-[0.05] pointer-events-none select-none z-0">
            <img src="/images/brand/1. LOGO CUADRADO.png" alt="" className="w-full h-auto object-contain brightness-200" />
          </div>

          <div className="max-w-xl text-center md:text-left relative z-10">
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#d6ad60] block mb-1">
              Oportunidad Comercial • 17 Departamentos
            </span>
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mb-2">
              ¿Deseas revender o comprar al por mayor?
            </h3>
            <p className="text-xs sm:text-sm text-[#e8d9ca]/85 font-light leading-relaxed">
              Atención directa para mayoristas y revendedores en todo el país. Piezas enchapadas en Oro 18K (5 a 7 láminas) 100% hipoalergénicas con precios preferenciales y envíos a los 17 departamentos.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => handleOpenInstitutional('mayorista')}
              className="px-5 py-3 border border-[#d6ad60]/60 hover:bg-white/10 text-[#d6ad60] text-xs font-semibold uppercase tracking-wider rounded transition-colors"
            >
              Ver Condiciones
            </button>
            <a
              id="wholesale-whatsapp-banner-btn"
              href="https://wa.me/595982842020?text=Hola%2C%20deseo%20informaci%C3%B3n%20sobre%20compras%20al%20por%20mayor%20con%20Rommariel%20Joyas."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#d6ad60] hover:bg-[#cda174] text-[#673c0f] font-bold text-xs uppercase tracking-widest rounded transition-all shadow-md active:scale-98 flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Contactar Mayorista (0982 842 020)</span>
            </a>
          </div>
        </div>
      </main>

      {/* Cart Drawer Panel */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        config={config}
        onOpenPreview={() => setIsPreviewOpen(true)}
        orderDetails={orderDetails}
        onUpdateOrderDetails={handleUpdateOrderDetails}
      />

      {/* Product Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        config={config}
        onOpenInstitutional={handleOpenInstitutional}
      />

      {/* Ring Size Guide Modal */}
      <RingSizeGuideModal
        isOpen={isRingGuideOpen}
        onClose={() => setIsRingGuideOpen(false)}
      />

      {/* WhatsApp Message Preview Modal */}
      <WhatsAppPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        cart={cart}
        orderDetails={orderDetails}
        config={config}
      />

      {/* Store Settings & WhatsApp Phone Manager Modal */}
      <StoreSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        onSaveConfig={setConfig}
      />

      {/* Institutional & Corporate Details Modal */}
      <InstitutionalModal
        isOpen={isInstitutionalOpen}
        onClose={() => setIsInstitutionalOpen(false)}
        config={config}
        initialTab={institutionalTab}
      />

      {/* Toast Notification */}
      <Toast
        product={toastProduct}
        onClose={() => setToastProduct(null)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Floating Luxury WhatsApp Concierge */}
      <a
        id="floating-whatsapp-concierge-btn"
        href={`https://wa.me/${config.whatsappPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
          `Hola, me comunico desde la tienda web de ${config.storeName}. Deseo consultar por una joya del catálogo.`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-3.5 sm:px-4 py-3 rounded-full shadow-2xl hover:shadow-green-600/30 transition-all duration-300 hover:scale-105 group active:scale-95 border border-white/20"
        title="Asesoría personalizada por WhatsApp (0994 398 050)"
      >
        <MessageCircle className="w-5 h-5 text-white shrink-0 group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-semibold tracking-wide hidden sm:inline">
          Asesoría WhatsApp
        </span>
      </a>

      {/* Footer */}
      <Footer
        config={config}
        onOpenRingGuide={() => setIsRingGuideOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenInstitutional={handleOpenInstitutional}
      />
    </div>
  );
}
