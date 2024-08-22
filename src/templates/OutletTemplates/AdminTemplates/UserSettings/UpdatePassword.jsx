import { useEffect, useState } from "react";
import { supabase } from "../../../../api/supabase/supabase";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../hooks/useUser";

export function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showError, setShowError] = useState(false)
  const navigate = useNavigate()
  const { user } = useUser()

  useEffect(() => {
    if (error) {
        setShowError(true)
        const timer = setTimeout(() => {
            setShowError(false)
        }, 5000)
        return () => clearTimeout(timer)
    }
}, [error])

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');


    if (!user) {
      setError('Usuario no autenticado.');
      return;
    }

    // Llamar a la función RPC para verificar si la nueva contraseña es diferente
    // const { data, error: fetchError } = await supabase.rpc('check_password_different', {
    //   user_id: user.id,
    //   new_password: password
    // });

    // if (fetchError) {
    //   setError('Error verificando la contraseña. Por favor, inténtelo más tarde.');
    //   console.log(fetchError.message);
    //   return;
    // }

    // if (!data) {
    //   setError('La nueva contraseña no puede ser la misma que la antigua.');
    //   return;
    // }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Contraseña actualizada con éxito. Redirigiendo a la página principal...');
      setTimeout(() => {
        navigate('/')
      }, 4000)
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 pt-20 pb-10 bg-center bg-cover" style={{ backgroundImage: `url("/Imagen-fondo-colecciones.jpg")` }}>
      <h1 className="mb-8 text-3xl font-bold text-center text-white uppercase">Restablecer Contraseña</h1>
      <form className="flex flex-col w-5/6 max-w-md gap-6 p-8 bg-gray-900 bg-opacity-75 shadow-xl sm:w-full rounded-xl" onSubmit={handleUpdatePassword}>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-semibold text-gray-300">Nueva Contraseña</label>
          <input className="w-full p-3 text-sm text-white transition duration-300 ease-in-out transform bg-gray-700 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:scale-105" type="password" id="password" placeholder="Nueva Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="flex justify-center">
          <button className="w-full px-4 py-2 text-sm font-medium text-white transition duration-300 ease-in-out transform bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:scale-105" type="submit">
            Actualizar Contraseña
          </button>
        </div>
      </form>
      {showError && (<p className="mt-4 text-sm text-center text-red-500">{error}</p>)}
      {message && (<p className="mt-4 text-sm text-green-500">{message}</p>)}
    </div>
  );
}