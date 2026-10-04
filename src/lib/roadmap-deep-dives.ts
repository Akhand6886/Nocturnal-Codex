export interface ProductionRecipe {
  title: string;
  description: string;
  code: string;
  language: string;
  explanation: string;
}

export interface IncidentPostMortem {
  title: string;
  severity: 'P0 - Outage' | 'P1 - Degraded' | 'P2 - Latency Spike';
  rootCause: string;
  symptoms: string[];
  diagnosticCommand: string;
  resolution: string;
  prevention: string;
}

export interface DiagnosticCommand {
  command: string;
  purpose: string;
  flagsExplained?: string;
  typicalOutput?: string;
}

export interface TopicDeepDiveGuide {
  executiveOverview: string;
  coreInternals: {
    title: string;
    description: string;
    mechanisms: { name: string; detail: string }[];
  };
  productionRecipes: ProductionRecipe[];
  incidentPostMortems: IncidentPostMortem[];
  diagnosticArsenal: DiagnosticCommand[];
  sreGoldenRules: string[];
}

export function resolveTopicDeepDiveGuide(
  roadmapSlug: string,
  topicId: string,
  topicLabel: string
): TopicDeepDiveGuide {
  const tid = topicId.toLowerCase();
  const lbl = topicLabel.toLowerCase();
  const rs = roadmapSlug.toLowerCase();

  // 1. LINUX INTERNALS & BASH AUTOMATION
  if (tid === 'linux-shell' || tid === 'bash' || lbl.includes('linux') || lbl.includes('shell')) {
    return {
      executiveOverview:
        'The Linux kernel powers modern hyperscale infrastructure. Production operations require navigating core kernel subsystems: the Virtual File System (VFS), Inode tables, per-process file descriptors (0 stdin, 1 stdout, 2 stderr), cgroups v2 resource slicing, and the Completely Fair Scheduler (CFS/EEVDF). Enterprise automation requires strict Bash error handling (set -euo pipefail), non-blocking file locks with flock, and signal-safe process supervision.',
      coreInternals: {
        title: 'POSIX Kernel Execution & System Call Architecture',
        description: 'How the Linux kernel coordinates user-space binaries with underlying hardware.',
        mechanisms: [
          {
            name: 'Virtual File System (VFS) & Inodes',
            detail: 'VFS abstracts physical block devices into a unified hierarchical tree. Inodes store metadata (permissions, owner, byte size, data block pointers) separate from filenames. Directory entries (dentries) link path strings to inode numbers in RAM cache.',
          },
          {
            name: 'File Descriptors & Pipe Buffers',
            detail: 'Every process indexes open streams via integer file descriptors. Shell pipes (|) allocate a 64KB circular ring buffer in kernel memory. If the buffer fills, the writing process blocks in uninterruptible sleep (D state) until the reader drains it.',
          },
          {
            name: 'Cgroups v2 Resource Slicing',
            detail: 'Unified hierarchy under /sys/fs/cgroup. Enforces hard limits via memory.max, proactive reclaim via memory.high, and CFS CPU quotas via cpu.max to guarantee predictable multi-tenant isolation.',
          },
          {
            name: 'Fork-Exec & Copy-on-Write (COW)',
            detail: 'fork() duplicates the parent task_struct and marks memory pages read-only. Memory pages are only copied to new physical RAM addresses when either process issues a write syscall, drastically lowering process spawn overhead.',
          },
        ],
      },
      productionRecipes: [
        {
          title: 'Resilient Production Bash Boilerplate',
          description: 'Production-tested template with strict error traps, atomic temporary directories, and cleanup handlers.',
          language: 'bash',
          code: `#!/usr/bin/env bash
set -euo pipefail
IFS=$'\\n\\t'

# Trap cleanup handler
readonly TMP_DIR=$(mktemp -d -t codex_job.XXXXXX)
cleanup() {
  local exit_code=$?
  rm -rf "\${TMP_DIR}"
  echo "==> Cleanup complete. Exited with code \${exit_code}."
}
trap cleanup EXIT INT TERM

log() {
  echo "[$(date -u +'%Y-%m-%dT%H:%M:%SZ')] [INFO] $*"
}

log "Executing job inside atomic workspace: \${TMP_DIR}"
# Your production logic here`,
          explanation: 'set -euo pipefail aborts on non-zero exit (-e), unbound variables (-u), and pipeline failures (-o pipefail). The EXIT trap guarantees temporary files are purged regardless of whether the script succeeds, errors, or receives a SIGTERM.',
        },
        {
          title: 'Non-Blocking Lockfile with flock',
          description: 'Prevents overlapping cron jobs and duplicate process execution using kernel file descriptor locks.',
          language: 'bash',
          code: `#!/usr/bin/env bash
LOCKFILE="/var/lock/codex_sync.lock"
exec 200>"\${LOCKFILE}"

if ! flock -n 200; then
  echo "==> Another instance is currently executing. Exiting cleanly."
  exit 0
fi

echo "==> Lock acquired exclusively. Commencing operations..."
# Long running batch task...`,
          explanation: 'flock -n 200 attempts a non-blocking flock syscall on file descriptor 200. If an existing job holds the lock, the script exits cleanly with 0 rather than creating cascading worker stampedes.',
        },
        {
          title: 'High-Throughput Parallel Processing with xargs',
          description: 'Distributes log compression or data processing across all available CPU cores.',
          language: 'bash',
          code: `#!/usr/bin/env bash
find /var/log/codex/ -type f -name "*.log" -mtime +7 -print0 \\
  | xargs -0 -P "$(nproc)" -I {} sh -c '
    gzip -9 -c "{}" > "{}.gz" && rm "{}"
  '`,
          explanation: '-print0 and -0 pass null-delimited record separators, making the pipeline completely immune to spaces, quotes, or newlines in filenames. -P $(nproc) saturates all CPU cores in parallel.',
        },
      ],
      incidentPostMortems: [
        {
          title: 'Out of Memory (OOM) Killer Reaping Primary Database Daemon',
          severity: 'P0 - Outage',
          rootCause: 'Aggressive kernel memory overcommit (vm.overcommit_memory=0) allowed background worker processes to allocate virtual memory until physical RAM and swap were completely exhausted. The kernel selected the highest RSS process (PostgreSQL) for termination.',
          symptoms: [
            'Database stopped responding with exit code 137.',
            'dmesg logged: "Out of memory: Kill process 14210 (postgres) score 940".',
            'Connection pool saturation across all API gateways.',
          ],
          diagnosticCommand: 'dmesg -T | grep -i -E "oom|killed process" | tail -n 20',
          resolution: 'Protected critical database processes by configuring OOMScoreAdjust=-1000 in the systemd unit file and set sysctl vm.overcommit_memory=2 with vm.overcommit_ratio=80.',
          prevention: 'Separated batch processing jobs into isolated cgroup slices (systemd-run --slice=batch.slice -p MemoryMax=4G) with hard resource ceilings.',
        },
        {
          title: 'File Descriptor Saturation: "Too many open files (EMFILE)"',
          severity: 'P1 - Degraded',
          rootCause: 'HTTP/1.1 client connection leak in a microservice gateway breached the default soft ulimit of 1024 open file descriptors.',
          symptoms: [
            'Accept syscall failed with EMFILE.',
            'DNS name resolution started throwing getaddrinfo ENOTFOUND.',
            'CPU spiked to 100% as the event loop busy-polled failing sockets.',
          ],
          diagnosticCommand: 'lsof -p $(pgrep -f gateway) | wc -l && ulimit -n',
          resolution: 'Raised system limits in /etc/security/limits.conf to 65536 and set LimitNOFILE=65536 in systemd service definition.',
          prevention: 'Added strict idle socket reaper timeouts (IdleTimeout: 90s) in HTTP transport connection pools.',
        },
      ],
      diagnosticArsenal: [
        { command: 'vmstat 1 5', purpose: 'CPU run-queue (r), blocked tasks (b), swap in/out (si/so), and context switches.', flagsExplained: '1s interval, 5 samples.' },
        { command: 'iostat -xz 1', purpose: 'Disk await latency and %util saturation to identify storage hardware bottlenecks.', flagsExplained: '-x extended stats, -z skip idle devices, 1s interval.' },
        { command: 'ss -tulpn', purpose: 'Lists all listening and connected TCP/UDP sockets with process PIDs and buffer depths.', flagsExplained: '-t TCP, -u UDP, -l listening, -p process, -n numeric.' },
        { command: 'strace -c -p <PID>', purpose: 'Attaches to running PID and outputs a profiling histogram of system call execution time.', flagsExplained: '-c summary histogram, -p target process ID.' },
        { command: 'journalctl -u <unit> -f --no-tail', purpose: 'Streams unified systemd journal logs live without paging buffer lag.', flagsExplained: '-u service unit, -f follow live stream.' },
      ],
      sreGoldenRules: [
        'Always declare set -euo pipefail at the top of every production automation script.',
        'Never pipe untrusted curl into bash without cryptographic SHA-256 integrity verification.',
        'Always allocate swap (even on NVMe drives) to allow the kernel to evict cold anonymous pages and preserve active page cache.',
        'Isolate background cron scripts inside cgroups to prevent host starvation.',
      ],
    };
  }

  // 2. DOCKER & CONTAINERIZATION
  if (tid === 'docker' || tid === 'docker-containers' || lbl.includes('docker') || lbl.includes('container')) {
    return {
      executiveOverview:
        'Containers are not virtual machines; they are standard Linux processes isolated via kernel namespaces (mnt, pid, net, ipc, uts, user) and constrained via cgroups v2. Production containerization requires mastering the OCI specification, overlay2 storage drivers, multi-stage minimal builds (distroless/alpine), non-root execution, and explicit PID 1 signal forwarding.',
      coreInternals: {
        title: 'OCI Runtime & Linux Isolation Mechanics',
        description: 'How containerd, runc, and kernel primitives package and execute application images.',
        mechanisms: [
          {
            name: 'Linux Namespaces Partitioning',
            detail: 'Namespaces partition global system resources. PID namespace maps container PID 1 to a host PID. MNT namespace creates an isolated rootfs mount view. NET namespace provides dedicated veth pairs, routing tables, and loopback.',
          },
          {
            name: 'Overlay2 Union Filesystem',
            detail: 'Combines read-only lowerdir layers (image stages) with a thin read-write upperdir layer into a merged view. Modifying a file triggers copy-up, writing the entire file to the upperdir.',
          },
          {
            name: 'PID 1 Zombie Reaping & Signals',
            detail: 'In Linux, PID 1 must adopt and reap orphaned child processes and handle signals. Standard application runtimes (Node, Python) ignore SIGTERM by default when running as PID 1, leading to 10s shutdown timeouts and SIGKILL termination.',
          },
          {
            name: 'Seccomp & Capabilities Dropping',
            detail: 'Default Docker seccomp profile blocks ~44 dangerous system calls. Running with --cap-drop=ALL and adding only required capabilities (e.g., CAP_NET_BIND_SERVICE) prevents privilege escalation container escapes.',
          },
        ],
      },
      productionRecipes: [
        {
          title: 'Hardened Multi-Stage Distroless Dockerfile',
          description: 'Minimal, secure build pattern for Node/Go binaries with zero shell, zero package manager, and non-root user.',
          language: 'dockerfile',
          code: `# Build Stage
FROM golang:1.22-alpine AS builder
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o /bin/server .

# Production Distroless Stage
FROM gcr.io/distroless/static-debian12:nonroot
WORKDIR /app
COPY --from=builder /bin/server /app/server
USER nonroot:nonroot
EXPOSE 8080
ENTRYPOINT ["/app/server"]`,
          explanation: 'Compiles a statically linked binary with stripped debug symbols (-w -s). The final stage contains only the binary and CA certificates, completely eliminating vulnerabilities from glibc, curl, or bash.',
        },
        {
          title: 'Production Docker Compose with Resource Quotas',
          description: 'Defines memory/CPU limits, explicit healthchecks, and dependency sequencing.',
          language: 'yaml',
          code: `version: '3.8'
services:
  api:
    image: codex/api:v1.2.0
    deploy:
      resources:
        limits:
          cpus: '1.5'
          memory: 1024M
        reservations:
          cpus: '0.5'
          memory: 512M
    healthcheck:
      test: ["CMD", "/app/server", "healthcheck"]
      interval: 10s
      timeout: 3s
      retries: 3
      start_period: 15s
    restart: unless-stopped`,
          explanation: 'Sets hard cgroups limits (1024MB RAM) to prevent host OOM kills. The start_period prevents premature failure marks while the service warms its connection pool.',
        },
      ],
      incidentPostMortems: [
        {
          title: 'Host Disk Exhaustion from Dangling Docker Build Cache',
          severity: 'P1 - Degraded',
          rootCause: 'CI runner executed hundreds of builds without layer pruning. Unindexed overlay2 diff directories completely filled the 200GB root partition, triggering Kubernetes node DiskPressure evictions.',
          symptoms: [
            'All builds failed with: "no space left on device".',
            'docker system df showed 180GB in build cache.',
            'Kubelet marked node as NotReady / EvictionThresholdMet.',
          ],
          diagnosticCommand: 'docker system df && docker system prune -af --filter "until=72h"',
          resolution: 'Purged dangling images and layers, and configured a daily cron job running docker system prune -af --volumes.',
          prevention: 'Configured BuildKit cache mount targets (/root/.cache/go-build) and external registry cache backends.',
        },
      ],
      diagnosticArsenal: [
        { command: 'docker stats --no-stream', purpose: 'Instantaneous CPU %, memory usage, and network I/O snapshot across all containers.' },
        { command: 'dive <image_tag>', purpose: 'Explores Docker image layers, discovers wasted duplicate file space, and grades image efficiency.' },
        { command: 'docker inspect <id> --format="{{.State.OOMKilled}}"', purpose: 'Checks whether a terminated container was killed by the kernel OOM killer.' },
      ],
      sreGoldenRules: [
        'Never run container processes as the default root user (UID 0).',
        'Always pin container base images to immutable SHA-256 digest hashes, not mutable tags like :latest.',
        'Always configure explicit memory limits (memory.max) on every container.',
      ],
    };
  }

  // 3. KUBERNETES & CLOUD NATIVE ORCHESTRATION
  if (tid === 'kubernetes' || lbl.includes('kubernetes') || lbl.includes('k8s')) {
    return {
      executiveOverview:
        'Kubernetes is a declarative control plane built on etcd Raft consensus, optimistic concurrency, and reconciliation loops. Managing production clusters requires understanding the kube-apiserver, kube-scheduler filtering/scoring, kubelet pod lifecycles, CNI network overlays, and ingress controllers. Zero-downtime deployments demand PodDisruptionBudgets, readiness probes, and preStop termination grace hooks.',
      coreInternals: {
        title: 'Distributed Control Plane & Pod Lifecycle Machinery',
        description: 'How Kubernetes reconciles desired declarative state with physical node clusters.',
        mechanisms: [
          {
            name: 'etcd Raft Consensus & MVCC',
            detail: 'etcd stores cluster state in an append-only B-tree MVCC database. Writes require quorum (N/2 + 1 nodes). Optimistic concurrency control verifies resourceVersion before updating objects to prevent race overwrites.',
          },
          {
            name: 'Kubelet & CRI-O / containerd Pod Sandboxes',
            detail: 'Kubelet watches apiserver for assigned pods, calls CRI to create the pause infrastructure container, configures CNI network interfaces, mounts CSI volumes, and starts application containers.',
          },
          {
            name: 'Kube-Proxy & Iptables / IPVS Service Routing',
            detail: 'ClusterIP services are virtual IPs. Kube-proxy programs kernel netfilter iptables or IPVS rules on every node to load-balance traffic across healthy endpoint IPs without dedicated hardware balancers.',
          },
          {
            name: 'Pod Termination Sequencing & preStop Hook',
            detail: 'On pod deletion: endpoints are removed from Service lists while kubelet sends SIGTERM. Because iptables rule propagation takes 2-5 seconds across nodes, a preStop sleep hook is mandatory to prevent 502/504 errors during rolling updates.',
          },
        ],
      },
      productionRecipes: [
        {
          title: 'Zero-Downtime Production Deployment Manifest',
          description: 'Hardened Kubernetes deployment with rolling update strategy, preStop hook, readiness probe, and security context.',
          language: 'yaml',
          code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: codex-gateway
  labels: { app: gateway }
spec:
  replicas: 4
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 0
  selector:
    matchLabels: { app: gateway }
  template:
    metadata:
      labels: { app: gateway }
    spec:
      terminationGracePeriodSeconds: 45
      containers:
        - name: gateway
          image: codex/gateway:v2.4.1
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sh", "-c", "sleep 10"]
          readinessProbe:
            httpGet: { path: /healthz, port: 8080 }
            initialDelaySeconds: 5
            periodSeconds: 5
          resources:
            requests: { cpu: "500m", memory: "512Mi" }
            limits: { cpu: "1000m", memory: "1024Mi" }
---
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: codex-gateway-pdb
spec:
  minAvailable: 75%
  selector:
    matchLabels: { app: gateway }`,
          explanation: 'maxUnavailable: 0 ensures no pods terminate until replacement pods pass readiness probes. The preStop: sleep 10 gives kube-proxy iptables rules sufficient time to propagate across all cluster nodes before the container process receives SIGTERM.',
        },
      ],
      incidentPostMortems: [
        {
          title: 'Ingress 504 Gateway Timeouts During Rolling Deployments',
          severity: 'P1 - Degraded',
          rootCause: 'Pods received SIGTERM immediately upon deployment rollout. Ingress controller routers continued routing active traffic to terminating pod IPs because kube-proxy iptables propagation lagged by 4 seconds.',
          symptoms: [
            'Spike in HTTP 502/504 status codes during every git release.',
            'Active TCP connections abruptly terminated with ECONNRESET.',
          ],
          diagnosticCommand: 'kubectl get events --sort-by=.metadata.creationTimestamp -A | grep -i "killing"',
          resolution: 'Added a preStop lifecycle hook running sleep 10 and increased terminationGracePeriodSeconds to 45.',
          prevention: 'Established an automated policy requiring preStop hooks on all ingress-facing HTTP workloads.',
        },
      ],
      diagnosticArsenal: [
        { command: 'kubectl top pods -A --sort-by=memory', purpose: 'Identifies pods closest to their memory limit ceilings.' },
        { command: 'kubectl describe pod <name> | grep -A 6 "Last State"', purpose: 'Inspects termination exit codes (e.g., OOMKilled: true, Exit Code: 137).' },
        { command: 'kubectl get events -A --sort-by=.metadata.creationTimestamp', purpose: 'Chronological timeline of scheduler, probe, and eviction events.' },
      ],
      sreGoldenRules: [
        'Always configure PodDisruptionBudgets (PDB) on critical deployments to prevent voluntary node drains from causing outages.',
        'Never deploy workloads without explicit memory request and limit boundaries.',
        'Always pair readiness probes with a preStop sleep hook on ingress-facing HTTP services.',
      ],
    };
  }

  // 4. REAL-TIME SYSTEMS, WEBSOCKETS & FANOUT ARCHITECTURE (from fanout.sh)
  if (
    tid === 'realtime-fanout' ||
    tid === 'message-queues' ||
    lbl.includes('real-time') ||
    lbl.includes('push') ||
    lbl.includes('fanout') ||
    lbl.includes('websocket')
  ) {
    return {
      executiveOverview:
        'Scaling real-time push to 1M+ concurrent users requires decoupling persistent connection state from application business logic. Based on principles pioneered by fanout.sh and Pushpin, edge reverse proxies terminate stateful WebSocket, Server-Sent Events (SSE), and HTTP long-polling connections, converting client streams into stateless HTTP/REST webhook dispatches to backend workers and fanning out messages via pub-sub backplanes.',
      coreInternals: {
        title: 'Edge Connection Multiplexing & Fanout Mechanics',
        description: 'How real-time push proxies offload C10M connection density from application servers.',
        mechanisms: [
          {
            name: 'Pushpin / GRIP Reverse Proxy Offloading',
            detail: 'Client WebSockets terminate at edge reverse proxies (Pushpin/Fanout). The proxy forwards messages to backend servers as standard HTTP POST requests and holds the client socket open until pub/sub channel events arrive.',
          },
          {
            name: 'Epoll Non-Blocking Socket Handling',
            detail: 'Edge proxies use epoll event loops in Linux to maintain 100,000+ idle persistent TCP sockets with minimal RAM (~2KB per socket), eliminating thread-per-connection thread pool exhaustion.',
          },
          {
            name: 'Backpressure & Outbound Buffer Management',
            detail: 'Slow mobile clients cannot drain high-throughput push channels as fast as producers publish. Proxies enforce per-connection queue caps, dropping stale messages or terminating unbuffered lagging sockets.',
          },
          {
            name: 'Exponential Backoff with Full Jitter',
            detail: 'When edge nodes fail, thousands of clients reconnect simultaneously. Full jitter randomization (sleep = rand(0, min(cap, base * 2^attempt))) distributes reconnection spikes evenly over time, preventing thundering herds.',
          },
        ],
      },
      productionRecipes: [
        {
          title: 'Resilient WebSocket Connection Manager with Full Jitter',
          description: 'Client-side reconnection manager with heartbeat pings, message queueing, and jittered backoff.',
          language: 'typescript',
          code: `export class ResilientWebSocket {
  private ws: WebSocket | null = null;
  private attempt = 0;
  private queue: string[] = [];
  private pingInterval: any;

  constructor(private url: string) {
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      this.attempt = 0;
      this.flushQueue();
      this.startHeartbeat();
    };

    this.ws.onclose = () => {
      this.stopHeartbeat();
      const base = Math.min(30000, 1000 * Math.pow(2, this.attempt));
      const jitter = Math.random() * 1000;
      this.attempt++;
      setTimeout(() => this.connect(), base + jitter);
    };
  }

  send(data: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(data);
    } else {
      this.queue.push(data);
    }
  }

  private flushQueue() {
    while (this.queue.length && this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(this.queue.shift()!);
    }
  }

  private startHeartbeat() {
    this.pingInterval = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) this.ws.send(JSON.stringify({ type: 'ping' }));
    }, 25000);
  }

  private stopHeartbeat() {
    clearInterval(this.pingInterval);
  }
}`,
          explanation: 'Implements full jitter reconnection to prevent thundering herd DDOS attacks on edge gateways. Heartbeat pings every 25 seconds prevent intermediate NAT firewalls from prematurely severing idle TCP sockets.',
        },
      ],
      incidentPostMortems: [
        {
          title: 'Thundering Herd Reconnection Outage Following Gateway Restart',
          severity: 'P0 - Outage',
          rootCause: '450,000 mobile clients lost WebSocket connection during a rolling gateway restart. Clients reconnected immediately without backoff jitter, saturating TLS handshake CPU and taking down auth microservices.',
          symptoms: [
            'CPU spiked to 100% on authentication servers.',
            'Redis token session lookup latency degraded from 2ms to 4,200ms.',
            'Ingress dropped 85% of incoming TLS connections with connection refused.',
          ],
          diagnosticCommand: 'ss -s && netstat -s | grep -i "listen drops"',
          resolution: 'Enabled token caching on edge proxies and enforced randomized client reconnect delays.',
          prevention: 'Configured edge rate-limiting and connection graduation thresholds to smooth reconnection spikes.',
        },
      ],
      diagnosticArsenal: [
        { command: 'ss -s', purpose: 'Summary of active sockets, established connections, and TIME_WAIT counts.' },
        { command: 'ulimit -n', purpose: 'Verifies max open file descriptor limit available for persistent socket connections.' },
      ],
      sreGoldenRules: [
        'Always offload persistent client connections to edge push proxies (Pushpin/Fanout) rather than application backend runtimes.',
        'Always implement client reconnection backoff with full randomized jitter.',
        'Always enforce strict outbound memory buffer caps to insulate pub-sub brokers from slow consumers.',
      ],
    };
  }

  // 5. RELATIONAL DATABASES & POSTGRESQL INTERNALS (from ossu & awesome)
  if (tid === 'relational-db' || tid === 'database-persistence' || lbl.includes('database') || lbl.includes('sql') || lbl.includes('postgres')) {
    return {
      executiveOverview:
        'PostgreSQL is an ACID-compliant object-relational database engine built on Write-Ahead Logging (WAL), Multi-Version Concurrency Control (MVCC), and cost-based query optimization. Operating databases at scale requires understanding B-Tree page splits, vacuuming dead tuples, foreign key locks, connection pool exhaustion, and indexing strategies (composite, partial, covering).',
      coreInternals: {
        title: 'Storage Engine, WAL & Multi-Version Concurrency Control',
        description: 'How PostgreSQL manages shared buffers, on-disk pages, and transaction visibility.',
        mechanisms: [
          {
            name: 'B-Tree Index Anatomy & Page Splits',
            detail: 'Postgres B-Trees store 8KB index pages. When a page fills and a new key arrives, the engine splits the page 50/50, writing an entry to the parent branch. Heavy random UUID inserts cause widespread page splits, lowering cache density.',
          },
          {
            name: 'Write-Ahead Logging (WAL) & fsync',
            detail: 'All table mutations are written sequentially to the WAL before being committed to data pages in shared_buffers. This guarantees zero data loss on crash recovery while allowing random disk writes to be batched asynchronously.',
          },
          {
            name: 'MVCC & Dead Tuple Accumulation',
            detail: 'UPDATE and DELETE operations do not overwrite records in-place; they insert a new row version with xmin/xmax transaction visibility tags. Autovacuum must continuously freeze transaction IDs and reclaim dead tuple space to prevent table bloat.',
          },
          {
            name: 'Connection Overhead & Process Model',
            detail: 'Postgres forks a new operating system process (~10MB RAM) for every client connection. Having >500 direct client connections causes heavy CPU context-switching; an external pooler like PgBouncer is mandatory.',
          },
        ],
      },
      productionRecipes: [
        {
          title: 'Zero-Downtime Concurrent Index Creation',
          description: 'Adds performant indexes without acquiring an exclusive SHARE lock that blocks table writes.',
          language: 'sql',
          code: `-- Never run plain 'CREATE INDEX' on large production tables
