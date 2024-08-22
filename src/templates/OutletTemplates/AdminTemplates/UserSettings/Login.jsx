import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../../context/UserContext"
import { Link, Navigate } from "react-router-dom";
import { LoginForm } from "../../../helpers/components/AdminComponents/LoginForm";

export function Login() {
  const { user } = useContext(UserContext)
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (user.id) {
      const timer = setTimeout(() => {
        setRedirect(true);
      }, 3000); // Retraso de 2 segundos

      return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
    }
  }, [user.id]);

  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 pt-20 pb-10 bg-center bg-cover" style={{ backgroundImage: `url("/Imagen-fondo-colecciones.jpg")` }}>
        <h1 className="mt-20 text-3xl font-bold text-white uppercase sm:mt-0 sm:mb-8">Iniciar sesión</h1>
        <LoginForm />
        <h4 className="mt-10 text-sm font-semibold text-gray-300 transition duration-300 ease-in-out transform hover:text-purple-400"> <Link to="/user-register">¿No tienes cuenta? ¡Regístrate!</Link></h4>
        <h4 className="p-2 mt-4 text-xs font-semibold text-white transition duration-300 ease-in-out transform bg-red-700 rounded-lg shadow-md hover:bg-red-800"><Link to="/reset-password">He olvidado mi contraseña</Link></h4>
        {/* {user.id && <Navigate to='/'/>} */}
      </div>
    </>
  );
}
