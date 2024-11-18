import { cleanTitle } from "../../../../helpers/constants/constants";

export const getKeywordStyles = (juego) => {
    return [
        [cleanTitle(juego?.titulo), 'text-blue-500 font-bold'],
        [juego?.plataforma, 'font-semibold italic'],
        [juego?.descripcion, 'font-semibold italic'],
    ];
};
