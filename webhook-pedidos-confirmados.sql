-- Configurar webhook para pedidos confirmados
-- Ejecutar en Supabase SQL Editor

-- Crear tabla para logs de webhooks (opcional, para debugging)
CREATE TABLE IF NOT EXISTS webhook_logs (
  id SERIAL PRIMARY KEY,
  event_type TEXT,
  payload JSONB,
  response TEXT,
  status INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Función para enviar webhook cuando se confirma un pedido
CREATE OR REPLACE FUNCTION notify_order_confirmed()
RETURNS TRIGGER AS $$
DECLARE
  webhook_url TEXT := 'https://tu-n8n-webhook-url.com/webhook/order-confirmed';  -- Cambia esta URL
  payload JSONB;
  response TEXT;
BEGIN
  -- Solo proceder si el estado cambió a 'confirmado' o 'pagado'
  IF NEW.estado IN ('confirmado', 'pagado') AND (OLD.estado IS NULL OR OLD.estado != NEW.estado) THEN
    
    -- Construir payload del webhook
    payload := jsonb_build_object(
      'pedido_id', NEW.id,
      'usuario_id', NEW.usuario_id,
      'estado', NEW.estado,
      'total', NEW.total,
      'fecha_pedido', NEW.fecha_pedido,
      'fecha_entrega', NEW.fecha_entrega,
      'horario_entrega', NEW.horario_entrega,
      'direccion_entrega', NEW.direccion_entrega,
      'telefono', NEW.telefono,
      'notas', NEW.notas,
      'metodo_pago', NEW.metodo_pago,
      'comidas', NEW.comidas,
      'timestamp', NOW()
    );
    
    -- Enviar webhook (usando extensions/http si está habilitada)
    -- Si no tienes la extensión http, comenta estas líneas
    /*
    SELECT content INTO response
    FROM http((
      'POST',
      webhook_url,
      ARRAY[http_header('Content-Type', 'application/json')],
      payload::text
    ));
    */
    
    -- Log del webhook para debugging
    INSERT INTO webhook_logs (event_type, payload, response, status)
    VALUES ('order_confirmed', payload, response, 200);
    
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Crear trigger para pedidos confirmados
DROP TRIGGER IF EXISTS on_order_confirmed ON pedidos;
CREATE TRIGGER on_order_confirmed
  AFTER UPDATE ON pedidos
  FOR EACH ROW EXECUTE FUNCTION notify_order_confirmed();

-- Verificar que se creó correctamente
SELECT 'Webhook para pedidos confirmados configurado' as status;
