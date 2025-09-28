import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Función para validar variables de entorno solo cuando se necesite
function validateSupabaseConfig() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(`
❌ Missing Supabase environment variables:
- NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? '✅' : '❌ Missing'}
- NEXT_PUBLIC_SUPABASE_ANON_KEY: ${supabaseAnonKey ? '✅' : '❌ Missing'}

Please add these to your .env.local file and Vercel environment variables.
    `)
  }
}

// Crear cliente Supabase solo si las variables existen
let supabase: any = null

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
  // Crear un cliente mock para evitar errores durante build
  supabase = {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => Promise.resolve({ data: null, error: null }),
      delete: () => Promise.resolve({ data: null, error: null })
    })
  }
}

export { supabase, validateSupabaseConfig }

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
