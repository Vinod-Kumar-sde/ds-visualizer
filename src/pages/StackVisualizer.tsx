import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { ControlPanel } from "@/components/ControlPanel";
import { toast } from "sonner";
import { ArrowDown } from "lucide-react";

export default function StackVisualizer() {
  const [stack, setStack] = useState<number[]>([10, 20, 30]);
  const [inputValue, setInputValue] = useState("");
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);

  const handlePush = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      toast.error("Please enter a valid number");
      return;
    }
    
    setStack([...stack, value]);
    setAnimatingIndex(stack.length);
    setTimeout(() => setAnimatingIndex(null), 500);
    setInputValue("");
    toast.success(`Pushed ${value}`);
  };

  const handlePop = () => {
    if (stack.length === 0) {
      toast.error("Stack is empty");
      return;
    }
    
    const topValue = stack[stack.length - 1];
    setAnimatingIndex(stack.length - 1);
    setTimeout(() => {
      setStack(stack.slice(0, -1));
      setAnimatingIndex(null);
      toast.success(`Popped ${topValue}`);
    }, 300);
  };

  const handleClear = () => {
    setStack([]);
    toast.success("Stack cleared");
  };

  const operations = [
    { label: "Push", action: handlePush },
    { label: "Pop", action: handlePop, variant: "destructive" as const },
  ];

  return (
    <div className="min-h-screen p-8">
      <Navigation />
      
      <div className="max-w-6xl mx-auto">
        <ControlPanel
          inputValue={inputValue}
          onInputChange={setInputValue}
          onEnterPress={handlePush}
          operations={operations}
          onClear={handleClear}
        />

        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Stack Visualization (LIFO)</h2>
          
          <div className="flex flex-col items-center gap-2 min-h-[400px] justify-end pb-8">
            {stack.length === 0 ? (
              <div className="text-center text-muted-foreground">
                Stack is empty. Push some values!
              </div>
            ) : (
              <>
                <ArrowDown className="text-accent w-8 h-8 mb-2" />
                <span className="text-sm text-muted-foreground mb-4">TOP</span>
                {[...stack].reverse().map((value, reverseIndex) => {
                  const index = stack.length - 1 - reverseIndex;
                  return (
                    <div
                      key={index}
                      className={`w-64 h-16 flex items-center justify-center rounded-lg font-bold text-xl bg-primary/20 border-2 border-primary text-primary transition-all duration-300 ${
                        animatingIndex === index ? "animate-pop glow-effect scale-110" : ""
                      }`}
                    >
                      {value}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
