'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AnimatedText from '@/components/AnimatedText'

export default function ServiciosPage() {
  const router = useRouter()

  const handleCrearPedido = () => {
    router.push('/crear-pedido')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/landing" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">🍽️</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">
                Criollo Lovers
              </h1>
            </Link>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCrearPedido}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Crear Pedido
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            🎯 ¿Cómo funciona
            <br />
            <span className="text-orange-600">Criollo Lovers?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            El sabor de la tradición{' '}
            <span className="text-orange-600">
              directo a tu{' '}
              <AnimatedText 
                words={['mesa', 'hogar', 'puerta']} 
                typeSpeed={80}
                deleteSpeed={40}
                pauseTime={1200}
                className="text-orange-600"
              />
            </span>
          </p>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Te explicamos paso a paso cómo funciona nuestro servicio de comida criolla 
            a domicilio y por qué somos la mejor opción para ti.
          </p>
        </div>

        {/* Proceso paso a paso */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl font-bold text-orange-600">1</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              🍽️ Selecciona tus comidas
            </h3>
            <p className="text-gray-600">
              Elige entre nuestra amplia variedad de platos criollos auténticos
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl font-bold text-green-600">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              📅 Programa tu entrega
            </h3>
            <p className="text-gray-600">
              Selecciona fecha y horario que mejor te convenga
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl font-bold text-blue-600">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              💳 Paga de forma segura
            </h3>
            <p className="text-gray-600">
              Procesamos tu pago con total seguridad
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl font-bold text-purple-600">4</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              🚚 Recibe tu pedido
            </h3>
            <p className="text-gray-600">
              Entregamos en tu puerta en menos de 30 minutos
            </p>
          </div>
        </div>

        {/* Detalles del servicio */}
        <div className="space-y-12">
          {/* Variedad de comidas */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  🍽️ Amplia variedad de comidas criollas
                </h3>
                <p className="text-gray-600 mb-6">
                  Nuestro menú incluye los platos más representativos de la cocina peruana:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center space-x-2">
                    <span className="text-orange-500">•</span>
                    <span>Arroz con Pollo - El clásico peruano</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-orange-500">•</span>
                    <span>Sancocho - Sopa tradicional de carne</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-orange-500">•</span>
                    <span>Arepas de Queso - Deliciosas y crujientes</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-orange-500">•</span>
                    <span>Bandeja Paisa - Plato completo y nutritivo</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-orange-500">•</span>
                    <span>Y mucho más...</span>
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-6xl">🍽️</span>
                </div>
                <p className="text-gray-500 text-sm">
                  Más de 10 platos diferentes
                </p>
              </div>
            </div>
          </div>

          {/* Horarios de entrega */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-center lg:order-2">
                <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-6xl">🕐</span>
                </div>
                <p className="text-gray-500 text-sm">
                  Horarios flexibles para ti
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  🕐 Horarios flexibles de entrega
                </h3>
                <p className="text-gray-600 mb-6">
                  Entregamos en dos horarios convenientes para que puedas disfrutar 
                  de nuestros platos cuando mejor te convenga:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-center">
                      <span className="text-2xl">🌞</span>
                      <h4 className="font-semibold text-green-800 mt-2">12:00 PM</h4>
                      <p className="text-sm text-green-600">Almuerzo</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-center">
                      <span className="text-2xl">🌅</span>
                      <h4 className="font-semibold text-blue-800 mt-2">5:00 PM</h4>
                      <p className="text-sm text-blue-600">Cena</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Zonas de entrega */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  🚚 Entregas en toda Lima Metropolitana
                </h3>
                <p className="text-gray-600 mb-6">
                  Cubrimos los principales distritos de Lima para que puedas 
                  disfrutar de nuestros platos sin importar dónde vivas:
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="space-y-1">
                    <p className="text-gray-600">• Miraflores</p>
                    <p className="text-gray-600">• San Isidro</p>
                    <p className="text-gray-600">• Barranco</p>
                    <p className="text-gray-600">• Surco</p>
                    <p className="text-gray-600">• Chorrillos</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-600">• San Borja</p>
                    <p className="text-gray-600">• La Molina</p>
                    <p className="text-gray-600">• San Miguel</p>
                    <p className="text-gray-600">• Callao</p>
                    <p className="text-gray-600">• Y más...</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-6xl">🚚</span>
                </div>
                <p className="text-gray-500 text-sm">
                  Entregas en menos de 30 minutos
                </p>
              </div>
            </div>
          </div>

          {/* Precios y descuentos */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-center lg:order-2">
                <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-6xl">💰</span>
                </div>
                <p className="text-gray-500 text-sm">
                  Precios competitivos y descuentos
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  💰 Precios competitivos y descuentos
                </h3>
                <p className="text-gray-600 mb-6">
                  Ofrecemos los mejores precios del mercado con descuentos 
                  automáticos por volumen:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <span className="text-green-800 font-medium">Pedidos de S/30+</span>
                    <span className="text-green-600 font-bold">5% descuento</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <span className="text-orange-800 font-medium">Pedidos de S/50+</span>
                    <span className="text-orange-600 font-bold">10% descuento</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              🎯 ¿Listo para probar nuestro servicio?
            </h3>
            <p className="text-gray-600 mb-8">
              Únete a cientos de clientes satisfechos que ya disfrutan 
              de la mejor comida criolla a domicilio
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleCrearPedido}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🚀 Crear pedido ahora
              </button>
              <Link
                href="/landing"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 border-2 border-gray-200 hover:border-gray-300"
              >
                ← Volver al inicio
              </Link>
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
