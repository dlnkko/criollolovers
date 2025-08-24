-- Script de diagnóstico para verificar el trigger y función
-- Ejecutar en Supabase SQL Editor

-- 1. Verificar si el trigger existe
SELECT 
    tgname as trigger_name,
    tgrelid::regclass as table_name,
    proname as function_name
FROM pg_trigger t
JOIN pg_proc p ON t.tgfoid = p.oid
WHERE tgname = 'on_auth_user_created';

-- 2. Verificar si la función existe
SELECT 
    proname as function_name,
    prosrc as function_code
FROM pg_proc 
WHERE proname = 'handle_new_user';

-- 3. Verificar usuarios en auth.users (deberían existir)
SELECT 
    id,
    email,
    created_at,
    raw_user_meta_data
FROM auth.users
ORDER BY created_at DESC
LIMIT 5;

-- 4. Verificar estructura de la tabla usuarios
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'usuarios' 
    AND table_schema = 'public'
ORDER BY ordinal_position;
