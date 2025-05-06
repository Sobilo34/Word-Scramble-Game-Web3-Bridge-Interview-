
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import WordScrambleGame from '../WordScrambleGame';
import * as wordData from '@/utils/wordData';

// Mock the toast function
vi.mock('@/components/ui/sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn()
  }
}));

describe('WordScrambleGame', () => {
  beforeEach(() => {
    // Mock the wordData utilities
    vi.spyOn(wordData, 'getWordsByDifficulty').mockReturnValue(['apple']);
    vi.spyOn(wordData, 'scrambleWord').mockReturnValue('papel');
    vi.spyOn(wordData, 'getWordHint').mockReturnValue('Starts with \'A\', 5 letters, category: Fruits');
    
    // Reset timers
    vi.useFakeTimers();
  });

  it('renders the game interface correctly', () => {
    render(<WordScrambleGame />);
    
    // Check score and level
    expect(screen.getByText('Score: 0')).toBeInTheDocument();
    expect(screen.getByText('Level: 1')).toBeInTheDocument();
    
    // Check scrambled word
    const scrambledLetters = screen.getAllByText(/P|A|P|E|L/i);
    expect(scrambledLetters).toHaveLength(5);
    
    // Check input field and buttons
    expect(screen.getByPlaceholderText('Enter your guess')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('Hint')).toBeInTheDocument();
    expect(screen.getByText('Skip')).toBeInTheDocument();
  });

  it('handles correct guess correctly', () => {
    render(<WordScrambleGame />);
    
    const input = screen.getByPlaceholderText('Enter your guess');
    fireEvent.change(input, { target: { value: 'apple' } });
    
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    
    // Check if score increases
    expect(screen.getByText('Score: 10')).toBeInTheDocument();
  });

  it('shows hint when hint button is clicked', async () => {
    render(<WordScrambleGame />);
    
    const hintButton = screen.getByText('Hint');
    fireEvent.click(hintButton);
    
    // Check if hint is shown
    await vi.waitFor(() => {
      expect(screen.getByText(/Starts with 'A', 5 letters, category: Fruits/)).toBeInTheDocument();
    });
  });

  it('gets new word when skip button is clicked', () => {
    render(<WordScrambleGame />);
    
    // Set up spies
    const getNewWordSpy = vi.spyOn(wordData, 'scrambleWord');
    
    const skipButton = screen.getByText('Skip');
    fireEvent.click(skipButton);
    
    // Advance timers to trigger the new word function
    vi.advanceTimersByTime(500);
    
    // Check if a new word was requested
    expect(getNewWordSpy).toHaveBeenCalled();
  });
});
