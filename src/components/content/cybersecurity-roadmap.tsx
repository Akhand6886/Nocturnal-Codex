
"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { allTutorialPosts } from 'contentlayer/generated';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from '../ui/button';

interface TutorialNodeProps {
  title: string;
  slug?: string;
  isSubHeader?: boolean;
  highlighted?: boolean;
  gridPosition: string; // e.g., "1 / 1" for row-start / col-start
  onClick?: () => void;
}

const TutorialNode = ({ title, slug, isSubHeader = false, highlighted = false, gridPosition, onClick }: TutorialNodeProps) => {
  const baseClasses = "text-center p-2.5 rounded-md border text-xs font-medium transition-all duration-200 ease-in-out shadow-sm flex items-center justify-center";
  
  const stateClasses = slug
    ? "bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md cursor-pointer"
    : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300";

  const subHeaderClasses = isSubHeader ? "font-bold text-gray-600 dark:text-gray-400 bg-transparent border-none shadow-none text-center p-0 mb-1 mt-2 justify-center" : "";
  const highlightedClasses = highlighted ? "bg-[#FFEE93] dark:bg-yellow-800/50 border-yellow-500 dark:border-yellow-600 text-black dark:text-yellow-100" : "";

  const style = { gridArea: gridPosition };

  const content = (
    <div style={style} className={cn(baseClasses, stateClasses, subHeaderClasses, highlightedClasses)} onClick={onClick}>
      {title}
    </div>
  );

  return content;
};

interface NodeData {
  id: string;
  title: string;
  slug?: string;
  isSubHeader?: boolean;
  highlighted?: boolean;
  gridPosition: string; // row / col / row-span / col-span
}

