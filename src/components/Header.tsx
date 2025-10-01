import { Binary } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 glass-card backdrop-blur-lg">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent p-2 glow-effect">
            <Binary className="w-full h-full text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold gradient-text tracking-tight">
            VisuStruct
          </h1>
        </div>
        <div className="text-sm text-muted-foreground hidden sm:block">
          Interactive Data Structure Visualizer
        </div>
      </div>
    </header>
  );
};
