'use client'

import { useState, useEffect } from 'react'
import { usePedidosStore } from '@/store/pedidosStore'
import { PedidosService } from '@/lib/pedidosService'
import { Comida, contarPlatosPrincipales, obtenerPrecioComida, esComplemento } from '@/lib/supabaseClient'
import { PriceCalculator } from '@/utils/priceCalculator'

export default function PruebaPreciosDinamicos() {
  const [comidas, setComidas] = useState<Comida[]>([])
  const { comidasSeleccionadas, agregarComida, limpiarPedido } = usePedidosStore()
  
  useEffect(() => {
    cargarComidas()
  }, [])

  const cargarComidas = async () => {
    const data = await PedidosService.obtenerComidas()
    setComidas(data.slice(0, 6)) // Solo las primeras 6 para la prueba
  }

  const platosPrincipales = contarPlatosPrincipales(comidasSeleccionadas)
  const hayCombo = platosPrincipales >= 2

  const agregarComidaPrueba = (comida: Comida) => {
    agregarComida(comida, 1)
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">🧪 Prueba de Precios Dinámicos</h3>
      
      {/* Estado actual */}
      <div className={`p-4 rounded-lg mb-6 ${
        hayCombo ? 'bg-green-100 border border-green-300' : 'bg-blue-100 border border-blue-300'
      }`}>
        <h4 className="font-semibold mb-2">
          Estado actual: {hayCombo ? '🎉 Combo Activado' : '🍽️ Precio Individual'}
        </h4>
        <p className="text-sm text-gray-600">
          Platos principales: {platosPrincipales} | 
          Total comidas: {comidasSeleccionadas.length} |
          Total: {PriceCalculator.formatearPrecio(comidasSeleccionadas.reduce((sum, cs) => sum + cs.subtotal, 0))}
        </p>
      </div>

      {/* Comidas disponibles para prueba */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {comidas.map((comida) => {
          const precio1 = comida.precio1 || 0
          const precio2 = comida.precio2 || 0
          const esComplementoEsta = esComplemento(comida)
          const precioActual = obtenerPrecioComida(comida, hayCombo)
          const yaSeleccionada = comidasSeleccionadas.some(cs => cs.comida.id === comida.id)

          return (
            <div key={comida.id} className={`p-4 border rounded-lg ${
              yaSeleccionada ? 'bg-orange-50 border-orange-300' : 'bg-gray-50 border-gray-200'
            }`}>
              <h5 className="font-medium mb-2">{comida.nombre}</h5>
              <div className="text-sm space-y-1 mb-3">
                <div className="flex justify-between">
                  <span>Precio1 (individual):</span>
                  <span className="font-medium">{PriceCalculator.formatearPrecio(precio1)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Precio2 (combo):</span>
                  <span className="font-medium">{PriceCalculator.formatearPrecio(precio2)}</span>
                </div>
                <div className="flex justify-between border-t pt-1">
                  <span>Precio actual:</span>
                  <span className={`font-bold ${hayCombo && !esComplementoEsta ? 'text-green-600' : 'text-blue-600'}`}>
                    {PriceCalculator.formatearPrecio(precioActual)}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Tipo: {esComplementoEsta ? 'Complemento' : 'Plato principal'}
                </div>
              </div>
              <button
                onClick={() => agregarComidaPrueba(comida)}
                disabled={yaSeleccionada}
                className={`w-full py-2 px-3 rounded text-sm font-medium ${
                  yaSeleccionada 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {yaSeleccionada ? '✓ Agregado' : '+ Agregar'}
              </button>
            </div>
          )
        })}
      </div>

      {/* Pedido actual */}
      {comidasSeleccionadas.length > 0 && (
        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3">Pedido Actual:</h4>
          <div className="space-y-2">
            {comidasSeleccionadas.map((cs, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                <div>
                  <span className="font-medium">{cs.comida.nombre}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({esComplemento(cs.comida) ? 'Complemento' : 'Principal'})
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-medium">{PriceCalculator.formatearPrecio(cs.subtotal)}</div>
                  <div className="text-xs text-gray-500">
                    {PriceCalculator.formatearPrecio(cs.subtotal / cs.cantidad)} c/u
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button
            onClick={limpiarPedido}
            className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            🗑️ Limpiar Pedido
          </button>
        </div>
      )}

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h5 className="font-medium mb-2">📝 Instrucciones de Prueba:</h5>
        <ol className="text-sm space-y-1 list-decimal list-inside">
          <li>Agrega un plato principal (ej: Ají de Gallina) → Ver precio individual</li>
          <li>Agrega otro plato principal (ej: Carapulcra) → Ver cambio a precios combo</li>
          <li>Agrega complementos → Ver que mantienen precio fijo</li>
          <li>Observa cómo cambian los precios automáticamente</li>
        </ol>
      </div>
    </div>
  )
}
