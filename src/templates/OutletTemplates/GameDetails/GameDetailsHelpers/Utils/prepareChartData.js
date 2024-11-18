import { graficaHLTBData } from "./graficaHLTBData";

export const prepareChartData = (juego) => {
    const mainStoryHours = juego.tiempoMainStory || 0;
    const mainAndExtraHours = juego.tiempoMainAndSides || 0;
    const completionistHours = juego.tiempoCompletionist || 0;

    const chartData = graficaHLTBData.datasets[0].data = [mainStoryHours, mainAndExtraHours, completionistHours]

    return { chartData }
}
