import { createContext, useContext } from "react";

type Theme = "dark";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => {}, // theme is fixed
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Always apply dark mode
  if (typeof window !== "undefined") {
    const root = window.document.documentElement;
    root.classList.add("dark");
    root.classList.remove("light");
  }

  const value: ThemeProviderState = {
    theme: "dark",
    setTheme: () => {}, // Theme cannot be changed
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
