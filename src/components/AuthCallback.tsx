'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Manejar la sesión de autenticación desde la URL
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error getting session:', error)
          return
        }

        if (data.session) {
          console.log('✅ Usuario autenticado exitosamente:', data.session.user.email)
          // Redirigir a crear-pedido
          router.push('/crear-pedido')
        }
      } catch (error) {
        console.error('Error in auth callback:', error)
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Completando autenticación...</p>
        <p className="text-gray-500 text-sm mt-2">Serás redirigido automáticamente</p>
      </div>
    </div>
  )
}
