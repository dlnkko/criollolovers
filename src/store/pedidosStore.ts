import { create } from 'zustand'
import { 
  Comida, 
  ComidaSeleccionada, 
  obtenerPrecioPrincipal,
  contarPlatosPrincipales,
  obtenerPrecioComida
} from '@/lib/supabaseClient'

interface PedidosState {
  comidasSeleccionadas: ComidaSeleccionada[]
  fechaSeleccionada: string
  horarioSeleccionado: string
  total: number
  
  // Acciones
  agregarComida: (comida: Comida, cantidad: number) => void
  actualizarCantidad: (comidaId: string, cantidad: number) => void
  removerComida: (comidaId: string) => void
  setFechaSeleccionada: (fecha: string) => void
  setHorarioSeleccionado: (horario: string) => void
  calcularTotal: () => void
  recalcularPrecios: () => void  // Nueva función para recalcular precios dinámicos
  limpiarPedido: () => void
}

export const usePedidosStore = create<PedidosState>((set, get) => ({
  comidasSeleccionadas: [],
  fechaSeleccionada: '',
  horarioSeleccionado: '',
  total: 0,

  agregarComida: (comida: Comida, cantidad: number) => {
    const { comidasSeleccionadas } = get()
    const comidaExistente = comidasSeleccionadas.find(cs => cs.comida.id === comida.id)
    
    if (comidaExistente) {
      // Actualizar cantidad si ya existe
      get().actualizarCantidad(comida.id, comidaExistente.cantidad + cantidad)
    } else {
      // Agregar nueva comida y recalcular precios inmediatamente
      const nuevaComida: ComidaSeleccionada = {
        comida,
        cantidad,
        subtotal: 0
      }
      
      const nuevasComidasSeleccionadas = [...comidasSeleccionadas, nuevaComida]
      
      // Calcular si hay combo con la nueva lista
      const platosPrincipales = contarPlatosPrincipales(nuevasComidasSeleccionadas)
      const hayCombo = platosPrincipales >= 2
      
      // Recalcular todos los subtotales
      const comidasConPreciosCorrectos = nuevasComidasSeleccionadas.map(cs => ({
        ...cs,
        subtotal: obtenerPrecioComida(cs.comida, hayCombo) * cs.cantidad
      }))
      
      set({ comidasSeleccionadas: comidasConPreciosCorrectos })
      get().calcularTotal()
    }
  },

  actualizarCantidad: (comidaId: string, cantidad: number) => {
    if (cantidad <= 0) {
      get().removerComida(comidaId)
      return
    }

    set(state => ({
      comidasSeleccionadas: state.comidasSeleccionadas.map(cs => 
        cs.comida.id === comidaId 
          ? { ...cs, cantidad }
          : cs
      )
    }))
    get().recalcularPrecios()
  },

  removerComida: (comidaId: string) => {
    set(state => ({
      comidasSeleccionadas: state.comidasSeleccionadas.filter(cs => cs.comida.id !== comidaId)
    }))
    get().recalcularPrecios()
  },

  setFechaSeleccionada: (fecha: string) => {
    set({ fechaSeleccionada: fecha })
  },

  setHorarioSeleccionado: (horario: string) => {
    set({ horarioSeleccionado: horario })
  },

  recalcularPrecios: () => {
    const { comidasSeleccionadas } = get()
    
    if (comidasSeleccionadas.length === 0) {
      set({ total: 0 })
      return
    }
    
    const platosPrincipales = contarPlatosPrincipales(comidasSeleccionadas)
    const hayCombo = platosPrincipales >= 2
    
    console.log('🔄 Recalculando precios:', {
      totalComidas: comidasSeleccionadas.length,
      platosPrincipales,
      hayCombo,
      comidas: comidasSeleccionadas.map(cs => cs.comida.nombre)
    })
    
    // Recalcular subtotales con la lógica de combo
    const comidasActualizadas = comidasSeleccionadas.map(cs => {
      const precioUnitario = obtenerPrecioComida(cs.comida, hayCombo)
      const subtotal = precioUnitario * cs.cantidad
      
      console.log(`💰 ${cs.comida.nombre}: ${precioUnitario} x ${cs.cantidad} = ${subtotal}`)
      
      return {
        ...cs,
        subtotal
      }
    })
    
    set({ comidasSeleccionadas: comidasActualizadas })
    get().calcularTotal()
  },

  calcularTotal: () => {
    const { comidasSeleccionadas } = get()
    const total = comidasSeleccionadas.reduce((sum, cs) => sum + cs.subtotal, 0)
    set({ total })
  },

  limpiarPedido: () => {
    set({
      comidasSeleccionadas: [],
      fechaSeleccionada: '',
      horarioSeleccionado: '',
      total: 0
    })
  }
}))
