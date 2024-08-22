import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { addDocument, getDocuments, uploadFileToSupabase } from "../api/supabase/cloud-supabase";
import { cleanTitle } from "../templates/helpers/no-components/constants";

export function useAddGameToList(tituloRef, tipoContenidoRef) {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [nombreArchivo, setNombreArchivo] = useState('');
    const [nombrePlataforma, setNombrePlataforma] = useState('');
    const { user } = useContext(UserContext);

    const [juegos, setJuegos] = useState([]);
    const [isJuegosLoaded, setIsJuegosLoaded] = useState(false); // Estado para controlar la carga de juegos
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar el envío del formulario



    // Obtener documentos de la base de datos
    const fetchJuegos = useCallback(async () => {
      try {
        const datosJuegos = await getDocuments('Juegos');
        setJuegos(datosJuegos);
        setIsJuegosLoaded(true); // Marcar que los juegos se han cargado
      } catch (error) {
        console.error("Error al obtener juegos:", error);
      }
    }, []);
  

    // Guardar datos en la base de datos
    const guardarDatos = async (tipoContenido, data) => {
      setError(null);
      setIsLoading(true);
      try {
        if (!data.titulo || !data.titulo.length) throw new Error('El campo título no puede estar vacío');
        const juegoExistente = juegos.find(item => item.titulo === data.titulo && item.infouser === user.email);
        if (juegoExistente) {
          throw new Error(`${data.titulo} ya existe en tu colección de juegos`);
        }

        if (data.file1 === '') delete data.file1;
        if (data.file2 === '') delete data.file2;
        if (data.url[0] === '') delete data.url;

        await addDocument(tipoContenido, data);
        setJuegos(prevJuegos => [...prevJuegos, data]);

        setSuccess(
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <div>{cleanTitle(data?.titulo)} registrado correctamente</div>
            <img className="object-cover rounded-lg shadow-md w-28 h-28 hover:rounded-lg hover:shadow-gray-700 shadow-black" src={data.imageUrl} alt="No hay imagen del juego" />
          </div>
        );
        setTimeout(() => {
          setSuccess(null);
        }, 7000);
        // navigate('/');
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setIsLoading(false);
        setIsSubmitting(false); // Permitir el envío de nuevo
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (isLoading || isSubmitting) return; // Evita llamadas múltiples mientras se está cargando

      setIsSubmitting(true); // Marcar que se está enviando
  
      // Actualizar la lista de juegos si no está cargada
      if (!isJuegosLoaded) {
        await fetchJuegos();
      }
      // Realizar la subida del archivo y guardar los datos
      handleUpload(e);
    };

    // Subir archivos y guardar datos
    const handleUpload = async (e) => {
      if (isLoading) return; // Evita llamadas múltiples mientras se está cargando

      try {
        const tipoContenido = tipoContenidoRef.current.value;
        const formData = new FormData(e.target);
        const entries = formData.entries();
        const obj = Object.fromEntries(entries);
        // Manejo del campo notaJuego
        const notaJuego = obj.notaJuego === "" ? null : parseFloat(obj.notaJuego);
        obj.notaJuego = notaJuego;
        const imageUrl = await uploadFile(imageFile, tipoContenido, `${nombreArchivo}_image`);
        obj.url = [imageUrl];
        guardarDatos(tipoContenido, obj);
      } catch (error) {
        console.log(error);
      }
    };

    // Subir archivo a Supabase
    const uploadFile = async (file, tipoContenido, nombre) => {
      if (!file) return '';
      const fileUrl = await uploadFileToSupabase(file, `${tipoContenido}/${nombre}`);
      return fileUrl;
    };

    const handleImageFileChange = (e) => {
      setImageFile(e.target.files[0]);
    };

    // const handlePlatformImageFileChange = (e) => {
    //   setPlatformImageFile(e.target.files[0]);
    // };

    const handleNombreArchivo = (e) => {
      setNombreArchivo(e.target.value);
    };

    const handleNombrePlataforma = (e) => {
      setNombrePlataforma(e.target.value);
    };

    useEffect(() => {
      fetchJuegos(); // Cargar juegos al montar el componente
    }, [fetchJuegos]);

    return {
      handleSubmit,
      error,
      success,
      isLoading,
      handleImageFileChange,
      // handlePlatformImageFileChange,
      handleNombreArchivo,
      handleNombrePlataforma,
      nombreArchivo,
      nombrePlataforma
    };
}
