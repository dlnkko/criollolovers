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
    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg shadow-md p-3 border border-orange-200 max-w-xs mx-auto">
      {/* Total compacto */}
      <div className="text-center">
        <div className="text-xl font-bold text-red-600 mb-2">
          {PriceCalculator.formatearPrecio(total)}
        </div>
        <div className="text-xs text-gray-600 mb-2">
          {comidasSeleccionadas.length} {comidasSeleccionadas.length === 1 ? 'item' : 'items'}
        </div>
        
        {/* Información de entrega cuando está seleccionada */}
        {pasoActual === 'fecha-horario' && fechaSeleccionada && horarioSeleccionado && (
          <div className="border-t border-orange-200 pt-2 mt-2">
            <div className="text-sm text-orange-700 font-medium">
              📅 {formatearFecha(fechaSeleccionada)}
            </div>
            <div className="text-sm text-orange-700">
              🕐 {horarioSeleccionado}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
