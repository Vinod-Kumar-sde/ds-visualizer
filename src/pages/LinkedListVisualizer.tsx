import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { ControlPanel } from "@/components/ControlPanel";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

interface Node {
  value: number;
  id: number;
}

export default function LinkedListVisualizer() {
  const [list, setList] = useState<Node[]>([
    { value: 10, id: 0 },
    { value: 20, id: 1 },
    { value: 30, id: 2 },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [nextId, setNextId] = useState(3);
  const [animatingId, setAnimatingId] = useState<number | null>(null);

  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      toast.error("Please enter a valid number");
      return;
    }
    
    const newNode = { value, id: nextId };
    setList([...list, newNode]);
    setAnimatingId(nextId);
    setNextId(nextId + 1);
    setTimeout(() => setAnimatingId(null), 500);
    setInputValue("");
    toast.success(`Inserted ${value}`);
  };

  const handleDelete = () => {
    if (list.length === 0) {
      toast.error("List is empty");
      return;
    }
    
    const lastNode = list[list.length - 1];
    setAnimatingId(lastNode.id);
    setTimeout(() => {
      setList(list.slice(0, -1));
      setAnimatingId(null);
      toast.success(`Deleted ${lastNode.value}`);
    }, 300);
  };

  const handleClear = () => {
    setList([]);
    toast.success("List cleared");
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
          <h2 className="text-2xl font-bold mb-6 text-center">Linked List Visualization</h2>
          
          <div className="flex items-center justify-center gap-4 min-h-[200px] overflow-x-auto pb-4">
            {list.length === 0 ? (
              <div className="text-center text-muted-foreground">
                List is empty. Insert some values!
              </div>
            ) : (
              <>
                <div className="text-sm text-accent font-bold">HEAD →</div>
                {list.map((node, index) => (
                  <div key={node.id} className="flex items-center gap-4">
                    <div
                      className={`flex items-center gap-4 transition-all duration-300 ${
                        animatingId === node.id ? "animate-pop" : ""
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-24 h-24 flex flex-col items-center justify-center rounded-lg font-bold text-xl bg-primary/20 border-2 border-primary text-primary ${
                            animatingId === node.id ? "glow-effect" : ""
                          }`}
                        >
                          <div>{node.value}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {index === 0 ? "head" : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < list.length - 1 && (
                      <ArrowRight className="text-accent w-6 h-6" />
                    )}
                  </div>
                ))}
                <div className="text-sm text-muted-foreground">→ NULL</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
