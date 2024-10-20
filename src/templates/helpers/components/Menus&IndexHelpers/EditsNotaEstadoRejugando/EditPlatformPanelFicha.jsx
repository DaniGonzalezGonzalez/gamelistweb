/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from 'react';
import { getDocumentsWithFilter, getGameByTitle, updateDocument } from '../../../../../api/supabase/cloud-supabase';
import { ArrowLeft } from '../../../../../assets/Icons';
import { UserContext } from '../../../../../context/UserContext';

export function EditPlatformPanelFicha({ onClose, onPlatformChange, onAvanzar, textoBoton, onOmitir, platformActual, onAdded, tituloJuego, juegoId, isFromAddFicha }) {
  const panelRef = useRef(null);
  const [platform, setPlatform] = useState(platformActual || '');
  const [platformsList, setPlatformsList] = useState([]);
  const [plataformasExistentes, setPlataformasExistentes] = useState([]);

  const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error
  const [loading, setLoading] = useState(true); // Estado de carga

  const { user } = useContext(UserContext);
  const limpiarTituloJuego = (titulo) => {
    return titulo.replace(/ - [^-]*$/, '').trim(); // Limpiar el título para quitar lo que sigue al último " - "
  };

  useEffect(() => {
    const fetchGameData = async () => {
      const tituloLimpio = limpiarTituloJuego(tituloJuego);
      try {
        const result = await getGameByTitle(tituloLimpio, 'GamesBD', 1);

        if (result && result.length > 0) {
          const textoPlano = result[0].plataforma; // Obtén la plataforma del resultado
          setPlatform(textoPlano); // Establece la plataforma
          setPlatformsList(textoPlano.split(' - ')); // Establece la lista de plataformas en el estado
        } else {
          console.log('No se encontró el juego en GamesBD');
        }
      } catch (error) {
        console.error('Error al obtener el juego:', error);
      } finally {
        setLoading(false); // Termina la carga después de intentar obtener datos
      }
    };

    fetchGameData(); // Llama a la función para obtener los datos
  }, [tituloJuego]);



  useEffect(() => {
    const checkDuplicatePlatform = async () => {
      const tituloLimpio = limpiarTituloJuego(tituloJuego).trim();
  
      try {
        // Cambia el filtro para que busque títulos que contengan el título limpio
        const filters = [
          { field: 'titulo', value: `%${tituloLimpio}%` }, // Utiliza % para incluir coincidencias
          { field: 'infouser', value: user.email },
        ];
        const response = await getDocumentsWithFilter('Juegos', filters);
  
        // Verificar si hay juegos con el mismo título y usuario
        const plataformasExistentes = response.map((game) => game.plataforma);
        setPlataformasExistentes(plataformasExistentes)
  
        // Comprobar si la plataforma que se está añadiendo ya existe
        if (plataformasExistentes.includes(platform)) {
          setErrorMessage('Este juego ya está en la plataforma seleccionada.');
        } else {
          setErrorMessage(''); // Limpiar el mensaje de error si no hay duplicado
        }
      } catch (error) {
        console.error('Error al verificar la plataforma duplicada:', error);
      }
    };
  
    if (platform  && !loading) {
      checkDuplicatePlatform();
    }
  }, [platform, tituloJuego, loading, platformsList]);
 
  useEffect(() => {
    if (platform) {
      // Solo dividir si platform no es una cadena vacía
      setPlatformsList(platform.split(' - '));
    } else {
      setPlatformsList([]);
    }
  }, [platform]);


  const handlePlatformClick = async (value) => {
    const plataformaDuplicada = plataformasExistentes.find((plataforma) => plataforma === value);

    if (value === platformActual) {
      setErrorMessage('Ya tienes seleccionada esta plataforma.');
      setTimeout(() => {
        setErrorMessage(null); // Limpiar el mensaje de error después de 2 segundos
      }, 2000);
      return; // No proceder si la plataforma es la misma
    }


    if (plataformaDuplicada) {
      setErrorMessage('Este juego ya existe en la plataforma seleccionada.');
      
      // Configura un temporizador para limpiar el mensaje después de 2 segundos
      setTimeout(() => {
        setErrorMessage(null); // Limpiar el mensaje de error después de 2 segundos
      }, 2000);
      
      return; // No proceder si hay un duplicado
    }

    setPlatform(value);

    const nuevoTitulo = `${limpiarTituloJuego(tituloJuego)} - ${value}`;
    
    try {
      // Actualizar la plataforma y el título en la base de datos
      await updateDocument('Juegos', juegoId, {
        plataforma: value,
        titulo: nuevoTitulo // Actualizar el título
      });
      
      // Llamar a onAvanzar para cerrar el panel y avanzar
      onPlatformChange(value); // Notificar el cambio de plataforma
      if (isFromAddFicha === undefined) {
        onAvanzar(); // Llama a onAvanzar si isFromFicha es true
      } else {
        onClose(); // Cierra el panel si isFromFicha es false
      }

    } catch (error) {
      console.error('Error al actualizar el documento:', error);
    }
  };

  const handleOmitirPanel = () => {
    onClose();
  };

 // EditPlatformPanelFicha.js
 return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
    <div
      ref={panelRef}
      className="flex flex-col items-center w-5/6 px-3 pt-5 pb-10 text-gray-100 border-2 border-gray-100 shadow-lg sm:w-4/6 lg:px-3 lg:pt-5 lg:pb-20 lg:w-1/2 rounded-2xl bg-slate-950"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col items-center justify-center w-full mb-4">
        <div className='flex justify-start w-full'>
          <button
            onClick={handleOmitirPanel}
            className="text-sm text-white rounded-xl hover:scale-105"
          >
            <ArrowLeft />
          </button>
        </div>
        <p className='py-2 text-sm sm:py-0 lg:py-8 lg:text-lg'>Selecciona una plataforma</p>
      </div>
      {platformsList.length >1 && errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Mostrar mensaje de error */}
      <div className={`flex justify-center gap-2
      ${(platformsList.length > 2) && "grid justify-center gap-2 grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4"}
      ${platformsList.length > 6 && "grid justify-center gap-2 grid-cols-2 sm:grid-cols-5 lg:grid-cols-3"}

      `}>
        {platformsList.map((option) => {
          const formattedOption = option === "Xbox Series X-S" ? "Xbox-Series-X-S" : option.replace(/\s+/g, '-');
          const imageSrc = `/platformImages/${formattedOption}-Logo.webp`;

          return (
            <button
              key={option}
              onClick={() => handlePlatformClick(option)}
              className={`flex flex-col items-center p-3 hover:bg-gray-500 transition duration-300 rounded-2xl text-white border-2 w-28 sm:w-16 lg:w-40 bg-gray-300`}
            >
              <img
                className="object-contain w-16 h-10"
                src={imageSrc}
                alt={`Logo de ${option}`}
                title={`Plataforma: ${option}`}
              />
              {/* <span>{option}</span> */}
            </button>
          );
        })}
      </div>
      {/* {isFromAddFicha && (
        <button
          onClick={handleOmitirPanel} // Aquí puedes cambiar a la función que necesites para avanzar
          className="px-4 py-2 mt-4 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Avanzar
        </button>
      )} */}
    </div>
  </div>
);
}