export const prepararDatosComparativa = (horasDuracion, platino, juego) => {
    // Mapeo de las modalidades
    const modalidadIndex = {
        "Hª principal": 0,
        "Hª + Extra": 1,
        "Completista": 2,
        'Platino':2,
        '1000G': 2
    };

    // Preparar los datos de HLTB
    const mainStoryHours = juego.tiempoMainStory ? juego.tiempoMainStory : 0;
    const mainAndExtraHours = juego.tiempoMainAndSides ? juego.tiempoMainAndSides : 0;
    const completionistHours = juego.tiempoCompletionist ? juego.tiempoCompletionist : 0;

    // Datos de HLTB en un array
    const hltbDatos = [mainStoryHours, mainAndExtraHours, completionistHours];

    // Obtener datos de HLTB según tu modalidad
    const hltbDatosComparacion = hltbDatos[modalidadIndex[platino]];

    // Preparar datos para la nueva gráfica
    return {
        labels: [`Mis Horas`, `Horas HLTB`], // Etiquetas con la modalidad
        datasets: [
            {
                label: 'Comparativa',
                data: [horasDuracion, hltbDatosComparacion],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
};
