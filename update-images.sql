-- Script para actualizar las URLs de imágenes que ya tienes subidas
-- INSTRUCCIONES:
-- 1. Reemplaza las URLs con las que ya tienes en tu Storage
-- 2. Ejecuta este script en el SQL Editor de Supabase
-- 3. Agrega/edita las descripciones directamente en Supabase Table Editor

-- Ejemplo: Ya tienes Carapulcra, así que actualizo esa:
UPDATE comidas SET imagen = 'https://pkvkylkpgcqldzfbcwov.supabase.co/storage/v1/object/public/comidas/carapulcra_800x534.webp' 
WHERE nombre = 'Carapulcra';

-- Para las demás, reemplaza con tus URLs reales cuando las tengas:
-- UPDATE comidas SET imagen = 'TU_URL_REAL_AQUI' WHERE nombre = 'Ají de Gallina';
-- UPDATE comidas SET imagen = 'TU_URL_REAL_AQUI' WHERE nombre = 'Arroz con Pollo';
-- UPDATE comidas SET imagen = 'TU_URL_REAL_AQUI' WHERE nombre = 'Caucau';
-- UPDATE comidas SET imagen = 'TU_URL_REAL_AQUI' WHERE nombre = 'Frejol con Seco';
-- UPDATE comidas SET imagen = 'TU_URL_REAL_AQUI' WHERE nombre = 'Olluquito';
-- UPDATE comidas SET imagen = 'TU_URL_REAL_AQUI' WHERE nombre = 'Escabeche de Pollo';
-- UPDATE comidas SET imagen = 'TU_URL_REAL_AQUI' WHERE nombre = 'Pollo al Horno';
-- UPDATE comidas SET imagen = 'TU_URL_REAL_AQUI' WHERE nombre = 'Puré de Papa';
-- UPDATE comidas SET imagen = 'TU_URL_REAL_AQUI' WHERE nombre = 'Arroz Blanco';
-- UPDATE comidas SET imagen = 'TU_URL_REAL_AQUI' WHERE nombre = 'Papa a la Huancaína';

-- Verificar que se actualizaron correctamente
SELECT nombre, imagen FROM comidas WHERE imagen IS NOT NULL;
