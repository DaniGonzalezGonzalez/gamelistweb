import { useContext, useRef } from "react"
import { useAdd } from "../../../hooks/useAdd"
import { UserContext } from "../../../context/UserContext"
import { HomePageSkeleton } from "../../helpers/components/Menus&IndexHelpers/Skeletons/HomePageSkeleton"
import { PlatformSelect } from "../../helpers/components/Menus&IndexHelpers/PlatformSelect"


export function AddContent() {
  const tituloRef = useRef(null)
  const tipoContenidoRef = useRef(null)
  const { handleFileChange, 
    // handleFile2Change, 
    handleSubmit, error, isLoading, handleNombreArchivo, 
    // handleNombrePlataforma, 
    nombreArchivo, 
    // nombrePlataforma
  } = useAdd(tituloRef, tipoContenidoRef)
  const { user } = useContext(UserContext)

  return (
    <>
    {
    user.id &&
    <div className="flex items-center justify-center min-h-screen p-8 pt-20 bg-gray-900">
        <div className="p-6 mx-8 my-8 rounded shadow-lg bg-slate-800 sm:mx-2">
          <form className='flex flex-col gap-3 space-y-4 text-sm' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2'>
              <label htmlFor="tipo-contenido" className="block text-white font-montserrat">Tipo de contenido</label>
              <select ref={tipoContenidoRef} name="tipoContenido" id="tipo-contenido" className="p-2 border rounded">
                <option value="GamesBD">Base de datos de juegos</option>
                <option value="ArchivosGenerales">Archivos Generales</option>
              </select>
            </div>
            <div className="flex flex-col items-start justify-center flex-grow gap-3 md:flex-row">
                <div className="flex flex-col gap-2">
                  <label htmlFor="titulo" className="block font-medium text-white font-montserrat">Título</label>
                  <input ref={tituloRef} className="w-full p-1 border rounded" type="text" name="titulo" id="titulo" placeholder="Añadir título" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="file1" className="block font-medium text-white font-montserrat">
                    Añadir imagen del juego / fondo
                    <input className="w-full p-1 mt-2 mb-2 text-sm text-gray-800 border rounded resize-none font-montserrat" type="text" name="nombreArchivo" value={nombreArchivo} placeholder="Nombre de la imagen del juego" onChange={handleNombreArchivo} />
                    <input className="w-full py-2 resize-none" htmlFor="file1" type="file" name="file1" id="file1" onChange={handleFileChange} />
                  </label>
                </div>
              </div>
              <div className="flex flex-col items-start justify-center flex-grow gap-3 md:flex-row">
                <div className="flex flex-col gap-2">
                  <label htmlFor="descripcion" className="block font-medium text-white font-montserrat">Estudio</label>
                  <input className="p-2 border rounded resize-none" name="descripcion" id="descripcion" placeholder="Añadir estudio creador del videojuego"></input>
                </div>
                {/* <div className="flex flex-col gap-2">
                  <label htmlFor="plataforma" className="block font-medium text-white font-montserrat">Plataforma</label>
                  <input className="p-2 border rounded resize-none" name="plataforma" id="plataforma" placeholder="Añadir plataforma"></input>
                </div> */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="plataforma" className="block font-medium text-white font-montserrat">Plataforma</label>
                  {/* <PlatformSelect/> */}
                  <input className="p-2 border rounded resize-none" name="plataforma" id="plataforma" placeholder="Añadir plataformas"></input>

                  {/* <select className="p-2 border rounded" name="plataforma" id="plataforma">
                    <option value="PS3">PS3</option>
                    <option value="PS4">PS4</option>
                  </select> */}
                </div>
                {/* <div className="flex flex-col gap-2">
                  <label htmlFor="file2" className="block font-medium text-white font-montserrat">
                    Añadir imagen de la plataforma
                    <input className="w-full p-2 mt-2 mb-2 text-sm font-medium text-gray-800 border rounded resize-none font-montserrat" type="text" name="nombrePlataforma" value={nombrePlataforma} placeholder="Nombre de la plataforma" onChange={handleNombrePlataforma} />
                    <input className="w-full py-2 resize-none" htmlFor="file2" type="file" name="file2" id="file2" onChange={handleFile2Change} />
                  </label>
                </div> */}
              </div>

              <h2 className="text-sm text-white">Datos de Metacritic</h2>
              <div className="flex flex-col items-center justify-center flex-grow gap-10 md:flex-row">
                <div className="flex flex-col gap-2">
                  <label htmlFor="notaMetacriticPrensa" className="block text-xs text-white font-montserrat">Nota de prensa en Metacritic</label>
                  <input className="p-2 border rounded resize-none" name="notaMetacriticPrensa" id="notaMetacriticPrensa" placeholder="75" type="number" step={0.1}></input>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="notaMetacriticUsuarios" className="block text-xs text-white font-montserrat">Nota de usuarios en Metacritic</label>
                  <input className="p-2 border rounded resize-none" name="notaMetacriticUsuarios" id="notaMetacriticUsuarios" placeholder="75" type="number" step={0.1}></input>
                </div>
              </div>

              <h2 className="text-sm text-white">Datos de HowLongToBeat</h2>
              <div className="flex flex-col items-center justify-center flex-grow gap-10 md:flex-row">
                <div className="flex flex-col gap-2">
                  <label htmlFor="tiempoMainStory" className="block text-xs text-white font-montserrat">Main story</label>
                  <input className="p-2 border rounded resize-none" name="tiempoMainStory" id="tiempoMainStory" placeholder="15" type="number"></input>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="tiempoMainAndSides" className="block text-xs text-white font-montserrat">Main + extra</label>
                  <input className="p-2 border rounded resize-none" name="tiempoMainAndSides" id="tiempoMainAndSides" placeholder="30" type="number"></input>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="tiempoCompletionist" className="block text-xs text-white font-montserrat">Completionist</label>
                  <input className="p-2 border rounded resize-none" name="tiempoCompletionist" id="tiempoCompletionist" placeholder="60" type="number"></input>
                </div>
              </div>

              <h2 className="text-sm text-white">Enlaces de Metacritic y HowLongToBeat</h2>
              <div className="flex flex-col items-center justify-center flex-grow gap-10 md:flex-row">
                <div className="flex flex-col gap-2">
                  <label htmlFor="linkMetacritic" className="block text-xs text-white font-montserrat">Link de Metacritic</label>
                  <input className="p-2 border rounded resize-none" name="linkMetacritic" id="linkMetacritic" placeholder="https://www.metacritic.com/" type="text"></input>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="linkHowLongToBeat" className="block text-xs text-white font-montserrat">Link de HowLongToBeat</label>
                  <input className="p-2 border rounded resize-none" name="linkHowLongToBeat" id="linkHowLongToBeat" placeholder="https://howlongtobeat.com/" type="text"></input>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="datosExtraJuego" className="block font-medium text-white font-montserrat">Resumen del juego</label>
                <textarea className="p-2 border rounded resize-none" name="datosExtraJuego" id="datosExtraJuego" placeholder="The Legend of Zelda: Breath of the Wild es un videojuego de acción-aventura de 2017 de la serie The Legend of Zelda, desarrollado por..." rows="3" cols="33"></textarea>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="genero" className="block font-medium text-white font-montserrat">Género del juego</label>
                <input className="p-2 border rounded resize-none" name="genero" id="genero" placeholder="Lucha, aventuras"></input>
              </div>


          {/* Añadir categorías de notaMetacriticPrensa, notaMetacriticUsuarios, linkMetacritic, linkHowLongToBeat, tiempoCompletionist, tiempoMainAndSides, tiempoMainStory, datosExtraJuego, género */}





            {/* <div className='flex flex-col gap-2'>
              <label htmlFor="infoExtra4" className="block font-medium text-white font-montserrat">Información Extra 4</label>
              <textarea className="p-2 border rounded resize-none" name="infoExtra4" id="infoExtra4" placeholder={user.email} rows="3" cols="33" hidden onChange={handleTextareaChange} value={user.email}></textarea>
            </div> */}          

            <button disabled={isLoading} className="text-white bg-gray-900 hover:text-white border hover:bg-gray-700 font-bold rounded-lg text-sm px-5 py-2.5 text-center mb-2 font-montserrat">Añadir juego</button>
            {error?.message && <p className="font-bold text-red-400 font-montserrat">{error.message}</p>}
            {isLoading && <HomePageSkeleton/>}
          </form>
        </div>
    </div>
    }
    </>
  )
}
