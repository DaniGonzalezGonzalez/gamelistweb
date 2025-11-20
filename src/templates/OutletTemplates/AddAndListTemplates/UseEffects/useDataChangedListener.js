import { useEffect } from 'react';

export const useDataChangedListener = (fetchData, filtroPlataforma) => {
  useEffect(() => { 
    // Ejecutar fetchData una vez al montar el componente
    fetchData();
    
    const handleDataChanged = () => {
      fetchData();  // Ejecutar fetchData cuando el evento 'data-changed' se dispara
    };

    // Añadir el listener para el evento
    document.addEventListener('data-changed', handleDataChanged);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      document.removeEventListener('data-changed', handleDataChanged);
    };
  }, [filtroPlataforma]);  // Dependencia en fetchData, para evitar llamadas innecesarias
};
