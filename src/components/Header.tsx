import { Binary } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { motion } from "framer-motion";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 glass-card backdrop-blur-lg">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <motion.div 
            className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent p-2 glow-effect"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <Binary className="w-full h-full text-white" strokeWidth={2.5} />
          </motion.div>
          <h1 className="text-2xl font-bold gradient-text tracking-tight">
            VisuStruct
          </h1>
        </motion.div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground hidden sm:block">
            Interactive Data Structure Visualizer
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
