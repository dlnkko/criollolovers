import { ComidaSeleccionada, obtenerPrecioPrincipal } from '@/lib/supabaseClient'

export class PriceCalculator {
  // Calcular subtotal de una comida específica
  static calcularSubtotal(comida: ComidaSeleccionada): number {
    const precio = obtenerPrecioPrincipal(comida.comida)
    return precio * comida.cantidad
  }

  // Calcular total del pedido
  static calcularTotal(comidas: ComidaSeleccionada[]): number {
    return comidas.reduce((total, comida) => total + this.calcularSubtotal(comida), 0)
  }

  // Sin descuentos adicionales - solo precios combo

  // Formatear precio para mostrar
  static formatearPrecio(precio: number | string): string {
    const precioNumerico = typeof precio === 'string' 
      ? parseFloat(precio) 
      : precio
    
    if (isNaN(precioNumerico)) {
      return 'S/ 0.00'  // Valor por defecto si el precio no es válido
    }
    
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(precioNumerico)
  }
}
