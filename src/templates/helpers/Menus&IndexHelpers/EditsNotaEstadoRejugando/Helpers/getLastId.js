import { supabase } from "../../../../../api/supabase/supabase";

/**
 * Obtiene el último ID de la tabla 'Juegos' en Supabase.
 * @returns {Promise<number>} Último ID encontrado o 0 si no hay datos.
 * @throws {Error} Si ocurre un error al obtener los datos.
 */
export const getLastId = async () => {
  const { data, error } = await supabase
    .from('Juegos')
    .select('id')
    .order('id', { ascending: false })
    .limit(1);

  if (error) {
    console.error('Error obteniendo el último id:', error);
    throw error;
  }

  return data.length > 0 ? data[0].id : 0; // Si no hay datos, devolver 0
};
