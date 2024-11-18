// chartData.js

// chartData.js
export const crearGraficaCircularData = (porcentajeCompletado) => {
    return {
        labels: ['Completado', 'Pendiente'], // Etiquetas para las secciones
        datasets: [{
            data: [porcentajeCompletado, 100 - porcentajeCompletado], // Datos del porcentaje completado y el restante
            backgroundColor: ['#FFFFFF', '#A6ACB0'], // Colores para cada sección
            borderColor: porcentajeCompletado === '100' ? '#A6ACB0' : '#FFFFFF', // Color del borde personalizado
            borderWidth: 2, // Grosor del borde (puedes ajustarlo según prefieras)
           
            // backgroundColor: ['#0D74FF', '#FF3D5B'], // Colores para cada sección

        }],
    };
};

export const crearChartOptionsCircular = (porcentajeCompletado) => {
    return {
        responsive: true,
        plugins: {
            legend: {
                display: true, // Muestra la leyenda con los nombres de las secciones
                labels: {
                    color: '#FFFFFF',       // Color de las etiquetas de la leyenda
                    font: {
                        size: 12,          // Tamaño de fuente más pequeño para la leyenda
                    },
                    boxWidth: 10,           // Ancho de los recuadros de color en la leyenda
                    boxHeight: 10,          // Altura de los recuadros de color en la leyenda
                    padding: 8,             // Espaciado alrededor del texto de la leyenda
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        // Muestra solo los porcentajes mayores a 0%
                        return context.raw > 0 ? context.raw + '%' : '';
                    },
                },
            },
            datalabels: {
                color: '#2E2E3A', // Color del texto de las etiquetas
                font: {
                    size: 14,     // Tamaño de la fuente en la gráfica
                    weight: 'bold',
                },
                formatter: function (value, context) {
                    // Solo mostrar el porcentaje si es mayor a 0
                    return value > 0 ? value + '%' : '';
                },
                anchor: (context) => {
                    // Centrar solo cuando el porcentaje es 100
                    return porcentajeCompletado === 100 ? 'start' : 'center';
                },
            },
        },
        scales: {
            y: {
                display: false,
            },
            x: {
                display: false,
            },
        },
    };
};