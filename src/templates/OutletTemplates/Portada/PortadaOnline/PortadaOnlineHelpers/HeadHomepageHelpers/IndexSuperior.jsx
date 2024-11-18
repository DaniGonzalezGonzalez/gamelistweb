import { Link } from "react-router-dom";
import { CheckIcon, OtrosIcon, PlayIcon, ProximosIcon } from "../../../../../../assets/Icons";


export const IndexSuperior = ({ handleScrollIndex }) => {
  return (
    <div className="relative z-10 grid w-5/6 grid-cols-2 gap-4 mt-8 font-semibold text-white lg:text-lg sm:mt-14 sm:grid-cols-4">
      <Link to onClick={() => handleScrollIndex('indice-infohomepage-jugando')}>
        <div className="relative flex flex-col items-center justify-center w-full h-24 uppercase transition duration-300 border-2 border-transparent shadow-md group sm:h-20 lg:h-32 bg-slate-700 hover:border-gray-200 rounded-2xl shadow-slate-900">
          <div className="relative flex-shrink-0 transition-transform duration-300 bottom-3 lg:bottom-0 lg:group-hover:-translate-y-6">
            <PlayIcon w={8} h={8} />
          </div>
          <p className="absolute transition-all duration-300 ease-in-out transform opacity-100 lg:opacity-0 sm:-translate-y-5 lg:-translate-y-4 top-14 sm:top-16 lg:group-hover:-translate-y-0 group-hover:opacity-100">Jugando</p>
        </div>
      </Link>
      <Link to onClick={() => handleScrollIndex('indice-infohomepage-terminados')}>
        <div className="relative flex flex-col items-center justify-center w-full h-24 uppercase transition duration-300 border-2 border-transparent shadow-md group sm:h-20 lg:h-32 bg-slate-700 hover:border-gray-200 rounded-2xl shadow-slate-900">
          <div className="relative flex-shrink-0 transition-transform duration-300 bottom-3 lg:bottom-0 lg:group-hover:-translate-y-6">
            <CheckIcon w={8} h={8} />
          </div>
          <p className="absolute transition-all duration-300 ease-in-out transform opacity-100 lg:opacity-0 sm:-translate-y-5 lg:-translate-y-4 top-14 sm:top-16 lg:group-hover:-translate-y-0 group-hover:opacity-100">Terminados</p>
        </div>
      </Link>
      <Link to onClick={() => handleScrollIndex('indice-infohomepage-en-lista')}>
        <div className="relative flex flex-col items-center justify-center w-full h-24 uppercase transition duration-300 border-2 border-transparent shadow-md group sm:h-20 lg:h-32 bg-slate-700 hover:border-gray-200 rounded-2xl shadow-slate-900">
          <div className="relative flex-shrink-0 transition-transform duration-300 bottom-3 lg:bottom-0 lg:group-hover:-translate-y-6">
            <ProximosIcon w={8} h={8} />
          </div>
          <p className="absolute transition-all duration-300 ease-in-out transform opacity-100 lg:opacity-0 sm:-translate-y-5 lg:-translate-y-4 top-14 sm:top-16 lg:group-hover:-translate-y-0 group-hover:opacity-100">En lista</p>
        </div>
      </Link>
      <Link to onClick={() => handleScrollIndex('indice-infohomepage-resto')}>
        <div className="relative flex flex-col items-center justify-center w-full h-24 uppercase transition duration-300 border-2 border-transparent shadow-md group sm:h-20 lg:h-32 bg-slate-700 hover:border-gray-200 rounded-2xl shadow-slate-900">
          <div className="relative flex-shrink-0 transition-transform duration-300 bottom-3 lg:bottom-0 lg:group-hover:-translate-y-6">
            <OtrosIcon w={8} h={8} />
          </div>
          <p className="absolute transition-all duration-300 ease-in-out transform opacity-100 lg:opacity-0 sm:-translate-y-5 lg:-translate-y-4 top-14 sm:top-16 lg:group-hover:-translate-y-0 group-hover:opacity-100">Otros</p>
        </div>
      </Link>
    </div>
  );
};
