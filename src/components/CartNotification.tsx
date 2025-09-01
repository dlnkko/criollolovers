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
      {/* Notification toast */}
      {showNotification && (
        <div className="md:hidden fixed top-20 left-4 right-4 bg-green-500 text-white p-3 rounded-lg shadow-lg z-50 animate-slide-down">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">¡Comida agregada! 🎉</p>
              <p className="text-xs opacity-90">Revisa tu pedido abajo</p>
            </div>
            <button 
              onClick={scrollToCart}
              className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-xs font-medium transition-colors"
            >
              Ver ↓
            </button>
          </div>
        </div>
      )}

      {/* Floating cart button for mobile */}
      <div className="md:hidden fixed bottom-4 right-4 z-40">
        <button
          onClick={scrollToCart}
          className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
        >
          <div className="flex items-center space-x-2">
            <div className="relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.4-2M7 13l-2.5 5h15.5" />
              </svg>
              {currentCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                  {currentCount}
                </span>
              )}
            </div>
            <div className="text-xs">
              <div className="font-bold">{PriceCalculator.formatearPrecio(total)}</div>
            </div>
          </div>
        </button>
      </div>
    </>
  )
}
