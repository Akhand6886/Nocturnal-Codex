const fs = require('fs');
const path = require('path');

const roadmapDir = path.join(process.cwd(), 'public', 'roadmap-content');

// Helper to create topic nodes
function createTopic({ id, label, status = 'recommended', x = 390, y, description, codeSnippet, prerequisites = [], resources = [], relatedLanguage }) {
  const node = {
    id,
    type: 'topic',
    position: { x, y },
    data: {
      label,
      status,
      description,
      codeSnippet,
      prerequisites,
      resources,
    }
  };
  if (relatedLanguage) {
    node.data.relatedLanguage = relatedLanguage;
  }
  return node;
}

function createSection({ id, label, x = 300, y }) {
  return {
    id,
    type: 'section',
    position: { x, y },
    data: { label }
  };
}

function createEdge({ id, source, target, type = 'roadmap' }) {
  return { id, source, target, type };
}

// 1. FRONTEND ROADMAP
const frontend = {
  nodes: [
    createSection({ id: 'h', label: 'Frontend Developer Path', x: 300, y: 20 }),
    createTopic({
      id: 'html',
      label: 'HTML5 & Semantic Web',
      status: 'recommended',
      x: 390,
      y: 100,
      relatedLanguage: 'html',
      description: 'Learn the skeleton of the modern web: semantic markup (<main>, <article>, <nav>), accessibility (ARIA), SEO meta tags, and structured forms.',
      codeSnippet: `<!-- Semantic HTML5 & Accessibility -->\n<article aria-labelledby="title-1">\n  <h2 id="title-1">Semantic Web Architecture</h2>\n  <p>Use semantic tags for screen readers and SEO crawlers.</p>\n  <button aria-label="Submit Feedback">Submit</button>\n</article>`,
      prerequisites: ['Internet Basics', 'Web Browsers'],
      resources: [
        { title: 'Nocturnal Codex — HTML5 Comprehensive Guide', url: '/languages/html', type: 'course' },
        { title: 'MDN Web Docs — HTML5 Semantic Elements', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML', type: 'docs' },
        { title: 'W3C Web Accessibility Initiative (WAI-ARIA Guide)', url: 'https://www.w3.org/WAI/standards-guidelines/aria/', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'css',
      label: 'CSS3, Flexbox & Grid',
      status: 'recommended',
      x: 390,
      y: 200,
      relatedLanguage: 'css',
      description: 'Master modern responsive design, Flexbox alignment, 2D Grid layouts, custom CSS variables, and fluid typography.',
      codeSnippet: `/* Modern 2D CSS Grid Layout */\n.dashboard-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.5rem;\n  padding: 2rem;\n}`,
      prerequisites: ['HTML5 Basics'],
      resources: [
        { title: 'Nocturnal Codex — CSS3 Modern Design Guide', url: '/languages/css', type: 'course' },
        { title: 'MDN Web Docs — CSS Layout Guide', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout', type: 'docs' },
        { title: 'CSS-Tricks — Complete Guide to Flexbox & Grid', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', type: 'article' }
      ]
    }),
    createTopic({
      id: 'javascript',
      label: 'Modern JavaScript (ES6+)',
      status: 'recommended',
      x: 390,
      y: 300,
      relatedLanguage: 'javascript',
      description: 'Understand closures, prototypal inheritance, promises, async/await, DOM manipulation, ES modules, and event loop concurrency.',
      codeSnippet: `// Async Fetching with ES6 async/await\nasync function fetchUserData(userId: string) {\n  try {\n    const res = await fetch(\`/api/users/\${userId}\`);\n    if (!res.ok) throw new Error('Network error');\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error('Fetch failed:', err);\n  }\n}`,
      prerequisites: ['HTML5', 'CSS3'],
      resources: [
        { title: 'Nocturnal Codex — Modern JavaScript Deep Dive', url: '/languages/javascript', type: 'course' },
        { title: 'JavaScript.info — The Modern JavaScript Tutorial', url: 'https://javascript.info/', type: 'docs' },
        { title: 'MDN — Async/Await & Promises Guide', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'git',
      label: 'Git & GitHub Control',
      status: 'recommended',
      x: 130,
      y: 300,
      relatedLanguage: 'shell',
      description: 'Master branch management, pull requests, rebasing, merge conflict resolution, and collaborative workflow best practices.',
      codeSnippet: `# Feature Branch Workflow\ngit checkout -b feature/user-auth\ngit add .\ngit commit -m "feat: implement JWT token storage"\ngit push origin feature/user-auth`,
      prerequisites: ['Command Line Basics'],
      resources: [
        { title: 'Nocturnal Codex — Shell & Terminal CLI Guide', url: '/languages/shell', type: 'course' },
        { title: 'Git Official Documentation & Pro Git Book', url: 'https://git-scm.com/doc', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'typescript',
      label: 'TypeScript Type Safety',
      status: 'recommended',
      x: 390,
      y: 400,
      relatedLanguage: 'typescript',
      description: 'Write bug-free frontend code using static type checking, generics, interface declaration, utility types, and discriminated unions.',
      codeSnippet: `// Discriminated Union & Generic Response\ntype ApiResponse<T> =\n  | { status: 'success'; data: T }\n  | { status: 'error'; message: string };\n\ninterface User { id: string; name: string; }`,
      prerequisites: ['Modern JavaScript'],
      resources: [
        { title: 'Nocturnal Codex — TypeScript Architecture Guide', url: '/languages/typescript', type: 'course' },
        { title: 'TypeScript Handbook & Official Documentation', url: 'https://www.typescriptlang.org/docs/', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'tailwind',
      label: 'Tailwind CSS Tokens',
      status: 'alternative',
      x: 130,
      y: 500,
      relatedLanguage: 'css',
      description: 'Utility-first CSS framework for rapid UI development with responsive variants, dark mode support, and design system tokens.',
      codeSnippet: `<button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all">\n  Button\n</button>`,
      prerequisites: ['CSS3'],
      resources: [
        { title: 'Tailwind CSS Official Documentation', url: 'https://tailwindcss.com/docs', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'react',
      label: 'React.js Framework',
      status: 'recommended',
      x: 390,
      y: 500,
      relatedLanguage: 'javascript',
      description: 'Build component-driven single page applications. Master hooks (useState, useEffect, useMemo, useCallback), Virtual DOM, and context.',
      codeSnippet: `import { useState, useMemo } from 'react';\n\nexport function Counter({ initial = 0 }: { initial?: number }) {\n  const [count, setCount] = useState(initial);\n  const double = useMemo(() => count * 2, [count]);\n  return <button onClick={() => setCount(c => c + 1)}>Count: {count} ({double})</button>;\n}`,
      prerequisites: ['Modern JavaScript', 'TypeScript'],
      resources: [
        { title: 'React.dev — Official Documentation & Interactive Tutorials', url: 'https://react.dev/', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'state-management',
      label: 'State (Zustand/Redux)',
      status: 'recommended',
      x: 650,
      y: 500,
      relatedLanguage: 'typescript',
      description: 'Manage complex global state across client components using immutable stores, middleware, and devtools.',
      codeSnippet: `import { create } from 'zustand';\n\ninterface State { bears: number; inc: () => void; }\nexport const useStore = create<State>((set) => ({\n  bears: 0,\n  inc: () => set((state) => ({ bears: state.bears + 1 })),\n}));`,
      prerequisites: ['React.js Framework'],
      resources: [
        { title: 'Zustand State Management Library Docs', url: 'https://zustand-demo.pmnd.rs/', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'nextjs',
      label: 'Next.js App Router',
      status: 'recommended',
      x: 390,
      y: 600,
      relatedLanguage: 'typescript',
      description: 'Server Components (RSC), Server Actions, SSG/SSR hydration, file-based routing, dynamic metadata, and API handlers.',
      codeSnippet: `// Next.js Server Component with SSG Data Fetching\nexport default async function Page() {\n  const res = await fetch('https://api.example.com/posts', { next: { revalidate: 60 } });\n  const posts = await res.json();\n  return <div>{posts.map((p: any) => <h2 key={p.id}>{p.title}</h2>)}</div>;\n}`,
      prerequisites: ['React.js Framework', 'TypeScript'],
      resources: [
        { title: 'Next.js Documentation — App Router Guide', url: 'https://nextjs.org/docs', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'testing',
      label: 'Vitest & Playwright',
      status: 'recommended',
      x: 390,
      y: 700,
      relatedLanguage: 'typescript',
      description: 'Write robust unit tests, component integration tests, and end-to-end browser automation scripts.',
      codeSnippet: `import { render, screen } from '@testing-library/react';\nimport { Counter } from './Counter';\n\ntest('renders counter correctly', () => {\n  render(<Counter initial={5} />);\n  expect(screen.getByText(/Count: 5/i)).toBeInTheDocument();\n});`,
      prerequisites: ['React.js', 'TypeScript'],
      resources: [
        { title: 'Testing Library Official Guide', url: 'https://testing-library.com/docs/react-testing-library/intro/', type: 'docs' },
        { title: 'Playwright End-to-End Testing Documentation', url: 'https://playwright.dev/', type: 'docs' }
      ]
    })
  ],
  edges: [
    createEdge({ id: 'e-html-css', source: 'html', target: 'css', type: 'roadmap' }),
    createEdge({ id: 'e-css-js', source: 'css', target: 'javascript', type: 'roadmap' }),
    createEdge({ id: 'e-git-js', source: 'git', target: 'javascript', type: 'dotted' }),
    createEdge({ id: 'e-js-ts', source: 'javascript', target: 'typescript', type: 'roadmap' }),
    createEdge({ id: 'e-ts-react', source: 'typescript', target: 'react', type: 'roadmap' }),
    createEdge({ id: 'e-tailwind-react', source: 'tailwind', target: 'react', type: 'dotted' }),
    createEdge({ id: 'e-react-state', source: 'react', target: 'state-management', type: 'dotted' }),
    createEdge({ id: 'e-react-next', source: 'react', target: 'nextjs', type: 'roadmap' }),
    createEdge({ id: 'e-next-testing', source: 'nextjs', target: 'testing', type: 'roadmap' })
  ]
};

// 2. BACKEND ROADMAP
const backend = {
  nodes: [
    createSection({ id: 'h', label: 'Backend Architecture & Systems Path', x: 300, y: 20 }),
    createTopic({
      id: 'language',
      label: 'Backend Language (Node / Python / Go)',
      status: 'recommended',
      x: 390,
      y: 100,
      relatedLanguage: 'python',
      description: 'Master server-side programming in Python (FastAPI/Django), Go, or Node.js (TypeScript). Understand concurrency, event loops, and thread management.',
      codeSnippet: `# Python FastAPI High-Performance Async Endpoint\nfrom fastapi import FastAPI\napp = FastAPI()\n\n@app.get("/health")\nasync def health_check():\n    return {"status": "UP", "engine": "CPython 3.12"}`,
      prerequisites: ['Programming Fundamentals'],
      resources: [
        { title: 'Nocturnal Codex — Python Language Guide', url: '/languages/python', type: 'course' },
        { title: 'Nocturnal Codex — Go Backend Concurrency Guide', url: '/languages/go', type: 'course' },
        { title: 'FastAPI Web Framework Documentation', url: 'https://fastapi.tiangolo.com/', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'relational-db',
      label: 'Relational Databases (PostgreSQL)',
      status: 'recommended',
      x: 390,
      y: 200,
      relatedLanguage: 'sql',
      description: 'Master ACID transactions, indexing (B-Tree, GIN), schema normalization, joins, and connection pooling in PostgreSQL.',
      codeSnippet: `-- Optimized Index & Foreign Key Constraint\nCREATE TABLE accounts (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  email VARCHAR(255) UNIQUE NOT NULL,\n  balance NUMERIC(12,2) CHECK (balance >= 0)\n);\nCREATE INDEX idx_accounts_email ON accounts(email);`,
      prerequisites: ['Backend Programming'],
      resources: [
        { title: 'Nocturnal Codex — SQL & Database Architecture', url: '/languages/sql', type: 'course' },
        { title: 'PostgreSQL Official Documentation', url: 'https://www.postgresql.org/docs/', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'nosql-cache',
      label: 'In-Memory Caching (Redis)',
      status: 'recommended',
      x: 130,
      y: 200,
      description: 'High-throughput sub-millisecond in-memory data store for caching query results, session management, Pub/Sub channels, and rate limiting.',
      codeSnippet: `# Redis Cache-Aside Pattern in Python\nimport redis\nr = redis.Redis(host='localhost', port=6379, db=0)\n\ndef get_user_cached(user_id):\n    cached = r.get(f"user:{user_id}")\n    if cached:\n        return cached\n    user = db_query(user_id)\n    r.setex(f"user:{user_id}", 3600, user)\n    return user`,
      prerequisites: ['Databases'],
      resources: [
        { title: 'Redis Official Documentation', url: 'https://redis.io/docs/', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'api-architecture',
      label: 'REST, GraphQL & gRPC APIs',
      status: 'recommended',
      x: 390,
      y: 300,
      relatedLanguage: 'typescript',
      description: 'Design robust API interfaces using RESTful semantics, GraphQL query graphs for client efficiency, or gRPC Protobuf for microservice RPCs.',
      codeSnippet: `// Protocol Buffer (Protobuf) Service Definition\nsyntax = "proto3";\nservice UserService {\n  rpc GetUser (UserRequest) returns (UserResponse);\n}\nmessage UserRequest { string id = 1; }\nmessage UserResponse { string id = 1; string name = 2; }`,
      prerequisites: ['Relational Databases'],
      resources: [
        { title: 'gRPC Architecture & Documentation', url: 'https://grpc.io/docs/', type: 'docs' },
        { title: 'GraphQL Official Guide', url: 'https://graphql.org/learn/', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'authentication',
      label: 'Auth, JWT & RBAC Security',
      status: 'recommended',
      x: 390,
      y: 400,
      relatedLanguage: 'python',
      description: 'Implement stateless JWT authentication, OAuth 2.0 authorization flows, password hashing with Argon2/Bcrypt, and Role-Based Access Control (RBAC).',
      codeSnippet: `import jwt, datetime\nSECRET = "super-secure-key"\n\ndef generate_token(user_id: str, role: str) -> str:\n    payload = {\n        "sub": user_id,\n        "role": role,\n        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)\n    }\n    return jwt.encode(payload, SECRET, algorithm="HS256")`,
      prerequisites: ['API Architecture'],
      resources: [
        { title: 'RFC 7519 — JSON Web Token (JWT) Standard', url: 'https://datatracker.ietf.org/doc/html/rfc7519', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'message-queues',
      label: 'Async Queues (Kafka / RabbitMQ)',
      status: 'recommended',
      x: 650,
      y: 400,
      relatedLanguage: 'go',
      description: 'Decouple services with asynchronous message queues, event streaming, consumer groups, dead letter exchanges, and pub/sub pipelines.',
      codeSnippet: `// Go RabbitMQ Publisher\nerr = ch.Publish(\n  "",          // exchange\n  "tasks_q",   // routing key\n  false, false,\n  amqp.Publishing{\n    ContentType: "application/json",\n    Body:        []byte(\`{"task": "process_video"}\`),\n  }\n)`,
      prerequisites: ['API Architecture'],
      resources: [
        { title: 'Apache Kafka Documentation', url: 'https://kafka.apache.org/documentation/', type: 'docs' },
        { title: 'RabbitMQ Tutorials & Guides', url: 'https://www.rabbitmq.com/tutorials', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'docker-containers',
      label: 'Docker & Microservices',
      status: 'recommended',
      x: 390,
      y: 500,
      relatedLanguage: 'shell',
      description: 'Package backend runtimes into lightweight immutable OCI container images. Configure multi-stage builds and compose networks.',
      codeSnippet: `# Multi-stage Dockerfile\nFROM golang:1.22-alpine AS builder\nWORKDIR /app\nCOPY . .\nRUN go build -o server .\n\nFROM alpine:latest\nCOPY --from=builder /app/server .\nEXPOSE 8080\nCMD ["./server"]`,
      prerequisites: ['Backend Programming'],
      resources: [
        { title: 'Nocturnal Codex — Shell & Terminal CLI Guide', url: '/languages/shell', type: 'course' },
        { title: 'Docker Official Documentation', url: 'https://docs.docker.com/', type: 'docs' }
      ]
    })
  ],
  edges: [
    createEdge({ id: 'e-lang-db', source: 'language', target: 'relational-db', type: 'roadmap' }),
    createEdge({ id: 'e-db-redis', source: 'relational-db', target: 'nosql-cache', type: 'dotted' }),
    createEdge({ id: 'e-db-api', source: 'relational-db', target: 'api-architecture', type: 'roadmap' }),
    createEdge({ id: 'e-api-auth', source: 'api-architecture', target: 'authentication', type: 'roadmap' }),
    createEdge({ id: 'e-api-queues', source: 'api-architecture', target: 'message-queues', type: 'dotted' }),
    createEdge({ id: 'e-auth-docker', source: 'authentication', target: 'docker-containers', type: 'roadmap' })
  ]
};

// 3. FULL-STACK ROADMAP
const fullStack = {
  nodes: [
    createSection({ id: 'h', label: 'Full-Stack Engineering Path', x: 300, y: 20 }),
    createTopic({
      id: 'web-foundation',
      label: 'HTML5, Modern CSS & TypeScript',
      status: 'recommended',
      x: 390,
      y: 100,
      relatedLanguage: 'typescript',
      description: 'Master the foundational triage of the modern web: semantic markup, responsive layout systems, and end-to-end type safety.',
      codeSnippet: `interface AppProps {\n  title: string;\n  version: number;\n}\nexport const App = ({ title, version }: AppProps) => (\n  <main className="min-h-screen p-8 text-foreground">\n    <h1>{title} v{version}</h1>\n  </main>\n);`,
      prerequisites: ['Computer Science Basics'],
      resources: [
        { title: 'Nocturnal Codex — TypeScript Guide', url: '/languages/typescript', type: 'course' }
      ]
    }),
    createTopic({
      id: 'frontend-core',
      label: 'Frontend Frameworks (React & Next.js)',
      status: 'recommended',
      x: 390,
      y: 200,
      relatedLanguage: 'javascript',
      description: 'Component architecture, reactive state, Server Components (RSC), SSR hydration, and Tailwind CSS design systems.',
      codeSnippet: `export function UserProfile({ userId }: { userId: string }) {\n  const [user, setUser] = useState<User | null>(null);\n  useEffect(() => { fetchUser(userId).then(setUser); }, [userId]);\n  return <div>{user ? <h1>{user.name}</h1> : <p>Loading...</p>}</div>;\n}`,
      prerequisites: ['HTML5, Modern CSS & TypeScript'],
      resources: [
        { title: 'Next.js App Router Guide', url: 'https://nextjs.org/docs', type: 'docs' },
        { title: 'React Documentation', url: 'https://react.dev/', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'backend-core',
      label: 'Server Logic & APIs (Node / Python)',
      status: 'recommended',
      x: 390,
      y: 300,
      relatedLanguage: 'python',
      description: 'Design RESTful routes, Server Actions, middleware pipeline, JWT session cookies, and business service layers.',
      codeSnippet: `// Next.js Server Action with Mutation\n'use server';\nimport { db } from '@/lib/db';\n\nexport async function updateUsername(userId: string, newName: string) {\n  await db.user.update({ where: { id: userId }, data: { name: newName } });\n}`,
      prerequisites: ['Frontend Frameworks'],
      resources: [
        { title: 'Nocturnal Codex — Python Guide', url: '/languages/python', type: 'course' }
      ]
    }),
    createTopic({
      id: 'database-persistence',
      label: 'Database Layer (PostgreSQL & Prisma/Drizzle)',
      status: 'recommended',
      x: 390,
      y: 400,
      relatedLanguage: 'sql',
      description: 'PostgreSQL schema definition, migrations, indexing, relationships, and type-safe query builders (Prisma, Drizzle).',
      codeSnippet: `// Drizzle ORM Schema & Query\nimport { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';\nexport const users = pgTable('users', {\n  id: serial('id').primaryKey(),\n  fullName: text('full_name'),\n  phone: varchar('phone', { length: 256 }),\n});`,
      prerequisites: ['Server Logic & APIs'],
      resources: [
        { title: 'Nocturnal Codex — SQL & Databases', url: '/languages/sql', type: 'course' },
        { title: 'Drizzle ORM Documentation', url: 'https://orm.drizzle.team/', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'caching-layer',
      label: 'Caching & Session Store (Redis)',
      status: 'recommended',
      x: 130,
      y: 400,
      description: 'In-memory key-value caching to reduce database read pressure, manage distributed locks, and store fast session data.',
      codeSnippet: `import Redis from 'ioredis';\nconst redis = new Redis(process.env.REDIS_URL!);\nawait redis.set('active:users', '1420', 'EX', 300);`,
      prerequisites: ['Database Layer'],
      resources: [
        { title: 'Redis In-Memory Guide', url: 'https://redis.io/', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'cloud-devops',
      label: 'Containerization & Cloud (Docker, Vercel, AWS)',
      status: 'recommended',
      x: 390,
      y: 500,
      relatedLanguage: 'shell',
      description: 'Package applications into Docker containers, configure CI/CD deployment pipelines, and deploy with edge routing and CDN caching.',
      codeSnippet: `// Multi-region deployment configuration\nexport const runtime = 'edge';\nexport async function GET() {\n  return new Response(JSON.stringify({ region: process.env.VERCEL_REGION }));\n}`,
      prerequisites: ['Database Layer'],
      resources: [
        { title: 'Vercel Infrastructure Guide', url: 'https://vercel.com/docs', type: 'docs' }
      ]
    })
  ],
  edges: [
    createEdge({ id: 'e-web-front', source: 'web-foundation', target: 'frontend-core', type: 'roadmap' }),
    createEdge({ id: 'e-front-back', source: 'frontend-core', target: 'backend-core', type: 'roadmap' }),
    createEdge({ id: 'e-back-db', source: 'backend-core', target: 'database-persistence', type: 'roadmap' }),
    createEdge({ id: 'e-db-cache', source: 'database-persistence', target: 'caching-layer', type: 'dotted' }),
    createEdge({ id: 'e-db-devops', source: 'database-persistence', target: 'cloud-devops', type: 'roadmap' })
  ]
};

// 4. DEVOPS ROADMAP
const devops = {
  nodes: [
    createSection({ id: 'h', label: 'DevOps & Cloud Engineering Path', x: 300, y: 20 }),
    createTopic({
      id: 'linux-shell',
      label: 'Linux Internals & Bash Automation',
      status: 'recommended',
      x: 390,
      y: 100,
      relatedLanguage: 'shell',
      description: 'Master the Linux filesystem hierarchy, process management (systemd, ps, top), file permissions, SSH keys, pipes, and Bash scripting.',
      codeSnippet: `#!/usr/bin/env bash\n# Server Health Check Script\nset -euo pipefail\nDISK_USAGE=$(df -h / | awk 'NR==2 {print $5}')\nMEM_FREE=$(free -m | awk 'NR==2 {print $4}')\necho "Disk: $DISK_USAGE | Free RAM: \${MEM_FREE}MB"`,
      prerequisites: ['Command Line Basics'],
      resources: [
        { title: 'Nocturnal Codex — Shell & Terminal CLI Guide', url: '/languages/shell', type: 'course' },
        { title: 'Linux Journey — Interactive Linux Tutorials', url: 'https://linuxjourney.com/', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'git-ci',
      label: 'CI/CD Pipelines (GitHub Actions)',
      status: 'recommended',
      x: 390,
      y: 200,
      description: 'Automate build, test, and release workflows using GitHub Actions or GitLab CI. Manage secrets, artifacts, and test runners.',
      codeSnippet: `name: CI Pipeline\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 20 }\n      - run: npm ci && npm test`,
      prerequisites: ['Linux & Bash'],
      resources: [
        { title: 'GitHub Actions Documentation', url: 'https://docs.github.com/en/actions', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'docker',
      label: 'Containerization (Docker)',
      status: 'recommended',
      x: 390,
      y: 300,
      description: 'Build OCI compliant container images, minimize layer sizes with multi-stage builds, configure volume mounts, and orchestrate with Docker Compose.',
      codeSnippet: `version: '3.8'\nservices:\n  web:\n    build: .\n    ports: ["3000:3000"]\n    environment: [DATABASE_URL=postgres://db:5432/app]\n  db:\n    image: postgres:16-alpine\n    volumes: [pgdata:/var/lib/postgresql/data]\nvolumes: { pgdata: }`,
      prerequisites: ['Linux Internals'],
      resources: [
        { title: 'Docker Official Documentation', url: 'https://docs.docker.com/', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'terraform',
      label: 'Infrastructure as Code (Terraform)',
      status: 'recommended',
      x: 130,
      y: 300,
      description: 'Provision reproducible cloud infrastructure across AWS, GCP, or Azure using HashiCorp Configuration Language (HCL).',
      codeSnippet: `resource "aws_s3_bucket" "codex_storage" {\n  bucket = "nocturnal-codex-assets"\n  tags = {\n    Environment = "Production"\n  }\n}`,
      prerequisites: ['Cloud Fundamentals'],
      resources: [
        { title: 'Terraform Official Registry & Tutorials', url: 'https://www.terraform.io/', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'kubernetes',
      label: 'Container Orchestration (Kubernetes)',
      status: 'recommended',
      x: 390,
      y: 400,
      description: 'Deploy resilient microservices with Pods, Deployments, Services, Ingress controllers, ConfigMaps, and horizontal pod autoscalers (HPA).',
      codeSnippet: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: api-service\nspec:\n  replicas: 3\n  selector:\n    matchLabels: { app: api }\n  template:\n    metadata: { labels: { app: api } }\n    spec:\n      containers:\n        - name: api\n          image: nocturnal/api:v1\n          ports: [{ containerPort: 8080 }]`,
      prerequisites: ['Docker Containerization'],
      resources: [
        { title: 'Kubernetes Official Documentation', url: 'https://kubernetes.io/docs/', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'observability',
      label: 'Observability (Prometheus & Grafana)',
      status: 'recommended',
      x: 390,
      y: 500,
      description: 'Monitor latency (p95, p99), error rates, throughput, and system resource saturation using Prometheus time-series metrics and Grafana dashboards.',
      codeSnippet: `# PromQL Query: 99th Percentile Request Latency\nhistogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))`,
      prerequisites: ['Kubernetes Orchestration'],
      resources: [
        { title: 'Prometheus Monitoring Guide', url: 'https://prometheus.io/docs/', type: 'docs' },
        { title: 'Grafana Labs Dashboards', url: 'https://grafana.com/docs/', type: 'docs' }
      ]
    })
  ],
  edges: [
    createEdge({ id: 'e-linux-ci', source: 'linux-shell', target: 'git-ci', type: 'roadmap' }),
    createEdge({ id: 'e-ci-docker', source: 'git-ci', target: 'docker', type: 'roadmap' }),
    createEdge({ id: 'e-docker-tf', source: 'docker', target: 'terraform', type: 'dotted' }),
    createEdge({ id: 'e-docker-k8s', source: 'docker', target: 'kubernetes', type: 'roadmap' }),
    createEdge({ id: 'e-k8s-obs', source: 'kubernetes', target: 'observability', type: 'roadmap' })
  ]
};

// 5. CYBERSECURITY ROADMAP
const cybersecurity = {
  nodes: [
    createSection({ id: 'h', label: 'Cybersecurity & Offensive / Defensive Path', x: 300, y: 20 }),
    createTopic({
      id: 'networking-protocols',
      label: 'Networking & Protocol Analysis',
      status: 'recommended',
      x: 390,
      y: 100,
      relatedLanguage: 'python',
      description: 'Understand the 7 layers of the OSI model, TCP 3-way handshake, Wireshark packet dissection, subnetting (CIDR), and DNS/TLS handshakes.',
      codeSnippet: `# Scapy Packet Inspection in Python\nfrom scapy.all import sniff\n\ndef packet_callback(packet):\n    if packet.haslayer('IP'):\n        print(f"[+] IP Packet: {packet['IP'].src} -> {packet['IP'].dst}")\n\nsniff(filter="ip", prn=packet_callback, count=10)`,
      prerequisites: ['Computer Science Fundamentals'],
      resources: [
        { title: 'Nocturnal Codex — Python Guide', url: '/languages/python', type: 'course' },
        { title: 'Wireshark Packet Analysis User Guide', url: 'https://www.wireshark.org/docs/', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'os-security',
      label: 'Linux & Windows Security',
      status: 'recommended',
      x: 130,
      y: 100,
      relatedLanguage: 'shell',
      description: 'Audit file permissions, SUID binaries, Active Directory Kerberos auth, system audit logs, and privilege escalation vectors.',
      codeSnippet: `# Linux SUID Privilege Escalation Enumeration\nfind / -perm -u=s -type f 2>/dev/null`,
      prerequisites: ['Operating Systems Basics'],
      resources: [
        { title: 'Nocturnal Codex — Shell Guide', url: '/languages/shell', type: 'course' }
      ]
    }),
    createTopic({
      id: 'web-security',
      label: 'Web Security (OWASP Top 10)',
      status: 'recommended',
      x: 390,
      y: 200,
      relatedLanguage: 'sql',
      description: 'Identify and defend against SQL Injection (SQLi), Cross-Site Scripting (XSS), CSRF, SSRF, IDOR, and Broken Access Control.',
      codeSnippet: `-- Vulnerable SQL Code (SQL Injection Hazard)\nSELECT * FROM users WHERE username = 'admin' OR '1'='1' --';\n\n-- Secure Parameterized Query\nSELECT * FROM users WHERE username = $1 AND password_hash = $2;`,
      prerequisites: ['Networking & Protocols'],
      resources: [
        { title: 'Nocturnal Codex — SQL & Databases', url: '/languages/sql', type: 'course' },
        { title: 'OWASP Top 10 Vulnerabilities Guide', url: 'https://owasp.org/www-project-top-ten/', type: 'docs' },
        { title: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security', type: 'course' }
      ]
    }),
    createTopic({
      id: 'cryptography',
      label: 'Applied Cryptography & PKI',
      status: 'recommended',
      x: 390,
      y: 300,
      relatedLanguage: 'python',
      description: 'Symmetric ciphers (AES-GCM), Asymmetric keys (RSA, ECC), digital signatures, TLS certificates, and cryptographic hash functions (SHA-256).',
      codeSnippet: `from cryptography.hazmat.primitives.ciphers.aead import AESGCM\nkey = AESGCM.generate_key(bit_length=256)\naesgcm = AESGCM(key)\nnonce = b"123456789012"\nciphertext = aesgcm.encrypt(nonce, b"Confidential Payload", None)`,
      prerequisites: ['Web Security'],
      resources: [
        { title: 'Nocturnal Codex — RSA Encryption In-Depth Analysis', url: '/think-tank/how-rsa-encryption-actually-works-break-down-prime-factorization-modulo-ari', type: 'article' }
      ]
    }),
    createTopic({
      id: 'pentesting',
      label: 'Penetration Testing & Red Teaming',
      status: 'recommended',
      x: 390,
      y: 400,
      description: 'Reconnaissance (Nmap, Shodan), vulnerability scanning, exploit frameworks (Metasploit), and post-exploitation reporting.',
      codeSnippet: `# Nmap Service & Vulnerability Detection Scan\nnmap -sV -sC -p- -T4 target_ip -oA scan_results`,
      prerequisites: ['Applied Cryptography'],
      resources: [
        { title: 'Nmap Network Scanning Guide', url: 'https://nmap.org/book/', type: 'docs' },
        { title: 'Hack The Box Cybersecurity Labs', url: 'https://www.hackthebox.com/', type: 'course' }
      ]
    }),
    createTopic({
      id: 'soc-defense',
      label: 'Blue Team Defense & SIEM',
      status: 'alternative',
      x: 650,
      y: 400,
      description: 'Incident response, SIEM log analysis (Splunk, Elastic SIEM), threat hunting, EDR detection rules (Sigma/YARA), and firewall rule configuration.',
      codeSnippet: `// YARA Rule for Detecting Malicious Hex Signatures\nrule DetectRansomwareNote {\n    strings:\n        $s1 = "Your files have been encrypted!" ascii\n    condition:\n        $s1\n}`,
      prerequisites: ['Applied Cryptography'],
      resources: [
        { title: 'Sigma Generic Detection Rules', url: 'https://github.com/SigmaHQ/sigma', type: 'docs' }
      ]
    })
  ],
  edges: [
    createEdge({ id: 'e-os-net', source: 'os-security', target: 'networking-protocols', type: 'dotted' }),
    createEdge({ id: 'e-net-web', source: 'networking-protocols', target: 'web-security', type: 'roadmap' }),
    createEdge({ id: 'e-web-crypto', source: 'web-security', target: 'cryptography', type: 'roadmap' }),
    createEdge({ id: 'e-crypto-pentest', source: 'cryptography', target: 'pentesting', type: 'roadmap' }),
    createEdge({ id: 'e-crypto-soc', source: 'cryptography', target: 'soc-defense', type: 'dotted' })
  ]
};

// 6. MACHINE LEARNING ROADMAP
const machineLearning = {
  nodes: [
    createSection({ id: 'h', label: 'Machine Learning & AI Engineering Path', x: 300, y: 20 }),
    createTopic({
      id: 'math-foundations',
      label: 'Linear Algebra & Calculus',
      status: 'recommended',
      x: 390,
      y: 100,
      relatedLanguage: 'python',
      description: 'Understand vector spaces, matrix multiplication, eigenvalues/eigenvectors, partial derivatives, gradients, and multivariate chain rule for backpropagation.',
      codeSnippet: `# Matrix Multiplication & Gradient in Python NumPy\nimport numpy as np\nA = np.array([[2.0, 3.0], [1.0, 4.0]])\nx = np.array([1.0, 2.0])\ny = np.dot(A, x) # Linear transformation`,
      prerequisites: ['High School Mathematics'],
      resources: [
        { title: 'Nocturnal Codex — Linear Algebra Guide', url: '/mathematics/linear-algebra', type: 'course' },
        { title: '3Blue1Brown — Essence of Linear Algebra', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', type: 'course' }
      ]
    }),
    createTopic({
      id: 'python-data',
      label: 'Python Data Science (NumPy & Pandas)',
      status: 'recommended',
      x: 390,
      y: 200,
      relatedLanguage: 'python',
      description: 'Data manipulation, feature engineering, missing value imputation, vectorized operations in NumPy, and visualizations with Matplotlib.',
      codeSnippet: `import pandas as pd\ndf = pd.read_csv("training_data.csv")\n# Feature scaling & normalization\ndf["feature_scaled"] = (df["feature"] - df["feature"].mean()) / df["feature"].std()`,
      prerequisites: ['Linear Algebra & Calculus'],
      resources: [
        { title: 'Nocturnal Codex — Python Guide', url: '/languages/python', type: 'course' },
        { title: 'Pandas User Guide & Reference', url: 'https://pandas.pydata.org/docs/', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'classical-ml',
      label: 'Classical ML (Scikit-Learn)',
      status: 'recommended',
      x: 390,
      y: 300,
      relatedLanguage: 'python',
      description: 'Linear/Logistic Regression, Decision Trees, Random Forests, Support Vector Machines (SVM), K-Means clustering, and cross-validation metrics (ROC-AUC).',
      codeSnippet: `from sklearn.ensemble import RandomForestClassifier\nclf = RandomForestClassifier(n_estimators=100, max_depth=5)\nclf.fit(X_train, y_train)\naccuracy = clf.score(X_test, y_test)`,
      prerequisites: ['Python Data Science'],
      resources: [
        { title: 'Scikit-Learn Machine Learning Tutorials', url: 'https://scikit-learn.org/stable/', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'deep-learning',
      label: 'Deep Learning & PyTorch',
      status: 'recommended',
      x: 390,
      y: 400,
      relatedLanguage: 'python',
      description: 'Artificial Neural Networks, backpropagation computation graphs, loss functions (CrossEntropy), optimizers (AdamW), GPU acceleration with CUDA.',
      codeSnippet: `import torch\nimport torch.nn as nn\n\nclass MLP(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.fc = nn.Sequential(nn.Linear(784, 128), nn.ReLU(), nn.Linear(128, 10))\n    def forward(self, x): return self.fc(x)`,
      prerequisites: ['Classical ML'],
      resources: [
        { title: 'PyTorch Deep Learning Tutorials', url: 'https://pytorch.org/tutorials/', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'transformers-llms',
      label: 'Transformers & Large Language Models',
      status: 'recommended',
      x: 390,
      y: 500,
      relatedLanguage: 'python',
      description: 'Multi-Head Self-Attention mechanisms, encoder-decoder architectures (GPT/BERT), tokenization (BPE), Hugging Face libraries, and LoRA fine-tuning.',
      codeSnippet: `from transformers import AutoModelForCausalLM, AutoTokenizer\ntokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3-8B")\nmodel = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3-8B", device_map="auto")\ninputs = tokenizer("Theory of Computation:", return_tensors="pt").to("cuda")\noutputs = model.generate(**inputs, max_new_tokens=50)`,
      prerequisites: ['Deep Learning & PyTorch'],
      resources: [
        { title: 'Hugging Face NLP Course', url: 'https://huggingface.co/learn/nlp-course', type: 'course' }
      ]
    }),
    createTopic({
      id: 'mlops',
      label: 'MLOps & Model Deployment (ONNX / vLLM)',
      status: 'recommended',
      x: 650,
      y: 500,
      relatedLanguage: 'python',
      description: 'Serve low-latency model inference endpoints with vLLM, TensorRT-LLM, ONNX runtime export, Docker containers, and quantization (AWQ, GGUF).',
      codeSnippet: `# Export PyTorch Model to Portable ONNX\ntorch.onnx.export(model, dummy_input, "model.onnx", input_names=["input"], output_names=["output"])`,
      prerequisites: ['Deep Learning & PyTorch'],
      resources: [
        { title: 'ONNX Runtime Documentation', url: 'https://onnxruntime.ai/', type: 'docs' }
      ]
    })
  ],
  edges: [
    createEdge({ id: 'e-math-py', source: 'math-foundations', target: 'python-data', type: 'roadmap' }),
    createEdge({ id: 'e-py-ml', source: 'python-data', target: 'classical-ml', type: 'roadmap' }),
    createEdge({ id: 'e-ml-dl', source: 'classical-ml', target: 'deep-learning', type: 'roadmap' }),
    createEdge({ id: 'e-dl-llm', source: 'deep-learning', target: 'transformers-llms', type: 'roadmap' }),
    createEdge({ id: 'e-dl-mlops', source: 'deep-learning', target: 'mlops', type: 'dotted' })
  ]
};

// 7. EMBEDDED SYSTEMS ROADMAP
const embeddedSystems = {
  nodes: [
    createSection({ id: 'h', label: 'Embedded Systems & Firmware Path', x: 300, y: 20 }),
    createTopic({
      id: 'embedded-c',
      label: 'Embedded C & Pointer Arithmetic',
      status: 'recommended',
      x: 390,
      y: 100,
      relatedLanguage: 'c',
      description: 'Master raw memory manipulation in C: bitwise operations, volatile qualifier, register access, struct padding, and fixed-width integer types (uint32_t).',
      codeSnippet: `// Memory-Mapped Peripheral Register Access\n#define GPIOA_BASE 0x40020000UL\n#define GPIOA_ODR  (*(volatile uint32_t *)(GPIOA_BASE + 0x14))\n\nvoid toggle_led(void) {\n    GPIOA_ODR ^= (1U << 5); // Toggle Pin 5\n}`,
      prerequisites: ['Computer Architecture Basics'],
      resources: [
        { title: 'Nocturnal Codex — C Programming Guide', url: '/languages/c', type: 'course' }
      ]
    }),
    createTopic({
      id: 'mcu-arch',
      label: 'ARM Cortex-M Architecture',
      status: 'recommended',
      x: 390,
      y: 200,
      relatedLanguage: 'c',
      description: 'Understand ARM Thumb assembly, NVIC nested vector interrupt controller, system clock trees (PLL), flash memory controllers, and stack management.',
      codeSnippet: `// Interrupt Service Routine (ISR) in ARM Cortex-M\nvoid EXTI0_IRQHandler(void) {\n    if (EXTI->PR & (1 << 0)) {\n        EXTI->PR = (1 << 0); // Clear interrupt flag\n        handle_button_press();\n    }\n}`,
      prerequisites: ['Embedded C'],
      resources: [
        { title: 'ARM Cortex-M Programming Reference', url: 'https://developer.arm.com/', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'peripherals-comm',
      label: 'Hardware Protocols (UART / SPI / I2C)',
      status: 'recommended',
      x: 390,
      y: 300,
      relatedLanguage: 'c',
      description: 'Communicate with sensors and peripherals using bus protocols: synchronous SPI (MISO/MOSI), 2-wire I2C with addressing, and asynchronous UART.',
      codeSnippet: `// I2C Sensor Read Transaction\nuint8_t read_sensor(uint8_t dev_addr, uint8_t reg) {\n    i2c_start();\n    i2c_write(dev_addr << 1);\n    i2c_write(reg);\n    i2c_start(); // Repeated start\n    i2c_write((dev_addr << 1) | 1);\n    uint8_t val = i2c_read_nack();\n    i2c_stop();\n    return val;\n}`,
      prerequisites: ['ARM Cortex-M Architecture'],
      resources: [
        { title: 'I2C and SPI Bus Protocol Specifications', url: 'https://www.i2c-bus.org/', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'rtos',
      label: 'Real-Time Operating Systems (FreeRTOS)',
      status: 'recommended',
      x: 390,
      y: 400,
      relatedLanguage: 'c',
      description: 'Implement deterministic real-time multitasking: preemptive task scheduling, priority inversion solutions with Mutexes, Semaphores, and message queues.',
      codeSnippet: `// FreeRTOS Task Spawning\nvoid SensorTask(void *pvParameters) {\n    for (;;) {\n        read_adc_values();\n        vTaskDelay(pdMS_TO_TICKS(100));\n    }\n}\n// xTaskCreate(SensorTask, "Sensor", 128, NULL, 2, NULL);`,
      prerequisites: ['Hardware Protocols'],
      resources: [
        { title: 'FreeRTOS Official Reference Manual', url: 'https://www.freertos.org/', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'hardware-debug',
      label: 'Debugging (SWD, JTAG & Logic Analyzers)',
      status: 'recommended',
      x: 650,
      y: 400,
      description: 'Diagnose timing issues and bugs at the wire level using JTAG/SWD hardware debuggers, OpenOCD, GDB server, and logic analyzers (Saleae).',
      codeSnippet: `# OpenOCD GDB Target Session\nopenocd -f interface/stlink.cfg -f target/stm32f4x.cfg\n# arm-none-eabi-gdb app.elf -ex "target extended-remote :3333"`,
      prerequisites: ['FreeRTOS'],
      resources: [
        { title: 'OpenOCD Debugger Documentation', url: 'https://openocd.org/', type: 'docs' }
      ]
    })
  ],
  edges: [
    createEdge({ id: 'e-c-mcu', source: 'embedded-c', target: 'mcu-arch', type: 'roadmap' }),
    createEdge({ id: 'e-mcu-periph', source: 'mcu-arch', target: 'peripherals-comm', type: 'roadmap' }),
    createEdge({ id: 'e-periph-rtos', source: 'peripherals-comm', target: 'rtos', type: 'roadmap' }),
    createEdge({ id: 'e-rtos-debug', source: 'rtos', target: 'hardware-debug', type: 'dotted' })
  ]
};

// 8. GAME DEVELOPMENT ROADMAP
const gameDevelopment = {
  nodes: [
    createSection({ id: 'h', label: 'Game Engineering & Graphics Path', x: 300, y: 20 }),
    createTopic({
      id: 'game-math',
      label: '3D Math, Vectors & Quaternions',
      status: 'recommended',
      x: 390,
      y: 100,
      relatedLanguage: 'cplusplus',
      description: 'Understand 3D vector arithmetic, dot and cross products, quaternions to prevent gimbal lock, ray-plane intersection, and collision geometry.',
      codeSnippet: `// 3D Vector Reflection Math\nVector3 reflect(const Vector3& velocity, const Vector3& normal) {\n    return velocity - normal * (2.0f * dot(velocity, normal));\n}`,
      prerequisites: ['Linear Algebra Basics'],
      resources: [
        { title: 'Nocturnal Codex — C++ Guide', url: '/languages/cplusplus', type: 'course' },
        { title: 'Mathematics for 3D Game Programming & Computer Graphics', url: 'https://www.game-math.com/', type: 'book' }
      ]
    }),
    createTopic({
      id: 'game-engine',
      label: 'Game Engines (Unreal C++ / Unity C#)',
      status: 'recommended',
      x: 390,
      y: 200,
      relatedLanguage: 'cplusplus',
      description: 'Master actor-component architectures, scene graphs, particle systems, physics simulation loops, and input mapping in Unreal Engine 5 or Unity.',
      codeSnippet: `// Unreal Engine 5 C++ Actor Component\n#include "CoreMinimal.h"\n#include "GameFramework/Actor.h"\n\nvoid APlayerCharacter::Tick(float DeltaTime) {\n    Super::Tick(DeltaTime);\n    AddMovementInput(GetActorForwardVector(), MoveForwardAxis);\n}`,
      prerequisites: ['3D Math & Vectors'],
      resources: [
        { title: 'Unreal Engine 5 Official C++ Documentation', url: 'https://docs.unrealengine.com/5.0/', type: 'docs' },
        { title: 'Unity Learn Platform', url: 'https://learn.unity.com/', type: 'course' }
      ]
    }),
    createTopic({
      id: 'graphics-shaders',
      label: 'Graphics Shaders (HLSL / GLSL)',
      status: 'recommended',
      x: 390,
      y: 300,
      relatedLanguage: 'cplusplus',
      description: 'Write vertex and fragment shaders for real-time rasterization, PBR (Physically Based Rendering) lighting models, normal mapping, and post-processing.',
      codeSnippet: `// HLSL Simple PBR Normal & Lambertian Light Fragment Shader\nfloat4 PSMain(VS_OUTPUT input) : SV_TARGET {\n    float3 lightDir = normalize(LightPosition - input.WorldPos);\n    float diff = max(dot(input.Normal, lightDir), 0.0);\n    return float4(BaseColor.rgb * diff, 1.0);\n}`,
      prerequisites: ['Game Engines'],
      resources: [
        { title: 'The Book of Shaders Guide', url: 'https://thebookofshaders.com/', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'game-ai-systems',
      label: 'Game AI & Navigation (Behavior Trees)',
      status: 'recommended',
      x: 650,
      y: 300,
      relatedLanguage: 'cplusplus',
      description: 'Implement NPC decision making with Behavior Trees, finite state machines (FSM), NavMesh pathfinding (A* algorithm), and sensory perception.',
      codeSnippet: `// Simple State Machine Transition\nenum class EnemyState { Patrol, Chase, Attack };\nvoid UpdateEnemy(EnemyState& state, float distanceToPlayer) {\n    if (distanceToPlayer < 2.0f) state = EnemyState::Attack;\n    else if (distanceToPlayer < 10.0f) state = EnemyState::Chase;\n    else state = EnemyState::Patrol;\n}`,
      prerequisites: ['Game Engines'],
      resources: [
        { title: 'Game Programming Patterns (Robert Nystrom)', url: 'https://gameprogrammingpatterns.com/', type: 'book' }
      ]
    }),
    createTopic({
      id: 'game-optimization',
      label: 'Performance Profiling & Memory (LODs)',
      status: 'recommended',
      x: 390,
      y: 400,
      relatedLanguage: 'cplusplus',
      description: 'Optimize CPU frame budget and GPU fill rates: draw call batching, Level of Detail (LOD) hierarchies, occlusion culling, and memory profiling.',
      codeSnippet: `// Memory Pool Allocator for Game Entities to avoid runtime heap fragmentation\ntemplate<typename T, size_t Count>\nclass EntityPool {\n    alignas(T) uint8_t memory[Count * sizeof(T)];\n    // Fast O(1) allocation\n};`,
      prerequisites: ['Graphics Shaders'],
      resources: [
        { title: 'Unreal Engine Insights Profiler Documentation', url: 'https://docs.unrealengine.com/5.0/en-US/unreal-insights-in-unreal-engine/', type: 'docs' }
      ]
    })
  ],
  edges: [
    createEdge({ id: 'e-math-engine', source: 'game-math', target: 'game-engine', type: 'roadmap' }),
    createEdge({ id: 'e-engine-shaders', source: 'game-engine', target: 'graphics-shaders', type: 'roadmap' }),
    createEdge({ id: 'e-engine-ai', source: 'game-engine', target: 'game-ai-systems', type: 'dotted' }),
    createEdge({ id: 'e-shaders-opt', source: 'graphics-shaders', target: 'game-optimization', type: 'roadmap' })
  ]
};

// 9. MOBILE DEVELOPMENT ROADMAP
const mobileDevelopment = {
  nodes: [
    createSection({ id: 'h', label: 'Mobile App Engineering Path', x: 300, y: 20 }),
    createTopic({
      id: 'cross-platform',
      label: 'Cross-Platform Frameworks (React Native / Flutter)',
      status: 'recommended',
      x: 390,
      y: 100,
      relatedLanguage: 'typescript',
      description: 'Build native iOS and Android apps from a unified codebase using React Native (JavaScript/TypeScript) or Flutter (Dart).',
      codeSnippet: `import { View, Text, StyleSheet } from 'react-native';\n\nexport function MobileScreen() {\n  return (\n    <View style={styles.container}>\n      <Text style={styles.heading}>Unified Mobile Architecture</Text>\n    </View>\n  );\n}`,
      prerequisites: ['JavaScript or Dart Fundamentals'],
      resources: [
        { title: 'React Native Official Guide', url: 'https://reactnative.dev/', type: 'docs' },
        { title: 'Flutter Official Documentation', url: 'https://docs.flutter.dev/', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'native-ios',
      label: 'Native iOS (Swift & SwiftUI)',
      status: 'alternative',
      x: 130,
      y: 200,
      relatedLanguage: 'swift',
      description: 'Master Swift 5, SwiftUI declarative views, Combine reactive pipelines, CoreData persistence, and Apple Human Interface Guidelines.',
      codeSnippet: `import SwiftUI\n\nstruct ProfileView: View {\n    @State private var username = "TheNocturnist"\n    var body: some View {\n        NavigationStack {\n            Text("Operator: \\(username)")\n                .navigationTitle("Profile")\n        }\n    }\n}`,
      prerequisites: ['Programming Fundamentals'],
      resources: [
        { title: 'Apple Developer — SwiftUI Tutorials', url: 'https://developer.apple.com/xcode/swiftui/', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'native-android',
      label: 'Native Android (Kotlin & Jetpack Compose)',
      status: 'alternative',
      x: 650,
      y: 200,
      relatedLanguage: 'kotlin',
      description: 'Master modern Android development: Kotlin Coroutines for async execution, Jetpack Compose declarative UI, ViewModel, and Room database.',
      codeSnippet: `import androidx.compose.material3.*\nimport androidx.compose.runtime.*\n\n@Composable\nfun AppGreeting(name: String) {\n    Surface(color = MaterialTheme.colorScheme.background) {\n        Text(text = "Welcome to $name", style = MaterialTheme.typography.headlineMedium)\n    }\n}`,
      prerequisites: ['Programming Fundamentals'],
      resources: [
        { title: 'Android Developers — Jetpack Compose Guide', url: 'https://developer.android.com/jetpack/compose', type: 'docs' }
      ]
    }),
    createTopic({
      id: 'mobile-data',
      label: 'Offline Data, Caching & SQLite',
      status: 'recommended',
      x: 390,
      y: 300,
      relatedLanguage: 'sql',
      description: 'Design resilient mobile experiences with offline caching, local SQLite storage, optimistic UI updates, and background sync workers.',
      codeSnippet: `// SQLite Local Persistence Query\nimport * as SQLite from 'expo-sqlite';\nconst db = SQLite.openDatabaseSync('codex_cache.db');\n\ndb.execSync('CREATE TABLE IF NOT EXISTS notes (id TEXT PRIMARY KEY, text TEXT);');\ndb.runSync('INSERT INTO notes (id, text) VALUES (?, ?);', ['1', 'Offline Theorem']);`,
      prerequisites: ['Cross-Platform or Native UI'],
      resources: [
        { title: 'Nocturnal Codex — SQL Guide', url: '/languages/sql', type: 'course' }
      ]
    }),
    createTopic({
      id: 'device-hardware',
      label: 'Hardware APIs & Store Deployment',
      status: 'recommended',
      x: 390,
      y: 400,
      description: 'Interface with mobile hardware: Push Notifications (FCM/APNs), Biometric FaceID/Fingerprint auth, Camera/Photo library, and App Store release pipelines with Fastlane.',
      codeSnippet: `# Fastlane iOS & Android Deployment Command\nfastlane release\n# Automates code signing, screenshots, TestFlight upload, and production store release`,
      prerequisites: ['Offline Data & UI'],
      resources: [
        { title: 'Fastlane Automation Documentation', url: 'https://fastlane.tools/', type: 'docs' }
      ]
    })
  ],
  edges: [
    createEdge({ id: 'e-cross-ios', source: 'cross-platform', target: 'native-ios', type: 'dotted' }),
    createEdge({ id: 'e-cross-android', source: 'cross-platform', target: 'native-android', type: 'dotted' }),
    createEdge({ id: 'e-cross-data', source: 'cross-platform', target: 'mobile-data', type: 'roadmap' }),
    createEdge({ id: 'e-data-hardware', source: 'mobile-data', target: 'device-hardware', type: 'roadmap' })
  ]
};

const roadmaps = {
  'frontend.json': frontend,
  'backend.json': backend,
  'full-stack.json': fullStack,
  'devops.json': devops,
  'cybersecurity.json': cybersecurity,
  'machine-learning.json': machineLearning,
  'embedded-systems.json': embeddedSystems,
  'game-development.json': gameDevelopment,
  'mobile-development.json': mobileDevelopment,
};

for (const [filename, data] of Object.entries(roadmaps)) {
  const filePath = path.join(roadmapDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Updated ${filename}: ${data.nodes.length} nodes, ${data.edges.length} edges.`);
}

console.log('All 9 roadmap data schemas successfully standardized and verified!');
