'use client'

import { useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { usePedidosStore } from '@/store/pedidosStore'
import type { SesionUsuario } from '@/types'

interface TrackingData {
  pagina: string
  paso: 'seleccion' | 'fecha-horario' | 'resumen' | 'pago'
  carrito?: unknown[]
  total?: number
}

export function useAbandonmentTracking() {
  const sessionIdRef = useRef<string | null>(null)
  const { comidasSeleccionadas, total } = usePedidosStore()
  
  // Generar session ID único
  useEffect(() => {
    if (!sessionIdRef.current) {
      sessionIdRef.current = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }
  }, [])

  // Detectar información del dispositivo
  const getDeviceInfo = () => {
    const ua = navigator.userAgent
    let dispositivo = 'desktop'
    let navegador = 'unknown'

    // Detectar dispositivo
    if (/Mobile|Android|iPhone|iPad/.test(ua)) {
      dispositivo = 'mobile'
    } else if (/Tablet|iPad/.test(ua)) {
      dispositivo = 'tablet'
    }

    // Detectar navegador
    if (ua.includes('Chrome')) navegador = 'chrome'
    else if (ua.includes('Firefox')) navegador = 'firefox'
    else if (ua.includes('Safari')) navegador = 'safari'
    else if (ua.includes('Edge')) navegador = 'edge'

    return { dispositivo, navegador }
  }

  // Obtener parámetros UTM
  const getUTMParams = () => {
    const params = new URLSearchParams(window.location.search)
    return {
      utm_source: params.get('utm_source'),
      utm_medium: params.get('utm_medium'),
      utm_campaign: params.get('utm_campaign')
    }
  }

  // Función para trackear actividad
  const trackActivity = async (data: TrackingData) => {
    try {
      const { dispositivo, navegador } = getDeviceInfo()
      const utmParams = getUTMParams()

      console.log('🔍 Tracking activity:', {
        sessionId: sessionIdRef.current,
        pagina: data.pagina,
        paso: data.paso,
        carrito: data.carrito || comidasSeleccionadas,
        total: data.total || total
      })

      // Primero intentar actualizar si existe
      const { data: existingSession } = await supabase
        .from('sesiones_usuario')
        .select('id')
        .eq('session_id', sessionIdRef.current)
        .single()

      if (existingSession) {
        // Actualizar sesión existente
        await supabase
          .from('sesiones_usuario')
          .update({
            usuario_id: null,
            pagina_actual: data.pagina,
            paso_actual: data.paso,
            carrito: data.carrito || comidasSeleccionadas,
            total: data.total || total,
            ultima_actividad: new Date().toISOString(),
            dispositivo,
            navegador,
            ...utmParams
          })
          .eq('session_id', sessionIdRef.current)
      } else {
        // Crear nueva sesión
        await supabase
          .from('sesiones_usuario')
          .insert({
            usuario_id: null,
            session_id: sessionIdRef.current,
            pagina_actual: data.pagina,
            paso_actual: data.paso,
            carrito: data.carrito || comidasSeleccionadas,
            total: data.total || total,
            ultima_actividad: new Date().toISOString(),
            dispositivo,
            navegador,
            ...utmParams
          })
      }
    } catch (error) {
      console.error('Error tracking activity:', error)
    }
  }

  // Función para marcar abandono manual
  const markAbandonment = async (motivo: string = 'navegacion') => {
    try {
      const { dispositivo, navegador } = getDeviceInfo()
      const utmParams = getUTMParams()

      // Obtener sesión actual
      const { data: sesion } = await supabase
        .from('sesiones_usuario')
        .select('*')
        .eq('session_id', sessionIdRef.current)
        .single() as { data: SesionUsuario | null, error: any }

      if (sesion && sesion.carrito && sesion.carrito.length > 0) {
        await supabase
          .from('pedidos_abandonados')
          .insert({
            usuario_id: null,
            session_id: sessionIdRef.current,
            carrito: sesion.carrito,
            total: sesion.total,
            paso_abandono: sesion.paso_actual,
            tiempo_en_sitio: Math.floor((Date.now() - new Date(sesion.fecha_inicio).getTime()) / 1000),
            fecha_ultima_actividad: sesion.ultima_actividad,
            motivo_abandono: motivo,
            dispositivo,
            navegador,
            ...utmParams
          })
      }
    } catch (error) {
      console.error('Error marking abandonment:', error)
    }
  }

  // Detectar cierre de ventana/pestaña
  useEffect(() => {
    const handleBeforeUnload = () => {
      markAbandonment('cierre_navegador')
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        markAbandonment('cambio_pestana')
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [markAbandonment])

  return {
    trackActivity,
    markAbandonment,
    sessionId: sessionIdRef.current
  }
}
