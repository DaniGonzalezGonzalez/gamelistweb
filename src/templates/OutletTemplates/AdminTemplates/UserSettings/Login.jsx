import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { LoginForm } from "../../../helpers/components/AdminComponents/LoginForm";
import { HomeIcon } from "../../../../assets/Icons";

export function Login() {
  const { user } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id) {
      const timer = setTimeout(() => {
        setRedirect(true);
      }, 3000); // Retraso de 3 segundos

      return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
    }
  }, [user.id]);

  if (redirect) {
    return <Navigate to="/" />;
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="relative flex flex-col items-center justify-center min-h-screen p-4 pt-20 pb-10 bg-center bg-cover" style={{ backgroundImage: `url("/Imagen-fondo-colecciones.jpg")` }}>
        {/* Contenedor de botones en la parte superior izquierda */}
        {!user.id && <div className="absolute z-10 flex items-center gap-2 top-4 left-4">
          <Link to="/">
            <div className="p-1 mt-1 text-white transition duration-500 rounded-lg bg-slate-700 hover:bg-slate-600">
              <HomeIcon />
            </div>
          </Link>
          <button className="flex items-center gap-3 p-2 mt-1 text-xs text-white transition duration-500 rounded-lg bg-slate-700 hover:bg-green-700" onClick={handleGoBack}>
            <p className="p-.05">Volver</p>
          </button>
        </div>}

        <h1 className="mt-20 text-3xl font-bold text-white uppercase sm:mt-0 sm:mb-8">Iniciar sesión</h1>
        <LoginForm />
        <h4 className="mt-10 text-sm font-semibold text-gray-300 transition duration-300 ease-in-out transform hover:text-purple-400">
          <Link to="/user-register">¿No tienes cuenta? ¡Regístrate!</Link>
        </h4>
        <h4 className="p-2 mt-4 text-xs font-semibold text-white transition duration-300 ease-in-out transform bg-red-700 rounded-lg shadow-md hover:bg-red-800">
          <Link to="/reset-password">He olvidado mi contraseña</Link>
        </h4>
      </div>
    </>
  );
}
