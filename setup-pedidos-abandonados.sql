-- Sistema de pedidos abandonados para remarketing
-- Ejecutar en Supabase SQL Editor

-- Crear tabla para tracking de sesiones y abandono
CREATE TABLE IF NOT EXISTS sesiones_usuario (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES auth.users(id),
  session_id TEXT, -- Para usuarios no logueados
  pagina_actual TEXT,
  paso_actual TEXT, -- 'seleccion', 'fecha-horario', 'resumen', 'pago'
  carrito JSONB, -- Contenido del carrito
  total DECIMAL(10,2),
  fecha_inicio TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ultima_actividad TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  dispositivo TEXT,
  navegador TEXT,
  ip_address INET,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT
);

-- Tabla específica para pedidos abandonados
CREATE TABLE IF NOT EXISTS pedidos_abandonados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES auth.users(id),
  session_id TEXT,
  carrito JSONB,
  total DECIMAL(10,2),
  paso_abandono TEXT, -- En qué paso se quedó
  tiempo_en_sitio INTEGER, -- Segundos en el sitio
  fecha_abandono TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fecha_ultima_actividad TIMESTAMP WITH TIME ZONE,
  intentos_recuperacion INTEGER DEFAULT 0,
  recuperado BOOLEAN DEFAULT FALSE,
  motivo_abandono TEXT, -- 'timeout', 'navegacion', 'cierre_navegador', etc.
  
  -- Datos de remarketing
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  dispositivo TEXT,
  navegador TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Función para detectar abandono automáticamente
CREATE OR REPLACE FUNCTION detectar_abandono()
RETURNS void AS $$
BEGIN
  -- Mover sesiones inactivas por más de 30 minutos a pedidos abandonados
  INSERT INTO pedidos_abandonados (
    usuario_id,
    session_id,
    carrito,
    total,
    paso_abandono,
    tiempo_en_sitio,
    fecha_abandono,
    fecha_ultima_actividad,
    motivo_abandono,
    utm_source,
    utm_medium,
    utm_campaign,
    dispositivo,
    navegador
  )
  SELECT 
    s.usuario_id,
    s.session_id,
    s.carrito,
    s.total,
    s.paso_actual,
    EXTRACT(EPOCH FROM (s.ultima_actividad - s.fecha_inicio))::INTEGER,
    NOW(),
    s.ultima_actividad,
    'timeout',
    s.utm_source,
    s.utm_medium,
    s.utm_campaign,
    s.dispositivo,
    s.navegador
  FROM sesiones_usuario s
  LEFT JOIN pedidos_abandonados pa ON (
    s.usuario_id = pa.usuario_id OR s.session_id = pa.session_id
  )
  WHERE s.ultima_actividad < NOW() - INTERVAL '30 minutes'
    AND s.carrito IS NOT NULL
    AND jsonb_array_length(s.carrito) > 0
    AND pa.id IS NULL; -- No duplicar

  -- Eliminar sesiones procesadas
  DELETE FROM sesiones_usuario 
  WHERE ultima_actividad < NOW() - INTERVAL '30 minutes';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Crear índices para mejor performance
CREATE INDEX IF NOT EXISTS idx_sesiones_usuario_actividad ON sesiones_usuario(ultima_actividad);
CREATE INDEX IF NOT EXISTS idx_sesiones_usuario_id ON sesiones_usuario(usuario_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_abandonados_fecha ON pedidos_abandonados(fecha_abandono);
CREATE INDEX IF NOT EXISTS idx_pedidos_abandonados_usuario ON pedidos_abandonados(usuario_id);

-- Función para analytics de abandono
CREATE OR REPLACE FUNCTION analytics_abandono()
RETURNS TABLE(
  paso TEXT,
  total_abandonos BIGINT,
  promedio_tiempo_segundos NUMERIC,
  dispositivo_mas_comun TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pa.paso_abandono as paso,
    COUNT(*) as total_abandonos,
    AVG(pa.tiempo_en_sitio) as promedio_tiempo_segundos,
    MODE() WITHIN GROUP (ORDER BY pa.dispositivo) as dispositivo_mas_comun
  FROM pedidos_abandonados pa
  WHERE pa.fecha_abandono >= NOW() - INTERVAL '30 days'
  GROUP BY pa.paso_abandono
  ORDER BY total_abandonos DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

SELECT 'Sistema de pedidos abandonados configurado' as status;
