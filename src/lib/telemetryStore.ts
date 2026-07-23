export interface StudentTelemetry {
  id: string;
  name: string;
  xp: number;
  rank: string;
  level: number;
  completedDungeons: number[];
  currentTask?: string;
  inPenaltyZone?: boolean;
  clanCode?: string; // Backwards compatible
  clanName?: string; // Backwards compatible
  guildCode?: string;
  guildName?: string;
  lastActive: string;
}

export interface GuildData {
  code: string;
  name: string;
  creatorName: string;
  description: string;
  createdAt: string;
  membersCount: number;
  totalXp: number;
  members: string[];
}

export type ClanData = GuildData; // Alias for compatibility

// In-Memory Storage for 100+ Students and Guilds
const studentStore = new Map<string, StudentTelemetry>();
const guildStore = new Map<string, GuildData>();

// Pre-populate default seed Guilds if empty
if (guildStore.size === 0) {
  guildStore.set("GUILD-AHJIN", {
    code: "GUILD-AHJIN",
    name: "Ahjin Shadow Army Guild",
    creatorName: "Sung Jin-Woo",
    description: "Official Shadow Monarch Guild. Master of algorithm extractions.",
    createdAt: new Date().toISOString(),
    membersCount: 15,
    totalXp: 185000,
    members: ["Sung Jin-Woo", "Igris", "Beru"]
  });

  guildStore.set("GUILD-TIGER", {
    code: "GUILD-TIGER",
    name: "White Tiger Guild",
    creatorName: "Baek Yoon-Ho",
    description: "Brute-force optimization special forces.",
    createdAt: new Date().toISOString(),
    membersCount: 12,
    totalXp: 142000,
    members: ["Baek Yoon-Ho"]
  });
}

// Pre-populate mock student telemetry (100+ students)
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
      clanCode: i % 2 === 0 ? "GUILD-AHJIN" : "GUILD-TIGER",
      clanName: i % 2 === 0 ? "Ahjin Shadow Army Guild" : "White Tiger Guild",
      guildCode: i % 2 === 0 ? "GUILD-AHJIN" : "GUILD-TIGER",
      guildName: i % 2 === 0 ? "Ahjin Shadow Army Guild" : "White Tiger Guild",
      lastActive: new Date(Date.now() - (i * 120000)).toISOString()
    });
  }
}

export function saveStudentTelemetry(data: Omit<StudentTelemetry, "lastActive"> & { lastActive?: string }): StudentTelemetry {
  const gCode = data.guildCode || data.clanCode || "";
  const gName = data.guildName || data.clanName || "";

  const record: StudentTelemetry = {
    ...data,
    clanCode: gCode,
    clanName: gName,
    guildCode: gCode,
    guildName: gName,
    lastActive: data.lastActive || new Date().toISOString()
  };
  studentStore.set(data.id || data.name, record);
  return record;
}

export function getAllStudentTelemetry(): StudentTelemetry[] {
  return Array.from(studentStore.values()).sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime());
}

export function createClan(name: string, creatorName: string, description: string): GuildData {
  return createGuild(name, creatorName, description);
}

export function createGuild(name: string, creatorName: string, description: string): GuildData {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const code = `GUILD-${randomNum}`;
  const newGuild: GuildData = {
    code,
    name,
    creatorName,
    description: description || "System Authorized Guild",
    createdAt: new Date().toISOString(),
    membersCount: 1,
    totalXp: 0,
    members: [creatorName]
  };
  guildStore.set(code, newGuild);
  return newGuild;
}

export function joinClan(code: string, studentName: string): GuildData | null {
  return joinGuild(code, studentName);
}

export function joinGuild(code: string, studentName: string): GuildData | null {
  if (!code) return null;
  const inputCode = code.toUpperCase().trim();

  // Flexible matching (supports "GUILD-1234", "1234", "CLAN-1234")
  let targetGuild: GuildData | undefined = guildStore.get(inputCode);

  if (!targetGuild) {
    const rawNumber = inputCode.replace(/^(GUILD-|CLAN-)/i, "");
    for (const [key, value] of guildStore.entries()) {
      const keyNumber = key.replace(/^(GUILD-|CLAN-)/i, "");
      if (key === inputCode || keyNumber === rawNumber || value.name.toLowerCase() === inputCode.toLowerCase()) {
        targetGuild = value;
        break;
      }
    }
  }

  if (!targetGuild) return null;

  if (!targetGuild.members.includes(studentName)) {
    targetGuild.members.push(studentName);
    targetGuild.membersCount = targetGuild.members.length;
  }
  return targetGuild;
}

export function getAllClans(): GuildData[] {
  return getAllGuilds();
}

export function getAllGuilds(): GuildData[] {
  const guilds = Array.from(guildStore.values());
  const students = Array.from(studentStore.values());

  return guilds.map((g) => {
    const guildMembers = students.filter((s) => s.guildCode === g.code || s.clanCode === g.code || g.members.includes(s.name));
    const totalXp = guildMembers.reduce((sum, s) => sum + s.xp, 0);
    return {
      ...g,
      totalXp: Math.max(g.totalXp, totalXp),
      membersCount: Math.max(g.membersCount, guildMembers.length)
    };
  }).sort((a, b) => b.totalXp - a.totalXp);
}