CREATE INDEX CONCURRENTLY idx_users_active_email
ON users (email)
WHERE is_active = true;

-- Covering Index to allow Index-Only Scans
CREATE INDEX CONCURRENTLY idx_orders_customer_date
ON orders (customer_id, created_at DESC)
INCLUDE (total_amount, status);`,
          explanation: 'CONCURRENTLY builds the index through two table scans without blocking INSERT/UPDATE/DELETE queries. The INCLUDE clause adds payload columns to leaf nodes, enabling fast Index-Only Scans that avoid visiting heap pages.',
        },
        {
          title: 'Keyset (Cursor-Based) High-Performance Pagination',
          description: 'Replaces slow O(N) OFFSET queries with fast O(1) B-tree index seeks.',
          language: 'sql',
          code: `-- BAD: Degrades linearly as OFFSET increases
-- SELECT * FROM events ORDER BY id DESC LIMIT 50 OFFSET 100000;

-- GOOD: Sub-millisecond execution regardless of page depth
SELECT id, payload, created_at
FROM events
WHERE (created_at, id) < ('2026-10-04 18:00:00+00', 'f47ac10b-58cc-4372-a567-0e02b2c3d479')
ORDER BY created_at DESC, id DESC
LIMIT 50;`,
          explanation: 'OFFSET requires the query engine to scan and discard thousands of rows. Keyset pagination jumps directly to the matching B-Tree index node in O(log N) time.',
        },
      ],
      incidentPostMortems: [
        {
          title: 'Query Latency Degradation from Autovacuum Starvation & Table Bloat',
          severity: 'P1 - Degraded',
          rootCause: 'High-frequency UPDATE table accumulated 4.2 million dead tuples because a long-running analytical query held a snapshot open for 6 hours, preventing autovacuum from freeing space.',
          symptoms: [
            'Queries that normally ran in 5ms degraded to 2,800ms.',
            'Table disk footprint ballooned from 4GB to 38GB.',
            'Buffer cache hit ratio collapsed from 99% to 71%.',
          ],
          diagnosticCommand: 'SELECT relname, n_dead_tup, last_vacuum FROM pg_stat_user_tables ORDER BY n_dead_tup DESC LIMIT 5;',
          resolution: 'Terminated the idle-in-transaction analytical query and configured autovacuum_vacuum_cost_limit=2000.',
          prevention: 'Configured statement_timeout=30s and idle_in_transaction_session_timeout=60s on all transactional database pools.',
        },
      ],
      diagnosticArsenal: [
        { command: 'EXPLAIN (ANALYZE, BUFFERS, SETTINGS) <query>', purpose: 'Inspects execution plan, shared buffer hits/reads, and cost estimates.' },
        { command: 'SELECT pid, query, state, age(clock_timestamp(), query_start) FROM pg_stat_activity WHERE state != "idle";', purpose: 'Identifies long-running queries holding locks.' },
      ],
      sreGoldenRules: [
        'Always run CREATE INDEX CONCURRENTLY in production migrations.',
        'Never run foreign key columns without dedicated B-tree indexes; missing indexes trigger table-level locks during parent deletes.',
        'Always route traffic through PgBouncer connection pooling to keep active PostgreSQL backend processes under 100-200.',
      ],
    };
  }

  // 6. MODERN CSS ARCHITECTURE & BROWSER RENDERING (from Front-End-Checklist)
  if (tid === 'css' || lbl.includes('css') || lbl.includes('flexbox') || lbl.includes('grid')) {
    return {
      executiveOverview:
        'CSS architecture directly dictates browser rendering performance and user experience. Mastering modern CSS requires understanding the browser Critical Rendering Path: CSSOM construction, Layout (reflow), Paint, and GPU Compositing. High-performance UI avoids layout thrashing, leverages Container Queries (@container) for context-aware components, and guarantees zero Cumulative Layout Shift (CLS).',
      coreInternals: {
        title: 'Browser Rendering Pipeline & Compositing Layers',
        description: 'How rendering engines (Blink/WebKit) transform CSS rules into screen pixels.',
        mechanisms: [
          {
            name: 'Critical Rendering Path & CSSOM',
            detail: 'Browsers block HTML parsing until external stylesheets are downloaded and parsed into the CSS Object Model (CSSOM). Keeping critical CSS inline or lightweight ensures First Contentful Paint (FCP) occurs under 1 second.',
          },
          {
            name: 'Layout (Reflow) vs Paint vs Composite',
            detail: 'Mutating geometric properties (width, height, top, margin) forces expensive Layout recalculations of all sibling elements. Mutating transform or opacity skips Layout and Paint entirely, executing directly on the GPU compositor thread.',
          },
          {
            name: 'Layout Thrashing / Forced Synchronous Reflow',
            detail: 'Alternating between reading geometry (e.g., element.offsetHeight) and writing styles (e.g., element.style.width) inside loops forces the browser engine to recalculate layout repeatedly within a single frame, tanking FPS.',
          },
          {
            name: 'Container Queries (@container) Mechanics',
            detail: 'Decouples component responsiveness from the global viewport. Browsers observe parent container dimensions via container-type: inline-size, allowing components to adapt based on their immediate container width.',
          },
        ],
      },
      productionRecipes: [
        {
          title: 'Context-Independent Card with Container Queries',
          description: 'A modular card component that automatically transforms from vertical stacked layout to horizontal row layout based on its container.',
          language: 'css',
          code: `.card-container {
  container-type: inline-size;
  container-name: card;
}

