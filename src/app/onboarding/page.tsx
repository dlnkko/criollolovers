'use client'

import { useRouter } from 'next/navigation'

export default function OnboardingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-14 md:h-16">
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg md:text-xl font-bold">🍽️</span>
              </div>
              <h1 className="text-lg md:text-2xl font-bold text-gray-800">
                Criollo Lovers
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-64px)] px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200 max-w-md w-full text-center">
          
          {/* Welcome Icon */}
          <div className="w-16 h-16 md:w-20 md:h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
            <span className="text-white text-3xl md:text-4xl">👋</span>
          </div>

          {/* Welcome Text */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">
            ¡Bienvenido a Criollo Lovers!
          </h1>
          
          <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">
            Disfruta de la mejor comida criolla peruana, preparada con amor y entregada directamente a tu puerta.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3 md:space-y-4">
            <button
              onClick={() => router.push('/crear-pedido')}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-xl text-base md:text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
            >
              🚀 Crear Pedido
            </button>
            
            <button
              onClick={() => router.push('/mis-pedidos')}
              className="w-full bg-white hover:bg-gray-50 text-gray-800 font-bold py-3 px-6 md:py-4 md:px-8 rounded-xl text-base md:text-lg transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-gray-300 cursor-pointer"
            >
              📋 Ver Mis Pedidos
            </button>
          </div>

          {/* Footer Note */}
          <p className="text-xs md:text-sm text-gray-500 mt-6 md:mt-8">
            ¿Primera vez? Te recomendamos crear tu primer pedido para conocer nuestros deliciosos platos.
          </p>
        </div>
      </div>
    </div>
  )
}
