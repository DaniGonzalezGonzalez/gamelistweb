// FechaFinalizadaSelector.jsx
import React from "react";

export const FechaFinalizadaSelector = ({
    nuevoMes,
    setNuevoMes,
    nuevoAnio,
    setNuevoAnio,
    handleFechaFinalizacionChange, // Agrega la función del hook aquí
    setEditModeFechaFinalizacion,
    error,
    setError,
    onSave,
}) => {
    const handleSave = async () => {
        const nuevaFechaFinalizacion = `${nuevoAnio}${nuevoMes}`;

        // Validación de año y mes
        if (nuevoAnio < 1980 || nuevoAnio > 2025 || nuevoMes < '01' || nuevoMes > '12') {
            setError('El año debe estar entre 1980 y 2025 y el mes entre 01 y 12.');
            return;
        }

        setError('');

        try {
            await handleFechaFinalizacionChange(nuevaFechaFinalizacion);
            onSave(nuevaFechaFinalizacion)
            setEditModeFechaFinalizacion(false); // Salir del modo de edición
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center gap-2 mt-5 text-xs text-justify cursor-pointer lg:flex-row">
            <p>Finalizado:</p>

            {/* Selección de Mes */}
            <div className="flex gap-2 lg:flex-col">
                <div className="w-16 h-6 text-center text-gray-800 transition duration-200 bg-white border border-gray-300 rounded-md shadow-sm">
                    <select
                        className="w-full h-full text-center bg-transparent focus:outline-none"
                        value={nuevoMes}
                        onChange={(e) => setNuevoMes(e.target.value)}
                    >
                        <option value="" disabled>Mes (01-12)</option>
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                {String(i + 1).padStart(2, '0')}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Selección de Año */}
                <div className="w-16 h-6 text-center text-gray-800 transition duration-200 bg-white border border-gray-300 rounded-md shadow-sm">
                    <select
                        className="w-full h-full text-center bg-transparent focus:outline-none"
                        value={nuevoAnio}
                        onChange={(e) => setNuevoAnio(e.target.value)}
                    >
                        <option value="" disabled>Año (1990-2025)</option>
                        {Array.from({ length: 2025 - 1990 + 1 }, (_, i) => (
                            <option key={1990 + i} value={1990 + i}>
                                {1990 + i}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Botones Guardar y Cancelar */}
            <div className="flex gap-2">
                <button
                    className="px-2 py-1 text-xs text-white transition duration-200 bg-blue-500 rounded-md shadow lg:px-4 lg:py-2 hover:bg-blue-600"
                    onClick={handleSave}
                >
                    Guardar
                </button>
                <button
                    className="px-2 py-1 text-xs text-gray-800 transition duration-200 bg-gray-300 rounded-md shadow lg:px-4 lg:py-2 hover:bg-gray-400"
                    onClick={() => setEditModeFechaFinalizacion(false)}
                >
                    Cancelar
                </button>
            </div>

            {error && <p className="mt-2 text-red-500">{error}</p>}
        </div>
    );
};