.product-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Switches to horizontal layout when the container itself is >= 480px */
@container card (min-width: 480px) {
  .product-card {
    flex-direction: row;
    align-items: center;
  }
  .product-card__image {
    width: 180px;
    aspect-ratio: 16 / 9;
  }
}`,
          explanation: 'Container queries evaluate against the immediate parent container (.card-container) rather than the global window viewport, allowing the exact same component to be used in a narrow sidebar or a wide main feed without modifying utility classes.',
        },
        {
          title: 'Fluid Sizing with CSS clamp()',
          description: 'Responsive typography and spacing scale without jarring media query breakpoint jumps.',
          language: 'css',
          code: `:root {
  /* Fluid font formula: clamp(min, preferred_viewport_rate, max) */
  --font-hero: clamp(2rem, 1.5rem + 2.5vw, 4.5rem);
  --space-gutter: clamp(1rem, 0.5rem + 1.8vw, 3rem);
}

.hero-title {
  font-size: var(--font-hero);
  padding-inline: var(--space-gutter);
  line-height: 1.15;
}`,
          explanation: 'clamp() smoothly interpolates typography dimensions between mobile and desktop screen sizes, eliminating layout shifts and redundant media queries.',
        },
      ],
      incidentPostMortems: [
        {
          title: 'Severe Cumulative Layout Shift (CLS: 0.42) Degrading Search Rankings',
          severity: 'P1 - Degraded',
          rootCause: 'Dynamic promotional banner and hero images were loaded without explicit width/height dimensions or CSS aspect-ratio properties. As images resolved over 4G connections, page layout pushed text down by 350px.',
          symptoms: [
            'Google Search Console reported Core Web Vitals failure on mobile.',
            'High user bounce rate due to accidental misclicks during reading.',
          ],
          diagnosticCommand: 'Lighthouse / Chrome DevTools Performance panel -> Experience tab -> Layout Shifts',
          resolution: 'Added explicit aspect-ratio: 16 / 9 and width/height attributes to all media containers.',
          prevention: 'Configured automated CI testing using Playwright with axe-core and Lighthouse performance gates.',
        },
      ],
      diagnosticArsenal: [
        { command: 'Chrome DevTools -> Rendering -> Layout Shift Regions', purpose: 'Visually flashes blue highlights whenever any DOM node shifts during page interaction.' },
        { command: 'Chrome DevTools -> Rendering -> Paint Flashing', purpose: 'Flashes green rectangles on screen sections undergoing GPU repaints.' },
      ],
      sreGoldenRules: [
        'Only animate transform and opacity properties; never animate layout-triggering properties like width, height, or margin.',
        'Always supply explicit aspect-ratio or width/height attributes on all image, video, and iframe elements.',
        'Use CSS Custom Properties at the :root and container level for runtime theme switching without class churn.',
      ],
    };
  }

  // 7. JAVASCRIPT RUNTIME & ENGINE INTERNALS (from getify/You-Dont-Know-JS)
  if (tid === 'javascript' || lbl.includes('javascript') || lbl.includes('es6')) {
    return {
      executiveOverview:
        'JavaScript execution in production requires understanding V8 engine internals (Ignition bytecode, TurboFan JIT compiler, hidden classes), the event loop task queues (microtasks vs macrotasks), closure scope retention, and structured concurrency with AbortController. Writing reliable code requires eliminating memory leaks from dangling listeners and avoiding synchronous event loop starvation.',
      coreInternals: {
        title: 'V8 Engine Architecture & Event Loop Scheduling',
        description: 'How modern JS engines compile, optimize, and schedule asynchronous tasks.',
        mechanisms: [
          {
            name: 'Ignition Bytecode & TurboFan JIT',
            detail: 'V8 compiles JS AST into Ignition bytecode. Functions called frequently with identical object property shapes (hidden classes) are optimized by TurboFan into native machine code. Mutating object keys after instantiation triggers expensive deoptimizations (deopt bailouts).',
          },
          {
            name: 'Microtask vs Macrotask Queue Precedence',
            detail: 'The Call Stack executes synchronous code. When empty, the runtime drains the ENTIRE Microtask Queue (Promise.then, queueMicrotask, MutationObserver) before executing a single Macrotask (setTimeout, setInterval, I/O). Starving the microtask queue freezes UI rendering.',
          },
          {
            name: 'Closure Scope Chains & Memory Retention',
            detail: 'Functions retain a lexical reference to their parent Environment Record. Closures holding large arrays or DOM nodes prevent the Generational Garbage Collector from freeing memory as long as any reference to the closure remains reachable.',
          },
          {
            name: 'V8 Generational Garbage Collection',
            detail: 'Memory is divided into Young Generation (Nursery & Intermediate) and Old Generation. Minor GC (Scavenger) quickly evacuates short-lived allocations using Cheney copying. Major GC (Mark-Sweep-Compact) reclaims long-lived objects with incremental marking to minimize pause times.',
          },
        ],
      },
      productionRecipes: [
        {
          title: 'Structured Cancellation with AbortController',
          description: 'Wires cooperative cancellation across HTTP fetch requests, event listeners, and async timers.',
          language: 'typescript',
          code: `export async function fetchWithTimeout(url: string, timeoutMs: number): Promise<any> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new Error('Timeout exceeded')), timeoutMs);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

