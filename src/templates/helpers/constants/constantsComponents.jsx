import { useEffect, useState } from "react";
import { AbandonadoIcon, CheckIcon, CompleteIcon, PauseIcon, PlayIcon, ProximosIcon, StartIcon, UpdateIcon } from "../../../assets/Icons";

export function GET_STATE_ICON(state, w, h) {
    switch (state) {
        case 'Jugando':
            return <PlayIcon w={w} h={h} />; // Retorna JSX directamente
        case 'Completando':
            return <CompleteIcon w={w} h={h} />;
        case 'Terminado':
            return <CheckIcon w={w} h={h} />;
        case 'En lista':
            return <ProximosIcon w={w} h={h} />;
        case 'Lista de deseos':
            return <StartIcon w={w} h={h} />;
        case 'Otra vez':
            return <UpdateIcon w={w} h={h} />;
        case 'Abandonado':
            return <AbandonadoIcon w={w} h={h} />;
        case 'Pausado':
            return <PauseIcon w={w} h={h} />;
        default:
            return ''; // Retorna JSX por defecto
    }
}

export function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
  
    return debouncedValue;
  }


  export const estadoIconos = {
    'Jugando': <PlayIcon w={4} h={4} />,
    'Completando': <CompleteIcon w={4} h={4} />,
    'Terminado': <CheckIcon w={4} h={4} />,
    'En lista': <ProximosIcon w={4} h={4} />,
    'Otra vez': <UpdateIcon w={4} h={4} />,
    'Pausado': <PauseIcon w={4} h={4} />,
    'Abandonado': <AbandonadoIcon w={4} h={4} />,
    'Lista de deseos': <StartIcon w={4} h={4} />,
  }
  