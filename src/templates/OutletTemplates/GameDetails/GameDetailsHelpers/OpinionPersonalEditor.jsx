// FechaFinalizadaSelector.jsx
import React, { useEffect } from "react";

export const OpinionPersonalEditor = ({
    opinionPersonal, nuevaOpinionPersonal, setNuevaOpinionPersonal,
    handleOpinionPersonalChange, 
    setEditModeOpinionPersonal,
    error,
    setError,
    onSave,
}) => {
    useEffect(() => {
        // Al montar el componente, establecer el valor de la opinión actual
        setNuevaOpinionPersonal(opinionPersonal || ""); 
    }, [opinionPersonal, setNuevaOpinionPersonal]);

    const handleSave = async () => {
        // Validación de longitud de opinión personal
        if (nuevaOpinionPersonal.length > 250) {
            setError('No puede tener una extensión mayor a 250 caracteres');
            return;
        }

        setError('');

        try {
            await handleOpinionPersonalChange(nuevaOpinionPersonal);
            onSave(nuevaOpinionPersonal);
            setEditModeOpinionPersonal(false); // Salir del modo de edición
        } catch (error) {
            setError(error.message);
        }
    };

    const handleChange = (e) => {
        const { value } = e.target;

        // Expresión regular para permitir solo letras, números, espacios y signos de puntuación comunes
        const validRegex = /^[a-zA-Z0-9áéíóúüñÑÁÉÍÓÚ\s.,!?'"()]*$/;

        if (value.length <= 250 && validRegex.test(value)) {
            setNuevaOpinionPersonal(value); // Actualizar el estado solo si es válido
            setError(''); // Limpiar el error si la entrada es válida
        } else if (value.length > 250) {
            setError('No puede tener una extensión mayor a 250 caracteres');
        } else {
            setError('Caracteres no permitidos. Solo se permiten letras, números y algunos signos de puntuación.');
        }
    };

    return (
        <div className="flex flex-col items-center w-full gap-4 px-2 py-4 mt-5 text-sm bg-gray-800 rounded-lg shadow-lg lg:w-1/2 lg:py-6 lg:px-5">
            <div className="flex flex-col w-full">
                <label className="mb-2 text-xs text-white lg:text-lg">Opinión personal:</label>
                <textarea
                    cols="30"
                    rows="5"
                    value={nuevaOpinionPersonal}
                    onChange={handleChange}
                    className="p-4 text-xs text-white transition duration-200 bg-gray-700 border border-gray-600 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 lg:text-sm"
                    placeholder="Escribe tu opinión aquí (max. 250 caracteres)" // Placeholder para mejor UX
                />
                {error && <p className="mt-2 text-red-400">{error}</p>}
            </div>
    
            {/* Botones Guardar y Cancelar */}
            <div className="flex gap-4">
                <button
                    className="px-6 py-2 text-xs text-white transition duration-200 bg-blue-600 rounded-md shadow hover:bg-blue-700"
                    onClick={handleSave}
                >
                    Guardar
                </button>
                <button
                    className="px-6 py-2 text-xs text-gray-800 transition duration-200 bg-gray-300 rounded-md shadow hover:bg-gray-400"
                    onClick={() => setEditModeOpinionPersonal(false)}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
};