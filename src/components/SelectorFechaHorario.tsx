'use client'

import { useState } from 'react'
import { usePedidosStore } from '@/store/pedidosStore'

export default function SelectorFechaHorario() {
  const { fechaSeleccionada, horarioSeleccionado, setFechaSeleccionada, setHorarioSeleccionado } = usePedidosStore()
  const [mesActual, setMesActual] = useState(new Date())
  
  const horariosDisponibles = ['12:00 PM', '5:00 PM']

  // Generar calendario hasta fin de 2025
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
    const finAño2025 = new Date(2025, 11, 31)
    hoy.setHours(0, 0, 0, 0)
    fecha.setHours(0, 0, 0, 0)
    
    // Calcular la fecha mínima (hoy + 2 días)
    const fechaMinima = new Date(hoy)
    fechaMinima.setDate(hoy.getDate() + 2)
    
    return fecha >= fechaMinima && fecha <= finAño2025
  }

  const cambiarMes = (direccion: number) => {
    const nuevaFecha = new Date(mesActual)
    nuevaFecha.setMonth(mesActual.getMonth() + direccion)
    
    // No permitir ir antes del mes actual (con 2 días de anticipación) o después de diciembre 2025
    const hoy = new Date()
    const fechaMinima = new Date(hoy)
    fechaMinima.setDate(hoy.getDate() + 2)
    const limiteInferior = new Date(fechaMinima.getFullYear(), fechaMinima.getMonth(), 1)
    const limiteSuperior = new Date(2025, 11, 31)
    
    if (nuevaFecha >= limiteInferior && nuevaFecha <= limiteSuperior) {
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
    <div className="space-y-6">
      {/* Mensaje informativo */}
      <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded-r-lg">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-orange-500 text-xl">⚠️</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-semibold text-orange-800">
              PEDIDOS CON 2 DÍAS DE ANTICIPACIÓN
            </p>
            <p className="text-sm text-orange-700 mt-1">
              Debes realizar tu pedido con al menos 2 días de anticipación
            </p>
          </div>
        </div>
      </div>

      {/* Calendario */}
      <div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          {/* Header del calendario */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
              📅 <span className="ml-2 hidden sm:inline">Calendario</span>
            </h3>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => cambiarMes(-1)}
                className="p-2 sm:p-3 hover:bg-gray-100 rounded-full transition-colors cursor-pointer shadow-sm hover:shadow-md"
                title="Mes anterior"
              >
                <span className="text-lg sm:text-xl font-bold">←</span>
              </button>
              <h4 className="text-sm sm:text-lg font-medium text-gray-700 min-w-[120px] sm:min-w-[140px] text-center">
                {nombresMeses[mesActual.getMonth()]} {mesActual.getFullYear()}
              </h4>
              <button
                onClick={() => cambiarMes(1)}
                className="p-2 sm:p-3 hover:bg-gray-100 rounded-full transition-colors cursor-pointer shadow-sm hover:shadow-md"
                title="Mes siguiente"
              >
                <span className="text-lg sm:text-xl font-bold">→</span>
              </button>
            </div>
          </div>

          <div className="p-3 sm:p-4">
            {/* Días de la semana */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {diasSemana.map(dia => (
                <div key={dia} className="text-center text-xs sm:text-sm font-medium text-gray-500 py-2">
                  {dia}
                </div>
              ))}
            </div>

            {/* Días del calendario */}
            <div className="grid grid-cols-7 gap-1">
              {diasCalendario.map((dia, index) => {
                // Usar formato YYYY-MM-DD sin problemas de zona horaria
                const fechaString = `${dia.fecha.getFullYear()}-${String(dia.fecha.getMonth() + 1).padStart(2, '0')}-${String(dia.fecha.getDate()).padStart(2, '0')}`
                const esDisponible = esFechaDisponible(dia.fecha)
                const esSeleccionado = fechaSeleccionada === fechaString
                
                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (esDisponible && dia.delMesActual) {
                        setFechaSeleccionada(fechaString)
                      }
                    }}
                    disabled={!esDisponible || !dia.delMesActual}
                    className={`
                      h-10 sm:h-12 w-10 sm:w-12 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 cursor-pointer
                      ${!dia.delMesActual 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : esDisponible
                          ? esSeleccionado
                            ? 'bg-orange-500 text-white shadow-md hover:bg-orange-600'
                            : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                          : 'text-gray-400 cursor-not-allowed'
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

      {/* Selector de horario */}
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
          🕐 <span className="hidden sm:inline">Selecciona el horario de entrega</span>
          <span className="sm:hidden">Horario de entrega</span>
        </h3>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {horariosDisponibles.map((horario) => (
            <button
              key={horario}
              onClick={() => setHorarioSeleccionado(horario)}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                horarioSeleccionado === horario
                  ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md'
                  : 'border-gray-200 hover:border-orange-300 bg-white hover:bg-orange-50'
              }`}
            >
              <div className="text-center">
                <div className="text-xl sm:text-2xl mb-1">
                  {horario === '12:00 PM' ? '🌞' : '🌅'}
                </div>
                <div className="text-sm sm:text-lg font-semibold">{horario}</div>
                <div className="text-xs sm:text-sm text-gray-600">
                  {horario === '12:00 PM' ? 'Almuerzo' : 'Cena'}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      </div>
  )
}
