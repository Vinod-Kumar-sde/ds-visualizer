import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center glass-card p-12 rounded-2xl max-w-md"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          className="inline-block mb-6"
        >
          <AlertCircle className="w-24 h-24 text-destructive mx-auto" />
        </motion.div>
        
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="mb-4 text-6xl font-bold gradient-text"
        >
          404
        </motion.h1>
        
        <motion.p
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="mb-8 text-xl text-muted-foreground"
        >
          Oops! This page got lost in the data structure
        </motion.p>
        
        <Link to="/">
          <Button size="lg" className="gap-2">
            <Home className="w-5 h-5" />
            Return to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
