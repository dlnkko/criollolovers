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
    <div className="space-y-10 md:space-y-12">
      {/* Platos Principales - Carrusel Horizontal */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
              <span className="text-2xl md:text-3xl">🍽️</span>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 flex items-center">
                <span className="hidden md:inline">Platos Principales</span>
                <span className="md:hidden">Principales</span>
              </h3>
              <p className="text-sm text-gray-600 hidden md:block">Deliciosos platos criollos</p>
            </div>
            <div className="ml-2 md:ml-4 bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 text-xs font-bold px-3 py-1.5 rounded-full border border-orange-200 shadow-sm">
              <span className="hidden md:inline">{platosPrincipales.length} platos</span>
              <span className="md:hidden">{platosPrincipales.length}</span>
            </div>
          </div>
        </div>
        
        {/* Controles del carrusel - Desktop */}
        <div className="hidden md:flex items-center gap-3 mb-4">
          <button 
            onClick={() => {
              const container = document.getElementById('carousel-principales')
              if (container) container.scrollLeft -= 300
            }}
            className="p-2.5 rounded-xl bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-orange-300 transition-all duration-300 cursor-pointer transform hover:scale-110 shadow-md hover:shadow-lg active:scale-95"
            aria-label="Anterior"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => {
              const container = document.getElementById('carousel-principales')
              if (container) container.scrollLeft += 300
            }}
            className="p-2.5 rounded-xl bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-orange-300 transition-all duration-300 cursor-pointer transform hover:scale-110 shadow-md hover:shadow-lg active:scale-95"
            aria-label="Siguiente"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Carrusel horizontal */}
        <div className="relative">
          <div 
            id="carousel-principales"
            className="carousel-scroll overflow-x-auto pb-4 -mx-2 px-2"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="flex space-x-4 md:space-x-5" style={{ width: 'max-content' }}>
              {platosPrincipales.map((comida) => (
                <div 
                  key={comida.id} 
                  className="flex-shrink-0 w-56 md:w-64 lg:w-72"
                >
                  <ComidaCard comida={comida} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Gradiente fade al final */}
          <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-gray-50 via-gray-50/50 to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* Complementos - Carrusel Horizontal */}
      {complementos.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                <span className="text-2xl md:text-3xl">🥗</span>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 flex items-center">
                  <span className="hidden md:inline">Complementos</span>
                  <span className="md:hidden">Complementos</span>
                </h3>
                <p className="text-sm text-gray-600 hidden md:block">Acompaña tu plato principal</p>
              </div>
              <div className="ml-2 md:ml-4 bg-gradient-to-r from-green-100 to-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full border border-green-200 shadow-sm">
                <span className="hidden md:inline">{complementos.length} opciones</span>
                <span className="md:hidden">{complementos.length}</span>
              </div>
            </div>
          </div>
          
          {/* Controles del carrusel - Desktop */}
          <div className="hidden md:flex items-center gap-3 mb-4">
            <button 
              onClick={() => {
                const container = document.getElementById('carousel-complementos')
                if (container) container.scrollLeft -= 300
              }}
              className="p-2.5 rounded-xl bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-green-300 transition-all duration-300 cursor-pointer transform hover:scale-110 shadow-md hover:shadow-lg active:scale-95"
              aria-label="Anterior"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => {
                const container = document.getElementById('carousel-complementos')
                if (container) container.scrollLeft += 300
              }}
              className="p-2.5 rounded-xl bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-green-300 transition-all duration-300 cursor-pointer transform hover:scale-110 shadow-md hover:shadow-lg active:scale-95"
              aria-label="Siguiente"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Carrusel horizontal */}
          <div className="relative">
            <div 
              id="carousel-complementos"
              className="carousel-scroll overflow-x-auto pb-4 -mx-2 px-2"
              style={{ scrollBehavior: 'smooth' }}
            >
              <div className="flex space-x-4 md:space-x-5" style={{ width: 'max-content' }}>
                {complementos.map((comida) => (
                  <div 
                    key={comida.id} 
                    className="flex-shrink-0 w-56 md:w-64 lg:w-72"
                  >
                    <ComidaCard comida={comida} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Gradiente fade al final */}
            <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-gray-50 via-gray-50/50 to-transparent pointer-events-none"></div>
          </div>
        </div>
      )}

      {/* Información sobre precios combo */}
      {platosPrincipales.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border-2 border-blue-200 rounded-2xl p-4 sm:p-5 shadow-lg">
          <div className="flex items-start space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md flex-shrink-0">
              <span className="text-xl sm:text-2xl">💡</span>
            </div>
            <div className="flex-1">
              <p className="font-bold mb-1.5 text-base sm:text-lg text-blue-900">¡Combos disponibles!</p>
              <p className="text-sm sm:text-base text-blue-700 leading-relaxed">
                Al seleccionar 2 o más platos principales, el precio combo se aplica automáticamente. ¡Ahorra mientras disfrutas más variedad!
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
