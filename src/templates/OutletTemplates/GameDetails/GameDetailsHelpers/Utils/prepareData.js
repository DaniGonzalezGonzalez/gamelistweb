// src/helpers/dataHelpers.js

import { getPlatformBackground } from "../../../../helpers/constants/constants";
import { crearGraficaCircularData } from "./graficaCircularPorcentajeJuego";
import { prepararDatosComparativa } from "./graficaComparativaPersonalHLTB";
import { getKeywordStyles } from "./getKeywordsStyles";
import { getTruncatedText } from "./getTruncatedText";
import { prepareChartData } from "./prepareChartData";

export const prepareData = (juego, horasDuracion, platino, porcentajeCompletado, estadoIconos) => {
    const backgroundClass = getPlatformBackground(juego.plataforma);
    const { chartData } = prepareChartData(juego);
    const graficaComparativaData = prepararDatosComparativa(horasDuracion, platino, juego);
    const dataGraficaCircular = crearGraficaCircularData(porcentajeCompletado);
    const truncatedText = getTruncatedText(juego.datosExtraJuego);
    const keywordStyles = getKeywordStyles(juego);
    const estados = Object.keys(estadoIconos);

    return {
        backgroundClass,
        chartData,
        graficaComparativaData,
        dataGraficaCircular,
        truncatedText,
        keywordStyles,
        estados
    }
}
