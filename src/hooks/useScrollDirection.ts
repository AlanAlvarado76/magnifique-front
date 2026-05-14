// src/hooks/useScrollDirection.ts

import { useState, useEffect, useRef } from 'react';

type ScrollDirection = 'up' | 'down';

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('up');
  // Usamos useRef para guardar el último scroll sin causar re-renders
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Define un umbral para no activar el efecto en la parte superior de la página
      const SCROLL_THRESHOLD = 100;

      if (currentScrollY > SCROLL_THRESHOLD) {
        // Si el scroll actual es mayor que el anterior, estamos bajando
        if (currentScrollY > lastScrollY.current) {
          setScrollDirection('down');
        } else {
          // Si no, estamos subiendo
          setScrollDirection('up');
        }
      } else {
        // Cuando estamos cerca de la parte superior, siempre mostramos el header
        setScrollDirection('up');
      }

      // Actualiza la última posición de scroll
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    // ¡Muy importante! Limpia el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // El array vacío asegura que este efecto solo se ejecute una vez

  return scrollDirection;
}