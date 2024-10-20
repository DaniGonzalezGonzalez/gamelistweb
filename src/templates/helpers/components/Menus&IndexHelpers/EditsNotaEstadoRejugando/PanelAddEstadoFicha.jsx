/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from 'react';
import { addDocument, getDocumentsWithFilter } from '../../../../../api/supabase/cloud-supabase';
import { supabase } from '../../../../../api/supabase/supabase';
import { AbandonadoIcon, CheckIcon, CompleteIcon, DeleteIcon, PauseIcon, PlayIcon, ProximosIcon, StartIcon, UpdateIcon } from '../../../../../assets/Icons';
import { UserContext } from '../../../../../context/UserContext';
import { useEditGameToList } from '../../../../../hooks/useEditGameToList';
import { useFetchDataAndSort } from '../../../../../hooks/useFetchDataAndSort';
import { cleanTitle } from '../../../no-components/constants';

export function PanelAddEstadoFicha({ juego, onAvanzar, onClose, onEstadoChange, textoBoton, id, titulo, tabla, onAdded, estadoActual, onPosition, platform, platformDefault }) {
  const panelEstadoRef = useRef(null);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState(estadoActual || 'Jugando');
  const { handleDelete } = useEditGameToList(id, tabla)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleDeleteAndRefresh = (id, tabla) => {
    handleDelete(id, tabla)
  }
  

  const { user } = useContext(UserContext)
  const [registeredGames, setRegisteredGames] = useState([])
  const [noGamesLoaded, setNoGamesLoaded] = useState(false)
  // const [juegos, setJuegos] = useState([]);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar el envío del formulario
  
  const fetchInitialData = async () => {
      try {
        const filters = [
            { field: 'infouser', value: user.email },
        ];
        const datos = await getDocumentsWithFilter('Juegos', filters)
        setRegisteredGames(datos)
        if (datos.length === 0) {
            setNoGamesLoaded(true)
          } else {
              setNoGamesLoaded(false)
          }
      } catch (error) {
          setError("Error al cargar los datos")
      }
  }  
  
  useEffect(() => {   
      fetchInitialData()        
  }, [])

 
  const { fetchData, dataBD } = useFetchDataAndSort(estadoSeleccionado); // Trae los juegos del estado seleccionado

  useEffect(() => {
    fetchData(); // Llama a la función para obtener los datos cada vez que cambie el estado
  }, [estadoSeleccionado]);

  // Calcula la posición más alta y le añade 1
const newPosition = dataBD.length > 0 
? Math.max(...dataBD.map(item => item.position || 0)) + 1 // Encuentra el máximo y suma 1
: 1; // Si no hay juegos, la posición inicial será 1



  const getLastId = async () => {
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


  const addGameFicha = async (juego) => {
    if (!estadoSeleccionado) {
      return;
    }
      setIsLoading(true);

    try {
      // Verifica que el juego tenga título
      if (!juego.titulo) throw new Error('El campo título no puede estar vacío');
      
      // Obtenemos el último id y asignamos id + 1

      const lastId = await getLastId();
      
      juego.id = lastId + 1;   
      if (platformDefault && platformDefault !== 'null'){
        juego.titulo = juego.titulo + ' - ' + platformDefault
      } else {
        juego.titulo = juego.titulo + ' - ' + platform;   
      }      
      juego.infouser = user.email;
      juego.estado = estadoSeleccionado;     
      juego.position = newPosition; 
      if (platformDefault && platformDefault !== 'null'){
        juego.plataforma = platformDefault
      } else {
        juego.plataforma = platform
      }
      juego.tipoContenido = 'Juegos';

      // Lógica para añadir el juego a la base de datos (Supabase o lo que uses)
      await addDocument('Juegos', juego);
      setSuccess(`El juego ${juego.titulo} ha sido añadido correctamente`);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };





  const handleCerrarPanel = () => {
     // Solo llamamos a la función de cambio si el estado es diferente
    if (estadoSeleccionado !== estadoActual) {
      onEstadoChange(estadoSeleccionado); // Estado ha cambiado, hacemos el cambio
    }
    addGameFicha(juego); // Ejecuta la función para añadir el juego
    onAvanzar(); // Cerramos el panel
  };

  const handleEstadoClick = (value) => {
    setEstadoSeleccionado(value);
  };
  const estadoIconos = {
    'Jugando': <PlayIcon />,
    'Completando': <CompleteIcon />,
    'Terminado': <CheckIcon />,
    'En lista': <ProximosIcon />, // Define e importa otros iconos según sea necesario
    'Otra vez': <UpdateIcon />,
    'Pausado': <PauseIcon />,
    'Abandonado': <AbandonadoIcon />,
    'Lista de deseos': <StartIcon />,
  };

  const estados = Object.keys(estadoIconos);


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div
        ref={panelEstadoRef}
        className="scroll-container flex flex-col items-center p-6 text-gray-100 border-2 border-gray-100 rounded-lg shadow-lg bg-slate-950 max-h-[90vh] overflow-y-scroll w-5/6 sm:w-1/2 mt-14 sm:mt-0"
        onClick={(e) => e.stopPropagation()}
      >
      {onAdded && <div className="justify-center w-full gap-4 mb-4 text-lg font-semibold text-center">
          <p className='mt-4 text-sm lg:text-lg'>{cleanTitle(titulo)}</p>
        </div>}
        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
          {estados.map((option) => (
            <button
              key={option}
              onClick={() => handleEstadoClick(option)}
              className={`p-3 text-xs hover:bg-gray-500 transition duration-500 rounded-lg text-white ${estadoSeleccionado === option ? 'ring-2 ring-blue-500 bg-blue-600 hover:bg-blue-600' : ''} flex items-center`}
            >
              {/* Muestra el icono y el texto en el botón */}
              <span className="flex-shrink-0 mr-2">{estadoIconos[option]}</span>
              <span>{option}</span>
            </button>
          ))}
        </div>
        {onAdded && <button onClick={() => handleDeleteAndRefresh(id, titulo)} type="button" className={`p-3 text-xs transition duration-500 rounded-lg text-white hover:ring-2 hover:ring-red-500 hover:bg-red-600 flex items-center mt-2`}><div className='mr-2'><DeleteIcon w={6} h={6} /></div> <span className="flex-shrink-0">Eliminar de mis colecciones</span></button>}
          <div className='flex flex-col items-center justify-center w-full gap-3 mt-5 text-xs sm:gap-0 sm:flex-row sm:text-sm lg:mt-10'>
            {/* <button onClick={onAddGame}><span className='p-2 transition duration-500 bg-purple-700 border-2 border-purple-500 rounded-xl hover:bg-purple-600'>Terminar</span></button> */}
            <div className='flex items-center justify-center w-full'><button className='p-2 px-5 transition duration-500 bg-purple-700 border-2 border-purple-500 rounded-xl hover:bg-purple-600' onClick={handleCerrarPanel}>{textoBoton}</button></div>
            {/* <button className='text-xs font-thin transition duration-500 opacity-50 hover:opacity-100' onClick={onClose}><span className='p-1 transition duration-500 rounded-lg hover:bg-slate-700'>Cerrar</span></button> */}
          </div>
      </div>
    </div>
  );
}

