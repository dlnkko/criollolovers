'use client'

import { useState, useEffect } from 'react'
import { usePedidosStore } from '@/store/pedidosStore'
import { PriceCalculator } from '@/utils/priceCalculator'

interface CartNotificationProps {
  pasoActual?: 'seleccion' | 'fecha-horario' | 'resumen' | 'pago'
}

export default function CartNotification({ pasoActual = 'seleccion' }: CartNotificationProps) {
  const { comidasSeleccionadas, total } = usePedidosStore()
  const [showNotification, setShowNotification] = useState(false)
  const [previousCount, setPreviousCount] = useState(0)

  const currentCount = comidasSeleccionadas.reduce((sum, item) => sum + item.cantidad, 0)

  useEffect(() => {
    // Si se agregó un item nuevo, mostrar notificación
    if (currentCount > previousCount && currentCount > 0) {
      setShowNotification(true)
      // Auto-hide después de 3 segundos
      setTimeout(() => setShowNotification(false), 3000)
    }
    setPreviousCount(currentCount)
  }, [currentCount, previousCount])

  const scrollToCart = () => {
    const cartElement = document.getElementById('cart-section')
    if (cartElement) {
      cartElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    setShowNotification(false)
  }

  // Solo mostrar en la pestaña de selección
  if (currentCount === 0 || pasoActual !== 'seleccion') return null

  return (
    <>
      {/* Notification toast mejorada */}
      {showNotification && (
        <div className="md:hidden fixed top-20 left-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-2xl shadow-2xl z-50 animate-slide-down border-2 border-green-400/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-xl">🎉</span>
              </div>
              <div>
                <p className="font-bold text-sm">¡Comida agregada!</p>
                <p className="text-xs opacity-90">Revisa tu pedido abajo</p>
              </div>
            </div>
            <button 
              onClick={scrollToCart}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 active:scale-95 border-2 border-white/30"
            >
              Ver ↓
            </button>
          </div>
        </div>
      )}

      {/* Floating cart button for mobile mejorado */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={scrollToCart}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-4 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 border-2 border-orange-400/50"
          aria-label="Ver carrito"
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.4-2M7 13l-2.5 5h15.5" />
              </svg>
              {currentCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-extrabold animate-pulse border-2 border-white shadow-lg">
                  {currentCount}
                </span>
              )}
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold opacity-90">Total</div>
              <div className="font-extrabold text-sm">{PriceCalculator.formatearPrecio(total)}</div>
            </div>
          </div>
        </button>
      </div>
    </>
  )
}
