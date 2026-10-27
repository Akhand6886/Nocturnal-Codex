# Design System Specification — Nocturnal Codex

**Project:** Nocturnal Codex (`nocturnal-codex`)  
**Document:** `docs/design-system.md`  
**Status:** Approved / Baseline Design System  
**Philosophy:** Editorial Neo-Brutalism meets High-Precision Technical Typography.

---

## 1. Visual Philosophy & Core Identity

Nocturnal Codex merges the intellectual warmth of classical academic compendiums with the razor-sharp clarity of modern developer tools. It balances two intentional themes:
- **Diurnal (Light Mode):** A 60-30-10 warm-beige parchment canvas (`hsl(36 28% 95%)`) with deep charcoal typography (`hsl(0 0% 0%)`) and vibrant emerald teal/gold accents.
- **Nocturnal (Dark Mode):** An OLED-optimized pitch black canvas (`hsl(0 0% 0%)`) with luminous electric cyan/teal (`hsl(180 100% 45%)`) and amber gold highlights.
- **Interactive Roadmap Layer:** Neo-brutalist infographic styling with hard high-contrast borders (`2px solid #000`), vivid yellow/purple topic pills, and strict 90-degree connecting lines.

---

## 2. Color Palette & Semantic Tokens

### 2.1 Diurnal (Light Mode) Tokens
| Token | HSL / CSS Value | Hex Approx | Semantic Role |
| :--- | :--- | :--- | :--- |
| `--background` | `36 28% 95%` | `#F6F4EE` | Primary parchment base (60%) |
| `--surface` | `36 24% 93%` | `#EFECE3` | Container surface elevation |
| `--card` | `30 25% 99%` | `#FCFBF9` | Elevated cards, dialogs, and popovers (30%) |
| `--card-foreground` | `0 0% 0%` | `#000000` | Card title and primary text |
| `--foreground` | `0 0% 0%` | `#000000` | Highest-contrast primary text |
| `--muted` | `36 20% 92%` | `#EDE9DF` | Secondary card fills & divider stripes |
| `--muted-foreground`| `0 0% 20%` | `#333333` | Secondary body text and metadata |
| `--primary` | `174 84% 32%` | `#0D968B` | Deep Emerald Teal interactive brand fill (10%) |
| `--primary-foreground`| `0 0% 100%` | `#FFFFFF` | Pure white text on primary fills |
| `--accent` | `38 92% 50%` | `#F59E0B` | Warm Amber Gold highlight and secondary badges |
| `--border` / `--input`| `36 15% 88%` | `#E3DFD5` | Parchment borders and input outlines |
| `--ring` | `174 84% 32%` | `#0D968B` | Accessible high-contrast focus rings |
| `--destructive` | `0 84% 60%` | `#EF4444` | Validation errors and danger actions |

### 2.2 Nocturnal (Dark Mode) Tokens
| Token | HSL / CSS Value | Hex Approx | Semantic Role |
| :--- | :--- | :--- | :--- |
| `--background` | `0 0% 0%` | `#000000` | OLED pure pitch black (60%) |
| `--surface` | `0 0% 3%` | `#080808` | Subtle elevated panel surface |
| `--card` | `0 0% 3%` | `#080808` | Elevated cards and menus (30%) |
| `--card-foreground` | `0 0% 98%` | `#FAFAFA` | Card primary text |
| `--foreground` | `0 0% 98%` | `#FAFAFA` | Crisp off-white text |
| `--muted` | `0 0% 9%` | `#171717` | Muted background stripes and pills |
| `--muted-foreground`| `0 0% 60%` | `#999999` | Subtitles, captions, and hints |
| `--primary` | `180 100% 45%` | `#00E5E5` | Electric Cyan/Teal brand glow (10%) |
| `--primary-foreground`| `0 0% 0%` | `#000000` | Black text on bright primary fills |
| `--accent` | `45 100% 55%` | `#FFC21A` | Luminous amber gold highlights |
| `--border` / `--input`| `0 0% 12%` | `#1F1F1F` | Deep slate structural borders |
| `--ring` | `180 100% 45%` | `#00E5E5` | Cyan keyboard focus indicator |
| `--destructive` | `0 84% 60%` | `#EF4444` | High-visibility warning red |

### 2.3 Neo-Brutalist Roadmap Tokens
| Token | Hex / HSL | Usage |
| :--- | :--- | :--- |
| `--rm-topic-bg` | `#FEF015` (`54 99% 54%`) | Core learning topic card background |
| `--rm-topic-border` | `#000000` | Heavy 2px solid card border |
| `--rm-subtopic-bg` | `hsl(58, 100%, 88%)` | Ancillary subtopic card background |
| `--rm-edge` | `hsl(217, 91%, 60%)` | Smooth-step roadmap interconnecting line |
| Topic Hard Shadow | `4px 4px 0px #000` | Physical neo-brutalist elevation |

---

## 3. Typography Hierarchy

```
Editorial Headings & Philosophy : Playfair Display (Serif)
UI, Navigation, & Body Copy    : Quicksand / System Sans-Serif
Code, Terminals, & Tokens      : Inconsolata / Fira Code (Monospace)
```

