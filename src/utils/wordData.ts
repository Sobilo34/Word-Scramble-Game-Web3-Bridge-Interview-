
export interface WordCategory {
  name: string;
  words: string[];
  difficulty: number;
}

export const wordCategories: WordCategory[] = [
  {
    name: "Animals",
    words: ["dog", "cat", "lion", "tiger", "elephant", "zebra", "giraffe", "monkey", "bear", "wolf"],
    difficulty: 1
  },
  {
    name: "Fruits",
    words: ["apple", "banana", "orange", "grape", "strawberry", "mango", "pineapple", "watermelon", "kiwi", "peach"],
    difficulty: 1
  },
  {
    name: "Countries",
    words: ["canada", "mexico", "brazil", "france", "germany", "japan", "australia", "egypt", "india", "russia"],
    difficulty: 2
  },
  {
    name: "Technology",
    words: ["computer", "internet", "software", "hardware", "database", "network", "algorithm", "encryption", "interface", "programming"],
    difficulty: 3
  },
  {
    name: "Science",
    words: ["biology", "chemistry", "physics", "geology", "astronomy", "genetics", "evolution", "molecule", "ecosystem", "hypothesis"],
    difficulty: 3
  }
];

export const getWordsByDifficulty = (level: number): string[] => {
  const filteredCategories = wordCategories.filter(category => category.difficulty <= level);
  return filteredCategories.flatMap(category => category.words);
};

export const scrambleWord = (word: string): string => {
  const chars = word.split('');
  
  let scrambled = '';
  do {
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    scrambled = chars.join('');
  } while (scrambled === word);
  
  return scrambled;
};

export const getWordHint = (word: string): string => {
  const category = wordCategories.find(cat => cat.words.includes(word.toLowerCase()));
  if (category) {
    return `Starts with '${word[0].toUpperCase()}', ${word.length} letters, category: ${category.name}`;
  }
  return `Starts with '${word[0].toUpperCase()}', ${word.length} letters`;
};
