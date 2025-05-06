
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Index from '../Index';

// Mock the components
vi.mock('@/components/WordScrambleGame', () => ({
  default: () => <div data-testid="word-scramble-game">WordScrambleGame</div>
}));

vi.mock('@/components/GameHeader', () => ({
  default: () => <div data-testid="game-header">GameHeader</div>
}));

describe('Index page', () => {
  it('renders the game components', () => {
    render(<Index />);
    
    expect(screen.getByTestId('word-scramble-game')).toBeInTheDocument();
    expect(screen.getByTestId('game-header')).toBeInTheDocument();
  });

  it('renders the developer credit', () => {
    render(<Index />);
    
    expect(screen.getByAltText('Developer Logo')).toBeInTheDocument();
    expect(screen.getByText('Developed by Bilal Soliu')).toBeInTheDocument();
  });
});
