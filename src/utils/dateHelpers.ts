export class DateHelpers {
  static formatearFecha(fecha: string | Date): string {
    const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha
    return fechaObj.toLocaleDateString('es-PE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  static formatearFechaCorta(fecha: string | Date): string {
    const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha
    return fechaObj.toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  static formatearFechaHora(fecha: string | Date): string {
    const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha
    return fechaObj.toLocaleString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  static obtenerDiaSemana(fecha: string | Date): string {
    const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha
    return fechaObj.toLocaleDateString('es-PE', { weekday: 'long' })
  }

  static obtenerMes(fecha: string | Date): string {
    const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha
    return fechaObj.toLocaleDateString('es-PE', { month: 'long' })
  }

  static esHoy(fecha: string | Date): boolean {
    const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha
    const hoy = new Date()
    return fechaObj.toDateString() === hoy.toDateString()
  }

  static esManana(fecha: string | Date): boolean {
    const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha
    const manana = new Date()
    manana.setDate(manana.getDate() + 1)
    return fechaObj.toDateString() === manana.toDateString()
  }

  static obtenerTiempoRelativo(fecha: string | Date): string {
    const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha
    const ahora = new Date()
    const diffMs = ahora.getTime() - fechaObj.getTime()
    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDias === 0) return 'Hoy'
    if (diffDias === 1) return 'Ayer'
    if (diffDias < 7) return `Hace ${diffDias} días`
    if (diffDias < 30) return `Hace ${Math.floor(diffDias / 7)} semanas`
    if (diffDias < 365) return `Hace ${Math.floor(diffDias / 30)} meses`
    return `Hace ${Math.floor(diffDias / 365)} años`
  }
}
