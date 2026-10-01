export type CategoryType = 
  | 'todos' 
  | 'aros_tapa_at02' 
  | 'aros_tapa_at03' 
  | 'aros_at04_trepadoras' 
  | 'argollas_aa03' 
  | 'colgantes';

export type MaterialType = 
  | 'Enchapado en Oro 18k' 
  | 'Enchapado Oro 18k + Circones' 
  | 'Enchapado Oro 18k + Perlas' 
  | 'Enchapado Oro 18k + Cristales'
  | 'Enchapado Oro 18k + Piedras'
  | 'Enchapado Oro 18k + Esmaltado';

export interface Product {
  id: number;
  sku: string;
  name: string;
  category: CategoryType;
  categoryName: string;
  price: number; // In Guaraníes (PYG)
  originalPrice?: number;
  img: string;
  secondaryImg?: string;
  material: MaterialType;
  description: string;
  commercialPresentation?: string;
  brand?: string;
  isNew?: boolean;
  isBestseller?: boolean;
  stock?: number;
  stockPrev?: number;
  layers?: string; // e.g. "5 y 7 láminas de oro 18K"
  hypoallergenic?: boolean;
  usage?: string; // e.g. "Uso Diario", "Fiestas y Eventos"
  specs: {
    weight?: string;
    karats?: string;
    gemstone?: string;
    dimensions?: string;
    closure?: string;
    warranty: string;
  };
  sizes?: string[];
}

export interface CartItem {
  product: Product;
  qty: number;
  selectedSize?: string;
  selectedMetal?: string;
  customNote?: string;
}

export interface CustomerOrderDetails {
  customerName: string;
  phone: string;
  city: string;
  address: string;
  deliveryType: 'delivery_asuncion' | 'envio_interior';
  paymentMethod: 'transferencia_ueno' | 'pagopar' | 'efectivo_pos';
  specialNotes?: string;
}

export interface BankAccountInfo {
  companyName: string; // AJM Import EAS
  ruc: string; // 80159811-7
  bank: string; // UENO BANK
  accountNumber: string; // 6192494680
}

export interface StoreConfig {
  storeName: string;
  brands: string[];
  companyName: string;
  ruc: string;
  foundationYear: number;
  slogans: string[];
  whatsappPhone: string; // "595994398050"
  wholesalePhone: string; // "595982842020"
  contactPhones: string[];
  contactEmail: string;
  currencySymbol: string;
  freeShippingThreshold: number;
  shippingCostAsuncion: number;
  shippingCostInterior: number;
  officeCity: string;
  address: string;
  workingHoursWeekdays: string;
  workingHoursSaturday: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  domain?: string;
  bankAccount: BankAccountInfo;
}

