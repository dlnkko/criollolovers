-- Configuración completa de Supabase para el MVP de Criollo
-- Ejecutar este script en el SQL Editor de Supabase

-- 1. Crear tabla de comidas
CREATE TABLE IF NOT EXISTS comidas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL UNIQUE,
  descripcion TEXT,
  imagen TEXT,
  precio1 DECIMAL(10,2) NOT NULL CHECK (precio1 > 0),
  precio2 DECIMAL(10,2) NOT NULL CHECK (precio2 > 0),
  costo DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Crear tabla de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id TEXT NOT NULL,
  comidas JSONB NOT NULL,
  fecha DATE NOT NULL,
  horario TEXT NOT NULL CHECK (horario IN ('12:00 PM', '5:00 PM')),
  total DECIMAL(10,2) NOT NULL CHECK (total > 0),
  estado TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'confirmado', 'cancelado')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Crear tabla de pedidos abandonados para tracking
CREATE TABLE IF NOT EXISTS pedidos_abandonados (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id TEXT NOT NULL,
  comidas JSONB NOT NULL,
  fecha DATE NOT NULL,
  horario TEXT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Insertar datos de ejemplo de comidas (con placeholders para imágenes)
-- NOTA: Después de ejecutar este script, sube las imágenes a Supabase Storage y actualiza las URLs
INSERT INTO comidas (nombre, descripcion, imagen, precio1, precio2, costo) VALUES
  ('Ají de Gallina', 'Cremoso guiso de pollo desmenuzado en salsa de ají amarillo con nueces y queso parmesano', NULL, 12.00, 9.00, 6.70),
  ('Arroz con Pollo', 'Exquisito arroz con pollo tierno, verduras frescas y sofrito criollo tradicional', NULL, 17.00, 12.75, 9.10),
  ('Carapulcra', 'Guiso tradicional de papa seca con cerdo, especias aromáticas y maní molido', NULL, 23.00, 17.25, 13.10),
  ('Caucau', 'Estofado de mondongo tierno con papas doradas en salsa de cilantro y ají amarillo', NULL, 19.00, 14.25, 10.30),
  ('Frejol con Seco', 'Combinación de frejoles tiernos con seco de cabrito en salsa de cilantro', NULL, 32.00, 24.00, 18.10),
  ('Olluquito', 'Guiso tradicional de olluco con carne tierna y especias del campo peruano', NULL, 14.00, 10.50, 7.30),
  ('Escabeche de Pollo', 'Pollo marinado en vinagre con cebolla morada, ají y especias aromáticas', NULL, 16.00, 12.00, 8.70),
  ('Pollo al Horno', 'Pollo dorado al horno con hierbas finas y papas sazonadas', NULL, 14.00, 10.50, 7.50),
  ('Puré de Papa', 'Cremoso puré de papas peruanas con mantequilla y leche fresca', NULL, 7.00, 7.00, 3.90),
  ('Arroz Blanco', 'Arroz cocido al punto, esponjoso y aromático, perfecto acompañante', NULL, 2.00, 2.00, 1.10),
  ('Papa a la Huancaína', 'Papas amarillas bañadas en cremosa salsa huancaína con ají amarillo', NULL, 5.00, 5.00, 3.60)
ON CONFLICT (nombre) DO NOTHING;

-- 5. Crear índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_pedidos_usuario_id ON pedidos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_fecha ON pedidos(fecha);
CREATE INDEX IF NOT EXISTS idx_pedidos_estado ON pedidos(estado);
CREATE INDEX IF NOT EXISTS idx_pedidos_abandonados_usuario_id ON pedidos_abandonados(usuario_id);

-- 6. Crear función para calcular total automáticamente (opcional)
CREATE OR REPLACE FUNCTION calcular_total_pedido()
RETURNS TRIGGER AS $$
BEGIN
  -- El total se calcula en el frontend, pero aquí podríamos validar
  -- que el total coincida con la suma de las comidas
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Crear trigger para validar total (opcional)
CREATE TRIGGER trigger_validar_total
  BEFORE INSERT OR UPDATE ON pedidos
  FOR EACH ROW
  EXECUTE FUNCTION calcular_total_pedido();

-- 8. Crear políticas de seguridad RLS (Row Level Security)
ALTER TABLE comidas ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos_abandonados ENABLE ROW LEVEL SECURITY;

-- Política para comidas (lectura pública)
CREATE POLICY "Comidas visibles para todos" ON comidas
  FOR SELECT USING (true);

-- Política para pedidos (usuario solo ve sus propios pedidos)
CREATE POLICY "Usuarios ven solo sus pedidos" ON pedidos
  FOR ALL USING (usuario_id = current_user);

-- Política para pedidos abandonados (usuario solo ve sus propios)
CREATE POLICY "Usuarios ven solo sus pedidos abandonados" ON pedidos_abandonados
  FOR ALL USING (usuario_id = current_user);

-- 9. Crear vista para estadísticas (opcional)
CREATE OR REPLACE VIEW estadisticas_pedidos AS
SELECT 
  COUNT(*) as total_pedidos,
  COUNT(CASE WHEN estado = 'confirmado' THEN 1 END) as pedidos_confirmados,
  COUNT(CASE WHEN estado = 'pendiente' THEN 1 END) as pedidos_pendientes,
  COUNT(CASE WHEN estado = 'cancelado' THEN 1 END) as pedidos_cancelados,
  AVG(total) as promedio_total,
  SUM(total) as ingresos_totales
FROM pedidos;

-- 10. Crear función para obtener estadísticas de abandono
CREATE OR REPLACE FUNCTION obtener_estadisticas_abandono()
RETURNS TABLE (
  total_abandonados BIGINT,
  abandono_hoy BIGINT,
  comidas_mas_abandonadas TEXT[]
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::BIGINT as total_abandonados,
    COUNT(CASE WHEN DATE(created_at) = CURRENT_DATE THEN 1 END)::BIGINT as abandono_hoy,
    ARRAY_AGG(DISTINCT c.comida->>'nombre') as comidas_mas_abandonadas
  FROM pedidos_abandonados pa,
       LATERAL jsonb_array_elements(pa.comidas) AS c(comida);
END;
$$ LANGUAGE plpgsql;

-- 11. Crear bucket de storage para imágenes de comidas
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('comidas', 'comidas', true, 5242880, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- 12. Política de storage - permitir lectura pública
CREATE POLICY "Imágenes de comidas visibles públicamente" ON storage.objects
  FOR SELECT USING (bucket_id = 'comidas');

-- 13. Política de storage - permitir subida autenticada (opcional)
CREATE POLICY "Usuarios pueden subir imágenes de comidas" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'comidas' AND auth.role() = 'authenticated');

-- Verificar que todo esté creado correctamente
SELECT 'Tablas creadas:' as mensaje;
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name IN ('comidas', 'pedidos', 'pedidos_abandonados');

SELECT 'Datos de ejemplo insertados:' as mensaje;
SELECT COUNT(*) as total_comidas FROM comidas;

SELECT 'Storage bucket creado:' as mensaje;
SELECT name, public, file_size_limit FROM storage.buckets WHERE id = 'comidas';

SELECT 'Políticas RLS habilitadas:' as mensaje;
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('comidas', 'pedidos', 'pedidos_abandonados');