const roadmapNodes: NodeData[] = [
    // Column 1
    { id: 'ctf-header', title: 'CTFs (Capture the Flag)', isSubHeader: true, gridPosition: '1 / 1 / 2 / 3' },
    { id: 'hackthebox', title: 'HackTheBox', slug: '#', gridPosition: '2 / 1 / 3 / 3' },
    { id: 'tryhackme', title: 'TryHackMe', slug: '#', gridPosition: '3 / 1 / 4 / 3' },
    { id: 'vulnhub', title: 'VulnHub', slug: '#', gridPosition: '4 / 1 / 5 / 3' },
    { id: 'picoctf', title: 'picoCTF', slug: '#', gridPosition: '5 / 1 / 6 / 3' },
    { id: 'sans-challenge', title: 'SANS Holiday Hack Challenge', slug: '#', gridPosition: '6 / 1 / 7 / 3' },
    
    { id: 'certs-header', title: 'Certifications', isSubHeader: true, gridPosition: '8 / 1 / 9 / 3' },
    { id: 'beginner-certs', title: 'Beginner Certifications', isSubHeader: true, gridPosition: '9 / 1 / 10 / 3' },
    { id: 'comptia-a', title: 'CompTIA A+', slug: '#', gridPosition: '10 / 1 / 11 / 2' },
    { id: 'comptia-linux', title: 'CompTIA Linux+', slug: '#', gridPosition: '10 / 2 / 11 / 3' },
    { id: 'comptia-net', title: 'CompTIA Network+', slug: '#', gridPosition: '11 / 1 / 12 / 2' },
    { id: 'ccna', title: 'CCNA', slug: '#', gridPosition: '11 / 2 / 12 / 3' },
    { id: 'comptia-sec', title: 'CompTIA Security+', slug: '#', gridPosition: '12 / 1 / 13 / 3' },

    { id: 'advanced-certs', title: 'Advanced Certifications', isSubHeader: true, gridPosition: '14 / 1 / 15 / 3' },
    { id: 'ceh', title: 'CEH', slug: '#', gridPosition: '15 / 1 / 16 / 2' }, { id: 'cisa', title: 'CISA', slug: '#', gridPosition: '15 / 2 / 16 / 3' },
    { id: 'cism', title: 'CISM', slug: '#', gridPosition: '16 / 1 / 17 / 2' }, { id: 'gsec', title: 'GSEC', slug: '#', gridPosition: '16 / 2 / 17 / 3' },
    { id: 'gpen', title: 'GPEN', slug: '#', gridPosition: '17 / 1 / 18 / 2' }, { id: 'gwapt', title: 'GWAPT', slug: '#', gridPosition: '17 / 2 / 18 / 3' },
    { id: 'giac', title: 'GIAC', slug: '#', gridPosition: '18 / 1 / 19 / 2' }, { id: 'oscp', title: 'OSCP', slug: '#', gridPosition: '18 / 2 / 19 / 3' },
    { id: 'crest', title: 'CREST', slug: '#', gridPosition: '19 / 1 / 20 / 2' }, { id: 'cissp', title: 'CISSP', slug: '#', gridPosition: '19 / 2 / 20 / 3' },
    
    // Column 2
    { id: 'cyber-security-title', title: 'Cyber Security', isSubHeader: true, gridPosition: '1 / 4 / 2 / 6' },

    { id: 'it-skills', title: 'Fundamental IT Skills', highlighted: true, slug: 'basic-scripting-with-python', gridPosition: '3 / 4 / 4 / 6' },
    { id: 'comp-hardware', title: 'Computer Hardware Components', slug: 'computer-hardware-components', gridPosition: '5 / 4 / 6 / 6' },
    { id: 'conn-types', title: 'Connection Types and their function', slug: '#', gridPosition: '6 / 4 / 7 / 6' },
    { id: 'os-troubleshoot', title: 'OS-Independent Troubleshooting', slug: '#', gridPosition: '7 / 4 / 8 / 6' },
    { id: 'pop-suites', title: 'Understand Basics of Popular Suites', slug: '#', gridPosition: '8 / 4 / 9 / 6' },
    { id: 'comp-net', title: 'Basics of Computer Networking', slug: 'networking-fundamentals-osi-tcpip', gridPosition: '9 / 4 / 10 / 6' },

    // Column 3 - Right of IT Skills
    { id: 'nfc', title: 'NFC', slug: '#', gridPosition: '5 / 7 / 6 / 8' }, { id: 'bluetooth', title: 'Bluetooth', slug: '#', gridPosition: '5 / 8 / 6 / 9' },
    { id: 'wifi', title: 'WiFi', slug: '#', gridPosition: '6 / 7 / 7 / 8' }, { id: 'infrared', title: 'Infrared', slug: '#', gridPosition: '6 / 8 / 7 / 9' },
    
    { id: 'ms-office', title: 'MS Office Suite', slug: '#', gridPosition: '8 / 7 / 9 / 8' },
    { id: 'icloud', title: 'iCloud', slug: '#', gridPosition: '8 / 8 / 9 / 9' },
    { id: 'gsuite', title: 'Google Suite', slug: '#', gridPosition: '9 / 7 / 10 / 9' },

    // Operating Systems section
    { id: 'os-title', title: 'Operating Systems', highlighted: true, slug: 'operating-systems-basics', gridPosition: '11 / 7 / 12 / 9' },
    { id: 'win', title: 'Windows', slug: 'introduction-to-windows-cmd-powershell', gridPosition: '10 / 7 / 11 / 8' },
    { id: 'linux', title: 'Linux', slug: 'introduction-to-linux-cli', gridPosition: '10 / 8 / 11 / 9' },
    { id: 'macos', title: 'MacOS', slug: '#', gridPosition: '10 / 9 / 11 / 10' },

    { id: 'learn-each-os', title: 'Learn following for each', isSubHeader: true, gridPosition: '12 / 7 / 13 / 10' },
    { id: 'install-config', title: 'Installation and Configuration', slug: '#', gridPosition: '13 / 7 / 14 / 10' },
    { id: 'versions-diffs', title: 'Different Versions and Differences', slug: '#', gridPosition: '14 / 7 / 15 / 10' },
    { id: 'gui-cli', title: 'Navigating using GUI and CLI', slug: '#', gridPosition: '15 / 7 / 16 / 10' },
    { id: 'permissions', title: 'Understand Permissions', slug: '#', gridPosition: '16 / 7 / 17 / 10' },
    { id: 'install-sw', title: 'Installing Software and Applications', slug: '#', gridPosition: '17 / 7 / 18 / 10' },
    { id: 'crud', title: 'Performing CRUD on Files', slug: '#', gridPosition: '18 / 7 / 19 / 10' },
    { id: 'troubleshooting', title: 'Troubleshooting', slug: '#', gridPosition: '19 / 7 / 20 / 10' },
    { id: 'common-commands', title: 'Common Commands', slug: '#', gridPosition: '20 / 7 / 21 / 10' },

    // Networking Knowledge section
    { id: 'net-knowledge', title: 'Networking Knowledge', highlighted: true, slug: 'networking-fundamentals-osi-tcpip', gridPosition: '22 / 7 / 23 / 10' },
    { id: 'osi-model', title: 'Understand the OSI Model', slug: '#', gridPosition: '23 / 7 / 24 / 10' },
    { id: 'common-protocols', title: 'Common Protocols and their Uses', slug: '#', gridPosition: '24 / 7 / 25 / 10' },
    { id: 'common-ports', title: 'Common Ports and their Uses', slug: '#', gridPosition: '25 / 7 / 26 / 10' },
    { id: 'ssl-tls-basics', title: 'SSL and TLS Basics', slug: '#', gridPosition: '26 / 7 / 27 / 10' },
    { id: 'nas-san-basics', title: 'Basics of NAS and SAN', slug: '#', gridPosition: '27 / 7 / 28 / 10' },
    
    // Virtualization section
    { id: 'virt-tech', title: 'Common Virtualization Technologies', isSubHeader: true, gridPosition: '21 / 1 / 22 / 3'},
    { id: 'vmware', title: 'VMWare', slug: '#', gridPosition: '22 / 1 / 23 / 2'}, { id: 'vbox', title: 'VirtualBox', slug: '#', gridPosition: '22 / 2 / 23 / 3'},
    { id: 'esxi', title: 'esxi', slug: '#', gridPosition: '23 / 1 / 24 / 2'}, { id: 'proxmox', title: 'proxmox', slug: '#', gridPosition: '23 / 2 / 24 / 3'},
    
    { id: 'virt-basics', title: 'Basics of Virtualization', isSubHeader: true, gridPosition: '24 / 1 / 25 / 3'},
    { id: 'hypervisor', title: 'Hypervisor', slug: '#', gridPosition: '25 / 1 / 26 / 2'}, { id: 'guestos', title: 'GuestOS', slug: '#', gridPosition: '25 / 2 / 26 / 3'},
    { id: 'hostos', title: 'HostOS', slug: '#', gridPosition: '26 / 1 / 27 / 2'}, { id: 'vm', title: 'VM', slug: '#', gridPosition: '26 / 2 / 27 / 3'},
    
    // IP / Network Terminology
    { id: 'basics-subnet', title: 'Basics of Subnetting', slug: '#', gridPosition: '14 / 4 / 15 / 6' },
    { id: 'pub-priv-ip', title: 'Public vs Private IP Addresses', slug: 'understanding-ip-addresses', gridPosition: '15 / 4 / 16 / 6' },
    { id: 'ip-term', title: 'IP Terminology', isSubHeader: true, gridPosition: '16 / 4 / 17 / 6' },
    { id: 'localhost', title: 'localhost', slug: '#', gridPosition: '17 / 4 / 18 / 5' }, { id: 'loopback', title: 'loopback', slug: '#', gridPosition: '17 / 5 / 18 / 6' },
    { id: 'cidr', title: 'CIDR', slug: '#', gridPosition: '18 / 4 / 19 / 5' }, { id: 'subnet-mask', title: 'subnet mask', slug: '#', gridPosition: '18 / 5 / 19 / 6' },
    { id: 'def-gateway', title: 'default gateway', slug: '#', gridPosition: '19 / 4 / 20 / 6' },
    
    { id: 'understand-term', title: 'Understand the Terminology', isSubHeader: true, gridPosition: '20 / 4 / 21 / 6' },
    { id: 'vlan', title: 'VLAN', slug: '#', gridPosition: '21 / 4 / 22 / 5' }, { id: 'dmz', title: 'DMZ', slug: '#', gridPosition: '21 / 5 / 22 / 6' },
    { id: 'arp', title: 'ARP', slug: '#', gridPosition: '22 / 4 / 23 / 5' }, { id: 'vm-net', title: 'VM', slug: '#', gridPosition: '22 / 5 / 23 / 6' },
    { id: 'dhcp', title: 'DHCP', slug: '#', gridPosition: '23 / 4 / 24 / 5' }, { id: 'dns', title: 'DNS', slug: '#', gridPosition: '23 / 5 / 24 / 6' },
    { id: 'nat', title: 'NAT', slug: '#', gridPosition: '24 / 4 / 25 / 5' }, { id: 'ip', title: 'IP', slug: '#', gridPosition: '24 / 5 / 25 / 6' },
    
    { id: 'router', title: 'Router', slug: '#', gridPosition: '25 / 4 / 26 / 5' }, { id: 'switch', title: 'Switch', slug: '#', gridPosition: '25 / 5 / 26 / 6' },
    { id: 'vpn', title: 'VPN', slug: '#', gridPosition: '26 / 4 / 27 / 6' },

    // More Network stuff
    { id: 'understand-these', title: 'Understand these', isSubHeader: true, gridPosition: '28 / 4 / 29 / 6' },
    { id: 'man', title: 'MAN', slug: '#', gridPosition: '29 / 4 / 30 / 5' }, { id: 'lan', title: 'LAN', slug: '#', gridPosition: '29 / 5 / 30 / 6' },
    { id: 'wan', title: 'WAN', slug: '#', gridPosition: '30 / 4 / 31 / 5' }, { id: 'wlan', title: 'WLAN', slug: '#', gridPosition: '30 / 5 / 31 / 6' },
    
    { id: 'dhcp2', title: 'DHCP', slug: '#', gridPosition: '31 / 4 / 32 / 5' }, { id: 'dns2', title: 'DNS', slug: '#', gridPosition: '31 / 5 / 32 / 6' },
    { id: 'ntp', title: 'NTP', slug: '#', gridPosition: '32 / 4 / 33 / 5' }, { id: 'ipam', title: 'IPAM', slug: '#', gridPosition: '32 / 5 / 33 / 6' },
    { id: 'func-each', title: 'Functions of each', isSubHeader: true, gridPosition: '33 / 4 / 34 / 6' },

    { id: 'star', title: 'Star', slug: '#', gridPosition: '34 / 4 / 35 / 5' }, { id: 'ring', title: 'Ring', slug: '#', gridPosition: '34 / 5 / 35 / 6' },
    { id: 'mesh', title: 'Mesh', slug: '#', gridPosition: '35 / 4 / 36 / 5' }, { id: 'bus', title: 'Bus', slug: '#', gridPosition: '35 / 5 / 36 / 6' },
    { id: 'net-topologies', title: 'Network Topologies', isSubHeader: true, gridPosition: '36 / 4 / 37 / 6' },
    
    { id: 'ssh', title: 'SSH', slug: '#', gridPosition: '37 / 4 / 38 / 5' }, { id: 'rdp', title: 'RDP', slug: '#', gridPosition: '37 / 5 / 38 / 6' },
    { id: 'ftp', title: 'FTP', slug: '#', gridPosition: '38 / 4 / 39 / 5' }, { id: 'sftp', title: 'SFTP', slug: '#', gridPosition: '38 / 5 / 39 / 6' },
    { id: 'http', title: 'HTTP/HTTPS', slug: '#', gridPosition: '39 / 4 / 40 / 5' }, { id: 'ssltls', title: 'SSL/TLS', slug: '#', gridPosition: '39 / 5 / 40 / 6' },
    { id: 'net-protocols', title: 'Network Protocols', isSubHeader: true, gridPosition: '40 / 4 / 41 / 6' },
    
    // Bottom row sections
    { id: 'sec-skills', title: 'Security Skills and Knowledge', highlighted: true, slug: 'intro-to-cybersecurity', gridPosition: '30 / 7 / 31 / 10' },
    { id: 'common-hack', title: 'Understand Common Hacking Tools', slug: '#', gridPosition: '31 / 1 / 32 / 4' }, { id: 'zero-trust', title: 'Core Concepts of Zero Trust', slug: '#', gridPosition: '31 / 4 / 32 / 7' },
    { id: 'exploit-frameworks', title: 'Understand Common Exploit Frameworks', slug: '#', gridPosition: '32 / 1 / 33 / 4' }, { id: 'compliance', title: 'Roles of Compliance and Auditors', slug: '#', gridPosition: '32 / 4 / 33 / 7' },
    { id: 'defense-in-depth', title: 'Understand Concept of Defense in Depth', slug: '#', gridPosition: '33 / 1 / 34 / 4' }, { id: 'risk-def', title: 'Understand the Definition of Risk', slug: '#', gridPosition: '33 / 4 / 34 / 7' },
    { id: 'runbooks', title: 'Understand Concept of Runbooks', slug: '#', gridPosition: '34 / 1 / 35 / 4' }, { id: 'backup-resiliency', title: 'Understand Backups and Resiliency', slug: '#', gridPosition: '34 / 4 / 35 / 7' },
    { id: 'forensics', title: 'Understand Basics of Forensics', slug: '#', gridPosition: '35 / 1 / 36 / 4' }, { id: 'kill-chain', title: 'Cyber Kill Chain', slug: '#', gridPosition: '35 / 4 / 36 / 7' },
    { id: 'threat-hunting', title: 'Basics and Concepts of Threat Hunting', slug: '#', gridPosition: '36 / 1 / 37 / 4' }, { id: 'mfa', title: 'MFA & 2FA', slug: '#', gridPosition: '36 / 4 / 37 / 6' }, { id: 'honeypots', title: 'Honeypots', slug: '#', gridPosition: '36 / 6 / 37 / 7' },
    { id: 'vuln-mgmt', title: 'Basics of Vulnerability Management', slug: '#', gridPosition: '37 / 1 / 38 / 4' }, { id: 'os-hardening', title: 'Operating System Hardening', slug: '#', gridPosition: '37 / 4 / 38 / 7' },
    { id: 'rev-eng', title: 'Basics of Reverse Engineering', slug: '#', gridPosition: '38 / 1 / 39 / 4' }, { id: 'isolation', title: 'Understand Concept of Isolation', slug: '#', gridPosition: '38 / 4 / 39 / 7' },
    { id: 'roe', title: 'Penetration Testing Rules of Engagement', slug: '#', gridPosition: '39 / 1 / 40 / 4' }, { id: 'ids-ips', title: 'Basics of IDS and IPS', slug: '#', gridPosition: '39 / 4 / 40 / 7' },
    { id: 'segmentation', title: 'Perimiter vs DMZ vs Segmentation', slug: '#', gridPosition: '40 / 1 / 41 / 4' }, { id: 'authn-authz', title: 'Authentication vs Authorization', slug: '#', gridPosition: '40 / 4 / 41 / 7' },
    
    // Right side of bottom row
    { id: 'blue-red', title: 'Blue / Red / Purple Teams', slug: '#', gridPosition: '31 / 7 / 32 / 10' },
    { id: 'false-neg', title: 'False Negative / False Positive', slug: '#', gridPosition: '32 / 7 / 33 / 10' },
    { id: 'true-neg', title: 'True Negative / True Positive', slug: '#', gridPosition: '33 / 7 / 34 / 10' },
    { id: 'threat-intel', title: 'Basics of Threat Intel, OSINT', slug: '#', gridPosition: '34 / 7 / 35 / 10' },
    { id: 'handshakes', title: 'Understand Handshakes', slug: '#', gridPosition: '35 / 7 / 36 / 10' },
    { id: 'cia-triad', title: 'Understand CIA Triad', slug: '#', gridPosition: '36 / 7 / 37 / 10' },
    { id: 'priv-esc', title: 'Privilege Escalation', slug: '#', gridPosition: '37 / 7 / 38 / 10' },
    { id: 'web-attacks', title: 'Web Based Attacks and OWASP10', slug: '#', gridPosition: '38 / 7 / 39 / 10' },
    { id: 'malware', title: 'Learn how Malware works and Types', slug: '#', gridPosition: '39 / 7 / 40 / 10' },

    // Very bottom left
    { id: 'incident-tools', title: 'Tools for Incident Response and Discovery', isSubHeader: true, gridPosition: '42 / 1 / 43 / 4' },
    { id: 'dig', title: 'dig', slug: '#', gridPosition: '43 / 1 / 44 / 2' }, { id: 'nmap', title: 'nmap', slug: '#', gridPosition: '43 / 2 / 44 / 3' }, { id: 'ping', title: 'ping', slug: '#', gridPosition: '43 / 3 / 44 / 4' },
    { id: 'tail', title: 'tail', slug: '#', gridPosition: '44 / 1 / 45 / 2' }, { id: 'hping', title: 'hping', slug: '#', gridPosition: '44 / 2 / 45 / 3' }, { id: 'head', title: 'head', slug: '#', gridPosition: '44 / 3 / 45 / 4' },
    { id: 'tracert', title: 'tracert', slug: '#', gridPosition: '45 / 1 / 46 / 2' }, { id: 'winhex', title: 'winhex', slug: '#', gridPosition: '45 / 2 / 46 / 3' }, { id: 'autopsy', title: 'autopsy', slug: '#', gridPosition: '45 / 3 / 46 / 4' },
    { id: 'curl', title: 'curl', slug: '#', gridPosition: '46 / 1 / 47 / 2' }, { id: 'wireshark', title: 'wireshark', slug: '#', gridPosition: '46 / 2 / 47 / 3' }, { id: 'memdump', title: 'memdump', slug: '#', gridPosition: '46 / 3 / 47 / 4' },
    { id: 'arp', title: 'arp', slug: '#', gridPosition: '43 / 4 / 44 / 5' }, { id: 'cat', title: 'cat', slug: '#', gridPosition: '43 / 5 / 44 / 6' },
    { id: 'grep', title: 'grep', slug: '#', gridPosition: '44 / 4 / 45 / 5' }, { id: 'nslookup', title: 'nslookup', slug: '#', gridPosition: '44 / 5 / 45 / 6' },
    { id: 'ipconfig', title: 'ipconfig', slug: '#', gridPosition: '45 / 4 / 46 / 6' },
    
    // Very bottom middle
    { id: 'crypto-basics', title: 'Basics of Cryptography', isSubHeader: true, gridPosition: '42 / 4 / 43 / 7' },
    { id: 'salting', title: 'Salting', slug: '#', gridPosition: '43 / 4 / 44 / 5' }, { id: 'hashing', title: 'Hashing', slug: '#', gridPosition: '43 / 5 / 44 / 6' }, { id: 'key-exchange', title: 'Key Exchange', slug: '#', gridPosition: '43 / 6 / 44 / 7' },
    { id: 'priv-pub-keys', title: 'Private vs Public Keys', slug: '#', gridPosition: '44 / 4 / 45 / 7' },
    
    // Very bottom right
    { id: 'attack-types', title: 'Attack Types and Differences', isSubHeader: true, gridPosition: '41 / 7 / 42 / 10' },
    { id: 'phishing', title: 'Phishing', slug: '#', gridPosition: '42 / 7 / 43 / 8' }, { id: 'whishing', title: 'Whishing', slug: '#', gridPosition: '42 / 8 / 43 / 9' }, { id: 'whaling', title: 'Whaling', slug: '#', gridPosition: '42 / 9 / 43 / 10' },
    { id: 'smishing', title: 'Smishing', slug: '#', gridPosition: '43 / 7 / 44 / 8' }, { id: 'spam-spim', title: 'Spam vs Spim', slug: '#', gridPosition: '43 / 8 / 44 / 10' },
    { id: 'shoulder-surf', title: 'Shoulder Surfing', slug: '#', gridPosition: '44 / 7 / 45 / 9' }, { id: 'tailgating', title: 'Tailgating', slug: '#', gridPosition: '44 / 9 / 45 / 10' },
    { id: 'dumpster', title: 'Dumpster Diving', slug: '#', gridPosition: '45 / 7 / 46 / 10' },

];


