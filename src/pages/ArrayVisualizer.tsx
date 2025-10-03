import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { ControlPanel } from "@/components/ControlPanel";
import { StatsPanel } from "@/components/StatsPanel";
import { useGamification } from "@/contexts/GamificationContext";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function ArrayVisualizer() {
  const [array, setArray] = useState<number[]>([5, 12, 8, 23, 15]);
  const [inputValue, setInputValue] = useState("");
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);
  const { recordOperation } = useGamification();

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
    recordOperation("insert");
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
      recordOperation("delete");
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
    <div className="min-h-screen">
      <Header />
      <div className="p-8">
        <Navigation />
        <div className="max-w-6xl mx-auto">
          <StatsPanel />
          <ControlPanel
            inputValue={inputValue}
            onInputChange={setInputValue}
            onEnterPress={handleInsert}
            operations={operations}
            onClear={handleClear}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Array Visualization</h2>
            
            {array.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-muted-foreground py-12"
              >
                Array is empty. Insert some values!
              </motion.div>
            ) : (
              <div className="flex flex-wrap gap-4 justify-center items-end min-h-[200px]">
                <AnimatePresence mode="popLayout">
                  {array.map((value, index) => (
                    <motion.div
                      key={`${index}-${value}`}
                      initial={{ opacity: 0, scale: 0.5, y: -50 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.5, y: 50 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="flex flex-col items-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <motion.div
                        className={`w-20 flex items-center justify-center rounded-lg font-bold text-xl bg-primary/20 border-2 border-primary text-primary ${
                          animatingIndex === index ? "glow-effect" : ""
                        }`}
                        style={{
                          height: `${Math.min(value * 3, 150)}px`,
                          minHeight: "60px",
                        }}
                        animate={animatingIndex === index ? {
                          scale: [1, 1.2, 1],
                          rotate: [0, 5, -5, 0],
                        } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        {value}
                      </motion.div>
                      <span className="mt-2 text-sm text-muted-foreground">[{index}]</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
