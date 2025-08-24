'use client'

import { useState, useEffect } from 'react'
import { PedidosService } from '@/lib/pedidosService'
import { TrackingService } from '@/lib/trackingService'
import { PriceCalculator } from '@/utils/priceCalculator'
import { obtenerPrecioPrincipal } from '@/lib/supabaseClient'

export default function TestConnection() {
  const [connectionStatus, setConnectionStatus] = useState<'loading' | 'connected' | 'error'>('loading')
  const [comidas, setComidas] = useState<unknown[]>([])
  const [estadisticas, setEstadisticas] = useState<unknown>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      setConnectionStatus('loading')
      setError(null)

      // Test 1: Cargar comidas
      console.log('🍽️ Probando carga de comidas...')
      const comidasData = await PedidosService.obtenerComidas()
      setComidas(comidasData)
      
      if (comidasData.length === 0) {
        throw new Error('No se encontraron comidas en la base de datos. ¿Ejecutaste el script supabase-setup.sql?')
      }

      // Test 2: Obtener estadísticas de abandono
      console.log('📊 Probando estadísticas de abandono...')
      const stats = await TrackingService.obtenerEstadisticasAbandono()
      setEstadisticas(stats)

      // Test 3: Probar formateo de precios
      console.log('💰 Probando formateo de precios...')
      const precioFormateado = PriceCalculator.formatearPrecio(15.99)
      console.log('Precio formateado:', precioFormateado)

      setConnectionStatus('connected')
      console.log('✅ Todas las pruebas pasaron exitosamente!')
      
    } catch (err: unknown) {
      console.error('❌ Error en las pruebas:', err)
      setError(err instanceof Error ? err.message : 'Error de conexión')
      setConnectionStatus('error')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        🔧 Diagnóstico de Conexión Supabase
      </h2>

      {/* Estado de conexión */}
      <div className={`p-4 rounded-lg mb-6 ${
        connectionStatus === 'loading' ? 'bg-yellow-100 border-yellow-400' :
        connectionStatus === 'connected' ? 'bg-green-100 border-green-400' :
        'bg-red-100 border-red-400'
      } border-2`}>
        <div className="flex items-center">
          <span className="text-2xl mr-3">
            {connectionStatus === 'loading' ? '⏳' : 
             connectionStatus === 'connected' ? '✅' : '❌'}
          </span>
          <div>
            <h3 className="font-semibold">
              {connectionStatus === 'loading' ? 'Probando conexión...' :
               connectionStatus === 'connected' ? 'Conexión exitosa' :
               'Error de conexión'}
            </h3>
            {error && (
              <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
          </div>
        </div>
      </div>

      {/* Comidas cargadas */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          🍽️ Comidas en Base de Datos ({comidas.length})
        </h3>
        {comidas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {comidas.slice(0, 6).map((comida, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                <h4 className="font-medium text-gray-800">{comida.nombre}</h4>
                <p className="text-gray-600">
                  {PriceCalculator.formatearPrecio(obtenerPrecioPrincipal(comida))}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No se cargaron comidas</p>
        )}
      </div>

      {/* Estadísticas */}
      {estadisticas && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            📊 Estadísticas de Abandono
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border">
              <h4 className="font-medium text-blue-800">Total Abandonados</h4>
              <p className="text-2xl font-bold text-blue-600">{estadisticas.total}</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border">
              <h4 className="font-medium text-orange-800">Hoy</h4>
              <p className="text-2xl font-bold text-orange-600">{estadisticas.porDia}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border">
              <h4 className="font-medium text-purple-800">Top Abandonadas</h4>
              <p className="text-sm text-purple-600">
                {estadisticas.comidasMasAbandonadas.slice(0, 2).join(', ') || 'Ninguna'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Funciones disponibles */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          ⚙️ Funciones Implementadas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg border">
            <h4 className="font-medium text-green-800">📦 PedidosService</h4>
            <ul className="text-sm text-green-600 mt-2 space-y-1">
              <li>• Obtener comidas</li>
              <li>• Crear pedidos</li>
              <li>• Obtener pedidos por usuario</li>
              <li>• Actualizar estado de pedidos</li>
            </ul>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border">
            <h4 className="font-medium text-blue-800">📊 TrackingService</h4>
            <ul className="text-sm text-blue-600 mt-2 space-y-1">
              <li>• Guardar pedidos abandonados</li>
              <li>• Estadísticas de abandono</li>
              <li>• Comidas más abandonadas</li>
              <li>• Métricas diarias</li>
            </ul>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border">
            <h4 className="font-medium text-yellow-800">💰 PriceCalculator</h4>
            <ul className="text-sm text-yellow-600 mt-2 space-y-1">
              <li>• Calcular subtotales</li>
              <li>• Calcular total del pedido</li>
              <li>• Descuentos por volumen (5% y 10%)</li>
              <li>• Formateo de precios (S/)</li>
            </ul>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border">
            <h4 className="font-medium text-purple-800">🛡️ Base de Datos</h4>
            <ul className="text-sm text-purple-600 mt-2 space-y-1">
              <li>• Row Level Security (RLS)</li>
              <li>• Triggers de validación</li>
              <li>• Índices optimizados</li>
              <li>• Funciones SQL personalizadas</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Botón de reconexión */}
      <button
        onClick={testConnection}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
      >
        🔄 Volver a probar conexión
      </button>
    </div>
  )
}
