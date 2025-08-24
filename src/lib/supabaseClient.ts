import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para la base de datos
export interface Comida {
  id: string
  nombre: string
  descripcion?: string  // Breve descripción del plato
  imagen?: string      // URL de la imagen del plato
  precio1: number      // Precio individual
  precio2: number      // Precio cuando hay combo (2+ platos principales)
  costo: number        // Costo en tu tabla
  created_at?: string
}

// Lista de complementos que no afectan el sistema de combo
const COMPLEMENTOS = [
  'Puré de Papa',
  'Arroz Blanco', 
  'Papa a la Huancaína'
  // Arroz con Pollo ES un plato principal, no complemento
]

export interface Pedido {
  id: string
  usuario_id: string
  comidas: ComidaSeleccionada[]
  fecha: string
  horario: string
  total: number
  estado: 'pendiente' | 'confirmado' | 'cancelado'
  created_at?: string
}

export interface ComidaSeleccionada {
  comida: Comida
  cantidad: number
  subtotal: number
}

// Función para verificar si una comida es complemento
export function esComplemento(comida: Comida): boolean {
  return COMPLEMENTOS.includes(comida.nombre)
}

// Función para contar platos principales en una selección
export function contarPlatosPrincipales(comidasSeleccionadas: ComidaSeleccionada[]): number {
  return comidasSeleccionadas.filter(cs => !esComplemento(cs.comida)).length
}

// Función para obtener el precio correcto según la lógica de combo
export function obtenerPrecioComida(comida: Comida, hayCombo: boolean): number {
  // Los complementos siempre usan precio1 (precio fijo)
  if (esComplemento(comida)) {
    return comida.precio1 ?? comida.costo ?? 0
  }
  
  // Platos principales: precio2 si hay combo, precio1 si está solo
  if (hayCombo) {
    return comida.precio2 ?? comida.precio1 ?? 0
  } else {
    return comida.precio1 ?? comida.precio2 ?? 0
  }
}

// Función helper para obtener el precio principal (para compatibilidad)
export function obtenerPrecioPrincipal(comida: Comida): number {
  return comida.precio1 ?? comida.precio2 ?? comida.costo ?? 0
}
