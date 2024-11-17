import React, { useState } from 'react';
import { format } from 'date-fns';
import { Utensils, UserPlus } from 'lucide-react';
import { ComensalForm } from './components/ComensalForm';
import { AsistenciaTable } from './components/AsistenciaTable';
import { Fotocheck } from './components/Fotocheck';
import type { Comensal, Asistencia, Comida } from './types';

function App() {
  const [comensales, setComensales] = useState<Comensal[]>([]);
  const [asistencias, setAsistencias] = useState<Asistencia[]>([]);
  const [fecha] = useState(new Date());
  const [selectedComensal, setSelectedComensal] = useState<Comensal | null>(null);
  const [activeTab, setActiveTab] = useState<'registro' | 'asistencia'>('registro');

  const handleAgregarComensal = (nuevoComensal: Omit<Comensal, 'id'>) => {
    const comensal: Comensal = {
      ...nuevoComensal,
      id: crypto.randomUUID(),
    };
    setComensales([...comensales, comensal]);
    setSelectedComensal(comensal);
  };

  const handleToggleAsistencia = (comensalId: string, comida: Comida) => {
    const fechaStr = format(fecha, 'yyyy-MM-dd');
    const timestamp = new Date().toISOString();
    
    setAsistencias((prevAsistencias) => {
      const asistenciaIndex = prevAsistencias.findIndex(
        (a) => a.comensalId === comensalId && a.fecha === fechaStr
      );

      if (asistenciaIndex >= 0) {
        const nuevasAsistencias = [...prevAsistencias];
        const asistenciaActual = nuevasAsistencias[asistenciaIndex];
        
        nuevasAsistencias[asistenciaIndex] = {
          ...asistenciaActual,
          [comida]: !asistenciaActual[comida],
          registros: {
            ...asistenciaActual.registros,
            [comida]: !asistenciaActual[comida] ? timestamp : undefined,
          },
        };
        return nuevasAsistencias;
      } else {
        return [
          ...prevAsistencias,
          {
            comensalId,
            fecha: fechaStr,
            desayuno: comida === 'desayuno',
            almuerzo: comida === 'almuerzo',
            cena: comida === 'cena',
            registros: {
              [comida]: timestamp,
            },
          },
        ];
      }
    });

    const comensal = comensales.find(c => c.id === comensalId);
    if (comensal) {
      const hora = format(new Date(), 'HH:mm');
      alert(`¡Asistencia registrada!\nComensal: ${comensal.nombres} ${comensal.apellidos}\nComida: ${comida}\nHora: ${hora}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Utensils className="w-8 h-8" />
            <h1 className="text-3xl font-bold">
              Sistema de Registro de Comensales
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('registro')}
              className={`${
                activeTab === 'registro'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center gap-2 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
            >
              <UserPlus className="w-5 h-5" />
              Registro de Comensales
            </button>
            <button
              onClick={() => setActiveTab('asistencia')}
              className={`${
                activeTab === 'asistencia'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center gap-2 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
            >
              <Utensils className="w-5 h-5" />
              Control de Asistencia
            </button>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'registro' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ComensalForm onAgregarComensal={handleAgregarComensal} />
            </div>
          </div>
        )}
        
        {activeTab === 'asistencia' && (
          <AsistenciaTable
            comensales={comensales}
            asistencias={asistencias}
            fecha={fecha}
            onToggleAsistencia={handleToggleAsistencia}
          />
        )}
      </main>

      {selectedComensal && (
        <Fotocheck
          comensal={selectedComensal}
          onClose={() => setSelectedComensal(null)}
        />
      )}
    </div>
  );
}

export default App;