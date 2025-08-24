-- Insertar manualmente usuarios existentes de auth.users a usuarios
-- Ejecutar en Supabase SQL Editor

INSERT INTO usuarios (id, email, created_at)
SELECT 
    au.id,
    au.email,
    au.created_at
FROM auth.users au
LEFT JOIN usuarios u ON au.id = u.id
WHERE u.id IS NULL; -- Solo insertar los que no existen

-- Verificar que se insertaron
SELECT COUNT(*) as usuarios_insertados FROM usuarios;
