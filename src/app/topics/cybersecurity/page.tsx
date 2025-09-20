
import { Facebook, Youtube, Linkedin, ExternalLink, ArrowDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Cybersecurity Roadmap | Nocturnal Codex",
  description: "A visual, interactive roadmap for learning cybersecurity, from fundamental IT skills to advanced security concepts.",
};

// --- Component Definitions for Roadmap Blocks ---

// Type for a single roadmap item/node
type RoadmapNodeProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'purple' | 'plain';
};

// Generic block component with variants for different colors
const RoadmapNode = ({ children, className, variant = 'default' }: RoadmapNodeProps) => {
  const baseClasses = 'text-center text-xs sm:text-sm font-medium p-2.5 rounded-lg shadow-sm border';
  const colorClasses = {
    default: 'bg-orange-100 text-orange-900 border-orange-200 dark:bg-yellow-900/30 dark:text-yellow-200 dark:border-yellow-800/50',
    primary: 'bg-yellow-300 text-yellow-900 border-yellow-400/80 dark:bg-yellow-500 dark:text-yellow-950 dark:border-yellow-600',
    secondary: 'bg-white text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700',
    purple: 'bg-purple-200 text-purple-900 border-purple-300 dark:bg-purple-900/50 dark:text-purple-200 dark:border-purple-800/60',
    plain: 'text-center font-semibold text-gray-700 dark:text-gray-300 py-1'
  };
  return <div className={cn(baseClasses, colorClasses[variant], className)}>{children}</div>;
};

