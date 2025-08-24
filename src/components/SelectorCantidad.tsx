'use client'

import { usePedidosStore } from '@/store/pedidosStore'
import { ComidaSeleccionada } from '@/lib/supabaseClient'
import { PriceCalculator } from '@/utils/priceCalculator'

interface SelectorCantidadProps {
  comidaSeleccionada: ComidaSeleccionada
}

export default function SelectorCantidad({ comidaSeleccionada }: SelectorCantidadProps) {
  const { actualizarCantidad, removerComida } = usePedidosStore()
  
  // Calcular precio unitario actual (ya incluye la lógica de combo)
  const precioUnitario = comidaSeleccionada.subtotal / comidaSeleccionada.cantidad

  const handleIncrementar = () => {
    actualizarCantidad(comidaSeleccionada.comida.id, comidaSeleccionada.cantidad + 1)
  }

  const handleDecrementar = () => {
    if (comidaSeleccionada.cantidad > 1) {
      actualizarCantidad(comidaSeleccionada.comida.id, comidaSeleccionada.cantidad - 1)
    } else {
      removerComida(comidaSeleccionada.comida.id)
    }
  }

  const handleEliminar = () => {
    removerComida(comidaSeleccionada.comida.id)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0 mr-3">
          <h4 className="font-medium text-gray-800 text-sm truncate">
            {comidaSeleccionada.comida.nombre}
          </h4>
          <div className="text-xs text-gray-500">
            {PriceCalculator.formatearPrecio(precioUnitario)} × {comidaSeleccionada.cantidad}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDecrementar}
            className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold text-sm transition-colors duration-200"
          >
            -
          </button>
          
          <span className="text-lg font-bold text-gray-800 min-w-[2rem] text-center">
            {comidaSeleccionada.cantidad}
          </span>
          
          <button
            onClick={handleIncrementar}
            className="w-6 h-6 bg-amber-100 hover:bg-amber-200 rounded-full flex items-center justify-center text-amber-800 font-bold text-sm transition-colors duration-200"
          >
            +
          </button>
        </div>

        <div className="text-right ml-2">
          <div className="text-sm font-bold text-orange-600">
            {PriceCalculator.formatearPrecio(comidaSeleccionada.subtotal)}
          </div>
        </div>
        
        <button
          onClick={handleEliminar}
          className="text-red-500 hover:text-red-700 p-1 ml-1"
          title="Eliminar del pedido"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
