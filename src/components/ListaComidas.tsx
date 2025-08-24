'use client'

import { useState, useEffect } from 'react'
import { Comida, esComplemento } from '@/lib/supabaseClient'
import { PedidosService } from '@/lib/pedidosService'
import { usePedidosStore } from '@/store/pedidosStore'
import ComidaCard from './ComidaCard'

export default function ListaComidas() {
  const [comidas, setComidas] = useState<Comida[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // const { comidasSeleccionadas } = usePedidosStore()

  useEffect(() => {
    cargarComidas()
  }, [])

  const cargarComidas = async () => {
    try {
      setLoading(true)
      const data = await PedidosService.obtenerComidas()
      setComidas(data)
    } catch (err) {
      setError('Error cargando comidas')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Separar comidas en platos principales y complementos
  const platosPrincipales = comidas.filter(comida => !esComplemento(comida))
  const complementos = comidas.filter(comida => esComplemento(comida))



  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={cargarComidas}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
        >
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Platos Principales - Carrusel Horizontal */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center">
              <span className="text-xl md:text-2xl mr-2">🍽️</span>
              <span className="hidden md:inline">Platos Principales</span>
              <span className="md:hidden">Principales</span>
            </h3>
            <div className="ml-2 md:ml-3 bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
              <span className="hidden md:inline">{platosPrincipales.length} platos</span>
              <span className="md:hidden">{platosPrincipales.length}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                const container = document.getElementById('carousel-principales')
                if (container) container.scrollLeft -= 200
              }}
              className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 cursor-pointer transform hover:scale-110"
            >
              ←
            </button>
            <button 
              onClick={() => {
                const container = document.getElementById('carousel-principales')
                if (container) container.scrollLeft += 200
              }}
              className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 cursor-pointer transform hover:scale-110"
            >
              →
            </button>
          </div>
        </div>
        
        {/* Carrusel horizontal */}
        <div className="relative">
          <div 
            id="carousel-principales"
            className="carousel-scroll overflow-x-auto pb-4"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="flex space-x-3 md:space-x-4" style={{ width: 'max-content' }}>
              {platosPrincipales.map((comida) => (
                <div 
                  key={comida.id} 
                  className="flex-shrink-0 w-52 md:w-60"
                >
                  <ComidaCard comida={comida} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Gradiente fade al final */}
          <div className="absolute top-0 right-0 w-6 h-full bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* Complementos - Grid tradicional */}
      {complementos.length > 0 && (
        <div>
          <div className="flex items-center mb-3 md:mb-4">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center">
              <span className="text-xl md:text-2xl mr-2">🥗</span>
              Complementos
            </h3>
            <div className="ml-2 md:ml-3 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
              <span className="hidden md:inline">{complementos.length} opciones</span>
              <span className="md:hidden">{complementos.length}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {complementos.map((comida) => (
              <ComidaCard key={comida.id} comida={comida} />
            ))}
          </div>
        </div>
      )}

      {/* Información sobre precios combo */}
      {platosPrincipales.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
          <div className="flex items-start space-x-2 sm:space-x-3">
            <div className="text-blue-600 text-base sm:text-lg">💡</div>
            <div className="text-blue-800">
              <p className="font-medium mb-1 text-sm sm:text-base">¡Combos disponibles!</p>
              <p className="text-xs sm:text-sm">
                Con 2+ platos principales = precio combo automático
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
