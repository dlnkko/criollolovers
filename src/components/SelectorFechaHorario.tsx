'use client'

import { useState } from 'react'
import { usePedidosStore } from '@/store/pedidosStore'

export default function SelectorFechaHorario() {
  const { fechaSeleccionada, horarioSeleccionado, setFechaSeleccionada, setHorarioSeleccionado } = usePedidosStore()
  const [mesActual, setMesActual] = useState(new Date())
  
  const horariosDisponibles = ['12:00 PM', '5:00 PM']

  // Generar calendario
  const generarCalendario = (fecha: Date) => {
    const año = fecha.getFullYear()
    const mes = fecha.getMonth()
    const primerDia = new Date(año, mes, 1)
    const ultimoDia = new Date(año, mes + 1, 0)
    const primerDiaSemana = primerDia.getDay()
    
    const dias = []
    
    // Días del mes anterior para completar la primera semana
    for (let i = primerDiaSemana; i > 0; i--) {
      const dia = new Date(año, mes, 1 - i)
      dias.push({ fecha: dia, delMesActual: false })
    }
    
    // Días del mes actual
    for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
      const fechaDia = new Date(año, mes, dia)
      dias.push({ fecha: fechaDia, delMesActual: true })
    }
    
    // Días del siguiente mes para completar la última semana
    const diasRestantes = 42 - dias.length // 6 semanas x 7 días
    for (let dia = 1; dia <= diasRestantes; dia++) {
      const fechaDia = new Date(año, mes + 1, dia)
      dias.push({ fecha: fechaDia, delMesActual: false })
    }
    
    return dias
  }

  const esFechaDisponible = (fecha: Date) => {
    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)
    
    // Crear una copia de la fecha para no modificar el original
    const fechaComparar = new Date(fecha)
    fechaComparar.setHours(0, 0, 0, 0)
    
    // Permitir fechas hasta finales de 2026
    const finAño2026 = new Date(2026, 11, 31)
    finAño2026.setHours(0, 0, 0, 0)
    
    // Calcular la fecha mínima (hoy + 2 días)
    const fechaMinima = new Date(hoy)
    fechaMinima.setDate(hoy.getDate() + 2)
    
    const esValida = fechaComparar >= fechaMinima && fechaComparar <= finAño2026
    
    // Debug: solo loguear si es una fecha del mes actual
    if (fechaComparar.getMonth() === mesActual.getMonth() && fechaComparar.getFullYear() === mesActual.getFullYear()) {
      console.log('📅 Fecha:', fechaComparar.toISOString().split('T')[0], 
        '| Mínima:', fechaMinima.toISOString().split('T')[0],
        '| Máxima:', finAño2026.toISOString().split('T')[0],
        '| Disponible:', esValida)
    }
    
    return esValida
  }

  const cambiarMes = (direccion: number) => {
    const nuevaFecha = new Date(mesActual)
    nuevaFecha.setMonth(mesActual.getMonth() + direccion)
    
    // No permitir ir antes del mes actual (con 2 días de anticipación) o después de diciembre 2026
    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)
    const fechaMinima = new Date(hoy)
    fechaMinima.setDate(hoy.getDate() + 2)
    
    // Crear límites solo con año y mes para comparar
    const limiteInferior = new Date(fechaMinima.getFullYear(), fechaMinima.getMonth(), 1)
    const limiteSuperior = new Date(2026, 11, 1) // Diciembre 2026
    
    // Comparar solo año y mes
    const nuevaFechaComparar = new Date(nuevaFecha.getFullYear(), nuevaFecha.getMonth(), 1)
    const limiteInferiorComparar = new Date(limiteInferior.getFullYear(), limiteInferior.getMonth(), 1)
    const limiteSuperiorComparar = new Date(limiteSuperior.getFullYear(), limiteSuperior.getMonth(), 1)
    
    if (nuevaFechaComparar >= limiteInferiorComparar && nuevaFechaComparar <= limiteSuperiorComparar) {
      setMesActual(nuevaFecha)
    }
  }

  const nombresMeses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
  
  const diasCalendario = generarCalendario(mesActual)

  // const formatearFecha = (fecha: Date) => {
  //   return fecha.toLocaleDateString('es-PE', {
  //     weekday: 'long',
  //     month: 'long',
  //     day: 'numeric'
  //   })
  // }

  // const formatearFechaCorta = (fecha: Date) => {
  //   return fecha.toLocaleDateString('es-PE', {
  //     month: 'short',
  //     day: 'numeric'
  //   })
  // }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Mensaje informativo mejorado */}
      <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border-l-4 border-orange-500 p-5 rounded-r-xl shadow-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
              <span className="text-2xl">⚠️</span>
            </div>
          </div>
          <div className="ml-4 flex-1">
            <p className="text-base md:text-lg font-extrabold text-orange-900 mb-1">
              PEDIDOS CON 2 DÍAS DE ANTICIPACIÓN
            </p>
            <p className="text-sm md:text-base text-orange-700 leading-relaxed">
              Debes realizar tu pedido con al menos 2 días de anticipación para garantizar la disponibilidad
            </p>
          </div>
        </div>
      </div>

      {/* Calendario mejorado */}
      <div>
        <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-xl overflow-hidden">
          {/* Header del calendario */}
          <div className="flex items-center justify-between p-4 sm:p-5 md:p-6 bg-gradient-to-r from-gray-50 to-white border-b-2 border-gray-200">
            <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900 flex items-center">
              <span className="text-2xl md:text-3xl mr-3">📅</span>
              <span className="hidden sm:inline">Calendario</span>
            </h3>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  cambiarMes(-1)
                }}
                className="p-2.5 sm:p-3 hover:bg-orange-50 rounded-xl transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-95 border-2 border-gray-200 hover:border-orange-300"
                title="Mes anterior"
                aria-label="Mes anterior"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 min-w-[140px] sm:min-w-[160px] text-center">
                {nombresMeses[mesActual.getMonth()]} {mesActual.getFullYear()}
              </h4>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  cambiarMes(1)
                }}
                className="p-2.5 sm:p-3 hover:bg-orange-50 rounded-xl transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-95 border-2 border-gray-200 hover:border-orange-300"
                title="Mes siguiente"
                aria-label="Mes siguiente"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-5 md:p-6">
            {/* Días de la semana */}
            <div className="grid grid-cols-7 gap-2 mb-3">
              {diasSemana.map(dia => (
                <div key={dia} className="text-center text-xs sm:text-sm font-bold text-gray-600 py-2 uppercase tracking-wide">
                  {dia}
                </div>
              ))}
            </div>

            {/* Días del calendario */}
            <div className="grid grid-cols-7 gap-2">
              {diasCalendario.map((dia, index) => {
                // Usar formato YYYY-MM-DD sin problemas de zona horaria
                const fechaString = `${dia.fecha.getFullYear()}-${String(dia.fecha.getMonth() + 1).padStart(2, '0')}-${String(dia.fecha.getDate()).padStart(2, '0')}`
                const esDisponible = esFechaDisponible(dia.fecha)
                const esSeleccionado = fechaSeleccionada === fechaString
                
                const estaDeshabilitado = !esDisponible || !dia.delMesActual
                
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      console.log('📅 Click en fecha:', fechaString, '| Disponible:', esDisponible, '| Del mes actual:', dia.delMesActual)
                      if (esDisponible && dia.delMesActual) {
                        console.log('✅ Seleccionando fecha:', fechaString)
                        setFechaSeleccionada(fechaString)
                      } else {
                        console.log('❌ Fecha no disponible o no es del mes actual')
                      }
                    }}
                    disabled={estaDeshabilitado}
                    className={`
                      h-12 sm:h-14 md:h-16 w-full rounded-xl text-sm sm:text-base md:text-lg font-bold transition-all duration-300
                      ${estaDeshabilitado
                        ? 'text-gray-300 cursor-not-allowed opacity-40 bg-gray-50'
                        : esSeleccionado
                          ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl hover:shadow-2xl cursor-pointer transform scale-105 ring-4 ring-orange-200'
                          : 'text-gray-700 hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 hover:shadow-md cursor-pointer active:scale-95 bg-white border-2 border-transparent hover:border-orange-200'
                      }
                    `}
                  >
                    {dia.fecha.getDate()}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Selector de horario mejorado */}
      <div>
        <div className="mb-4 sm:mb-5">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 flex items-center">
            <span className="text-2xl md:text-3xl mr-3">🕐</span>
            <span className="hidden sm:inline">Selecciona el horario de entrega</span>
            <span className="sm:hidden">Horario de entrega</span>
          </h3>
          <p className="text-sm text-gray-600 ml-11 sm:ml-0">Elige el momento perfecto para recibir tu pedido</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {horariosDisponibles.map((horario) => {
            const isSelected = horarioSeleccionado === horario
            return (
              <button
                key={horario}
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log('🕐 Seleccionando horario:', horario)
                  setHorarioSeleccionado(horario)
                  console.log('✅ Horario seleccionado:', horario)
                }}
                style={{ pointerEvents: 'auto' }}
                className={`p-4 sm:p-5 md:p-6 rounded-2xl border-2 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer active:scale-95 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-offset-2 ${
                  isSelected
                    ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 text-orange-700 shadow-xl ring-4 ring-orange-200 transform scale-105'
                    : 'border-gray-200 hover:border-orange-300 bg-white hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100'
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl mb-2">
                    {horario === '12:00 PM' ? '🌞' : '🌅'}
                  </div>
                  <div className="text-base sm:text-lg md:text-xl font-extrabold mb-1">{horario}</div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">
                    {horario === '12:00 PM' ? 'Almuerzo' : 'Cena'}
                  </div>
                  {isSelected && (
                    <div className="mt-2 flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>
      </div>
  )
}
