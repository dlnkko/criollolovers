import { Comida, obtenerPrecioComida, contarPlatosPrincipales, esComplemento } from '@/lib/supabaseClient'
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
  const habríaCombo = platosDespues >= 2
  
  // Mostrar el precio que tendría esta comida
  const precioMostrar = obtenerPrecioComida(comida, habríaCombo)

  const handleAgregar = () => {
    // Para platos principales, validar mínimo 3 porciones
    if (esPlatoPrincipal) {
      if (cantidadActual === 0) {
        // Primera vez agregando: agregar 3 porciones mínimo
        agregarComida(comida, 3)
      } else {
        // Ya existe: agregar de 1 en 1
        actualizarCantidad(comida.id, cantidadActual + 1)
      }
    } else {
      // Para complementos: funciona normal (1 en 1)
      if (cantidadActual === 0) {
        agregarComida(comida, 1)
      } else {
        actualizarCantidad(comida.id, cantidadActual + 1)
      }
    }
  }

  return (
    <div className={`bg-white rounded-lg border-2 transition-all duration-300 cursor-pointer ${
      cantidadActual > 0
        ? 'border-orange-500 bg-orange-50 shadow-xl'
        : 'border-gray-200 hover:border-orange-200 hover:shadow-md hover:scale-102'
    } shadow-sm p-3 md:p-4 w-full h-56 md:h-60 flex flex-col overflow-hidden`}>
      
      {/* Imagen */}
      <div className="relative mb-3 flex-shrink-0">
        <img 
          src={comida.imagen || '/placeholder-food.jpg'} 
          alt={comida.nombre}
          className="w-full h-20 md:h-24 object-cover rounded-lg bg-gray-100"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-food.jpg'
          }}
        />
        {habríaCombo && platosPrincipalesActuales > 0 && (
          <span className="absolute top-2 right-2 text-xs text-orange-600 font-medium bg-orange-100 px-2 py-1 rounded-full animate-pulse">
            ¡Combo!
          </span>
        )}
      </div>
      
      {/* Nombre */}
      <div className="mb-2 flex-shrink-0">
        <h3 className="font-bold text-gray-800 text-base md:text-lg leading-tight text-center">
          {comida.nombre}
        </h3>
      </div>
      
      
      {/* Precio oculto - no mostrar en ComidaCard */}
      
      {/* Botón horizontal */}
      <div className="flex-shrink-0">
        {cantidadActual === 0 ? (
          <button
            onClick={handleAgregar}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 cursor-pointer transform hover:scale-105 mt-4"
          >
            {esPlatoPrincipal ? 'Agregar' : 'Agregar'}
          </button>
        ) : (
          <div className="w-full mt-4 flex items-center bg-green-500 rounded-lg overflow-hidden">
            <div className="flex-1 bg-green-500 text-white font-semibold py-2 md:py-3 px-2 md:px-4 text-center text-sm md:text-base">
              Agregado ({cantidadActual})
            </div>
            <button
              onClick={handleAgregar}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 md:py-3 px-2 md:px-4 transition-all duration-300 cursor-pointer transform hover:scale-110 text-sm md:text-base"
            >
              +1
            </button>
          </div>
        )}
      </div>
    </div>
  )
}