# SecureVault Dashboard

A high-performance, modern "File Explorer" UI built for SecureVault Inc. to manage deeply nested legal and financial documents with a cyber-secure aesthetic.

**Live Demo:** [https://securevault-navy-one.vercel.app](https://securevault-navy-one.vercel.app)

**Design File:** *(Figma)*

---

##  Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/NIYITUGENERA/securevault.git
   cd securevault
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

##  Design System

**Aesthetic:** Cyber-secure, precise, and fast — built in Dark Mode.

**Color Palette:**
| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#050505` | App background |
| `--foreground` | `#ffffff` | Primary text |
| `--surface` | `#111111` | Card/panel surfaces |
| `--surface-hover` | `#1a1a1a` | Hover states |
| `--accent` | `#00bcd4` | Cyan — folders, highlights |

**Typography:** Clean sans-serif with monospace accents for system IDs and metadata.

**Spacing:** 8px base grid  consistent padding and margin scale throughout.

**Component States:** Default, Hover, Selected, Focused  all defined per component.

---

##  Recursive Strategy

The core of this application is a fully recursive `FileTree` component that renders the folder/file structure from `data.json`.

**How it works:**
- Each node in the JSON is passed to a `TreeNode` component
- If the node has `children`, it renders itself recursively
- Expand/collapse state is managed locally per node using `useState`
- There is no depth limit  the component handles 2 levels or 20 levels identically without breaking the UI

**Why this approach:**
- Mirrors the natural tree structure of the data
- Keeps each node self-contained and independently expandable
- Scales to any depth without performance degradation

---

## Wildcard Feature  Live Search & Filter

**Feature:** A real-time search bar that filters the entire file tree as you type.

**Why I chose this:**
Legal and financial professionals deal with hundreds of deeply nested files. Manually expanding folders to find a specific document is inefficient and frustrating. A live search that automatically expands matching folders saves significant time and directly improves productivity.

**How it adds business value:**
- Reduces time-to-file from minutes to seconds
- Eliminates the need to remember exact folder paths
- Matching items deep inside collapsed folders are automatically revealed
- Improves user satisfaction and reduces support requests

---

##  Keyboard Accessibility

Full keyboard navigation is supported:
- **↑ / ↓** = Move focus between visible items
- **→** = Expand a folder
- **←** = Collapse a folder
- **Enter** = Select a file

---

##  Tech Stack

- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS (custom component architecture  no component libraries)
- **Data:** Local `data.json` file
- **Deployment:** Vercel

> ⚠️ No Bootstrap, Material UI, Chakra UI, or Ant Design was used. All components were built from scratch.

---

## Author

**Emmanuel NIYITUGENERA**
GitHub: [@NIYITUGENERA](https://github.com/NIYITUGENERA)