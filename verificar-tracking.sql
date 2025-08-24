-- Verificar que las tablas de tracking estén creadas
-- Ejecutar en Supabase SQL Editor

-- 1. Verificar estructura de sesiones_usuario
SELECT 'Tabla sesiones_usuario:' as info;
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'sesiones_usuario' 
    AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Verificar estructura de pedidos_abandonados
SELECT 'Tabla pedidos_abandonados:' as info;
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'pedidos_abandonados' 
    AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. Verificar datos en sesiones_usuario
SELECT 'Datos en sesiones_usuario:' as info;
SELECT COUNT(*) as total_sesiones FROM sesiones_usuario;
SELECT * FROM sesiones_usuario ORDER BY ultima_actividad DESC LIMIT 5;

-- 4. Verificar datos en pedidos_abandonados
SELECT 'Datos en pedidos_abandonados:' as info;
SELECT COUNT(*) as total_abandonos FROM pedidos_abandonados;
SELECT * FROM pedidos_abandonados ORDER BY fecha_abandono DESC LIMIT 5;

-- 5. Probar inserción manual en sesiones_usuario
INSERT INTO sesiones_usuario (
    session_id,
    pagina_actual,
    paso_actual,
    carrito,
    total,
    dispositivo,
    navegador
) VALUES (
    'test_session_123',
    '/crear-pedido',
    'seleccion',
    '[]'::jsonb,
    0.00,
    'desktop',
    'chrome'
);

SELECT 'Test de inserción completado' as status;
