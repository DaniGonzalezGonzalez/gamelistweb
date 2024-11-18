// import { useState } from "react";
// import { ArrowRight, PlayIcon } from "../../../../assets/Icons";
// import { cleanTitle } from "../../no-components/constants";

// export const VideoCard = ({ juego }) => {
//   const [isVideoVisible, setIsVideoVisible] = useState(false);

//   // Convierte la URL en el formato embebido de YouTube
//   const getEmbedUrl = (url) => {
//     const videoId = url.split("v=")[1];
//     return `https://www.youtube.com/embed/${videoId}`;
//   };

//   // Obtiene la miniatura de YouTube
//   const getYouTubeThumbnail = (url) => {
//     const videoId = url.split("v=")[1];
//     return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
//   };


//   return (
//     <div>
//       <h3 className="text-base font-bold lg:text-2xl text-start">Trailer</h3>
//       <div className="relative flex items-center justify-center mt-5 mb-2 rounded-2xl">
//         {isVideoVisible ? (
//           <iframe
//             width="100%"
//             height="315"
//             src={`${getEmbedUrl(juego.linkVideo)}?autoplay=1`}
//             title="YouTube video player"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//             className="rounded-2xl"
//           ></iframe>
//         ) : (
//           <>
//             <img
//               src={getYouTubeThumbnail(juego.linkVideo)}
//               alt={`${juego.titulo} Trailer`}
//               onClick={() => setIsVideoVisible(true)}
//               className="cursor-pointer rounded-xl hover:opacity-80 h-40 lg:h-80 w-full lg:w-[600px] object-cover"
//             />
//              <div
//                 onClick={() => setIsVideoVisible(true)}
//                 className="absolute inset-0 flex items-center justify-center cursor-pointer"
//             >
//                 <div className="flex items-center justify-center w-12 h-12 bg-red-700 rounded-full">
//                     {/* Ícono de play usando SVG */}
//                     <PlayIcon w={8} h={8}/>
//                 </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };