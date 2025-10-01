import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ControlPanelProps {
  onInsert?: (value: number) => void;
  onDelete?: (value?: number) => void;
  onPush?: (value: number) => void;
  onPop?: () => void;
  onEnqueue?: (value: number) => void;
  onDequeue?: () => void;
  onClear?: () => void;
  inputValue: string;
  onInputChange: (value: string) => void;
  operations: {
    label: string;
    action: () => void;
    variant?: "default" | "destructive";
  }[];
}

export const ControlPanel = ({
  inputValue,
  onInputChange,
  operations,
  onClear,
}: ControlPanelProps) => {
  return (
    <div className="glass-card p-6 mb-8 animate-slide-in">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium mb-2 text-muted-foreground">
            Enter Value
          </label>
          <Input
            type="number"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Enter a number"
            className="bg-input border-border"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {operations.map((op, index) => (
            <Button
              key={index}
              onClick={op.action}
              variant={op.variant || "default"}
              className="min-w-[100px]"
            >
              {op.label}
            </Button>
          ))}
          {onClear && (
            <Button onClick={onClear} variant="destructive">
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
