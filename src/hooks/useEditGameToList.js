import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteDocument, updateDocument, uploadFileToSupabase } from '../api/supabase/cloud-supabase'
import { cleanTitle } from '../templates/helpers/constants/constants'

export function useEditGameToList(uid, option, categoria) {
  const tituloRef = useRef(null)
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [file1, setFile1] = useState(null)
  const [file2, setFile2] = useState(null)
  const [nombreArchivo, setNombreArchivo] = useState('')
  const [nombrePlataforma, setNombrePlataforma] = useState('')

  // Actualizar datos en la base de datos
  const actualizarDatos = async (uid, data) => {
    setError(null)
    setIsLoading(true)
    try {
      // Validar título
      if (!data.titulo || !data.titulo.length) throw new Error('El campo título no puede estar vacío')
  
      // Validar notaJuego y convertir a número si es necesario
      if (data.notaJuego === '' || data.notaJuego === '-') {
        data.notaJuego = null // O podrías usar 0 si eso es adecuado para tu base de datos
      } else {
        data.notaJuego = parseFloat(data.notaJuego) // Asegúrate de que sea un número
        if (isNaN(data.notaJuego)) throw new Error('El campo notaJuego debe ser un número válido')
      }
  
      // Eliminar campos de archivo si no se subieron
      if (data.file1 === '') delete data.file1
      if (data.file2 === '') delete data.file2
  
      await updateDocument(option, uid, data)
      navigate(`/admin-edit-game-to-list-${categoria}`)
    } catch (error) {
      setError(error.message)
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleUpload(e)
  }

  // Subir archivos y actualizar los datos
  const handleUpload = async (e) => {
    try {
      const formData = new FormData(e.target)
      const entries = formData.entries()
      const obj = Object.fromEntries(entries)
      const fileUrls = await uploadFiles(file1, file2)
      if (fileUrls.length) {
        obj.url = fileUrls
      }
      if (uid) {
        actualizarDatos(uid, obj)
        const dataChangedEvent = new Event('data-changed')
        document.dispatchEvent(dataChangedEvent)
      } else {
        console.error('UID no está definido')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleNombreArchivo = (e) => {
    setNombreArchivo(e.target.value)
  }

  const handleNombrePlataforma = (e) => {
    setNombrePlataforma(e.target.value)
  }

  // Subir archivos a Supabase y retornar sus URLs
  const uploadFiles = async (file1, file2) => {
    const fileUrls = []
    if (file1) {
      const fileUrl = await uploadFileToSupabase(file1, `${option}/${nombreArchivo}_file1`)
      fileUrls.push(fileUrl)
    }
    if (file2) {
      const fileUrl = await uploadFileToSupabase(file2, `${option}/${nombreArchivo}_file2`)
      fileUrls.push(fileUrl)
    }
    return fileUrls // Retorna un array con URLs de archivos
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile1(selectedFile)
  }

  const handleFile2Change = (e) => {
    const selectedFile = e.target.files[0]
    setFile2(selectedFile)
  }

  // Eliminar documento
  const eliminarDocumento = async (uid) => {
    setError(null)
    try {
      await deleteDocument(option, uid)
      navigate(-1)
    } catch (error) {
      setError(error.message)
      console.log(error)
    }
  }

  const handleDelete = (uid, titulo) => {
    if (!window.confirm(`Confirma que desea eliminar el documento ${cleanTitle(titulo)}`)) return
    eliminarDocumento(uid)
    const dataChangedEvent = new Event('data-changed')
    document.dispatchEvent(dataChangedEvent)
  }

  return {
    handleSubmit,
    handleDelete,
    tituloRef,
    error,
    isLoading,
    handleFileChange,
    handleFile2Change,
    handleNombreArchivo,
    handleNombrePlataforma,
    nombreArchivo,
    nombrePlataforma
  }
}
