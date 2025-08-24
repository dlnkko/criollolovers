'use client'

import TestConnection from '@/components/TestConnection'
import DebugPrecios from '@/components/DebugPrecios'
import DirectDataTest from '@/components/DirectDataTest'
import PruebaPreciosDinamicos from '@/components/PruebaPreciosDinamicos'

export default function TestConnectionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🔧 Panel de Diagnóstico
          </h1>
          <p className="text-gray-600">
            Verifica la conexión con Supabase y prueba todas las funciones
          </p>
        </div>
        
        <div className="space-y-8">
          <PruebaPreciosDinamicos />
          <DirectDataTest />
          <DebugPrecios />
          <TestConnection />
        </div>
        
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
          >
            ← Volver al inicio
          </a>
        </div>
      </div>
    </div>
  )
}