| Scale Token | Font Size | Line Height | Weight | Font Family | Styling Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display H1** | `48px` (`3rem`) | `1.15` | `800` | Sans + Serif | Mobile: `36px`; gradient text flow with italicized serif highlights |
| **Page H1** | `36px` (`2.25rem`)| `1.2` | `800` | Sans | Tracking tight; accompanied by themed category icon |
| **Section H2**| `30px` (`1.875rem`)|`1.25`| `700` | Sans | Accompanied by themed Lucide icon and border accent |
| **Card H3** | `20px` (`1.25rem`)| `1.35`| `600` | Sans | High legibility on dark and light surfaces |
| **Subheading**| `16px` (`1rem`) | `1.4` | `600` | Sans | Uppercase letter-spacing (`tracking-wider`) |
| **Body Large**| `18px` (`1.125rem`)|`1.6` | `400` | Sans | Hero leads and intro paragraphs |
| **Body Base** | `15px` (`0.9375rem`)|`1.6` | `400` | Sans | Standard markdown and tutorial text |
| **Body Small**| `13.5px` (`0.84rem`)|`1.5` | `400` | Sans | Captions, metadata, and breadcrumb labels |
| **Code Inline**| `13.5px` | `1.4` | `500` | Mono | Rounded pill badge with background contrast |
| **Code Block**| `13.5px` | `1.55`| `400` | Mono | Syntax-highlighted container with copy action |

---

## 4. Spacing Scale, Containers, & Breakpoints

### 4.1 Base 4px Spacing Scale
The spacing scale aligns strictly with multiples of 4px:
- `space-1`: `4px`
- `space-2`: `8px`
- `space-3`: `12px`
- `space-4`: `16px`
- `space-6`: `24px`
- `space-8`: `32px`
- `space-12`: `48px`
- `space-16`: `64px`
- `space-24`: `96px`

### 4.2 Responsive Breakpoints
- **Mobile (`sm`):** `640px` (single column layout, drawer navigation)
- **Tablet (`md`):** `768px` (two column cards, expanded topbar)
- **Desktop (`lg`):** `1024px` (three column grids, side navigation)
- **Wide (`xl`):** `1280px` (four column roadmaps, max container reading layout)
- **Ultra (`2xl`):** `1536px`

### 4.3 Container Constraints
- **Global Page Container:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Article & Reading Viewport:** `max-w-4xl mx-auto px-4` (~65-75 characters per line)
- **Tutorial Sidebar:** `w-[280px] shrink-0 sticky top-20`
- **Card Grid Layouts:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

---

## 5. Component Standards (Radix UI + Shadcn)

### 5.1 Buttons
- **`default` (Primary):** `bg-primary text-primary-foreground hover:bg-primary/85 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5`.
- **`outline`:** `border border-input bg-background text-foreground hover:bg-accent/10 hover:text-accent-foreground shadow-sm`.
- **`secondary`:** `bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm`.
- **`ghost`:** `hover:bg-accent/15 hover:text-foreground dark:hover:text-accent-foreground`.
- **`link`:** `text-primary underline-offset-4 hover:underline`.
- **Accessible Focus:** `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none`.

### 5.2 Forms & Inputs
- **Inputs & Textareas:** `bg-background border border-input rounded-md px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary disabled:opacity-50`.
- **Labels:** `text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`.
- **Validation Messages:** `text-xs font-medium text-destructive mt-1 flex items-center gap-1`.
- **Input Error State:** `aria-invalid="true"` borders shift to `border-destructive`.

### 5.3 Cards & Surfaces
- **Standard Card:** `rounded-xl border border-border/50 bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300`.
- **Roadmap Topic Node:** `w-[220px] h-[56px] px-3.5 py-2 rounded-xl text-center cursor-pointer border backdrop-blur-md shadow-sm hover:shadow-md hover:border-primary/70`.

### 5.4 Navigation Components
- **Navbar:** Sticky top with backdrop blur (`backdrop-blur-lg bg-background/90`), border bottom (`border-b border-border/60`), logo, theme toggle, and desktop navigation items.
- **Mobile Sheet:** Slide-out drawer with full-width clickable navigation links and auto-close on selection.
- **Breadcrumbs:** Semantic `<nav aria-label="Breadcrumb">` with `<ol>` and Chevron right separators.
- **Tutorial Pagination:** Previous/Next lesson navigation buttons with titles and directional arrows.

### 5.5 Feedback & Status Indicators
- **Toast Notifications:** Slide in from viewport corner with title, description, and auto-dismiss timer.
- **Badges:**
  - `Beginner`: Soft secondary badge (`bg-secondary text-secondary-foreground`).
  - `Intermediate`: Primary badge (`bg-primary text-primary-foreground`).
  - `Advanced`: Destructive badge (`bg-destructive text-destructive-foreground`).
  - `Recommended`: Purple pill badge (`bg-purple-600 text-white font-mono text-[9px]`).
- **Loading State:** Subtle SVG spinner (`lucide-react Loader2` / `Spinner`) centered in viewport.
- **Empty States:** Friendly, explanatory fallback containers with icon, descriptive copy, and a recovery action button.

---

## 6. Interaction & Animation Principles

1. **Micro-interactions:** Restrained, functional hover feedback (150ms-300ms ease-out). No gratuitous bouncing or distracting 3D rotations.
2. **Accessible Focus States:** Every interactive element must display a visible outline or ring on keyboard navigation.
3. **Reduced Motion Compliance:** `@media (prefers-reduced-motion: reduce)` automatically suppresses transforms, pulses, and smooth-scrolling.
