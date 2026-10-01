import { Product, StoreConfig } from '../types';
import { productsAT02 } from './productsAT02';
import { productsAT03 } from './productsAT03';
import { productsAT04 } from './productsAT04';
import { productsAA03 } from './productsAA03';

export const STORE_CONFIG: StoreConfig = {
  storeName: 'Rommariel Joyas',
  brands: ['Rommariel Joyas', 'JMmariel Joyas'],
  companyName: 'AJM Import EAS',
  ruc: '80159811-7',
  foundationYear: 2018,
  slogans: [
    'Brilla con nosotros',
    'La joya eres tú, nosotros tu complemento',
    'Tu estilo, tu esencia'
  ],
  whatsappPhone: '595994398050', // Ventas y pedidos tienda online (0994 398 050)
  wholesalePhone: '595982842020', // Compras al por mayor y requisitos (0982 842 020)
  contactPhones: ['(0982) 842-020', '(0992) 629-900', '(0994) 398-050'],
  contactEmail: 'rommariel01@gmail.com',
  currencySymbol: 'G.',
  freeShippingThreshold: 300000, // Envío gratis a partir de G. 300.000
  shippingCostAsuncion: 25000, // Delivery Asunción / Gran Asunción
  shippingCostInterior: 45000, // Envío al Interior por Transportadora
  officeCity: 'Luque, Paraguay',
  address: 'SENADOR FLECHA Nº 24 CASI TUYUTI, Luque, Paraguay',
  workingHoursWeekdays: '07:00 a 13:00 y 14:00 a 17:00',
  workingHoursSaturday: '08:00 a 13:00',
  instagram: 'https://www.instagram.com/rommarieljoyas/',
  facebook: 'https://www.facebook.com/profile.php?id=100085632666812&locale=es_LA',
  tiktok: 'https://www.tiktok.com/@rommarieljoyas?_r=1&_t=ZS-96WMQTWImGb',
  bankAccount: {
    companyName: 'AJM Import EAS',
    ruc: '80159811-7',
    bank: 'UENO BANK',
    accountNumber: '6192494680'
  }
};

// Colección completa de 51 productos de Rommariel Joyas
export const PRODUCTS: Product[] = [
  ...productsAT02,
  ...productsAT03,
  ...productsAT04,
  ...productsAA03
];

export const CATEGORIES = [
  { id: 'todos', name: 'Todo el Catálogo (51)' },
  { id: 'aros_tapa_at02', name: 'Aros Tapa Florales (22)' },
  { id: 'aros_tapa_at03', name: 'Aros Corona & Gemas (4)' },
  { id: 'aros_at04_trepadoras', name: 'Aros Trepadores (6)' },
  { id: 'argollas_aa03', name: 'Argollas de Oro (6)' },
  { id: 'colgantes', name: 'Aros Colgantes & Dijes (13)' }
];

export function formatGuaranies(value: number): string {
  return 'G. ' + Math.round(value).toLocaleString('es-PY');
}
