export interface StudentTelemetry {
  id: string;
  name: string;
  xp: number;
  rank: string;
  level: number;
  completedDungeons: number[];
  currentTask?: string;
  inPenaltyZone?: boolean;
  clanCode?: string;
  clanName?: string;
  lastActive: string;
}

export interface ClanData {
  code: string;
  name: string;
  creatorName: string;
  description: string;
  createdAt: string;
  membersCount: number;
  totalXp: number;
  members: string[];
}

// In-Memory Storage for 100+ Students and Clans (Persists across server lifetime)
const studentStore = new Map<string, StudentTelemetry>();
const clanStore = new Map<string, ClanData>();

// Pre-populate with default seed Clans if empty
if (clanStore.size === 0) {
  clanStore.set("SHADOW-001", {
    code: "SHADOW-001",
    name: "Ahjin Shadow Army",
    creatorName: "Sung Jin-Woo",
    description: "Official Shadow Monarch Guild. Master of algorithm extractions.",
    createdAt: new Date().toISOString(),
    membersCount: 15,
    totalXp: 185000,
    members: ["Sung Jin-Woo", "Igris", "Beru"]
  });

  clanStore.set("TIGER-77", {
    code: "TIGER-77",
    name: "White Tiger Elite",
    creatorName: "Baek Yoon-Ho",
    description: "Brute-force optimization special forces.",
    createdAt: new Date().toISOString(),
    membersCount: 12,
    totalXp: 142000,
    members: ["Baek Yoon-Ho"]
  });
}

// Pre-populate with mock student telemetry to simulate 100+ active students out-of-the-box
if (studentStore.size === 0) {
  const mockRanks = [
    { rank: "S-Class Programmer", level: 100, xp: 15000, cleared: [1,2,3,4,5,6,7,8,9,10] },
    { rank: "A-Class Programmer", level: 75, xp: 11200, cleared: [1,2,3,4,5,6,7,8] },
    { rank: "B-Class Programmer", level: 45, xp: 6800, cleared: [1,2,3,4,5,6] },
    { rank: "C-Class Programmer", level: 18, xp: 3200, cleared: [1,2,3,4] },
    { rank: "D-Class Programmer", level: 5, xp: 900, cleared: [1,2] },
    { rank: "E-Class Programmer", level: 1, xp: 200, cleared: [1] }
  ];

  const firstNames = ["Alex", "Jordan", "Taylor", "Morgan", "Sam", "Chris", "Pat", "Riley", "Devon", "Casey", "Avery", "Dakota", "Reese", "Quinn", "Skyler", "Rowan", "Hayden", "Emerson", "Finley", "Peyton"];
  const lastInitial = ["A.", "B.", "C.", "D.", "E.", "F.", "G.", "H.", "J.", "K.", "L.", "M.", "N.", "P.", "R.", "S.", "T.", "W."];

  for (let i = 1; i <= 105; i++) {
    const fn = firstNames[i % firstNames.length];
    const ln = lastInitial[i % lastInitial.length];
    const name = `${fn} ${ln} (#${1000 + i})`;
    const tier = mockRanks[i % mockRanks.length];
    const isPenalty = i % 17 === 0;

    studentStore.set(`student-${i}`, {
      id: `student-${i}`,
      name,
      xp: tier.xp + (i * 45),
      rank: tier.rank,
      level: tier.level,
      completedDungeons: tier.cleared,
      currentTask: `Experiment ${Math.min(11, tier.cleared.length + 1)} Task ${((i % 4) + 1)}`,
      inPenaltyZone: isPenalty,
      clanCode: i % 2 === 0 ? "SHADOW-001" : "TIGER-77",
      clanName: i % 2 === 0 ? "Ahjin Shadow Army" : "White Tiger Elite",
      lastActive: new Date(Date.now() - (i * 120000)).toISOString()
    });
  }
}

export function saveStudentTelemetry(data: Omit<StudentTelemetry, "lastActive"> & { lastActive?: string }): StudentTelemetry {
  const record: StudentTelemetry = {
    ...data,
    lastActive: data.lastActive || new Date().toISOString()
  };
  studentStore.set(data.id || data.name, record);
  return record;
}

export function getAllStudentTelemetry(): StudentTelemetry[] {
  return Array.from(studentStore.values()).sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime());
}

export function createClan(name: string, creatorName: string, description: string): ClanData {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const code = `CLAN-${randomNum}`;
  const newClan: ClanData = {
    code,
    name,
    creatorName,
    description: description || "System Authorized Clan",
    createdAt: new Date().toISOString(),
    membersCount: 1,
    totalXp: 0,
    members: [creatorName]
  };
  clanStore.set(code, newClan);
  return newClan;
}

export function joinClan(code: string, studentName: string): ClanData | null {
  const clan = clanStore.get(code.toUpperCase().trim());
  if (!clan) return null;

  if (!clan.members.includes(studentName)) {
    clan.members.push(studentName);
    clan.membersCount = clan.members.length;
  }
  return clan;
}

export function getAllClans(): ClanData[] {
  const clans = Array.from(clanStore.values());
  const students = Array.from(studentStore.values());

  // Calculate live total Clan XP dynamically
  return clans.map((c) => {
    const clanMembers = students.filter((s) => s.clanCode === c.code || c.members.includes(s.name));
    const totalXp = clanMembers.reduce((sum, s) => sum + s.xp, 0);
    return {
      ...c,
      totalXp: Math.max(c.totalXp, totalXp),
      membersCount: Math.max(c.membersCount, clanMembers.length)
    };
  }).sort((a, b) => b.totalXp - a.totalXp);
}
