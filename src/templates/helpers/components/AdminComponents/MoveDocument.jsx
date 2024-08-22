/* eslint-disable react/prop-types */

import { getDocumentsWithFilter } from "../../../../api/supabase/cloud-supabase";
import { supabase } from "../../../../api/supabase/supabase";
import { platformCollectionMap } from "../../no-components/constants";

export const existsDocument = async (tableName, id) => {
  try {
    const { data, error } = await supabase.from(tableName).select('id').eq('id', id).single(); // Solo necesitamos verificar un único documento
    if (error) {
      // Manejo de error si la consulta falla
      console.error(`Error al verificar si el documento existe: ${error.message}`);
      return false; // Si ocurre un error, asumimos que el documento no existe
    }

    return data !== null; // Si hay datos, el documento existe
  } catch (error) {
    console.error(`Error inesperado al verificar si el documento existe: ${error.message}`);
    return false;
  }
};

export const addOrUpdateDocument = async (tableName, doc) => {
  try {
    const { error } = await supabase.from(tableName).upsert([doc], { onConflict: ['id'] }); // Usa 'id' como la columna única para evitar conflictos
    if (error) {
      throw new Error(`Error al añadir o actualizar el documento: ${error.message}`);
    }
  } catch (error) {
    console.error(`Error inesperado al añadir o actualizar el documento: ${error.message}`);
  }
};


/**
 * Copiar documentos de una tabla a otra en Supabase
 * @param {string} sourceTable - Nombre de la tabla de origen
 * @param {string} targetTable - Nombre de la tabla de destino
 * @param {string} platformName - Valor para filtrar documentos de la tabla de origen
 */
const copyDocumentsByPlatform = async (sourceTable, targetTable, platformName) => {
  try {
    // Obtener documentos de la tabla de origen con el filtro especificado
    const documents = await getDocumentsWithFilter(sourceTable, [{ field: 'plataforma', value: platformName }]);
    
    if (documents.length > 0) {
      // Insertar documentos en la tabla de destino
      for (const doc of documents) {
        await addOrUpdateDocument(targetTable, doc); // Usa upsert para insertar o actualizar
      }
      
      console.log(`Documentos copiados exitosamente de ${sourceTable} a ${targetTable}`);
    } else {
      console.log(`No se encontraron documentos con la propiedad plataforma igual a "${platformName}" en ${sourceTable}`);
    }
  } catch (error) {
    console.error("Error copiando los documentos:", error);
  }
};

// Ejemplo de cómo llamar a la función
// copyDocumentsByPlatform('GamesBD', 'targetTableName', 'PlatformName');

export const CopyDocumentsByPlatform = ({ platformName }) => {
  const handleCopyDocuments = async () => {
    try {
      // Ajusta los nombres de las tablas según tu esquema en Supabase
      await copyDocumentsByPlatform('GamesBD', platformCollectionMap[platformName], platformName);
      console.log(`Documentos copiados a la colección ${platformCollectionMap[platformName]}`);
    } catch (error) {
      console.error("Error copiando los documentos:", error);
    }
  };

  return (
    <div>
      <button onClick={handleCopyDocuments}>Copiar Documentos a {platformName}</button>
    </div>
  );
};

