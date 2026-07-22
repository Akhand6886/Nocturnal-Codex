export interface PracticeTask {
  id: string;
  title: string;
  question: string;
  explanation: string;
  formula?: string;
  codeSnippet: string;
  expectedOutput: string;
}

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
  theoryNotes: string[];
  tasks: PracticeTask[];
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
  category: 'Daily' | 'Secondary' | 'Bonus' | 'Weekly';
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
    codexTitle: "Origin of Variables & Scripting",
    dungeonName: "Dungeon I: The Beginner's Cave",
    subtitle: "Master environment setup, script mode vs interactive mode, variables, and string formatting.",
    difficultyStars: 1,
    xpReward: 100,
    skillUnlock: "Variables & Memory Allocation",
    description: "You awaken in an ancient stone cavern glowing with digital glyphs. The System initialization ritual requires instantiating Hunter parameters, memory references, and formatting identity strings.",
    missionObjective: "Declare variables `hunter_name` with string value 'Akhand' and `hunter_rank` with 'E-Rank', then print formatted Hunter parameters.",
    initialCode: `# Codex I - The Beginner's Cave\n# Mission: Declare hunter_name and hunter_rank, then print them\n\nhunter_name = "Akhand"\nhunter_rank = "E-Rank"\nsap_id = "500069944"\n\nprint("Hunter Name:", hunter_name)\nprint("Rank:", hunter_rank)\nprint("System SAP ID:", sap_id)\n`,
    expectedKeywordOrOutput: "Akhand",
    solutionHint: "Use print(hunter_name) to output the Hunter's identity to the System.",
    theoryNotes: [
      "Interactive Mode runs one statement at a time with immediate output evaluation.",
      "Scripting Mode executes saved .py code files for complex multi-line logic.",
      "Variables in Python are dynamic references to objects in memory; explicit type declaration is not required.",
      "f-strings (formatted string literals) allow seamless variable interpolation: f'{first_name} ({nickname}) {last_name}'"
    ],
    tasks: [
      {
        id: "d1-t1",
        title: "Task 1: System Version Verification",
        question: "Install Python and output the current system version.",
        explanation: "The `sys` module exposes system-specific parameters and functions, including the Python interpreter version.",
        codeSnippet: `import sys\nprint("Python is installed.")\nprint("Version:", sys.version)`,
        expectedOutput: "Python is installed.\nVersion: 3.13.2"
      },
      {
        id: "d1-t2",
        title: "Task 2: Multi-line String Formatting",
        question: "Print formatted strings with line breaks and escape sequences.",
        explanation: "Escape sequences like \\n create newlines, while \\0 creates octal escapes.",
        codeSnippet: `print("Hello Everyone !!!")\nprint("Hello\\nWorld")\nprint("Rohit's date of birth is 12\\\\05\\\\1999")`,
        expectedOutput: "Hello Everyone !!!\nHello\nWorld\nRohit's date of birth is 12\\05\\1999"
      },
      {
        id: "d1-t3",
        title: "Task 3: Dynamic Data Types & Concatenation",
        question: "Declare integer, float, boolean, and string variables, then concatenate first and last name.",
        explanation: "Variables can hold primitive types (int, float, str, bool) and compound structures (lists). Strings concatenate using the + operator.",
        codeSnippet: `a = "Rohit"\nb = "Sharma"\nfull_name = a + " " + b\nprint("Full Name:", full_name)`,
        expectedOutput: "Full Name: Rohit Sharma"
      },
      {
        id: "d1-t4",
        title: "Task 4: Formatted Identity Glyph",
        question: "Print Hunter registration card: Name, SAP ID, Programme, and Semester.",
        explanation: "Using structured print calls to produce an formatted report layout.",
        codeSnippet: `name = "AKHAND PRATAP"\nsap_id = "500069944"\nprogramme = "AI & System Programming"\nsemester = 2\n\nprint("NAME:", name)\nprint("SAP ID:", sap_id)\nprint("Programme:", programme)\nprint("Semester:", semester)`,
        expectedOutput: "NAME: AKHAND PRATAP\nSAP ID: 500069944"
      }
    ],
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
    subtitle: "Harness arithmetic, input statements, geometric formulas, and bitwise logic.",
    difficultyStars: 2,
    xpReward: 200,
    skillUnlock: "Operator & Formula Mastery",
    description: "Heavy stone doors block the sanctuary. Only precise mathematical operations, Heron's formula, hypotenuse calculations, and bitwise logic can align the energy seals.",
    missionObjective: "Calculate total mana by evaluating `(100 + 50) * 2` and hypotenuse of right triangle `sqrt(3^2 + 4^2)`.",
    initialCode: `# Codex II - Temple of Operators\n# Mission: Calculate total_mana = (100 + 50) * 2 and hypotenuse\nimport math\n\nbase_mana = 100\nbonus_mana = 50\ntotal_mana = (base_mana + bonus_mana) * 2\n\na, b = 3, 4\nhypotenuse = math.sqrt(a**2 + b**2)\n\nprint("Total Mana:", total_mana)\nprint("Calculated Hypotenuse:", hypotenuse)\n`,
    expectedKeywordOrOutput: "300",
    solutionHint: "Use math.sqrt(a**2 + b**2) for hypotenuse and group precedence using parentheses.",
    theoryNotes: [
      "Arithmetic operators: +, -, *, /, // (floor division), % (modulus), ** (exponentiation).",
      "Bitwise operators (&, |, ^, ~, <<, >>) act directly on binary representations of integers.",
      "Pythagoras Theorem: Hypotenuse c = sqrt(a^2 + b^2)",
      "Heron's Formula for triangle area: s = (a+b+c)/2, Area = sqrt(s*(s-a)*(s-b)*(s-c))",
      "Simple Interest formula: SI = (P * R * T) / 100",
      "Swapping variables without temporary variable: a, b = b, a or arithmetic a = a + b; b = a - b; a = a - b"
    ],
    tasks: [
      {
        id: "d2-t1",
        title: "Task 1: Circle Area Formula",
        question: "Compute circle area given radius = 5.5.",
        explanation: "Area of a circle is computed using formula: area = pi * r^2",
        formula: "Area = π × r²",
        codeSnippet: `import math\nradius = 5.5\narea = math.pi * (radius ** 2)\nprint("Area of circle:", round(area, 4))`,
        expectedOutput: "Area of circle: 95.0332"
      },
      {
        id: "d2-t2",
        title: "Task 2: Pythagoras Hypotenuse",
        question: "Find the hypotenuse c of a right triangle with legs a = 3 and b = 4.",
        explanation: "Pythagoras theorem calculates hypotenuse c = sqrt(a^2 + b^2).",
        formula: "c = √(a² + b²)",
        codeSnippet: `import math\na, b = 3, 4\nc = math.sqrt(a**2 + b**2)\nprint("Hypotenuse:", c)`,
        expectedOutput: "Hypotenuse: 5.0"
      },
      {
        id: "d2-t3",
        title: "Task 3: Simple Interest & Heron's Formula",
        question: "Compute simple interest for P=10000, R=8, T=2 and area of triangle (sides 3, 4, 5).",
        explanation: "SI = (P*R*T)/100. Heron's formula uses semi-perimeter s = (a+b+c)/2.",
        formula: "SI = (P×R×T)/100 | Area = √(s(s-a)(s-b)(s-c))",
        codeSnippet: `import math\n# Simple Interest\nP, R, T = 10000, 8, 2\nsi = (P * R * T) / 100\nprint("Simple Interest:", si)\n\n# Heron's Formula\na, b, c = 3, 4, 5\ns = (a + b + c) / 2\narea = math.sqrt(s * (s - a) * (s - b) * (s - c))\nprint("Heron's Area:", area)`,
        expectedOutput: "Simple Interest: 1600.0\nHeron's Area: 6.0"
      },
      {
        id: "d2-t4",
        title: "Task 4: Time Conversion & Bitwise Shift",
        question: "Convert 7384 seconds into hours, minutes, seconds, and display bitwise shifts.",
        explanation: "Floor division // gives hours, modulus % gives remaining seconds. Left shift << multiplies by 2^n.",
        codeSnippet: `seconds = 7384\nhours = seconds // 3600\nminutes = (seconds % 3600) // 60\nrem_sec = seconds % 60\nprint(f"{hours}h {minutes}m {rem_sec}s")\n\nnum = 10\nprint("Bitwise Left Shift (10 << 2):", num << 2)`,
        expectedOutput: "2h 3m 4s\nBitwise Left Shift (10 << 2): 40"
      }
    ],
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
    subtitle: "Navigate branching paths governed by conditions, quadratic roots, and leap years.",
    difficultyStars: 2,
    xpReward: 250,
    skillUnlock: "Conditional Control Flow",
    bossName: "The Boolean Guardian",
    description: "Mist shrouds the dense forest. The Boolean Guardian stands before you, evaluating every step: TRUE allows passage, FALSE triggers a trap.",
    missionObjective: "Check if `num` is divisible by both 3 and 5, evaluate quadratic roots, and grant passage if `hunter_level >= 5`.",
    initialCode: `# Codex III - Forest of Decisions\n# Mission: Defeat Boolean Guardian with conditional logic\n\nhunter_level = 7\nmana_power = 45\n\nif mana_power % 3 == 0 and mana_power % 5 == 0:\n    print("Mana Power is divisible by both 3 and 5!")\n\nif hunter_level >= 5:\n    print("Guardian Defeated! Path Granted.")\nelse:\n    print("Access Denied!")\n`,
    expectedKeywordOrOutput: "Guardian Defeated",
    solutionHint: "Use 'if num % 3 == 0 and num % 5 == 0:' to check double divisibility.",
    theoryNotes: [
      "Boolean logic operators: `and`, `or`, `not`.",
      "Conditional structure: `if condition: ... elif condition: ... else: ...`",
      "Leap year condition: (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)",
      "Quadratic Discriminant: D = b^2 - 4ac. If D > 0 real distinct roots; D == 0 equal roots; D < 0 complex roots."
    ],
    tasks: [
      {
        id: "d3-t1",
        title: "Task 1: Divisibility Check (3 and 5)",
        question: "Determine whether a number is divisible by both 3 and 5.",
        explanation: "Use logical AND operator to combine two modulo zero checks.",
        codeSnippet: `num = 45\nif num % 3 == 0 and num % 5 == 0:\n    print(f"{num} is divisible by both 3 and 5.")\nelse:\n    print(f"{num} is not divisible by both.")`,
        expectedOutput: "45 is divisible by both 3 and 5."
      },
      {
        id: "d3-t2",
        title: "Task 2: Leap Year Evaluator",
        question: "Check whether a given year is a leap year.",
        explanation: "A year is leap if divisible by 4 but not 100, unless also divisible by 400.",
        codeSnippet: `year = 2024\nis_leap = (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)\nprint(f"Year {year} is Leap Year:", is_leap)`,
        expectedOutput: "Year 2024 is Leap Year: True"
      },
      {
        id: "d3-t3",
        title: "Task 3: Quadratic Equation Roots",
        question: "Find the roots of ax^2 + bx + c = 0.",
        explanation: "Calculate discriminant D = b^2 - 4ac and use quadratic formula x = (-b ± sqrt(D)) / (2a).",
        formula: "x = (-b ± √(b² - 4ac)) / (2a)",
        codeSnippet: `import cmath\na, b, c = 1, -5, 6\nd = (b**2) - (4*a*c)\nr1 = (-b - cmath.sqrt(d))/(2*a)\nr2 = (-b + cmath.sqrt(d))/(2*a)\nprint(f"Roots: {r1.real:.1f} and {r2.real:.1f}")`,
        expectedOutput: "Roots: 2.0 and 3.0"
      }
    ],
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
    subtitle: "Control iteration, prime checks, Fibonacci sequences, and slaying loop anomalies.",
    difficultyStars: 3,
    xpReward: 300,
    skillUnlock: "Loop Control & Iteration",
    bossName: "The Endless Serpent",
    description: "The ground crumbles into a void where time loops infinitely. You must deploy structured `for` and `while` loops, prime checks, and Fibonacci series to slice through the Endless Serpent.",
    missionObjective: "Iterate from 1 to 5 using `range()`, compute factorial of 5, and print strike against the Serpent.",
    initialCode: `# Codex IV - Infinite Loop Abyss\n# Mission: Execute 5 strikes and calculate factorial\nimport math\n\nfor strike in range(1, 6):\n    print(f"Striking Serpent... Hit #{strike}")\n\nfact = math.factorial(5)\nprint("Factorial of 5:", fact)\nprint("The Endless Serpent is slain!")\n`,
    expectedKeywordOrOutput: "slain",
    solutionHint: "range(1, 6) will produce numbers 1 through 5.",
    theoryNotes: [
      "`for` loops iterate over sequences (lists, tuples, ranges, strings).",
      "`while` loops execute as long as a condition evaluates to True.",
      "Loop control statements: `break` exits loop immediately; `continue` skips to next iteration.",
      "Prime number definition: An integer n > 1 with no positive divisors other than 1 and itself.",
      "Fibonacci Sequence: F(0)=0, F(1)=1, F(n) = F(n-1) + F(n-2)"
    ],
    tasks: [
      {
        id: "d4-t1",
        title: "Task 1: Prime Number Verification",
        question: "Check if a given number is prime.",
        explanation: "Loop from 2 to sqrt(n). If any number divides n evenly, n is not prime.",
        codeSnippet: `num = 29\nis_prime = True\nif num < 2:\n    is_prime = False\nelse:\n    for i in range(2, int(num**0.5) + 1):\n        if num % i == 0:\n            is_prime = False\n            break\nprint(f"Is {num} prime?", is_prime)`,
        expectedOutput: "Is 29 prime? True"
      },
      {
        id: "d4-t2",
        title: "Task 2: Fibonacci Sequence Generator",
        question: "Generate the first 8 terms of the Fibonacci sequence.",
        explanation: "Start with a=0, b=1, and repeatedly update a, b = b, a + b.",
        codeSnippet: `n_terms = 8\na, b = 0, 1\nfib_series = []\nfor _ in range(n_terms):\n    fib_series.append(a)\n    a, b = b, a + b\nprint("Fibonacci Series:", fib_series)`,
        expectedOutput: "Fibonacci Series: [0, 1, 1, 2, 3, 5, 8, 13]"
      },
      {
        id: "d4-t3",
        title: "Task 3: Palindrome Number Test",
        question: "Check if an integer is a palindrome (e.g., 12321).",
        explanation: "Compare the string representation of the number with its reverse `str(n)[::-1]`.",
        codeSnippet: `num = 12321\ns_num = str(num)\nis_palindrome = s_num == s_num[::-1]\nprint(f"Is {num} palindrome?", is_palindrome)`,
        expectedOutput: "Is 12321 palindrome? True"
      }
    ],
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
    subtitle: "Manipulate text, slicing, formatting, anagram checks, and set operations.",
    difficultyStars: 3,
    xpReward: 350,
    skillUnlock: "String Manipulation & Formatting",
    description: "Thousands of corrupted scroll fragments float through the cosmic library. Reconstruct the encrypted runes using string slicing, vowel counting, and set operations.",
    missionObjective: "Format text using `.upper()`, `.strip()`, count vowels, and test anagram strings.",
    initialCode: `# Codex V - Library of Strings\n# Mission: Cleanse text and count vowels\n\nraw_scroll = "   nocturnal ascension   "\nclean_scroll = raw_scroll.strip().upper()\n\nvowels = "AEIOU"\nvowel_count = sum(1 for char in clean_scroll if char in vowels)\n\nprint(f"Restored Rune: {clean_scroll}")\nprint(f"Vowel Count: {vowel_count}")\n`,
    expectedKeywordOrOutput: "NOCTURNAL ASCENSION",
    solutionHint: "Chain .strip() to remove whitespace and .upper() to uppercase.",
    theoryNotes: [
      "Strings are immutable sequences of Unicode characters.",
      "String slicing syntax: `string[start:stop:step]`",
      "Useful methods: `.strip()`, `.upper()`, `.lower()`, `.replace()`, `.split()`, `.join()`",
      "Sets store unique, unordered elements. Set operations: union `|`, intersection `&`, difference `-`."
    ],
    tasks: [
      {
        id: "d5-t1",
        title: "Task 1: Anagram Verification",
        question: "Determine whether two strings are anagrams (e.g. 'listen' and 'silent').",
        explanation: "Two strings are anagrams if sorting their characters yields identical lists.",
        codeSnippet: `s1 = "listen"\ns2 = "silent"\nis_anagram = sorted(s1.lower()) == sorted(s2.lower())\nprint(f"Are '{s1}' and '{s2}' anagrams?", is_anagram)`,
        expectedOutput: "Are 'listen' and 'silent' anagrams? True"
      },
      {
        id: "d5-t2",
        title: "Task 2: Set Union & Intersection",
        question: "Perform set union, intersection, and difference between two Hunter skill sets.",
        explanation: "Set operations remove duplicates and compute mathematical set relationships.",
        codeSnippet: `set_a = {"Python", "SQL", "HTML"}\nset_b = {"Python", "C++", "Java"}\n\nprint("Union:", set_a | set_b)\nprint("Intersection:", set_a & set_b)\nprint("Difference (A - B):", set_a - set_b)`,
        expectedOutput: "Union: {'Python', 'SQL', 'HTML', 'C++', 'Java'}\nIntersection: {'Python'}"
      }
    ],
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
    theoryNotes: [
      "Lists: Ordered, mutable collections `[1, 2, 3]`.",
      "Tuples: Ordered, immutable sequences `(1, 2, 3)`.",
      "Dictionaries: Key-value hash maps `{'key': 'value'}` providing O(1) lookup times.",
      "Frequency counters: Using dictionaries to count element frequencies in O(N) time."
    ],
    tasks: [
      {
        id: "d6-t1",
        title: "Task 1: Character Frequency Counter",
        question: "Count the frequency of each character in string 'NOCTURNAL'.",
        explanation: "Iterate over characters and increment dictionary keys.",
        codeSnippet: `word = "NOCTURNAL"\nfreq = {}\nfor char in word:\n    freq[char] = freq.get(char, 0) + 1\nprint("Character Frequency:", freq)`,
        expectedOutput: "Character Frequency: {'N': 2, 'O': 1, 'C': 1, 'T': 1, 'U': 1, 'R': 1, 'A': 1, 'L': 1}"
      },
      {
        id: "d6-t2",
        title: "Task 2: Tuple Packing & Unpacking",
        question: "Pack Hunter coordinates into a tuple and unpack them.",
        explanation: "Tuples support parallel assignment / unpacking: x, y, z = coords.",
        codeSnippet: `coords = (105.4, 402.8, 88.0)\nx, y, z = coords\nprint(f"Latitude: {x}, Longitude: {y}, Altitude: {z}")`,
        expectedOutput: "Latitude: 105.4, Longitude: 402.8, Altitude: 88.0"
      }
    ],
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
    subtitle: "Craft modular, reusable spells, recursion, and lambda functions.",
    difficultyStars: 4,
    xpReward: 450,
    skillUnlock: "Function Crafting & Modularization",
    description: "In the magical forge, spells are cast by invoking functions. Modularize your code so you can cast powerful incantations repeatedly.",
    missionObjective: "Define a function `cast_spell(spell_name, power)` that returns a formatted string and call it.",
    initialCode: `# Codex VII - Hall of Functions\n# Mission: Create and invoke a custom spell function\n\ndef cast_spell(spell_name, power):\n    return f"Casting {spell_name} with Power Level {power}!"\n\nresult = cast_spell("Shadow Flare", 9000)\nprint(result)\n`,
    expectedKeywordOrOutput: "Shadow Flare",
    solutionHint: "Use 'def' keyword to define functions and 'return' for output.",
    theoryNotes: [
      "Functions encapsulate logic for reuse and modular design.",
      "Recursion: A function calling itself with a base case to terminate execution.",
      "Lambda functions: Anonymous one-line functions `lambda x, y: x + y`."
    ],
    tasks: [
      {
        id: "d7-t1",
        title: "Task 1: Recursive Factorial",
        question: "Compute factorial of n using a recursive function.",
        explanation: "Base case: n <= 1 returns 1. Recursive case: returns n * factorial(n - 1).",
        codeSnippet: `def recursive_factorial(n):\n    if n <= 1:\n        return 1\n    return n * recursive_factorial(n - 1)\n\nprint("5! =", recursive_factorial(5))`,
        expectedOutput: "5! = 120"
      },
      {
        id: "d7-t2",
        title: "Task 2: Lambda Filter & Map",
        question: "Filter even numbers and square them using lambdas.",
        explanation: "Use `filter()` with lambda x: x % 2 == 0 and `map()` with lambda x: x**2.",
        codeSnippet: `nums = [1, 2, 3, 4, 5, 6]\nevens_squared = list(map(lambda x: x**2, filter(lambda x: x % 2 == 0, nums)))\nprint("Evens Squared:", evens_squared)`,
        expectedOutput: "Evens Squared: [4, 16, 36]"
      }
    ],
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
    subtitle: "Persist knowledge with file I/O operations and exception handling.",
    difficultyStars: 4,
    xpReward: 500,
    skillUnlock: "File I/O & Exception Persistence",
    description: "The memory crystals of the System store records across time. Learn to open, read, write, and safely handle exceptions using try-except blocks.",
    missionObjective: "Simulate file writing, reading, and exception handling using Python context managers (`with open(...)`).",
    initialCode: `# Codex VIII - Archive of Memories\n# Mission: Simulate saving, loading records and handling exceptions\n\ntry:\n    record = "Log entry #001: Gate status stable."\n    print(f"Saved Record: {record}")\n    print("System Memory Updated Successfully.")\nexcept Exception as e:\n    print("File Error:", e)\n`,
    expectedKeywordOrOutput: "System Memory Updated",
    solutionHint: "Always use 'with open()' context managers and try-except blocks.",
    theoryNotes: [
      "File modes: `'r'` (read), `'w'` (write/overwrite), `'a'` (append), `'b'` (binary).",
      "Context manager `with open(...) as f:` automatically closes file streams upon block exit.",
      "Exception handling: `try: ... except ExceptionType as e: ... finally: ...` prevents crashes."
    ],
    tasks: [
      {
        id: "d8-t1",
        title: "Task 1: Safe Division with Try-Except",
        question: "Safely divide two numbers handling ZeroDivisionError.",
        explanation: "Catch ZeroDivisionError and return a clean error message without terminating execution.",
        codeSnippet: `def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "Error: Cannot divide by zero!"\n\nprint("10 / 2 =", safe_divide(10, 2))\nprint("10 / 0 =", safe_divide(10, 0))`,
        expectedOutput: "10 / 2 = 5.0\n10 / 0 = Error: Cannot divide by zero!"
      }
    ],
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
    theoryNotes: [
      "Classes are blueprints for creating objects with attributes (data) and methods (behavior).",
      "The `__init__` method initializes newly created instances.",
      "Inheritance allows a subclass to inherit attributes and methods from a parent class.",
      "Polymorphism allows subclasses to override methods for specific behavior."
    ],
    tasks: [
      {
        id: "d9-t1",
        title: "Task 1: Inheritance & Method Overriding",
        question: "Create a ShadowHunter subclass extending base Hunter class.",
        explanation: "Use super().__init__() to invoke parent constructor and override methods.",
        codeSnippet: `class Hunter:\n    def __init__(self, name):\n        self.name = name\n    def attack(self):\n        return "Basic Strike"\n\nclass ShadowHunter(Hunter):\n    def attack(self):\n        return f"{self.name} casts Shadow Extraction!"\n\nh1 = ShadowHunter("Akhand")\nprint(h1.attack())`,
        expectedOutput: "Akhand casts Shadow Extraction!"
      }
    ],
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
    description: "The core of the Digital Dungeon exposes pure streams of high-dimensional data. Master analytics, statistical averages, and visualization to slay the Data Dragon!",
    missionObjective: "Process a list of data points, calculate mean average, and visualize insights.",
    initialCode: `# Codex X - Data Observatory\n# Mission: Defeat the Data Dragon through data analytics\n\ndata_points = [120, 340, 560, 780, 990]\naverage_power = sum(data_points) / len(data_points)\n\nprint(f"Calculated Data Density: {average_power}")\nprint("CRITICAL HIT! The Data Dragon has been defeated!")\n`,
    expectedKeywordOrOutput: "Data Dragon has been defeated",
    solutionHint: "Use sum() and len() to compute analytical metrics.",
    theoryNotes: [
      "Data analysis relies on statistical aggregates: mean (average), median (middle value), and standard deviation.",
      "List comprehensions provide efficient data transformation pipelines: `[x*2 for x in data]`.",
      "Data visualization represents numerical distributions visually to reveal hidden patterns."
    ],
    tasks: [
      {
        id: "d10-t1",
        title: "Task 1: Statistical Aggregate Analysis",
        question: "Calculate mean and max from a dataset.",
        explanation: "Compute sum(data) / len(data) for mean average and max(data) for peak.",
        codeSnippet: `dataset = [88, 92, 79, 95, 100, 84]\nmean_val = sum(dataset) / len(dataset)\nmax_val = max(dataset)\nprint(f"Mean Score: {mean_val:.2f}, Peak Score: {max_val}")`,
        expectedOutput: "Mean Score: 89.67, Peak Score: 100"
      }
    ],
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
  { id: "s2", name: "Operator Mastery", dungeonIdRequired: 2, unlocked: false, icon: "⚡", description: "Arithmetic, comparison, Heron's formula & bitwise logic." },
  { id: "s3", name: "Conditional Logic", dungeonIdRequired: 3, unlocked: false, icon: "🔀", description: "Branching control flow, quadratic roots & leap years." },
  { id: "s4", name: "Loop Control", dungeonIdRequired: 4, unlocked: false, icon: "🔄", description: "Iteration loops, primes, Fibonacci & palindrome numbers." },
  { id: "s5", name: "String Archives", dungeonIdRequired: 5, unlocked: false, icon: "🔤", description: "Slicing, formatting, anagram checks & set operations." },
  { id: "s6", name: "Data Vaults", dungeonIdRequired: 6, unlocked: false, icon: "🗄️", description: "Lists, dictionaries, frequency counters & tuples." },
  { id: "s7", name: "Function Crafting", dungeonIdRequired: 7, unlocked: false, icon: "⚙️", description: "Modular code, recursion, lambdas & parameter mapping." },
  { id: "s8", name: "File Persistence", dungeonIdRequired: 8, unlocked: false, icon: "📁", description: "File I/O operations & try-except exception handling." },
  { id: "s9", name: "Object Foundry (OOP)", dungeonIdRequired: 9, unlocked: false, icon: "🏰", description: "Classes, objects, inheritance, & polymorphism." },
  { id: "s10", name: "Data Science Mastery", dungeonIdRequired: 10, unlocked: false, icon: "📊", description: "High-dimensional data analysis & statistical metrics." }
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
  },
  {
    id: "q4",
    title: "Weekly Quest: Lab Workbook Conqueror",
    category: "Weekly",
    description: "Execute and verify practice tasks across 5 different Dungeons.",
    rewardXp: 350,
    rewardStat: "+30 Coding, +20 Intelligence"
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: "ach-1", title: "First Blood", description: "Ran your first Python program in the System.", icon: "⚔️", unlocked: false },
  { id: "ach-2", title: "Loop Master", description: "Conquered the Infinite Loop Abyss.", icon: "🌀", unlocked: false },
  { id: "ach-3", title: "Data Alchemist", description: "Manipulated collections and arrays in Dungeon VI.", icon: "🧪", unlocked: false },
  { id: "ach-4", title: "Class Architect", description: "Built your first class in the Object Foundry.", icon: "🏛️", unlocked: false },
  { id: "ach-5", title: "Shadow Programmer", description: "Completed all 10 Dungeons and achieved S-Class Rank.", icon: "👑", unlocked: false }
];
