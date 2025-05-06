
import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, HelpCircle, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getWordsByDifficulty, scrambleWord, getWordHint } from '@/utils/wordData';
import { toast } from '@/components/ui/sonner';
import GameTimer from './GameTimer';

const DIFFICULTY_THRESHOLD = 5;
const INITIAL_TIME = 30;
const POINTS_PER_CORRECT = 10;

const WordScrambleGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [difficulty, setDifficulty] = useState(1);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hint, setHint] = useState('');
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [isCorrectAnimation, setIsCorrectAnimation] = useState(false);
  const [isWrongAnimation, setIsWrongAnimation] = useState(false);

  const getNewWord = useCallback(() => {
    const words = getWordsByDifficulty(difficulty);
    if (words.length === 0) {
      toast.error("No words available for this difficulty level!");
      return false;
    }
    
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];
    
    setCurrentWord(word);
    setScrambledWord(scrambleWord(word));
    setHint(getWordHint(word));
    setShowHint(false);
    setUserGuess('');
    setTimeLeft(Math.max(INITIAL_TIME - (difficulty - 1) * 5, 15));
    setIsTimerActive(true);
    
    return true;
  }, [difficulty]);

  useEffect(() => {
    getNewWord();
  }, [getNewWord]);

  const checkGuess = () => {
    if (!userGuess.trim()) {
      toast.error("Please enter a guess!");
      return;
    }

    if (userGuess.toLowerCase() === currentWord.toLowerCase()) {
      setIsCorrectAnimation(true);
      setTimeout(() => setIsCorrectAnimation(false), 500);
      
      const newScore = score + POINTS_PER_CORRECT;
      setScore(newScore);
      
      const newCorrectGuesses = correctGuesses + 1;
      setCorrectGuesses(newCorrectGuesses);
      
      if (newCorrectGuesses % DIFFICULTY_THRESHOLD === 0) {
        const newDifficulty = difficulty + 1;
        setDifficulty(newDifficulty);
        toast.success(`Difficulty increased to level ${newDifficulty}!`);
      }
      
      toast.success("Correct! +10 points");
      setIsTimerActive(false);
      
      setTimeout(() => {
        getNewWord();
      }, 1000);
    } else {
      setIsWrongAnimation(true);
      setTimeout(() => setIsWrongAnimation(false), 500);
      toast.error("Incorrect! Try again.");
    }
  };

  const handleTimeUp = () => {
    toast.error(`Time's up! The word was "${currentWord}"`);
    setIsTimerActive(false);
    
    setTimeout(() => {
      getNewWord();
    }, 2000);
  };

  const showWordHint = () => {
    setShowHint(true);
    toast.info("Hint revealed!");
  };

  return (
    <div className={`w-full max-w-md mx-auto p-6 rounded-lg ${isCorrectAnimation ? 'animate-celebrate' : isWrongAnimation ? 'animate-shake' : ''}`}>
      <div className="flex justify-between items-center mb-6">
        <div className="text-gameRed font-bold text-2xl">Score: {score}</div>
        <div className="text-white font-medium">Level: {difficulty}</div>
      </div>
      
      <GameTimer 
        timeLeft={timeLeft} 
        setTimeLeft={setTimeLeft} 
        isActive={isTimerActive} 
        onTimeUp={handleTimeUp} 
      />
      
      <div className="bg-gameDarkGray p-6 rounded-lg mb-6">
        <h2 className="text-center text-white text-lg mb-2">Unscramble This Word:</h2>
        <div className="flex justify-center mb-4">
          {scrambledWord.split('').map((letter, index) => (
            <div 
              key={index} 
              className="inline-flex items-center justify-center w-10 h-10 m-1 bg-gameBlack text-gameRed text-xl font-bold rounded"
            >
              {letter.toUpperCase()}
            </div>
          ))}
        </div>
        
        {showHint && (
          <div className="text-center text-white text-sm italic mb-4">
            Hint: {hint}
          </div>
        )}
      </div>
      
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Enter your guess"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          className="bg-gameBlack text-white border-gameGray focus:border-gameRed"
          onKeyDown={(e) => {
            if (e.key === 'Enter') checkGuess();
          }}
        />
      </div>
      
      <div className="flex space-x-4">
        <Button 
          className="flex-1 bg-gameRed hover:bg-gameDarkRed text-white"
          onClick={checkGuess}
        >
          Submit <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        
        <Button 
          className="bg-gameDarkGray hover:bg-gameGray text-white"
          onClick={showWordHint}
          disabled={showHint}
        >
          <HelpCircle className="mr-2 h-4 w-4" />
          Hint
        </Button>
        
        <Button 
          className="bg-gameDarkGray hover:bg-gameGray text-white"
          onClick={() => {
            setIsTimerActive(false);
            setTimeout(() => {
              getNewWord();
            }, 500);
          }}
        >
          <Timer className="mr-2 h-4 w-4" />
          Skip
        </Button>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-gameGray text-sm">
          Correctly guess the word before time runs out!
        </p>
        <p className="text-gameGray text-sm">
          Difficulty increases every {DIFFICULTY_THRESHOLD} correct answers.
        </p>
      </div>
    </div>
  );
};

export default WordScrambleGame;
