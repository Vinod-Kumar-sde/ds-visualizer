import { Trophy, Star, Zap, Target } from "lucide-react";
import { useGamification } from "@/contexts/GamificationContext";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const StatsPanel = () => {
  const { points, level, operationCount, achievements, getProgressToNextLevel, getNextLevelPoints } = useGamification();
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 mb-6"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <HoverCard>
          <HoverCardTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text">{level}</div>
                <div className="text-xs text-muted-foreground">Level</div>
              </div>
            </motion.div>
          </HoverCardTrigger>
          <HoverCardContent className="w-64">
            <div className="space-y-2">
              <h4 className="font-semibold">Level Progress</h4>
              <Progress value={getProgressToNextLevel()} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {points % getNextLevelPoints()} / {getNextLevelPoints()} XP to next level
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 p-3 rounded-lg bg-accent/10"
        >
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-accent" />
          </div>
          <div>
            <div className="text-2xl font-bold">{points}</div>
            <div className="text-xs text-muted-foreground">Points</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 p-3 rounded-lg bg-secondary/10"
        >
          <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
            <Target className="w-5 h-5 text-secondary-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">{operationCount}</div>
            <div className="text-xs text-muted-foreground">Operations</div>
          </div>
        </motion.div>

        <HoverCard>
          <HoverCardTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/10 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{unlockedCount}/{achievements.length}</div>
                <div className="text-xs text-muted-foreground">Achievements</div>
              </div>
            </motion.div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-3">
              <h4 className="font-semibold">Recent Achievements</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-2 rounded-lg ${
                      achievement.unlocked ? "bg-accent/20" : "bg-muted/20 opacity-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{achievement.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {achievement.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </motion.div>
  );
};
