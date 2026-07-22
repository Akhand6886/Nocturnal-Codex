import json, re

with open("docs/assingement.ipynb") as f:
    nb = json.load(f)

cells = nb["cells"]

dungeons_meta = [
    {
        "id": 1,
        "slug": "dungeon-1",
        "codexNumber": "Codex I",
        "codexTitle": "Origin of Variables & Scripting",
        "dungeonName": "Dungeon I: The Beginner's Cave",
        "subtitle": "Master Python installation, IDLE, print statements, variables, and formatting.",
        "difficultyStars": 1,
        "xpReward": 100,
        "skillUnlock": "Variables & Memory Allocation",
        "description": "You awaken in an ancient stone cavern glowing with digital glyphs. The System initialization ritual requires instantiating Hunter parameters, memory references, and formatting identity strings.",
        "missionObjective": "Declare variables hunter_name and hunter_rank, then format identity output.",
        "initialCode": "import sys\n\nhunter_name = \"Akhand\"\nhunter_rank = \"E-Rank\"\nsap_id = \"500069944\"\n\nprint(\"Python Version:\", sys.version)\nprint(f\"Hunter Name: {hunter_name}\")\nprint(f\"Rank: {hunter_rank}\")\nprint(f\"SAP ID: {sap_id}\")\n",
        "expectedKeywordOrOutput": "Akhand",
        "solutionHint": "Use print(hunter_name) to output the Hunter's identity to the System.",
        "theoryNotes": [
            "Interactive mode runs one statement at a time and shows immediate output.",
            "Scripting mode runs saved .py files, useful for larger programs and reuse.",
            "Variables in Python are dynamic references to objects in memory.",
            "f-strings (formatted string literals) allow seamless variable interpolation: f'{first_name} ({nickname}) {last_name}'"
        ],
        "inventoryReward": {
            "id": "scroll-vars",
            "name": "Python Variables Scroll",
            "description": "An ancient parchment detailing variable scope and memory references.",
            "icon": "📜"
        }
    },
    {
        "id": 2,
        "slug": "dungeon-2",
        "codexNumber": "Codex II",
        "codexTitle": "The Operator's Temple",
        "dungeonName": "Dungeon II: Temple of Operators",
        "subtitle": "Harness input statements, arithmetic, bitwise logic, and geometric formulas.",
        "difficultyStars": 2,
        "xpReward": 200,
        "skillUnlock": "Operator & Formula Mastery",
        "description": "Heavy stone doors block the sanctuary. Only precise mathematical operations, Heron's formula, hypotenuse calculations, and bitwise logic can align the energy seals.",
        "missionObjective": "Compute area of circle, hypotenuse of right triangle, simple interest, and bitwise shift operators.",
        "initialCode": "import math\n\n# Circle Area\nradius = 5.5\narea = math.pi * radius ** 2\nprint(\"Area of circle:\", area)\n\n# Hypotenuse\na, b = 3, 4\nc = math.sqrt(a**2 + b**2)\nprint(\"Hypotenuse:\", c)\n",
        "expectedKeywordOrOutput": "95.033",
        "solutionHint": "Use math.pi * radius**2 for circle area and math.sqrt() for hypotenuse.",
        "theoryNotes": [
            "Arithmetic operators: +, -, *, /, // (floor division), % (modulus), ** (exponentiation).",
            "Bitwise operators (&, |, ^, ~, <<, >>) act directly on binary representations of integers.",
            "Pythagoras Theorem: Hypotenuse c = sqrt(a^2 + b^2)",
            "Heron's Formula for triangle area: s = (a+b+c)/2, Area = sqrt(s*(s-a)*(s-b)*(s-c))",
            "Simple Interest formula: SI = (P * R * T) / 100",
            "Swapping variables without temporary variable: a, b = b, a or arithmetic a = a + b; b = a - b; a = a - b"
        ],
        "inventoryReward": {
            "id": "rune-operators",
            "name": "Operator Rune of Power",
            "description": "Emits a faint glow of logical energy (+15 Intelligence).",
            "icon": "⚡"
        }
    },
    {
        "id": 3,
        "slug": "dungeon-3",
        "codexNumber": "Codex III",
        "codexTitle": "Logic and Decisions",
        "dungeonName": "Dungeon III: Forest of Decisions",
        "subtitle": "Navigate branching paths governed by conditions, quadratic roots, and leap years.",
        "difficultyStars": 2,
        "xpReward": 250,
        "skillUnlock": "Conditional Control Flow",
        "bossName": "The Boolean Guardian",
        "description": "Mist shrouds the dense forest. The Boolean Guardian stands before you, evaluating every step: TRUE allows passage, FALSE triggers a trap.",
        "missionObjective": "Check if number is divisible by 3 and 5, calculate leap year, and evaluate quadratic roots.",
        "initialCode": "num = 45\nif num % 3 == 0 and num % 5 == 0:\n    print(f\"{num} is divisible by both 3 and 5.\")\n\nyear = 2024\nis_leap = (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)\nprint(\"Is 2024 Leap Year?\", is_leap)\n",
        "expectedKeywordOrOutput": "divisible by both",
        "solutionHint": "Use 'if num % 3 == 0 and num % 5 == 0:' for double divisibility.",
        "theoryNotes": [
            "Boolean logic operators: and, or, not.",
            "Conditional structure: if condition: ... elif condition: ... else: ...",
            "Leap year condition: (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)",
            "Quadratic Discriminant: D = b^2 - 4ac. If D > 0 real distinct roots; D == 0 equal roots; D < 0 complex roots."
        ],
        "inventoryReward": {
            "id": "crystal-boolean",
            "name": "Boolean Guardian Crystal",
            "description": "Pulsates with conditional truth values.",
            "icon": "💎"
        }
    },
    {
        "id": 4,
        "slug": "dungeon-4",
        "codexNumber": "Codex IV",
        "codexTitle": "The Infinite Loop Abyss",
        "dungeonName": "Dungeon IV: Infinite Loop Abyss",
        "subtitle": "Control iteration, prime checks, Fibonacci sequences, and slaying loop anomalies.",
        "difficultyStars": 3,
        "xpReward": 300,
        "skillUnlock": "Loop Control & Iteration",
        "bossName": "The Endless Serpent",
        "description": "The ground crumbles into a void where time loops infinitely. You must deploy structured for and while loops, prime checks, and Fibonacci series to slice through the Endless Serpent.",
        "missionObjective": "Iterate using range(), generate Fibonacci series, and verify prime numbers.",
        "initialCode": "num = 29\nis_prime = True\nfor i in range(2, int(num**0.5) + 1):\n    if num % i == 0:\n        is_prime = False\n        break\nprint(f\"Is {num} prime?\", is_prime)\n\na, b = 0, 1\nfib = []\nfor _ in range(8):\n    fib.append(a)\n    a, b = b, a + b\nprint(\"Fibonacci Series:\", fib)\n",
        "expectedKeywordOrOutput": "prime? True",
        "solutionHint": "Loop from 2 to sqrt(n) for prime verification.",
        "theoryNotes": [
            "for loops iterate over sequences (lists, tuples, ranges, strings).",
            "while loops execute as long as a condition evaluates to True.",
            "Loop control statements: break exits loop immediately; continue skips to next iteration.",
            "Prime number definition: An integer n > 1 with no positive divisors other than 1 and itself.",
            "Fibonacci Sequence: F(0)=0, F(1)=1, F(n) = F(n-1) + F(n-2)"
        ],
        "inventoryReward": {
            "id": "loop-crystal",
            "name": "Loop Crystal of Eternity",
            "description": "Controls temporal recurrence and iterative logic.",
            "icon": "🔄"
        }
    },
    {
        "id": 5,
        "slug": "dungeon-5",
        "codexNumber": "Codex V",
        "codexTitle": "The String Archives",
        "dungeonName": "Dungeon V: Library of Strings",
        "subtitle": "Manipulate text, slicing, formatting, anagram checks, and set operations.",
        "difficultyStars": 3,
        "xpReward": 350,
        "skillUnlock": "String Manipulation & Formatting",
        "description": "Thousands of corrupted scroll fragments float through the cosmic library. Reconstruct the encrypted runes using string slicing, vowel counting, and set operations.",
        "missionObjective": "Format text using .upper(), .strip(), count vowels, and test anagram strings.",
        "initialCode": "raw_text = \"   nocturnal ascension   \"\nclean_text = raw_text.strip().upper()\nprint(\"Cleaned Rune:\", clean_text)\n\ns1, s2 = \"listen\", \"silent\"\nis_anagram = sorted(s1) == sorted(s2)\nprint(f\"Are '{s1}' and '{s2}' anagrams?\", is_anagram)\n",
        "expectedKeywordOrOutput": "NOCTURNAL ASCENSION",
        "solutionHint": "Use .strip() to trim whitespace and .upper() to uppercase.",
        "theoryNotes": [
            "Strings are immutable sequences of Unicode characters.",
            "String slicing syntax: string[start:stop:step]",
            "Useful methods: .strip(), .upper(), .lower(), .replace(), .split(), .join()",
            "Sets store unique, unordered elements. Set operations: union |, intersection &, difference -."
        ],
        "inventoryReward": {
            "id": "scroll-strings",
            "name": "Encrypted String Codex",
            "description": "Contains ancient formatting formulas and regex spells.",
            "icon": "📜"
        }
    },
    {
        "id": 6,
        "slug": "dungeon-6",
        "codexNumber": "Codex VI",
        "codexTitle": "The Collection Vault",
        "dungeonName": "Dungeon VI: Collection Kingdom",
        "subtitle": "Wield lists, tuples, sets, and key-value dictionaries.",
        "difficultyStars": 3,
        "xpReward": 400,
        "skillUnlock": "Data Structures & Collections",
        "bossName": "Collection Guardian",
        "description": "The treasure room of the Digital Dungeon holds legendary weapons stored in arrays, sets, and dictionary caches.",
        "missionObjective": "Build inventory dictionary, perform frequency counts, and unpack tuple coordinates.",
        "initialCode": "word = \"NOCTURNAL\"\nfreq = {}\nfor ch in word:\n    freq[ch] = freq.get(ch, 0) + 1\nprint(\"Character Frequency:\", freq)\n\nhunter_inventory = {\"name\": \"Akhand\", \"weapons\": [\"Shadow Dagger\", \"Mana Staff\"]}\nprint(\"Primary Weapon:\", hunter_inventory[\"weapons\"][0])\n",
        "expectedKeywordOrOutput": "Shadow Dagger",
        "solutionHint": "Access dictionary keys and append list elements.",
        "theoryNotes": [
            "Lists: Ordered, mutable collections [1, 2, 3].",
            "Tuples: Ordered, immutable sequences (1, 2, 3).",
            "Dictionaries: Key-value hash maps {'key': 'value'} providing O(1) lookup times.",
            "Frequency counters: Using dictionaries to count element frequencies in O(N) time."
        ],
        "inventoryReward": {
            "id": "vault-key",
            "name": "Key of Collections",
            "description": "Unlocks multidimensional data arrays and hash maps.",
            "icon": "🗝️"
        }
    },
    {
        "id": 7,
        "slug": "dungeon-7",
        "codexNumber": "Codex VII",
        "codexTitle": "Function Forge",
        "dungeonName": "Dungeon VII: Hall of Functions",
        "subtitle": "Craft modular, reusable spells, recursion, and lambda functions.",
        "difficultyStars": 4,
        "xpReward": 450,
        "skillUnlock": "Function Crafting & Modularization",
        "description": "In the magical forge, spells are cast by invoking functions. Modularize your code so you can cast powerful incantations repeatedly.",
        "missionObjective": "Create recursive factorial function and map lambda functions over numeric lists.",
        "initialCode": "def recursive_factorial(n):\n    if n <= 1:\n        return 1\n    return n * recursive_factorial(n - 1)\n\nprint(\"5! =\", recursive_factorial(5))\n\nnums = [1, 2, 3, 4, 5, 6]\nevens_squared = list(map(lambda x: x**2, filter(lambda x: x % 2 == 0, nums)))\nprint(\"Evens Squared:\", evens_squared)\n",
        "expectedKeywordOrOutput": "120",
        "solutionHint": "Use def for functions and return for output.",
        "theoryNotes": [
            "Functions encapsulate logic for reuse and modular design.",
            "Recursion: A function calling itself with a base case to terminate execution.",
            "Lambda functions: Anonymous one-line functions lambda x, y: x + y."
        ],
        "inventoryReward": {
            "id": "scroll-func",
            "name": "Function Crafting Scroll",
            "description": "Grants the power to synthesize modular spell functions.",
            "icon": "✨"
        }
    },
    {
        "id": 8,
        "slug": "dungeon-8",
        "codexNumber": "Codex VIII",
        "codexTitle": "Archive of Files",
        "dungeonName": "Dungeon VIII: Archive of Memories",
        "subtitle": "Persist knowledge with file I/O operations and exception handling.",
        "difficultyStars": 4,
        "xpReward": 500,
        "skillUnlock": "File I/O & Exception Persistence",
        "description": "The memory crystals of the System store records across time. Learn to open, read, write, and safely handle exceptions using try-except blocks.",
        "missionObjective": "Simulate file stream operations and safe division with try-except blocks.",
        "initialCode": "def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return \"Error: Division by zero!\"\n\nprint(\"10 / 2 =\", safe_divide(10, 2))\nprint(\"10 / 0 =\", safe_divide(10, 0))\n",
        "expectedKeywordOrOutput": "Division by zero",
        "solutionHint": "Wrap critical code in try-except blocks.",
        "theoryNotes": [
            "File modes: 'r' (read), 'w' (write/overwrite), 'a' (append), 'b' (binary).",
            "Context manager with open(...) as f: automatically closes file streams upon block exit.",
            "Exception handling: try: ... except ExceptionType as e: ... finally: ... prevents crashes."
        ],
        "inventoryReward": {
            "id": "archive-key",
            "name": "Chronos Memory Crystal",
            "description": "Stores persistent records beyond system restarts.",
            "icon": "💾"
        }
    },
    {
        "id": 9,
        "slug": "dungeon-9",
        "codexNumber": "Codex IX",
        "codexTitle": "The Object Foundry",
        "dungeonName": "Dungeon IX: Tower of Classes",
        "subtitle": "Master Object-Oriented Programming (OOP), inheritance & encapsulation.",
        "difficultyStars": 4,
        "xpReward": 600,
        "skillUnlock": "Object-Oriented Programming (OOP)",
        "description": "Ascend to the highest spire of the Tower. Here, true System Architects construct blueprints (classes) and instantiate living objects.",
        "missionObjective": "Define base Hunter class and ShadowHunter subclass overriding attack method.",
        "initialCode": "class Hunter:\n    def __init__(self, name):\n        self.name = name\n    def attack(self):\n        return \"Basic Strike\"\n\nclass ShadowHunter(Hunter):\n    def attack(self):\n        return f\"{self.name} casts Shadow Extraction!\"\n\nh1 = ShadowHunter(\"Akhand\")\nprint(h1.attack())\n",
        "expectedKeywordOrOutput": "Shadow Extraction",
        "solutionHint": "Pass self as first parameter of instance methods.",
        "theoryNotes": [
            "Classes are blueprints for creating objects with attributes (data) and methods (behavior).",
            "The __init__ method initializes newly created instances.",
            "Inheritance allows a subclass to inherit attributes and methods from a parent class.",
            "Polymorphism allows subclasses to override methods for specific behavior."
        ],
        "inventoryReward": {
            "id": "foundry-blueprint",
            "name": "System Architect Blueprint",
            "description": "Blueprint for instantiating complex class entities.",
            "icon": "🏛️"
        }
    },
    {
        "id": 10,
        "slug": "dungeon-10",
        "codexNumber": "Codex X",
        "codexTitle": "Observatory of Data",
        "dungeonName": "Final Dungeon: Data Observatory",
        "subtitle": "Analyze ancient dataset streams and defeat the Data Dragon.",
        "difficultyStars": 5,
        "xpReward": 800,
        "skillUnlock": "Data Science & Analytical Visualization",
        "bossName": "The Data Dragon",
        "description": "The core of the Digital Dungeon exposes pure streams of high-dimensional data. Master analytics, statistical averages, and visualization to slay the Data Dragon!",
        "missionObjective": "Compute mean average, peak score, and list transformations on dataset.",
        "initialCode": "dataset = [88, 92, 79, 95, 100, 84]\nmean_val = sum(dataset) / len(dataset)\nmax_val = max(dataset)\nprint(f\"Mean Score: {mean_val:.2f}, Peak Score: {max_val}\")\nprint(\"CRITICAL HIT! The Data Dragon has been defeated!\")\n",
        "expectedKeywordOrOutput": "Data Dragon has been defeated",
        "solutionHint": "Use sum() and len() for mean calculation.",
        "theoryNotes": [
            "Data analysis relies on statistical aggregates: mean (average), median (middle value), and standard deviation.",
            "List comprehensions provide efficient data transformation pipelines: [x*2 for x in data].",
            "Data visualization represents numerical distributions visually to reveal hidden patterns."
        ],
        "inventoryReward": {
            "id": "data-orb",
            "name": "Data Analysis Orb",
            "description": "Glowing celestial sphere visualizing real-time metrics.",
            "icon": "🔮"
        }
    }
]

