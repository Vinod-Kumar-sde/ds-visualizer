import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import confetti from "canvas-confetti";
import { toast } from "sonner";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

interface GamificationContextType {
  points: number;
  level: number;
  streak: number;
  achievements: Achievement[];
  operationCount: number;
  addPoints: (amount: number, operation: string) => void;
  recordOperation: (type: string) => void;
  getNextLevelPoints: () => number;
  getProgressToNextLevel: () => number;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

const initialAchievements: Achievement[] = [
  { id: "first_insert", title: "First Steps", description: "Perform your first insertion", icon: "🎯", unlocked: false },
  { id: "ten_operations", title: "Getting Started", description: "Perform 10 operations", icon: "⚡", unlocked: false },
  { id: "fifty_operations", title: "Data Structure Explorer", description: "Perform 50 operations", icon: "🚀", unlocked: false },
  { id: "hundred_operations", title: "Algorithm Master", description: "Perform 100 operations", icon: "👑", unlocked: false },
  { id: "level_5", title: "Level 5 Reached", description: "Reach level 5", icon: "⭐", unlocked: false },
  { id: "level_10", title: "Expert Level", description: "Reach level 10", icon: "💎", unlocked: false },
  { id: "streak_5", title: "Dedicated Learner", description: "5 day streak", icon: "🔥", unlocked: false },
  { id: "all_structures", title: "Structure Master", description: "Use all data structures", icon: "🏆", unlocked: false },
];

export const GamificationProvider = ({ children }: { children: ReactNode }) => {
  const [points, setPoints] = useState(() => {
    const stored = localStorage.getItem("points");
    return stored ? parseInt(stored) : 0;
  });

  const [level, setLevel] = useState(() => {
    const stored = localStorage.getItem("level");
    return stored ? parseInt(stored) : 1;
  });

  const [streak, setStreak] = useState(() => {
    const stored = localStorage.getItem("streak");
    return stored ? parseInt(stored) : 0;
  });

  const [operationCount, setOperationCount] = useState(() => {
    const stored = localStorage.getItem("operationCount");
    return stored ? parseInt(stored) : 0;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const stored = localStorage.getItem("achievements");
    return stored ? JSON.parse(stored) : initialAchievements;
  });

  useEffect(() => {
    localStorage.setItem("points", points.toString());
    localStorage.setItem("level", level.toString());
    localStorage.setItem("streak", streak.toString());
    localStorage.setItem("operationCount", operationCount.toString());
    localStorage.setItem("achievements", JSON.stringify(achievements));
  }, [points, level, streak, operationCount, achievements]);

  const getNextLevelPoints = () => level * 100;
  const getProgressToNextLevel = () => (points % (level * 100)) / (level * 100) * 100;

  const checkLevelUp = (newPoints: number) => {
    const nextLevelPoints = getNextLevelPoints();
    if (newPoints >= nextLevelPoints) {
      const newLevel = level + 1;
      setLevel(newLevel);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF6347']
      });
      toast.success(`🎉 Level Up! You're now level ${newLevel}!`, {
        duration: 4000,
      });
      checkAchievement("level_5", newLevel >= 5);
      checkAchievement("level_10", newLevel >= 10);
    }
  };

  const checkAchievement = (id: string, condition: boolean) => {
    if (!condition) return;
    
    setAchievements((prev) => {
      const achievement = prev.find((a) => a.id === id);
      if (!achievement || achievement.unlocked) return prev;

      const updated = prev.map((a) =>
        a.id === id ? { ...a, unlocked: true, unlockedAt: new Date() } : a
      );

      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#FFA500']
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD700', '#FFA500']
      });

      toast.success(`🏆 Achievement Unlocked: ${achievement.title}`, {
        description: achievement.description,
        duration: 5000,
      });

      return updated;
    });
  };

  const addPoints = (amount: number, operation: string) => {
    const newPoints = points + amount;
    setPoints(newPoints);
    checkLevelUp(newPoints);
    
    toast.success(`+${amount} points for ${operation}!`, {
      duration: 2000,
    });
  };

  const recordOperation = (type: string) => {
    const newCount = operationCount + 1;
    setOperationCount(newCount);
    addPoints(10, type);

    checkAchievement("first_insert", newCount >= 1);
    checkAchievement("ten_operations", newCount >= 10);
    checkAchievement("fifty_operations", newCount >= 50);
    checkAchievement("hundred_operations", newCount >= 100);
  };

  return (
    <GamificationContext.Provider
      value={{
        points,
        level,
        streak,
        achievements,
        operationCount,
        addPoints,
        recordOperation,
        getNextLevelPoints,
        getProgressToNextLevel,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) throw new Error("useGamification must be used within GamificationProvider");
  return context;
};
