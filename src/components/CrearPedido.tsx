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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30">
      {/* Header mejorado */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 shadow-xl border-b-2 border-orange-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <button
              onClick={handleVolverInicio}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold px-4 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm sm:text-base hidden sm:inline">Volver</span>
            </button>
            
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">
              Crear Pedido
            </h1>
            
            <div className="w-20 sm:w-24"></div>
          </div>
        </div>
      </div>

      {/* Indicador de pasos mejorado */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-4 md:py-5">
            <div className="flex items-center space-x-2 md:space-x-6 lg:space-x-8">
              {[
                { id: 'seleccion', label: 'Comidas', fullLabel: '1. Seleccionar Comidas', icon: '🍽️', number: 1 },
                { id: 'fecha-horario', label: 'Fecha', fullLabel: '2. Fecha y Horario', icon: '📅', number: 2 },
                { id: 'resumen', label: 'Confirmar', fullLabel: '3. Confirmar', icon: '✅', number: 3 }
              ].map((paso, index) => {
                const isActive = pasoActual === paso.id
                const isCompleted = ['seleccion', 'fecha-horario', 'resumen'].indexOf(pasoActual) > index
                
                return (
                  <div key={paso.id} className="flex items-center">
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg scale-110' 
                          : isCompleted
                          ? 'bg-green-500 text-white shadow-md'
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        <span className="text-lg md:text-xl">{paso.icon}</span>
                        {isCompleted && !isActive && (
                          <svg className="absolute inset-0 w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={`font-semibold text-xs md:text-sm transition-colors duration-300 ${
                        isActive ? 'text-orange-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        <span className="md:hidden">{paso.label}</span>
                        <span className="hidden md:inline">{paso.fullLabel}</span>
                      </span>
                    </div>
                    {index < 2 && (
                      <div className={`mx-2 md:mx-4 lg:mx-6 h-1 w-8 md:w-16 lg:w-24 rounded-full transition-all duration-500 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <div className="space-y-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
          {/* Columna izquierda - Selección de comidas */}
          <div className="lg:col-span-2">
            {pasoActual === 'seleccion' && (
              <div className="animate-fade-in-up">
                <ListaComidas />
              </div>
            )}

            {pasoActual === 'fecha-horario' && (
              <div className="animate-fade-in-up">
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 flex items-center">
                    <span className="text-3xl md:text-4xl mr-3">📅</span>
                    <span className="hidden md:inline bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                      Programa tu entrega
                    </span>
                    <span className="md:hidden">Fecha y Horario</span>
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base ml-11 md:ml-0">
                    Selecciona la fecha y horario de entrega para tu pedido
                  </p>
                </div>
                <SelectorFechaHorario />
              </div>
            )}

            {pasoActual === 'resumen' && (
              <div className="animate-fade-in-up">
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 flex items-center">
                    <span className="text-3xl md:text-4xl mr-3">📋</span>
                    <span className="hidden md:inline bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                      Resumen del pedido
                    </span>
                    <span className="md:hidden">Resumen</span>
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base ml-11 md:ml-0">
                    Revisa los detalles antes de confirmar tu pedido
                  </p>
                </div>
                <ResumenPedido
                  onConfirmar={handleConfirmarPedido}
                  onEditar={handleEditarPedido}
                />
              </div>
            )}
          </div>

          {/* Columna derecha - Panel de control */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4 md:space-y-5">
              {/* Selector de cantidades */}
              {pasoActual === 'seleccion' && comidasSeleccionadas.length > 0 && (
                <div id="cart-section" className="bg-white rounded-xl sm:rounded-2xl shadow-xl border-2 border-gray-100 p-3 sm:p-4 md:p-5 lg:p-6">
                  <div className="flex items-center mb-3 sm:mb-4 md:mb-5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mr-2 sm:mr-3 shadow-lg flex-shrink-0">
                      <span className="text-lg sm:text-xl md:text-2xl">🎯</span>
                    </div>
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-extrabold text-gray-900">
                      <span className="hidden sm:inline">Ajusta cantidades</span>
                      <span className="sm:hidden">Cantidades</span>
                    </h3>
                  </div>
                  <div className="space-y-2 sm:space-y-2.5 md:space-y-3 max-h-[260px] sm:max-h-[280px] md:max-h-64 lg:max-h-80 overflow-y-auto custom-scrollbar pr-1 sm:pr-2">
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
              <div className="order-first lg:order-last">
                <SimuladorPrecios mostrarEnResumen={pasoActual === 'resumen'} pasoActual={pasoActual} />
              </div>

              {/* Navegación entre pasos */}
              {pasoActual !== 'resumen' && (
                <div className="bg-white rounded-2xl shadow-xl p-5 md:p-6 border border-gray-100">
                  <div className="space-y-3">
                    <button
                      onClick={siguientePaso}
                      disabled={!puedeAvanzar()}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-200 disabled:to-gray-300 text-white disabled:text-gray-500 font-bold py-4 px-6 rounded-xl transition-all duration-300 disabled:cursor-not-allowed text-base md:text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100 flex items-center justify-center space-x-2"
                    >
                      <span className="hidden md:inline">
                        {pasoActual === 'seleccion' ? 'Continuar a Fecha y Horario →' :
                         pasoActual === 'fecha-horario' ? 'Ver Resumen →' : 'Siguiente →'}
                      </span>
                      <span className="md:hidden">
                        Continuar →
                      </span>
                    </button>

                    {pasoActual !== 'seleccion' && (
                      <button
                        onClick={pasoAnterior}
                        className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 text-base md:text-lg shadow-sm hover:shadow-md flex items-center justify-center space-x-2"
                      >
                        <span>←</span>
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
