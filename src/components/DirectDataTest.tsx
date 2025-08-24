'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function DirectDataTest() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<{data: any[] | null, error: any} | null>(null)

  const testDirectQuery = async () => {
    setLoading(true)
    try {
      // Query directo sin usar el service
      const { data, error } = await supabase
        .from('comidas')
        .select('*')
        .order('nombre')

      console.log('🔍 Query directo a Supabase:')
      console.log('Data:', data)
      console.log('Error:', error)

      setResults({ data, error })
    } catch (err) {
      console.error('Error en query directo:', err)
      setResults({ data: null, error: err as any })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">🔍 Test Directo de Datos</h3>
      
      <button
        onClick={testDirectQuery}
        disabled={loading}
        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 disabled:opacity-50"
      >
        {loading ? 'Consultando...' : 'Consultar Directamente'}
      </button>

      {results && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Resultados:</h4>
          
          {results.error ? (
            <div className="bg-red-100 border border-red-300 p-3 rounded">
              <strong>Error:</strong> {JSON.stringify(results.error, null, 2)}
            </div>
          ) : (
            <div>
              <div className="bg-green-100 border border-green-300 p-3 rounded mb-4">
                <strong>✅ Consulta exitosa</strong> - {results.data?.length || 0} registros encontrados
              </div>
              
              {results.data && results.data.length > 0 && (
                <div className="space-y-2">
                  <h5 className="font-medium">Primeros 5 registros:</h5>
                  {results.data.slice(0, 5).map((item: any, i: number) => (
                    <div key={i} className="bg-white p-3 border rounded">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div><strong>ID:</strong> {item.id}</div>
                        <div><strong>Nombre:</strong> {item.nombre}</div>
                        <div><strong>Precio1:</strong> {item.precio1} ({typeof item.precio1})</div>
                        <div><strong>Precio2:</strong> {item.precio2} ({typeof item.precio2})</div>
                        <div><strong>Costo:</strong> {item.costo} ({typeof item.costo})</div>
                        <div><strong>Creado:</strong> {item.created_at}</div>
                      </div>
                      <div className="mt-2 p-2 bg-blue-50 rounded">
                        <strong>Precio principal calculado:</strong> {
                          item.precio1 || item.precio2 || item.costo || 0
                        }
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {results.data && results.data.length === 0 && (
                <div className="bg-orange-100 border border-orange-300 p-3 rounded">
                  <strong>⚠️ No hay datos</strong> - La tabla está vacía. ¿Ejecutaste el script supabase-setup.sql?
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