interface Line {
    from: string;
    to: string;
    style?: 'solid' | 'dotted';
}

const connections: Line[] = [
    { from: 'it-skills', to: 'comp-hardware' },
    { from: 'it-skills', to: 'conn-types' },
    { from: 'it-skills', to: 'os-troubleshoot' },
    { from: 'it-skills', to: 'pop-suites' },
    { from: 'it-skills', to: 'comp-net' },

    { from: 'conn-types', to: 'nfc', style: 'dotted' },
    { from: 'conn-types', to: 'wifi', style: 'dotted' },
    { from: 'pop-suites', to: 'ms-office', style: 'dotted' },
    { from: 'pop-suites', to: 'gsuite', style: 'dotted' },

    { from: 'comp-net', to: 'basics-subnet' },
    { from: 'basics-subnet', to: 'pub-priv-ip' },
    { from: 'pub-priv-ip', to: 'ip-term' },

    { from: 'it-skills', to: 'os-title', style: 'dotted' },
    { from: 'os-title', to: 'learn-each-os' },

    { from: 'it-skills', to: 'net-knowledge', style: 'dotted' },

    // This is a rough approximation of lines. A real implementation would need more complex logic or explicit coordinates
];

type ModalContent = {
  title: string;
  description: string;
  url: string;
} | null;


