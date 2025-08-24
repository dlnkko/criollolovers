'use client'

import { useRouter } from 'next/navigation'
import AnimatedText from '@/components/AnimatedText'

export default function LandingPage() {
  const router = useRouter()

  const handleCrearCuenta = () => {
    router.push('/signin')
  }

  const handleComoFunciona = () => {
    router.push('/servicios')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg md:text-xl font-bold">🍽️</span>
              </div>
              <h1 className="text-lg md:text-2xl font-bold text-gray-800">
                Criollo Lovers
              </h1>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              <button
                onClick={() => router.push('/login')}
                className="text-gray-600 hover:text-gray-800 transition-colors duration-200 cursor-pointer text-sm md:text-base px-2 md:px-0"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={handleCrearCuenta}
                className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-colors duration-200 cursor-pointer text-sm md:text-base"
              >
                Crear Cuenta
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 md:mb-6 leading-tight">
            El sabor de la tradición
            <br />
            <span className="text-orange-600">
              directo a tu{' '}
              <AnimatedText 
                words={[ 'hogar', 'empresa', 'evento']} 
                typeSpeed={80}
                deleteSpeed={40}
                pauseTime={1200}
                className="text-orange-600"
              />
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
          Lleva lo mejor de la cocina peruana a tu mesa, fácil, rico y en porciones que sí alcanzan.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <button
              onClick={handleCrearCuenta}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-xl text-base md:text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
            >
              🚀 Crear mi primer pedido
            </button>
            <button
              onClick={() => router.push('/login')}
              className="bg-white hover:bg-gray-50 text-gray-800 font-bold py-3 px-6 md:py-4 md:px-8 rounded-xl text-base md:text-lg transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-gray-300 cursor-pointer"
            >
              👋 Iniciar Sesión
            </button>
          </div>
        </div>

        {/* Características principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16 px-4">
          <div className="text-center p-4 md:p-6">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <span className="text-2xl md:text-3xl">🚚</span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
              Entrega rápida
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              Entregamos en menos de 30 minutos en Lima Metropolitana
            </p>
          </div>
          
          <div className="text-center p-4 md:p-6">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <span className="text-2xl md:text-3xl">🌿</span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
              Ingredientes frescos
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              Utilizamos solo los mejores ingredientes de temporada
            </p>
          </div>
          
          <div className="text-center p-4 md:p-6">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <span className="text-2xl md:text-3xl">💳</span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
              Pago seguro
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              Pagos procesados de forma segura con Whop
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">
              🎯 ¿Listo para probar la mejor comida criolla?
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-5 md:mb-6">
              Únete a cientos de clientes satisfechos que ya disfrutan de nuestros platos
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <button
                onClick={handleCrearCuenta}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl cursor-pointer text-sm md:text-base"
              >
                Crear cuenta gratis
              </button>
              <button
                onClick={handleComoFunciona}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors duration-200 border-2 border-gray-200 hover:border-gray-300 cursor-pointer text-sm md:text-base"
              >
                Conocer más
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300 text-sm md:text-base">
            © 2024 Criollo Lovers. Todos los derechos reservados.
          </p>
          <p className="text-gray-400 text-xs md:text-sm mt-2">
            Comida criolla auténtica, entregada con amor ❤️
          </p>
        </div>
      </div>
    </div>
  )
}
