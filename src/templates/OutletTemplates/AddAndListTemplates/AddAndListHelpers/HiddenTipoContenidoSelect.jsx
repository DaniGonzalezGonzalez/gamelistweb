import React from 'react';

export const HiddenTipoContenidoSelect = ({ tipoContenidoRef }) => (
    <div hidden className="flex flex-col gap-2">
        <label htmlFor="tipo-contenido" className="text-white" hidden>
            Tipo de contenido
        </label>
        <select
            hidden
            ref={tipoContenidoRef}
            name="tipoContenido"
            id="tipo-contenido"
            className="p-2 border rounded"
        >
            <option value="Juegos">Mis Juegos</option>
        </select>
    </div>
)

