import React, { useState } from 'react';
import { X, Settings, Save, RotateCcw, Check, Building2, CreditCard, Clock, Phone } from 'lucide-react';
import { StoreConfig } from '../types';
import { STORE_CONFIG } from '../data/products';

interface StoreSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: StoreConfig;
  onSaveConfig: (newConfig: StoreConfig) => void;
}

export const StoreSettingsModal: React.FC<StoreSettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<StoreConfig>({ ...config });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  const handleReset = () => {
    setFormData({ ...STORE_CONFIG });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div
        id="store-settings-modal"
        className="relative bg-white w-full max-w-xl rounded-md shadow-2xl border border-[#e8d9ca] p-6 overflow-hidden max-h-[92vh] flex flex-col"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#e8d9ca]">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#FAF7F4] text-[#d0883e] rounded-full">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-luxury text-lg font-bold text-[#673c0f]">
                Configuración Institucional & Tienda
              </h2>
              <p className="text-xs text-[#cda174]">
                Gestión de datos de AJM Import EAS, WhatsApp y cuentas bancarias
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#cda174] hover:text-[#673c0f] rounded-full hover:bg-[#FAF7F4] transition-colors"
            aria-label="Cerrar configuración"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="overflow-y-auto py-4 space-y-4 text-xs pr-1">
          {/* Identidad */}
          <div className="bg-[#FAF7F4] p-3.5 rounded border border-[#e8d9ca] space-y-3">
            <h3 className="font-serif-luxury font-bold text-[#673c0f] text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#d0883e]" />
              <span>Identidad Institucional</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#673c0f] mb-1">
                  Nombre Comercial:
                </label>
                <input
                  type="text"
                  value={formData.storeName}
                  onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-[#e8d9ca] rounded focus:border-[#d6ad60] focus:outline-none bg-white text-[#673c0f]"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#673c0f] mb-1">
                  Razón Social (EAS):
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-[#e8d9ca] rounded focus:border-[#d6ad60] focus:outline-none bg-white text-[#673c0f]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#673c0f] mb-1">
                  RUC:
                </label>
                <input
                  type="text"
                  value={formData.ruc}
                  onChange={(e) => setFormData({ ...formData, ruc: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-[#e8d9ca] rounded focus:border-[#d6ad60] focus:outline-none bg-white font-mono text-[#673c0f]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Teléfonos y WhatsApp */}
          <div className="bg-[#FAF7F4] p-3.5 rounded border border-[#e8d9ca] space-y-3">
            <h3 className="font-serif-luxury font-bold text-[#673c0f] text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-[#25D366]" />
              <span>Líneas de Atención & WhatsApp</span>
            </h3>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#673c0f] mb-1">
                WhatsApp Ventas Online (con código 595, sin + ni espacios):
              </label>
              <input
                type="text"
                value={formData.whatsappPhone}
                onChange={(e) => setFormData({ ...formData, whatsappPhone: e.target.value })}
                placeholder="595994398050"
                className="w-full text-xs px-3 py-2 border border-[#e8d9ca] rounded focus:border-[#d6ad60] focus:outline-none font-mono bg-white text-[#673c0f]"
                required
              />
              <p className="text-[10px] text-[#cda174] mt-1">
                Actual: <strong>0994 398 050</strong> (Ventas minoristas online)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#673c0f] mb-1">
                  Teléfono Mayoristas:
                </label>
                <input
                  type="text"
                  value={formData.wholesalePhone}
                  onChange={(e) => setFormData({ ...formData, wholesalePhone: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-[#e8d9ca] rounded focus:border-[#d6ad60] focus:outline-none bg-white font-mono text-[#673c0f]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#673c0f] mb-1">
                  Email de Contacto:
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-[#e8d9ca] rounded focus:border-[#d6ad60] focus:outline-none bg-white text-[#673c0f]"
                />
              </div>
            </div>
          </div>

          {/* Cuenta Bancaria */}
          <div className="bg-[#FAF7F4] p-3.5 rounded border border-[#e8d9ca] space-y-3">
            <h3 className="font-serif-luxury font-bold text-[#673c0f] text-xs uppercase tracking-wider flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-[#d0883e]" />
              <span>Cuenta Bancaria UENO BANK</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#673c0f] mb-1">
                  Banco:
                </label>
                <input
                  type="text"
                  value={formData.bankAccount.bank}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bankAccount: { ...formData.bankAccount, bank: e.target.value }
                    })
                  }
                  className="w-full text-xs px-3 py-2 border border-[#e8d9ca] rounded focus:border-[#d6ad60] focus:outline-none bg-white text-[#673c0f]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#673c0f] mb-1">
                  N° de Cuenta:
                </label>
                <input
                  type="text"
                  value={formData.bankAccount.accountNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bankAccount: { ...formData.bankAccount, accountNumber: e.target.value }
                    })
                  }
                  className="w-full text-xs px-3 py-2 border border-[#e8d9ca] rounded focus:border-[#d6ad60] focus:outline-none bg-white font-mono text-[#673c0f]"
                />
              </div>
            </div>
          </div>

          {/* Envíos y Ubicación */}
          <div className="bg-[#FAF7F4] p-3.5 rounded border border-[#e8d9ca] space-y-3">
            <h3 className="font-serif-luxury font-bold text-[#673c0f] text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#d0883e]" />
              <span>Envíos & Ubicación de Oficina</span>
            </h3>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#673c0f] mb-1">
                  Asunción (Gs.):
                </label>
                <input
                  type="number"
                  value={formData.shippingCostAsuncion}
                  onChange={(e) => setFormData({ ...formData, shippingCostAsuncion: Number(e.target.value) })}
                  className="w-full text-xs px-3 py-2 border border-[#e8d9ca] rounded focus:border-[#d6ad60] focus:outline-none bg-white font-mono text-[#673c0f]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#673c0f] mb-1">
                  Interior (Gs.):
                </label>
                <input
                  type="number"
                  value={formData.shippingCostInterior}
                  onChange={(e) => setFormData({ ...formData, shippingCostInterior: Number(e.target.value) })}
                  className="w-full text-xs px-3 py-2 border border-[#e8d9ca] rounded focus:border-[#d6ad60] focus:outline-none bg-white font-mono text-[#673c0f]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#673c0f] mb-1">
                  Envío Gratis (Gs.):
                </label>
                <input
                  type="number"
                  value={formData.freeShippingThreshold}
                  onChange={(e) => setFormData({ ...formData, freeShippingThreshold: Number(e.target.value) })}
                  className="w-full text-xs px-3 py-2 border border-[#e8d9ca] rounded focus:border-[#d6ad60] focus:outline-none bg-white font-mono text-[#673c0f]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#673c0f] mb-1">
                Dirección de Oficina (Luque):
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-[#e8d9ca] rounded focus:border-[#d6ad60] focus:outline-none bg-white text-[#673c0f]"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#e8d9ca] flex justify-between items-center">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-[#cda174] hover:text-[#673c0f] flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Predeterminado</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-[#673c0f]/70 hover:text-[#673c0f] rounded"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-[#673c0f] hover:bg-[#522e08] text-[#e8d9ca] rounded flex items-center gap-1.5 transition-colors shadow-sm"
              >
                {saved ? <Check className="w-4 h-4 text-[#25D366]" /> : <Save className="w-4 h-4" />}
                <span>{saved ? 'Guardado' : 'Guardar Cambios'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
