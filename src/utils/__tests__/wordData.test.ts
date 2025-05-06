
import { describe, it, expect, vi } from 'vitest';
import { getWordsByDifficulty, scrambleWord, getWordHint, wordCategories } from '../wordData';

describe('wordData utilities', () => {
  describe('getWordsByDifficulty', () => {
    it('returns words for difficulty level 1', () => {
      const words = getWordsByDifficulty(1);
      
      // Should contain words from difficulty level 1 categories only
      const level1Words = wordCategories
        .filter(cat => cat.difficulty === 1)
        .flatMap(cat => cat.words);
      
      expect(words).toEqual(level1Words);
    });

    it('returns words for difficulty levels 1 and 2 when level is 2', () => {
      const words = getWordsByDifficulty(2);
      
      // Should contain words from difficulty level 1 and 2 categories
      const level1And2Words = wordCategories
        .filter(cat => cat.difficulty <= 2)
        .flatMap(cat => cat.words);
      
      expect(words).toEqual(level1And2Words);
    });
  });

  describe('scrambleWord', () => {
    it('returns a scrambled version of the input word', () => {
      // Mock Math.random to make the test deterministic
      const mockRandom = vi.spyOn(Math, 'random');
      mockRandom.mockReturnValue(0.5);
      
      const originalWord = 'test';
      const scrambled = scrambleWord(originalWord);
      
      // The scrambled word should not be the same as the original
      expect(scrambled).not.toBe(originalWord);
      
      // The scrambled word should have the same letters
      expect(scrambled.split('').sort().join('')).toBe(originalWord.split('').sort().join(''));
      
      mockRandom.mockRestore();
    });
  });

  describe('getWordHint', () => {
    it('returns a hint with first letter, length, and category', () => {
      const hint = getWordHint('dog');
      expect(hint).toContain("Starts with 'D'");
      expect(hint).toContain("3 letters");
      expect(hint).toContain("category: Animals");
    });

    it('returns a basic hint when word is not found in categories', () => {
      const hint = getWordHint('xyz');
      expect(hint).toBe("Starts with 'X', 3 letters");
    });
  });
});
