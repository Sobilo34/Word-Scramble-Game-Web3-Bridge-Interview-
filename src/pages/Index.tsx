
import React from 'react';
import WordScrambleGame from '@/components/WordScrambleGame';
import GameHeader from '@/components/GameHeader';

const Index = () => {
  return (
    <div className="min-h-screen bg-gameBlack flex flex-col items-center justify-center py-8 px-4 relative">
      <div className="absolute top-4 left-4 flex flex-col items-center">
        <img 
          src="/wordSramble-uploads/cc216637-2131-4997-8f2b-1c14c5ecc91b.png" 
          alt="Developer Logo" 
          className="w-16 h-16 object-contain rounded-full"
        />
        <p className="text-white text-xs mt-1">Developed by Bilal Soliu</p>
      </div>
      
      <div className="w-full max-w-lg mx-auto">
        <GameHeader />
        <WordScrambleGame />
      </div>
    </div>
  );
};

export default Index;