// Automatically cleans up event listeners when controller aborts
export function attachAutoCleanupListener(target: EventTarget, event: string, handler: EventListener, signal: AbortSignal) {
  target.addEventListener(event, handler, { signal });
}`,
          explanation: 'Passing controller.signal to fetch() aborts the underlying network socket immediately when the timeout fires, preventing thread pool saturation and unmounted component state updates.',
        },
      ],
      incidentPostMortems: [
        {
          title: 'Single Page App Memory Leak Caused by Detached DOM Closures',
          severity: 'P1 - Degraded',
          rootCause: 'A global resize event listener retained a closure callback referencing a large table component. When the component unmounted, the entire 20MB DOM tree was held in memory by the detached reference.',
          symptoms: [
            'Tab memory consumption climbed continuously from 120MB to 1.8GB.',
            'Browser UI suffered periodic 400ms garbage collection freeze pauses.',
            'Mobile devices crashed with "Out of Memory" tab reloads.',
          ],
          diagnosticCommand: 'Chrome DevTools -> Memory -> Take Heap Snapshot -> Filter by "Detached"',
          resolution: 'Used AbortController signals to automatically unregister listeners on component unmount.',
          prevention: 'Configured automated memory regression tests using Puppeteer to verify heap stability across navigation routes.',
        },
      ],
      diagnosticArsenal: [
        { command: 'Chrome DevTools -> Memory -> Allocation Instrumentation on Timeline', purpose: 'Visualizes blue bars of active memory allocation and grey bars of freed memory over time.' },
        { command: 'node --inspect --trace-warnings app.js', purpose: 'Enables V8 debugger port and prints stack traces for unhandled promise rejections.' },
      ],
      sreGoldenRules: [
        'Always wire AbortSignal into asynchronous network requests and event listeners.',
        'Never mutate object shapes after construction to preserve V8 hidden classes and fast inline caches.',
        'Never recurse inside microtasks (queueMicrotask or Promise loops); doing so completely freezes browser rendering and user input.',
      ],
    };
  }

  // 8. DEEP LEARNING & TRANSFORMERS (from deeplearning-notes)
  if (
    tid === 'deep-learning' ||
    tid === 'transformers-llms' ||
    lbl.includes('deep learning') ||
    lbl.includes('transformer') ||
    lbl.includes('neural')
  ) {
    return {
      executiveOverview:
        'Deep learning in production requires mastering numerical matrix calculus, GPU memory hierarchies (HBM3 vs SRAM), and architectural scaling laws. Transformer architectures depend on Scaled Dot-Product Attention, FlashAttention-2 tiling to bypass memory bandwidth bottlenecks, KV caching to accelerate autoregressive token generation, and mixed-precision (FP16/BF16) arithmetic.',
      coreInternals: {
        title: 'Transformer Attention Mechanics & GPU Tensor Arithmetic',
        description: 'How modern neural architectures maximize tensor core throughput and minimize VRAM footprint.',
        mechanisms: [
          {
            name: 'Scaled Dot-Product Attention',
            detail: 'Attention(Q,K,V) = softmax(Q * K^T / sqrt(d_k)) * V. The quadratic O(N^2) memory complexity with respect to sequence length N stems from the N x N attention matrix materialization.',
          },
          {
            name: 'FlashAttention-2 Kernel Tiling',
            detail: 'Standard attention repeatedly writes intermediate N x N attention matrices to slow GPU High Bandwidth Memory (HBM). FlashAttention-2 tiles inputs into small blocks that fit directly into fast on-chip SRAM, computing online softmax without materializing the full N x N matrix.',
          },
          {
            name: 'KV Caching in Autoregressive Inference',
            detail: 'During token generation, computing attention for token t requires keys and values from tokens 1 to t-1. KV caching stores these precomputed tensors in VRAM, reducing generation complexity per token from O(N^2) to O(N). Memory footprint scales as: 2 * 2 * n_layers * n_heads * d_head * max_seq_len bytes.',
          },
          {
            name: 'AdamW Weight Decay & Mixed Precision',
            detail: 'Adam tracks running first (momentum) and second (variance) gradient moments. Standard L2 regularization is flawed in adaptive optimizers; AdamW decouples weight decay directly from gradient updates. BF16 training preserves dynamic range without manual loss scaling.',
          },
        ],
      },
      productionRecipes: [
        {
          title: 'PyTorch Scaled Dot-Product Attention with Mixed Precision',
          description: 'Production implementation leveraging hardware-accelerated FlashAttention under the hood.',
          language: 'python',
          code: `import torch
