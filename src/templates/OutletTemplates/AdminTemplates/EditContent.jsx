import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEditar } from "../../../hooks/useEditar";
import { getDocuments } from "../../../api/supabase/cloud-supabase";


export function EditContent() {
  const [dataBD, setDataBD] = useState([])
  const [contenido, setContenido] = useState({});
  const [error, setError] = useState(null);
  const [option, setOption] = useState('GamesBD')
  const [isDisabled, setIsDisabled] = useState(true)
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const parametros = useParams()
  const { id } = parametros
  const { handleSubmit, tituloRef, handleDelete, isLoading, handleFileChange,
    //  handleFile2Change, 
     handleNombreArchivo, 
    //  handleNombrePlataforma, 
     nombreArchivo, 
    //  nombrePlataforma 
    } = useEditar(contenido.id, option)

  const fetchData = async () => {
    try {
      const datos = await getDocuments(option)
      setDataBD(datos)
    } catch (error) {
      setError("Error al cargar los datos")
    }
  }  

  useEffect(() => {
    fetchData()
    const handleDataChanged = () => {
      fetchData()
    }  
    document.addEventListener('data-changed', handleDataChanged);
    return () => {
      document.removeEventListener('data-changed', handleDataChanged);
    }
  }, []);
  // antes tenía dataBD en el useEffect pero me generó un bucle infinito

  const sortedData = dataBD.sort((a, b) => a.titulo.localeCompare(b.titulo))

  const handleOption = (e) => {
    setOption(e.target.value)
    getDocuments(e.target.value).then((datos) => setDataBD(datos))
  }

  const handleChange = (e) => {
    setContenido({
      ...contenido,
      [e.target.name]: e.target.value
    })
  }

  const handleEditarContenido = (item) => {
    setContenido({ ...item })
  }

  const handleGuardarContenido = async (e) => {
    e.preventDefault()
    setContenido({})
    await handleSubmit(e)
    console.log('Contenido guardado con exito')
  }

  const handleEliminar = () => {
    setIsDisabled(!isDisabled)
  }

 

  return (
    <> 
    { user.id && 
      <div>
        {error && (<div className="items-center justify-center h-screen"><span className="text-xl text-gray-900 font-montserrat">{error.message}</span></div>)}
        <div className="min-h-screen p-4 pt-20 pb-10 bg-gray-800">
          <div className="container p-4 mx-auto">
            <select name="tipoContenido" id="tipo-contenido"  className="p-2 border rounded" onChange={handleOption}>
              <option value="GamesBD">Base de datos de juegos</option>
              <option value="ArchivosGenerales">Archivos Generales</option>
            </select>
            <h2 className="mt-8 text-4xl text-center text-gray-100 font-montserrat">{option}</h2>
            {sortedData.map((item) => (
              <div key={item.id} className="flex justify-between p-4 mt-5 bg-gray-100 border border-white rounded">
                {
                  contenido && contenido.id === item.id ?
                  <form className="grid w-full gap-10 text-sm text-black md:flex" onSubmit={handleGuardarContenido}>
                      <div className='w-full'>
                        <div className="mb-3 text-lg font-bold text-gray-800 font-montserrat">
                          <label className="block font-bold text-gray-800 font-montserrat" htmlFor="titulo">Titulo</label>
                          <input ref={tituloRef} className="w-full p-2 border rounded" type="text" name="titulo" id="titulo" placeholder="Título" value={contenido.titulo} onChange={handleChange}/>
                        </div>
                        
                        <div className='flex flex-col gap-2'>
                          <label htmlFor="file1" className="block font-montserrat">Añadir imagen del juego
                          <input className="w-full p-2 mt-2 mb-2 text-sm font-medium text-gray-800 border rounded resize-none font-montserrat" type="text" name="nombreArchivo" value={nombreArchivo} placeholder="Nombre del juego" onChange={handleNombreArchivo}/>
                          <input className="w-full py-2 resize-none" htmlFor="file1" type="file" name="file1" id="file1" onChange={handleFileChange}/>
                          </label>
                        </div>

                        <div className='flex flex-col gap-2'>
                          <label htmlFor="descripcion" className="blockfont-montserrat">Descripción</label>
                          <textarea className="p-2 border rounded resize-none" name="descripcion" id="descripcion" placeholder="Añadir descripción" rows="3" cols="33"  value={contenido.descripcion} onChange={handleChange}></textarea>
                        </div>

                        <div className='flex flex-col gap-2'>
                          <label htmlFor="plataforma" className="block font-montserrat">Plataforma</label>
                          <textarea className="p-2 border rounded resize-none" name="plataforma" id="plataforma" placeholder="Añadir plataforma" rows="3" cols="33" value={contenido.plataforma} onChange={handleChange}></textarea>
                        </div>


                      <h2 className="text-sm">Datos de Metacritic</h2>
                          <div className="flex flex-col items-center justify-center flex-grow gap-10 md:flex-row">
                            <div className="flex flex-col gap-2">
                              <label htmlFor="notaMetacriticPrensa" className="block text-xsfont-montserrat">Nota de prensa en Metacritic</label>
                              <input className="p-2 border rounded resize-none" name="notaMetacriticPrensa" id="notaMetacriticPrensa" placeholder="75" type="number" step={0.1} value={contenido.notaMetacriticPrensa} onChange={handleChange}></input>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label htmlFor="notaMetacriticUsuarios" className="block text-xs font-montserrat">Nota de usuarios en Metacritic</label>
                              <input className="p-2 border rounded resize-none" name="notaMetacriticUsuarios" id="notaMetacriticUsuarios" placeholder="75" type="number" step={0.1} value={contenido.notaMetacriticUsuarios} onChange={handleChange}></input>
                            </div>
                          </div>

                          <h2 className="text-sm">Datos de HowLongToBeat</h2>
                          <div className="flex flex-col items-center justify-center gap-10">
                            <div className="flex flex-col gap-2">
                              <label htmlFor="tiempoMainStory" className="block text-xs font-montserrat">Main story</label>
                              <input className="p-2 border rounded resize-none" name="tiempoMainStory" id="tiempoMainStory" placeholder="15" type="number" value={contenido.tiempoMainStory} onChange={handleChange}></input>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label htmlFor="tiempoMainAndSides" className="block text-xs font-montserrat">Main + extra</label>
                              <input className="p-2 border rounded resize-none" name="tiempoMainAndSides" id="tiempoMainAndSides" placeholder="30" type="number" value={contenido.tiempoMainAndSides} onChange={handleChange}></input>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label htmlFor="tiempoCompletionist" className="block text-xs font-montserrat">Completionist</label>
                              <input className="p-2 border rounded resize-none" name="tiempoCompletionist" id="tiempoCompletionist" placeholder="60" type="number" value={contenido.tiempoCompletionist} onChange={handleChange}></input>
                            </div>
                          </div>

                          <h2 className="text-sm">Enlaces de Metacritic y HowLongToBeat</h2>
                          <div className="flex flex-col items-center justify-center flex-grow gap-10 md:flex-row">
                            <div className="flex flex-col gap-2">
                              <label htmlFor="linkMetacritic" className="block text-xs font-montserrat">Link de Metacritic</label>
                              <input className="p-2 border rounded resize-none" name="linkMetacritic" id="linkMetacritic" placeholder="https://www.metacritic.com/" type="text" value={contenido.linkMetacritic} onChange={handleChange}></input>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label htmlFor="linkHowLongToBeat" className="block text-xs font-montserrat">Link de HowLongToBeat</label>
                              <input className="p-2 border rounded resize-none" name="linkHowLongToBeat" id="linkHowLongToBeat" placeholder="https://howlongtobeat.com/" type="text" value={contenido.linkHowLongToBeat} onChange={handleChange}></input>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <label htmlFor="datosExtraJuego" className="block font-montserrat">Resumen del juego</label>
                            <textarea className="p-2 border rounded resize-none" name="datosExtraJuego" id="datosExtraJuego" placeholder="The Legend of Zelda: Breath of the Wild es un videojuego de acción-aventura de 2017 de la serie The Legend of Zelda, desarrollado por..." rows="3" cols="33" value={contenido.datosExtraJuego} onChange={handleChange}></textarea>
                          </div>

                          <div className="flex flex-col gap-2">
                            <label htmlFor="genero" className="block font-montserrat">Género del juego</label>
                            <input className="p-2 border rounded resize-none" name="genero" id="genero" placeholder="Lucha, aventuras" value={contenido.genero} onChange={handleChange}></input>
                          </div>

                        {/* <div className='flex flex-col gap-2'>
                          <label htmlFor="file2" className="block font-montserrat">Añadir imagen de la plataforma
                          <input className="w-full p-2 mt-2 mb-2 text-sm font-medium text-gray-800 border rounded resize-none font-montserrat" type="text" name="nombrePlataforma" value={nombrePlataforma} placeholder="Nombre de la plataforma" onChange={handleNombrePlataforma}/>
                          <input className="w-full py-2 resize-none" htmlFor="file2" type="file" name="file2" id="file2" onChange={handleFile2Change}/>
                          </label>
                        </div> */}

                      </div>
                      <div className='flex items-center justify-center gap-3'>
                        <button disabled={isLoading} className="text-white bg-gray-700 hover:text-white border hover:bg-green-600 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 font-montserrat">Guardar</button>
                      </div>
                      {error && (<div className="max-w-3/4"><strong className="block w-full p-2 text-center bg-red-500 rounded">{error?.message}</strong></div>
                      )}
                  </form> :
                  <div className="justify-between w-full gap-10 text-lg font-bold text-gray-800 md:flex font-montserrat">
                    <div className='flex flex-col gap-3 md:w-3/4'>
                      <div className="text-lg font-bold text-gray-800 font-montserrat">{item?.titulo}</div>
                      <div className="pt-1 font-medium text-gray-800 font-montserrat">{item?.descripcion}</div>
                      <div className="pt-1 font-medium text-gray-800 font-montserrat">{item?.plataforma}</div>
                      <div className="text-gray-600 font-montserrat">{item ? '// ':''}{item?.tipoContenido} </div>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-6 mt-8 md:mt-0'>
                      <div className="flex items-center justify-center">
                        <button className="text-white bg-gray-700 hover:text-white border hover:bg-green-600 font-bold rounded-lg text-sm px-5 py-2.5 text-centerfont-montserrat" onClick={() => handleEditarContenido(item)}>Editar contenido</button>
                      </div>
                      <div className='flex flex-col items-center justify-center gap-6 md:mt-0'>
                        <button disabled={isDisabled} onClick={() => handleDelete(item.id, item.titulo)} type="button" className={`text-white hover:text-white bg-gray-700 ${isDisabled===false && 'hover:bg-red-700'} font-bold rounded-lg text-sm px-5 py-2.5 text-center font-montserrat`}>Eliminar</button>
                        <div className="flex items-center w-3/4 gap-2">
                          <p className="text-xs font-light text-gray-900 font-montserrat">Si quieres eliminar el contenido marca el recuadro previamente *</p>
                          <input type="checkbox" name="eliminar" id="eliminar" onChange={handleEliminar}/>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    }      
    </>
  )
}
