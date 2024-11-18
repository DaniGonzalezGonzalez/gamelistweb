import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addDocument, uploadFileToSupabase } from "../api/supabase/cloud-supabase"

export function useAdd(tituloRef, tipoContenidoRef) {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [file1, setFile1] = useState(null)
    const [nombreArchivo, setNombreArchivo] = useState('')

    const guardarDatos = async (tipoContenido, data) => {
        setError(null)
        setIsLoading(true)
        try {
            if (!data.titulo || !data.titulo.length) throw new Error('El campo título no puede estar vacío')
            // Validar y eliminar campos vacíos para columnas numéricas
            if (data.notaMetacriticPrensa === '') delete data.notaMetacriticPrensa
            if (data.notaMetacriticUsuarios === '') delete data.notaMetacriticUsuarios
            if (data.tiempoCompletionist === '') delete data.tiempoCompletionist
            if (data.tiempoMainAndSides === '') delete data.tiempoMainAndSides
            if (data.tiempoMainStory === '') delete data.tiempoMainStory

            if (data.file1 === '') delete data.file1
            await addDocument(tipoContenido, data)
            console.log('Documento añadido con éxito!')
            navigate('/')
        } catch (error) {
            setError(error.message)
            console.log('Error en el try de guardarDatos', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isLoading) return // Evita llamadas múltiples mientras se está cargando
        handleUpload(e)
    }

    const handleUpload = async (e) => {
        try {
            const tipoContenido = tipoContenidoRef.current.value
            const formData = new FormData(e.target)
            const entries = formData.entries()
            const obj = Object.fromEntries(entries)
            const url1 = await uploadGameFile(file1, tipoContenido, `${nombreArchivo}_file1`)
            obj.url = [
                url1, 
            ]
            guardarDatos(tipoContenido, obj)
        } catch (error) {
            console.log(error)
        }
    }

    const uploadGameFile = async (file, tipoContenido, nombre) => {
        const bucketName = 'gameImages' // Asegúrate de definir correctamente el nombre del bucket aquí
        if (!file) return ''
        const fileUrl = await uploadFileToSupabase(file, `${tipoContenido}/${nombre}`, bucketName)
        return fileUrl
    }


    const handleNombreArchivo = (e) => {
        setNombreArchivo(e.target.value)
    }


    const handleFileChange = (e) => {
        setFile1(e.target.files[0])
    }


    return {
        handleFileChange,
        handleSubmit,
        error,
        isLoading,
        handleNombreArchivo,
        nombreArchivo,
    }
}
