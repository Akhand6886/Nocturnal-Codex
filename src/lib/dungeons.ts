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
      "icon": "\ud83d\udcdc"
    },
    "tasks": [
      {
        "id": "d1-t1",
        "title": "Task 1: Question 1",
        "question": "Install Python and understand the difference between scripting mode and interactive mode in IDLE. - **Interactive mode** runs one statement at a time and shows immediate output. - **Scripting mode** runs saved `.py` files, useful for larger programs and reuse.",
        "explanation": "- **Interactive mode** runs one statement at a time and shows immediate output. - **Scripting mode** runs saved `.py` files, useful for larger programs and reuse.",
        "formula": "",
        "codeSnippet": "import sys\n\nprint(\"Python is installed.\")\nprint(\"Version:\", sys.version)",
        "expectedOutput": "Python is installed.\nVersion: 3.13.2 (main, Feb  4 2025, 14:51:09) [Clang 16.0.0 (clang-1600.0.26.6)]"
      },
      {
        "id": "d1-t2",
        "title": "Task 2: Question 2",
        "question": "Write Python programs to print strings in the given manner.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "# 2(a)\nprint(\"Hello Everyone !!!\")\n\n# 2(b)\nprint(\"Hello\")\nprint(\"World\")\n\n# 2(c)\nprint(\"Hello\\nWorld\")\n\n# 2(d)\nprint(\"Rohit's date of birth is 12\\05\\1999\")",
        "expectedOutput": "Hello Everyone !!!\nHello\nWorld\nHello\nWorld\nRohit's date of birth is 12\u0005\u0001999"
      },
      {
        "id": "d1-t3",
        "title": "Task 3: Question 3",
        "question": "Declare a string variable called `x` and assign it the value `Hello`. Print the value of `x`.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "x = \"Hello\"\nprint(x)",
        "expectedOutput": "Hello"
      },
      {
        "id": "d1-t4",
        "title": "Task 4: Question 4",
        "question": "Take different data types and print values using the `print()` function.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "integer_value = 10\nfloat_value = 3.14\nstring_value = \"Python\"\nboolean_value = True\nlist_value = [1, 2, 3]\n\nprint(\"Integer:\", integer_value)\nprint(\"Float:\", float_value)\nprint(\"String:\", string_value)\nprint(\"Boolean:\", boolean_value)\nprint(\"List:\", list_value)",
        "expectedOutput": "Integer: 10\nFloat: 3.14\nString: Python\nBoolean: True\nList: [1, 2, 3]"
      },
      {
        "id": "d1-t5",
        "title": "Task 5: Question 5",
        "question": "Take two variables `a` and `b`. Assign your first name and last name. Print your full name by adding both.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "a = \"Rohit\"\nb = \"Sharma\"\nfull_name = a + \" \" + b\nprint(\"Full Name:\", full_name)",
        "expectedOutput": "Full Name: Rohit Sharma"
      },
      {
        "id": "d1-t6",
        "title": "Task 6: Question 6",
        "question": "Declare first name, last name, and nickname. Print as: `FirstName (Nickname) LastName`.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "first_name = \"George\"\nlast_name = \"Washington\"\nnickname = \"woody\"\n\nprint(f\"{first_name} ({nickname}) {last_name}\")",
        "expectedOutput": "George (woody) Washington"
      },
      {
        "id": "d1-t7",
        "title": "Task 7: Question 7",
        "question": "Declare and assign suitable variables, then print the details in the required format.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "name = \"NIKUNJ BANSAL\"\nsap_id = \"500069944\"\ndob = \"13 Oct 1999\"\naddress_line1 = \"UPES\"\naddress_line2 = \"Bidholi Campus\"\npincode = \"248007\"\nprogramme = \"AI & ML\"\nsemester = 2\n\nprint(\"NAME:\", name)\nprint(\"SAP ID:\", sap_id)\nprint(\"DATE OF BIRTH:\", dob)\nprint(\"ADDRESS:\", address_line1)\nprint(address_line2)\nprint(\"Pincode:\", pincode)\nprint(\"Programme:\", programme)\nprint(\"Semester:\", semester)",
        "expectedOutput": "NAME: NIKUNJ BANSAL\nSAP ID: 500069944\nDATE OF BIRTH: 13 Oct 1999\nADDRESS: UPES\nBidholi Campus\nPincode: 248007\nProgramme: AI & ML\nSemester: 2"
      }
    ]
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
      "icon": "\u26a1"
    },
    "tasks": [
      {
        "id": "d2-t1",
        "title": "Task 1: Question 1",
        "question": "Declare integer variables `x`, `y`, and `z`. Assign `x = 9`, `y = 7`, perform arithmetic operations, and print results.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "x = 9\ny = 7\nz = 0\n\nprint(\"Addition:\", x + y)\nprint(\"Subtraction:\", x - y)\nprint(\"Multiplication:\", x * y)\nprint(\"Division:\", x / y)",
        "expectedOutput": "Addition: 16\nSubtraction: 2\nMultiplication: 63\nDivision: 1.2857142857142858"
      },
      {
        "id": "d2-t2",
        "title": "Task 2: Question 2",
        "question": "Take radius as input and compute the area of a circle.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "`area = pi * r^2`",
        "codeSnippet": "import math\n\nradius = 5.5  # Replace with: float(input(\"Enter radius: \"))\narea = math.pi * radius ** 2\nprint(\"Area of circle:\", area)",
        "expectedOutput": "Area of circle: 95.03317777109125"
      },
      {
        "id": "d2-t3",
        "title": "Task 3: Question 3",
        "question": "Write a Python program to solve `(x + y) * (x + y)`.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "x = 4\ny = 3\nresult = (x + y) * (x + y)\nprint(\"Computed Result:\", result)",
        "expectedOutput": "Computed Result: 49"
      },
      {
        "id": "d2-t4",
        "title": "Task 4: Question 4",
        "question": "Test data: `x = 4`, `y = 3`.",
        "explanation": "Values are assigned in the previous cell and used for the expression.",
        "formula": "",
        "codeSnippet": "x = 4\ny = 3\nprint(\"Test Data -> x:\", x, \"y:\", y)",
        "expectedOutput": "Test Data -> x: 4 y: 3"
      },
      {
        "id": "d2-t5",
        "title": "Task 5: Question 5",
        "question": "Expected output: `49`",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "x = 4\ny = 3\nprint(\"Expected Output:\", 49)\nprint(\"Actual Output:\", (x + y) * (x + y))",
        "expectedOutput": "Expected Output: 49\nActual Output: 49"
      },
      {
        "id": "d2-t6",
        "title": "Task 6: Question 6",
        "question": "Compute the hypotenuse `c` of a right triangle using Pythagoras theorem.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "`c = sqrt(a^2 + b^2)`",
        "codeSnippet": "import math\n\na = 3\nb = 4\nc = math.sqrt(a ** 2 + b ** 2)\nprint(\"Hypotenuse:\", c)",
        "expectedOutput": "Hypotenuse: 5.0"
      },
      {
        "id": "d2-t7",
        "title": "Task 7: Question 7",
        "question": "Write a program to find simple interest.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "`SI = (P * R * T) / 100`",
        "codeSnippet": "principal = 10000\nrate = 8\ntime = 2\n\nsimple_interest = (principal * rate * time) / 100\nprint(\"Simple Interest:\", simple_interest)",
        "expectedOutput": "Simple Interest: 1600.0"
      },
      {
        "id": "d2-t8",
        "title": "Task 8: Question 8",
        "question": "Find area of a triangle when lengths of all three sides are given (Heron's formula).",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "import math\n\na, b, c = 3, 4, 5\ns = (a + b + c) / 2\narea = math.sqrt(s * (s - a) * (s - b) * (s - c))\nprint(\"Area of triangle:\", area)",
        "expectedOutput": "Area of triangle: 6.0"
      },
      {
        "id": "d2-t9",
        "title": "Task 9: Question 9",
        "question": "Convert given seconds into hours, minutes, and remaining seconds.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "total_seconds = 7384\n\nhours = total_seconds // 3600\nminutes = (total_seconds % 3600) // 60\nseconds = total_seconds % 60\n\nprint(f\"{hours} hour(s), {minutes} minute(s), {seconds} second(s)\")",
        "expectedOutput": "2 hour(s), 3 minute(s), 4 second(s)"
      },
      {
        "id": "d2-t10",
        "title": "Task 10: Question 10",
        "question": "Swap two numbers without using an additional variable.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "a = 25\nb = 40\n\nprint(\"Before swap:\", a, b)\na = a + b\nb = a - b\na = a - b\nprint(\"After swap:\", a, b)",
        "expectedOutput": "Before swap: 25 40\nAfter swap: 40 25"
      },
      {
        "id": "d2-t11",
        "title": "Task 11: Question 11",
        "question": "Find sum of first `n` natural numbers.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "n = 10\nsum_n = n * (n + 1) // 2\nprint(\"Sum of first\", n, \"natural numbers is\", sum_n)",
        "expectedOutput": "Sum of first 10 natural numbers is 55"
      },
      {
        "id": "d2-t12",
        "title": "Task 12: Question 12",
        "question": "Print truth table for bitwise operators `&`, `|`, and `^`.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "print(\"a b | a&b a|b a^b\")\nfor a in (0, 1):\n    for b in (0, 1):\n        print(a, b, \"|\", a & b, \" \", a | b, \" \", a ^ b)",
        "expectedOutput": "a b | a&b a|b a^b\n0 0 | 0   0   0\n0 1 | 0   1   1\n1 0 | 0   1   1\n1 1 | 1   1   0"
      },
      {
        "id": "d2-t13",
        "title": "Task 13: Question 13",
        "question": "Find left shift and right shift values of a given number.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "num = 10\nshift = 2\n\nprint(\"Number:\", num)\nprint(\"Left shift by 2:\", num << shift)\nprint(\"Right shift by 2:\", num >> shift)",
        "expectedOutput": "Number: 10\nLeft shift by 2: 40\nRight shift by 2: 2"
      },
      {
        "id": "d2-t14",
        "title": "Task 14: Question 14",
        "question": "Using membership operator, find whether a given number is in sequence `(10, 20, 56, 78, 89)`.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "sequence = (10, 20, 56, 78, 89)\nnumber = 56\n\nprint(number, \"in sequence?\", number in sequence)",
        "expectedOutput": "56 in sequence? True"
      },
      {
        "id": "d2-t15",
        "title": "Task 15: Question 15",
        "question": "Using membership operator, find whether a given character is in a string.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "text = \"Python Programming\"\nch = \"g\"\n\nprint(f\"'{ch}' in text?\", ch in text)",
        "expectedOutput": "'g' in text? True"
      }
    ]
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
      "icon": "\ud83d\udc8e"
    },
    "tasks": [
      {
        "id": "d3-t1",
        "title": "Task 1: Question 1",
        "question": "Check whether a given number is divisible by both 3 and 5.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "num = 45\n\nif num % 3 == 0 and num % 5 == 0:\n    print(num, \"is divisible by both 3 and 5\")\nelse:\n    print(num, \"is not divisible by both 3 and 5\")",
        "expectedOutput": "45 is divisible by both 3 and 5"
      },
      {
        "id": "d3-t2",
        "title": "Task 2: Question 2",
        "question": "Check whether a given number is a multiple of 5.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "num = 37\n\nif num % 5 == 0:\n    print(num, \"is a multiple of 5\")\nelse:\n    print(num, \"is not a multiple of 5\")",
        "expectedOutput": "37 is not a multiple of 5"
      },
      {
        "id": "d3-t3",
        "title": "Task 3: Question 3",
        "question": "Find the greatest among two numbers. If equal, print `numbers are equal`.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "a = 15\nb = 15\n\nif a > b:\n    print(\"Greatest number is\", a)\nelif b > a:\n    print(\"Greatest number is\", b)\nelse:\n    print(\"numbers are equal\")",
        "expectedOutput": "numbers are equal"
      },
      {
        "id": "d3-t4",
        "title": "Task 4: Question 4",
        "question": "Find the greatest among three numbers (assuming all values are different).",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "a, b, c = 12, 45, 32\n\nif a > b and a > c:\n    print(\"Greatest number is\", a)\nelif b > a and b > c:\n    print(\"Greatest number is\", b)\nelse:\n    print(\"Greatest number is\", c)",
        "expectedOutput": "Greatest number is 45"
      },
      {
        "id": "d3-t5",
        "title": "Task 5: Question 5",
        "question": "Check whether a quadratic equation has real or imaginary roots and display the roots. **Equation format:** `ax^2 + bx + c = 0`",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "import cmath\n\na, b, c = 1, 2, 5\n\ndiscriminant = b ** 2 - 4 * a * c\nroot1 = (-b + cmath.sqrt(discriminant)) / (2 * a)\nroot2 = (-b - cmath.sqrt(discriminant)) / (2 * a)\n\nif discriminant >= 0:\n    print(\"Roots are real\")\nelse:\n    print(\"Roots are imaginary\")\n\nprint(\"Root 1:\", root1)\nprint(\"Root 2:\", root2)",
        "expectedOutput": "Roots are imaginary\nRoot 1: (-1+2j)\nRoot 2: (-1-2j)"
      },
      {
        "id": "d3-t6",
        "title": "Task 6: Question 6",
        "question": "Find whether a given year is a leap year or not.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "year = 2024\n\nif (year % 400 == 0) or (year % 4 == 0 and year % 100 != 0):\n    print(year, \"is a leap year\")\nelse:\n    print(year, \"is not a leap year\")",
        "expectedOutput": "2024 is a leap year"
      },
      {
        "id": "d3-t7",
        "title": "Task 7: Question 7",
        "question": "Take any date as input and display the next date in the calendar.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "from datetime import date, timedelta\n\nd = date(2005, 9, 20)\nnext_day = d + timedelta(days=1)\n\nprint(\"Input date:\", d.strftime(\"%d-%m-%Y\"))\nprint(\"Next date:\", next_day.strftime(\"%d-%m-%Y\"))",
        "expectedOutput": "Input date: 20-09-2005\nNext date: 21-09-2005"
      },
      {
        "id": "d3-t8",
        "title": "Task 8: Question 8",
        "question": "Print the grade sheet of a student from marks of five subjects. - `Percentage = (total marks / 500) * 100` - `CGPA = Percentage / 10` - Grade is assigned using the provided CGPA ranges.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "def get_grade(cgpa):\n    if 0.0 <= cgpa <= 3.4:\n        return \"F\"\n    if 3.5 <= cgpa <= 5.0:\n        return \"C+\"\n    if 5.1 <= cgpa <= 6.0:\n        return \"B\"\n    if 6.1 <= cgpa <= 7.0:\n        return \"B+\"\n    if 7.1 <= cgpa <= 8.0:\n        return \"A\"\n    if 8.1 <= cgpa <= 9.0:\n        return \"A+\"\n    if 9.1 <= cgpa <= 10.0:\n        return \"O (Outstanding)\"\n    return \"Invalid CGPA\"\n\nname = \"Rohit Sharma\"\nroll_no = \"R17234512\"\nsap_id = \"50005673\"\nsemester = 1\ncourse = \"B.Tech. CSE AI & ML\"\n\nmarks = {\n    \"PDS\": 70,\n    \"Python\": 80,\n    \"Chemistry\": 90,\n    \"English\": 60,\n    \"Physics\": 65,\n}\n\ntotal = sum(marks.values())\npercentage = (total / (len(marks) * 100)) * 100\ncgpa = round(percentage / 10, 1)\ngrade = get_grade(cgpa)\n\nprint(\"Sample Gradesheet\")\nprint(\"Name:\", name)\nprint(\"Roll Number:\", roll_no, \"SAPID:\", sap_id)\nprint(\"Sem:\", semester, \"Course:\", course)\nprint(\"Subject name: Marks\")\nfor subject, score in marks.items():\n    print(f\"{subject}: {score}\")\nprint(f\"Percentage: {percentage:.2f}%\")\nprint(\"CGPA:\", cgpa)\nprint(\"Grade:\", grade)",
        "expectedOutput": "Sample Gradesheet\nName: Rohit Sharma\nRoll Number: R17234512 SAPID: 50005673\nSem: 1 Course: B.Tech. CSE AI & ML\nSubject name: Marks\nPDS: 70\nPython: 80\nChemistry: 90\nEnglish: 60\nPhysics: 65\nPercentage: 73.00%\nCGPA: 7.3\nGrade: A"
      },
      {
        "id": "d3-t9",
        "title": "Task 9: Question 9",
        "question": "Find factorial of a given number using a loop.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "n = 5\nfact = 1\nfor i in range(1, n + 1):\n    fact *= i\nprint(f\"Factorial of {n} is {fact}\")",
        "expectedOutput": "Factorial of 5 is 120"
      }
    ]
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
      "icon": "\ud83d\udd04"
    },
    "tasks": [
      {
        "id": "d4-t1",
        "title": "Task 1: Question 1",
        "question": "Find factorial of a number using a loop.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "n = 5\nfact = 1\nfor i in range(1, n + 1):\n    fact *= i\nprint(f\"Factorial of {n} is {fact}\")",
        "expectedOutput": "Factorial of 5 is 120"
      },
      {
        "id": "d4-t2",
        "title": "Task 2: Question 2",
        "question": "Check whether the given number is an Armstrong number.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "num = 153\nnum_str = str(num)\npower = len(num_str)\nsum_of_powers = 0\n\nfor digit in num_str:\n    sum_of_powers += int(digit) ** power\n\nif sum_of_powers == num:\n    print(num, \"is an Armstrong number\")\nelse:\n    print(num, \"is not an Armstrong number\")",
        "expectedOutput": "153 is an Armstrong number"
      },
      {
        "id": "d4-t3",
        "title": "Task 3: Question 3",
        "question": "Print Fibonacci series up to a given number of terms.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "terms = 10\na, b = 0, 1\n\nprint(\"Fibonacci series:\")\nfor _ in range(terms):\n    print(a, end=\" \")\n    a, b = b, a + b\nprint()",
        "expectedOutput": "Fibonacci series:\n0 1 1 2 3 5 8 13 21 34"
      },
      {
        "id": "d4-t4",
        "title": "Task 4: Question 4",
        "question": "Check whether a given number is prime or not.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "num = 29\n\nif num < 2:\n    print(num, \"is not prime\")\nelse:\n    is_prime = True\n    for i in range(2, int(num ** 0.5) + 1):\n        if num % i == 0:\n            is_prime = False\n            break\n    print(num, \"is prime\" if is_prime else \"is not prime\")",
        "expectedOutput": "29 is prime"
      },
      {
        "id": "d4-t5",
        "title": "Task 5: Question 5",
        "question": "Check whether a given number is palindrome or not.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "num = 12321\n\nif str(num) == str(num)[::-1]:\n    print(num, \"is a palindrome\")\nelse:\n    print(num, \"is not a palindrome\")",
        "expectedOutput": "12321 is a palindrome"
      },
      {
        "id": "d4-t6",
        "title": "Task 6: Question 6",
        "question": "Print sum of digits of a number.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "num = 9876\nsum_digits = 0\n\nfor digit in str(num):\n    sum_digits += int(digit)\n\nprint(\"Sum of digits:\", sum_digits)",
        "expectedOutput": "Sum of digits: 30"
      },
      {
        "id": "d4-t7",
        "title": "Task 7: Question 7",
        "question": "Count and print all numbers divisible by 5 or 7 between 1 and 100.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "numbers = [n for n in range(1, 101) if n % 5 == 0 or n % 7 == 0]\nprint(\"Numbers:\", numbers)\nprint(\"Count:\", len(numbers))",
        "expectedOutput": "Numbers: [5, 7, 10, 14, 15, 20, 21, 25, 28, 30, 35, 40, 42, 45, 49, 50, 55, 56, 60, 63, 65, 70, 75, 77, 80, 84, 85, 90, 91, 95, 98, 100]\nCount: 32"
      },
      {
        "id": "d4-t8",
        "title": "Task 8: Question 8",
        "question": "Convert all lowercase letters to uppercase in a string.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "text = \"Python Programming Lab\"\nupper_text = text.upper()\nprint(\"Original:\", text)\nprint(\"Uppercase:\", upper_text)",
        "expectedOutput": "Original: Python Programming Lab\nUppercase: PYTHON PROGRAMMING LAB"
      },
      {
        "id": "d4-t9",
        "title": "Task 9: Question 9",
        "question": "Print all prime numbers between 1 and 100.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "primes = []\n\nfor num in range(2, 101):\n    is_prime = True\n    for i in range(2, int(num ** 0.5) + 1):\n        if num % i == 0:\n            is_prime = False\n            break\n    if is_prime:\n        primes.append(num)\n\nprint(\"Prime numbers from 1 to 100:\")\nprint(primes)",
        "expectedOutput": "Prime numbers from 1 to 100:\n[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]"
      },
      {
        "id": "d4-t10",
        "title": "Task 10: Question 10",
        "question": "Print multiplication table for a given number.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "num = 5\nfor i in range(1, 11):\n    print(f\"{num} * {i} = {num * i}\")",
        "expectedOutput": "5 * 1 = 5\n5 * 2 = 10\n5 * 3 = 15\n5 * 4 = 20\n5 * 5 = 25\n5 * 6 = 30\n5 * 7 = 35\n5 * 8 = 40\n5 * 9 = 45\n5 * 10 = 50"
      }
    ]
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
      "icon": "\ud83d\udcdc"
    },
    "tasks": [
      {
        "id": "d5-t1",
        "title": "Task 1: Question 1",
        "question": "Count and display the number of capital letters in a given string.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "text = \"PyThOn LAB 2026\"\ncount_caps = sum(1 for ch in text if ch.isupper())\nprint(\"Capital letters:\", count_caps)",
        "expectedOutput": "Capital letters: 6"
      },
      {
        "id": "d5-t2",
        "title": "Task 2: Question 2",
        "question": "Count total number of vowels in a given string.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "text = \"Welcome to Python Programming\"\nvowels = \"aeiouAEIOU\"\ncount_vowels = sum(1 for ch in text if ch in vowels)\nprint(\"Total vowels:\", count_vowels)",
        "expectedOutput": "Total vowels: 8"
      },
      {
        "id": "d5-t3",
        "title": "Task 3: Question 3",
        "question": "Input a sentence and print words in separate lines.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "sentence = \"Python is easy to learn\"\n\nfor word in sentence.split():\n    print(word)",
        "expectedOutput": "Python\nis\neasy\nto\nlearn"
      },
      {
        "id": "d5-t4",
        "title": "Task 4: Question 4",
        "question": "Enter a string and substring, then print how many times substring occurs from left to right.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "main_string = \"ABCDCDC\"\nsub_string = \"CDC\"\n\ncount = 0\nstart = 0\nwhile True:\n    idx = main_string.find(sub_string, start)\n    if idx == -1:\n        break\n    count += 1\n    start = idx + 1\n\nprint(\"Occurrences:\", count)",
        "expectedOutput": "Occurrences: 2"
      },
      {
        "id": "d5-t5",
        "title": "Task 5: Question 5",
        "question": "Count occurrences of each alphabet (case-insensitive) in a mixed-case string.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "text = \"ABaBCbGc\"\nfrequency = {}\n\nfor ch in text:\n    if ch.isalpha():\n        key = ch.upper()\n        frequency[key] = frequency.get(key, 0) + 1\n\nfor key in sorted(frequency):\n    print(f\"{frequency[key]}{key}\")",
        "expectedOutput": "2A\n3B\n2C\n1G"
      },
      {
        "id": "d5-t6",
        "title": "Task 6: Question 6",
        "question": "Count number of unique words in a sentence using sets.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "sentence = \"python is simple and python is powerful\"\nwords = sentence.lower().split()\nunique_words = set(words)\n\nprint(\"Unique words:\", unique_words)\nprint(\"Count of unique words:\", len(unique_words))",
        "expectedOutput": "Unique words: {'python', 'powerful', 'simple', 'and', 'is'}\nCount of unique words: 5"
      },
      {
        "id": "d5-t7",
        "title": "Task 7: Question 7",
        "question": "Create two sets of fruits and find: - Fruits in both sets - Fruits only in `s1` - Count of all fruits from both sets",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "s1 = {\"apple\", \"banana\", \"mango\", \"grapes\"}\ns2 = {\"banana\", \"orange\", \"kiwi\", \"mango\"}\n\nprint(\"Fruits in both sets:\", s1 & s2)\nprint(\"Fruits only in s1:\", s1 - s2)\nprint(\"Count of all unique fruits:\", len(s1 | s2))",
        "expectedOutput": "Fruits in both sets: {'banana', 'mango'}\nFruits only in s1: {'grapes', 'apple'}\nCount of all unique fruits: 6"
      },
      {
        "id": "d5-t8",
        "title": "Task 8: Question 8",
        "question": "Take two sets and apply various set operations: - `S1 = {Red, yellow, orange, blue}` - `S2 = {violet, blue, purple}`",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "S1 = {\"Red\", \"yellow\", \"orange\", \"blue\"}\nS2 = {\"violet\", \"blue\", \"purple\"}\n\nprint(\"Union:\", S1 | S2)\nprint(\"Intersection:\", S1 & S2)\nprint(\"Difference (S1 - S2):\", S1 - S2)\nprint(\"Difference (S2 - S1):\", S2 - S1)\nprint(\"Symmetric Difference:\", S1 ^ S2)",
        "expectedOutput": "Union: {'yellow', 'blue', 'purple', 'Red', 'orange', 'violet'}\nIntersection: {'blue'}\nDifference (S1 - S2): {'Red', 'yellow', 'orange'}\nDifference (S2 - S1): {'purple', 'violet'}\nSymmetric Difference: {'purple', 'Red', 'violet', 'yellow', 'orange'}"
      }
    ]
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
    "initialCode": "word = \"NOCTURNAL\"\nfreq = {}\nfor ch in word:\n    freq[ch] = freq.get(ch, 0) + 1\nprint(\"Character Frequency:\", freq)\n\nhunter_inventory = {\"name\": \"Akhanda\", \"weapons\": [\"Shadow Dagger\", \"Mana Staff\"]}\nprint(\"Primary Weapon:\", hunter_inventory[\"weapons\"][0])\n",
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
      "icon": "\ud83d\udddd\ufe0f"
    },
    "tasks": [
      {
        "id": "d6-t1",
        "title": "Task 1: Question 1",
        "question": "Scan `n` values in range `0-3` and print number of times each value has occurred.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "values = [0, 1, 2, 3, 2, 1, 0, 3, 3, 2]\ncounts = {0: 0, 1: 0, 2: 0, 3: 0}\n\nfor value in values:\n    if value in counts:\n        counts[value] += 1\n\nfor key in counts:\n    print(f\"{key} occurred {counts[key]} time(s)\")",
        "expectedOutput": "0 occurred 2 time(s)\n1 occurred 2 time(s)\n2 occurred 3 time(s)\n3 occurred 3 time(s)"
      },
      {
        "id": "d6-t2",
        "title": "Task 2: Question 2",
        "question": "Create a tuple of numeric values and find average.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "numbers = (12, 25, 30, 18, 15)\naverage = sum(numbers) / len(numbers)\nprint(\"Tuple:\", numbers)\nprint(\"Average:\", average)",
        "expectedOutput": "Tuple: (12, 25, 30, 18, 15)\nAverage: 20.0"
      },
      {
        "id": "d6-t3",
        "title": "Task 3: Question 3",
        "question": "Input scores of students and print runner-up score.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "scores = [2, 3, 6, 6, 5]\nunique_scores = sorted(set(scores), reverse=True)\nrunner_up = unique_scores[1]\nprint(\"Runner-up score:\", runner_up)",
        "expectedOutput": "Runner-up score: 5"
      },
      {
        "id": "d6-t4",
        "title": "Task 4: Question 4",
        "question": "Create a dictionary of persons where key is name and value is city, then: - Display all names - Display all city names - Display student names with cities - Count number of students in each city",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "students = {\n    \"Aman\": \"Dehradun\",\n    \"Riya\": \"Delhi\",\n    \"Vikas\": \"Dehradun\",\n    \"Neha\": \"Mumbai\",\n}\n\nprint(\"All names:\", list(students.keys()))\nprint(\"All city names:\", list(students.values()))\n\nprint(\"\\nStudent and city details:\")\nfor name, city in students.items():\n    print(f\"{name} -> {city}\")\n\ncity_count = {}\nfor city in students.values():\n    city_count[city] = city_count.get(city, 0) + 1\n\nprint(\"\\nCount in each city:\")\nfor city, count in city_count.items():\n    print(f\"{city}: {count}\")",
        "expectedOutput": "All names: ['Aman', 'Riya', 'Vikas', 'Neha']\nAll city names: ['Dehradun', 'Delhi', 'Dehradun', 'Mumbai']\n\nStudent and city details:\nAman -> Dehradun\nRiya -> Delhi\nVikas -> Dehradun\nNeha -> Mumbai\n\nCount in each city:\nDehradun: 2\nDelhi: 1\nMumbai: 1"
      },
      {
        "id": "d6-t5",
        "title": "Task 5: Question 5",
        "question": "Store details of movies and perform: - Print all movie details - Display movies released before 2015 - Print movies that made a profit - Print movies by a particular director",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "movies = [\n    {\"name\": \"Movie A\", \"year\": 2012, \"director\": \"Raj Mehra\", \"cost\": 50, \"collection\": 80},\n    {\"name\": \"Movie B\", \"year\": 2018, \"director\": \"Anil Verma\", \"cost\": 70, \"collection\": 65},\n    {\"name\": \"Movie C\", \"year\": 2010, \"director\": \"Raj Mehra\", \"cost\": 40, \"collection\": 55},\n]\n\nprint(\"All movie details:\")\nfor movie in movies:\n    print(movie)\n\nprint(\"\\nMovies released before 2015:\")\nfor movie in movies:\n    if movie[\"year\"] < 2015:\n        print(movie[\"name\"])\n\nprint(\"\\nMovies that made profit:\")\nfor movie in movies:\n    if movie[\"collection\"] > movie[\"cost\"]:\n        print(movie[\"name\"])\n\nsearch_director = \"Raj Mehra\"\nprint(f\"\\nMovies directed by {search_director}:\")\nfor movie in movies:\n    if movie[\"director\"].lower() == search_director.lower():\n        print(movie[\"name\"])",
        "expectedOutput": "All movie details:\n{'name': 'Movie A', 'year': 2012, 'director': 'Raj Mehra', 'cost': 50, 'collection': 80}\n{'name': 'Movie B', 'year': 2018, 'director': 'Anil Verma', 'cost': 70, 'collection': 65}\n{'name': 'Movie C', 'year': 2010, 'director': 'Raj Mehra', 'cost': 40, 'collection': 55}\n\nMovies released before 2015:\nMovie A\nMovie C\n\nMovies that made profit:\nMovie A\nMovie C\n\nMovies directed by Raj Mehra:\nMovie A\nMovie C"
      }
    ]
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
      "icon": "\u2728"
    },
    "tasks": [
      {
        "id": "d7-t1",
        "title": "Task 1: Question 1",
        "question": "Write a function to find maximum and minimum from a sequence without using built-in `max()` and `min()`.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "def find_max_min(sequence):\n    maximum = sequence[0]\n    minimum = sequence[0]\n\n    for value in sequence[1:]:\n        if value > maximum:\n            maximum = value\n        if value < minimum:\n            minimum = value\n\n    return maximum, minimum\n\nnums = [15, 3, 99, 42, 7]\nmx, mn = find_max_min(nums)\nprint(\"Maximum:\", mx)\nprint(\"Minimum:\", mn)",
        "expectedOutput": "Maximum: 99\nMinimum: 3"
      },
      {
        "id": "d7-t2",
        "title": "Task 2: Question 2",
        "question": "Write a function that takes a positive integer and returns sum of cubes of all positive integers smaller than it.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "def sum_of_cubes_below(n):\n    total = 0\n    for i in range(1, n):\n        total += i ** 3\n    return total\n\nn = 6\nprint(f\"Sum of cubes below {n}:\", sum_of_cubes_below(n))",
        "expectedOutput": "Sum of cubes below 6: 225"
      },
      {
        "id": "d7-t3",
        "title": "Task 3: Question 3",
        "question": "Write a recursive function to print numbers from `1` to `n` (no loops).",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "def print_1_to_n(n):\n    if n == 0:\n        return\n    print_1_to_n(n - 1)\n    print(n, end=\" \")\n\nprint_1_to_n(10)\nprint()",
        "expectedOutput": "1 2 3 4 5 6 7 8 9 10"
      },
      {
        "id": "d7-t4",
        "title": "Task 4: Question 4",
        "question": "Write a recursive function to print Fibonacci series up to `n` terms.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "def fib(n):\n    if n == 0:\n        return 0\n    if n == 1:\n        return 1\n    return fib(n - 1) + fib(n - 2)\n\nterms = 8\nprint(\"Fibonacci series:\")\nfor i in range(terms):\n    print(fib(i), end=\" \")\nprint()",
        "expectedOutput": "Fibonacci series:\n0 1 1 2 3 5 8 13"
      },
      {
        "id": "d7-t5",
        "title": "Task 5: Question 5",
        "question": "Write a lambda function to find volume of a cone.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "`V = (1/3) * pi * r^2 * h`",
        "codeSnippet": "import math\n\ncone_volume = lambda r, h: (1 / 3) * math.pi * r ** 2 * h\n\nprint(\"Volume of cone:\", cone_volume(3, 5))",
        "expectedOutput": "Volume of cone: 47.12388980384689"
      },
      {
        "id": "d7-t6",
        "title": "Task 6: Question 6",
        "question": "Write a lambda function to return tuple of maximum and minimum from a list.",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "data = [10, 6, 8, 90, 12, 56]\nmax_min_tuple = lambda values: (max(values), min(values))\n\nprint(\"Result:\", max_min_tuple(data))",
        "expectedOutput": "Result: (90, 6)"
      },
      {
        "id": "d7-t7",
        "title": "Task 7: Question 7",
        "question": "Write functions to explain: - Keyword arguments - Default arguments - Variable length arguments",
        "explanation": "Follow the lab workbook instructions and execute the solution.",
        "formula": "",
        "codeSnippet": "# Keyword argument\ndef student_info(name, age):\n    print(f\"Name: {name}, Age: {age}\")\n\nstudent_info(age=20, name=\"Ravi\")\n\n# Default argument\ndef greet(name, message=\"Welcome to Python Lab\"):\n    print(f\"{name}: {message}\")\n\ngreet(\"Riya\")\ngreet(\"Riya\", \"Good morning\")\n\n# Variable length argument\ndef total_marks(*marks):\n    return sum(marks)\n\nprint(\"Total marks:\", total_marks(78, 85, 90, 88, 76))",
        "expectedOutput": "Name: Ravi, Age: 20\nRiya: Welcome to Python Lab\nRiya: Good morning\nTotal marks: 417"
      }
    ]
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
      "icon": "\ud83d\udcbe"
    },
    "tasks": [
      {
        "id": "d8-t1",
        "title": "Task 1: Question 1",
        "question": "Add a few names (one name per row) in `name.txt`, then: - Count total names - Count names starting with a vowel - Find the longest name We write names to a text file, read them back into a list, and apply simple list operations to compute the required results.",
        "explanation": "We write names to a text file, read them back into a list, and apply simple list operations to compute the required results.",
        "formula": "",
        "codeSnippet": "names = [\"Aarav\", \"Ishita\", \"Rahul\", \"Omkar\", \"Esha\", \"Vivek\"]\n\nwith open(\"name.txt\", \"w\", encoding=\"utf-8\") as file:\n    for name in names:\n        file.write(name + \"\")\n\nwith open(\"name.txt\", \"r\", encoding=\"utf-8\") as file:\n    stored_names = [line.strip() for line in file if line.strip()]\n\nvowels = tuple(\"AEIOUaeiou\")\ncount_names = len(stored_names)\ncount_vowel_start = sum(1 for name in stored_names if name.startswith(vowels))\nlongest_name = max(stored_names, key=len) if stored_names else None\n\nprint(\"Names in file:\", stored_names)\nprint(\"Count of names:\", count_names)\nprint(\"Names starting with vowel:\", count_vowel_start)\nprint(\"Longest name:\", longest_name)",
        "expectedOutput": "Names in file: ['AaravIshitaRahulOmkarEshaVivek']\nCount of names: 1\nNames starting with vowel: 1\nLongest name: AaravIshitaRahulOmkarEshaVivek"
      },
      {
        "id": "d8-t2",
        "title": "Task 2: Question 2",
        "question": "Store integers in a file and then: - Find the maximum number - Find the average of all numbers - Count numbers greater than 100 File data is read line-by-line and converted to integers. Then basic aggregate operations are performed.",
        "explanation": "File data is read line-by-line and converted to integers. Then basic aggregate operations are performed.",
        "formula": "",
        "codeSnippet": "numbers = [45, 120, 5, 300, 88, 150, 99]\n\nwith open(\"numbers.txt\", \"w\", encoding=\"utf-8\") as file:\n    for number in numbers:\n        file.write(f\"{number}\")\n\nwith open(\"numbers.txt\", \"r\", encoding=\"utf-8\") as file:\n    values = [int(line.strip()) for line in file if line.strip()]\n\nmaximum_number = max(values)\naverage_number = sum(values) / len(values)\ngreater_than_100 = sum(1 for number in values if number > 100)\n\nprint(\"Numbers:\", values)\nprint(\"Maximum number:\", maximum_number)\nprint(\"Average of numbers:\", round(average_number, 2))\nprint(\"Count > 100:\", greater_than_100)",
        "expectedOutput": "Numbers: [4512053008815099]\nMaximum number: 4512053008815099\nAverage of numbers: 4512053008815099.0\nCount > 100: 1"
      },
      {
        "id": "d8-t3",
        "title": "Task 3: Question 3",
        "question": "Assume `city.txt` stores city details as: `city_name population_in_lakhs area_in_sq_km`. Read the file and: - Display details of all cities - Display city names with population more than 10 lakhs - Display sum of areas of all cities Each line is split into fields, converted to correct data types, and then filtered/aggregated.",
        "explanation": "Each line is split into fields, converted to correct data types, and then filtered/aggregated.",
        "formula": "",
        "codeSnippet": "city_records = [\n    (\"Dehradun\", 5.78, 308.20),\n    (\"Delhi\", 190.00, 1484.00),\n    (\"Mumbai\", 124.00, 603.40),\n    (\"Pune\", 74.00, 331.26),\n    (\"Jaipur\", 41.00, 484.60),\n]\n\nwith open(\"city.txt\", \"w\", encoding=\"utf-8\") as file:\n    for city, population, area in city_records:\n        file.write(f\"{city} {population} {area}\")\n\nparsed_cities = []\nwith open(\"city.txt\", \"r\", encoding=\"utf-8\") as file:\n    for line in file:\n        parts = line.split()\n        if len(parts) == 3:\n            city = parts[0]\n            population = float(parts[1])\n            area = float(parts[2])\n            parsed_cities.append((city, population, area))\n\nprint(\"All city details:\")\nfor city, population, area in parsed_cities:\n    print(f\"{city}: population={population} lakh, area={area} sq km\")\n\nhigh_population_cities = [city for city, population, _ in parsed_cities if population > 10]\ntotal_area = sum(area for _, _, area in parsed_cities)\n\nprint(\"Cities with population > 10 lakhs:\", high_population_cities)\nprint(\"Sum of all city areas:\", round(total_area, 2), \"sq km\")",
        "expectedOutput": "All city details:\nCities with population > 10 lakhs: []\nSum of all city areas: 0 sq km"
      },
      {
        "id": "d8-t4",
        "title": "Task 4: Question 4",
        "question": "Input `N` test cases of `a b`, perform integer division `a/b`, and handle exceptions for `ZeroDivisionError` and `ValueError`. Every test case is processed in a `try-except` block so invalid input does not stop the entire program.",
        "explanation": "Every test case is processed in a `try-except` block so invalid input does not stop the entire program.",
        "formula": "",
        "codeSnippet": "raw_input_data = \"\"\"3\n1 0\n2 $\n3 1\n\"\"\"\n\nlines = raw_input_data.strip().splitlines()\nn = int(lines[0])\n\nfor line in lines[1:n + 1]:\n    a_text, b_text = line.split()\n    try:\n        result = int(a_text) // int(b_text)\n        print(result)\n    except (ZeroDivisionError, ValueError) as error:\n        print(\"Error Code:\", error)",
        "expectedOutput": "Error Code: integer division or modulo by zero\nError Code: invalid literal for int() with base 10: '$'\n3"
      },
      {
        "id": "d8-t5",
        "title": "Task 5: Question 5",
        "question": "Create multiple suitable exceptions for a file handling program. We define custom exceptions to handle domain-specific file issues: - `EmptyFileError` for empty files - `InvalidRecordError` for badly formatted records This makes error handling clearer and easier to debug.",
        "explanation": "We define custom exceptions to handle domain-specific file issues: - `EmptyFileError` for empty files - `InvalidRecordError` for badly formatted records  This makes error handling clearer and easier to debug.",
        "formula": "",
        "codeSnippet": "class EmptyFileError(Exception):\n    pass\n\n\nclass InvalidRecordError(Exception):\n    pass\n\n\ndef read_student_marks(file_name):\n    try:\n        with open(file_name, \"r\", encoding=\"utf-8\") as file:\n            lines = [line.strip() for line in file if line.strip()]\n    except FileNotFoundError as error:\n        raise FileNotFoundError(f\"{file_name} not found.\") from error\n\n    if not lines:\n        raise EmptyFileError(f\"{file_name} is empty.\")\n\n    marks_data = {}\n    for line in lines:\n        parts = line.split(\",\")\n        if len(parts) != 2:\n            raise InvalidRecordError(f\"Invalid line format: '{line}'\")\n\n        name = parts[0].strip()\n        try:\n            marks = float(parts[1].strip())\n        except ValueError as error:\n            raise InvalidRecordError(f\"Marks must be numeric in line: '{line}'\") from error\n\n        marks_data[name] = marks\n\n    return marks_data\n\n\nwith open(\"students_valid.txt\", \"w\", encoding=\"utf-8\") as file:\n    file.write(\"Aditi,88 ,Rohan,76\")\n\nwith open(\"students_invalid.txt\", \"w\", encoding=\"utf-8\") as file:\n    file.write(\"Aditi,88 ,Rohan,abc \")\n\nfor candidate in [\"missing.txt\", \"students_invalid.txt\", \"students_valid.txt\"]:\n    try:\n        data = read_student_marks(candidate)\n        print(f\"{candidate} -> {data}\")\n    except (FileNotFoundError, EmptyFileError, InvalidRecordError) as error:\n        print(f\"{candidate} -> {error}\")",
        "expectedOutput": "missing.txt -> missing.txt not found.\nstudents_invalid.txt -> Invalid line format: 'Aditi,88 ,Rohan,abc'\nstudents_valid.txt -> Invalid line format: 'Aditi,88 ,Rohan,76'"
      }
    ]
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
      "icon": "\ud83c\udfdb\ufe0f"
    },
    "tasks": [
      {
        "id": "d9-t1",
        "title": "Task 1: Question 1",
        "question": "Create a `Student` class with `name`, `sap_id`, and marks in `phy`, `chem`, `maths`. Create 3 objects and display details of all students. A class groups related data and behavior. We create objects from the same blueprint to represent different students.",
        "explanation": "A class groups related data and behavior. We create objects from the same blueprint to represent different students.",
        "formula": "",
        "codeSnippet": "class Student:\n    def __init__(self, name, sap_id, marks):\n        self.name = name\n        self.sap_id = sap_id\n        self.marks = marks\n\n    def display(self):\n        print(f\"Name: {self.name}, SAP ID: {self.sap_id}, Marks: {self.marks}\")\n\n\nstudents = [\n    Student(\"Riya\", \"5001\", {\"phy\": 78, \"chem\": 67, \"maths\": 81}),\n    Student(\"Kunal\", \"5002\", {\"phy\": 88, \"chem\": 92, \"maths\": 85}),\n    Student(\"Meera\", \"5003\", {\"phy\": 69, \"chem\": 73, \"maths\": 64}),\n]\n\nfor student in students:\n    student.display()",
        "expectedOutput": "Name: Riya, SAP ID: 5001, Marks: {'phy': 78, 'chem': 67, 'maths': 81}\nName: Kunal, SAP ID: 5002, Marks: {'phy': 88, 'chem': 92, 'maths': 85}\nName: Meera, SAP ID: 5003, Marks: {'phy': 69, 'chem': 73, 'maths': 64}"
      },
      {
        "id": "d9-t2",
        "title": "Task 2: Question 2",
        "question": "Add constructor-based initialization for student details and implement methods: - `display()` for student details - `marks_percentage()` for percentage of each student - `result()` where pass condition is marks > 40 in each subject Also write a function to find class average. Methods encapsulate operations on object data. A separate function computes class-level statistics from all student objects.",
        "explanation": "Methods encapsulate operations on object data. A separate function computes class-level statistics from all student objects.",
        "formula": "",
        "codeSnippet": "class StudentRecord:\n    def __init__(self, name, sap_id, marks):\n        self.name = name\n        self.sap_id = sap_id\n        self.marks = marks\n\n    def display(self):\n        print(f\"Name: {self.name} | SAP ID: {self.sap_id} | Marks: {self.marks}\")\n\n    def marks_percentage(self):\n        return sum(self.marks.values()) / len(self.marks)\n\n    def result(self):\n        return \"Pass\" if all(mark > 40 for mark in self.marks.values()) else \"Fail\"\n\n\ndef class_average(records):\n    return sum(record.marks_percentage() for record in records) / len(records)\n\n\ninput_data = [\n    (\"Riya\", \"5001\", {\"phy\": 78, \"chem\": 67, \"maths\": 81}),\n    (\"Kunal\", \"5002\", {\"phy\": 88, \"chem\": 92, \"maths\": 85}),\n    (\"Meera\", \"5003\", {\"phy\": 39, \"chem\": 73, \"maths\": 64}),\n]\n\nrecords = [StudentRecord(name, sap_id, marks) for name, sap_id, marks in input_data]\n\nfor record in records:\n    record.display()\n    print(\"Percentage:\", f\"{record.marks_percentage():.2f}%\")\n    print(\"Result:\", record.result())\n    print(\"-\" * 45)\n\nprint(\"Class average percentage:\", f\"{class_average(records):.2f}%\")",
        "expectedOutput": "Name: Riya | SAP ID: 5001 | Marks: {'phy': 78, 'chem': 67, 'maths': 81}\nPercentage: 75.33%\nResult: Pass\n---------------------------------------------\nName: Kunal | SAP ID: 5002 | Marks: {'phy': 88, 'chem': 92, 'maths': 85}\nPercentage: 88.33%\nResult: Pass\n---------------------------------------------\nName: Meera | SAP ID: 5003 | Marks: {'phy': 39, 'chem': 73, 'maths': 64}\nPercentage: 58.67%\nResult: Fail\n---------------------------------------------\nClass average percentage: 74.11%"
      },
      {
        "id": "d9-t3",
        "title": "Task 3: Question 3",
        "question": "Create programs to implement different types of inheritance. Inheritance helps us reuse and extend behavior from parent classes. Below examples show single, multilevel, and multiple inheritance.",
        "explanation": "Inheritance helps us reuse and extend behavior from parent classes. Below examples show single, multilevel, and multiple inheritance.",
        "formula": "",
        "codeSnippet": "# Single inheritance\nclass Person:\n    def introduce(self):\n        print(\"I am a person.\")\n\n\nclass Teacher(Person):\n    def subject(self):\n        print(\"I teach Python.\")\n\n\n# Multilevel inheritance\nclass Animal:\n    def breathe(self):\n        print(\"Breathing...\")\n\n\nclass Mammal(Animal):\n    def feed_milk(self):\n        print(\"Feeding milk...\")\n\n\nclass Dog(Mammal):\n    def bark(self):\n        print(\"Woof!\")\n\n\n# Multiple inheritance\nclass Writer:\n    def write(self):\n        print(\"Writing an article.\")\n\n\nclass Speaker:\n    def speak(self):\n        print(\"Speaking at an event.\")\n\n\nclass AuthorSpeaker(Writer, Speaker):\n    pass\n\n\nprint(\"Single Inheritance:\")\nt = Teacher()\nt.introduce()\nt.subject()\n\nprint(\"Multilevel Inheritance:\")\nd = Dog()\nd.breathe()\nd.feed_milk()\nd.bark()\n\nprint(\"Multiple Inheritance:\")\nas_role = AuthorSpeaker()\nas_role.write()\nas_role.speak()",
        "expectedOutput": "Single Inheritance:\nI am a person.\nI teach Python.\nMultilevel Inheritance:\nBreathing...\nFeeding milk...\nWoof!\nMultiple Inheritance:\nWriting an article.\nSpeaking at an event."
      },
      {
        "id": "d9-t4",
        "title": "Task 4: Question 4",
        "question": "Create a class to implement method overriding. Method overriding lets a child class provide its own implementation of a method that already exists in the parent class.",
        "explanation": "Method overriding lets a child class provide its own implementation of a method that already exists in the parent class.",
        "formula": "",
        "codeSnippet": "class Shape:\n    def describe(self):\n        print(\"This is a generic shape.\")\n\n    def area(self):\n        return 0\n\n\nclass Rectangle(Shape):\n    def __init__(self, length, breadth):\n        self.length = length\n        self.breadth = breadth\n\n    def describe(self):\n        print(\"This is a rectangle.\")\n\n    def area(self):\n        return self.length * self.breadth\n\n\nshape = Shape()\nrectangle = Rectangle(10, 5)\n\nshape.describe()\nprint(\"Shape area:\", shape.area())\n\nrectangle.describe()\nprint(\"Rectangle area:\", rectangle.area())",
        "expectedOutput": "This is a generic shape.\nShape area: 0\nThis is a rectangle.\nRectangle area: 50"
      },
      {
        "id": "d9-t5",
        "title": "Task 5: Question 5",
        "question": "Create a class for operator overloading which adds two `Point` objects where each point has `x` and `y` values. Example: - `P1(x=10, y=20)` - `P2(x=12, y=15)` - `P3 = P1 + P2` gives `P3(x=22, y=35)` The special method `__add__` is overloaded so `+` works directly on `Point` objects.",
        "explanation": "The special method `__add__` is overloaded so `+` works directly on `Point` objects.",
        "formula": "",
        "codeSnippet": "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __add__(self, other):\n        if not isinstance(other, Point):\n            return NotImplemented\n        return Point(self.x + other.x, self.y + other.y)\n\n    def __repr__(self):\n        return f\"Point(x={self.x}, y={self.y})\"\n\n\np1 = Point(10, 20)\np2 = Point(12, 15)\np3 = p1 + p2\n\nprint(\"P1:\", p1)\nprint(\"P2:\", p2)\nprint(\"P3 = P1 + P2:\", p3)",
        "expectedOutput": "P1: Point(x=10, y=20)\nP2: Point(x=12, y=15)\nP3 = P1 + P2: Point(x=22, y=35)"
      }
    ]
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
      "icon": "\ud83d\udd2e"
    },
    "tasks": [
      {
        "id": "d10-t1",
        "title": "Task 1: Question 1",
        "question": "Create an array dataset and find the sum of all elements.",
        "explanation": "Compute the total sum over all dataset elements.",
        "formula": "`total_sum = sum(arr)`",
        "codeSnippet": "arr = [12, 25, 7, 30, 16]\ntotal_sum = sum(arr)\n\nprint(\"Array:\", arr)\nprint(\"Sum of all elements:\", total_sum)",
        "expectedOutput": "Array: [12, 25, 7, 30, 16]\nSum of all elements: 90"
      },
      {
        "id": "d10-t2",
        "title": "Task 2: Question 2",
        "question": "Create a 3x3 matrix. Find row sums, column sums, and 2nd maximum element.",
        "explanation": "Compute sums along rows and columns, and sort unique elements to find 2nd maximum.",
        "formula": "",
        "codeSnippet": "matrix = [\n    [12, 5, 8],\n    [7, 25, 14],\n    [3, 19, 11]\n]\n\nrow_sums = [sum(row) for row in matrix]\ncol_sums = [sum(matrix[r][c] for r in range(3)) for c in range(3)]\nflat_vals = sorted(list(set(val for row in matrix for val in row)))\nsecond_max = flat_vals[-2]\n\nprint(\"Row sums:\", row_sums)\nprint(\"Column sums:\", col_sums)\nprint(\"Second maximum element:\", second_max)",
        "expectedOutput": "Row sums: [25, 46, 33]\nColumn sums: [22, 49, 33]\nSecond maximum element: 19"
      },
      {
        "id": "d10-t3",
        "title": "Task 3: Question 3",
        "question": "Perform matrix multiplication of two 2x2 matrices.",
        "explanation": "Multiply row elements by column elements.",
        "formula": "`C[i][j] = sum(A[i][k] * B[k][j])`",
        "codeSnippet": "matrix_a = [[1, 2], [3, 4]]\nmatrix_b = [[5, 6], [7, 8]]\n\nproduct = [\n    [matrix_a[0][0]*matrix_b[0][0] + matrix_a[0][1]*matrix_b[1][0], matrix_a[0][0]*matrix_b[0][1] + matrix_a[0][1]*matrix_b[1][1]],\n    [matrix_a[1][0]*matrix_b[0][0] + matrix_a[1][1]*matrix_b[1][0], matrix_a[1][0]*matrix_b[0][1] + matrix_a[1][1]*matrix_b[1][1]]\n]\n\nprint(\"Matrix A:\", matrix_a)\nprint(\"Matrix B:\", matrix_b)\nprint(\"A x B Product:\", product)",
        "expectedOutput": "A x B Product: [[19, 22], [43, 50]]"
      },
      {
        "id": "d10-t4",
        "title": "Task 4: Question 4",
        "question": "Compute element-wise exponentiation of base values raised to power values.",
        "explanation": "Applies exponentiation index-by-index.",
        "formula": "`result[i] = base[i] ** power[i]`",
        "codeSnippet": "base_values = [0, 1, 2, 3, 4]\npower_values = [1, 2, 3, 2, 1]\npowered_values = [b ** p for b, p in zip(base_values, power_values)]\n\nprint(\"Base values:\", base_values)\nprint(\"Power values:\", power_values)\nprint(\"Element-wise powers:\", powered_values)",
        "expectedOutput": "Base values: [0, 1, 2, 3, 4]\nPower values: [1, 2, 3, 2, 1]\nElement-wise powers: [0, 1, 8, 9, 4]"
      },
      {
        "id": "d10-t5",
        "title": "Task 5: Question 5",
        "question": "Fetch the first 3 rows of a dataset stream table.",
        "explanation": "Slice the dataset list to retrieve the first three entries.",
        "formula": "",
        "codeSnippet": "exam_data = [\n    {\"name\": \"Anastasia\", \"score\": 12.5, \"qualify\": \"yes\"},\n    {\"name\": \"Dima\", \"score\": 9.0, \"qualify\": \"no\"},\n    {\"name\": \"Katherine\", \"score\": 16.5, \"qualify\": \"yes\"},\n    {\"name\": \"James\", \"score\": None, \"qualify\": \"no\"},\n    {\"name\": \"Emily\", \"score\": 9.0, \"qualify\": \"no\"}\n]\n\nfirst_three = exam_data[:3]\nprint(\"First three rows:\")\nfor row in first_three:\n    print(row)",
        "expectedOutput": "First three rows:\n{'name': 'Anastasia', 'score': 12.5, 'qualify': 'yes'}\n{'name': 'Dima', 'score': 9.0, 'qualify': 'no'}\n{'name': 'Katherine', 'score': 16.5, 'qualify': 'yes'}"
      },
      {
        "id": "d10-t6",
        "title": "Task 6: Question 6",
        "question": "Find and replace missing values in a dataset stream with column average.",
        "explanation": "Replace missing score values using the average score.",
        "formula": "",
        "codeSnippet": "scores = [12.5, 9.0, 16.5, 9.0, 20.0, 14.5, 8.0, 19.0]\navg_score = sum(scores) / len(scores)\n\nraw_stream = [12.5, 9.0, 16.5, None, 9.0, 20.0, 14.5, None, 8.0, 19.0]\nfilled_stream = [s if s is not None else round(avg_score, 2) for s in raw_stream]\n\nprint(\"Filled Scores Stream:\", filled_stream)",
        "expectedOutput": "Filled Scores Stream: [12.5, 9.0, 16.5, 13.56, 9.0, 20.0, 14.5, 13.56, 8.0, 19.0]"
      },
      {
        "id": "d10-t7",
        "title": "Task 7: Question 7",
        "question": "Process monthly sales streams and print analytical bar chart & metrics summary.",
        "explanation": "Visualize monthly sales data using ASCII bar charts and calculate average monthly sales.",
        "formula": "",
        "codeSnippet": "months = [\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\"]\nsales = [120, 140, 135, 160, 175, 190]\navg_sales = sum(sales) / len(sales)\n\nprint(\"Monthly Sales Stream Chart:\")\nfor m, s in zip(months, sales):\n    print(f\"{m}: {'█' * (s // 15)} ({s})\")\n\nprint(f\"Average Monthly Sales: {avg_sales:.2f}\")\nprint(\"Data Observatory Stream Processed!\")",
        "expectedOutput": "Data Observatory Stream Processed!"
      }
    ]
  },
  {
    "id": 11,
    "slug": "dungeon-11",
    "codexNumber": "Codex XI",
    "codexTitle": "Throne of the Shadow Monarch",
    "dungeonName": "Secret Gate: Throne of the Monarch",
    "subtitle": "Ascend human limits, awaken shadow extraction, and claim the Monarch Class.",
    "difficultyStars": 5,
    "xpReward": 9999,
    "skillUnlock": "Shadow Monarch Class (Level 999)",
    "bossName": "The Monarch Anomaly / System Sovereign",
    "description": "The dimensional space cracks open. Beyond the 10th Gate lies the Throne of the Monarch. Cast the ultimate Shadow Extraction spell ('ARISE!') to claim your crown and ascend.",
    "missionObjective": "Instantiate the ShadowMonarch class and invoke monarch.arise() to awaken the shadow army.",
    "initialCode": "# Codex XI - Throne of the Monarch\n# Mission: Invoke the ultimate Shadow Extraction spell\n\nclass ShadowMonarch:\n    def __init__(self, hunter_name):\n        self.name = hunter_name\n        self.shadows = [\"Igris\", \"Tank\", \"Iron\", \"Beru\", \"Bellion\"]\n        \n    def arise(self):\n        return f\"ARISE! {self.name} has ascended to the SHADOW MONARCH CLASS!\"\n\nmonarch = ShadowMonarch(\"Akhanda\")\nprint(monarch.arise())\n",
    "expectedKeywordOrOutput": "SHADOW MONARCH CLASS",
    "solutionHint": "Use print(monarch.arise()) to invoke the Shadow Extraction spell.",
    "theoryNotes": [
      "The Shadow Monarch Class is the highest evolutionary rank in the Nocturnal Codex System.",
      "Shadow Extraction: Converts defeated anomalies into loyal shadow soldiers.",
      "Level 999 unlocks total command over digital dungeons and infinite system mana."
    ],
    "inventoryReward": {
      "id": "monarch-crown",
      "name": "Crown of the Shadow Monarch",
      "description": "Sovereign emblem granting absolute dominion over all Python dungeons (+999 Stats).",
      "icon": "\ud83d\udc51"
    },
    "tasks": [
      {
        "id": "d11-t1",
        "title": "Task 1: Shadow Extraction Incantation",
        "question": "Define the ShadowMonarch class and invoke the arise() method to extract shadow soldiers.",
        "explanation": "Object-Oriented class definition returning the Shadow Monarch ascension proclamation.",
        "formula": "Arise() -> Shadow Monarch",
        "codeSnippet": "class ShadowMonarch:\n    def __init__(self, name):\n        self.name = name\n    def arise(self):\n        return f\"ARISE! {self.name} is the SHADOW MONARCH!\"\n\nm = ShadowMonarch(\"Akhanda\")\nprint(m.arise())",
        "expectedOutput": "ARISE! Akhanda is the SHADOW MONARCH!"
      }
    ]
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
