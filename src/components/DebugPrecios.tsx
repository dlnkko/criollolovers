'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function DebugPrecios() {
  const [rawData, setRawData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    debugConnection()
  }, [])

  const debugConnection = async () => {
    try {
      console.log('🔍 Iniciando debug...')
      
      // Conexión directa a Supabase sin pasar por el service
      const { data, error } = await supabase
        .from('comidas')
        .select('*')
        .limit(3)

      console.log('📊 Respuesta de Supabase:', { data, error })
      
      if (error) {
        setError(`Error de Supabase: ${error.message}`)
        return
      }

      setRawData(data)

      // Debug cada campo individual
      data?.forEach((comida: any, index: number) => {
        console.log(`🍽️ Comida ${index + 1}:`)
        console.log('  - id:', comida.id, typeof comida.id)
        console.log('  - nombre:', comida.nombre, typeof comida.nombre)
        console.log('  - precio1:', comida.precio1, typeof comida.precio1)
        console.log('  - precio2:', comida.precio2, typeof comida.precio2)
        console.log('  - costo:', comida.costo, typeof comida.costo)
        console.log('  - created_at:', comida.created_at, typeof comida.created_at)
        console.log('  - Precio principal:', comida.precio1 || comida.precio2 || comida.costo || 0)
      })

    } catch (err: any) {
      console.error('❌ Error en debug:', err)
      setError(`Error general: ${err.message}`)
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🔍 Debug de Precios</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-6">
        <button 
          onClick={debugConnection}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          🔄 Volver a debuggear
        </button>
      </div>

      {rawData && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">📋 Datos crudos de Supabase:</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
            {JSON.stringify(rawData, null, 2)}
          </pre>

          <h3 className="text-lg font-semibold">🧪 Análisis por comida:</h3>
          {rawData.map((comida: any, index: number) => (
            <div key={index} className="border border-gray-300 p-4 rounded">
              <h4 className="font-medium text-lg mb-2">
                {comida.nombre || 'Sin nombre'}
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Precio1:</span><br />
                  <code className="bg-gray-200 px-2 py-1 rounded">
                    {JSON.stringify(comida.precio1)} ({typeof comida.precio1})
                  </code>
                </div>
                <div>
                  <span className="font-medium">Precio2:</span><br />
                  <code className="bg-gray-200 px-2 py-1 rounded">
                    {JSON.stringify(comida.precio2)} ({typeof comida.precio2})
                  </code>
                </div>
                <div>
                  <span className="font-medium">Costo:</span><br />
                  <code className="bg-gray-200 px-2 py-1 rounded">
                    {JSON.stringify(comida.costo)} ({typeof comida.costo})
                  </code>
                </div>
                <div>
                  <span className="font-medium">Precio principal:</span><br />
                  <code className="bg-green-200 px-2 py-1 rounded">
                    {comida.precio1 || comida.precio2 || comida.costo || 0}
                  </code>
                </div>
                <div>
                  <span className="font-medium">Formateo final:</span><br />
                  <code className="bg-blue-200 px-2 py-1 rounded">
                    {new Intl.NumberFormat('es-PE', {
                      style: 'currency',
                      currency: 'PEN'
                    }).format(comida.precio1 || comida.precio2 || comida.costo || 0)}
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-sm text-gray-600">
        <p>💡 <strong>Instrucciones:</strong></p>
        <ol className="list-decimal list-inside space-y-1 mt-2">
          <li>Abre las herramientas de desarrollador (F12)</li>
          <li>Ve a la pestaña Console</li>
          <li>Haz clic en "Volver a debuggear"</li>
          <li>Revisa los logs en la consola para más detalles</li>
        </ol>
      </div>
    </div>
  )
}
