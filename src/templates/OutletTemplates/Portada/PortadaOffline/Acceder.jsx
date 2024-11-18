import { Link } from "react-router-dom"
import { useUser } from "../../../../hooks/useUser"

export  function Acceder() {
  const { user } = useUser()
  
  return (
    <>
      { !user.id &&
          <div>
            <div className="flex justify-center">
              {
                location.pathname === '/' && 
                <button className="w-1/3 px-4 py-2 mt-2 text-sm font-medium text-white transition duration-300 ease-in-out transform bg-purple-900 rounded-lg shadow-md lg:py-2 sm:py-1 sm:mt-0 sm:w-1/4 lg:w-1/5 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:scale-105" type="submit">
                  <Link to='login'>Acceder</Link>
                </button>
              }
            </div>
          </div>
      }
    </>
  )
}
