"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  DUNGEONS,
  SKILL_NODES,
  QUESTS,
  INITIAL_ACHIEVEMENTS,
  Dungeon,
  Quest,
  Achievement,
  PracticeTask
} from "@/lib/dungeons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Zap,
  Award,
  Sword,
  BookOpen,
  CheckCircle2,
  Terminal as TerminalIcon,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Lock,
  ChevronRight,
  Flame,
  Cpu,
  Trophy,
  Scroll,
  Briefcase,
  Star,
  Skull,
  UserCheck,
  Volume2,
  VolumeX,
  Music,
  Code2,
  FileCode,
  HelpCircle,
  BarChart3,
  Lightbulb,
  Radio,
  Target,
  ArrowRight,
  Flame as FlameIcon,
  AlertTriangle,
  Download,
  Timer,
  Siren,
  FileCheck,
  Users,
  Medal,
  Crown as CrownIcon,
  Sun,
  Moon,
  Wand2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HunterState {
  completedDungeons: number[]; // dungeon ids
  xp: number;
  completedQuests: string[]; // quest ids
  unlockedAchievements: string[];
  selectedGuild: string;
  selectedAura: "purple" | "gold" | "cyan";
}

// Guild System Definitions
interface Guild {
  id: string;
  name: string;
  leader: string;
  badge: string;
  buff: string;
  description: string;
  color: string;
}

const GUILDS: Guild[] = [
  {
    id: "ahjin",
    name: "Ahjin Guild",
    leader: "Sung Jin-Woo / Monarch Akhanda",
    badge: "👑",
    buff: "+15% Shadow Mana & XP Boost",
    description: "The supreme guild founded by the Shadow Monarch. Master of shadow extractions.",
    color: "border-purple-500/60 bg-purple-950/40 text-purple-300"
  },
  {
    id: "white-tiger",
    name: "White Tiger Guild",
    leader: "Baek Yoon-Ho",
    badge: "🐅",
    buff: "+10% Logical Strength",
    description: "Elite guild specializing in fierce brute-force algorithm optimization.",
    color: "border-amber-500/60 bg-amber-950/40 text-amber-300"
  },
  {
    id: "fame",
    name: "Scavenger Guild",
    leader: "Thomas Andre",
    badge: "🦅",
    buff: "+10% Raw Coding Power",
    description: "Top American guild wielding massive computational power and data structures.",
    color: "border-cyan-500/60 bg-cyan-950/40 text-cyan-300"
  },
  {
    id: "hunters",
    name: "Hunters Guild",
    leader: "Choi Jong-In & Cha Hae-In",
    badge: "🗡️",
    buff: "+10% Intelligence",
    description: "Korea's largest guild known for precision spellcasting and clean architecture.",
    color: "border-emerald-500/60 bg-emerald-950/40 text-emerald-300"
  }
];

// Difficulty Mode Code Corruptor & Generator
function getModeCode(originalCode: string, mode: "easy" | "hard" | "hell"): string {
  if (mode === "easy") return originalCode;
  if (mode === "hell") return "# HELL MODE ACTIVATED: No starter code provided!\n# Write the Python solution from memory...\n\n";

  // HARD MODE: Introduce realistic Python syntax errors for debugging challenge
  let corrupted = originalCode;
  if (corrupted.includes("def ")) {
    corrupted = corrupted.replace("def ", "function "); // JS syntax mistake
  } else if (corrupted.includes(":\n")) {
    corrupted = corrupted.replace(/:\n/g, "\n"); // missing colons
  } else if (corrupted.includes("print(")) {
    corrupted = corrupted.replace("print(", "prnt("); // misspelled function
  } else if (corrupted.includes(" = ")) {
    corrupted = corrupted.replace(" = ", " == "); // assignment bug
  } else {
    corrupted = corrupted.replace("\n", "\n  # SYNTAX ERROR: Broken indentation or missing colon\n");
  }
  return `# HARD MODE: Fix the syntax bugs in this code!\n${corrupted}`;
}

// Penalty Zone Challenges
const PENALTY_CHALLENGES = [
  {
    id: 1,
    title: "Survival Challenge 1: Infinite Loop Escape",
    prompt: "Fix the infinite while loop by incrementing the count variable inside the loop!",
    initialCode: "count = 0\nwhile count < 5:\n    print('Fleeing Giant Centipede step:', count)\n    # BUG: Add count += 1 here to escape!\n",
    expectedKeyword: "count += 1"
  },
  {
    id: 2,
    title: "Survival Challenge 2: Index Out of Bounds Repair",
    prompt: "Access the last element of the centipede_parts list without causing IndexError!",
    initialCode: "parts = ['head', 'thorax', 'abdomen', 'tail']\n# BUG: Fix index to access 'tail' safely\nlast_part = parts[-1]\nprint('Targeting:', last_part)",
    expectedKeyword: "parts[-1]"
  },
  {
    id: 3,
    title: "Survival Challenge 3: Emergency Teleport Spell",
    prompt: "Define function teleport_out() that returns 'TELEPORT_SUCCESS' to return to reality!",
    initialCode: "def teleport_out():\n    return 'TELEPORT_SUCCESS'\n\nprint(teleport_out())",
    expectedKeyword: "TELEPORT_SUCCESS"
  }
];

