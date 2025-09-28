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
    return new Date(fecha).toLocaleDateString('es-PE', {
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
    <div className="space-y-6">
      {/* Resumen de comidas */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          🍽️ Comidas seleccionadas
        </h3>
        
        <div className="space-y-3 mb-4">
          {comidasSeleccionadas.map((comidaSeleccionada, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {comidaSeleccionada.comida.imagen ? (
                  <img 
                    src={comidaSeleccionada.comida.imagen} 
                    alt={comidaSeleccionada.comida.nombre}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-2xl">🍽️</span>
                )}
                <div>
                  <p className="font-medium text-gray-800">{comidaSeleccionada.comida.nombre}</p>
                  <p className="text-sm text-gray-500">
                    {PriceCalculator.formatearPrecio(obtenerPrecioPrincipal(comidaSeleccionada.comida))} c/u
                  </p>
                </div>
              </div>
              
              {/* Controles de cantidad */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleCambiarCantidad(comidaSeleccionada.comida.id, comidaSeleccionada.cantidad - 1)}
                    className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors duration-200"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium text-gray-800">
                    {comidaSeleccionada.cantidad}
                  </span>
                  <button
                    onClick={() => handleCambiarCantidad(comidaSeleccionada.comida.id, comidaSeleccionada.cantidad + 1)}
                    className="w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 text-green-600 flex items-center justify-center transition-colors duration-200"
                  >
                    +
                  </button>
                </div>
                
                {/* Botón eliminar */}
                <button
                  onClick={() => handleEliminarComida(comidaSeleccionada.comida.id)}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-red-200 text-gray-600 hover:text-red-600 flex items-center justify-center transition-colors duration-200"
                  title="Eliminar del pedido"
                >
                  🗑️
                </button>
                
                {/* Precio total del item */}
                <div className="text-right min-w-[80px]">
                  <p className="font-semibold text-gray-800">
                    {PriceCalculator.formatearPrecio(comidaSeleccionada.subtotal)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total incluido debajo de comidas */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center bg-red-50 p-4 rounded-lg">
            <span className="text-lg font-semibold text-gray-800">Total a pagar:</span>
            <span className="text-2xl font-bold text-red-600">
              {PriceCalculator.formatearPrecio(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Detalles de entrega */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          📦 Detalles de entrega
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📅</span>
              <div>
                <p className="text-sm text-green-600">Fecha de entrega</p>
                <p className="font-semibold text-green-800">
                  {formatearFecha(fechaSeleccionada!)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🕐</span>
              <div>
                <p className="text-sm text-green-600">Horario de entrega</p>
                <p className="font-semibold text-green-800">{horarioSeleccionado}</p>
              </div>
            </div>
          </div>
        </div>
      </div>



      

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onEditar}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 border-2 border-gray-200 hover:border-gray-300"
        >
          ✏️ Editar pedido
        </button>
        
        <button
          onClick={onConfirmar}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          📱 Confirmar pedido
        </button>
      </div>
    </div>
  )
}
