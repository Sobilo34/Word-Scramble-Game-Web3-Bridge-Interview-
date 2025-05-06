
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import GameTimer from '../GameTimer';

describe('GameTimer', () => {
  const mockSetTimeLeft = vi.fn();
  const mockOnTimeUp = vi.fn();
  
  beforeEach(() => {
    vi.useFakeTimers();
    mockSetTimeLeft.mockClear();
    mockOnTimeUp.mockClear();
  });

  it('renders the timer with correct time', () => {
    render(
      <GameTimer 
        timeLeft={25} 
        setTimeLeft={mockSetTimeLeft} 
        isActive={true} 
        onTimeUp={mockOnTimeUp} 
      />
    );
    
    expect(screen.getByText('25s')).toBeInTheDocument();
  });

  it('shows green progress bar when time is > 20 seconds', () => {
    const { container } = render(
      <GameTimer 
        timeLeft={25} 
        setTimeLeft={mockSetTimeLeft} 
        isActive={true} 
        onTimeUp={mockOnTimeUp} 
      />
    );
    
    const progressBar = container.querySelector('.bg-green-500');
    expect(progressBar).toBeInTheDocument();
  });

  it('shows yellow progress bar when time is between 11-20 seconds', () => {
    const { container } = render(
      <GameTimer 
        timeLeft={15} 
        setTimeLeft={mockSetTimeLeft} 
        isActive={true} 
        onTimeUp={mockOnTimeUp} 
      />
    );
    
    const progressBar = container.querySelector('.bg-yellow-500');
    expect(progressBar).toBeInTheDocument();
  });

  it('shows red progress bar when time is <= 10 seconds', () => {
    const { container } = render(
      <GameTimer 
        timeLeft={10} 
        setTimeLeft={mockSetTimeLeft} 
        isActive={true} 
        onTimeUp={mockOnTimeUp} 
      />
    );
    
    const progressBar = container.querySelector('.bg-gameRed');
    expect(progressBar).toBeInTheDocument();
  });

  it('calls onTimeUp when timer reaches 0', () => {
    render(
      <GameTimer 
        timeLeft={1} 
        setTimeLeft={mockSetTimeLeft} 
        isActive={true} 
        onTimeUp={mockOnTimeUp} 
      />
    );
    
    vi.advanceTimersByTime(1000);
    expect(mockOnTimeUp).toHaveBeenCalledTimes(1);
  });

  it('does not decrease time when isActive is false', () => {
    render(
      <GameTimer 
        timeLeft={10} 
        setTimeLeft={mockSetTimeLeft} 
        isActive={false} 
        onTimeUp={mockOnTimeUp} 
      />
    );
    
    vi.advanceTimersByTime(1000);
    expect(mockSetTimeLeft).not.toHaveBeenCalled();
  });
});
