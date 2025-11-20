import { useContext, useEffect, useState } from "react"
import { supabase } from "../../../../api/supabase/supabase"
import { Link, useNavigate } from "react-router-dom"
import { HomeIcon } from "../../../../assets/Icons"
import { UserContext } from "../../../../context/UserContext"

export function ResetPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [showError, setShowError] = useState(false)
    const { user } = useContext(UserContext)

    const navigate = useNavigate();

    useEffect(() => {
      if (error) {
          setShowError(true)
          const timer = setTimeout(() => {
              setShowError(false)
          }, 5000)
          return () => clearTimeout(timer)
      }
  }, [error])

    const handleResetPassword = async (e) => {
      e.preventDefault();
      setError('');
      setMessage('');

        // Llamar a la función RPC para verificar si el correo electrónico está registrado
        const { data, error: fetchError } = await supabase.rpc('check_user_exists', { email_input: email });
      console.log('El data', await supabase.rpc('check_user_exists', { email_input: email }))
        
        if (fetchError) {
            setError('Error verificando el correo electrónico. Por favor, inténtelo más tarde.')
            console.log(fetchError.message);
            return;
        }

        if (!data) {
            setError("Este email no está registrado. Por favor, inténtelo con otro email.");
            return;
        }
  
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://gamelistweb.netlify.app/update-password', // Asegúrate de reemplazar esta URL con la URL de tu página de restablecimiento de contraseña
      });
  
      if (error) {
        setError(error.message);
        console.log(error.message)
      } else {
        setMessage('Se ha enviado un enlace de restablecimiento de contraseña a su correo electrónico.');
        console.log(message)
      }
    }

    const handleGoBack = () => {
      navigate(-1)
    }
  

    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen p-4 pt-20 pb-10 bg-center bg-cover" style={{ backgroundImage: `url("/Imagen-fondo-colecciones.jpg")` }}>
      {!user.id && <div className="absolute z-10 flex items-center gap-2 top-4 left-4">
          <Link to="/">
            <div className="p-1 mt-1 text-white transition duration-500 rounded-lg bg-slate-900 hover:bg-slate-600">
              <HomeIcon />
            </div>
          </Link>
          <button className="flex items-center gap-3 p-2 mt-1 text-xs text-white transition duration-500 rounded-lg bg-slate-900 hover:bg-green-700" onClick={handleGoBack}>
            <p className="p-.05">Volver</p>
          </button>
        </div>}
          <h1 className="mb-8 text-3xl font-extrabold text-center text-white uppercase">Recuperar Contraseña</h1>
          <form className="flex flex-col w-5/6 max-w-md gap-6 p-8 bg-gray-900 bg-opacity-75 shadow-xl sm:w-full rounded-xl" onSubmit={handleResetPassword}>
              <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-bold text-gray-300">Email</label>
                  <input className="w-full p-3 text-sm text-white transition duration-300 ease-in-out transform bg-gray-700 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:scale-105" type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="flex justify-center">
                  <button className="w-full px-4 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out transform bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:scale-105" type="submit">Enviar enlace de restablecimiento</button>
              </div>
          </form>
          {showError && (<p className="mt-4 text-sm text-center text-red-500">{error}</p>)}
          {message && (<p className="mt-4 text-sm text-green-500">{message}</p>)}
      </div>
  )
}