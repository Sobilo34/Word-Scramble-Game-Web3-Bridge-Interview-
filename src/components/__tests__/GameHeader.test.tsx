
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GameHeader from '../GameHeader';

describe('GameHeader', () => {
  it('renders the game title correctly', () => {
    render(<GameHeader />);
    
    expect(screen.getByText('Word')).toBeInTheDocument();
    expect(screen.getByText('Scramble Game')).toBeInTheDocument();
  });

  it('renders the subtitle and description', () => {
    render(<GameHeader />);
    
    expect(screen.getByText('An interview question for Web3 bridge')).toBeInTheDocument();
    expect(screen.getByText('Unscramble the words and earn points before time runs out!')).toBeInTheDocument();
  });
});
