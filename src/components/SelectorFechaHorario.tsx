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
    
    return fecha > hoy && fecha <= finAño2025
  }

  const cambiarMes = (direccion: number) => {
    const nuevaFecha = new Date(mesActual)
    nuevaFecha.setMonth(mesActual.getMonth() + direccion)
    
    // No permitir ir antes del mes actual o después de diciembre 2025
    const hoy = new Date()
    const limiteInferior = new Date(hoy.getFullYear(), hoy.getMonth(), 1)
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
      {/* Calendario */}
      <div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          {/* Header del calendario */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              📅 <span className="ml-2">Calendario</span>
            </h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => cambiarMes(-1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                ←
              </button>
              <h4 className="text-lg font-medium text-gray-700 min-w-[140px] text-center">
                {nombresMeses[mesActual.getMonth()]} {mesActual.getFullYear()}
              </h4>
              <button
                onClick={() => cambiarMes(1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                →
              </button>
            </div>
          </div>

          <div className="p-4">
            {/* Días de la semana */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {diasSemana.map(dia => (
                <div key={dia} className="text-center text-sm font-medium text-gray-500 py-2">
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
                      h-10 w-10 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
                      ${!dia.delMesActual 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : esDisponible
                          ? esSeleccionado
                            ? 'bg-red-600 text-white shadow-md'
                            : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
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
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          🕐 Selecciona el horario de entrega
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {horariosDisponibles.map((horario) => (
            <button
              key={horario}
              onClick={() => setHorarioSeleccionado(horario)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                horarioSeleccionado === horario
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">
                  {horario === '12:00 PM' ? '🌞' : '🌅'}
                </div>
                <div className="text-lg font-semibold">{horario}</div>
                <div className="text-sm text-gray-600">
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
