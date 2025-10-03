import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ColorPalette = "default" | "ocean" | "forest" | "sunset" | "purple";

interface ThemeContextType {
  theme: Theme;
  colorPalette: ColorPalette;
  toggleTheme: () => void;
  setColorPalette: (palette: ColorPalette) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme");
    return (stored as Theme) || "dark";
  });
  
  const [colorPalette, setColorPaletteState] = useState<ColorPalette>(() => {
    const stored = localStorage.getItem("colorPalette");
    return (stored as ColorPalette) || "default";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-palette", colorPalette);
    localStorage.setItem("colorPalette", colorPalette);
  }, [colorPalette]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setColorPalette = (palette: ColorPalette) => {
    setColorPaletteState(palette);
  };

  return (
    <ThemeContext.Provider value={{ theme, colorPalette, toggleTheme, setColorPalette }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
