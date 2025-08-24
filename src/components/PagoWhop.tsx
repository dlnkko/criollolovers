'use client'

import { useState } from 'react'
import { usePedidosStore } from '@/store/pedidosStore'
import { PriceCalculator } from '@/utils/priceCalculator'
import { DateHelpers } from '@/utils/dateHelpers'

interface PagoWhopProps {
  onPagoExitoso: () => void
  onPagoCancelado: () => void
}

export default function PagoWhop({ onPagoExitoso, onPagoCancelado }: PagoWhopProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { comidasSeleccionadas, fechaSeleccionada, horarioSeleccionado, total, limpiarPedido } = usePedidosStore()

  // Sin descuentos adicionales, solo usar el total del store

  const handlePagoWhop = async () => {
    setLoading(true)
    setError(null)

    try {
      // Simular integración con Whop API
      // En producción, aquí iría la lógica real de Whop
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simular pago exitoso
      onPagoExitoso()
      limpiarPedido()
    } catch {
      setError('Error procesando el pago. Por favor, intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelar = () => {
    onPagoCancelado()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Procesar Pago
          </h1>
          <p className="text-gray-600">
            Estás a un paso de confirmar tu pedido
          </p>
        </div>

        {/* Resumen del pedido */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-gray-800 mb-4">Resumen del pedido:</h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Fecha de entrega:</span>
              <span className="font-medium">
                {DateHelpers.formatearFecha(fechaSeleccionada)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Horario:</span>
              <span className="font-medium">{horarioSeleccionado}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total de comidas:</span>
              <span className="font-medium">
                {comidasSeleccionadas.reduce((sum, cs) => sum + cs.cantidad, 0)}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center text-lg font-bold text-orange-600">
              <span>Total a pagar:</span>
              <span>{PriceCalculator.formatearPrecio(total)}</span>
            </div>
          </div>
        </div>

        {/* Información de Whop */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <div className="text-blue-600 mt-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="text-sm text-blue-800">
              <p className="font-medium">Pago seguro con Whop</p>
              <p className="mt-1">
                Tu información de pago está protegida con encriptación de nivel bancario. 
                Whop es una plataforma de pagos confiable y segura.
              </p>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="space-y-4">
          <button
            onClick={handlePagoWhop}
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Procesando pago...</span>
              </div>
            ) : (
              '💳 Pagar con Whop'
            )}
          </button>

          <button
            onClick={handleCancelar}
            disabled={loading}
            className="w-full bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-colors duration-200 border-2 border-gray-200 hover:border-gray-300"
          >
            Cancelar
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-3 text-red-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Información adicional */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500">
            Al completar el pago, recibirás una confirmación por email y tu pedido será procesado.
            <br />
            Para cualquier consulta, contacta nuestro soporte al cliente.
          </p>
        </div>
      </div>
    </div>
  )
}
