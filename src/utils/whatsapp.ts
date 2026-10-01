import { CartItem, CustomerOrderDetails, StoreConfig } from '../types';
import { formatGuaranies } from '../data/products';

export function buildWhatsAppMessage(
  cart: CartItem[],
  orderDetails: CustomerOrderDetails,
  config: StoreConfig,
  totalAmount: number,
  shippingCost: number
): string {
  let msg = `*NUEVO PEDIDO DESDE LA WEB - ${config.storeName.toUpperCase()}*\n\n`;
  msg += `*DETALLE DEL PEDIDO:*\n`;

  cart.forEach((item, index) => {
    const itemTotal = item.product.price * item.qty;
    msg += `${index + 1}. *${item.qty}x ${item.product.name}* (Ref. ${item.product.sku})\n`;
    msg += `   - Precio: ${formatGuaranies(item.product.price)} c/u\n`;
    msg += `   - Subtotal: ${formatGuaranies(itemTotal)}\n`;
    if (item.selectedSize) {
      msg += `   - Talla/Medida: ${item.selectedSize}\n`;
    }
    if (item.selectedMetal) {
      msg += `   - Acabado/Metal: ${item.selectedMetal}\n`;
    }
    if (item.customNote) {
      msg += `   - Nota especial: ${item.customNote}\n`;
    }
    msg += `\n`;
  });

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  msg += `*RESUMEN:*\n`;
  msg += `- Subtotal Productos: ${formatGuaranies(subtotal)}\n`;
  
  if (shippingCost === 0) {
    msg += `- Envio: *GRATIS* (Supera ${formatGuaranies(config.freeShippingThreshold)})\n`;
  } else {
    msg += `- Costo de Envio: ${formatGuaranies(shippingCost)}\n`;
  }

  msg += `\n*TOTAL A PAGAR:* *${formatGuaranies(totalAmount)}*\n\n`;

  msg += `*DATOS DE CONFIRMACION:*\n`;
  msg += `- *Nombre:* ${orderDetails.customerName.trim() || '[Pendiente de confirmar]'}\n`;
  msg += `- *Telefono/WA:* ${orderDetails.phone.trim() || '[Mismo numero de chat]'}\n`;
  msg += `- *Ciudad:* ${orderDetails.city.trim() || 'Asuncion / Gran Asuncion'}\n`;
  msg += `- *Direccion de entrega:* ${orderDetails.address.trim() || '[Coordinar por chat]'}\n`;

  const deliveryLabels: Record<string, string> = {
    delivery_asuncion: 'Delivery a Domicilio (Asuncion y Gran Asuncion)',
    envio_interior: 'Envio al Interior (Transportadora Asegurada)'
  };
  msg += `- *Tipo de entrega:* ${deliveryLabels[orderDetails.deliveryType] || 'Delivery'}\n`;

  const paymentLabels: Record<string, string> = {
    transferencia_ueno: `Transferencia Bancaria (${config.bankAccount.bank} - ${config.bankAccount.companyName})`,
    pagopar: 'Pagopar (Tarjetas de credito/debito, billeteras, bocas de cobranza)',
    efectivo_pos: 'Efectivo o POS contra entrega'
  };
  msg += `- *Forma de pago elegida:* ${paymentLabels[orderDetails.paymentMethod] || 'Transferencia Bancaria'}\n`;

  if (orderDetails.paymentMethod === 'transferencia_ueno') {
    msg += `\n*DATOS DE TRANSFERENCIA BANCARIA:*\n`;
    msg += `- Banco: ${config.bankAccount.bank}\n`;
    msg += `- Razon Social: ${config.bankAccount.companyName}\n`;
    msg += `- RUC: ${config.bankAccount.ruc}\n`;
    msg += `- Cuenta N°: ${config.bankAccount.accountNumber}\n`;
  }

  if (orderDetails.specialNotes && orderDetails.specialNotes.trim()) {
    msg += `\n- *Mensaje o dedicatoria:* "${orderDetails.specialNotes.trim()}"\n`;
  }

  msg += `\nHola, me gustaria confirmar la disponibilidad y coordinar mi pedido en ${config.storeName}.`;

  return msg;
}

export function openWhatsAppCheckout(
  phone: string,
  message: string
) {
  // Sanitize phone number to digits only
  const cleanPhone = phone.replace(/\D/g, '') || '595994398050';
  const encodedText = encodeURIComponent(message);
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;
  try {
    const newTab = window.open(waUrl, '_blank', 'noopener,noreferrer');
    if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
      const link = document.createElement('a');
      link.href = waUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } catch {
    const link = document.createElement('a');
    link.href = waUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
