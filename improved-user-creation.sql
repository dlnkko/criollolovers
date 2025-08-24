-- Mejorar la función para crear usuarios en la tabla personalizada
-- Ejecutar en Supabase SQL Editor

-- Primero, eliminar la función anterior si existe
DROP FUNCTION IF EXISTS handle_new_user();

-- Crear una función mejorada que capture más información del usuario
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

-- Crear el trigger (reemplazando el anterior si existe)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Verificar que la tabla usuarios tenga las columnas necesarias
-- Si no las tienes, ejecuta esto también:

-- ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS nombre TEXT;
-- ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS avatar_url TEXT;
-- ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS provider TEXT DEFAULT 'google';
-- ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
