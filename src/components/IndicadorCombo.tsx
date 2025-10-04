'use client'

import { usePedidosStore } from '@/store/pedidosStore'
import { contarPlatosPrincipales } from '@/lib/supabaseClient'

export default function IndicadorCombo() {
  const { comidasSeleccionadas } = usePedidosStore()
  const platosPrincipales = contarPlatosPrincipales(comidasSeleccionadas)
  const hayCombo = platosPrincipales >= 3

  if (comidasSeleccionadas.length === 0) return null

  return (
    <div className={`p-3 rounded-lg border-2 ${
      hayCombo 
        ? 'bg-green-50 border-green-300' 
        : 'bg-blue-50 border-blue-300'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium text-gray-800">
            {hayCombo ? '🎉 ¡Combo Activado!' : '🍽️ Plato Individual'}
          </h4>
          <p className="text-sm text-gray-600">
            {platosPrincipales} plato{platosPrincipales !== 1 ? 's' : ''} principal{platosPrincipales !== 1 ? 'es' : ''}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-800">
            {hayCombo ? 'Precios rebajados' : 'Precio normal'}
          </p>
          <p className="text-xs text-gray-500">
            {hayCombo 
              ? 'Usando precio2 para platos principales' 
              : 'Usando precio1 para platos principales'
            }
          </p>
        </div>
      </div>
      
      {!hayCombo && platosPrincipales < 3 && (
        <div className="mt-2 p-2 bg-orange-100 rounded border border-orange-200">
          <p className="text-xs text-orange-700">
            💡 <strong>Tip:</strong> Agrega {3 - platosPrincipales} plato{3 - platosPrincipales !== 1 ? 's' : ''} principal{3 - platosPrincipales !== 1 ? 'es' : ''} más para activar precios combo
          </p>
        </div>
      )}
    </div>
  )
}
