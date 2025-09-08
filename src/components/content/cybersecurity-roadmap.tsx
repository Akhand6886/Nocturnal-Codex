// src/components/content/cybersecurity-roadmap.tsx
import { TutorialNode, TutorialNodeGroup, CTFNode } from '@/components/content/tutorial-node';
import { ShieldCheck, Flag, Star } from 'lucide-react';

export function CybersecurityRoadmap() {
  return (
    <div className="container mx-auto px-4 py-10 md:py-12">
      <header className="pb-8 border-b border-border text-center">
        <ShieldCheck className="mx-auto h-16 w-16 text-primary" />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mt-4">
          Cybersecurity Learning Roadmap
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          A visual guide to the skills and knowledge required in the field of cybersecurity.
        </p>
      </header>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {/* Column 1: CTFs & Certs */}
        <div className="space-y-6">
          <TutorialNodeGroup title="CTFs (Capture the Flag)" highlighted>
            <CTFNode title="HackTheBox" />
            <CTFNode title="TryHackMe" />
            <CTFNode title="VulnHub" />
            <CTFNode title="picoCTF" />
            <CTFNode title="SANS Holiday Hack Challenge" />
          </TutorialNodeGroup>
          <TutorialNodeGroup title="Certifications">
            <TutorialNode title="Beginner Certifications" isSubHeader />
            <div className="grid grid-cols-2 gap-2">
                <TutorialNode title="CompTIA A+" />
                <TutorialNode title="CompTIA Linux+" />
                <TutorialNode title="CompTIA Network+" />
                <TutorialNode title="CCNA" />
            </div>
            <TutorialNode title="CompTIA Security+" />
             <TutorialNode title="Advanced Certifications" isSubHeader />
             <div className="grid grid-cols-3 gap-2">
                <TutorialNode title="CEH" />
                <TutorialNode title="CISA" />
                <TutorialNode title="CISM" />
                <TutorialNode title="GSEC" />
                <TutorialNode title="GPEN" />
                <TutorialNode title="GWAPT" />
                <TutorialNode title="GIAC" />
                <TutorialNode title="OSCP" />
                <TutorialNode title="CREST" />
             </div>
             <TutorialNode title="CISSP" />
          </TutorialNodeGroup>
        </div>

        {/* Column 2: IT & Virtualization */}
        <div className="space-y-6">
          <TutorialNodeGroup title="Fundamental IT Skills" highlighted>
            <TutorialNode title="Computer Hardware Components" />
            <TutorialNode title="Connection Types" />
            <TutorialNode title="OS-Independent Troubleshooting" />
            <TutorialNode title="Basics of Popular Suites" />
            <TutorialNode title="Basics of Computer Networking" />
          </TutorialNodeGroup>
          <TutorialNodeGroup title="Common Virtualization Technologies">
            <div className="grid grid-cols-2 gap-2">
                <TutorialNode title="VMWare" />
                <TutorialNode title="VirtualBox" />
                <TutorialNode title="esxi" />
                <TutorialNode title="proxmox" />
            </div>
            <TutorialNode title="Basics of Virtualization" isSubHeader />
             <div className="grid grid-cols-2 gap-2">
                <TutorialNode title="Hypervisor" />
                <TutorialNode title="GuestOS" />
                <TutorialNode title="HostOS" />
                <TutorialNode title="VM" />
            </div>
          </TutorialNodeGroup>
           <TutorialNodeGroup title="Troubleshooting Tools">
                <div className="grid grid-cols-4 gap-2">
                    <TutorialNode title="ipconfig" />
                    <TutorialNode title="ping" />
                    <TutorialNode title="dig" />
                    <TutorialNode title="netstat" />
                    <TutorialNode title="route" />
                    <TutorialNode title="nmap" />
                    <TutorialNode title="tcpdump" />
                    <TutorialNode title="arp" />
                    <TutorialNode title="tracert" />
                    <TutorialNode title="nslookup" />
                    <TutorialNode title="iptables" />
                </div>
                 <TutorialNode title="Packet Sniffers" />
                 <TutorialNode title="Port Scanners" />
                 <TutorialNode title="Protocol Analyzers" />
            </TutorialNodeGroup>
        </div>

        {/* Column 3: Networking & OS */}
        <div className="space-y-6">
           <TutorialNodeGroup title="Operating Systems" highlighted>
                <div className="grid grid-cols-3 gap-2">
                    <TutorialNode title="Windows" />
                    <TutorialNode title="Linux" />
                    <TutorialNode title="MacOS" />
                </div>
                <TutorialNode title="Learn the following for each:" isSubHeader />
                <TutorialNode title="Installation and Configuration" />
                <TutorialNode title="Permissions" />
                <TutorialNode title="Installing Software" />
                <TutorialNode title="CRUD on Files" />
                <TutorialNode title="Common Commands" />
          </TutorialNodeGroup>
          <TutorialNodeGroup title="Networking Knowledge" highlighted>
            <TutorialNode title="Basics of Subnetting" />
            <TutorialNode title="Public vs Private IP Addresses" />
            <TutorialNode title="IP Terminology" />
            <TutorialNode title="Understand the OSI Model" />
            <TutorialNode title="Common Protocols and their Uses" />
            <TutorialNode title="Common Ports and their Uses" />
            <TutorialNode title="Network Protocols" />
            <TutorialNode title="Network Topologies" />
          </TutorialNodeGroup>
        </div>
        
        {/* Column 4: Security Skills */}
        <div className="space-y-6">
            <TutorialNodeGroup title="Security Skills and Knowledge" highlighted>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <TutorialNode title="Understand Hacking Tools" />
                    <TutorialNode title="Core Concepts of Zero Trust" />
                    <TutorialNode title="Understand Exploit Frameworks" />
                    <TutorialNode title="Defense in Depth" />
                    <TutorialNode title="Cyber Kill Chain" />
                    <TutorialNode title="Basics of Forensics" />
                    <TutorialNode title="Basics of Threat Hunting" />
                    <TutorialNode title="Vulnerability Management" />
                    <TutorialNode title="Reverse Engineering" />
                    <TutorialNode title="MFA & 2FA" />
                    <TutorialNode title="Operating System Hardening" />
                    <TutorialNode title="Basics of IDS and IPS" />
                    <TutorialNode title="Authentication vs Authorization" />
                    <TutorialNode title="Basics of Cryptography" />
                    <TutorialNode title="Attack Types" />
                </div>
            </TutorialNodeGroup>
        </div>

      </div>
    </div>
  );
}
