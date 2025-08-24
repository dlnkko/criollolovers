'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Pedido } from '@/lib/supabaseClient'
import { PedidosService } from '@/lib/pedidosService'
import { PriceCalculator } from '@/utils/priceCalculator'
import { DateHelpers } from '@/utils/dateHelpers'

// Forzar renderizado dinámico para evitar errores de Supabase durante build
export const dynamic = 'force-dynamic'

// Componente interno que usa useSearchParams
function MisPedidosContent() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const status = searchParams.get('status')

  useEffect(() => {
    cargarPedidos()
  }, [])

  const cargarPedidos = async () => {
    try {
      setLoading(true)
      // En producción, aquí obtendrías el ID del usuario autenticado
      const usuarioId = 'usuario-ejemplo'
      const data = await PedidosService.obtenerPedidosUsuario(usuarioId)
      setPedidos(data)
    } catch (err) {
      setError('Error cargando pedidos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCrearNuevoPedido = () => {
    router.push('/crear-pedido')
  }

  const handleVolverInicio = () => {
    router.push('/onboarding')
  }

  const getEstadoColor = (estado: Pedido['estado']) => {
    switch (estado) {
      case 'confirmado':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'cancelado':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getEstadoTexto = (estado: Pedido['estado']) => {
    switch (estado) {
      case 'confirmado':
        return '✅ Confirmado'
      case 'pendiente':
        return '⏳ Pendiente'
      case 'cancelado':
        return '❌ Cancelado'
      default:
        return '❓ Desconocido'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={handleVolverInicio}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Volver al inicio</span>
            </button>
            
            <h1 className="text-xl font-semibold text-gray-800">
              Mis Pedidos
            </h1>
            
            <button
              onClick={handleCrearNuevoPedido}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              + Nuevo Pedido
            </button>
          </div>
        </div>
      </div>

      {/* Mensaje de éxito si viene del pago */}
      {status === 'success' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3 text-green-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-medium">¡Pedido confirmado exitosamente!</p>
                <p className="text-sm">Tu pedido ha sido procesado y está siendo preparado.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={cargarPedidos}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
            >
              Reintentar
            </button>
          </div>
        ) : pedidos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No tienes pedidos aún
            </h3>
            <p className="text-gray-600 mb-6">
              ¡Empieza creando tu primer pedido de comida criolla!
            </p>
            <button
              onClick={handleCrearNuevoPedido}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Crear mi primer pedido
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Historial de Pedidos
            </h2>
            
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getEstadoColor(pedido.estado)}`}>
                        {getEstadoTexto(pedido.estado)}
                      </span>
                      <span className="text-sm text-gray-500">
                        Pedido #{pedido.id.slice(-8)}
                      </span>
                    </div>
                    <p className="text-gray-600">
                      <span className="font-medium">Entrega:</span> {DateHelpers.formatearFecha(pedido.fecha)} a las {pedido.horario}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-600">
                      {PriceCalculator.formatearPrecio(pedido.total)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {pedido.comidas.reduce((sum, cs) => sum + cs.cantidad, 0)} comidas
                    </p>
                  </div>
                </div>

                {/* Lista de comidas del pedido */}
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-medium text-gray-800 mb-3">Comidas:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {pedido.comidas.map((comidaSeleccionada, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-gray-700">
                          {comidaSeleccionada.comida.nombre}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500">
                            × {comidaSeleccionada.cantidad}
                          </span>
                          <span className="font-medium text-gray-800">
                            {PriceCalculator.formatearPrecio(comidaSeleccionada.subtotal)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fecha de creación */}
                {pedido.created_at && (
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <p className="text-xs text-gray-500">
                      Creado el {new Date(pedido.created_at).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Componente principal que envuelve el contenido en Suspense
export default function MisPedidosPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600"></div>
      </div>
    }>
      <MisPedidosContent />
    </Suspense>
  )
}
