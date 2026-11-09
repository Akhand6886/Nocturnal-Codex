# Design System Specification — Nocturnal Codex

**Project:** Nocturnal Codex (`nocturnal-codex`)  
**Document:** `docs/design-system.md`  
**Status:** Approved / Premium Dark Digital Knowledge Archive  
**Philosophy:** Atmospheric Minimalist Archive meets Precision Monospace Engineering.

---

## 1. Visual Philosophy & Core Identity

Nocturnal Codex is designed as a sophisticated digital knowledge archive engineered for computer scientists, software architects, researchers, and serious autodidacts.

Key design principles:
- **Atmospheric, Not Loud:** Deep blacks (`#000000`), slate surface elevations (`#181818`, `#1F1F1F`), and clean micro-borders (`#272727`).
- **Restrained Single Accent:** Warm Amber Gold (`#E5A93C`) used selectively for active state indicators, telemetry pings, and focal highlights.
- **Editorial Typography:** Geist Sans for clean application readability paired with Geist Mono for technical folios, code snippets, metadata, and timestamps.
- **Purposeful Motion:** Transitions governed by custom archive easing `cubic-bezier(0.22, 1, 0.36, 1)` with full `prefers-reduced-motion` compliance.
- **Zero Decorative Noise:** No rainbow gradients, no neon glow halos, and no repetitive generic card grids.

---

## 2. Color Palette & Semantic Tokens

### 2.1 Core Dark Archive Tokens
| Token | HSL / CSS Value | Hex Approx | Semantic Role |
| :--- | :--- | :--- | :--- |
| `--background` | `0 0% 0%` | `#000000` | Deep archival void (Base canvas) |
| `--card` / `--surface` | `0 0% 9.4%` | `#181818` | Primary surface containers, cards, and drawers |
| `--card-hover` | `0 0% 10.6%` | `#1B1B1B` | Hover elevation for interactive cards |
| `--secondary` | `0 0% 12.2%` | `#1F1F1F` | Secondary interactive pills and sub-containers |
| `--border` / `--input` | `0 0% 15.3%` | `#272727` | Subtle border delimiters and frame bounds |
| `--border-hover` | `0 0% 22%` | `#383838` | Hover state border delimiter |
| `--foreground` | `0 0% 93%` | `#EDEDED` | Crisp primary body and heading copy |
| `--muted-foreground` | `0 0% 64%` | `#A1A1A1` | Secondary descriptions, timestamps, and captions |
| `--primary` | `38 78% 57%` | `#E5A93C` | Amber Gold archive accent token |
| `--primary-foreground`| `0 0% 0%` | `#000000` | High-contrast black on amber fills |
| `--ring` | `38 78% 57%` | `#E5A93C` | Keyboard accessibility focus indicator |
| `--destructive` | `0 72% 51%` | `#DC2626` | Error states and critical telemetry warnings |

---

## 3. Typography Hierarchy

```
Primary Body & Interface : Geist Sans
Technical Folios & Code  : Geist Mono
```

| Scale Token | Font Size | Line Height | Weight | Font Family | Styling Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | `48px–64px` (`3rem–4rem`) | `1.1` | `600–700` | Geist Sans | Subtle white-to-neutral gradient; tracking tight |
| **Section Header** | `30px–36px` (`1.875rem–2.25rem`)| `1.2` | `600` | Geist Sans | Accompanied by monospace `// INDEX XX` eyebrow |
| **Card Header** | `16px–18px` (`1rem–1.125rem`)| `1.3` | `600` | Geist Sans | Hover transition to `#E5A93C` |
| **Body Large** | `16px` (`1rem`) | `1.6` | `400` | Geist Sans | Section lead paragraphs; line-height relaxed |
| **Body Base** | `14px` (`0.875rem`) | `1.55`| `400` | Geist Sans | Standard article, guide, and topic text |
| **Monospace Eyebrow**| `11px` (`0.6875rem`) | `1.4` | `500` | Geist Mono | Uppercase `tracking-widest` metadata marker |
| **Code Snippet** | `12px` (`0.75rem`) | `1.5` | `400` | Geist Mono | Syntax container in `#101010` with `#272727` border |

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
