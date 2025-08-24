// Tipos globales para evitar errores de TypeScript

export interface SesionUsuario {
  id: string
  usuario_id?: string | null
  session_id: string
  pagina_actual?: string | null
  paso_actual?: string | null
  carrito?: any
  total?: number
  fecha_inicio: string
  ultima_actividad: string
  dispositivo?: string | null
  navegador?: string | null
  ip_address?: string | null
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
}

export interface PedidoAbandonado {
  id: string
  usuario_id?: string | null
  session_id?: string | null
  carrito?: any
  total?: number
  paso_abandono?: string | null
  tiempo_en_sitio?: number
  fecha_abandono: string
  fecha_ultima_actividad?: string | null
  intentos_recuperacion: number
  recuperado: boolean
  motivo_abandono?: string | null
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  dispositivo?: string | null
  navegador?: string | null
  created_at: string
}

export interface SupabaseResponse<T> {
  data: T | null
  error: any
}