import torch.nn.functional as F

def scaled_dot_product_attention_block(
    q: torch.Tensor, k: torch.Tensor, v: torch.Tensor, mask: torch.Tensor = None
) -> torch.Tensor:
    """
    Computes FlashAttention-2 when inputs are on CUDA and dtype is float16/bfloat16.
    q, k, v shape: (batch_size, num_heads, seq_len, head_dim)
    """
    with torch.autocast(device_type="cuda", dtype=torch.bfloat16):
        # Uses FlashAttention-2 under the hood automatically if available
        output = F.scaled_dot_product_attention(
            query=q,
            key=k,
            value=v,
            attn_mask=mask,
            dropout_p=0.1 if q.requires_grad else 0.0,
            is_causal=(mask is None)
        )
    return output`,
          explanation: 'F.scaled_dot_product_attention automatically dispatches to optimized FlashAttention-2 or memory-efficient kernels on NVIDIA Ampere/Hopper GPUs, providing 2-4x speedup over naive manual attention.',
        },
      ],
      incidentPostMortems: [
        {
          title: 'CUDA Out of Memory (OOM) During Multi-User Batch Inference',
          severity: 'P0 - Outage',
          rootCause: 'Serving engine allocated continuous contiguous VRAM buffers for KV caches based on maximum context window (8192 tokens) instead of dynamic non-contiguous allocation, causing 65% VRAM fragmentation.',
          symptoms: [
            'Inference worker crashed with torch.cuda.OutOfMemoryError.',
            'GPU utilization dropped to 0% while memory showed 100% reserved.',
            'Client requests failed with 503 Service Unavailable.',
          ],
          diagnosticCommand: 'nvidia-smi --query-gpu=memory.used,memory.free,utilization.gpu --format=csv -l 1',
          resolution: 'Migrated serving layer to vLLM using PagedAttention to dynamically allocate KV cache in non-contiguous virtual pages.',
          prevention: 'Configured automated batch queue concurrency limits based on active KV cache token budgets.',
        },
      ],
      diagnosticArsenal: [
        { command: 'nvidia-smi --query-gpu=utilization.gpu,memory.used,memory.total --format=csv -l 1', purpose: 'Streams live GPU compute and memory utilization every second.' },
        { command: 'torch.cuda.memory_summary()', purpose: 'Prints detailed breakdown of PyTorch active, allocated, and cached GPU memory.' },
      ],
      sreGoldenRules: [
        'Always train and serve models using bfloat16 or float16 mixed precision to double tensor core throughput and halve memory footprint.',
        'Always use PagedAttention (vLLM) or FlashAttention kernels to eliminate VRAM fragmentation during autoregressive generation.',
        'Always clamp gradient norms (torch.nn.utils.clip_grad_norm_) to prevent gradient explosions.',
      ],
    };
  }

  // 9. GENERAL PRODUCTION FALLBACK FOR ALL OTHER TOPICS
  return {
    executiveOverview:
      `Mastering ${topicLabel} provides the foundational architectural mental models, runtime knowledge, and engineering principles required to design resilient, scalable production software systems.`,
    coreInternals: {
      title: `${topicLabel} Architecture & Runtime Mechanics`,
      description: `How ${topicLabel} functions under the hood in modern production environments.`,
      mechanisms: [
        {
          name: 'Core System Abstraction Layer',
          detail: `Encapsulates underlying hardware and operating system resources behind predictable, declarative API interfaces.`,
        },
        {
          name: 'Concurrency & Resource Scheduling',
          detail: `Coordinates asynchronous execution threads, event loops, or worker pools to maximize system throughput while preventing thread contention.`,
        },
        {
          name: 'State Management & Data Integrity',
          detail: `Maintains consistent state transitions through strict boundaries, validation schemas, and transactional guarantees.`,
        },
        {
          name: 'Failure Isolation & Backpressure',
          detail: `Isolates downstream dependency failures and sheds excess load gracefully to protect core system stability.`,
        },
      ],
    },
    productionRecipes: [
      {
        title: `Production ${topicLabel} Configuration Pattern`,
        description: `Standard enterprise pattern establishing strict timeouts, retries, and telemetry integration.`,
        language: 'typescript',
        code: `// Production Enterprise Pattern for ${topicLabel}
