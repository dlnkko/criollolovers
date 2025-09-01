'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { usePedidosStore } from '@/store/pedidosStore'
import { PriceCalculator } from '@/utils/priceCalculator'
import ListaComidas from './ListaComidas'
import SelectorCantidad from './SelectorCantidad'
import SelectorFechaHorario from './SelectorFechaHorario'
import SimuladorPrecios from './SimuladorPrecios'
import ResumenPedido from './ResumenPedido'
import { useAbandonmentTracking } from '@/hooks/useAbandonmentTracking'
import CartNotification from './CartNotification'


type Paso = 'seleccion' | 'fecha-horario' | 'resumen' | 'pago'

export default function CrearPedido() {
  const [pasoActual, setPasoActual] = useState<Paso>('seleccion')
  
  const router = useRouter()
  const { comidasSeleccionadas, fechaSeleccionada, horarioSeleccionado, total } = usePedidosStore()
  const { trackActivity } = useAbandonmentTracking()

  // Manejar navegación del navegador
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.paso) {
        setPasoActual(event.state.paso)
      } else {
        // Si no hay estado, volver al inicio
        setPasoActual('seleccion')
      }
    }

    // Establecer estado inicial
    history.replaceState({ paso: pasoActual }, '', window.location.href)

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [pasoActual])

  // Actualizar URL cuando cambia el paso
  useEffect(() => {
    if (typeof window !== 'undefined') {
      history.pushState({ paso: pasoActual }, '', window.location.href)
    }
  }, [pasoActual])

  // Trackear actividad del usuario
  useEffect(() => {
    trackActivity({
      pagina: '/crear-pedido',
      paso: pasoActual,
      carrito: comidasSeleccionadas,
      total
    })
  }, [pasoActual, comidasSeleccionadas, total, trackActivity])

  const puedeAvanzar = () => {
    switch (pasoActual) {
      case 'seleccion':
        return comidasSeleccionadas.length > 0
      case 'fecha-horario':
        return fechaSeleccionada && horarioSeleccionado
      default:
        return true
    }
  }

  const siguientePaso = () => {
    if (!puedeAvanzar()) return

    switch (pasoActual) {
      case 'seleccion':
        setPasoActual('fecha-horario')
        break
      case 'fecha-horario':
        setPasoActual('resumen')
        break
      case 'resumen':
        // El resumen es el paso final, no hay más pasos
        break
    }
  }

  const pasoAnterior = () => {
    switch (pasoActual) {
      case 'fecha-horario':
        setPasoActual('seleccion')
        break
      case 'resumen':
        setPasoActual('fecha-horario')
        break
    }
  }

  const handleConfirmarPedido = () => {
    // Crear mensaje para WhatsApp
    const formatearFecha = (fecha: string) => {
      const [year, month, day] = fecha.split('-').map(Number)
      const fechaObj = new Date(year, month - 1, day)
      return fechaObj.toLocaleDateString('es-PE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    const mensaje = `🍽️ *NUEVO PEDIDO - Criollo Lovers*

📋 *Resumen del pedido:*
${comidasSeleccionadas.map(item => 
  `• ${item.comida.nombre} x${item.cantidad} - ${PriceCalculator.formatearPrecio(item.subtotal)}`
).join('\n')}

💰 *Total: ${PriceCalculator.formatearPrecio(total)}*

📅 *Fecha de entrega:* ${formatearFecha(fechaSeleccionada!)}
🕐 *Horario de entrega:* ${horarioSeleccionado}

¡Gracias por tu pedido! 🎉`

    // Codificar el mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensaje)
    
    // Redirigir a WhatsApp
    window.open(`https://wa.me/923197090?text=${mensajeCodificado}`, '_blank')
  }

  const handleEditarPedido = () => {
    setPasoActual('seleccion')
  }

  const handleVolverInicio = () => {
    router.push('/landing')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-red-600 shadow-lg border-b border-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={handleVolverInicio}
              className="flex items-center space-x-2 text-red-100 hover:text-white transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Volver al inicio</span>
            </button>
            
            <h1 className="text-xl font-bold text-white">
              Crear Pedido
            </h1>
            
            <div className="w-20"></div> {/* Espaciador para centrar el título */}
          </div>
        </div>
      </div>

      {/* Indicador de pasos */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-3">
            <div className="flex items-center space-x-2 md:space-x-4">
              {[
                { id: 'seleccion', label: 'Comidas', fullLabel: '1. Seleccionar Comidas', icon: '🍽️' },
                { id: 'fecha-horario', label: 'Fecha', fullLabel: '2. Fecha y Horario', icon: '📅' },
                { id: 'resumen', label: 'Confirmar', fullLabel: '3. Confirmar', icon: '✅' }
              ].map((paso, index) => (
                <div key={paso.id} className="flex items-center">
                  <div className={`flex items-center space-x-1 md:space-x-2 ${
                    pasoActual === paso.id ? 'text-red-600' : 'text-gray-400'
                  }`}>
                    <span className="text-sm md:text-lg">{paso.icon}</span>
                    <span className="font-medium text-xs md:text-sm">
                      <span className="md:hidden">{paso.label}</span>
                      <span className="hidden md:inline">{paso.fullLabel}</span>
                    </span>
                  </div>
                  {index < 2 && (
                    <div className="mx-2 md:mx-4 w-4 md:w-8 h-px bg-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-3 md:px-4 lg:px-8 py-4 md:py-8">
        <div className="space-y-6 md:grid md:grid-cols-3 md:gap-8 md:space-y-0">
          {/* Columna izquierda - Selección de comidas */}
          <div className="md:col-span-2">
            {pasoActual === 'seleccion' && (
              <div>
                <ListaComidas />
              </div>
            )}

            {pasoActual === 'fecha-horario' && (
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
                  📅 <span className="hidden md:inline">Programa tu entrega</span>
                  <span className="md:hidden">Fecha y Horario</span>
                </h2>
                <SelectorFechaHorario />
              </div>
            )}

            {pasoActual === 'resumen' && (
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
                  📋 <span className="hidden md:inline">Resumen del pedido</span>
                  <span className="md:hidden">Resumen</span>
                </h2>
                <ResumenPedido
                  onConfirmar={handleConfirmarPedido}
                  onEditar={handleEditarPedido}
                />
              </div>
            )}
          </div>

          {/* Columna derecha - Panel de control */}
          <div className="md:col-span-1">
            <div className="md:sticky md:top-8 space-y-4 md:space-y-6">
              {/* Selector de cantidades */}
              {pasoActual === 'seleccion' && comidasSeleccionadas.length > 0 && (
                <div id="cart-section">
                  <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">
                    🎯 <span className="hidden md:inline">Ajusta cantidades</span>
                    <span className="md:hidden">Cantidades</span>
                  </h3>
                  <div className="space-y-2 md:space-y-3 max-h-64 md:max-h-80 overflow-y-auto">
                    {comidasSeleccionadas.map((comidaSeleccionada) => (
                      <SelectorCantidad
                        key={comidaSeleccionada.comida.id}
                        comidaSeleccionada={comidaSeleccionada}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Simulador de precios con información de entrega - Primero en mobile */}
              <div className="order-first md:order-last">
                <SimuladorPrecios mostrarEnResumen={pasoActual === 'resumen'} pasoActual={pasoActual} />
              </div>

              {/* Navegación entre pasos */}
              {pasoActual !== 'resumen' && (
                <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-gray-200">
                  <div className="space-y-3">
                    <button
                      onClick={siguientePaso}
                      disabled={!puedeAvanzar()}
                      className="w-full bg-amber-300 hover:bg-amber-400 disabled:bg-amber-50 text-amber-800 font-bold py-4 px-6 md:px-8 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed text-base md:text-lg"
                    >
                      <span className="hidden md:inline">
                        {pasoActual === 'seleccion' ? 'Continuar a Fecha y Horario' :
                         pasoActual === 'fecha-horario' ? 'Continuar' : 'Siguiente'}
                      </span>
                      <span className="md:hidden">
                        Continuar
                      </span>
                    </button>

                    {pasoActual !== 'seleccion' && (
                      <button
                        onClick={pasoAnterior}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 px-6 md:px-8 rounded-lg transition-colors duration-200 border-2 border-gray-200 hover:border-gray-300 text-base md:text-lg"
                      >
                        <span className="hidden md:inline">Paso Anterior</span>
                        <span className="md:hidden">Anterior</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
             {/* Cart Notification for Mobile */}
       <CartNotification pasoActual={pasoActual} />
    </div>
  )
}
