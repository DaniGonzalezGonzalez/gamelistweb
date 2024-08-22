import { supabase } from './supabase'; // Suponiendo que `supabase` está exportado de tu configuración

// Obtener todos los registros de una tabla
export async function getDocuments(tableName) {
  const { data, error } = await supabase.from(tableName).select('*'); // Obtiene todos los registros
  if (error) {
    throw new Error("Error al obtener documentos: " + error.message);
  }
  
  return data;
}



/** // Añadir documento
 *
 * @param {*} tableName Nombre de la tabla donde se van a insertar los datos.
 * @param {Object} data Objeto con los datos que se van a insertar en la tabla.
 * @return {Object} El objeto insertado con la propiedad de id si la inserción es exitosa.
 */
export const addDocument = async (tableName, data) => {
    // const { data: insertedData, 
    //   // error 
    // } = 

    await supabase.from(tableName).insert([data]);
     
    // if (error) {
    //   console.error("Error al añadir documento:", error.message);
    //   throw new Error("Error al añadir documento: " + error.message);
    // }
    
    // return insertedData[0]; 
    // Devuelve el primer registro insertado
  };



  /** // Obtener solo 1 documento
     * @param {String} tableName Nombre de la tabla
     * @param {String} id Referencia del documento a recuperar
     * @returns {Object} Objeto con las columnas del documento o null si no lo encuentra
     */
export const getDocument = async (tableName, id) => {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('id', id)  // Asume que el campo de identificador es 'id'
      .single();     // Espera un solo registro
  
    if (error) {
      throw new Error("Error al obtener el documento: " + error.message);
    }
  
    return data || null; // Devuelve los datos o null si no se encuentra nada
  };






  /** // Obtener documentos con filtros
 * @param {String} tableName Nombre de la tabla
 * @param {Array} filters Array de filtros en formato { field: 'campo', value: 'valor' }
 * @returns {Array} Array de documentos filtrados
 */
export const getDocumentsWithFilter = async (tableName, filters) => {
    try {
      let query = supabase.from(tableName).select('*');
  
      // Aplicar filtros
      filters.forEach(filter => {
        query = query.filter(filter.field, 'eq', filter.value);
      });
  
      // Ejecutar la consulta
      const { data, error } = await query;
  
      if (error) {
        throw new Error("Error al obtener documentos filtrados: " + error.message);
      }
  
      return data || []; // Devuelve los datos o un array vacío si no hay resultados
    } catch (error) {
      throw new Error("Error al obtener documentos filtrados: " + error.message);
    }
  };


  /** // Obtener documentos con filtros
 * @param {String} tableName Nombre de la tabla
 * @param {Array} filters Array de filtros en formato { field: 'campo', value: 'valor' }
 * @returns {Array} Array de documentos filtrados
 */
  export const getRecentGamesByState = async (tableName, estado, email) => {
    try {
      // Determinar el orden basado en el estado
      const orderDirection = estado === 'En lista' ? 'asc' : 'desc';
  
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('estado', estado)
        .eq('infouser', email)
        .order('fechaActualizacion', { ascending: orderDirection === 'asc' })
        .limit(4);
  
      if (error) {
        throw new Error("Error al obtener juegos: " + error.message);
      }
  
      return data || [];
    } catch (error) {
      throw new Error("Error al obtener juegos: " + error.message);
    }
  };





  /** 
 * Borrar un registro de una tabla específica en Supabase
 *
 * @param {string} tableName Nombre de la tabla de la que se quiere borrar el registro
 * @param {string} id Identificador del registro que se va a borrar
 */
export const deleteDocument = async (tableName, id) => {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);  // Aquí 'id' es el nombre de la columna que actúa como identificador del registro
  
    if (error) {
      throw new Error(`Error al borrar el documento: ${error.message}`);
    }
  }



  /** 
 * Actualizar un registro en una tabla específica en Supabase
 *
 * @param {string} tableName Nombre de la tabla en la que se quiere actualizar el registro
 * @param {string} id Identificador del registro que se va a actualizar
 * @param {Object} data Objeto con los campos a actualizar y sus nuevos valores
 */
export const updateDocument = async (tableName, id, data = {}) => {
    const { error } = await supabase
      .from(tableName)
      .update(data)
      .eq('id', id);  // Aquí 'id' es el nombre de la columna que actúa como identificador del registro
  
    if (error) {
      throw new Error(`Error al actualizar el documento: ${error.message}`);
    }
  }






/**
 * Subir un archivo a Supabase Storage y obtener su URL pública
 * @param {File} file - El archivo que se va a subir
 * @param {string} path - La ruta en el bucket donde se almacenará el archivo
 * @param {string} bucketName - El nombre del bucket en Supabase Storage
 * @returns {string} La URL pública del archivo subido
 */
export const uploadFileToSupabase = async (file, path, bucketName) => {
  try {
    // Subir el archivo
    const { error: uploadError } = await supabase.storage.from(bucketName).upload(path, file);
    if (uploadError) {
      throw new Error("Error al subir archivo: " + uploadError.message);
    }
    // Obtener la URL pública del archivo subido
    const { data, error: urlError } = supabase.storage.from(bucketName).getPublicUrl(path);
    const publicURL = data.publicUrl

    if (!publicURL) {
      throw new Error("URL pública no disponible");
    }
    return publicURL;
  } catch (error) {
    console.error("Error en uploadFileToSupabase:", error.message);
    throw error;  // Vuelve a lanzar el error para que pueda ser capturado en la función de llamada
  }
};


// Para obtener la imagen de la plataforma personalizada
export const getPlatformImageUrl = async (platform) => {
  const plataforma = platform.replace(/\s+/g, '').trim()
  const { data, error } = await supabase.storage.from('platformImages').list();
  if (error) {
    console.error('Error fetching platform images:', error);
    return null;
  }
  
  const image = data.find(file => file.name.startsWith(plataforma));
  const platformImageUrl = supabase.storage.from('platformImages').getPublicUrl(image.name).data.publicUrl
  return image ? platformImageUrl : null;
};