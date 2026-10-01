import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, Truck, ShieldCheck, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { CartItem, CustomerOrderDetails, StoreConfig } from '../types';
import { formatGuaranies } from '../data/products';
import { buildWhatsAppMessage, openWhatsAppCheckout } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  config: StoreConfig;
  onOpenPreview: () => void;
  orderDetails: CustomerOrderDetails;
  onUpdateOrderDetails: (details: Partial<CustomerOrderDetails>) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  config,
  onOpenPreview,
  orderDetails,
  onUpdateOrderDetails
}) => {
  const [showDetailsForm, setShowDetailsForm] = useState(true);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  // Shipping calculation
  let shippingCost = 0;
  if (subtotal >= config.freeShippingThreshold) {
    shippingCost = 0;
  } else if (orderDetails.deliveryType === 'delivery_asuncion') {
    shippingCost = config.shippingCostAsuncion;
  } else if (orderDetails.deliveryType === 'envio_interior') {
    shippingCost = config.shippingCostInterior;
  }

  const grandTotal = subtotal + shippingCost;
  const freeShippingRemaining = Math.max(0, config.freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / config.freeShippingThreshold) * 100));

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const msg = buildWhatsAppMessage(cart, orderDetails, config, grandTotal, shippingCost);
    openWhatsAppCheckout(config.whatsappPhone, msg);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div
        id="cart-backdrop"
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div
          id="cart-drawer-panel"
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#e8d9ca] animate-slideInRight"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#e8d9ca] bg-[#FAF7F4] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#673c0f] text-[#d6ad60] rounded-full">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif-luxury text-base sm:text-lg font-bold text-[#673c0f]">
                  Tu Bolsa de Joyas
                </h2>
                <span className="text-[11px] text-[#cda174] font-medium">
                  {cart.length === 0 ? 'Sin piezas seleccionadas' : `${cart.reduce((a, b) => a + b.qty, 0)} ${cart.reduce((a, b) => a + b.qty, 0) === 1 ? 'pieza' : 'piezas'}`}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  id="cart-clear-btn"
                  onClick={onClearCart}
                  className="text-[11px] text-[#cda174] hover:text-red-600 transition-colors uppercase tracking-wider font-semibold mr-1"
                  title="Vaciar carrito"
                >
                  Vaciar
                </button>
              )}
              <button
                id="cart-close-btn"
                onClick={onClose}
                className="p-1.5 text-[#673c0f] hover:text-[#d0883e] rounded-full hover:bg-white transition-colors"
                aria-label="Cerrar bolsa"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Free Shipping Progress Indicator */}
          {cart.length > 0 && (
            <div className="bg-[#673c0f] text-white px-4 py-2 text-xs flex flex-col gap-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-[#e8d9ca] font-medium flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#d6ad60]" />
                  {freeShippingRemaining === 0 ? (
                    <span>¡Felicidades! Tenés <strong>Envío Gratis</strong></span>
                  ) : (
                    <span>Sumá <strong>{formatGuaranies(freeShippingRemaining)}</strong> para Envío Gratis</span>
                  )}
                </span>
                <span className="text-[#e8d9ca]/80">{freeShippingProgress}%</span>
              </div>
              <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-[#d6ad60] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                <div className="w-16 h-16 rounded-full bg-[#e8d9ca]/30 flex items-center justify-center text-[#d0883e] mb-4 border border-[#e8d9ca]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-lg font-bold text-[#673c0f] mb-1">
                  Tu bolsa está vacía
                </h3>
                <p className="text-xs text-[#673c0f]/75 mb-6 max-w-xs leading-relaxed">
                  Explorá nuestras colecciones de Oro 18k, Diamantes y Plata 925 para agregar tus joyas favoritas.
                </p>
                <button
                  id="empty-cart-explore-btn"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#673c0f] hover:bg-[#522e08] text-[#e8d9ca] text-xs font-semibold uppercase tracking-widest rounded-sm transition-all shadow-md"
                >
                  Explorar Joyería
                </button>
              </div>
            ) : (
              <>
                {/* List of Cart Items */}
                <div className="divide-y divide-[#e8d9ca]/60">
                  {cart.map((item, idx) => (
                    <div key={`${item.product.id}-${idx}`} className="py-3.5 flex gap-3 first:pt-0">
                      {/* Product Thumbnail */}
                      <img
                        src={item.product.img}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded bg-[#FAF7F4] border border-[#e8d9ca] shrink-0"
                      />

                      {/* Item Details */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex justify-between items-start gap-1">
                            <h4 className="font-serif-luxury text-xs sm:text-sm font-semibold text-[#673c0f] truncate">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(idx)}
                              className="text-[#cda174] hover:text-red-600 transition-colors p-1"
                              title="Eliminar"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-1 mt-0.5">
                            {item.selectedSize && (
                              <span className="text-[10px] bg-[#e8d9ca]/40 text-[#673c0f] px-1.5 py-0.5 rounded font-medium border border-[#cda174]/30 shrink-0">
                                Talla {item.selectedSize}
                              </span>
                            )}
                            <span className="text-[10px] bg-[#e8d9ca]/40 text-[#673c0f] px-1.5 py-0.5 rounded font-medium border border-[#cda174]/30 truncate max-w-[160px]">
                              {item.selectedMetal || item.product.material}
                            </span>
                          </div>

                          {item.customNote && (
                            <p className="text-[10px] text-[#cda174] italic mt-0.5 truncate">
                              "{item.customNote}"
                            </p>
                          )}
                        </div>

                        {/* Quantity controls and Subtotal */}
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border border-[#e8d9ca] rounded bg-white">
                            <button
                              onClick={() => onUpdateQty(idx, item.qty - 1)}
                              className="p-1 hover:bg-[#FAF7F4] text-[#673c0f] transition-colors"
                              aria-label="Disminuir cantidad"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-bold text-[#673c0f] min-w-[24px] text-center">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => onUpdateQty(idx, item.qty + 1)}
                              className="p-1 hover:bg-[#FAF7F4] text-[#673c0f] transition-colors"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-xs sm:text-sm font-bold text-[#673c0f]">
                            {formatGuaranies(item.product.price * item.qty)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Information & Delivery Collapsible Accordion */}
                <div className="border border-[#e8d9ca] rounded-md bg-[#FAF7F4] p-3.5 transition-all">
                  <button
                    onClick={() => setShowDetailsForm(!showDetailsForm)}
                    className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#673c0f]"
                  >
                    <span>Datos para la Entrega (Opcional)</span>
                    <span className="text-[#d0883e]">{showDetailsForm ? '−' : '+'}</span>
                  </button>

                  {showDetailsForm && (
                    <div className="mt-3 space-y-2.5 text-xs">
                      <div>
                        <label className="block text-[11px] font-medium text-[#673c0f] mb-1">
                          Nombre Completo:
                        </label>
                        <input
                          id="cart-customer-name"
                          type="text"
                          placeholder="Ej: María González"
                          value={orderDetails.customerName}
                          onChange={(e) => onUpdateOrderDetails({ customerName: e.target.value })}
                          className="w-full text-xs px-2.5 py-1.5 bg-white border border-[#e8d9ca] rounded focus:border-[#d6ad60] focus:outline-none text-[#673c0f]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-medium text-[#673c0f] mb-1">
                            Teléfono / WhatsApp:
                          </label>
                          <input
                            id="cart-customer-phone"
                            type="text"
                            placeholder="0981 xxx xxx"
                            value={orderDetails.phone}
                            onChange={(e) => onUpdateOrderDetails({ phone: e.target.value })}
                            className="w-full text-xs px-2.5 py-1.5 bg-white border border-[#e8d9ca] rounded focus:border-[#d6ad60] focus:outline-none text-[#673c0f]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-medium text-[#673c0f] mb-1">
                            Ciudad:
                          </label>
                          <input
                            id="cart-customer-city"
                            type="text"
                            placeholder="Asunción / Luque..."
                            value={orderDetails.city}
                            onChange={(e) => onUpdateOrderDetails({ city: e.target.value })}
                            className="w-full text-xs px-2.5 py-1.5 bg-white border border-[#e8d9ca] rounded focus:border-[#d6ad60] focus:outline-none text-[#673c0f]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-[#673c0f] mb-1">
                          Dirección / Barrio:
                        </label>
                        <input
                          id="cart-customer-address"
                          type="text"
                          placeholder="Calle, Nro de casa o referencias"
                          value={orderDetails.address}
                          onChange={(e) => onUpdateOrderDetails({ address: e.target.value })}
                          className="w-full text-xs px-2.5 py-1.5 bg-white border border-[#e8d9ca] rounded focus:border-[#d6ad60] focus:outline-none text-[#673c0f]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-[#673c0f] mb-1">
                          Tipo de Entrega a Domicilio:
                        </label>
                        <select
                          id="cart-delivery-select"
                          value={orderDetails.deliveryType}
                          onChange={(e) =>
                            onUpdateOrderDetails({
                              deliveryType: e.target.value as CustomerOrderDetails['deliveryType']
                            })
                          }
                          className="w-full text-xs px-2.5 py-1.5 bg-white border border-[#e8d9ca] rounded focus:border-[#d6ad60] focus:outline-none text-[#673c0f]"
                        >
                          <option value="delivery_asuncion">
                            Delivery Asunción / Gran Asunción (+{formatGuaranies(config.shippingCostAsuncion)})
                          </option>
                          <option value="envio_interior">
                            Envío al Interior por Transportadora (+{formatGuaranies(config.shippingCostInterior)})
                          </option>
                        </select>
                        <p className="text-[10px] text-[#cda174] mt-1 italic">
                          Venta exclusiva online. Envíos directos a todo el país desde nuestra oficina en Luque.
                        </p>
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-[#673c0f] mb-1">
                          Forma de Pago:
                        </label>
                        <select
                          id="cart-payment-select"
                          value={orderDetails.paymentMethod}
                          onChange={(e) =>
                            onUpdateOrderDetails({
                              paymentMethod: e.target.value as CustomerOrderDetails['paymentMethod']
                            })
                          }
                          className="w-full text-xs px-2.5 py-1.5 bg-white border border-[#e8d9ca] rounded focus:border-[#d6ad60] focus:outline-none text-[#673c0f]"
                        >
                          <option value="transferencia_ueno">
                            Transferencia Bancaria (UENO BANK - AJM Import EAS)
                          </option>
                          <option value="pagopar">
                            Pagopar (Tarjetas de crédito/débito y billeteras)
                          </option>
                        </select>
                      </div>

                      {orderDetails.paymentMethod === 'transferencia_ueno' && (
                        <div className="p-3 bg-[#e8d9ca]/30 border border-[#cda174]/40 rounded text-[11px] text-[#673c0f] space-y-1">
                          <p className="font-bold text-[#673c0f] uppercase tracking-wider text-[10px]">
                            Datos para Transferencia:
                          </p>
                          <p><strong>Banco:</strong> {config.bankAccount.bank}</p>
                          <p><strong>Razón Social:</strong> {config.bankAccount.companyName}</p>
                          <p><strong>RUC:</strong> {config.bankAccount.ruc}</p>
                          <p><strong>Cta N°:</strong> <span className="font-mono">{config.bankAccount.accountNumber}</span></p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer with Calculations & Checkout Button */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#e8d9ca] bg-[#FAF7F4] space-y-3">
              <div className="space-y-1.5 text-xs text-[#673c0f]/80">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-[#673c0f]">{formatGuaranies(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío:</span>
                  <span className="font-semibold text-[#673c0f]">
                    {shippingCost === 0 ? (
                      <span className="text-[#25D366]">¡Gratis!</span>
                    ) : (
                      formatGuaranies(shippingCost)
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-[#e8d9ca] text-sm sm:text-base font-bold text-[#673c0f]">
                  <span>Total Estimado:</span>
                  <span className="text-lg text-[#673c0f] font-extrabold">{formatGuaranies(grandTotal)}</span>
                </div>
              </div>

              {/* Primary WhatsApp Checkout Button */}
              <button
                id="cart-whatsapp-checkout-btn"
                onClick={handleCheckout}
                className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-widest rounded-sm transition-all duration-200 flex items-center justify-center gap-2.5 shadow-lg active:scale-98"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Pedir por WhatsApp ({formatGuaranies(grandTotal)})</span>
              </button>

              {/* Preview Button */}
              <button
                id="cart-preview-msg-btn"
                onClick={onOpenPreview}
                className="w-full py-2 px-3 text-[11px] font-semibold text-[#673c0f] hover:text-[#d0883e] hover:bg-white rounded transition-colors flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-[#d0883e]" />
                <span>Ver cómo se enviará el mensaje</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#cda174] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d6ad60]" />
                <span>Atención humana inmediata • Compra 100% segura</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
