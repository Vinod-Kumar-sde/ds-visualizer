import { NavLink } from "react-router-dom";
import { Database, Layers, List, GitBranch, Binary } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { path: "/", label: "Array", icon: Database },
  { path: "/stack", label: "Stack", icon: Layers },
  { path: "/queue", label: "Queue", icon: List },
  { path: "/linked-list", label: "Linked List", icon: GitBranch },
  { path: "/tree", label: "Tree", icon: Binary },
];

export const Navigation = () => {
  return (
    <nav className="glass-card p-6 mb-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-3">
          {navItems.map((item, index) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-primary-foreground glow-effect"
                    : "bg-secondary hover:bg-secondary/80 text-foreground"
                }`
              }
            >
              {({ isActive }) => (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </motion.div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