# Extract all 77 tasks mapped to their experiment numbers
exp_tasks = {i: [] for i in range(1, 11)}

exp_title_re = re.compile(r"PYTHON LAB · EXPERIMENT (\d+)")
current_exp = 0

for idx, cell in enumerate(cells):
    src = "".join(cell.get("source", []))
    m = exp_title_re.search(src)
    if m:
        current_exp = int(m.group(1))
        continue
    
    if "PRACTICE TASK" in src and current_exp in exp_tasks:
        # Question details
        q_m = re.search(r"Question (\d+)", src)
        q_num = q_m.group(1) if q_m else str(len(exp_tasks[current_exp]) + 1)
        
        # Extract text after Question N
        q_text = ""
        lines = src.split("\n")
        for line in lines:
            if not line.startswith("<") and not "PRACTICE TASK" in line and not "Question" in line:
                if line.strip():
                    q_text += line.strip() + " "
        
        # Extract explanation / formula if present
        exp_m = re.search(r"EXPLANATION</span>\s*(.*?)(?:<div|$)", src, re.DOTALL)
        explanation = exp_m.group(1).replace("\n", " ").strip() if exp_m else ""
        explanation = re.sub(r"<.*?>", "", explanation)
        
        form_m = re.search(r"FORMULA</span>\s*(.*?)(?:<div|$)", src, re.DOTALL)
        formula = form_m.group(1).replace("\n", " ").strip() if form_m else ""
        formula = re.sub(r"<.*?>", "", formula)
        
        # Next cell should be python solution banner or code
        code_str = ""
        out_str = ""
        
        # Look ahead for code cell
        for future_cell in cells[idx+1:idx+4]:
            if future_cell.get("cell_type") == "code":
                code_str = "".join(future_cell.get("source", []))
                for out in future_cell.get("outputs", []):
                    if out.get("output_type") == "stream":
                        out_str += "".join(out.get("text", []))
                break
        
        task_obj = {
            "id": f"d{current_exp}-t{q_num}",
            "title": f"Task {q_num}: Question {q_num}",
            "question": q_text.strip() or f"Practice Question {q_num} for Experiment {current_exp}",
            "explanation": explanation or "Follow the lab workbook instructions and execute the solution.",
            "formula": formula if formula else "",
            "codeSnippet": code_str or f"# Experiment {current_exp} Task {q_num}\nprint('Executing Task {q_num}')",
            "expectedOutput": out_str.strip() or "Execution Completed"
        }
        exp_tasks[current_exp].append(task_obj)

# Assemble DUNGEONS list
for dungeon in dungeons_meta:
    d_id = dungeon["id"]
    dungeon["tasks"] = exp_tasks[d_id]

# Now generate TypeScript code string
ts_content = """export interface PracticeTask {
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

export const DUNGEONS: Dungeon[] = """ + json.dumps(dungeons_meta, indent=2) + """;

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
"""

with open("src/lib/dungeons.ts", "w") as f_out:
    f_out.write(ts_content)

print("Successfully generated src/lib/dungeons.ts with all 77 notebook tasks!")
