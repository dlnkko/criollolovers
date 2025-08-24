import CrearPedido from '@/components/CrearPedido'

// Forzar renderizado dinámico para evitar errores de Supabase durante build
export const dynamic = 'force-dynamic'

export default function CrearPedidoPage() {
  return <CrearPedido />
}
