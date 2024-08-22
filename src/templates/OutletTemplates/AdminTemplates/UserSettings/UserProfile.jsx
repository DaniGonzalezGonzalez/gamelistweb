import { useUser } from "../../../../hooks/useUser";
import { DeleteAccount } from "./DeleteAccount";

export function UserProfile() {
  const { user } = useUser()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 pt-20 pb-10 bg-center bg-cover" style={{ backgroundImage: `url("/Imagen-fondo-colecciones.jpg")` }}>        
        <h1 className="mb-8 text-3xl font-bold text-white uppercase">Mi perfil</h1>
        <div className="flex flex-col w-5/6 max-w-md gap-6 p-8 bg-gray-900 bg-opacity-75 shadow-xl sm:w-full rounded-xl" >
        <h2 className="text-sm font-semibold text-gray-300">Cuenta: {user.email}</h2>
        </div>
        <DeleteAccount/>
    </div>
  )
}