export interface ServiceConfig {
  timeoutMs: number;
  maxRetries: number;
  backoffFactor: number;
}

export const productionConfig: ServiceConfig = {
  timeoutMs: 5000,
  maxRetries: 3,
  backoffFactor: 2.0,
};`,
        explanation: `Establishes immutable configuration boundaries with predictable retry policies and timeout budgets.`,
      },
    ],
    incidentPostMortems: [
      {
        title: `Cascading Failures Triggered by Synchronous Retry Storms`,
        severity: 'P1 - Degraded',
        rootCause: `Downstream service latency spike caused upstream callers to retry immediately without backoff or jitter, amplifying request load by 400%.`,
        symptoms: [
          'Error rate climbed across all upstream microservices.',
          'Database connection pool exhaustion.',
          'CPU saturation across all gateway nodes.',
        ],
        diagnosticCommand: 'curl -v --connect-timeout 2 http://localhost:8080/health',
        resolution: 'Enforced circuit breakers and exponential backoff with full randomized jitter.',
        prevention: 'Established system-wide SLA budgets and rate-limiting thresholds at the ingress gateway.',
      },
    ],
    diagnosticArsenal: [
      { command: 'curl -ivs https://localhost:8080/health', purpose: 'Inspects HTTP response headers, TLS handshake details, and latency.' },
      { command: 'top -b -n 1 | head -n 20', purpose: 'Snapshots top CPU and memory consuming processes.' },
    ],
    sreGoldenRules: [
      'Always configure explicit timeouts on all network calls and database queries.',
      'Always implement exponential backoff with full jitter on retries.',
      'Measure what matters: monitor latency (p95/p99), error rates, throughput, and saturation (Golden Signals).',
    ],
  };
}
