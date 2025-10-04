'use client'

import { useRouter } from 'next/navigation'
import AnimatedText from '@/components/AnimatedText'

export default function LandingPage() {
  const router = useRouter()

  const handleCrearPedido = () => {
    router.push('/crear-pedido')
  }

  const handleComoFunciona = () => {
    router.push('/servicios')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">

      {/* Hero Section con imagen principal */}
      <div className="relative overflow-hidden">
        {/* Imagen de fondo principal */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://pkvkylkpgcqldzfbcwov.supabase.co/storage/v1/object/public/comidas/criollomierda.jpg"
            alt="Comida criolla peruana"
            className="w-full h-[100vh] object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Contenido centrado sobre la imagen */}
        <div className="relative z-10 h-[100vh] flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            {/* Logo y nombre */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight" style={{textShadow: '3px 3px 10px rgba(0,0,0,0.9)', fontFamily: 'Arial Black, sans-serif'}}>
                CRIOLLO LOVERS
              </h1>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-300 mb-2" style={{textShadow: '2px 2px 6px rgba(0,0,0,0.8)', fontFamily: 'Arial, sans-serif'}}>
                El sabor de la tradición
                <br />
                <span className="text-orange-400">
                  directo a tu{' '}
                  <AnimatedText 
                    words={[ 'hogar', 'empresa', 'evento']} 
                    typeSpeed={80}
                    deleteSpeed={40}
                    pauseTime={1200}
                    className="text-orange-400"
                  />
                </span>
              </div>
            </div>

            {/* Botones originales */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleCrearPedido}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105 cursor-pointer animate-pulse hover:animate-none"
                style={{fontFamily: 'Arial, sans-serif', fontWeight: '700'}}
              >
                🚀 Crear mi primer pedido
              </button>
              <button
                onClick={handleComoFunciona}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 border-2 border-white/30 hover:border-white/50 cursor-pointer hover:scale-105"
                style={{fontFamily: 'Arial, sans-serif', fontWeight: '700'}}
              >
                Lo que ofrecemos
              </button>
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

      {/* Características principales */}
      <div className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 animate-fade-in-up" style={{fontFamily: 'Arial Black, sans-serif'}}>
              ¿Por qué elegirnos?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s', fontFamily: 'Arial, sans-serif'}}>
              Ofrecemos la mejor experiencia en comida criolla peruana
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center group hover:shadow-xl transition-all duration-300 animate-slide-in-left" style={{animationDelay: '0.3s'}}>
              <div className="w-20 h-20 md:w-24 md:h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                <span className="text-3xl md:text-4xl animate-bounce group-hover:animate-spin">🚚</span>
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 group-hover:text-orange-600 transition-colors duration-300" style={{fontFamily: 'Arial Black, sans-serif'}}>
                Entrega rápida
              </h4>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300" style={{fontFamily: 'Arial, sans-serif'}}>
                Entregamos los pedidos de manera puntual dentro del rango pactado con la máxima frescura y calidad posible.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center group hover:shadow-xl transition-all duration-300 animate-slide-in-right" style={{animationDelay: '0.5s'}}>
              <div className="w-20 h-20 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                <span className="text-3xl md:text-4xl animate-pulse group-hover:animate-bounce">🌿</span>
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors duration-300" style={{fontFamily: 'Arial Black, sans-serif'}}>
                Ingredientes frescos
              </h4>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300" style={{fontFamily: 'Arial, sans-serif'}}>
                Utilizamos solo los mejores ingredientes de temporada y proveedores locales
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl shadow-2xl p-8 md:p-12 text-center text-white animate-fade-in-up" style={{animationDelay: '0.9s'}}>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 animate-wiggle" style={{fontFamily: 'Arial Black, sans-serif'}}>
              🎯 ¿Listo para probar la mejor comida criolla?
            </h3>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '1.1s', fontFamily: 'Arial, sans-serif'}}>
              Únete a cientos de clientes satisfechos que ya disfrutan de nuestros platos auténticos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleCrearPedido}
                className="bg-white text-orange-600 font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 cursor-pointer text-lg animate-pulse hover:animate-none"
                style={{animationDelay: '1.3s', fontFamily: 'Arial, sans-serif', fontWeight: '700'}}
              >
                Crear pedido ahora
              </button>
              <button
                onClick={handleComoFunciona}
                className="bg-orange-700 hover:bg-orange-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 border-2 border-orange-500 hover:border-orange-400 cursor-pointer text-lg hover:scale-105"
                style={{animationDelay: '1.5s', fontFamily: 'Arial, sans-serif', fontWeight: '700'}}
              >
                Ver nuestro menú
              </button>
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
