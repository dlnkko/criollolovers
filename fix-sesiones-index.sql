-- Crear índice único para session_id y limpiar datos
-- Ejecutar en Supabase SQL Editor

-- 1. Limpiar datos de prueba existentes
DELETE FROM sesiones_usuario WHERE session_id = 'test_session_123';

-- 2. Crear índice único para session_id
CREATE UNIQUE INDEX IF NOT EXISTS idx_sesiones_usuario_session_id 
ON sesiones_usuario(session_id);

-- 3. Verificar que el índice se creó
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename = 'sesiones_usuario';

SELECT 'Índice único creado para session_id' as status;
