
"use client";

import type { TutorialPost } from 'contentlayer/generated';
import Link from 'next/link';
import { TutorialNode, TutorialNodeGroup, CTFNode } from './tutorial-node';

interface CybersecurityRoadmapProps {
  tutorials: TutorialPost[];
}

const getCategory = (tutorials: TutorialPost[], category: string) => {
    return tutorials.filter(t => t.category === category).sort((a,b) => a.order - b.order);
}

export function CybersecurityRoadmap({ tutorials }: CybersecurityRoadmapProps) {
  const prerequisites = getCategory(tutorials, "0. Prerequisites");
  const securityFoundations = getCategory(tutorials, "1. Security Foundations");
  const osSecurity = getCategory(tutorials, "2. OS & System Security");
  const networkSecurity = getCategory(tutorials, "3. Network Security");
  const threats = getCategory(tutorials, "4. Threats & Vulnerabilities");
  const appSecurity = getCategory(tutorials, "5. Application Security");
  const iam = getCategory(tutorials, "6. Identity & Access Management (IAM)");
  const secOps = getCategory(tutorials, "7. Security Operations (SecOps)");
  const crypto = getCategory(tutorials, "8. Cryptography");
  const grc = getCategory(tutorials, "9. Governance, Risk & Compliance");
  const cloud = getCategory(tutorials, "10. Cloud Security");
  const offensive = getCategory(tutorials, "11. Offensive Security (Red Team)");

  // Manually defined for layout purposes based on the image
  const ctfs = [
    { title: "HackTheBox", url: "#" },
    { title: "TryHackMe", url: "#" },
    { title: "VulnHub", url: "#" },
    { title: "picoCTF", url: "#" },
    { title: "SANS Holiday Hack Challenge", url: "#" },
  ];

  return (
    <div className="bg-[#F8F9FA] dark:bg-gray-900 min-h-screen p-4 sm:p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
            <header className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Cyber Security Roadmap</h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">An interactive guide to navigating the world of cybersecurity.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
                
                {/* Column 1: Certifications & Tools */}
                <div className="space-y-6">
                    <TutorialNodeGroup title="CTFs (Capture the Flag)">
                        {ctfs.map(ctf => <CTFNode key={ctf.title} title={ctf.title} />)}
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

                {/* Column 2: Fundamental IT & Security Skills */}
                <div className="space-y-6">
                    <TutorialNodeGroup title="Fundamental IT Skills" highlighted>
                        {prerequisites.map(t => <TutorialNode key={t.slug} title={t.title} url={t.url} />)}
                    </TutorialNodeGroup>
                    <TutorialNodeGroup title="Security Skills and Knowledge">
                        {securityFoundations.map(t => <TutorialNode key={t.slug} title={t.title} url={t.url} />)}
                        {iam.map(t => <TutorialNode key={t.slug} title={t.title} url={t.url} />)}
                    </TutorialNodeGroup>
                    <TutorialNodeGroup title="Cryptography">
                        {crypto.map(t => <TutorialNode key={t.slug} title={t.title.replace('(SHA-256)', '').trim()} url={t.url} />)}
                    </TutorialNodeGroup>
                </div>

                {/* Column 3: Networking & OS */}
                <div className="space-y-6">
                    <TutorialNodeGroup title="Operating Systems" highlighted>
                        {osSecurity.map(t => <TutorialNode key={t.slug} title={t.title} url={t.url} />)}
                    </TutorialNodeGroup>
                    <TutorialNodeGroup title="Networking Knowledge">
                        {networkSecurity.map(t => <TutorialNode key={t.slug} title={t.title} url={t.url} />)}
                    </TutorialNodeGroup>
                </div>

                {/* Column 4: Threats, Vulns & Advanced Topics */}
                <div className="space-y-6">
                    <TutorialNodeGroup title="Threats & Vulnerabilities">
                        {threats.map(t => <TutorialNode key={t.slug} title={t.title} url={t.url} />)}
                    </TutorialNodeGroup>
                    <TutorialNodeGroup title="Application Security">
                        {appSecurity.map(t => <TutorialNode key={t.slug} title={t.title} url={t.url} />)}
                    </TutorialNodeGroup>
                    <TutorialNodeGroup title="Cloud Security">
                        {cloud.map(t => <TutorialNode key={t.slug} title={t.title} url={t.url} />)}
                    </TutorialNodeGroup>
                    <TutorialNodeGroup title="Offensive Security (Red Team)">
                        {offensive.map(t => <TutorialNode key={t.slug} title={t.title} url={t.url} />)}
                    </TutorialNodeGroup>
                    <TutorialNodeGroup title="Governance, Risk & Compliance">
                        {grc.map(t => <TutorialNode key={t.slug} title={t.title} url={t.url} />)}
                    </TutorialNodeGroup>
                    <TutorialNodeGroup title="Security Operations (SecOps)">
                        {secOps.map(t => <TutorialNode key={t.slug} title={t.title} url={t.url} />)}
                    </TutorialNodeGroup>
                </div>

            </div>
        </div>
    </div>
  );
}
