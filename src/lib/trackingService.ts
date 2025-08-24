import { supabase } from './supabaseClient'

export interface PedidoAbandonado {
  id: string
  usuario_id: string
  comidas: Array<{
    comida: {
      id: string
      nombre: string
      precio: number
    }
    cantidad: number
    subtotal: number
  }>
  fecha: string
  horario: string
  total: number
  created_at?: string
}

export class TrackingService {
  // Guardar pedido abandonado para análisis posterior
  static async guardarPedidoAbandonado(pedido: Omit<PedidoAbandonado, 'id' | 'created_at'>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('pedidos_abandonados')
        .insert([pedido])
      
      if (error) throw error
      return true
    } catch (error) {
      console.error('Error guardando pedido abandonado:', error)
      return false
    }
  }

  // Obtener estadísticas de pedidos abandonados
  static async obtenerEstadisticasAbandono(): Promise<{
    total: number
    porDia: number
    comidasMasAbandonadas: string[]
  }> {
    try {
      const { data, error } = await supabase
        .from('pedidos_abandonados')
        .select('*')
      
      if (error) throw error
      
      const total = data?.length || 0
      const hoy = new Date().toISOString().split('T')[0]
      const porDia = data?.filter(p => p.created_at?.startsWith(hoy)).length || 0
      
      // Contar comidas más abandonadas
      const comidasCount: { [key: string]: number } = {}
      data?.forEach(pedido => {
        pedido.comidas.forEach((comida: {
          comida: { nombre: string }
          cantidad: number
          subtotal: number
        }) => {
          const nombre = comida.comida.nombre
          comidasCount[nombre] = (comidasCount[nombre] || 0) + 1
        })
      })
      
      const comidasMasAbandonadas = Object.entries(comidasCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([nombre]) => nombre)
      
      return { total, porDia, comidasMasAbandonadas }
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error)
      return { total: 0, porDia: 0, comidasMasAbandonadas: [] }
    }
  }
}
