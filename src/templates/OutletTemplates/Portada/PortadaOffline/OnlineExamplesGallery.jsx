import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination } from "swiper/modules"
import { useVisibilityObserver } from "../../../../hooks/useVisibilityObserver"

export function OnlineExamplesGallery() {
  const [mobileImages, setMobileImages] = useState([])
  const [pcImages, setPcImages] = useState([])
  const visibleItems = useVisibilityObserver(".observed-item", 0.3);
  const blockId = "blockId"


  useEffect(() => {
    setMobileImages(Array.from({ length: 4 }, (_, i) => `/onlineExamples/Mobile_${i + 1}.webp`))
    setPcImages(Array.from({ length: 4 }, (_, i) => `/onlineExamples/PC_${i + 1}.webp`))
  }, [])

  return (
    <div className={`relative px-8 py-10 bg-black sm:pt-14 sm:pb-10 sm:px-16 lg:px-32 xl:px-48`}>
       <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))', backgroundSize: 'cover', backgroundPosition: 'center center', height: '20%' }}/>
      <h2 data-id={blockId} className={`transition duration-[1000ms] observed-item ease-out ${visibleItems[blockId] ? "opacity-100 translate-x-0" : "opacity-0 translate-y-20" } relative z-20 pt-0 text-lg font-bold text-white text-start xl:text-center xl:font-light sm:text-xl xl:text-3xl lg:pt-14 xl:pt-20 xl:pb-14`}>¿Cómo luce la web?</h2>
      
      {/* Slider para móvil */}
      <div data-id={blockId} className={`transition duration-[2000ms] observed-item ease-out ${visibleItems[blockId] ? "opacity-100 translate-x-0" : "opacity-0 translate-y-20" }  mt-5 sm:hidden`}>
        <h1 className="relative z-20 pb-5">Formato móvil/app</h1>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="w-full custom-swiper"
        >
          {mobileImages.map((src, index) => (
            <SwiperSlide key={index}>
              <img className="object-cover w-full h-full border-4 border-slate-900 rounded-2xl mb-14" src={src} alt={`Ejemplo Móvil ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
        <p className="pt-8 text-xs text-justify">
          Crea una cuenta y organiza tus listas personalizadas de videojuegos: 
          los que estás jugando, los que tienes pendientes, los que has terminado y mucho más.  
          Encuéntralos y añádelos fácilmente en un amplio catálogo con múltiples plataformas, géneros, sagas y desarrolladoras. Organízalos en un <span className="font-semibold text-purple-300">orden personalizado</span> según tu preferencia en cada categoría.
        </p>
      </div>
      
      {/* Slider para PC */}
      <div data-id={blockId} className={`transition duration-[2000ms] observed-item ease-out ${visibleItems[blockId] ? "opacity-100 translate-x-0" : "opacity-0 translate-y-20" } hidden pt-5 sm:block`}>
        <h1 className="pb-5 text-xl">Formato PC</h1>
        <Swiper
          spaceBetween={20}
          slidesPerView={2}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="w-full custom-swiper"
          breakpoints={{
            1024: { slidesPerView: 3 },
          }}
        >
          {pcImages.map((src, index) => (
            <SwiperSlide key={index}>
              <img className="object-cover w-full h-40 transition duration-500 rounded-lg mb-14 sm:h-48 lg:h-full hover:opacity-75" src={src} alt={`Ejemplo PC ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
        <p className="pt-8 text-lg">
          Crea una cuenta y organiza tus listas personalizadas de videojuegos: 
          aquellos que estás jugando, los que tienes pendientes, los que has terminado y mucho más.  
          Encuéntralos y añádelos fácilmente en un amplio catálogo con múltiples plataformas, géneros, sagas y desarrolladoras. Organízalos en un <span className="font-semibold text-purple-300">orden personalizado</span> según tu preferencia en cada categoría.
        </p>
      </div>
    </div>
  )
}