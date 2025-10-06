import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { ControlPanel } from "@/components/ControlPanel";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
            <h2 className="text-2xl font-bold mb-6 text-center">Linked List Visualization</h2>

            <div className="flex items-center justify-center gap-4 min-h-[200px] overflow-x-auto py-8">
              {list.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-muted-foreground"
                >
                  List is empty. Insert some values!
                </motion.div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {list.map((node, index) => (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, x: -50, scale: 0.5 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 50, scale: 0.5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="flex items-center gap-4"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`flex items-center gap-4 ${
                          animatingId === node.id ? "glow-effect animate-pulse-glow" : ""
                        }`}
                      >
                        <div className="w-20 h-20 flex items-center justify-center rounded-lg font-bold text-xl bg-primary/20 border-2 border-primary text-primary">
                          {node.value}
                        </div>
                        {index < list.length - 1 && (
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            <ArrowRight className="text-accent w-8 h-8" />
                          </motion.div>
                        )}
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
