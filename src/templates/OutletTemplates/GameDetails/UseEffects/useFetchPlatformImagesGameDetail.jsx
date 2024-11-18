import { useEffect } from 'react';

export const useFetchPlatformImagesGameDetail = (juego, fetchPlatformImages, setPlatformImages) => {
  useEffect(() => {
    if (juego) {
      fetchPlatformImages([{ plataforma: juego.plataforma }], setPlatformImages);
    }
  }, [juego, fetchPlatformImages, setPlatformImages]);
};

