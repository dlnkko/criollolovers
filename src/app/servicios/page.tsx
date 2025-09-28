'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ServiciosPage() {
  const router = useRouter()

  const handleCrearPedido = () => {
    router.push('/crear-pedido')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Hero Section con imagen principal */}
      <div className="relative overflow-hidden">
        {/* Imagen de fondo principal */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://pkvkylkpgcqldzfbcwov.supabase.co/storage/v1/object/public/comidas/cocina-peruana-scaled.jpg"
            alt="Cocina peruana tradicional"
            className="w-full h-[100vh] object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Contenido centrado sobre la imagen */}
        <div className="relative z-10 h-[100vh] flex items-center justify-center">
          <div className="text-center text-white px-6 md:px-8 lg:px-12 max-w-6xl mx-auto">
            {/* Título principal */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-wider" style={{textShadow: '3px 3px 10px rgba(0,0,0,0.9)', fontFamily: 'Impact, Arial Black, sans-serif', letterSpacing: '0.15em', fontWeight: '900'}}>
                CRIOLLO LOVERS
              </h1>
              
              {/* Texto descriptivo con tipografía elegante */}
              <div className="px-4 md:px-8 lg:px-12 max-w-5xl mx-auto">
                {/* Primera sección - Título principal */}
                <div className="mb-6">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-light leading-tight mb-4" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.8)', fontFamily: 'Georgia, serif', letterSpacing: '0.3px', fontWeight: '300'}}>
                    Preparamos a pedido las recetas tradicionales
                  </h2>
                </div>

                {/* Segunda sección - Especialidad */}
                <div className="mb-6">
                  <p className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.8)', fontFamily: 'Georgia, serif', letterSpacing: '0.2px', fontWeight: '300'}}>
                    Especialidad criolla para tus eventos, cumpleaños u ocasiones especiales.
                  </p>
                </div>

                {/* Tercera sección - Servicio */}
                <div className="mb-6">
                  <p className="text-base md:text-lg lg:text-xl font-light leading-relaxed" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.8)', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.4px', fontWeight: '300'}}>
                    Nosotros lo preparamos y te lo enviamos el día y rango de hora seleccionado
                  </p>
                </div>

                {/* Cuarta sección - Entrega */}
                <div className="mb-8">
                  <p className="text-base md:text-lg lg:text-xl font-light leading-relaxed" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.8)', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.4px', fontWeight: '300'}}>
                    Lo recibirás en envases por tipo de comida, para que decidas el mejor momento para compartirlo
                  </p>
                </div>
              </div>
            </div>

            {/* Botones de navegación */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 md:mt-12">
              <button
                onClick={handleCrearPedido}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105 cursor-pointer animate-pulse hover:animate-none"
                style={{fontFamily: 'Helvetica Neue, Arial, sans-serif', fontWeight: '600', letterSpacing: '0.5px'}}
              >
                🚀 Crear mi primer pedido
              </button>
              <Link
                href="/landing"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 border-2 border-white/30 hover:border-white/50 cursor-pointer hover:scale-105"
                style={{fontFamily: 'Helvetica Neue, Arial, sans-serif', fontWeight: '600', letterSpacing: '0.5px'}}
              >
                ← Volver al inicio
              </Link>
            </div>

            {/* Indicadores de carrusel */}
            <div className="flex justify-center mt-8 space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4 animate-float">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center animate-spin" style={{animationDuration: '3s'}}>
                <span className="text-white text-xl font-bold">🍽️</span>
              </div>
              <h4 className="text-2xl font-bold" style={{fontFamily: 'Arial Black, sans-serif'}}>Criollo Lovers</h4>
            </div>
            <p className="text-gray-300 text-lg mb-4 animate-fade-in-up" style={{animationDelay: '0.2s', fontFamily: 'Arial, sans-serif'}}>
              © 2024 Criollo Lovers. Todos los derechos reservados.
            </p>
            <p className="text-gray-400 animate-fade-in-up" style={{animationDelay: '0.4s', fontFamily: 'Arial, sans-serif'}}>
              Comida criolla auténtica, entregada con amor ❤️
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
