
import React, { useEffect } from 'react';

interface GameTimerProps {
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  isActive: boolean;
  onTimeUp: () => void;
}

const GameTimer: React.FC<GameTimerProps> = ({ timeLeft, setTimeLeft, isActive, onTimeUp }) => {
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (interval) clearInterval(interval);
            onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isActive && interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, setTimeLeft, onTimeUp]);
  
  const timePercentage = timeLeft <= 0 ? 0 : (timeLeft / 30) * 100;
  
  const getTimerColor = () => {
    if (timeLeft > 20) return 'bg-green-500';
    if (timeLeft > 10) return 'bg-yellow-500';
    return 'bg-gameRed';
  };
  
  return (
    <div className="w-full mb-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-white">Time Left</span>
        <span className="text-sm font-medium text-white">{timeLeft}s</span>
      </div>
      <div className="w-full h-3 bg-gameDarkGray rounded-full">
        <div
          className={`h-full rounded-full ${getTimerColor()} transition-all duration-200`}
          style={{ width: `${timePercentage}%` }}
        />
      </div>
    </div>
  );
};

export default GameTimer;
