'use client'

import { usePedidosStore } from '@/store/pedidosStore'
import { PriceCalculator } from '@/utils/priceCalculator'

interface SimuladorPreciosProps {
  mostrarEnResumen?: boolean
  pasoActual?: 'seleccion' | 'fecha-horario' | 'resumen' | 'pago'
}

export default function SimuladorPrecios({ mostrarEnResumen = false, pasoActual = 'seleccion' }: SimuladorPreciosProps) {
  const { comidasSeleccionadas, total, fechaSeleccionada, horarioSeleccionado } = usePedidosStore()

  if (comidasSeleccionadas.length === 0) {
    return null
  }

  // Si estamos en la pestaña de resumen, no mostrar el cuadro
  if (mostrarEnResumen) {
    return null
  }

  const formatearFecha = (fecha: string) => {
    // Crear fecha sin problemas de zona horaria
    const [year, month, day] = fecha.split('-').map(Number)
    const fechaObj = new Date(year, month - 1, day)
    
    return fechaObj.toLocaleDateString('es-PE', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 rounded-2xl shadow-2xl p-5 md:p-6 border-2 border-orange-400/50 max-w-xs mx-auto relative overflow-hidden">
      {/* Efecto de brillo decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
      
      {/* Total compacto */}
      <div className="text-center relative z-10">
        <div className="text-xs md:text-sm font-semibold text-white/90 mb-2 uppercase tracking-wide">
          Total del Pedido
        </div>
        <div className="text-3xl md:text-4xl font-extrabold text-white mb-3 drop-shadow-lg">
          {PriceCalculator.formatearPrecio(total)}
        </div>
        <div className="inline-flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.4-2M7 13l-2.5 5h15.5" />
          </svg>
          <span className="text-xs md:text-sm text-white font-bold">
            {comidasSeleccionadas.length} {comidasSeleccionadas.length === 1 ? 'item' : 'items'}
          </span>
        </div>
        
        {/* Información de entrega cuando está seleccionada */}
        {pasoActual === 'fecha-horario' && fechaSeleccionada && horarioSeleccionado && (
          <div className="border-t-2 border-white/30 pt-4 mt-4 space-y-2">
            <div className="flex items-center justify-center space-x-2 text-sm text-white font-semibold">
              <span className="text-lg">📅</span>
              <span>{formatearFecha(fechaSeleccionada)}</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-white font-semibold">
              <span className="text-lg">🕐</span>
              <span>{horarioSeleccionado}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
