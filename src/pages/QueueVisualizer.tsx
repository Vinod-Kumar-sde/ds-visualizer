import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { ControlPanel } from "@/components/ControlPanel";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

export default function QueueVisualizer() {
  const [queue, setQueue] = useState<number[]>([5, 10, 15, 20]);
  const [inputValue, setInputValue] = useState("");
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);

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
        <ControlPanel
          inputValue={inputValue}
          onInputChange={setInputValue}
          onEnterPress={handleEnqueue}
          operations={operations}
          onClear={handleClear}
        />

        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Queue Visualization (FIFO)</h2>
          
          <div className="flex items-center justify-center gap-4 min-h-[200px] overflow-x-auto pb-4">
            {queue.length === 0 ? (
              <div className="text-center text-muted-foreground">
                Queue is empty. Enqueue some values!
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center">
                  <span className="text-sm text-muted-foreground mb-2">FRONT</span>
                  <ArrowRight className="text-accent w-8 h-8" />
                </div>
                {queue.map((value, index) => (
                  <div
                    key={index}
                    className={`w-20 h-20 flex items-center justify-center rounded-lg font-bold text-xl bg-primary/20 border-2 border-primary text-primary transition-all duration-300 ${
                      animatingIndex === index ? "animate-pop glow-effect scale-110" : ""
                    }`}
                  >
                    {value}
                  </div>
                ))}
                <div className="flex flex-col items-center">
                  <span className="text-sm text-muted-foreground mb-2">REAR</span>
                  <ArrowRight className="text-accent w-8 h-8" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
