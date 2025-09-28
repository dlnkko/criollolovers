import { supabase, Comida, Pedido, validateSupabaseConfig } from './supabaseClient'

export class PedidosService {
  // Obtener todas las comidas disponibles
  static async obtenerComidas(): Promise<Comida[]> {
    try {
      validateSupabaseConfig()
      const { data, error } = await supabase
        .from('comidas')
        .select('*')
        .order('nombre')
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error obteniendo comidas:', error)
      return []
    }
  }

  // Crear un nuevo pedido
  static async crearPedido(pedido: Omit<Pedido, 'id' | 'created_at'>): Promise<Pedido | null> {
    try {
      validateSupabaseConfig()
      const { data, error } = await supabase
        .from('pedidos')
        .insert([pedido])
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creando pedido:', error)
      return null
    }
  }

  // Obtener pedidos de un usuario
  static async obtenerPedidosUsuario(usuarioId: string): Promise<Pedido[]> {
    try {
      validateSupabaseConfig()
      const { data, error } = await supabase
        .from('pedidos')
        .select('*')
        .eq('usuario_id', usuarioId)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error obteniendo pedidos:', error)
      return []
    }
  }

  // Actualizar estado de un pedido
  static async actualizarEstadoPedido(pedidoId: string, estado: Pedido['estado']): Promise<boolean> {
    try {
      validateSupabaseConfig()
      const { error } = await supabase
        .from('pedidos')
        .update({ estado })
        .eq('id', pedidoId)
      
      if (error) throw error
      return true
    } catch (error) {
      console.error('Error actualizando pedido:', error)
      return false
    }
  }
}
