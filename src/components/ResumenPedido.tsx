'use client'

import { usePedidosStore } from '@/store/pedidosStore'
import { PriceCalculator } from '@/utils/priceCalculator'
import { obtenerPrecioPrincipal } from '@/lib/supabaseClient'

interface ResumenPedidoProps {
  onConfirmar: () => void
  onEditar: () => void
}

export default function ResumenPedido({ onConfirmar, onEditar }: ResumenPedidoProps) {
  const { comidasSeleccionadas, fechaSeleccionada, horarioSeleccionado, total, actualizarCantidad, removerComida } = usePedidosStore()

  const formatearFecha = (fecha: string) => {
    // Crear fecha sin problemas de zona horaria
    const [year, month, day] = fecha.split('-').map(Number)
    const fechaObj = new Date(year, month - 1, day)
    
    return fechaObj.toLocaleDateString('es-PE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleCambiarCantidad = (comidaId: string, nuevaCantidad: number) => {
    if (nuevaCantidad <= 0) {
      removerComida(comidaId)
    } else {
      actualizarCantidad(comidaId, nuevaCantidad)
    }
  }

  const handleEliminarComida = (comidaId: string) => {
    removerComida(comidaId)
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Resumen de comidas mejorado */}
      <div className="bg-white rounded-2xl shadow-xl p-5 md:p-6 lg:p-8 border border-gray-100">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg mr-4">
            <span className="text-2xl md:text-3xl">🍽️</span>
          </div>
          <h3 className="text-xl md:text-2xl font-extrabold text-gray-900">
            Comidas seleccionadas
          </h3>
        </div>
        
        <div className="space-y-4 mb-6">
          {comidasSeleccionadas.map((comidaSeleccionada, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 md:p-5 border-2 border-gray-200 hover:border-orange-200 transition-all duration-300 hover:shadow-md">
              {/* Información del plato */}
              <div className="flex items-center space-x-4 mb-4">
                {comidaSeleccionada.comida.imagen ? (
                  <div className="relative flex-shrink-0">
                    <img 
                      src={comidaSeleccionada.comida.imagen} 
                      alt={comidaSeleccionada.comida.nombre}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl shadow-md border-2 border-gray-200"
                    />
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                      <span className="text-white font-bold text-xs">{comidaSeleccionada.cantidad}</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-md">
                    <span className="text-3xl sm:text-4xl">🍽️</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold text-gray-900 text-base sm:text-lg mb-1 truncate">{comidaSeleccionada.comida.nombre}</p>
                  <p className="text-sm text-gray-600">
                    {PriceCalculator.formatearPrecio(obtenerPrecioPrincipal(comidaSeleccionada.comida))} c/u
                  </p>
                </div>
              </div>
              
              {/* Controles de cantidad - Mejorados para responsive */}
              <div className="flex items-center justify-between space-x-3">
                <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => handleCambiarCantidad(comidaSeleccionada.comida.id, comidaSeleccionada.cantidad - 1)}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white hover:bg-red-50 text-red-600 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 border-2 border-transparent hover:border-red-200"
                    aria-label="Disminuir cantidad"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="w-10 sm:w-12 text-center font-extrabold text-gray-900 text-base sm:text-lg">
                    {comidaSeleccionada.cantidad}
                  </span>
                  <button
                    onClick={() => handleCambiarCantidad(comidaSeleccionada.comida.id, comidaSeleccionada.cantidad + 1)}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white hover:bg-green-50 text-green-600 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 border-2 border-transparent hover:border-green-200"
                    aria-label="Aumentar cantidad"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                
                {/* Botón eliminar */}
                <button
                  onClick={() => handleEliminarComida(comidaSeleccionada.comida.id)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white hover:bg-red-50 text-gray-600 hover:text-red-600 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 border-2 border-gray-200 hover:border-red-200"
                  title="Eliminar del pedido"
                  aria-label="Eliminar"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                
                {/* Precio total del item */}
                <div className="text-right min-w-[80px] sm:min-w-[100px]">
                  <p className="font-extrabold text-gray-900 text-base sm:text-lg md:text-xl">
                    {PriceCalculator.formatearPrecio(comidaSeleccionada.subtotal)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total incluido debajo de comidas */}
        <div className="border-t-2 border-gray-200 pt-5">
          <div className="flex justify-between items-center bg-gradient-to-r from-orange-500 to-orange-600 p-5 md:p-6 rounded-xl shadow-lg">
            <span className="text-lg md:text-xl font-extrabold text-white">Total a pagar:</span>
            <span className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg">
              {PriceCalculator.formatearPrecio(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Detalles de entrega mejorados */}
      <div className="bg-white rounded-2xl shadow-xl p-5 md:p-6 lg:p-8 border border-gray-100">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg mr-4">
            <span className="text-2xl md:text-3xl">📦</span>
          </div>
          <h3 className="text-xl md:text-2xl font-extrabold text-gray-900">
            Detalles de entrega
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <div className="p-5 md:p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                <span className="text-2xl">📅</span>
              </div>
              <div>
                <p className="text-xs md:text-sm font-semibold text-green-600 uppercase tracking-wide mb-1">Fecha de entrega</p>
                <p className="font-extrabold text-green-900 text-base md:text-lg">
                  {formatearFecha(fechaSeleccionada!)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-5 md:p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                <span className="text-2xl">🕐</span>
              </div>
              <div>
                <p className="text-xs md:text-sm font-semibold text-green-600 uppercase tracking-wide mb-1">Horario de entrega</p>
                <p className="font-extrabold text-green-900 text-base md:text-lg">{horarioSeleccionado}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botones de acción mejorados */}
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        <button
          onClick={onEditar}
          className="flex-1 bg-white hover:bg-gray-50 text-gray-800 font-bold py-4 px-6 rounded-xl transition-all duration-300 border-2 border-gray-300 hover:border-gray-400 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span>Editar pedido</span>
        </button>
        
        <button
          onClick={onConfirmar}
          className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95 flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <span>Confirmar pedido</span>
        </button>
      </div>
    </div>
  )
}
