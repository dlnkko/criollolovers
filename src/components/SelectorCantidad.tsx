'use client'

import { usePedidosStore } from '@/store/pedidosStore'
import { ComidaSeleccionada, obtenerMinimoPorciones } from '@/lib/supabaseClient'
import { PriceCalculator } from '@/utils/priceCalculator'

interface SelectorCantidadProps {
  comidaSeleccionada: ComidaSeleccionada
}

export default function SelectorCantidad({ comidaSeleccionada }: SelectorCantidadProps) {
  const { actualizarCantidad, removerComida } = usePedidosStore()
  
  // Calcular precio unitario actual (ya incluye la lógica de combo)
  const precioUnitario = comidaSeleccionada.subtotal / comidaSeleccionada.cantidad
  
  // Obtener el mínimo de porciones para esta comida
  const minimoPorciones = obtenerMinimoPorciones(comidaSeleccionada.comida)

  const handleIncrementar = () => {
    actualizarCantidad(comidaSeleccionada.comida.id, comidaSeleccionada.cantidad + 1)
  }

  const handleDecrementar = () => {
    if (comidaSeleccionada.cantidad > minimoPorciones) {
      actualizarCantidad(comidaSeleccionada.comida.id, comidaSeleccionada.cantidad - 1)
    } else {
      removerComida(comidaSeleccionada.comida.id)
    }
  }

  const handleEliminar = () => {
    removerComida(comidaSeleccionada.comida.id)
  }

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-3 sm:p-4 border-2 border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between gap-2 sm:gap-3">
        {/* Información del producto - Izquierda - MÁXIMO ESPACIO */}
        <div className="flex-1 min-w-0 pr-2 sm:pr-3 flex-grow-[2] sm:flex-grow-[3]">
          <h4 className="font-bold text-gray-900 text-base sm:text-lg md:text-xl lg:text-2xl mb-1 leading-tight line-clamp-2">
            {comidaSeleccionada.comida.nombre}
          </h4>
          <div className="text-[10px] sm:text-xs text-gray-500 font-medium leading-tight mt-0.5">
            {PriceCalculator.formatearPrecio(precioUnitario)} c/u
          </div>
        </div>
        
        {/* Selector de cantidad - Centro - ULTRA COMPACTO */}
        <div className="flex items-center bg-gray-50 rounded-lg p-0.5 border-2 border-gray-200 flex-shrink-0">
          <button
            onClick={handleDecrementar}
            className="w-6 h-6 bg-white hover:bg-red-50 active:bg-red-100 rounded-md flex items-center justify-center text-gray-700 hover:text-red-600 font-bold transition-all duration-200 shadow-sm hover:shadow active:scale-95"
            aria-label="Disminuir cantidad"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
            </svg>
          </button>
          
          <span className="text-xs sm:text-sm font-extrabold text-gray-900 min-w-[1.5rem] text-center px-1">
            {comidaSeleccionada.cantidad}
          </span>
          
          <button
            onClick={handleIncrementar}
            className="w-6 h-6 bg-white hover:bg-green-50 active:bg-green-100 rounded-md flex items-center justify-center text-gray-700 hover:text-green-600 font-bold transition-all duration-200 shadow-sm hover:shadow active:scale-95"
            aria-label="Aumentar cantidad"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Precio total - Derecha - ULTRA COMPACTO */}
        <div className="text-right min-w-[45px] sm:min-w-[55px] flex-shrink-0">
          <div className="text-xs sm:text-sm font-extrabold text-orange-600">
            {PriceCalculator.formatearPrecio(comidaSeleccionada.subtotal)}
          </div>
        </div>
        
        {/* Botón eliminar - ULTRA COMPACTO */}
        <button
          onClick={handleEliminar}
          className="text-pink-400 hover:text-red-600 hover:bg-red-50 active:bg-red-100 p-1 rounded-md transition-all duration-200 active:scale-95 flex-shrink-0"
          title="Eliminar del pedido"
          aria-label="Eliminar"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  )
}
