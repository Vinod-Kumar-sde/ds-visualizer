import { Moon, Sun, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";

export const ThemeToggle = () => {
  const { theme, colorPalette, toggleTheme, setColorPalette } = useTheme();

  const palettes = [
    { name: "Default", value: "default" as const, colors: "🎨" },
    { name: "Ocean", value: "ocean" as const, colors: "🌊" },
    { name: "Forest", value: "forest" as const, colors: "🌲" },
    { name: "Sunset", value: "sunset" as const, colors: "🌅" },
    { name: "Purple", value: "purple" as const, colors: "💜" },
  ];

  return (
    <div className="flex items-center gap-2">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="relative overflow-hidden"
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: theme === "dark" ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {theme === "dark" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </motion.div>
        </Button>
      </motion.div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="icon">
              <Palette className="h-5 w-5" />
            </Button>
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Color Palette</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {palettes.map((palette) => (
            <DropdownMenuItem
              key={palette.value}
              onClick={() => setColorPalette(palette.value)}
              className={colorPalette === palette.value ? "bg-accent" : ""}
            >
              <span className="mr-2">{palette.colors}</span>
              {palette.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
