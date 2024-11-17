import React, { useState } from 'react';
import { Check, X, QrCode } from 'lucide-react';
import type { Comensal, Asistencia, Comida } from '../types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { QRScanner } from './QRScanner';

interface AsistenciaTableProps {
  comensales: Comensal[];
  asistencias: Asistencia[];
  fecha: Date;
  onToggleAsistencia: (comensalId: string, comida: Comida) => void;
}

export function AsistenciaTable({ 
  comensales, 
  asistencias, 
  fecha, 
  onToggleAsistencia 
}: AsistenciaTableProps) {
  const [showScanner, setShowScanner] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Registro de Asistencia - {format(fecha, "EEEE d 'de' MMMM", { locale: es })}
          </h2>
          <button
            onClick={() => setShowScanner(!showScanner)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <QrCode className="w-5 h-5" />
            {showScanner ? 'Ocultar Scanner' : 'Escanear QR'}
          </button>
        </div>
        
        {showScanner && (
          <div className="mt-6">
            <QRScanner onScanSuccess={onToggleAsistencia} />
          </div>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DNI
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Comensal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Empresa
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Desayuno
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Almuerzo
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cena
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {comensales.map((comensal) => {
              const asistenciaDia = asistencias.find(
                (a) => a.comensalId === comensal.id && a.fecha === format(fecha, 'yyyy-MM-dd')
              ) || {
                comensalId: comensal.id,
                fecha: format(fecha, 'yyyy-MM-dd'),
                desayuno: false,
                almuerzo: false,
                cena: false,
                registros: {},
              };

              return (
                <tr key={comensal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{comensal.dni}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {comensal.nombres} {comensal.apellidos}
                    </div>
                    <div className="text-sm text-gray-500">{comensal.cargo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{comensal.empresa}</div>
                  </td>
                  {(['desayuno', 'almuerzo', 'cena'] as const).map((comida) => (
                    <td key={comida} className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex flex-col items-center gap-1">
                        <button
                          onClick={() => onToggleAsistencia(comensal.id, comida)}
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                            asistenciaDia[comida]
                              ? 'bg-green-100 text-green-600 hover:bg-green-200'
                              : 'bg-red-100 text-red-600 hover:bg-red-200'
                          }`}
                        >
                          {asistenciaDia[comida] ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                        </button>
                        {asistenciaDia.registros?.[comida] && (
                          <span className="text-xs text-gray-500">
                            {format(new Date(asistenciaDia.registros[comida]!), 'HH:mm')}
                          </span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}