export default function PythonAscensionPage() {
  const [state, setState] = useState<HunterState>({
    completedDungeons: [],
    xp: 0,
    completedQuests: [],
    unlockedAchievements: ["ach-1"],
    selectedGuild: "ahjin",
    selectedAura: "purple"
  });

  const [activeTab, setActiveTab] = useState<"dungeons" | "skills" | "inventory" | "quests" | "achievements" | "sandbox" | "guilds">("dungeons");
  const [activeDungeon, setActiveDungeon] = useState<Dungeon | null>(null);
  const [dungeonMode, setDungeonMode] = useState<"tasks" | "boss" | "theory">("tasks");
  const [difficultyMode, setDifficultyMode] = useState<"easy" | "hard" | "hell">("easy");
  const [selectedTask, setSelectedTask] = useState<PracticeTask | null>(null);
  const [completedTasksInDungeon, setCompletedTasksInDungeon] = useState<string[]>([]);
  const [code, setCode] = useState<string>("");
  const [terminalOutput, setTerminalOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionSuccess, setExecutionSuccess] = useState<boolean | null>(null);
  const [showRankUpModal, setShowRankUpModal] = useState<boolean>(false);
  const [previousRank, setPreviousRank] = useState<string>("E-Class Programmer");
  const [isShaking, setIsShaking] = useState<boolean>(false);

  // Failure tracking & Penalty Zone States
  const [consecutiveFailures, setConsecutiveFailures] = useState<number>(0);
  const [inPenaltyZone, setInPenaltyZone] = useState<boolean>(false);
  const [penaltyTimer, setPenaltyTimer] = useState<number>(60);
  const [penaltyStep, setPenaltyStep] = useState<number>(0);
  const [penaltyCode, setPenaltyCode] = useState<string>(PENALTY_CHALLENGES[0].initialCode);
  const [penaltyOutput, setPenaltyOutput] = useState<string>("");

  // Audio & Music Engine States (Music ON by default)
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [musicPlaying, setMusicPlaying] = useState<boolean>(true);
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.35);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const musicIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const penaltyTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Solo Leveling Soundtracks (Procedural Web Audio API OST Engine)
  const TRACKS = [
    { title: "System Gate Awakening (Dark OST)", tempo: 130, scale: [146.83, 174.61, 220.00, 261.63, 293.66, 349.23, 440.00] }, // D minor dark
    { title: "Monarch's Domain (Boss Theme)", tempo: 140, scale: [130.81, 155.56, 196.00, 233.08, 261.63, 311.13, 392.00] }, // C minor epic
    { title: "Shadow Extraction (Battle Pulse)", tempo: 150, scale: [164.81, 196.00, 246.94, 293.66, 329.63, 392.00, 493.88] } // E minor intense
  ];

  // Initialize Web Audio Context
  const getAudioContext = () => {
    if (!audioCtxRef.current && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // User interaction listener to resume audio context & enable default playback
  useEffect(() => {
    const handleFirstInteraction = () => {
      const ctx = getAudioContext();
      if (ctx && ctx.state === "suspended") {
        ctx.resume();
      }
    };

    window.addEventListener("pointerdown", handleFirstInteraction);
    window.addEventListener("keydown", handleFirstInteraction);
    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, []);

  // Penalty Zone Timer Loop
  useEffect(() => {
    if (inPenaltyZone) {
      penaltyTimerRef.current = setInterval(() => {
        setPenaltyTimer((prev) => {
          if (prev <= 1) {
            clearInterval(penaltyTimerRef.current as NodeJS.Timeout);
            handlePenaltyTimeOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (penaltyTimerRef.current) clearInterval(penaltyTimerRef.current);
    }
    return () => {
      if (penaltyTimerRef.current) clearInterval(penaltyTimerRef.current);
    };
  }, [inPenaltyZone]);

  const handlePenaltyTimeOut = () => {
    playSound("fail");
    setInPenaltyZone(false);
    setConsecutiveFailures(0);
    setState((prev) => ({ ...prev, xp: Math.max(0, prev.xp - 50) }));
    alert("🚨 PENALTY ZONE TIME EXPIRED! You failed to escape the Desert of Giant Centipedes (-50 XP Penalty). Teleported back to safety.");
  };

  const triggerPenaltyZone = () => {
    playSound("fail");
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 2000);
    setInPenaltyZone(true);
    setPenaltyTimer(60);
    setPenaltyStep(0);
    setPenaltyCode(PENALTY_CHALLENGES[0].initialCode);
    setPenaltyOutput("🚨 SYSTEM PENALTY ZONE ACTIVATED!\nYou are trapped in the Desert of Giant Centipedes!\nSolve 3 survival coding challenges before time expires to escape!");
  };

  const handleRunPenaltyCode = () => {
    playSound("click");
    const currentChallenge = PENALTY_CHALLENGES[penaltyStep];
    const isPassed = penaltyCode.includes(currentChallenge.expectedKeyword) || penaltyCode.toLowerCase().includes("teleport_success");

    if (isPassed) {
      playSound("success");
      if (penaltyStep >= 2) {
        // All 3 survival challenges cleared!
        playSound("levelUp");
        setInPenaltyZone(false);
        setConsecutiveFailures(0);
        setState((prev) => ({ ...prev, xp: prev.xp + 200 }));
        alert("🎉 SURVIVAL SUCCESSFUL! You escaped the Penalty Zone and earned +200 System XP!");
      } else {
        const nextStep = penaltyStep + 1;
        setPenaltyStep(nextStep);
        setPenaltyCode(PENALTY_CHALLENGES[nextStep].initialCode);
        setPenaltyOutput(`>>> SURVIVAL CHALLENGE ${penaltyStep + 1} CLEARED! <<<\nAdvancing to Challenge ${nextStep + 1}...`);
      }
    } else {
      playSound("fail");
      setPenaltyOutput(`[ERROR]: Survival criteria missing!\nPrompt: ${currentChallenge.prompt}`);
    }
  };

  // 1-Click Official Hunter Lab Assignment Exporter (Markdown format)
  const exportLabReport = () => {
    playSound("click");
    const dateStr = new Date().toLocaleDateString();
    const rankInfo = getRankInfo(state.completedDungeons.length);

    let md = `# NOCTURNAL CODEX — OFFICIAL PYTHON LAB ASSIGNMENT REPORT\n`;
    md += `**Classification:** Restricted Academic Submission  \n`;
    md += `**Date:** ${dateStr}  \n`;
    md += `**Hunter Name:** Akhanda (Hunter ID #041)  \n`;
    md += `**System Rank:** ${rankInfo.rank} (Level ${rankInfo.level})  \n`;
    md += `**Total System Experience:** ${state.xp} XP  \n`;
    md += `**Dungeons Cleared:** ${state.completedDungeons.length} / 11  \n\n`;

    md += `---  \n\n`;
    md += `## 📊 LAB EXPERIMENT SUMMARY TABLE\n\n`;
    md += `| Experiment | Title | Practice Tasks | Status |\n`;
    md += `| :--- | :--- | :--- | :--- |\n`;

    DUNGEONS.slice(0, 10).forEach((d) => {
      const isCleared = state.completedDungeons.includes(d.id);
      md += `| **Experiment ${d.id}** | ${d.dungeonName} | ${d.tasks.length} Tasks | ${isCleared ? "✅ CLEARED" : "⏳ IN PROGRESS"} |\n`;
    });

    md += `\n---\n\n## 📝 DETAILED EXPERIMENT CODE LOGS\n\n`;

    DUNGEONS.slice(0, 10).forEach((d) => {
      md += `### Experiment ${d.id}: ${d.dungeonName}\n`;
      md += `**Objective:** ${d.missionObjective}  \n\n`;

      d.tasks.forEach((t, idx) => {
        md += `#### Task ${idx + 1}: ${t.title}\n`;
        md += `**Question:** ${t.question}  \n`;
        if (t.formula) md += `**Formula:** \`${t.formula}\`  \n`;
        md += `\`\`\`python\n${t.codeSnippet}\n\`\`\`\n`;
        md += `**Expected Output:** \`${t.expectedOutput}\`  \n\n`;
      });
      md += `\n`;
    });

    md += `---\n\n## 👨‍🏫 PROFESSOR EVALUATION & SIGNATURE BLOCK\n\n`;
    md += `| Evaluation Criteria | Score / Status |\n`;
    md += `| :--- | :--- |\n`;
    md += `| **Lab Execution & Output Accuracy** | 100 / 100 |\n`;
    md += `| **Code Optimization & Styling** | Pass |\n`;
    md += `| **System Hunter Level Verification** | ${rankInfo.title} (Level ${rankInfo.level}) |\n\n`;
    md += `**Professor Signature:** ___________________________  \n`;
    md += `**Grade Assigned:** A+ (S-Rank Distinction)  \n`;

    // Trigger download
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Python_Lab_Assignment_Report_Hunter_041.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Sound FX Generator
  const playSound = (type: "click" | "success" | "fail" | "levelUp" | "monarchArise") => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      const effectiveVol = isMuted ? 0 : volume;

      if (type === "click") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
        gain.gain.setValueAtTime(0.08 * effectiveVol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === "success") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.1);
        osc.frequency.setValueAtTime(783.99, now + 0.2);
        osc.frequency.setValueAtTime(1046.50, now + 0.3);
        gain.gain.setValueAtTime(0.12 * effectiveVol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === "fail") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(140, now + 0.25);
        gain.gain.setValueAtTime(0.12 * effectiveVol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === "levelUp") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(554.37, now + 0.12);
        osc.frequency.setValueAtTime(659.25, now + 0.24);
        osc.frequency.setValueAtTime(880, now + 0.36);
        gain.gain.setValueAtTime(0.2 * effectiveVol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === "monarchArise") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(110, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 1.2);
        gain.gain.setValueAtTime(0.3 * effectiveVol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
        osc.start(now);
        osc.stop(now + 1.5);
      }
    } catch (e) {
      // Audio fallback catch
    }
  };

  // Solo Leveling Procedural Music Sequencer Loop
  const startMusic = () => {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (musicIntervalRef.current) clearInterval(musicIntervalRef.current);

    const track = TRACKS[currentTrack];
    const stepTime = (60 / track.tempo) * 250; // 16th note timing in ms
    let step = 0;

    musicIntervalRef.current = setInterval(() => {
      if (!musicPlaying) return;
      try {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const subOsc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1200 + Math.sin(step / 4) * 800, now);

        osc.connect(filter);
        subOsc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        const effectiveVol = isMuted ? 0 : volume;

        // Scale arpeggiator notes
        const noteIndex = step % track.scale.length;
        const freq = track.scale[noteIndex];

        osc.type = step % 4 === 0 ? "sawtooth" : "square";
        osc.frequency.setValueAtTime(freq * (step % 2 === 0 ? 1 : 2), now);

        // Deep Bass Pulse on quarter beats
        if (step % 4 === 0) {
          subOsc.type = "sine";
          subOsc.frequency.setValueAtTime(track.scale[0] / 2, now);
          gain.gain.setValueAtTime(0.12 * effectiveVol, now);
        } else {
          gain.gain.setValueAtTime(0.04 * effectiveVol, now);
        }

        gain.gain.exponentialRampToValueAtTime(0.001, now + (stepTime / 1000) * 0.9);

        osc.start(now);
        subOsc.start(now);
        osc.stop(now + (stepTime / 1000) * 0.9);
        subOsc.stop(now + (stepTime / 1000) * 0.9);

        step++;
      } catch (e) {
        // Audio error handling
      }
    }, stepTime);
  };

  // Toggle Background Music
  const toggleMusic = () => {
    playSound("click");
    if (musicPlaying) {
      setMusicPlaying(false);
      if (musicIntervalRef.current) clearInterval(musicIntervalRef.current);
    } else {
      setMusicPlaying(true);
    }
  };

  // Toggle Mute (Mutes both OST and Sound FX)
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  // Restart Music on track change, toggle, or mute change
  useEffect(() => {
    if (musicPlaying) {
      startMusic();
    } else {
      if (musicIntervalRef.current) clearInterval(musicIntervalRef.current);
    }
    return () => {
      if (musicIntervalRef.current) clearInterval(musicIntervalRef.current);
    };
  }, [musicPlaying, currentTrack, volume, isMuted]);

  // Load state from local storage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("python_ascension_state");
      if (saved) {
        const parsed = JSON.parse(saved);
        setState(parsed);
      }
    } catch (e) {
      console.error("Failed to load saved state", e);
    }
  }, []);

  // Save state whenever it updates
  useEffect(() => {
    try {
      localStorage.setItem("python_ascension_state", JSON.stringify(state));
    } catch (e) {
      console.error("Failed to save state", e);
    }
  }, [state]);

  // Derived Hunter Statistics
  const dungeonsClearedCount = state.completedDungeons.length;

  const getRankInfo = (cleared: number) => {
    if (cleared >= 11) return { rank: "👑 SHADOW MONARCH (LV. 999)", level: 999, title: "God-Class System Sovereign", color: "text-amber-300 border-purple-500 bg-gradient-to-r from-purple-950 via-slate-900 to-amber-950 shadow-purple-500/50" };
    if (cleared >= 10) return { rank: "S-Class Programmer", level: 100, title: "Shadow Programmer", color: "text-purple-400 border-purple-500 bg-purple-950/40 shadow-purple-500/30" };
    if (cleared >= 8) return { rank: "A-Class Programmer", level: 75, title: "Data Alchemist", color: "text-amber-400 border-amber-500 bg-amber-950/40 shadow-amber-500/30" };
    if (cleared >= 6) return { rank: "B-Class Programmer", level: 45, title: "Code Weaver", color: "text-blue-400 border-blue-500 bg-blue-950/40 shadow-blue-500/30" };
    if (cleared >= 3) return { rank: "C-Class Programmer", level: 18, title: "Logic Specialist", color: "text-emerald-400 border-emerald-500 bg-emerald-950/40 shadow-emerald-500/30" };
    if (cleared >= 1) return { rank: "D-Class Programmer", level: 5, title: "Apprentice Hunter", color: "text-cyan-400 border-cyan-500 bg-cyan-950/40 shadow-cyan-500/30" };
    return { rank: "E-Class Programmer", level: 1, title: "Novice Trainee", color: "text-slate-400 border-slate-600 bg-slate-900/60 shadow-slate-500/10" };
  };

  const currentRank = getRankInfo(dungeonsClearedCount);

  // Guild dynamic information
  const userGuild = GUILDS.find((g) => g.id === state.selectedGuild) || GUILDS[0];

  // Dynamic Leaderboard list
  const getLeaderboardData = () => {
    const userEntry = {
      rank: dungeonsClearedCount >= 11 ? 1 : dungeonsClearedCount >= 10 ? 2 : 4,
      name: "Akhanda (You)",
      guild: userGuild.name,
      hunterRank: currentRank.rank,
      level: currentRank.level,
      xp: state.xp,
      isUser: true
    };

    const legendaryHunters = [
      { rank: dungeonsClearedCount >= 11 ? 2 : 1, name: "Sung Jin-Woo", guild: "Ahjin Guild", hunterRank: "Shadow Monarch", level: 100, xp: 25000, isUser: false },
      { rank: 3, name: "Thomas Andre", guild: "Scavenger Guild", hunterRank: "National Level Hunter", level: 98, xp: 22400, isUser: false },
      { rank: 5, name: "Liu Zhigang", guild: "China Association", hunterRank: "National Level Hunter", level: 95, xp: 21000, isUser: false },
      { rank: 6, name: "Cha Hae-In", guild: "Hunters Guild", hunterRank: "S-Rank Master", level: 92, xp: 19500, isUser: false },
      { rank: 7, name: "Baek Yoon-Ho", guild: "White Tiger Guild", hunterRank: "S-Rank Beastmaster", level: 88, xp: 18200, isUser: false },
      { rank: 8, name: "Choi Jong-In", guild: "Hunters Guild", hunterRank: "S-Rank Mage", level: 85, xp: 17100, isUser: false },
      { rank: 9, name: "Go Gun-Hee", guild: "Korean Association", hunterRank: "S-Rank Chairman", level: 82, xp: 16000, isUser: false }
    ];

    const all = [userEntry, ...legendaryHunters].sort((a, b) => b.level - a.level || b.xp - a.xp);
    return all.map((entry, idx) => ({ ...entry, rank: idx + 1 }));
  };

  // Dynamic Hunter Stats based on progress
  const hunterStats = {
    strength: 10 + dungeonsClearedCount * 15 + state.completedQuests.length * 3,
    intelligence: 20 + dungeonsClearedCount * 22 + state.completedQuests.length * 5,
    coding: 15 + dungeonsClearedCount * 30 + state.completedQuests.length * 7,
    creativity: 10 + dungeonsClearedCount * 18 + state.completedQuests.length * 4,
  };

  const handleOpenDungeon = (dungeon: Dungeon) => {
    playSound("click");
    setActiveDungeon(dungeon);
    setDungeonMode("tasks"); // Start on Phase 1: Small Missions
    setCompletedTasksInDungeon([]);

    if (dungeon.tasks.length > 0) {
      setSelectedTask(dungeon.tasks[0]);
      setCode(getModeCode(dungeon.tasks[0].codeSnippet, difficultyMode));
      setTerminalOutput(`[PHASE 1: SMALL MISSIONS | MODE: ${difficultyMode.toUpperCase()}]\nTask 1: ${dungeon.tasks[0].title}\nClick 'Run Python Program' to execute task code.`);
    } else {
      setSelectedTask(null);
      setCode(getModeCode(dungeon.initialCode, difficultyMode));
    }
    setExecutionSuccess(null);
  };

  const handleSelectTask = (task: PracticeTask) => {
    playSound("click");
    setSelectedTask(task);
    setCode(getModeCode(task.codeSnippet, difficultyMode));
    setTerminalOutput(`[SMALL MISSION SELECTED | MODE: ${difficultyMode.toUpperCase()}]: ${task.title}\nPress 'Run Python Program' to test implementation.`);
    setExecutionSuccess(null);
  };

  const handleSwitchToBoss = () => {
    if (!activeDungeon) return;
    playSound("click");
    setDungeonMode("boss");
    setSelectedTask(null);
    setCode(getModeCode(activeDungeon.initialCode, difficultyMode));
    setTerminalOutput(`[PHASE 2: FINAL BOSS BATTLE | MODE: ${difficultyMode.toUpperCase()}]\nBoss: ${activeDungeon.bossName || "Dungeon Core Anomaly"}\nObjective: ${activeDungeon.missionObjective}\nRun code to defeat the boss!`);
    setExecutionSuccess(null);
  };

  const handleDifficultyModeChange = (mode: "easy" | "hard" | "hell") => {
    playSound("click");
    setDifficultyMode(mode);
    const targetCode = dungeonMode === "boss"
      ? (activeDungeon ? activeDungeon.initialCode : "")
      : (selectedTask ? selectedTask.codeSnippet : "");

    setCode(getModeCode(targetCode, mode));
    setTerminalOutput(`[DIFFICULTY CHANGED TO: ${mode.toUpperCase()}]\n${mode === "easy" ? "Code template provided." : mode === "hard" ? "Code provided with syntax bugs! Debug to fix." : "No code provided! Write from scratch."}`);
  };

  const triggerScreenShake = () => {
    setIsShaking(true);
    playSound("monarchArise");
    setTimeout(() => {
      setIsShaking(false);
    }, 2500);
  };

  const handleRunCode = () => {
    if (!activeDungeon && activeTab !== "sandbox") return;
    playSound("click");
    setIsRunning(true);
    setTerminalOutput("Initializing System Python Interpreter v3.13...\nExecuting script...");

    setTimeout(() => {
      setIsRunning(false);

      if (activeTab === "sandbox") {
        setTerminalOutput((prev) =>
          prev + "\n\n>>> SCRIPT EXECUTED SUCCESSFULLY <<<\n" +
          "[OUTPUT]: Script ran cleanly in System Sandbox.\n\n" +
          "Process finished with exit code 0."
        );
        playSound("success");
        setExecutionSuccess(true);
        return;
      }

      if (!activeDungeon) return;

      const isTaskMode = dungeonMode === "tasks" && selectedTask;
      const expectedTarget = isTaskMode ? selectedTask.expectedOutput : activeDungeon.expectedKeywordOrOutput;

      // Ensure code does NOT contain corrupted markers in Hard Mode before passing
      const hasCorruptedBugs = code.includes("function ") || code.includes("prnt(") || code.includes("HARD MODE: Fix");
      const isSuccess = !hasCorruptedBugs && (
        code.toLowerCase().includes(expectedTarget.toLowerCase()) ||
        code.includes("print") || code.includes("def") || code.includes("class") || code.includes("arise")
      );

      // XP Multiplier based on Difficulty Mode
      const multiplier = difficultyMode === "hell" ? 2.0 : difficultyMode === "hard" ? 1.5 : 1.0;
      const calculatedXp = Math.round(activeDungeon.xpReward * multiplier);

      if (isSuccess) {
        setExecutionSuccess(true);
        setConsecutiveFailures(0); // Reset failures on success

        if (isTaskMode && selectedTask) {
          playSound("success");
          if (!completedTasksInDungeon.includes(selectedTask.id)) {
            setCompletedTasksInDungeon([...completedTasksInDungeon, selectedTask.id]);
          }
          setTerminalOutput((prev) =>
            prev + "\n\n>>> SMALL MISSION PASSED <<<\n[SYSTEM]: Code criteria validated.\n" +
            `[PROGRESS]: ${completedTasksInDungeon.length + 1} / ${activeDungeon.tasks.length} Small Missions Cleared!`
          );
        } else {
          // Boss Battle Cleared!
          setTerminalOutput((prev) =>
            prev + "\n\n>>> BOSS DEFEATED! DUNGEON CLEARED! <<<\n[SYSTEM]: Critical hit! Boss anomaly eliminated.\n" +
            `[REWARD (${difficultyMode.toUpperCase()} MODE ${multiplier}x)]: +${calculatedXp} XP Gained!`
          );

          // Check if dungeon 11 (Shadow Monarch) or other dungeon newly cleared
          if (!state.completedDungeons.includes(activeDungeon.id)) {
            const oldRank = getRankInfo(state.completedDungeons.length).rank;
            const newDungeons = [...state.completedDungeons, activeDungeon.id];
            const newXp = state.xp + calculatedXp;
            const newRank = getRankInfo(newDungeons.length).rank;

            // Trigger Screen Shake for Dungeon 11 Monarch Ascension
            if (activeDungeon.id === 11) {
              triggerScreenShake();
            } else {
              playSound("success");
            }

            // Achievements check
            const updatedAchievements = [...state.unlockedAchievements];
            if (activeDungeon.id === 4 && !updatedAchievements.includes("ach-2")) updatedAchievements.push("ach-2");
            if (activeDungeon.id === 6 && !updatedAchievements.includes("ach-3")) updatedAchievements.push("ach-3");
            if (activeDungeon.id === 9 && !updatedAchievements.includes("ach-4")) updatedAchievements.push("ach-4");
            if (newDungeons.length >= 10 && !updatedAchievements.includes("ach-5")) updatedAchievements.push("ach-5");

            setState({
              ...state,
              completedDungeons: newDungeons,
              xp: newXp,
              unlockedAchievements: updatedAchievements
            });

            if (newRank !== oldRank) {
              setPreviousRank(oldRank);
              setShowRankUpModal(true);
            }
          }
        }
      } else {
        playSound("fail");
        setExecutionSuccess(false);

        // Track consecutive failures for Penalty Zone trigger
        const nextFailures = consecutiveFailures + 1;
        setConsecutiveFailures(nextFailures);

        if (nextFailures >= 3) {
          triggerPenaltyZone();
        } else {
          setTerminalOutput((prev) =>
            prev + `\n\n[ERROR]: Execution completed with syntax error or missing criteria. (Failure ${nextFailures}/3)\n` +
            (hasCorruptedBugs ? "[SYSTEM ERROR]: Syntax bugs remaining in code! Fix function/print keywords and missing colons.\n" : "") +
            `[WARNING]: 3 consecutive failures will trigger System Penalty Zone!\n` +
            `[HINT]: ${activeDungeon.solutionHint}`
          );
        }
      }
    }, 1000);
  };

  const toggleQuest = (questId: string, rewardXp: number) => {
    playSound("click");
    const isCompleted = state.completedQuests.includes(questId);
    if (isCompleted) {
      setState({
        ...state,
        completedQuests: state.completedQuests.filter((id) => id !== questId),
        xp: Math.max(0, state.xp - rewardXp)
      });
    } else {
      playSound("success");
      setState({
        ...state,
        completedQuests: [...state.completedQuests, questId],
        xp: state.xp + rewardXp
      });
    }
  };

  const resetProgress = () => {
    playSound("click");
    if (confirm("Are you sure you want to reset all Python Ascension progress?")) {
      const initial: HunterState = {
        completedDungeons: [],
        xp: 0,
        completedQuests: [],
        unlockedAchievements: ["ach-1"],
        selectedGuild: "ahjin",
        selectedAura: "purple"
      };
      setState(initial);
      localStorage.setItem("python_ascension_state", JSON.stringify(initial));
    }
  };

  return (
    <div className={cn("min-h-screen bg-slate-950 text-slate-100 font-sans pb-20 selection:bg-cyan-500 selection:text-slate-950 transition-transform duration-100", isShaking && "animate-shake")}>
      {/* Background Cyber Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-25" />

      <div className="container mx-auto px-4 pt-8 relative z-10 max-w-7xl">
        {/* System Archives Header Banner */}
        <div className="mb-8 p-6 md:p-8 rounded-2xl bg-slate-900/90 border border-cyan-500/40 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 mb-3">
                <span>NOCTURNAL CODEX DIGITAL ARCHIVES ENTRY #001</span>
                <span className="text-slate-500">|</span>
                <span className="text-amber-400 font-bold">CLASSIFICATION: RESTRICTED</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white flex items-center gap-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                  THE SYSTEM: PYTHON ASCENSION
                </span>
              </h1>
              <p className="text-slate-400 mt-2 max-w-2xl text-sm md:text-base leading-relaxed">
                Humanity has discovered mysterious Gates. Customize system aura themes, join Hunter Guilds, compete on the Monarch Leaderboard, and export your lab report to ascend to the <strong className="text-amber-400">SHADOW MONARCH CLASS</strong>!
              </p>
              
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <Button
                  onClick={exportLabReport}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold gap-2 text-xs rounded-xl shadow-lg shadow-emerald-500/20"
                >
                  <Download className="w-4 h-4" /> 📄 Export Official Lab Report (.md)
                </Button>

                <Button
                  variant="outline"
                  onClick={triggerPenaltyZone}
                  className="border-red-500/40 text-red-400 hover:bg-red-950/60 font-mono text-xs gap-1.5 rounded-xl"
                >
                  <Siren className="w-3.5 h-3.5 text-red-400 animate-pulse" /> Test Penalty Zone
                </Button>
              </div>
            </div>

            {/* Solo Leveling OST Music Player HUD */}
            <div className="p-4 rounded-xl bg-slate-950/90 border border-cyan-500/40 shadow-lg w-full lg:w-80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <Radio className={cn("w-4 h-4", musicPlaying && !isMuted && "animate-pulse text-emerald-400")} />
                  <span>SOLO LEVELING OST PLAYER</span>
                </div>
                <Badge variant="outline" className={cn("text-[10px] font-mono", musicPlaying && !isMuted ? "border-emerald-500/40 text-emerald-300 bg-emerald-950/50" : "border-slate-800 text-slate-500")}>
                  {isMuted ? "MUTED" : musicPlaying ? "PLAYING" : "PAUSED"}
                </Badge>
              </div>

              <div className="text-xs font-bold text-white truncate flex items-center gap-2 bg-slate-900 p-2 rounded-lg border border-slate-800">
                <Music className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span className="truncate">{TRACKS[currentTrack].title}</span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <Button
                  size="sm"
                  onClick={toggleMusic}
                  className={cn("h-8 flex-1 gap-1.5 text-xs font-bold rounded-lg", musicPlaying && !isMuted ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950" : "bg-cyan-500 hover:bg-cyan-400 text-slate-950")}
                >
                  {musicPlaying ? <Pause className="w-3.5 h-3.5 fill-slate-950" /> : <Play className="w-3.5 h-3.5 fill-slate-950" />}
                  {musicPlaying ? "Pause OST" : "Play OST"}
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => { playSound("click"); setCurrentTrack((prev) => (prev + 1) % TRACKS.length); }}
                  className="h-8 text-xs font-mono border-slate-800 text-slate-300 hover:border-cyan-400"
                >
                  Next Track
                </Button>

                <Button
                  size="icon"
                  variant={isMuted ? "destructive" : "ghost"}
                  onClick={toggleMute}
                  className={cn("h-8 w-8 transition-colors", isMuted ? "bg-red-950 text-red-400 border border-red-500/40" : "text-cyan-400 hover:text-white")}
                  title={isMuted ? "Unmute Audio" : "Mute Audio"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Hunter Identity HUD Card Banner (with Toggleable System Auras) */}
        <div className={cn(
          "mb-8 p-5 rounded-2xl backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-500 border",
          state.selectedAura === "purple"
            ? "border-purple-500/80 shadow-2xl shadow-purple-500/30 bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80"
            : state.selectedAura === "gold"
              ? "border-amber-400/80 shadow-2xl shadow-amber-500/30 bg-gradient-to-r from-amber-950/80 via-slate-900 to-yellow-950/80"
              : "border-cyan-400/80 shadow-2xl shadow-cyan-500/30 bg-gradient-to-r from-cyan-950/80 via-slate-900 to-slate-950"
        )}>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/30">
              <Shield className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Akhanda (ID #041)</span>
                <span className="text-slate-600">|</span>
                <span className="text-xs font-mono text-cyan-300 font-bold">Lv. {currentRank.level}</span>
                <span className="text-slate-600">|</span>
                <span className="text-xs font-mono text-purple-400 font-bold">{userGuild.badge} {userGuild.name}</span>
              </div>
              <div className="font-bold text-lg text-white mt-0.5">{currentRank.rank}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            {/* System Aura Theme Selector */}
            <div className="flex items-center gap-1 bg-slate-950/90 p-1.5 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 px-2 flex items-center gap-1">
                <Wand2 className="w-3 h-3 text-purple-400" /> AURA:
              </span>
              <Button
                size="sm"
                onClick={() => { playSound("click"); setState((prev) => ({ ...prev, selectedAura: "purple" })); }}
                className={cn("h-6 text-[10px] font-mono rounded-lg px-2", state.selectedAura === "purple" ? "bg-purple-600 text-white font-bold" : "bg-slate-900 text-slate-400")}
              >
                🟣 Purple
              </Button>
              <Button
                size="sm"
                onClick={() => { playSound("click"); setState((prev) => ({ ...prev, selectedAura: "gold" })); }}
                className={cn("h-6 text-[10px] font-mono rounded-lg px-2", state.selectedAura === "gold" ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-400")}
              >
                🟡 Gold
              </Button>
              <Button
                size="sm"
                onClick={() => { playSound("click"); setState((prev) => ({ ...prev, selectedAura: "cyan" })); }}
                className={cn("h-6 text-[10px] font-mono rounded-lg px-2", state.selectedAura === "cyan" ? "bg-cyan-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-400")}
              >
                🔵 Cyber
              </Button>
            </div>

            <div className="text-center">
              <div className="text-xs text-slate-400 font-mono">Dungeons Cleared</div>
              <div className="text-xl font-bold text-cyan-300 font-mono">{dungeonsClearedCount} / 11</div>
            </div>

            <div className="text-center">
              <div className="text-xs text-slate-400 font-mono">Difficulty Mode</div>
              <Badge className={cn("mt-0.5 text-xs font-bold uppercase", difficultyMode === "easy" ? "bg-emerald-500 text-slate-950" : difficultyMode === "hard" ? "bg-amber-500 text-slate-950" : "bg-red-600 text-white animate-pulse")}>
                {difficultyMode} ({difficultyMode === "hell" ? "2.0x" : difficultyMode === "hard" ? "1.5x" : "1.0x"} XP)
              </Badge>
            </div>

            <div className="text-center">
              <div className="text-xs text-slate-400 font-mono">System Experience</div>
              <div className="text-xl font-bold text-amber-400 font-mono">{state.xp} XP</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 border-b border-slate-800 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant={activeTab === "dungeons" ? "default" : "outline"}
              onClick={() => { playSound("click"); setActiveTab("dungeons"); }}
              className={cn("gap-2 rounded-xl text-sm font-semibold transition-all", activeTab === "dungeons" && "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25")}
            >
              <Sword className="w-4 h-4" /> Dungeons ({dungeonsClearedCount}/11)
            </Button>
            <Button
              variant={activeTab === "guilds" ? "default" : "outline"}
              onClick={() => { playSound("click"); setActiveTab("guilds"); }}
              className={cn("gap-2 rounded-xl text-sm font-semibold transition-all border-purple-500/40 text-purple-300", activeTab === "guilds" && "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/25")}
            >
              <Users className="w-4 h-4" /> Guilds & Leaderboard
            </Button>
            <Button
              variant={activeTab === "skills" ? "default" : "outline"}
              onClick={() => { playSound("click"); setActiveTab("skills"); }}
              className={cn("gap-2 rounded-xl text-sm font-semibold transition-all", activeTab === "skills" && "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25")}
            >
              <Zap className="w-4 h-4" /> Stats & Skill Tree
            </Button>
            <Button
              variant={activeTab === "inventory" ? "default" : "outline"}
              onClick={() => { playSound("click"); setActiveTab("inventory"); }}
              className={cn("gap-2 rounded-xl text-sm font-semibold transition-all", activeTab === "inventory" && "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25")}
            >
              <Briefcase className="w-4 h-4" /> Inventory ({state.completedDungeons.length})
            </Button>
            <Button
              variant={activeTab === "quests" ? "default" : "outline"}
              onClick={() => { playSound("click"); setActiveTab("quests"); }}
              className={cn("gap-2 rounded-xl text-sm font-semibold transition-all", activeTab === "quests" && "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25")}
            >
              <Scroll className="w-4 h-4" /> Quest Log ({state.completedQuests.length}/{QUESTS.length})
            </Button>
            <Button
              variant={activeTab === "achievements" ? "default" : "outline"}
              onClick={() => { playSound("click"); setActiveTab("achievements"); }}
              className={cn("gap-2 rounded-xl text-sm font-semibold transition-all", activeTab === "achievements" && "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25")}
            >
              <Trophy className="w-4 h-4" /> Achievements ({state.unlockedAchievements.length})
            </Button>
            <Button
              variant={activeTab === "sandbox" ? "default" : "outline"}
              onClick={() => { playSound("click"); setActiveTab("sandbox"); }}
              className={cn("gap-2 rounded-xl text-sm font-semibold transition-all border-amber-500/40 text-amber-300", activeTab === "sandbox" && "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25")}
            >
              <Code2 className="w-4 h-4" /> System Sandbox
            </Button>
          </div>

          <Button variant="ghost" size="sm" onClick={resetProgress} className="text-xs text-slate-500 hover:text-red-400">
            <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset Progress
          </Button>
        </div>

        {/* Tab Content: Hunter Guilds & Global Leaderboard */}
        {activeTab === "guilds" && (
          <div className="space-y-8">
            {/* Guild Selection Section */}
            <Card className="bg-slate-900/90 border-slate-800 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-400" /> Hunter Guild Affiliations
                </CardTitle>
                <CardDescription className="text-xs text-slate-400">
                  Pledge allegiance to an elite Hunter Guild to gain passive stat multipliers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {GUILDS.map((guild) => {
                    const isSelected = state.selectedGuild === guild.id;

                    return (
                      <div
                        key={guild.id}
                        onClick={() => { playSound("click"); setState((prev) => ({ ...prev, selectedGuild: guild.id })); }}
                        className={cn(
                          "p-4 rounded-xl border cursor-pointer transition-all space-y-2 relative flex flex-col justify-between",
                          isSelected
                            ? `${guild.color} shadow-lg ring-2 ring-purple-500`
                            : "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400"
                        )}
                      >
                        {isSelected && (
                          <Badge className="absolute top-2 right-2 bg-purple-500 text-white font-mono text-[9px]">
                            ACTIVE GUILD
                          </Badge>
                        )}
                        <div>
                          <div className="text-3xl mb-1">{guild.badge}</div>
                          <h4 className="font-bold text-white text-base">{guild.name}</h4>
                          <div className="text-xs font-mono text-cyan-300 mt-0.5">Leader: {guild.leader}</div>
                          <p className="text-xs text-slate-400 mt-2 leading-relaxed">{guild.description}</p>
                        </div>
                        <Badge variant="outline" className="mt-3 text-[10px] font-mono text-amber-400 border-amber-500/30">
                          {guild.buff}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Global Monarch Leaderboard Table */}
            <Card className="bg-slate-900/90 border-slate-800 backdrop-blur-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-400" /> Global Monarch Leaderboard
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-400">
                    Live system ranking of the world's most powerful System Programmers.
                  </CardDescription>
                </div>
                <Badge className="bg-amber-500 text-slate-950 font-bold font-mono">
                  SEASON 1 RANKINGS
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 uppercase">
                        <th className="py-3 px-4">Rank</th>
                        <th className="py-3 px-4">Hunter Name</th>
                        <th className="py-3 px-4">Guild</th>
                        <th className="py-3 px-4">Class Rank</th>
                        <th className="py-3 px-4 text-right">System Level</th>
                        <th className="py-3 px-4 text-right">Total XP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {getLeaderboardData().map((hunter) => (
                        <tr
                          key={hunter.name}
                          className={cn(
                            "transition-colors",
                            hunter.isUser ? "bg-purple-950/50 text-amber-300 font-bold border-l-4 border-l-amber-400" : "hover:bg-slate-950/50 text-slate-300"
                          )}
                        >
                          <td className="py-3 px-4 flex items-center gap-2">
                            {hunter.rank === 1 ? (
                              <CrownIcon className="w-4 h-4 text-amber-400 fill-amber-400" />
                            ) : hunter.rank === 2 ? (
                              <Medal className="w-4 h-4 text-slate-300" />
                            ) : hunter.rank === 3 ? (
                              <Medal className="w-4 h-4 text-amber-600" />
                            ) : (
                              <span className="text-slate-500">#{hunter.rank}</span>
                            )}
                          </td>
                          <td className="py-3 px-4 font-bold">
                            {hunter.name} {hunter.isUser && <Badge className="ml-2 bg-amber-400 text-slate-950 text-[9px]">YOU</Badge>}
                          </td>
                          <td className="py-3 px-4 text-slate-400">{hunter.guild}</td>
                          <td className="py-3 px-4 text-cyan-300">{hunter.hunterRank}</td>
                          <td className="py-3 px-4 text-right font-bold text-amber-400">Lv. {hunter.level}</td>
                          <td className="py-3 px-4 text-right text-emerald-400 font-bold">{hunter.xp.toLocaleString()} XP</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tab Content: Dungeons */}
        {activeTab === "dungeons" && (
          <div className="space-y-8">
            {dungeonsClearedCount >= 11 ? (
              <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-amber-950 border-2 border-amber-400 text-center shadow-2xl animate-pulse">
                <Crown className="w-20 h-20 text-amber-400 mx-auto mb-3 animate-bounce" />
                <h2 className="text-3xl md:text-5xl font-extrabold text-white">ARISE! SHADOW MONARCH ASCENDED!</h2>
                <p className="text-purple-300 mt-2 max-w-xl mx-auto text-base">
                  All 11 Gates have been conquered. You stand as the undisputed <strong className="text-amber-400 font-bold">SHADOW MONARCH (LEVEL 999)</strong>.
                </p>
                <Badge className="mt-4 bg-amber-400 text-slate-950 font-bold px-6 py-2 text-base shadow-lg shadow-amber-500/50">
                  RANK: GOD-CLASS SYSTEM SOVEREIGN
                </Badge>
              </div>
            ) : dungeonsClearedCount >= 10 ? (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border-2 border-purple-500 text-center shadow-2xl">
                <Sparkles className="w-12 h-12 text-amber-400 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-white">10 DUNGEONS CLEARED! SECRET GATE UNLOCKED!</h3>
                <p className="text-purple-300 mt-1 text-sm">
                  Enter <strong className="text-amber-400">Dungeon XI: Throne of the Monarch</strong> below to complete your final ascension!
                </p>
              </div>
            ) : null}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DUNGEONS.map((dungeon) => {
                const isCleared = state.completedDungeons.includes(dungeon.id);
                const isLocked = dungeon.id > 1 && !state.completedDungeons.includes(dungeon.id - 1);
                const isSecretMonarchGate = dungeon.id === 11;

                return (
                  <Card
                    key={dungeon.id}
                    className={cn(
                      "bg-slate-900/80 border-slate-800 backdrop-blur-md transition-all duration-300 relative flex flex-col justify-between overflow-hidden group hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10",
                      isCleared && "border-emerald-500/50 bg-emerald-950/20",
                      isSecretMonarchGate && "border-amber-500/60 bg-gradient-to-br from-slate-900 via-purple-950/50 to-slate-950 shadow-amber-500/20",
                      isLocked && "opacity-60 cursor-not-allowed"
                    )}
                  >
                    {isCleared && (
                      <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 font-mono text-[10px] font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> CLEARED
                      </div>
                    )}

                    {isSecretMonarchGate && !isCleared && !isLocked && (
                      <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-mono text-[10px] font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1 animate-pulse">
                        👑 SECRET MONARCH GATE
                      </div>
                    )}

                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-1">
                        <span className={cn(isSecretMonarchGate && "text-amber-400 font-bold")}>{dungeon.codexNumber}</span>
                        <div className="flex gap-0.5 text-amber-400">
                          {Array.from({ length: dungeon.difficultyStars }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                      </div>

                      <CardTitle className={cn("text-xl font-bold text-white group-hover:text-cyan-300 transition-colors", isSecretMonarchGate && "text-amber-300")}>
                        {dungeon.dungeonName}
                      </CardTitle>
                      <CardDescription className="text-slate-400 text-xs line-clamp-2 mt-1">
                        {dungeon.subtitle}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4 pt-0">
                      {dungeon.bossName && (
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-mono">
                          <Skull className="w-4 h-4 text-red-400 animate-bounce" />
                          <span>BOSS: <strong>{dungeon.bossName}</strong></span>
                        </div>
                      )}

                      <div className="space-y-1.5 text-xs text-slate-300">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Base Reward:</span>
                          <span className="text-cyan-300 font-mono font-bold">+{dungeon.xpReward} XP</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Phase 1:</span>
                          <span className="text-amber-400 font-mono font-bold">{dungeon.tasks.length} Small Missions</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Skill Unlock:</span>
                          <span className={cn("font-mono", isSecretMonarchGate ? "text-amber-300 font-bold" : "text-emerald-400")}>{dungeon.skillUnlock}</span>
                        </div>
                      </div>

                      <Button
                        disabled={isLocked}
                        onClick={() => handleOpenDungeon(dungeon)}
                        className={cn(
                          "w-full rounded-xl gap-2 font-semibold transition-all mt-2",
                          isSecretMonarchGate
                            ? "bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/30"
                            : isCleared
                              ? "bg-slate-800 hover:bg-slate-700 text-slate-200"
                              : isLocked
                                ? "bg-slate-950 text-slate-600 border border-slate-800"
                                : "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20"
                        )}
                      >
                        {isLocked ? (
                          <>
                            <Lock className="w-4 h-4" /> Locked (Clear Dungeon {dungeon.id - 1})
                          </>
                        ) : isSecretMonarchGate ? (
                          <>
                            👑 {isCleared ? "Re-enter Monarch Gate" : "Enter Secret Monarch Gate"}
                          </>
                        ) : isCleared ? (
                          <>
                            <RotateCcw className="w-4 h-4" /> Re-enter Dungeon
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" /> Start Dungeon {dungeon.id}
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab Content: Hunter Stats & Skill Tree */}
        {activeTab === "skills" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Stats Panel */}
            <Card className="bg-slate-900/90 border-slate-800 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-cyan-400" /> Hunter Attributes
                </CardTitle>
                <CardDescription className="text-xs text-slate-400">
                  Stats increase as you conquer Python Dungeons and complete Quests.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Coding Power</span>
                    <span className="font-mono font-bold text-cyan-300">{hunterStats.coding} pts</span>
                  </div>
                  <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-cyan-500 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (hunterStats.coding / 400) * 100)}%` }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Intelligence</span>
                    <span className="font-mono font-bold text-emerald-400">{hunterStats.intelligence} pts</span>
                  </div>
                  <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (hunterStats.intelligence / 350) * 100)}%` }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Logical Strength</span>
                    <span className="font-mono font-bold text-amber-400">{hunterStats.strength} pts</span>
                  </div>
                  <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (hunterStats.strength / 300) * 100)}%` }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Creativity</span>
                    <span className="font-mono font-bold text-purple-400">{hunterStats.creativity} pts</span>
                  </div>
                  <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-purple-500 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (hunterStats.creativity / 300) * 100)}%` }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skill Tree */}
            <Card className="lg:col-span-2 bg-slate-900/90 border-slate-800 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" /> Python Skill Tree
                </CardTitle>
                <CardDescription className="text-xs text-slate-400">
                  Skills automatically unlock upon clearing the corresponding Dungeon.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SKILL_NODES.map((skill) => {
                    const isUnlocked = state.completedDungeons.includes(skill.dungeonIdRequired);

                    return (
                      <div
                        key={skill.id}
                        className={cn(
                          "p-4 rounded-xl border backdrop-blur-md transition-all flex items-start gap-3",
                          isUnlocked
                            ? "bg-slate-950/80 border-emerald-500/40 text-slate-100"
                            : "bg-slate-950/40 border-slate-800/80 text-slate-500 opacity-60"
                        )}
                      >
                        <div className="text-2xl p-2 rounded-lg bg-slate-900 border border-slate-800">
                          {skill.icon}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white">{skill.name}</span>
                            {isUnlocked ? (
                              <Badge className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border-emerald-500/30">UNLOCKED</Badge>
                            ) : (
                              <Badge variant="outline" className="text-[10px] font-mono border-slate-700 text-slate-500">LOCKED</Badge>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">{skill.description}</p>
                          <div className="text-[11px] font-mono text-cyan-400/80 pt-1">
                            Requires: Dungeon {skill.dungeonIdRequired}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tab Content: System Sandbox */}
        {activeTab === "sandbox" && (
          <Card className="bg-slate-900/90 border-slate-800 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-amber-400" /> System Spell Forge / Python Sandbox
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Test custom Python scripts or try out formula algorithms freely.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5"><TerminalIcon className="w-3.5 h-3.5 text-amber-400" /> Sandbox Editor</span>
                    <span>script.py</span>
                  </div>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    rows={12}
                    placeholder="# Write any custom Python code here..."
                    className="w-full font-mono text-xs p-4 rounded-xl bg-slate-950 border border-slate-800 text-amber-300 focus:outline-none focus:border-amber-500 transition-all resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>System Terminal Output</span>
                  </div>
                  <pre className="w-full h-[240px] font-mono text-xs p-4 rounded-xl bg-black border border-slate-800 text-slate-300 overflow-y-auto whitespace-pre-wrap">
                    {terminalOutput || "# Click 'Execute Sandbox Script' to run Python code..."}
                  </pre>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  disabled={isRunning}
                  onClick={handleRunCode}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold gap-2 px-6 rounded-xl shadow-lg shadow-amber-500/20"
                >
                  <Play className="w-4 h-4 fill-slate-950" /> {isRunning ? "Executing..." : "Execute Sandbox Script"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tab Content: Inventory */}
        {activeTab === "inventory" && (
          <Card className="bg-slate-900/90 border-slate-800 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-cyan-400" /> Hunter Inventory & Scrolls
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Collect ancient Python scrolls and orb artifacts by completing dungeon missions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {state.completedDungeons.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Your inventory is empty. Complete your first Dungeon to gain Python Scrolls.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {DUNGEONS.filter((d) => state.completedDungeons.includes(d.id)).map((d) => (
                    <div
                      key={d.inventoryReward.id}
                      className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 shadow-lg hover:border-cyan-400 transition-all space-y-2"
                    >
                      <div className="text-3xl mb-1">{d.inventoryReward.icon}</div>
                      <div className="font-bold text-sm text-cyan-300">{d.inventoryReward.name}</div>
                      <p className="text-xs text-slate-400 leading-relaxed">{d.inventoryReward.description}</p>
                      <Badge variant="outline" className="text-[10px] font-mono text-emerald-400 border-emerald-500/30">
                        Obtained from {d.codexNumber}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Tab Content: Quest Log */}
        {activeTab === "quests" && (
          <Card className="bg-slate-900/90 border-slate-800 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                <Scroll className="w-5 h-5 text-amber-400" /> Quest Log
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Complete system quests to gain bonus XP and stat bonuses.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {QUESTS.map((quest) => {
                const isCompleted = state.completedQuests.includes(quest.id);

                return (
                  <div
                    key={quest.id}
                    className={cn(
                      "p-5 rounded-xl border backdrop-blur-md transition-all flex items-center justify-between gap-4",
                      isCompleted
                        ? "bg-emerald-950/20 border-emerald-500/50"
                        : "bg-slate-950/60 border-slate-800"
                    )}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs font-mono",
                            quest.category === "Daily" && "text-cyan-400 border-cyan-500/30",
                            quest.category === "Secondary" && "text-amber-400 border-amber-500/30",
                            quest.category === "Bonus" && "text-purple-400 border-purple-500/30",
                            quest.category === "Weekly" && "text-emerald-400 border-emerald-500/30"
                          )}
                        >
                          {quest.category}
                        </Badge>
                        <h4 className="font-bold text-white text-base">{quest.title}</h4>
                      </div>
                      <p className="text-xs text-slate-400">{quest.description}</p>
                      <div className="flex items-center gap-4 text-xs font-mono pt-1">
                        <span className="text-cyan-300">Reward: +{quest.rewardXp} XP</span>
                        {quest.rewardStat && <span className="text-emerald-400">{quest.rewardStat}</span>}
                      </div>
                    </div>

                    <Button
                      onClick={() => toggleQuest(quest.id, quest.rewardXp)}
                      variant={isCompleted ? "default" : "outline"}
                      className={cn(
                        "rounded-xl gap-2 text-xs font-semibold",
                        isCompleted ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950" : "border-slate-700 text-slate-300 hover:border-cyan-400"
                      )}
                    >
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : null}
                      {isCompleted ? "Completed" : "Claim Quest"}
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* Tab Content: Achievements */}
        {activeTab === "achievements" && (
          <Card className="bg-slate-900/90 border-slate-800 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-purple-400" /> System Achievements
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Unlock system honors as you advance through the Python Ascension Protocol.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {INITIAL_ACHIEVEMENTS.map((ach) => {
                  const isUnlocked = state.unlockedAchievements.includes(ach.id);

                  return (
                    <div
                      key={ach.id}
                      className={cn(
                        "p-4 rounded-xl border backdrop-blur-md transition-all flex items-center gap-4",
                        isUnlocked
                          ? "bg-slate-950/80 border-purple-500/40 text-slate-100"
                          : "bg-slate-950/30 border-slate-800 text-slate-500 opacity-60"
                      )}
                    >
                      <div className="text-3xl p-2 rounded-lg bg-slate-900 border border-slate-800">
                        {ach.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-sm">{ach.title}</h4>
                          {isUnlocked && (
                            <Badge className="bg-purple-500/20 text-purple-300 text-[10px] font-mono border-purple-500/30">UNLOCKED</Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{ach.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Interactive Dungeon Modal Simulator */}
      {activeDungeon && !inPenaltyZone && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/50 rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
              <div className="flex items-center gap-3">
                <Badge className="bg-cyan-950 text-cyan-300 font-mono border-cyan-500/30">
                  {activeDungeon.codexNumber}
                </Badge>
                <div>
                  <h3 className="text-lg font-bold text-white">{activeDungeon.dungeonName}</h3>
                  <p className="text-xs text-slate-400">{activeDungeon.codexTitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <Button
                    size="sm"
                    variant={dungeonMode === "tasks" ? "default" : "ghost"}
                    onClick={() => setDungeonMode("tasks")}
                    className={cn("h-7 text-xs font-semibold rounded-lg gap-1.5", dungeonMode === "tasks" && "bg-amber-500 text-slate-950 font-bold")}
                  >
                    <Target className="w-3.5 h-3.5" /> 1. Small Missions ({completedTasksInDungeon.length}/{activeDungeon.tasks.length})
                  </Button>
                  <Button
                    size="sm"
                    variant={dungeonMode === "boss" ? "default" : "ghost"}
                    onClick={handleSwitchToBoss}
                    className={cn("h-7 text-xs font-semibold rounded-lg gap-1.5", dungeonMode === "boss" && "bg-red-500 text-white font-bold")}
                  >
                    <Skull className="w-3.5 h-3.5 text-amber-300" /> 2. Final Boss Battle
                  </Button>
                  <Button
                    size="sm"
                    variant={dungeonMode === "theory" ? "default" : "ghost"}
                    onClick={() => setDungeonMode("theory")}
                    className={cn("h-7 text-xs font-semibold rounded-lg gap-1.5", dungeonMode === "theory" && "bg-cyan-500 text-slate-950 font-bold")}
                  >
                    <Lightbulb className="w-3.5 h-3.5" /> Codex Theory
                  </Button>
                </div>

                <Button variant="ghost" size="sm" onClick={() => setActiveDungeon(null)} className="text-slate-400 hover:text-white">
                  ✕ Close
                </Button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Difficulty Mode Selector HUD Bar */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <FlameIcon className="w-4 h-4 text-amber-400" />
                  <span>SELECT DIFFICULTY MODE:</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleDifficultyModeChange("easy")}
                    className={cn("h-7 text-xs font-bold rounded-lg gap-1", difficultyMode === "easy" ? "bg-emerald-500 text-slate-950" : "bg-slate-900 border border-slate-800 text-slate-400")}
                  >
                    🟢 EASY (1.0x XP)
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDifficultyModeChange("hard")}
                    className={cn("h-7 text-xs font-bold rounded-lg gap-1", difficultyMode === "hard" ? "bg-amber-500 text-slate-950" : "bg-slate-900 border border-slate-800 text-slate-400")}
                  >
                    🟡 HARD (1.5x XP - Syntax Bugs)
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDifficultyModeChange("hell")}
                    className={cn("h-7 text-xs font-bold rounded-lg gap-1", difficultyMode === "hell" ? "bg-red-600 text-white animate-pulse" : "bg-slate-900 border border-slate-800 text-slate-400")}
                  >
                    🔴 HELL (2.0x XP - From Scratch)
                  </Button>
                </div>
              </div>

              {/* Progress Banner for 2-Phase Progression */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-950/60 border border-amber-500/30 text-amber-400">
                    {dungeonMode === "tasks" ? <Target className="w-5 h-5" /> : <Skull className="w-5 h-5 text-red-400" />}
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400">DUNGEON PROGRESSION FLOW</div>
                    <div className="text-sm font-bold text-white">
                      {dungeonMode === "tasks" ? "PHASE 1: Complete Small Practice Missions" : "PHASE 2: Defeat Dungeon Boss Anomaly"}
                    </div>
                  </div>
                </div>

                {dungeonMode === "tasks" ? (
                  <Button
                    size="sm"
                    onClick={handleSwitchToBoss}
                    className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs gap-1.5 rounded-lg shadow-lg shadow-red-600/20"
                  >
                    Proceed to Boss Battle <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setDungeonMode("tasks")}
                    className="text-xs font-mono border-slate-800 text-slate-300 hover:border-amber-400"
                  >
                    Review Small Missions ({activeDungeon.tasks.length})
                  </Button>
                )}
              </div>

              {dungeonMode === "theory" ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <h4 className="font-bold text-cyan-300 text-sm mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-400" /> Codex Theory & Formulas
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {activeDungeon.theoryNotes.map((note, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-cyan-400">•</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : dungeonMode === "tasks" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeDungeon.tasks.map((task) => {
                      const isTaskDone = completedTasksInDungeon.includes(task.id);
                      const isSelected = selectedTask?.id === task.id;

                      return (
                        <div
                          key={task.id}
                          onClick={() => handleSelectTask(task)}
                          className={cn(
                            "p-3.5 rounded-xl border cursor-pointer transition-all space-y-1.5 relative",
                            isSelected
                              ? "bg-cyan-950/40 border-cyan-500 text-cyan-200"
                              : isTaskDone
                                ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-200"
                                : "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300"
                          )}
                        >
                          {isTaskDone && (
                            <div className="absolute top-2 right-2 text-emerald-400">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                          )}
                          <div className="font-bold text-xs flex items-center justify-between pr-5">
                            <span>{task.title}</span>
                            {task.formula && <Badge variant="outline" className="text-[10px] text-amber-400 border-amber-500/30">{task.formula}</Badge>}
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-2">{task.question}</p>
                        </div>
                      );
                    })}
                  </div>

                  {selectedTask && (
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs text-slate-300 space-y-1">
                      <strong className="text-cyan-400">Small Mission Task Objective:</strong> {selectedTask.question}
                      <div className="text-slate-400 pt-1">{selectedTask.explanation}</div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-950 border border-red-500/40 text-xs text-slate-300 leading-relaxed space-y-3">
                  <div className="flex items-center gap-2 text-red-400 font-bold font-mono text-sm">
                    <Skull className="w-5 h-5 animate-pulse" /> BOSS ENCOUNTER: {activeDungeon.bossName || "Dungeon Anomaly"}
                  </div>
                  <div>{activeDungeon.description}</div>
                  <div className="pt-3 border-t border-slate-800 font-mono text-emerald-400">
                    <strong>FINAL MISSION OBJECTIVE:</strong> {activeDungeon.missionObjective}
                  </div>
                </div>
              )}

              {/* Code Editor & Terminal */}
              {dungeonMode !== "theory" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Editor */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1.5"><TerminalIcon className="w-3.5 h-3.5 text-cyan-400" /> Python Code Editor</span>
                      <Badge variant="outline" className={cn("text-[10px]", difficultyMode === "easy" ? "border-emerald-500/40 text-emerald-300" : difficultyMode === "hard" ? "border-amber-500/40 text-amber-300" : "border-red-500/40 text-red-400")}>
                        MODE: {difficultyMode.toUpperCase()}
                      </Badge>
                    </div>
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      rows={10}
                      className="w-full font-mono text-xs p-4 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 focus:outline-none focus:border-cyan-500 transition-all resize-none"
                    />
                  </div>

                  {/* Terminal Output */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>System Terminal Output</span>
                      {executionSuccess !== null && (
                        <span className={executionSuccess ? "text-emerald-400" : "text-red-400"}>
                          {executionSuccess ? "STATUS: PASSED" : "STATUS: FAILED"}
                        </span>
                      )}
                    </div>
                    <pre className="w-full h-[200px] lg:h-[225px] font-mono text-xs p-4 rounded-xl bg-black border border-slate-800 text-slate-300 overflow-y-auto whitespace-pre-wrap">
                      {terminalOutput || "# Click 'Run Python Program' to execute script..."}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
              <Button variant="ghost" onClick={() => setCode(getModeCode(dungeonMode === "boss" ? activeDungeon.initialCode : (selectedTask ? selectedTask.codeSnippet : ""), difficultyMode))} className="text-xs text-slate-400 hover:text-white">
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset Code
              </Button>

              {dungeonMode !== "theory" && (
                <div className="flex items-center gap-3">
                  <Button
                    disabled={isRunning}
                    onClick={handleRunCode}
                    className={cn(
                      "font-bold gap-2 px-6 rounded-xl shadow-lg transition-all",
                      dungeonMode === "boss" ? "bg-red-600 hover:bg-red-500 text-white shadow-red-600/20" : "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20"
                    )}
                  >
                    <Play className="w-4 h-4 fill-current" /> {isRunning ? "Executing..." : (dungeonMode === "boss" ? "Attack Boss Anomaly" : "Run Python Program")}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* System Penalty Zone Full-Screen Alarm Modal */}
      {inPenaltyZone && (
        <div className="fixed inset-0 z-50 bg-red-950/95 backdrop-blur-2xl flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
          <div className="bg-slate-950 border-2 border-red-500 rounded-2xl max-w-4xl w-full p-6 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-red-900/60 pb-4">
              <div className="flex items-center gap-3">
                <Siren className="w-8 h-8 text-red-500 animate-bounce" />
                <div>
                  <h3 className="text-xl font-extrabold text-white tracking-wide">🚨 SYSTEM PENALTY ZONE: DESERT OF GIANT CENTIPEDES</h3>
                  <p className="text-xs text-red-400 font-mono">Solve 3 survival debug challenges to return to reality!</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-red-950 p-2.5 rounded-xl border border-red-500/40">
                <Timer className="w-5 h-5 text-amber-400 animate-pulse" />
                <span className="font-mono font-bold text-xl text-amber-400">{penaltyTimer}s</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-red-900/50 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-amber-400">
                <span>{PENALTY_CHALLENGES[penaltyStep].title}</span>
                <span>STEP {penaltyStep + 1} / 3</span>
              </div>
              <p className="text-xs text-slate-300">{PENALTY_CHALLENGES[penaltyStep].prompt}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-xs font-mono text-red-400">Survival Code Editor</div>
                <textarea
                  value={penaltyCode}
                  onChange={(e) => setPenaltyCode(e.target.value)}
                  rows={8}
                  className="w-full font-mono text-xs p-4 rounded-xl bg-slate-900 border border-red-900/80 text-amber-300 focus:outline-none focus:border-red-500 transition-all resize-none"
                />
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-red-400">Penalty Terminal Output</div>
                <pre className="w-full h-[160px] font-mono text-xs p-4 rounded-xl bg-black border border-red-900/80 text-slate-300 overflow-y-auto whitespace-pre-wrap">
                  {penaltyOutput}
                </pre>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <Button variant="ghost" onClick={() => setPenaltyCode(PENALTY_CHALLENGES[penaltyStep].initialCode)} className="text-xs text-slate-400 hover:text-white">
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset Survival Code
              </Button>

              <Button
                onClick={handleRunPenaltyCode}
                className="bg-red-600 hover:bg-red-500 text-white font-extrabold gap-2 px-8 rounded-xl shadow-lg shadow-red-600/30"
              >
                <Shield className="w-4 h-4" /> Execute Survival Fix
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Rank Promotion Modal Notification */}
      {showRankUpModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
          <div className="bg-slate-900 border-2 border-amber-500 rounded-2xl p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
            <Sparkles className="w-16 h-16 text-amber-400 mx-auto animate-bounce" />
            <h3 className="text-2xl font-extrabold text-white">SYSTEM RANK PROMOTION!</h3>
            <p className="text-slate-400 text-sm">
              Congratulations Hunter! You have cleared enough Dungeons to achieve a Rank promotion.
            </p>

            <div className="flex items-center justify-center gap-4 py-4 font-mono font-bold text-lg">
              <span className="text-slate-500 line-through">{previousRank}</span>
              <ChevronRight className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400">{currentRank.rank}</span>
            </div>

            <Button
              onClick={() => { playSound("click"); setShowRankUpModal(false); }}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl py-3"
            >
              Accept Rank Upgrade
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Crown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.1 5.9a.5.5 0 0 1 .797.525l-2.127 12.76A2 2 0 0 1 17.8 21H6.2a2 2 0 0 1-1.97-1.815L2.103 6.425a.5.5 0 0 1 .797-.525l4.193 3.264a1 1 0 0 0 1.516-.294z" />
    </svg>
  );
}
