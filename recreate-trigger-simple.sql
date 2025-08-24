-- Recrear trigger de forma simple
-- Ejecutar en Supabase SQL Editor

-- Eliminar trigger y función si existen
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Crear función simple que solo use campos básicos
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insertar con manejo de errores
  BEGIN
    INSERT INTO usuarios (id, email, created_at)
    VALUES (NEW.id, NEW.email, NOW());
  EXCEPTION
    WHEN OTHERS THEN
      -- Log del error (opcional)
      RAISE LOG 'Error insertando usuario: %', SQLERRM;
  END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Crear trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Verificar que se creó correctamente
SELECT 'Trigger creado exitosamente' as status;
