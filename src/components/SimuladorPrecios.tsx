'use client'

import { usePedidosStore } from '@/store/pedidosStore'
import { PriceCalculator } from '@/utils/priceCalculator'

interface SimuladorPreciosProps {
  mostrarEnResumen?: boolean
}

export default function SimuladorPrecios({ mostrarEnResumen = false }: SimuladorPreciosProps) {
  const { comidasSeleccionadas, total } = usePedidosStore()

  if (comidasSeleccionadas.length === 0) {
    return null
  }

  // Si estamos en la pestaña de resumen, no mostrar el cuadro
  if (mostrarEnResumen) {
    return null
  }

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg shadow-md p-3 border border-orange-200">
      {/* Total compacto */}
      <div className="text-center mb-3">
        <div className="text-xl font-bold text-red-600 mb-1">
          {PriceCalculator.formatearPrecio(total)}
        </div>
        <div className="text-xs text-gray-600">
          {comidasSeleccionadas.length} {comidasSeleccionadas.length === 1 ? 'item' : 'items'}
        </div>
      </div>
    </div>
  )
}
