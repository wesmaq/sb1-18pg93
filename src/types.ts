export interface Comensal {
  id: string;
  dni: string;
  nombres: string;
  apellidos: string;
  empresa: string;
  cargo: string;
  fechaRegistro: string;
}

export interface Asistencia {
  comensalId: string;
  fecha: string;
  desayuno: boolean;
  almuerzo: boolean;
  cena: boolean;
  registros: {
    desayuno?: string;
    almuerzo?: string;
    cena?: string;
  };
}

export type Comida = 'desayuno' | 'almuerzo' | 'cena';