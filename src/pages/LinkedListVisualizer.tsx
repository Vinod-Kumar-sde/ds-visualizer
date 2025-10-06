import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { ControlPanel } from "@/components/ControlPanel";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ListNode {
  value: number;
  id: number;
}

export default function LinkedListVisualizer() {
  const [list, setList] = useState<ListNode[]>([
    { value: 10, id: 0 },
    { value: 20, id: 1 },
    { value: 30, id: 2 },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [nextId, setNextId] = useState(3);
  const [animatingId, setAnimatingId] = useState<number | null>(null);
  const [isDoublyLinked, setIsDoublyLinked] = useState(false);

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

  const toggleListType = () => {
    setIsDoublyLinked(!isDoublyLinked);
    toast.success(`Switched to ${!isDoublyLinked ? "Doubly" : "Singly"} Linked List`);
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
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {isDoublyLinked ? "Doubly" : "Singly"} Linked List Visualization
              </h2>
              <Button onClick={toggleListType} variant="outline">
                Switch to {isDoublyLinked ? "Singly" : "Doubly"} Linked List
              </Button>
            </div>

            <div className="flex items-center justify-center gap-4 min-h-[300px] overflow-x-auto py-8">
              {list.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-muted-foreground"
                >
                  List is empty. Insert some values!
                </motion.div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="text-sm text-muted-foreground font-mono">HEAD</div>
                  <AnimatePresence mode="popLayout">
                    {list.map((node, index) => (
                      <motion.div
                        key={node.id}
                        initial={{ opacity: 0, x: -50, scale: 0.5 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 50, scale: 0.5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="flex items-center gap-2"
                      >
                        {/* Previous arrow for doubly linked list */}
                        {isDoublyLinked && index > 0 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center"
                          >
                            <motion.div
                              animate={{ x: [-3, 0, -3] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                            >
                              <ArrowLeft className="text-secondary-foreground/40 w-6 h-6" />
                            </motion.div>
                            <span className="text-[10px] text-muted-foreground">prev</span>
                          </motion.div>
                        )}

                        {/* Node structure */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className={`${
                            animatingId === node.id ? "glow-effect animate-pulse-glow" : ""
                          }`}
                        >
                          <div className="flex items-stretch border-2 border-primary rounded-lg overflow-hidden bg-card">
                            {/* Previous pointer section (for doubly linked) */}
                            {isDoublyLinked && (
                              <div className="w-16 bg-secondary/20 border-r-2 border-primary flex flex-col items-center justify-center p-2">
                                <div className="text-[10px] text-muted-foreground mb-1">prev</div>
                                <div className="text-xs font-mono text-accent">
                                  {index === 0 ? "null" : `0x${(node.id - 1).toString(16).padStart(3, '0')}`}
                                </div>
                              </div>
                            )}
                            
                            {/* Data section */}
                            <div className="w-20 h-20 bg-primary/20 flex items-center justify-center">
                              <span className="font-bold text-xl text-primary">{node.value}</span>
                            </div>
                            
                            {/* Next pointer section */}
                            <div className="w-16 bg-secondary/20 border-l-2 border-primary flex flex-col items-center justify-center p-2">
                              <div className="text-[10px] text-muted-foreground mb-1">next</div>
                              <div className="text-xs font-mono text-accent">
                                {index === list.length - 1 ? "null" : `0x${list[index + 1].id.toString(16).padStart(3, '0')}`}
                              </div>
                            </div>
                          </div>
                          
                          {/* Memory address label */}
                          <div className="text-center mt-1">
                            <span className="text-[10px] text-muted-foreground font-mono">
                              @0x{node.id.toString(16).padStart(3, '0')}
                            </span>
                          </div>
                        </motion.div>

                        {/* Next arrow */}
                        {index < list.length - 1 && (
                          <motion.div
                            className="flex flex-col items-center"
                          >
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                              <ArrowRight className="text-accent w-6 h-6" />
                            </motion.div>
                            <span className="text-[10px] text-muted-foreground">next</span>
                          </motion.div>
                        )}

                        {/* Backward arrow for doubly linked list */}
                        {isDoublyLinked && index < list.length - 1 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center -ml-2"
                          >
                            <motion.div
                              animate={{ x: [3, 0, 3] }}
                              transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                            >
                              <ArrowLeft className="text-secondary-foreground/40 w-6 h-6" />
                            </motion.div>
                            <span className="text-[10px] text-muted-foreground">prev</span>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {list.length > 0 && (
                    <div className="text-sm text-muted-foreground font-mono ml-2">
                      → null
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
