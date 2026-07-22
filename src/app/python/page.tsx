"use client";

import React, { useState, useEffect } from "react";
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
  Code2,
  FileCode,
  HelpCircle,
  BarChart3,
  Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HunterState {
  completedDungeons: number[]; // dungeon ids
  xp: number;
  completedQuests: string[]; // quest ids
  unlockedAchievements: string[];
}

export default function PythonAscensionPage() {
  const [state, setState] = useState<HunterState>({
    completedDungeons: [],
    xp: 0,
    completedQuests: [],
    unlockedAchievements: ["ach-1"]
  });

  const [activeTab, setActiveTab] = useState<"dungeons" | "skills" | "inventory" | "quests" | "achievements" | "sandbox">("dungeons");
  const [activeDungeon, setActiveDungeon] = useState<Dungeon | null>(null);
  const [dungeonMode, setDungeonMode] = useState<"boss" | "tasks" | "theory">("boss");
  const [selectedTask, setSelectedTask] = useState<PracticeTask | null>(null);
  const [code, setCode] = useState<string>("");
  const [terminalOutput, setTerminalOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionSuccess, setExecutionSuccess] = useState<boolean | null>(null);
  const [showRankUpModal, setShowRankUpModal] = useState<boolean>(false);
  const [previousRank, setPreviousRank] = useState<string>("E-Class Programmer");

  // Audio Synth Sound Effects
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const playSound = (type: "click" | "success" | "fail" | "levelUp") => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === "click") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === "success") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
        osc.frequency.setValueAtTime(1046.50, now + 0.3); // C6
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === "fail") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(150, now + 0.2);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === "levelUp") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(554.37, now + 0.12);
        osc.frequency.setValueAtTime(659.25, now + 0.24);
        osc.frequency.setValueAtTime(880, now + 0.36);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      }
    } catch (e) {
      // Audio context fallback catch
    }
  };

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
    if (cleared >= 10) return { rank: "S-Class Programmer", level: 100, title: "Shadow Programmer", color: "text-purple-400 border-purple-500 bg-purple-950/40 shadow-purple-500/30" };
    if (cleared >= 8) return { rank: "A-Class Programmer", level: 75, title: "Data Alchemist", color: "text-amber-400 border-amber-500 bg-amber-950/40 shadow-amber-500/30" };
    if (cleared >= 6) return { rank: "B-Class Programmer", level: 45, title: "Code Weaver", color: "text-blue-400 border-blue-500 bg-blue-950/40 shadow-blue-500/30" };
    if (cleared >= 3) return { rank: "C-Class Programmer", level: 18, title: "Logic Specialist", color: "text-emerald-400 border-emerald-500 bg-emerald-950/40 shadow-emerald-500/30" };
    if (cleared >= 1) return { rank: "D-Class Programmer", level: 5, title: "Apprentice Hunter", color: "text-cyan-400 border-cyan-500 bg-cyan-950/40 shadow-cyan-500/30" };
    return { rank: "E-Class Programmer", level: 1, title: "Novice Trainee", color: "text-slate-400 border-slate-600 bg-slate-900/60 shadow-slate-500/10" };
  };

  const currentRank = getRankInfo(dungeonsClearedCount);

  // Dynamic Hunter Stats based on progress
  const hunterStats = {
    strength: 10 + dungeonsClearedCount * 12 + state.completedQuests.length * 3,
    intelligence: 20 + dungeonsClearedCount * 18 + state.completedQuests.length * 5,
    coding: 15 + dungeonsClearedCount * 25 + state.completedQuests.length * 7,
    creativity: 10 + dungeonsClearedCount * 15 + state.completedQuests.length * 4,
  };

  const handleOpenDungeon = (dungeon: Dungeon) => {
    playSound("click");
    setActiveDungeon(dungeon);
    setDungeonMode("boss");
    setCode(dungeon.initialCode);
    setSelectedTask(null);
    setTerminalOutput("");
    setExecutionSuccess(null);
  };

  const handleSelectTask = (task: PracticeTask) => {
    playSound("click");
    setSelectedTask(task);
    setCode(task.codeSnippet);
    setTerminalOutput(`[TASK SELECTED]: ${task.title}\nPress 'Run Code' to test implementation.`);
    setExecutionSuccess(null);
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
      
      const isSuccess = code.toLowerCase().includes(expectedTarget.toLowerCase()) || 
        code.includes("print") || code.includes("def") || code.includes("class");

      if (isSuccess) {
        playSound("success");
        setExecutionSuccess(true);
        setTerminalOutput((prev) =>
          prev + "\n\n>>> EXECUTION SUCCESSFUL <<<\n[SYSTEM]: Code criteria validated.\nOutput returned cleanly.\n" +
          `[REWARD]: +${activeDungeon.xpReward} XP Gained!`
        );

        // Check if dungeon newly cleared
        if (!state.completedDungeons.includes(activeDungeon.id)) {
          const oldRank = getRankInfo(state.completedDungeons.length).rank;
          const newDungeons = [...state.completedDungeons, activeDungeon.id];
          const newXp = state.xp + activeDungeon.xpReward;
          const newRank = getRankInfo(newDungeons.length).rank;

          // Achievements check
          const updatedAchievements = [...state.unlockedAchievements];
          if (activeDungeon.id === 4 && !updatedAchievements.includes("ach-2")) updatedAchievements.push("ach-2");
          if (activeDungeon.id === 6 && !updatedAchievements.includes("ach-3")) updatedAchievements.push("ach-3");
          if (activeDungeon.id === 9 && !updatedAchievements.includes("ach-4")) updatedAchievements.push("ach-4");
          if (newDungeons.length === 10 && !updatedAchievements.includes("ach-5")) updatedAchievements.push("ach-5");

          setState({
            ...state,
            completedDungeons: newDungeons,
            xp: newXp,
            unlockedAchievements: updatedAchievements
          });

          if (newRank !== oldRank) {
            playSound("levelUp");
            setPreviousRank(oldRank);
            setShowRankUpModal(true);
          }
        }
      } else {
        playSound("fail");
        setExecutionSuccess(false);
        setTerminalOutput((prev) =>
          prev + "\n\n[ERROR]: Execution completed with missing criteria.\n" +
          `[HINT]: ${activeDungeon.solutionHint}`
        );
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
      const initial = {
        completedDungeons: [],
        xp: 0,
        completedQuests: [],
        unlockedAchievements: ["ach-1"]
      };
      setState(initial);
      localStorage.setItem("python_ascension_state", JSON.stringify(initial));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20 selection:bg-cyan-500 selection:text-slate-950">
      {/* Background Cyber Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-25" />

      <div className="container mx-auto px-4 pt-8 relative z-10 max-w-7xl">
        {/* System Archives Header Banner */}
        <div className="mb-8 p-6 md:p-8 rounded-2xl bg-slate-900/90 border border-cyan-500/40 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="text-slate-400 hover:text-cyan-300 h-8 w-8"
              title={soundEnabled ? "Mute Audio FX" : "Enable Audio FX"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </Button>
            <div className="text-xs font-mono text-cyan-400/60 uppercase tracking-widest hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              System Status: ONLINE
            </div>
          </div>

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
                Humanity has discovered mysterious Gates. Only those who master Python can become System Programmers capable of controlling the Digital Dungeon.
              </p>
            </div>

            {/* Hunter Identity Card HUD */}
            <div className={cn("p-5 rounded-xl border backdrop-blur-md transition-all duration-300 w-full lg:w-80 shadow-lg", currentRank.color)}>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Hunter ID #041</span>
                <Badge variant="outline" className="font-mono text-xs border-cyan-400/50 text-cyan-300">
                  Lv. {currentRank.level}
                </Badge>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-slate-950/70 border border-cyan-500/30">
                  <Shield className="w-7 h-7 text-cyan-400 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Current Rank</div>
                  <div className="font-bold text-lg leading-none mt-0.5">{currentRank.rank}</div>
                </div>
              </div>

              {/* Progress & XP Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Completed Dungeons</span>
                  <span className="text-cyan-300 font-bold">{dungeonsClearedCount} / 10</span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${(dungeonsClearedCount / 10) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-1">
                  <span>Mana: <strong className="text-emerald-400">100%</strong></span>
                  <span>XP: <strong className="text-cyan-300">{state.xp} XP</strong></span>
                </div>
              </div>
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
              <Sword className="w-4 h-4" /> Dungeons ({dungeonsClearedCount}/10)
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

        {/* Tab Content: Dungeons */}
        {activeTab === "dungeons" && (
          <div className="space-y-8">
            {dungeonsClearedCount === 10 && (
              <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border-2 border-purple-500 text-center shadow-2xl animate-pulse">
                <Crown className="w-16 h-16 text-amber-400 mx-auto mb-3" />
                <h2 className="text-3xl md:text-4xl font-extrabold text-white">ALL DUNGEONS CLEARED!</h2>
                <p className="text-purple-300 mt-2 max-w-xl mx-auto text-base">
                  Congratulations Hunter! You have conquered every Python Dungeon and earned the title <strong className="text-amber-400 font-bold">Shadow Programmer</strong>.
                </p>
                <Badge className="mt-4 bg-amber-500 text-slate-950 font-bold px-4 py-1.5 text-sm">
                  RANK: S-CLASS PROGRAMMER (LEVEL 100)
                </Badge>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DUNGEONS.map((dungeon) => {
                const isCleared = state.completedDungeons.includes(dungeon.id);
                const isLocked = dungeon.id > 1 && !state.completedDungeons.includes(dungeon.id - 1);

                return (
                  <Card
                    key={dungeon.id}
                    className={cn(
                      "bg-slate-900/80 border-slate-800 backdrop-blur-md transition-all duration-300 relative flex flex-col justify-between overflow-hidden group hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10",
                      isCleared && "border-emerald-500/50 bg-emerald-950/20",
                      isLocked && "opacity-60 cursor-not-allowed"
                    )}
                  >
                    {isCleared && (
                      <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 font-mono text-[10px] font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> CLEARED
                      </div>
                    )}

                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-1">
                        <span>{dungeon.codexNumber}</span>
                        <div className="flex gap-0.5 text-amber-400">
                          {Array.from({ length: dungeon.difficultyStars }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                      </div>

                      <CardTitle className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
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
                          <span className="text-slate-500">Reward:</span>
                          <span className="text-cyan-300 font-mono font-bold">+{dungeon.xpReward} XP</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Tasks Included:</span>
                          <span className="text-amber-400 font-mono font-bold">{dungeon.tasks.length} Practice Tasks</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Skill Unlock:</span>
                          <span className="text-emerald-400 font-mono">{dungeon.skillUnlock}</span>
                        </div>
                      </div>

                      <Button
                        disabled={isLocked}
                        onClick={() => handleOpenDungeon(dungeon)}
                        className={cn(
                          "w-full rounded-xl gap-2 font-semibold transition-all mt-2",
                          isCleared 
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
                        ) : isCleared ? (
                          <>
                            <RotateCcw className="w-4 h-4" /> Re-enter Dungeon
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" /> Enter Dungeon {dungeon.id}
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
                    <div className="h-full bg-cyan-500 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (hunterStats.coding / 300) * 100)}%` }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Intelligence</span>
                    <span className="font-mono font-bold text-emerald-400">{hunterStats.intelligence} pts</span>
                  </div>
                  <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (hunterStats.intelligence / 250) * 100)}%` }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Logical Strength</span>
                    <span className="font-mono font-bold text-amber-400">{hunterStats.strength} pts</span>
                  </div>
                  <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (hunterStats.strength / 200) * 100)}%` }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Creativity</span>
                    <span className="font-mono font-bold text-purple-400">{hunterStats.creativity} pts</span>
                  </div>
                  <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-purple-500 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (hunterStats.creativity / 200) * 100)}%` }} />
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
      {activeDungeon && (
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
                    variant={dungeonMode === "boss" ? "default" : "ghost"}
                    onClick={() => { setDungeonMode("boss"); setCode(activeDungeon.initialCode); }}
                    className={cn("h-7 text-xs font-semibold rounded-lg", dungeonMode === "boss" && "bg-cyan-500 text-slate-950")}
                  >
                    ⚔️ Boss Mission
                  </Button>
                  <Button
                    size="sm"
                    variant={dungeonMode === "tasks" ? "default" : "ghost"}
                    onClick={() => setDungeonMode("tasks")}
                    className={cn("h-7 text-xs font-semibold rounded-lg", dungeonMode === "tasks" && "bg-cyan-500 text-slate-950")}
                  >
                    📚 Lab Tasks ({activeDungeon.tasks.length})
                  </Button>
                  <Button
                    size="sm"
                    variant={dungeonMode === "theory" ? "default" : "ghost"}
                    onClick={() => setDungeonMode("theory")}
                    className={cn("h-7 text-xs font-semibold rounded-lg", dungeonMode === "theory" && "bg-cyan-500 text-slate-950")}
                  >
                    💡 Codex Theory
                  </Button>
                </div>

                <Button variant="ghost" size="sm" onClick={() => setActiveDungeon(null)} className="text-slate-400 hover:text-white">
                  ✕ Close
                </Button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
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
                    {activeDungeon.tasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => handleSelectTask(task)}
                        className={cn(
                          "p-3.5 rounded-xl border cursor-pointer transition-all space-y-1.5",
                          selectedTask?.id === task.id
                            ? "bg-cyan-950/40 border-cyan-500 text-cyan-200"
                            : "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300"
                        )}
                      >
                        <div className="font-bold text-xs flex justify-between">
                          <span>{task.title}</span>
                          {task.formula && <Badge variant="outline" className="text-[10px] text-amber-400 border-amber-500/30">{task.formula}</Badge>}
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2">{task.question}</p>
                      </div>
                    ))}
                  </div>

                  {selectedTask && (
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs text-slate-300 space-y-1">
                      <strong className="text-cyan-400">Task Objective:</strong> {selectedTask.question}
                      <div className="text-slate-400 pt-1">{selectedTask.explanation}</div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-cyan-400 font-mono block mb-1">DUNGEON BRIEFING:</strong>
                  {activeDungeon.description}
                  <div className="mt-3 pt-3 border-t border-slate-800 font-mono text-emerald-400">
                    <strong>MISSION OBJECTIVE:</strong> {activeDungeon.missionObjective}
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
                      <span>main.py</span>
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
              <Button variant="ghost" onClick={() => setCode(activeDungeon.initialCode)} className="text-xs text-slate-400 hover:text-white">
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset Code
              </Button>

              {dungeonMode !== "theory" && (
                <div className="flex items-center gap-3">
                  <Button
                    disabled={isRunning}
                    onClick={handleRunCode}
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold gap-2 px-6 rounded-xl shadow-lg shadow-cyan-500/20"
                  >
                    <Play className="w-4 h-4 fill-slate-950" /> {isRunning ? "Executing..." : "Run Python Program"}
                  </Button>
                </div>
              )}
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
