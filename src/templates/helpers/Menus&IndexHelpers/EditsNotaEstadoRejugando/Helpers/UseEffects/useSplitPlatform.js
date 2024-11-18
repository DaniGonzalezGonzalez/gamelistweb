// useUpdatePlatformsList.js
import { useEffect } from 'react';

export const useSplitPlatform = (platform, setPlatformsList) => {
  useEffect(() => {
    if (platform) {
      // Solo dividir si platform no es una cadena vacía
      setPlatformsList(platform.split(' - '));
    } else {
      setPlatformsList([]);
    }
  }, [platform, setPlatformsList]);
};

