import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { ControlPanel } from "@/components/ControlPanel";
import { toast } from "sonner";

export default function ArrayVisualizer() {
  const [array, setArray] = useState<number[]>([5, 12, 8, 23, 15]);
  const [inputValue, setInputValue] = useState("");
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);

  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      toast.error("Please enter a valid number");
      return;
    }
    
    setArray([...array, value]);
    setAnimatingIndex(array.length);
    setTimeout(() => setAnimatingIndex(null), 500);
    setInputValue("");
    toast.success(`Inserted ${value}`);
  };

  const handleDelete = () => {
    if (array.length === 0) {
      toast.error("Array is empty");
      return;
    }
    
    const lastValue = array[array.length - 1];
    setAnimatingIndex(array.length - 1);
    setTimeout(() => {
      setArray(array.slice(0, -1));
      setAnimatingIndex(null);
      toast.success(`Deleted ${lastValue}`);
    }, 300);
  };

  const handleClear = () => {
    setArray([]);
    toast.success("Array cleared");
  };

  const operations = [
    { label: "Insert", action: handleInsert },
    { label: "Delete Last", action: handleDelete, variant: "destructive" as const },
  ];

  return (
    <div className="min-h-screen p-8">
      <Navigation />
      
      <div className="max-w-6xl mx-auto">
        <ControlPanel
          inputValue={inputValue}
          onInputChange={setInputValue}
          operations={operations}
          onClear={handleClear}
        />

        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Array Visualization</h2>
          
          {array.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              Array is empty. Insert some values!
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 justify-center items-end min-h-[200px]">
              {array.map((value, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center transition-all duration-300 ${
                    animatingIndex === index ? "animate-pop" : ""
                  }`}
                >
                  <div
                    className="w-20 h-20 flex items-center justify-center rounded-lg font-bold text-xl bg-primary/20 border-2 border-primary text-primary glow-effect"
                    style={{
                      height: `${Math.min(value * 3, 150)}px`,
                      minHeight: "60px",
                    }}
                  >
                    {value}
                  </div>
                  <span className="mt-2 text-sm text-muted-foreground">[{index}]</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
