import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { ControlPanel } from "@/components/ControlPanel";
import { StatsPanel } from "@/components/StatsPanel";
import { useGamification } from "@/contexts/GamificationContext";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function QueueVisualizer() {
  const [queue, setQueue] = useState<number[]>([5, 10, 15, 20]);
  const [inputValue, setInputValue] = useState("");
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);
  const { recordOperation } = useGamification();

  const handleEnqueue = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      toast.error("Please enter a valid number");
      return;
    }
    
    setQueue([...queue, value]);
    setAnimatingIndex(queue.length);
    setTimeout(() => setAnimatingIndex(null), 500);
    setInputValue("");
    recordOperation("enqueue");
    toast.success(`Enqueued ${value}`);
  };

  const handleDequeue = () => {
    if (queue.length === 0) {
      toast.error("Queue is empty");
      return;
    }
    
    const frontValue = queue[0];
    setAnimatingIndex(0);
    setTimeout(() => {
      setQueue(queue.slice(1));
      setAnimatingIndex(null);
      recordOperation("dequeue");
      toast.success(`Dequeued ${frontValue}`);
    }, 300);
  };

  const handleClear = () => {
    setQueue([]);
    toast.success("Queue cleared");
  };

  const operations = [
    { label: "Enqueue", action: handleEnqueue },
    { label: "Dequeue", action: handleDequeue, variant: "destructive" as const },
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
            onEnterPress={handleEnqueue}
            operations={operations}
            onClear={handleClear}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Queue Visualization (FIFO)</h2>
            
            <div className="flex items-center justify-center gap-4 min-h-[200px] overflow-x-auto pb-4">
              {queue.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-muted-foreground"
                >
                  Queue is empty. Enqueue some values!
                </motion.div>
              ) : (
                <>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-muted-foreground mb-2">FRONT</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <ArrowRight className="text-accent w-8 h-8" />
                    </motion.div>
                  </div>
                  <AnimatePresence mode="popLayout">
                    {queue.map((value, index) => (
                      <motion.div
                        key={`${index}-${value}`}
                        initial={{ opacity: 0, x: -50, scale: 0.5 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 50, scale: 0.5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        whileHover={{ scale: 1.1, y: -5 }}
                        className={`w-20 h-20 flex items-center justify-center rounded-lg font-bold text-xl bg-primary/20 border-2 border-primary text-primary ${
                          animatingIndex === index ? "glow-effect animate-pulse-glow" : ""
                        }`}
                      >
                        {value}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-muted-foreground mb-2">REAR</span>
                    <ArrowRight className="text-accent w-8 h-8" />
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
