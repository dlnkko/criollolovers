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
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">🍽️</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">
                Criollo Lovers
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/login')}
                className="text-gray-600 hover:text-gray-800 transition-colors duration-200 cursor-pointer"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={handleCrearCuenta}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
              >
                Crear Cuenta
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
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
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Lleva lo mejor de la cocina peruana a tu mesa, fácil, rico y en porciones que sí alcanzan.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleCrearCuenta}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
            >
              🚀 Crear mi primer pedido
            </button>
            <button
              onClick={() => router.push('/login')}
              className="bg-white hover:bg-gray-50 text-gray-800 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-gray-300 cursor-pointer"
            >
              👋 Iniciar Sesión
            </button>
          </div>
        </div>

        {/* Características principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🚚</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Entrega rápida
            </h3>
            <p className="text-gray-600">
              Entregamos en menos de 30 minutos en Lima Metropolitana
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🌿</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Ingredientes frescos
            </h3>
            <p className="text-gray-600">
              Utilizamos solo los mejores ingredientes de temporada
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💳</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Pago seguro
            </h3>
            <p className="text-gray-600">
              Pagos procesados de forma segura con Whop
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              🎯 ¿Listo para probar la mejor comida criolla?
            </h3>
            <p className="text-gray-600 mb-6">
              Únete a cientos de clientes satisfechos que ya disfrutan de nuestros platos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleCrearCuenta}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl cursor-pointer"
              >
                Crear cuenta gratis
              </button>
              <button
                onClick={handleComoFunciona}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors duration-200 border-2 border-gray-200 hover:border-gray-300 cursor-pointer"
              >
                Conocer más
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">
            © 2024 Criollo Lovers. Todos los derechos reservados.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Comida criolla auténtica, entregada con amor ❤️
          </p>
        </div>
      </div>
    </div>
  )
}