// --- Main Page Component ---
export default function CybersecurityRoadmapPage() {

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen p-4 md:p-8">
      <div className="max-w-screen-xl mx-auto">
        <header className="flex justify-between items-start mb-8 flex-wrap gap-4">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Cyber Security Roadmap</h1>
                <p className="text-gray-500 dark:text-gray-400">A guide to becoming a cybersecurity professional.</p>
            </div>
            <div className="text-right text-xs p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-blue-600 text-white dark:bg-blue-700/80 shadow-lg">
                <p className="font-semibold">Find the detailed version of this roadmap along with other similar roadmaps</p>
                <a href="https://roadmap.sh" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:underline flex items-center justify-end gap-1 font-bold">
                    roadmap.sh <ExternalLink className="w-3 h-3" />
                </a>
            </div>
        </header>

        <main className="flex justify-center gap-4 sm:gap-6">
          {/* Social Icons Column */}
          <aside className="hidden sm:flex flex-col items-center space-y-4 pt-16">
            <Facebook className="text-gray-400 w-5 h-5" />
            <Youtube className="text-gray-400 w-5 h-5" />
            <Linkedin className="text-gray-400 w-5 h-5" />
          </aside>

          {/* Left Column: CTFs & Certs */}
          <div className="flex flex-col gap-y-4 w-1/5 max-w-xs">
            <RoadmapNode variant="purple">CTFs (Capture the Flag)</RoadmapNode>
            {['HackTheBox', 'TryHackMe', 'VulnHub', 'picoCTF', 'SANS Holiday Hack Challenge'].map(item => <RoadmapNode key={item}>{item}</RoadmapNode>)}
            
            <RoadmapNode variant="plain">Certifications</RoadmapNode>
            <RoadmapNode variant="secondary" className="font-bold">Beginner Certifications</RoadmapNode>
            <div className="grid grid-cols-2 gap-2">
                <RoadmapNode variant="secondary">CompTIA A+</RoadmapNode>
                <RoadmapNode variant="secondary">CompTIA Linux+</RoadmapNode>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <RoadmapNode variant="secondary">CompTIA Network+</RoadmapNode>
                <RoadmapNode variant="secondary">CCNA</RoadmapNode>
            </div>
            <RoadmapNode variant="secondary">CompTIA Security+</RoadmapNode>

            <RoadmapNode variant="secondary" className="font-bold mt-2">Advanced Certifications</RoadmapNode>
             <div className="grid grid-cols-3 gap-2">
                {['CEH', 'CISA', 'CISM', 'GSEC', 'GPEN', 'GWAPT', 'GIAC', 'OSCP', 'CREST'].map(item => <RoadmapNode variant="secondary" key={item}>{item}</RoadmapNode>)}
            </div>
            <RoadmapNode variant="secondary">CISSP</RoadmapNode>

             <RoadmapNode variant="plain" className="mt-2">Common Virtualization Technologies</RoadmapNode>
             <div className="grid grid-cols-2 gap-2">
                {['VMWare', 'VirtualBox', 'esxi', 'proxmox'].map(item => <RoadmapNode key={item}>{item}</RoadmapNode>)}
            </div>
            <RoadmapNode variant="plain" className="mt-2">Basics of Virtualization</RoadmapNode>
             <div className="grid grid-cols-2 gap-2">
                {['Hypervisor', 'GuestOS', 'HostOS', 'VM'].map(item => <RoadmapNode key={item}>{item}</RoadmapNode>)}
            </div>
            <RoadmapNode variant="plain" className="mt-2">Troubleshooting Tools</RoadmapNode>
             <div className="grid grid-cols-4 gap-1 text-[10px] sm:text-xs">
                 {['ipconfig', 'ping', 'dig', 'netstat', 'route', 'nmap', 'tcpdump', 'arp', 'tracert', 'nslookup', 'iptables'].map(item => <RoadmapNode key={item} className="p-1.5">{item}</RoadmapNode>)}
             </div>
             {['Packet Sniffers', 'Port Scanners', 'Protocol Analyzers'].map(item => <RoadmapNode key={item}>{item}</RoadmapNode>)}
            <RoadmapNode variant="plain" className="mt-2">Authentication Methodologies</RoadmapNode>
             <div className="grid grid-cols-4 gap-1 text-[10px] sm:text-xs">
                {['Kerberos', 'RADIUS', 'LDAP', 'SSO'].map(item => <RoadmapNode key={item} className="p-1.5">{item}</RoadmapNode>)}
             </div>
             <div className="grid grid-cols-2 gap-2">
                {['Certificates', 'Local Auth'].map(item => <RoadmapNode key={item}>{item}</RoadmapNode>)}
             </div>
          </div>

          {/* Center Column: Main Path */}
          <div className="flex flex-col items-center gap-y-4 w-3/5 max-w-md relative">
              <RoadmapNode variant="primary">Fundamental IT Skills</RoadmapNode>
              <ArrowDown className="text-gray-400 dark:text-gray-600 w-5 h-5"/>
              {['Computer Hardware Components', 'Connection Types and their function', 'OS-Independent Troubleshooting', 'Understand Basics of Popular Suites', 'Basics of Computer Networking'].map(item => <RoadmapNode key={item}>{item}</RoadmapNode>)}
              <ArrowDown className="text-gray-400 dark:text-gray-600 w-5 h-5"/>
              <RoadmapNode variant="primary">Operating Systems</RoadmapNode>
              <ArrowDown className="text-gray-400 dark:text-gray-600 w-5 h-5"/>
              <RoadmapNode variant="secondary" className="font-bold">Learn following for each</RoadmapNode>
              {['Installation and Configuration', 'Different Versions and Differences', 'Navigating using GUI and CLI', 'Understand Permissions', 'Installing Software and Applications', 'Performing CRUD on Files', 'Troubleshooting', 'Common Commands'].map(item => <RoadmapNode key={item}>{item}</RoadmapNode>)}
              <ArrowDown className="text-gray-400 dark:text-gray-600 w-5 h-5"/>
              <RoadmapNode variant="primary">Networking Knowledge</RoadmapNode>
              <ArrowDown className="text-gray-400 dark:text-gray-600 w-5 h-5"/>
              {['Understand the OSI Model', 'Common Protocols and their Uses', 'Common Ports and their Uses', 'SSL and TLS Basics', 'Basics of NAS and SAN'].map(item => <RoadmapNode key={item}>{item}</RoadmapNode>)}
              <ArrowDown className="text-gray-400 dark:text-gray-600 w-5 h-5"/>
              <RoadmapNode variant="primary">Security Skills and Knowledge</RoadmapNode>
              <div className="grid grid-cols-2 gap-x-4 w-full pt-4">
                  {/* Left side of security skills */}
                  <div className="flex flex-col gap-y-2">
                      {['Understand Common Hacking Tools', 'Understand Common Exploit Frameworks', 'Understand Concept of Defense in Depth', 'Understand Concept of Runbooks', 'Understand Basics of Forensics', 'Basics and Concepts of Threat Hunting', 'Basics of Vulnerability Management', 'Basics of Reverse Engineering', 'Penetration Testing Rules of Engagement', 'Perimiter vs DMZ vs Segmentation'].map(item => <RoadmapNode key={item}>{item}</RoadmapNode>)}
                  </div>
                  {/* Right side of security skills */}
                  <div className="flex flex-col gap-y-2">
                      {['Core Concepts of Zero Trust', 'Roles of Compliance and Auditors', 'Understand the Definition of Risk', 'Understand Backups and Resiliency', 'Cyber Kill Chain', 'MFA & 2FA', 'Operating System Hardening', 'Understand Concept of Isolation', 'Basics of IDS and IPS', 'Authentication vs Authorization'].map(item => <RoadmapNode key={item}>{item}</RoadmapNode>)}
                  </div>
              </div>
          </div>

          {/* Right Column: Details & Side Knowledge */}
          <div className="flex flex-col gap-y-4 w-1/5 max-w-xs pt-24">
              <div className="grid grid-cols-2 gap-2">
                  {['NFC', 'Bluetooth', 'WiFi', 'Infrared'].map(item => <RoadmapNode key={item}>{item}</RoadmapNode>)}
              </div>
              <div className="grid grid-cols-1 gap-2 mt-12">
                   {['MS Office Suite', 'iCloud', 'Google Suite'].map(item => <RoadmapNode key={item}>{item}</RoadmapNode>)}
              </div>
               <div className="grid grid-cols-3 gap-2 mt-16">
                  {['Windows', 'Linux', 'MacOS'].map(item => <RoadmapNode key={item}>{item}</RoadmapNode>)}
              </div>

               {/* Networking Side Details */}
              <div className="mt-[28rem] flex flex-col gap-y-4">
                <RoadmapNode variant="secondary" className="font-bold">Basics of Subnetting</RoadmapNode>
                <RoadmapNode variant="secondary">Public vs Private IP Addresses</RoadmapNode>
                <RoadmapNode variant="secondary" className="font-bold">IP Terminology</RoadmapNode>
                <div className="grid grid-cols-3 gap-1 text-[10px] sm:text-xs"><RoadmapNode>localhost</RoadmapNode><RoadmapNode>loopback</RoadmapNode><RoadmapNode>CIDR</RoadmapNode></div>
                <RoadmapNode>subnet mask</RoadmapNode>
                <RoadmapNode>default gateway</RoadmapNode>
                <RoadmapNode variant="secondary" className="font-bold">Understand the Terminology</RoadmapNode>
                <div className="grid grid-cols-4 gap-1 text-[10px] sm:text-xs">{['VLAN', 'DMZ', 'ARP', 'VM', 'DHCP', 'DNS', 'NAT', 'IP'].map(item => <RoadmapNode className="p-1.5" key={item}>{item}</RoadmapNode>)}</div>
                <div className="grid grid-cols-3 gap-1 text-[10px] sm:text-xs">{['Router', 'Switch', 'VPN'].map(item => <RoadmapNode className="p-1.5" key={item}>{item}</RoadmapNode>)}</div>
                <RoadmapNode variant="secondary" className="font-bold">Understand these</RoadmapNode>
                <div className="grid grid-cols-4 gap-1 text-[10px] sm:text-xs">{['MAN', 'LAN', 'WAN', 'WLAN'].map(item => <RoadmapNode className="p-1.5" key={item}>{item}</RoadmapNode>)}</div>
                 <RoadmapNode variant="secondary" className="font-bold">Functions of each</RoadmapNode>
                 <div className="grid grid-cols-4 gap-1 text-[10px] sm-text-xs">{['DHCP', 'DNS', 'NTP', 'IPAM'].map(item => <RoadmapNode className="p-1.5" key={item}>{item}</RoadmapNode>)}</div>
                 <RoadmapNode variant="secondary" className="font-bold">Network Topologies</RoadmapNode>
                 <div className="grid grid-cols-4 gap-1 text-[10px] sm-text-xs">{['Star', 'Ring', 'Mesh', 'Bus'].map(item => <RoadmapNode className="p-1.5" key={item}>{item}</RoadmapNode>)}</div>
                 <RoadmapNode variant="secondary" className="font-bold">Network Protocols</RoadmapNode>
                 <div className="grid grid-cols-4 gap-1 text-[10px] sm-text-xs">{['SSH', 'RDP', 'FTP', 'SFTP'].map(item => <RoadmapNode className="p-1.5" key={item}>{item}</RoadmapNode>)}</div>
                 <div className="grid grid-cols-2 gap-2">{['HTTP / HTTPS', 'SSL / TLS'].map(item => <RoadmapNode key={item}>{item}</RoadmapNode>)}</div>
              </div>

               {/* Security Skills Side Details */}
               <div className="mt-[13rem] flex flex-col gap-y-2">
                   {['Blue / Red / Purple Teams', 'False Negative / False Positive', 'True Negative / True Positive', 'Basics of Threat Intel, OSINT', 'Understand Handshakes', 'Understand CIA Triad', 'Privilege Escalation', 'Web Based Attacks and OWASP10', 'Learn how Malware works and Types'].map(item => <RoadmapNode key={item}>{item}</RoadmapNode>)}
                   <div className="grid grid-cols-2 gap-2 mt-2"><RoadmapNode>Honeypots</RoadmapNode></div>
               </div>
          </div>
        </main>
        
        <footer className="mt-12 flex justify-between items-end">
            <div className="w-full max-w-xs p-4 rounded-lg bg-gray-800 border border-gray-700 shadow-lg">
                <p className="text-sm font-medium text-gray-200 flex items-center gap-2"><span className="text-yellow-400">✨</span> AI Tutor</p>
                <input 
                    type="text"
                    placeholder="Have a question? Type here"
                    className="w-full mt-2 bg-transparent text-sm text-gray-400 outline-none border-b border-gray-600 focus:border-yellow-400 transition-colors"
                />
            </div>

            <div className="flex flex-col gap-y-4">
                <RoadmapNode variant="plain">Tools for Incident Response and Discovery</RoadmapNode>
                <div className="grid grid-cols-6 gap-1 text-[10px] sm:text-xs">
                    {['dig', 'nmap', 'ping', 'arp', 'cat', 'dd', 'tail', 'hping', 'head', 'grep', 'nslookup', 'tracert', 'winhex', 'autopsy', 'ipconfig', 'curl', 'wireshark', 'memdump'].map(item => <RoadmapNode className="p-1.5" key={item}>{item}</RoadmapNode>)}
                </div>
            </div>

             <div className="flex flex-col gap-y-4">
                <RoadmapNode variant="plain">Basics of Cryptography</RoadmapNode>
                <div className="grid grid-cols-3 gap-2"><RoadmapNode>Salting</RoadmapNode><RoadmapNode>Hashing</RoadmapNode><RoadmapNode>Key Exchange</RoadmapNode></div>
                <RoadmapNode>Private vs Public Keys</RoadmapNode>
                <RoadmapNode>Understand Handshakes</RoadmapNode>
            </div>
            
            <div className="flex flex-col gap-y-2">
                <RoadmapNode variant="plain">Attack Types and Differences</RoadmapNode>
                <div className="grid grid-cols-3 gap-2"><RoadmapNode>Phishing</RoadmapNode><RoadmapNode>Whishing</RoadmapNode><RoadmapNode>Whaling</RoadmapNode></div>
                <div className="grid grid-cols-3 gap-2"><RoadmapNode>Smishing</RoadmapNode><Roadm