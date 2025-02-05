import React from 'react';
import { PersonalizadoJuegosDBCarrusel } from './PersonalizadoJuegosDBCarrusel';

export const CarruselesJuegosBDCompletos = ({ user, juegos, fetchJuegos, setIsJuegosLoaded, isJuegosLoaded, dataBD }) => {
  const carruseles = [
    {
      user,
      añoFiltro: 1992,
      filtrarMayor: false,
      juegos,
      fetchJuegos,
      setIsJuegosLoaded,
      isJuegosLoaded,
      dataBD,
      nombreCarrusel: 'Viejitos'
    },
    // {
    //   user,
    //   genero: 'Carreras',
    //   añoFiltro: 2005,
    //   filtrarMayor: true,
    //   juegos,
    //   fetchJuegos,
    //   setIsJuegosLoaded,
    //   isJuegosLoaded,
    //   dataBD,
    //   nombreCarrusel: 'Carreras'
    // },
    {
      user,
      añoFiltro: 2024,
      filtrarMayor: true,
      juegos,
      fetchJuegos,
      setIsJuegosLoaded,
      isJuegosLoaded,
      dataBD,
      nombreCarrusel: 'Últimos lanzamientos'
    },
    {
        user,
        notaMetacriticPrensaMax: 10,
        notaMetacriticPrensaMin: 9,
        juegos,
        fetchJuegos,
        setIsJuegosLoaded,
        isJuegosLoaded,
        dataBD,
        nombreCarrusel: 'Aclamados por la prensa'
      },
    // Puedes añadir más configuraciones para cada carrusel aquí
  ];

  return (
    <div>
      {carruseles.map((props, index) => (
        <PersonalizadoJuegosDBCarrusel key={index} {...props} />
      ))}
    </div>
  );
};

