import { Comida, obtenerPrecioComida, contarPlatosPrincipales, esComplemento, obtenerMinimoPorciones } from '@/lib/supabaseClient'
import { PriceCalculator } from '@/utils/priceCalculator'
import { usePedidosStore } from '@/store/pedidosStore'

interface ComidaCardProps {
  comida: Comida
}

export default function ComidaCard({ comida }: ComidaCardProps) {
  const { agregarComida, comidasSeleccionadas, actualizarCantidad } = usePedidosStore()

  // Encontrar si la comida ya está seleccionada y su cantidad
  const comidaSeleccionada = comidasSeleccionadas.find(cs => cs.comida.id === comida.id)
  const cantidadActual = comidaSeleccionada?.cantidad || 0
  
  // Verificar si es plato principal
  const esPlatoPrincipal = !esComplemento(comida)
  
  // Calcular si habría combo si se agrega esta comida
  const platosPrincipalesActuales = contarPlatosPrincipales(comidasSeleccionadas)
  const esComplementoEsta = ['Puré de Papa', 'Arroz Blanco', 'Papa a la Huancaína'].includes(comida.nombre)
  const platosDespues = esComplementoEsta ? platosPrincipalesActuales : platosPrincipalesActuales + 1
  const habríaCombo = platosDespues >= 3
  
  // Mostrar el precio que tendría esta comida
  const precioMostrar = obtenerPrecioComida(comida, habríaCombo)

  const handleAgregar = () => {
    const minimoPorciones = obtenerMinimoPorciones(comida)
    
    if (cantidadActual === 0) {
      // Primera vez agregando: agregar el mínimo de porciones
      agregarComida(comida, minimoPorciones)
    } else {
      // Ya existe: agregar de 1 en 1
      actualizarCantidad(comida.id, cantidadActual + 1)
    }
  }

  return (
    <div className={`bg-white rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${
      cantidadActual > 0
        ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100/50 shadow-2xl ring-4 ring-orange-200/50'
        : 'border-gray-200 hover:border-orange-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
    } shadow-lg p-4 md:p-5 w-full h-auto min-h-[280px] md:min-h-[320px] flex flex-col overflow-hidden`}>
      
      {/* Imagen */}
      <div className="relative mb-4 flex-shrink-0 rounded-xl overflow-hidden">
        <div className="w-full h-28 md:h-32 bg-gradient-to-br from-gray-100 to-gray-200 relative">
          <img 
            src={comida.imagen || '/placeholder-food.jpg'} 
            alt={comida.nombre}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-food.jpg'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        {habríaCombo && platosPrincipalesActuales > 0 && (
          <span className="absolute top-3 right-3 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 px-3 py-1.5 rounded-full shadow-lg animate-pulse border-2 border-white/50">
            ⚡ ¡Combo!
          </span>
        )}
        {cantidadActual > 0 && (
          <div className="absolute top-3 left-3 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-xl border-2 border-white">
            <span className="text-white font-bold text-sm md:text-base">{cantidadActual}</span>
          </div>
        )}
      </div>
      
      {/* Nombre */}
      <div className="mb-4 flex-shrink-0 flex-grow">
        <h3 className="font-extrabold text-gray-900 text-lg md:text-xl leading-tight text-center line-clamp-2">
          {comida.nombre}
        </h3>
      </div>
      
      {/* Botón horizontal */}
      <div className="flex-shrink-0 mt-auto">
        {cantidadActual === 0 ? (
          <button
            onClick={handleAgregar}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            <span>Agregar</span>
          </button>
        ) : (
          <div className="w-full flex items-center bg-gradient-to-r from-green-500 to-green-600 rounded-xl overflow-hidden shadow-lg">
            <div className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3.5 px-4 text-center text-sm md:text-base flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span>Agregado ({cantidadActual})</span>
            </div>
            <button
              onClick={handleAgregar}
              className="bg-green-700 hover:bg-green-800 text-white font-extrabold py-3.5 px-4 transition-all duration-300 cursor-pointer transform hover:scale-110 active:scale-95 text-base md:text-lg shadow-lg hover:shadow-xl border-l-2 border-green-400/30"
            >
              +1
            </button>
          </div>
        )}
      </div>
    </div>
  )
}