import { useEffect, useState } from "react";

export function useBrowserTheme() {
  function getCurrentTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  const [ isNightTheme, setIsNightTheme ] = useState(getCurrentTheme());

  function themeListener(event) {
    setIsNightTheme(event.matches);
  }

  useEffect(() => {
    const nightTheme = window.matchMedia("(prefers-color-scheme: dark)");
    nightTheme.addListener(themeListener);

    return () => {
      nightTheme.removeListener(themeListener);
    }
  });

  return isNightTheme ? 'night' : 'day';
}