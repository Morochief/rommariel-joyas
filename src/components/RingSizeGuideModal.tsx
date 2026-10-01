import React, { useState } from 'react';
import { X, Ruler, CheckCircle2, Sparkles } from 'lucide-react';

interface RingSizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RingSizeGuideModal: React.FC<RingSizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [calibratorDiameter, setCalibratorDiameter] = useState<number>(17.2); // Default to size 14 (17.2mm)

  const ringSizes = [
    { size: '10', diameter: 15.6, circ: '49.0 mm' },
    { size: '12', diameter: 16.5, circ: '51.8 mm' },
    { size: '14', diameter: 17.2, circ: '54.0 mm' },
    { size: '16', diameter: 17.8, circ: '56.0 mm' },
    { size: '18', diameter: 18.4, circ: '58.0 mm' },
    { size: '20', diameter: 19.1, circ: '60.0 mm' },
    { size: '22', diameter: 19.7, circ: '62.0 mm' },
  ];

  // Find closest size for calibrator
  const closestSize = ringSizes.reduce((prev, curr) => {
    return Math.abs(curr.diameter - calibratorDiameter) < Math.abs(prev.diameter - calibratorDiameter)
      ? curr
      : prev;
  });

  // Calculate pixel size for screen circle (approx 3.78 px per mm at standard 96dpi)
  // Scaling factor 4.5 gives a visible, easy to overlay size on mobile & desktop screens
  const circlePixelSize = Math.round(calibratorDiameter * 4.6);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        id="ring-size-guide-modal"
        className="relative bg-white w-full max-w-2xl rounded-md shadow-2xl border border-[#d6ad60]/50 p-5 sm:p-7 overflow-hidden max-h-[92vh] flex flex-col"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#cda174] hover:text-[#673c0f] rounded-full hover:bg-[#FAF7F4] transition-colors"
          aria-label="Cerrar guía"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-[#FAF7F4] text-[#d0883e] rounded-full">
            <Ruler className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#673c0f]">
              Calibrador & Guía de Tallas Rommariel
            </h2>
            <p className="text-xs text-[#cda174]">
              Experiencia visual y sensorial para encontrar la medida exacta de tu joya
            </p>
          </div>
        </div>

        <div className="overflow-y-auto pr-1 space-y-4 my-2">
          {/* SENSORY CALIBRATOR: Support physical ring on screen */}
          <div className="bg-[#FAF7F4] p-4 sm:p-5 rounded border border-[#e8d9ca] relative overflow-hidden">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d0883e] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Calibrador Sensorial en Pantalla</span>
            </div>
            <p className="text-xs text-[#673c0f]/80 leading-relaxed mb-4">
              Colocá un anillo propio sobre el círculo dorado y ajustá la barra hasta que el borde interior de tu joya coincida con el contorno.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
              {/* Ring Circle Preview */}
              <div className="flex flex-col items-center justify-center">
                <div
                  className="rounded-full border-2 border-dashed border-[#d6ad60] bg-white shadow-inner flex items-center justify-center transition-all duration-150 relative"
                  style={{
                    width: `${circlePixelSize}px`,
                    height: `${circlePixelSize}px`,
                  }}
                >
                  <div className="w-1.5 h-1.5 bg-[#d6ad60] rounded-full opacity-60" />
                  <span className="absolute -bottom-6 text-[10px] font-bold text-[#cda174] whitespace-nowrap">
                    {calibratorDiameter.toFixed(1)} mm
                  </span>
                </div>
              </div>

              {/* Slider & Result */}
              <div className="flex-1 w-full max-w-xs space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-[#673c0f] font-semibold mb-1">
                    <span>Diámetro: {calibratorDiameter.toFixed(1)} mm</span>
                    <span className="text-[#d0883e]">Talla Estimada: N° {closestSize.size}</span>
                  </div>
                  <input
                    type="range"
                    min="15.0"
                    max="21.0"
                    step="0.1"
                    value={calibratorDiameter}
                    onChange={(e) => setCalibratorDiameter(parseFloat(e.target.value))}
                    className="w-full accent-[#d6ad60] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#cda174] mt-1">
                    <span>15.0 mm (N° 8)</span>
                    <span>18.0 mm (N° 16)</span>
                    <span>21.0 mm (N° 24)</span>
                  </div>
                </div>

                <div className="p-2.5 bg-white rounded border border-[#e8d9ca] text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#cda174]">Talla Oficial Rommariel:</span>
                    <span className="text-sm font-bold text-[#673c0f] bg-[#FAF7F4] px-2 py-0.5 rounded border border-[#e8d9ca]">
                      Talla {closestSize.size} ({closestSize.diameter} mm)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2 Step Measurement Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="bg-white p-3 rounded border border-[#e8d9ca]">
              <div className="flex items-center gap-1.5 font-bold text-[#673c0f] mb-1">
                <span className="w-5 h-5 rounded-full bg-[#673c0f] text-[#e8d9ca] flex items-center justify-center text-[10px]">1</span>
                <span>Método de la Cinta o Hilo</span>
              </div>
              <p className="text-[#673c0f]/80 leading-relaxed">
                Envolvé una tira de papel fino alrededor del dedo. Marcá la intersección y medí la longitud con regla milimetrada para obtener la circunferencia.
              </p>
            </div>

            <div className="bg-white p-3 rounded border border-[#e8d9ca]">
              <div className="flex items-center gap-1.5 font-bold text-[#673c0f] mb-1">
                <span className="w-5 h-5 rounded-full bg-[#673c0f] text-[#e8d9ca] flex items-center justify-center text-[10px]">2</span>
                <span>Confort Fit Rommariel</span>
              </div>
              <p className="text-[#673c0f]/80 leading-relaxed">
                Todas nuestras alianzas y anillos cuentan con bisel interior redondeado que otorga un tacto suave y evita que la pieza aprisione el dedo.
              </p>
            </div>
          </div>

          {/* Official Ring Size Table */}
          <div className="border border-[#e8d9ca] rounded overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#673c0f] text-[#e8d9ca] font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-2 px-3">Talla (N°)</th>
                  <th className="py-2 px-3">Diámetro Interior</th>
                  <th className="py-2 px-3">Circunferencia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8d9ca] bg-white text-[#673c0f]/85">
                {ringSizes.map((row) => {
                  const isSelected = row.size === closestSize.size;
                  return (
                    <tr
                      key={row.size}
                      onClick={() => setCalibratorDiameter(row.diameter)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#FAF7F4] font-bold text-[#673c0f]' : 'hover:bg-[#FAF7F4]/50'
                      }`}
                    >
                      <td className="py-2 px-3 flex items-center gap-2">
                        {isSelected && <span className="w-2 h-2 rounded-full bg-[#d6ad60]" />}
                        <span>Talla {row.size}</span>
                      </td>
                      <td className="py-2 px-3">{row.diameter} mm</td>
                      <td className="py-2 px-3">{row.circ}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-[#e8d9ca]/30 rounded flex items-center gap-2 text-xs text-[#673c0f]/90">
            <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
            <span>
              ¿Tenés dudas entre dos tallas? Recomendamos elegir la más grande. Recordá que el primer ajuste de medida en Rommariel es gratuito.
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-[#e8d9ca] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#673c0f] hover:bg-[#522e08] text-[#e8d9ca] font-semibold text-xs uppercase tracking-widest rounded-sm transition-all shadow-sm"
          >
            Listo, Continuar
          </button>
        </div>
      </div>
    </div>
  );
};
