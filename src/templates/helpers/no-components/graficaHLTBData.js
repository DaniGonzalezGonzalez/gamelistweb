
export const graficaHLTBData = {
    labels: ['Main Story', 'Main + Extra', 'Completionist'],
    datasets: [
        {
            data: [0, 0, 0], // Inicialmente los datos pueden ser 0 o algún valor por defecto
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1,
        },
    ],
};

export const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            callbacks: {
                label: function(tooltipItem) {
                    if (tooltipItem.raw === 0) {
                        return '0 Horas'; // Manejar caso cuando el valor es 0
                    }
                    return tooltipItem.raw + ' Horas'; // Mostrar el valor seguido de " Horas"
                }
            }
        },
        title: {
            display: true,
            text: 'Horas de media',
        },
        datalabels: {
            formatter: (value) => value + ' Horas',
            color: 'black',
            font: {
                weight: 'bold'
            },
            anchor: 'center',
            align: 'center',
            offset: 0,
            padding: 0,
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 5,
            },
        },
    },
};