import { NavLink } from "react-router-dom";
import { Database, Layers, List, GitBranch, Binary } from "lucide-react";

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
          {navItems.map((item) => (
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
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
