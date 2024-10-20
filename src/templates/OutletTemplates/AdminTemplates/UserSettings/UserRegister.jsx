import { useState } from "react";
import { supabase } from "../../../../api/supabase/supabase";
import { Link, useNavigate } from "react-router-dom";
import { HomeIcon } from "../../../../assets/Icons";

export function UserRegister() {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        // Llamar a la función RPC para verificar si el correo electrónico está registrado
        const { data: userExists, error: fetchError } = await supabase.rpc('check_user_exists', { email_input: email });

        if (fetchError) {
            setError('Error verificando el correo electrónico. Por favor, inténtelo más tarde.');
            console.log(fetchError.message);
            return;
        }

        if (userExists) {
            setError('Correo electrónico ya existente');
            console.log('Correo electrónico ya existente');
            return;
        }

        // Registro del nuevo usuario
        const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (signUpError) {
            setError(signUpError.message);
            console.log(signUpError.message);
        } else {
            setMessage('Registro exitoso, por favor verifica tu correo electrónico.');
            console.log('Registro exitoso, por favor verifica tu correo electrónico.');
        }
    };

    const handleGoBack = () => {
        navigate(-1);
      };
    

  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 pt-20 pb-10 bg-center bg-cover" style={{ backgroundImage: `url("/Imagen-fondo-colecciones.jpg")` }}>
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
          <h1 className="mt-20 mb-10 text-3xl font-bold text-white uppercase">Registrarse</h1>
          <form className="flex flex-col w-5/6 max-w-md gap-6 p-8 bg-gray-900 bg-opacity-75 shadow-xl sm:w-full rounded-xl" onSubmit={handleRegister}>
              <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-300">Email</label>
                  <input className="p-3 text-sm text-white bg-gray-700 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" type="email" id='email' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="text-sm font-semibold text-gray-300">Password</label>
                  <input className="p-3 text-sm text-white bg-gray-700 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" type="password" id='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="flex items-center justify-center">
                  <button className="w-full px-4 py-2 mt-5 text-sm font-medium text-white transition duration-300 bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500" type="submit">Registrarse</button>
              </div>
          </form>
          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
          {message && <p className="mt-4 text-sm text-green-500">{message}</p>}
          <p className="w-5/6 mt-20 text-xs italic text-justify text-gray-300 sm:mt-40">
              GameListWeb es una web pensada para la gente apasionada de los videojuegos. Aquí podrás guardar colecciones de videojuegos que te hayas terminado, que quieras pasarte, que estés jugando, y mucho más. Podrás ponerle nota a tus juegos y cambiarla a tu gusto, y también disfrutarás de una ficha personalizada por cada juego, en la que una gráfica te mostrará las horas promedio dedicadas al juego, la nota media de metacritic, además de una breve descripción del mismo.
          </p>
          <p className="w-5/6 mt-5 text-xs italic text-justify text-gray-300">
              GameListWeb se trata de un proyecto personal mantenido únicamente por una persona, con el objetivo de mejorar en desarrollo web, de manera que habrá fallos y cosas por mejorar, ante las que pido disculpas. Por ejemplo, en esta web no habrá todos los juegos que existen, o en ocasiones tardarán en aplicarse algunas cosas. De todos modos, espero que la disfrutéis.
          </p>
      </div>
  );
}
