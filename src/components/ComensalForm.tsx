import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import type { Comensal } from '../types';
import { format } from 'date-fns';

interface ComensalFormProps {
  onAgregarComensal: (comensal: Omit<Comensal, 'id'>) => void;
}

export function ComensalForm({ onAgregarComensal }: ComensalFormProps) {
  const [formData, setFormData] = useState({
    dni: '',
    nombres: '',
    apellidos: '',
    empresa: '',
    cargo: '',
    fechaRegistro: format(new Date(), 'yyyy-MM-dd'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAgregarComensal(formData);
    setFormData({
      dni: '',
      nombres: '',
      apellidos: '',
      empresa: '',
      cargo: '',
      fechaRegistro: format(new Date(), 'yyyy-MM-dd'),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <UserPlus className="w-6 h-6" />
        Registrar Nuevo Comensal
      </h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
            DNI
          </label>
          <input
            type="text"
            id="dni"
            value={formData.dni}
            onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
            className="mt-1 block w-full"
            required
            pattern="[0-9]{8}"
            maxLength={8}
            title="DNI debe tener 8 dígitos"
          />
        </div>

        <div>
          <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700">
            Apellidos
          </label>
          <input
            type="text"
            id="apellidos"
            value={formData.apellidos}
            onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
            className="mt-1 block w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="nombres" className="block text-sm font-medium text-gray-700">
            Nombres
          </label>
          <input
            type="text"
            id="nombres"
            value={formData.nombres}
            onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
            className="mt-1 block w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="empresa" className="block text-sm font-medium text-gray-700">
            Empresa
          </label>
          <input
            type="text"
            id="empresa"
            value={formData.empresa}
            onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
            className="mt-1 block w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="cargo" className="block text-sm font-medium text-gray-700">
            Cargo
          </label>
          <input
            type="text"
            id="cargo"
            value={formData.cargo}
            onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
            className="mt-1 block w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Registrar Comensal
        </button>
      </div>
    </form>
  );
}