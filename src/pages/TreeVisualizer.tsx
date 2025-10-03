import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { ControlPanel } from "@/components/ControlPanel";
import { StatsPanel } from "@/components/StatsPanel";
import { useGamification } from "@/contexts/GamificationContext";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  id: number;
}

export default function TreeVisualizer() {
  const [root, setRoot] = useState<TreeNode | null>({
    value: 50,
    id: 0,
    left: {
      value: 30,
      id: 1,
      left: { value: 20, id: 3, left: null, right: null },
      right: { value: 40, id: 4, left: null, right: null },
    },
    right: {
      value: 70,
      id: 2,
      left: { value: 60, id: 5, left: null, right: null },
      right: { value: 80, id: 6, left: null, right: null },
    },
  });
  const [inputValue, setInputValue] = useState("");
  const [nextId, setNextId] = useState(7);
  const [animatingId, setAnimatingId] = useState<number | null>(null);
  const { recordOperation } = useGamification();

  const insertNode = (node: TreeNode | null, value: number, id: number): TreeNode => {
    if (!node) {
      return { value, id, left: null, right: null };
    }

    if (value < node.value) {
      return { ...node, left: insertNode(node.left, value, id) };
    } else {
      return { ...node, right: insertNode(node.right, value, id) };
    }
  };

  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      toast.error("Please enter a valid number");
      return;
    }

    setAnimatingId(nextId);
    setRoot(insertNode(root, value, nextId));
    setNextId(nextId + 1);
    setTimeout(() => setAnimatingId(null), 500);
    setInputValue("");
    recordOperation("tree insert");
    toast.success(`Inserted ${value}`);
  };

  const handleClear = () => {
    setRoot(null);
    toast.success("Tree cleared");
  };

  const operations = [{ label: "Insert", action: handleInsert }];

  const renderNode = (node: TreeNode | null, level: number = 0): JSX.Element | null => {
    if (!node) return null;

    return (
      <div className="flex flex-col items-center gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          whileHover={{ scale: 1.15, rotate: 5 }}
          className={`w-16 h-16 flex items-center justify-center rounded-full font-bold text-lg bg-primary/20 border-2 border-primary text-primary ${
            animatingId === node.id ? "glow-effect animate-pulse-glow" : ""
          }`}
        >
          {node.value}
        </motion.div>
        {(node.left || node.right) && (
          <div className="flex gap-8">
            <div className="flex flex-col items-center">
              {node.left && (
                <>
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    className="w-px h-8 bg-accent origin-top"
                  />
                  {renderNode(node.left, level + 1)}
                </>
              )}
            </div>
            <div className="flex flex-col items-center">
              {node.right && (
                <>
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    className="w-px h-8 bg-accent origin-top"
                  />
                  {renderNode(node.right, level + 1)}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

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
            <h2 className="text-2xl font-bold mb-6 text-center">Binary Search Tree Visualization</h2>
            
            <div className="flex justify-center items-start min-h-[400px] overflow-x-auto py-8">
              {root ? (
                renderNode(root)
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-muted-foreground"
                >
                  Tree is empty. Insert some values!
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
