"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { StudentTelemetry, ClanData } from "@/lib/telemetryStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Zap,
  Users,
  Search,
  Filter,
  Download,
  Lock,
  Unlock,
  Radio,
  BarChart3,
  Award,
  Flame,
  AlertTriangle,
  RefreshCw,
  PlusCircle,
  KeyRound,
  CheckCircle2,
  Cpu,
  Trophy,
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

const ADMIN_MASTER_PASSCODE = "MONARCH-ADMIN-2026";

export default function PythonAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcodeInput, setPasscodeInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  const [students, setStudents] = useState<StudentTelemetry[]>([]);
  const [clans, setClans] = useState<ClanData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"matrix" | "clans" | "analytics">("matrix");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"all" | "penalty" | "cleared">("all");

  // New Clan Generation Form States
  const [newClanName, setNewClanName] = useState<string>("");
  const [newClanLeader, setNewClanLeader] = useState<string>("");
  const [newClanDesc, setNewClanDesc] = useState<string>("");
  const [createdClanNotice, setCreatedClanNotice] = useState<string>("");

  // Check auth session
  useEffect(() => {
    const savedAuth = localStorage.getItem("python_admin_authenticated");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch telemetry and clans
  const fetchLiveData = async () => {
    setIsLoading(true);
    try {
      const [resStudents, resClans] = await Promise.all([
        fetch("/api/python/telemetry"),
        fetch("/api/python/clan")
      ]);

      const dataStudents = await resStudents.json();
      const dataClans = await resClans.json();

      if (dataStudents.success) setStudents(dataStudents.students || []);
      if (dataClans.success) setClans(dataClans.clans || []);
    } catch (e) {
      console.error("Failed to fetch admin data", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLiveData();
      const interval = setInterval(fetchLiveData, 10000); // 10s auto live refresh
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput.trim() === ADMIN_MASTER_PASSCODE) {
      setIsAuthenticated(true);
      localStorage.setItem("python_admin_authenticated", "true");
      setAuthError("");
    } else {
      setAuthError("Invalid Admin Master Passcode. Access Denied.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("python_admin_authenticated");
  };

  // Create Clan Handler
  const handleAdminCreateClan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClanName.trim() || !newClanLeader.trim()) return;

    try {
      const res = await fetch("/api/python/clan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          name: newClanName.trim(),
          creatorName: newClanLeader.trim(),
          description: newClanDesc.trim()
        })
      });
      const data = await res.json();
      if (data.success) {
        setCreatedClanNotice(`✅ Clan Created! Unique Clan Code: ${data.clan.code}`);
        setNewClanName("");
        setNewClanLeader("");
        setNewClanDesc("");
        fetchLiveData();
      } else {
        setCreatedClanNotice(`❌ Error: ${data.error}`);
      }
    } catch (err: any) {
      setCreatedClanNotice(`❌ Failed to create clan: ${err.message}`);
    }
  };

  // Export CSV Report for 100+ Students
  const exportStudentsCSV = () => {
    if (students.length === 0) return;
    let csv = "ID,Student Name,Rank,Level,XP,Dungeons Cleared,Current Task,In Penalty Zone,Clan Code,Clan Name,Last Active\n";

    students.forEach((s) => {
      csv += `"${s.id}","${s.name}","${s.rank}",${s.level},${s.xp},${s.completedDungeons.length}/11,"${s.currentTask || 'N/A'}",${s.inPenaltyZone ? 'YES' : 'NO'},"${s.clanCode || ''}","${s.clanName || ''}","${s.lastActive}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Python_Ascension_Students_Report_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  // Filter students
  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.rank.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (s.clanName && s.clanName.toLowerCase().includes(searchQuery.toLowerCase()));

    if (statusFilter === "penalty") return matchesSearch && s.inPenaltyZone;
    if (statusFilter === "cleared") return matchesSearch && s.completedDungeons.length >= 10;
    return matchesSearch;
  });

  const totalXP = students.reduce((acc, s) => acc + s.xp, 0);
  const penaltyCount = students.filter((s) => s.inPenaltyZone).length;
  const clearedCount = students.filter((s) => s.completedDungeons.length >= 10).length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.15),transparent_70%)] pointer-events-none" />
        
        <Card className="max-w-md w-full bg-slate-900/90 border-2 border-cyan-500/60 shadow-[0_0_50px_rgba(6,182,212,0.3)] backdrop-blur-xl rounded-3xl relative z-10">
          <CardHeader className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-slate-950 border-2 border-cyan-500/50 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <Lock className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
            
            <Badge className="bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-mono text-[10px] uppercase tracking-widest px-3 py-1 mx-auto">
              RESTRICTED ADMIN ACCESS
            </Badge>

            <CardTitle className="text-2xl font-black tracking-tight text-white">
              ADMIN CONTROL CENTER
            </CardTitle>

            <CardDescription className="text-slate-400 text-xs">
              Enter the Master Passcode to access live progress telemetry for 100+ students and Clan competition controls.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-mono text-cyan-400 font-bold flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4" /> MASTER PASSCODE:
                </label>
                <input
                  type="password"
                  value={passcodeInput}
                  onChange={(e) => setPasscodeInput(e.target.value)}
                  placeholder="Enter Passcode..."
                  className="w-full font-mono text-sm px-4 py-3 rounded-xl bg-slate-950 border-2 border-cyan-500/50 text-white focus:outline-none focus:border-cyan-400 transition-all shadow-inner"
                />
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/60 text-red-400 text-xs font-mono text-center">
                  {authError}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-black text-sm py-3.5 rounded-xl shadow-lg shadow-cyan-500/30 transition-all"
              >
                <Unlock className="w-4 h-4 mr-2" /> UNLOCK ADMIN TERMINAL
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/python" className="text-xs font-mono text-slate-400 hover:text-cyan-400 flex items-center justify-center gap-1.5 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" /> Return to Python Ascension Page
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 font-sans relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* Header Bar */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border-2 border-cyan-500/50 shadow-[0_0_35px_rgba(6,182,212,0.25)] backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-slate-950 border border-cyan-500/50 shadow-inner">
              <Shield className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>REAL-TIME TELEMETRY ENGINE</span>
                <span className="text-slate-600">|</span>
                <span className="text-emerald-400">100+ LIVE BACKING ONLINE</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                PYTHON ASCENSION ADMIN DASHBOARD
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={fetchLiveData}
              disabled={isLoading}
              className="border-slate-800 text-cyan-400 hover:border-cyan-400 text-xs font-mono gap-1.5 rounded-xl px-4"
            >
              <RefreshCw className={cn("w-3.5 h-3.5", isLoading && "animate-spin")} /> Refresh
            </Button>

            <Button
              onClick={exportStudentsCSV}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs gap-1.5 rounded-xl px-4 shadow-lg shadow-emerald-500/20"
            >
              <Download className="w-3.5 h-3.5" /> Export CSV Report
            </Button>

            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-xs text-red-400 hover:bg-red-950/60 rounded-xl px-3"
            >
              <Lock className="w-3.5 h-3.5 mr-1" /> Lock Admin
            </Button>
          </div>
        </div>

        {/* Stats Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-slate-900/80 border border-slate-800 rounded-2xl">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-mono text-slate-400">Total Students Tracked</p>
                <p className="text-2xl font-black text-white">{students.length}</p>
                <p className="text-[10px] text-emerald-400 font-mono">100+ Live Backing Capacity</p>
              </div>
              <Users className="w-8 h-8 text-cyan-400" />
            </CardContent>
          </Card>

          <Card className="bg-slate-900/80 border border-slate-800 rounded-2xl">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-mono text-slate-400">Total System XP Earned</p>
                <p className="text-2xl font-black text-amber-400">{totalXP.toLocaleString()} XP</p>
                <p className="text-[10px] text-slate-500 font-mono">Combined Class Experience</p>
              </div>
              <Trophy className="w-8 h-8 text-amber-400" />
            </CardContent>
          </Card>

          <Card className="bg-slate-900/80 border border-slate-800 rounded-2xl">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-mono text-slate-400">S-Rank Cleared Students</p>
                <p className="text-2xl font-black text-purple-400">{clearedCount}</p>
                <p className="text-[10px] text-purple-300 font-mono">Dungeons 10 & 11 Cleared</p>
              </div>
              <Award className="w-8 h-8 text-purple-400" />
            </CardContent>
          </Card>

          <Card className="bg-slate-900/80 border border-slate-800 rounded-2xl">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-mono text-slate-400">Penalty Zone Trapped</p>
                <p className="text-2xl font-black text-red-400">{penaltyCount}</p>
                <p className="text-[10px] text-red-400 font-mono">Active Debugging Penalty</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400 animate-pulse" />
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <Button
            variant={activeTab === "matrix" ? "default" : "ghost"}
            onClick={() => setActiveTab("matrix")}
            className={cn("font-mono text-xs gap-2 rounded-xl px-5", activeTab === "matrix" ? "bg-cyan-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white")}
          >
            <Users className="w-4 h-4" /> Live Student Roster Matrix ({students.length})
          </Button>

          <Button
            variant={activeTab === "clans" ? "default" : "ghost"}
            onClick={() => setActiveTab("clans")}
            className={cn("font-mono text-xs gap-2 rounded-xl px-5", activeTab === "clans" ? "bg-purple-500 text-white font-bold" : "text-slate-400 hover:text-white")}
          >
            <Trophy className="w-4 h-4" /> Clan Competition & Codes ({clans.length})
          </Button>
        </div>

        {/* Tab 1: Live Student Matrix */}
        {activeTab === "matrix" && (
          <div className="space-y-4">
            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search student by name, rank, clan..."
                  className="w-full text-xs font-mono pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1"><Filter className="w-3.5 h-3.5" /> Filter:</span>
                <Button
                  size="sm"
                  variant={statusFilter === "all" ? "default" : "outline"}
                  onClick={() => setStatusFilter("all")}
                  className="text-xs font-mono h-8 rounded-lg"
                >
                  All ({students.length})
                </Button>
                <Button
                  size="sm"
                  variant={statusFilter === "penalty" ? "destructive" : "outline"}
                  onClick={() => setStatusFilter("penalty")}
                  className="text-xs font-mono h-8 rounded-lg"
                >
                  Penalty Zone ({penaltyCount})
                </Button>
                <Button
                  size="sm"
                  variant={statusFilter === "cleared" ? "secondary" : "outline"}
                  onClick={() => setStatusFilter("cleared")}
                  className="text-xs font-mono h-8 rounded-lg"
                >
                  Cleared 10+ ({clearedCount})
                </Button>
              </div>
            </div>

            {/* Matrix Table */}
            <Card className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/80 text-xs font-mono text-slate-400 uppercase tracking-wider">
                      <th className="py-4 px-5">Student Identity</th>
                      <th className="py-4 px-5">Rank & Level</th>
                      <th className="py-4 px-5">System XP</th>
                      <th className="py-4 px-5">Dungeons Progress</th>
                      <th className="py-4 px-5">Status</th>
                      <th className="py-4 px-5">Clan / Guild</th>
                      <th className="py-4 px-5">Last Heartbeat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                    {filteredStudents.map((student) => {
                      const cleared = student.completedDungeons.length;
                      const progressPct = Math.round((cleared / 11) * 100);

                      return (
                        <tr key={student.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3.5 px-5 font-bold text-white flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            {student.name}
                          </td>
                          <td className="py-3.5 px-5">
                            <span className="text-cyan-300 font-bold px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/30 text-[10px]">
                              {student.rank} (Lv. {student.level})
                            </span>
                          </td>
                          <td className="py-3.5 px-5 text-amber-400 font-bold">
                            {student.xp.toLocaleString()} XP
                          </td>
                          <td className="py-3.5 px-5 min-w-[160px]">
                            <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                              <span>{cleared} / 11 Cleared</span>
                              <span>{progressPct}%</span>
                            </div>
                            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                              <div
                                className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-amber-400 transition-all duration-500"
                                style={{ width: `${progressPct}%` }}
                              />
                            </div>
                          </td>
                          <td className="py-3.5 px-5">
                            {student.inPenaltyZone ? (
                              <Badge variant="destructive" className="text-[10px] font-bold gap-1 px-2 py-0.5">
                                <AlertTriangle className="w-3 h-3 animate-pulse" /> PENALTY ZONE
                              </Badge>
                            ) : cleared >= 10 ? (
                              <Badge className="bg-emerald-500 text-slate-950 font-bold text-[10px] px-2 py-0.5">
                                ✅ CLEARED
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-[10px] border-slate-700 text-slate-300 px-2 py-0.5">
                                ACTIVE
                              </Badge>
                            )}
                          </td>
                          <td className="py-3.5 px-5 text-purple-300">
                            {student.clanName ? (
                              <span className="px-2 py-0.5 rounded-full bg-purple-950 border border-purple-500/30 text-[10px]">
                                {student.clanName} ({student.clanCode})
                              </span>
                            ) : (
                              <span className="text-slate-600">No Clan</span>
                            )}
                          </td>
                          <td className="py-3.5 px-5 text-slate-500 text-[11px]">
                            {new Date(student.lastActive).toLocaleTimeString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Tab 2: Clan Competitions & Codes */}
        {activeTab === "clans" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Create Admin Clan Card */}
            <Card className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-sm font-mono text-purple-400 font-bold">
                <PlusCircle className="w-4 h-4" />
                <span>GENERATE NEW CLAN & CODE</span>
              </div>

              <form onSubmit={handleAdminCreateClan} className="space-y-3 font-mono text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Clan Name:</label>
                  <input
                    type="text"
                    required
                    value={newClanName}
                    onChange={(e) => setNewClanName(e.target.value)}
                    placeholder="e.g. Shadow Vanguard"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Clan Leader / Creator:</label>
                  <input
                    type="text"
                    required
                    value={newClanLeader}
                    onChange={(e) => setNewClanLeader(e.target.value)}
                    placeholder="e.g. Professor Jin"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Description:</label>
                  <input
                    type="text"
                    value={newClanDesc}
                    onChange={(e) => setNewClanDesc(e.target.value)}
                    placeholder="e.g. Official Class Competition Clan"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-purple-600/20"
                >
                  Generate Clan & Code
                </Button>

                {createdClanNotice && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-purple-500/40 text-purple-300 text-xs font-bold">
                    {createdClanNotice}
                  </div>
                )}
              </form>
            </Card>

            {/* Clans Leaderboard Grid */}
            <div className="lg:col-span-2 space-y-4">
              <div className="text-sm font-mono text-slate-300 font-bold flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>CLAN COMPETITION LEADERBOARDS & CODES ({clans.length})</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clans.map((clan, idx) => (
                  <Card key={clan.code} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400 font-black font-mono text-lg">#{idx + 1}</span>
                        <div>
                          <div className="font-bold text-white text-sm">{clan.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">Leader: {clan.creatorName}</div>
                        </div>
                      </div>
                      <Badge className="bg-purple-950 text-purple-300 border border-purple-500/40 font-mono text-xs px-2.5 py-1">
                        CODE: {clan.code}
                      </Badge>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">{clan.description}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs font-mono">
                      <span className="text-cyan-400 font-bold">{clan.membersCount} Members</span>
                      <span className="text-amber-400 font-bold">{clan.totalXp.toLocaleString()} XP</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
