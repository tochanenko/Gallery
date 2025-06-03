import { createContext, useContext, useState } from "react";

export const ProgressContext = createContext({
  loading: true,
  setLoading: (Boolean) => { }
});

export function ProgressContextProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const ctxValue = {
    loading,
    setLoading
  }

  return <ProgressContext.Provider value={ctxValue}>{children}</ ProgressContext.Provider>
}

export function useProgress() {
  return useContext(ProgressContext);
}