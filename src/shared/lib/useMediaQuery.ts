import { useEffect, useState } from 'react';

/** Хук, возвращающий `true`, если медиазапрос совпадает. */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia)
      return false;

    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia)
      return undefined;

    const mediaQuery = window.matchMedia(query);
    const handleChange = (event: MediaQueryListEvent): void => setMatches(event.matches);

    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}
