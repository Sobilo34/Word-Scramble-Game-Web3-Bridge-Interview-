
import React from 'react';

const GameHeader: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold mb-2">
        <span className="text-gameRed">Word</span>
        <span className="text-white"> Scramble Game</span>
      </h1>
      <p className="text-gameGray mb-1">An interview question for Web3 bridge</p>
      <p className="text-white">Unscramble the words and earn points before time runs out!</p>
    </div>
  );
};

export default GameHeader;
