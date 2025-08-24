-- Solución al error de dependencias
-- Ejecutar en Supabase SQL Editor

-- Paso 1: Eliminar el trigger primero
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Paso 2: Ahora eliminar la función
DROP FUNCTION IF EXISTS handle_new_user();

-- Paso 3: Crear la función mejorada
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO usuarios (
    id, 
    email, 
    nombre, 
    avatar_url, 
    provider,
    created_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url',
    'google',
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Paso 4: Recrear el trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Paso 5: Si necesitas agregar las columnas a tu tabla usuarios, ejecuta esto:
-- ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS nombre TEXT;
-- ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS avatar_url TEXT;
-- ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS provider TEXT DEFAULT 'google';
-- ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
