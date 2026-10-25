# Design System Specification — Nocturnal Codex

**Project:** Nocturnal Codex  
**Document:** `docs/design-system.md`  
**Philosophy:** Editorial Neo-Brutalism meets High-Precision Technical Typography.

---

## 1. Visual Philosophy & Identity

Nocturnal Codex merges the intellectual warmth of classical academic compendiums with the razor-sharp clarity of modern developer tools. It balances two intentional modes:
- **Diurnal (Light Mode):** A 60-30-10 warm-beige parchment canvas with deep charcoal typography and vibrant teal/gold accents.
- **Nocturnal (Dark Mode):** An OLED-optimized pitch black canvas (`#000000`) with glowing electric teal (`hsl(180, 100%, 45%)`) and amber gold accents.
- **Interactive Roadmap Layer:** Neo-brutalist infographic styling with hard high-contrast borders (`2px solid #000`), vivid yellow/blue cards, and strict 90-degree connecting lines.

---

## 2. Color Palette & Semantic Tokens

### 2.1 Diurnal (Light Mode) Tokens
| Token | HSL / CSS Value | Semantic Role |
| :--- | :--- | :--- |
| `--background` | `36 28% 95%` | Primary canvas parchment base (60%) |
| `--surface` | `36 24% 93%` | Subtle container surface elevation |
| `--card` | `30 25% 99%` | Elevated cards, dialogs, and popovers (30%) |
| `--foreground` | `0 0% 0%` | Highest-contrast primary text |
| `--muted-foreground` | `0 0% 20%` | Secondary body text and metadata |
| `--primary` | `174 84% 32%` | Deep Emerald Teal primary interactive brand color (10%) |
| `--primary-foreground` | `0 0% 100%` | Pure white text on primary fills |
| `--accent` | `38 92% 50%` | Warm Amber Gold highlight and secondary badges |
| `--border` / `--input` | `36 15% 88%` | Subtle parchment borders |
| `--ring` | `174 84% 32%` | Accessible high-contrast focus rings |

### 2.2 Nocturnal (Dark Mode) Tokens
| Token | HSL / CSS Value | Semantic Role |
| :--- | :--- | :--- |
| `--background` | `0 0% 0%` | OLED pure pitch black |
| `--surface` | `0 0% 3%` | Dark elevated panel surface |
| `--card` | `0 0% 3%` | Cards and menus |
| `--foreground` | `0 0% 98%` | Crisp off-white text |
| `--muted-foreground` | `0 0% 60%` | Mid-gray subtitles and hints |
| `--primary` | `180 100% 45%` | Electric Cyan / Teal glow |
| `--primary-foreground` | `0 0% 0%` | Black text on bright primary fills |
| `--accent` | `45 100% 55%` | Luminous amber gold |
| `--border` / `--input` | `0 0% 12%` | Deep slate structural borders |
| `--ring` | `180 100% 45%` | Cyan keyboard focus indicator |

### 2.3 Neo-Brutalist Roadmap Tokens
| Token | Hex / HSL | Usage |
| :--- | :--- | :--- |
| `--rm-topic-bg` | `#FEF015` (`54 99% 54%`) | Core learning topic card background |
| `--rm-topic-border` | `#000000` | Heavy 2px solid card border |
| `--rm-subtopic-bg` | `hsl(58, 100%, 88%)` | Ancillary subtopic card background |
| `--rm-edge` | `hsl(217, 91%, 60%)` | Smooth-step roadmap interconnecting line |
| Topic Hard Shadow | `4px 4px 0px #000` | Unmistakable neo-brutalist physical elevation |

---

## 3. Typography Hierarchy

The typography stack utilizes three complementary font families:

```
Headings & Editorial Emphasis : Playfair Display (Serif)
User Interface & Body Copy    : Quicksand / System Sans-Serif
Code, Terminals, & Tokens     : Inconsolata / Fira Code (Monospace)
```

| Element | Size / Line Height | Weight | Font Family | Styling Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Display H1** | `48px` / `1.15` (mobile: `36px`) | Extrabold (`800`) | Sans + Serif Accents | Gradient clipped text with italicized serif highlights |
| **Section H2** | `30px` / `1.25` | Bold (`700`) | Sans | Accompanied by themed Lucide icon and border accent |
| **Card H3** | `20px` / `1.35` | SemiBold (`600`) | Sans | High legibility on dark and light surfaces |
| **Body Large** | `18px` / `1.6` | Regular (`400`) | Sans | Hero leads and intro paragraphs |
| **Body Regular** | `15px` / `1.6` | Regular (`400`) | Sans | Standard markdown and tutorial text |
| **Code Inline** | `13.5px` / `1.4` | Medium (`500`) | Mono | Rounded pill badge with background contrast |
| **Code Block** | `13.5px` / `1.5` | Regular (`400`) | Mono | Syntax-highlighted container with copy action |

---

## 4. Spacing Scale, Containers, & Breakpoints

### 4.1 Responsive Breakpoints
- **Mobile (`sm`):** `640px` (single column layout, drawer navigation)
- **Tablet (`md`):** `768px` (two column cards, expanded topbar)
- **Desktop (`lg`):** `1024px` (three column grids, side navigation)
- **Wide (`xl`):** `1280px` (four column roadmaps, max container reading layout)
- **Ultra (`2xl`):** `1536px`

### 4.2 Layout Containers
- Standard Page Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Article / Reading Width: `max-w-4xl mx-auto` (optimal line length ~65-75 characters)
- Sidebar Syllabus Layout: `280px` sticky sidebar + flexible content viewport

---

## 5. Component Standards (Radix + Shadcn)

### 5.1 Buttons
- **Primary:** Filled with `--primary`, slight elevation, hover translation (`hover:-translate-y-0.5 transition-all`).
- **Outline:** Transparent fill with `border border-border/60 hover:border-primary/50`.
- **Ghost:** Zero border, subtle background fill on hover (`hover:bg-primary/10`).
- **Accessible Focus:** `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none`.

### 5.2 Cards & Surfaces
- Standard Card: `bg-card border border-border/50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300`.
- Roadmap Topic Node: Neo-brutalist `border-2 border-black shadow-[4px_4px_0px_#000] hover:scale-102`.

### 5.3 Modals & Drawers (`Sheet`)
- Slides from viewport right side with backdrop blur overlay.
- Accessible dismiss button (`Esc` key binding, backdrop click, explicit close icon).
- Auto-focus trapping and scroll locking while open.

---

## 6. Interaction & Animation Principles

1. **Micro-interactions:** Subtle, purposeful hover transitions (150ms-300ms ease-out). No excessive spinning or distracting parallax.
2. **Reduced Motion Compliance:** Respect `@media (prefers-reduced-motion: reduce)` by disabling smooth transforms for sensitive users.
3. **Active States:** Clear visual feedback on click and keyboard focus.

