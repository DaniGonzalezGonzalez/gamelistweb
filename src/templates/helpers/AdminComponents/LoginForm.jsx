import { useEffect, useRef, useState } from "react"
import { useUser } from "../../../hooks/useUser"

export function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showError, setShowError] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false); // Estado para mostrar mensaje de éxito
    const [successMessage, setSuccessMessage] = useState(''); 
    const usernameRef = useRef()
    const passwordRef = useRef()

    const { _signInWithEmailAndPassword, error, message, success } = useUser()

    useEffect(() => {
        if (error) {
            setShowError(true)
            const timer = setTimeout(() => {
                setShowError(false)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [error])

    useEffect(() => {
        if (success) {
            setSuccessMessage('¡Inicio de sesión exitoso! Redirigiendo a la página principal...');
            setShowSuccess(true);
            const timer = setTimeout(() => {
                setShowSuccess(false);
                setSuccessMessage(''); // Limpiar el mensaje de éxito después de que desaparezca
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);
    

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()   
        if (!email.length) {
            usernameRef.current.focus()
            return
          }
          if (!password.length) {
            passwordRef.current.focus()
            return
          }     
        _signInWithEmailAndPassword(email, password)
    }

    return (
        <>
            <fieldset className="flex flex-col items-center justify-center w-5/6 max-w-md p-8 mx-auto mt-8 bg-gray-900 bg-opacity-75 shadow-xl sm:w-full sm:mt-20 rounded-2xl">
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-300">Email</label>
                        <input
                            className="w-full p-3 text-sm text-white transition duration-300 ease-in-out transform bg-gray-700 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:scale-105"
                            ref={usernameRef}
                            placeholder="useremail@gmail.com"
                            id="email"
                            type="email"
                            value={email}
                            onChange={handleEmail}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-300">Password</label>
                        <input
                            className="w-full p-3 text-sm text-white transition duration-300 ease-in-out transform bg-gray-700 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:scale-105"
                            ref={passwordRef}
                            placeholder="******"
                            id="password"
                            type="password"
                            value={password}
                            onChange={handlePassword}
                        />
                    </div>
                    <div className="flex justify-center">
                        <button className="w-full px-4 py-2 text-sm font-medium text-white transition duration-300 ease-in-out transform bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:scale-105" type="submit">Iniciar sesión</button>
                    </div>
                </form>
                {showError && (
                    <div className="w-full p-4 mt-4 text-sm text-center text-white bg-red-600 rounded-lg shadow-md">
                        {message}
                    </div>
                )}
                {showSuccess && (
                    <div className="w-full p-4 mt-4 text-sm text-center text-white bg-green-600 rounded-lg shadow-md">
                        {successMessage}
                    </div>
                )}
            </fieldset>
        </>
    );
}