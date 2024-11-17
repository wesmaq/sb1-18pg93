import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { Comensal } from '../types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface FotocheckProps {
  comensal: Comensal;
  onClose: () => void;
}

export function Fotocheck({ comensal, onClose }: FotocheckProps) {
  const qrData = JSON.stringify({
    id: comensal.id,
    dni: comensal.dni,
    nombre: `${comensal.nombres} ${comensal.apellidos}`,
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6 space-y-6">
          {/* Fotocheck Header */}
          <div className="text-center border-b pb-4">
            <h3 className="text-2xl font-bold text-gray-900">FOTOCHECK</h3>
            <p className="text-sm text-gray-500">Acceso a Comedor</p>
          </div>

          {/* Fotocheck Content */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <QRCodeSVG value={qrData} size={180} />
            </div>

            <div className="space-y-2 text-center">
              <h4 className="text-xl font-bold text-gray-900">
                {comensal.nombres} {comensal.apellidos}
              </h4>
              <p className="text-gray-600">{comensal.cargo}</p>
              <p className="text-gray-600">{comensal.empresa}</p>
              <p className="text-sm text-gray-500">DNI: {comensal.dni}</p>
              <p className="text-sm text-gray-500">
                Fecha de Registro: {format(new Date(comensal.fechaRegistro), "d 'de' MMMM yyyy", { locale: es })}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4 pt-4 border-t">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Imprimir
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}