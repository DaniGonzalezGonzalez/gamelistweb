import { Link } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";

export  function Acceder() {
    const { user } = useUser()
  return (
    <>
    {
        !user.id &&
        <div>
        {/* <div className="relative px-8 pt-20 pb-16 sm:px-16 bg-gray-950"> */}
        {/* <div
          className="absolute top-0 left-0 w-full h-full"
          style={{ backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))', backgroundSize: 'cover', backgroundPosition: 'center center', height: '20%' }}/> */}
            <div className="flex justify-center">
               {
                location.pathname === '/' && <button className="w-full px-4 py-2 mt-4 sm:mt-0 text-sm font-medium text-white transition duration-300 ease-in-out transform bg-purple-900 rounded-lg shadow-md sm:w-1/2 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:scale-105" type="submit"><Link to='login'>Acceder</Link></button>
               }
            </div>
        </div>
    }
    </>
  )
}
