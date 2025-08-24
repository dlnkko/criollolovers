-- Agregar las columnas imagen y descripcion que faltan en la tabla comidas
-- Ejecuta este SQL PRIMERO antes de actualizar las URLs

-- Agregar columna imagen
ALTER TABLE comidas 
ADD COLUMN IF NOT EXISTS imagen TEXT;

-- Agregar columna descripcion  
ALTER TABLE comidas 
ADD COLUMN IF NOT EXISTS descripcion TEXT;

-- Verificar que se agregaron las columnas
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'comidas' 
AND column_name IN ('imagen', 'descripcion');

-- Ahora SÍ puedes actualizar la imagen de Carapulcra
UPDATE comidas SET imagen = 'https://pkvkylkpgcqldzfbcwov.supabase.co/storage/v1/object/public/comidas/carapulcra_800x534.webp' 
WHERE nombre = 'Carapulcra';

-- Verificar que se actualizó
SELECT nombre, imagen FROM comidas WHERE nombre = 'Carapulcra';
