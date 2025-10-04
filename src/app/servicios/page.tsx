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
      <div className="relative min-h-[100svh] overflow-hidden">
        {/* Imagen de fondo principal */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://pkvkylkpgcqldzfbcwov.supabase.co/storage/v1/object/public/comidas/cocina-peruana-scaled.jpg"
            alt="Cocina peruana tradicional"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Contenido centrado sobre la imagen */}
        <div className="relative z-10 min-h-[100svh] flex flex-col items-center justify-center px-4 text-white py-6 overflow-visible">
  {/* Bloque contenedor del título y texto */}
  <div className="max-w-4xl w-full text-center space-y-6">
    
    {/* Título (fuera del fondo translúcido pero alineado visualmente) */}
    <h1
      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wider"
      style={{
        textShadow: '3px 3px 10px rgba(0,0,0,0.9)',
        fontFamily: 'Impact, Arial Black, sans-serif',
        letterSpacing: '0.15em',
        fontWeight: 900
      }}
    >
      CRIOLLO LOVERS
    </h1>

    {/* Fondo translúcido que envuelve el resto */}
    <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl text-left mx-auto w-full max-w-3xl">
      <h2
        className="text-lg sm:text-xl md:text-2xl font-light mb-5 leading-snug"
        style={{
          textShadow: '2px 2px 8px rgba(0,0,0,0.6)',
          fontFamily: 'Georgia, serif',
          letterSpacing: '0.3px',
          fontWeight: 300
        }}
      >
        Llevamos el sabor de la comida criolla a tus celebraciones.
      </h2>

      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <span>🗂️</span>
          <p className="text-base sm:text-lg leading-relaxed">
            Platos preparados a pedido, perfectos para cumpleaños, eventos u ocasiones especiales.
          </p>
        </li>

        <li className="flex items-start gap-3">
          <span>📌</span>
          <p className="text-base sm:text-lg leading-relaxed">
            Solo necesitamos tu pedido con 2 días de anticipación (mínimo 4 porciones por plato).
          </p>
        </li>

        <li className="flex items-start gap-3">
          <span>🕒</span>
          <p className="text-base sm:text-lg leading-relaxed">
            El día elegido, nosotros cocinamos y te lo enviamos en el rango de hora que prefieras.
          </p>
        </li>

        <li className="flex items-start gap-3">
          <span>🥘</span>
          <p className="text-base sm:text-lg leading-relaxed">
            Recibirás cada preparación en envases separados, para que decidas el mejor momento de compartirlo.
          </p>
        </li>
      </ul>
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
