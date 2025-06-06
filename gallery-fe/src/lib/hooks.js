import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MODE_AUTO, THEME_NIGHT } from "../store/theme";
import { LOCAL_THEME, LOCAL_THEME_MODE } from "./constants";

export function useBrowserTheme() {
  function getCurrentTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  const [isNightTheme, setIsNightTheme] = useState(getCurrentTheme());

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

export function useTheme() {
  setDefaultTheme();

  const browserTheme = useBrowserTheme();
  const themeState = useSelector(state => state.theme);

  if (themeState.mode === MODE_AUTO) {
    return browserTheme;
  } else {
    return themeState.theme;
  }
}

async function setDefaultTheme() {
  const theme = localStorage.getItem(LOCAL_THEME_MODE);
  if (!theme) {
    localStorage.setItem(LOCAL_THEME_MODE, MODE_AUTO);
    localStorage.setItem(LOCAL_THEME, THEME_NIGHT);
  }
}