export interface Dungeon {
  id: number;
  slug: string;
  codexNumber: string;
  codexTitle: string;
  dungeonName: string;
  subtitle: string;
  difficultyStars: number;
  xpReward: number;
  skillUnlock: string;
  bossName?: string;
  description: string;
  missionObjective: string;
  initialCode: string;
  expectedKeywordOrOutput: string;
  solutionHint: string;
  inventoryReward: {
    id: string;
    name: string;
    description: string;
    icon: string;
  };
}

export interface Quest {
  id: string;
  title: string;
  category: 'Daily' | 'Secondary' | 'Bonus';
  description: string;
  rewardXp: number;
  rewardStat?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface SkillNode {
  id: string;
  name: string;
  dungeonIdRequired: number;
  unlocked: boolean;
  icon: string;
  description: string;
}

export const DUNGEONS: Dungeon[] = [
  {
    id: 1,
    slug: "dungeon-1",
    codexNumber: "Codex I",
    codexTitle: "The Origin of Variables",
    dungeonName: "Dungeon I: The Beginner's Cave",
    subtitle: "Master the fundamentals of data storage and declaration.",
    difficultyStars: 1,
    xpReward: 100,
    skillUnlock: "Variables & Memory Allocation",
    description: "You awaken in an ancient stone cavern glowing with digital glyphs. To survive, you must instantiate Hunter data using Python variables.",
    missionObjective: "Declare variables `hunter_name` with string value 'Akhand' and `hunter_rank` with 'E-Rank', then print them.",
    initialCode: `# Codex I - The Beginner's Cave\n# Mission: Declare hunter_name and hunter_rank, then print them\n\nhunter_name = "Akhand"\nhunter_rank = "E-Rank"\n\nprint("Hunter Name:", hunter_name)\nprint("Rank:", hunter_rank)\n`,
    expectedKeywordOrOutput: "Akhand",
    solutionHint: "Use print(hunter_name) to output the Hunter's identity to the System.",
    inventoryReward: {
      id: "scroll-vars",
      name: "Python Variables Scroll",
      description: "An ancient parchment detailing variable scope and memory references.",
      icon: "📜"
    }
  },
  {
    id: 2,
    slug: "dungeon-2",
    codexNumber: "Codex II",
    codexTitle: "The Operator's Temple",
    dungeonName: "Dungeon II: Temple of Operators",
    subtitle: "Harness arithmetic, assignment, and logical expressions.",
    difficultyStars: 2,
    xpReward: 200,
    skillUnlock: "Operator Mastery",
    description: "Heavy stone doors block the sanctuary. Only precise mathematical operations and bitwise logic can align the ancient energy seals.",
    missionObjective: "Calculate total mana by adding base mana (100) and bonus mana (50), then multiply by 2.",
    initialCode: `# Codex II - Temple of Operators\n# Mission: Calculate total_mana = (100 + 50) * 2\n\nbase_mana = 100\nbonus_mana = 50\ntotal_mana = (base_mana + bonus_mana) * 2\n\nprint("Total Mana:", total_mana)\n`,
    expectedKeywordOrOutput: "300",
    solutionHint: "Remember operator precedence! Group addition inside parentheses before multiplying.",
    inventoryReward: {
      id: "rune-operators",
      name: "Operator Rune of Power",
      description: "Emits a faint glow of logical energy (+15 Intelligence).",
      icon: "⚡"
    }
  },
  {
    id: 3,
    slug: "dungeon-3",
    codexNumber: "Codex III",
    codexTitle: "Logic and Decisions",
    dungeonName: "Dungeon III: Forest of Decisions",
    subtitle: "Navigate branching paths governed by conditions.",
    difficultyStars: 2,
    xpReward: 250,
    skillUnlock: "Conditional Control Flow",
    bossName: "The Boolean Guardian",
    description: "Mist shrouds the dense forest. The Boolean Guardian stands before you, evaluating every step: TRUE allows passage, FALSE triggers a trap.",
    missionObjective: "Write an if/elif/else block that checks `hunter_level` >= 5 to grant passage, else deny.",
    initialCode: `# Codex III - Forest of Decisions\n# Mission: Defeat the Boolean Guardian with conditional statements\n\nhunter_level = 7\n\nif hunter_level >= 5:\n    print("Guardian Defeated! Path Granted.")\nelse:\n    print("Access Denied! Train harder.")\n`,
    expectedKeywordOrOutput: "Guardian Defeated",
    solutionHint: "Use 'if hunter_level >= 5:' to evaluate conditional branching.",
    inventoryReward: {
      id: "crystal-boolean",
      name: "Boolean Guardian Crystal",
      description: "Pulsates with conditional truth values.",
      icon: "💎"
    }
  },
  {
    id: 4,
    slug: "dungeon-4",
    codexNumber: "Codex IV",
    codexTitle: "The Infinite Loop Abyss",
    dungeonName: "Dungeon IV: Infinite Loop Abyss",
    subtitle: "Control iteration and escape recurring cycles.",
    difficultyStars: 3,
    xpReward: 300,
    skillUnlock: "Loop Control & Iteration",
    bossName: "The Endless Serpent",
    description: "The ground crumbles into a void where time loops infinitely. You must deploy structured `for` and `while` loops to slice through the Endless Serpent.",
    missionObjective: "Iterate from 1 to 5 using `for i in range(1, 6):` and print each iteration strike against the Serpent.",
    initialCode: `# Codex IV - Infinite Loop Abyss\n# Mission: Execute 5 strikes against the Endless Serpent using range()\n\nfor strike in range(1, 6):\n    print(f"Striking Serpent... Hit #{strike}")\nprint("The Endless Serpent is slain!")\n`,
    expectedKeywordOrOutput: "slain",
    solutionHint: "range(1, 6) will produce numbers 1 through 5.",
    inventoryReward: {
      id: "loop-crystal",
      name: "Loop Crystal of Eternity",
      description: "Controls temporal recurrence and iterative logic.",
      icon: "🔄"
    }
  },
  {
    id: 5,
    slug: "dungeon-5",
    codexNumber: "Codex V",
    codexTitle: "The String Archives",
    dungeonName: "Dungeon V: Library of Strings",
    subtitle: "Manipulate text, slicing, formatting, and regular patterns.",
    difficultyStars: 3,
    xpReward: 350,
    skillUnlock: "String Manipulation & Formatting",
    description: "Thousands of corrupted scroll fragments float through the cosmic library. Reconstruct the encrypted runes using Python string methods.",
    missionObjective: "Format text using `.upper()`, `.strip()`, and f-strings.",
    initialCode: `# Codex V - Library of Strings\n# Mission: Cleanse and format corrupted archive text\n\nraw_scroll = "   nocturnal ascension   "\nclean_scroll = raw_scroll.strip().upper()\n\nprint(f"Restored Rune: {clean_scroll}")\n`,
    expectedKeywordOrOutput: "NOCTURNAL ASCENSION",
    solutionHint: "Chain .strip() to remove whitespace and .upper() to uppercase.",
    inventoryReward: {
      id: "scroll-strings",
      name: "Encrypted String Codex",
      description: "Contains ancient formatting formulas and regex spells.",
      icon: "📜"
    }
  },
  {
    id: 6,
    slug: "dungeon-6",
    codexNumber: "Codex VI",
    codexTitle: "The Collection Vault",
    dungeonName: "Dungeon VI: Collection Kingdom",
    subtitle: "Wield lists, tuples, sets, and key-value dictionaries.",
    difficultyStars: 3,
    xpReward: 400,
    skillUnlock: "Data Structures & Collections",
    bossName: "Collection Guardian",
    description: "The treasure room of the Digital Dungeon holds legendary weapons stored in arrays, sets, and dictionary caches.",
    missionObjective: "Create a dictionary `hunter_inventory` with key 'weapons' containing a list `['Shadow Dagger', 'Mana Staff']`.",
    initialCode: `# Codex VI - Collection Kingdom\n# Mission: Build inventory dictionary with key-value pairs\n\nhunter_inventory = {\n    "name": "Akhand",\n    "weapons": ["Shadow Dagger", "Mana Staff"],\n    "stats": {"str": 25, "int": 80}\n}\n\nprint("Primary Weapon:", hunter_inventory["weapons"][0])\n`,
    expectedKeywordOrOutput: "Shadow Dagger",
    solutionHint: "Access dictionary key 'weapons' and list index 0.",
    inventoryReward: {
      id: "vault-key",
      name: "Key of Collections",
      description: "Unlocks multidimensional data arrays and hash maps.",
      icon: "🗝️"
    }
  },
  {
    id: 7,
    slug: "dungeon-7",
    codexNumber: "Codex VII",
    codexTitle: "Function Forge",
    dungeonName: "Dungeon VII: Hall of Functions",
    subtitle: "Craft modular, reusable spells and return values.",
    difficultyStars: 4,
    xpReward: 450,
    skillUnlock: "Function Crafting & Modularization",
    description: "In the magical forge, spells are cast by invoking functions. Modularize your code so you can cast powerful incantations repeatedly.",
    missionObjective: "Define a function `cast_spell(spell_name, power)` that returns a formatted string and call it.",
    initialCode: `# Codex VII - Hall of Functions\n# Mission: Create and invoke a custom spell function\n\ndef cast_spell(spell_name, power):\n    return f"Casting {spell_name} with Power Level {power}!"\n\nresult = cast_spell("Shadow Flare", 9000)\nprint(result)\n`,
    expectedKeywordOrOutput: "Shadow Flare",
    solutionHint: "Use 'def' keyword to define functions and 'return' for output.",
    inventoryReward: {
      id: "scroll-func",
      name: "Function Crafting Scroll",
      description: "Grants the power to synthesize modular spell functions.",
      icon: "✨"
    }
  },
  {
    id: 8,
    slug: "dungeon-8",
    codexNumber: "Codex VIII",
    codexTitle: "Archive of Files",
    dungeonName: "Dungeon VIII: Archive of Memories",
    subtitle: "Persist knowledge with file I/O operations.",
    difficultyStars: 4,
    xpReward: 500,
    skillUnlock: "File I/O & Data Persistence",
    description: "The memory crystals of the System store records across time. Learn to open, read, write, and safely close file streams.",
    missionObjective: "Simulate file writing and reading using Python context managers (`with open(...)`).",
    initialCode: `# Codex VIII - Archive of Memories\n# Mission: Simulate saving and loading records\n\nrecord = "Log entry #001: Gate status stable."\n# Simulated file write & read\nprint(f"Saved Record: {record}")\nprint("System Memory Updated Successfully.")\n`,
    expectedKeywordOrOutput: "System Memory Updated",
    solutionHint: "Always use 'with open()' context managers for file operations.",
    inventoryReward: {
      id: "archive-key",
      name: "Chronos Memory Crystal",
      description: "Stores persistent records beyond system restarts.",
      icon: "💾"
    }
  },
  {
    id: 9,
    slug: "dungeon-9",
    codexNumber: "Codex IX",
    codexTitle: "The Object Foundry",
    dungeonName: "Dungeon IX: Tower of Classes",
    subtitle: "Master Object-Oriented Programming (OOP), inheritance & encapsulation.",
    difficultyStars: 4,
    xpReward: 600,
    skillUnlock: "Object-Oriented Programming (OOP)",
    description: "Ascend to the highest spire of the Tower. Here, true System Architects construct blueprints (classes) and instantiate living objects.",
    missionObjective: "Define a `Hunter` class with `__init__` constructor and a `stat_summary()` method.",
    initialCode: `# Codex IX - Tower of Classes\n# Mission: Define a Hunter class and instantiate an object\n\nclass Hunter:\n    def __init__(self, name, rank):\n        self.name = name\n        self.rank = rank\n        \n    def stat_summary(self):\n        return f"Architect {self.name} - {self.rank}"\n\nhunter1 = Hunter("Akhand", "S-Class Candidate")\nprint(hunter1.stat_summary())\n`,
    expectedKeywordOrOutput: "S-Class Candidate",
    solutionHint: "Remember to include 'self' as the first parameter of instance methods.",
    inventoryReward: {
      id: "foundry-blueprint",
      name: "System Architect Blueprint",
      description: "Blueprint for instantiating complex class entities.",
      icon: "🏛️"
    }
  },
  {
    id: 10,
    slug: "dungeon-10",
    codexNumber: "Codex X",
    codexTitle: "Observatory of Data",
    dungeonName: "Final Dungeon: Data Observatory",
    subtitle: "Analyze ancient dataset streams and defeat the Data Dragon.",
    difficultyStars: 5,
    xpReward: 800,
    skillUnlock: "Data Science & Analytical Visualization",
    bossName: "The Data Dragon",
    description: "The core of the Digital Dungeon exposes pure streams of high-dimensional data. Master analytics and visualization to slay the Data Dragon!",
    missionObjective: "Process a list of data points, calculate mean average, and visualize insights.",
    initialCode: `# Codex X - Data Observatory\n# Mission: Defeat the Data Dragon through data analytics\n\ndata_points = [120, 340, 560, 780, 990]\naverage_power = sum(data_points) / len(data_points)\n\nprint(f"Calculated Data Density: {average_power}")\nprint("CRITICAL HIT! The Data Dragon has been defeated!")\n`,
    expectedKeywordOrOutput: "Data Dragon has been defeated",
    solutionHint: "Use sum() and len() to compute analytical metrics.",
    inventoryReward: {
      id: "data-orb",
      name: "Data Analysis Orb",
      description: "Glowing celestial sphere visualizing real-time metrics.",
      icon: "🔮"
    }
  }
];

export const SKILL_NODES: SkillNode[] = [
  { id: "s1", name: "Variables & Types", dungeonIdRequired: 1, unlocked: false, icon: "📦", description: "Declare, store, and mutate primitive values." },
  { id: "s2", name: "Operator Mastery", dungeonIdRequired: 2, unlocked: false, icon: "⚡", description: "Arithmetic, comparison, and bitwise evaluation." },
  { id: "s3", name: "Conditional Logic", dungeonIdRequired: 3, unlocked: false, icon: "🔀", description: "Branching control flow with if/elif/else." },
  { id: "s4", name: "Loop Control", dungeonIdRequired: 4, unlocked: false, icon: "🔄", description: "Iteration loops, break, and continue mechanics." },
  { id: "s5", name: "String Archives", dungeonIdRequired: 5, unlocked: false, icon: "🔤", description: "Slicing, formatting, f-strings, and string methods." },
  { id: "s6", name: "Data Vaults", dungeonIdRequired: 6, unlocked: false, icon: "🗄️", description: "Lists, dictionaries, sets, and tuples." },
  { id: "s7", name: "Function Crafting", dungeonIdRequired: 7, unlocked: false, icon: "⚙️", description: "Modular code, parameters, returns, & lambdas." },
  { id: "s8", name: "File Persistence", dungeonIdRequired: 8, unlocked: false, icon: "📁", description: "File I/O operations and context managers." },
  { id: "s9", name: "Object Foundry (OOP)", dungeonIdRequired: 9, unlocked: false, icon: "🏰", description: "Classes, objects, inheritance, & polymorphism." },
  { id: "s10", name: "Data Science Mastery", dungeonIdRequired: 10, unlocked: false, icon: "📊", description: "High-dimensional data analysis & visualization." }
];

export const QUESTS: Quest[] = [
  {
    id: "q1",
    title: "Daily Quest: Enter the Gate",
    category: "Daily",
    description: "Complete Dungeon I or any active dungeon mission today.",
    rewardXp: 150,
    rewardStat: "+10 Coding"
  },
  {
    id: "q2",
    title: "Secondary Quest: Zero Syntax Errors",
    category: "Secondary",
    description: "Run Python code in the terminal simulator with perfect execution.",
    rewardXp: 100,
    rewardStat: "+15 Intelligence"
  },
  {
    id: "q3",
    title: "Bonus Quest: Explain the Logic",
    category: "Bonus",
    description: "Review the code hint and predict the output before executing.",
    rewardXp: 200,
    rewardStat: "+5 Strength, +10 Creativity"
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: "ach-1", title: "First Blood", description: "Ran your first Python program in the System.", icon: "⚔️", unlocked: false },
  { id: "ach-2", title: "Loop Master", description: "Conquered the Infinite Loop Abyss.", icon: "🌀", unlocked: false },
  { id: "ach-3", title: "Data Alchemist", description: "Manipulated collections and arrays in Dungeon VI.", icon: "🧪", unlocked: false },
  { id: "ach-4", title: "Class Architect", description: "Built your first class in the Object Foundry.", icon: "🏛️", unlocked: false },
  { id: "ach-5", title: "Shadow Programmer", description: "Completed all 10 Dungeons and achieved S-Class Rank.", icon: "👑", unlocked: false }
];
