import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { format, getHours } from 'date-fns';
import type { Comida } from '../types';

interface QRScannerProps {
  onScanSuccess: (comensalId: string, comida: Comida) => void;
}

export function QRScanner({ onScanSuccess }: QRScannerProps) {
  const [error, setError] = useState<string>('');

  const determinarComida = (): Comida => {
    const hora = getHours(new Date());
    if (hora >= 6 && hora < 10) return 'desayuno';
    if (hora >= 12 && hora < 15) return 'almuerzo';
    if (hora >= 18 && hora < 21) return 'cena';
    throw new Error('Fuera del horario de comidas');
  };

  useEffect(() => {
    try {
      const scanner = new Html5QrcodeScanner('reader', {
        qrbox: { width: 250, height: 250 },
        fps: 5,
      }, false);

      scanner.render((decodedText) => {
        try {
          const comidaActual = determinarComida();
          const data = JSON.parse(decodedText);
          onScanSuccess(data.id, comidaActual);
          scanner.clear();
        } catch (e) {
          if (e instanceof Error) {
            setError(e.message);
          }
        }
      }, (error) => {
        console.error(error);
      });

      return () => {
        scanner.clear();
      };
    } catch (e) {
      console.error('Error initializing scanner:', e);
    }
  }, [onScanSuccess]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Escanear QR para Registro de Asistencia
      </h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div id="reader" className="w-full"></div>
    </div>
  );
}