export function CybersecurityRoadmap() {
    const [scale, setScale] = useState(0.35);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });
    const canvasRef = useRef<HTMLDivElement>(null);
    const [modalContent, setModalContent] = useState<ModalContent>(null);

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const newScale = Math.max(0.1, Math.min(2, scale - e.deltaY * 0.001));
        setScale(newScale);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        setStartDrag({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        setPosition({
            x: e.clientX - startDrag.x,
            y: e.clientY - startDrag.y
        });
    };

    const handleMouseUp = () => setIsDragging(false);

    const handleNodeClick = (node: NodeData) => {
        const tutorial = allTutorialPosts.find(p => p.language === 'cybersecurity' && p.slug === node.slug);
        if (tutorial) {
             setModalContent({
                title: tutorial.title,
                description: tutorial.description,
                url: tutorial.url
            });
        } else if (node.slug && node.slug !== '#') {
            console.warn(`No tutorial found for slug: ${node.slug}`);
            // Fallback for nodes that might not have a direct tutorial link yet
            setModalContent({
                title: node.title,
                description: "More information about this topic will be available soon.",
                url: "#"
            });
        }
    };
    
    return (
        <div className="w-full h-[calc(100vh-4rem)] bg-[#F8F9FA] dark:bg-[#212529] overflow-hidden" ref={canvasRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
             <div className="absolute top-2 right-2 bg-white/70 dark:bg-black/70 p-2 rounded-lg text-xs text-gray-600 dark:text-gray-300 shadow-md">
                Use scroll to zoom, click and drag to pan.
            </div>
            <div
                className="transition-transform duration-100 ease-out"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    transformOrigin: '0 0',
                    cursor: isDragging ? 'grabbing' : 'grab'
                }}
            >
                <div className="relative w-[4000px] h-[3000px]">
                    <div className="absolute inset-0 grid p-10 gap-x-2 gap-y-1" style={{
                        gridTemplateColumns: 'repeat(10, 1fr)',
                        gridTemplateRows: 'repeat(50, 40px)',
                        fontFamily: 'Arial, sans-serif',
                    }}>
                        {roadmapNodes.map((node) => (
                            <TutorialNode
                                key={node.id}
                                title={node.title}
                                slug={node.slug}
                                isSubHeader={node.isSubHeader}
                                highlighted={node.highlighted}
                                gridPosition={node.gridPosition}
                                onClick={() => handleNodeClick(node)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <AlertDialog open={!!modalContent} onOpenChange={(isOpen) => !isOpen && setModalContent(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{modalContent?.title}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {modalContent?.description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Close</AlertDialogCancel>
                        {modalContent?.url && modalContent.url !== '#' && (
                             <Button asChild>
                                <Link href={modalContent.url}>Go to Tutorial</Link>
                            </Button>
                        )}
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

