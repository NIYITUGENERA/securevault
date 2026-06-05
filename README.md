# SecureVault Dashboard

A high-performance, modern "File Explorer" UI built for SecureVault Inc. to manage deeply nested legal and financial documents.

## 🚀 Setup Instructions

1.  **Clone the repository** (if not already in it).
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run the development server**:
    ```bash
    npm run dev
    ```
4.  **Open the application**: Navigate to `http://localhost:3000` in your browser.

## 🎨 Design System

**Aesthetic**: Cyber-secure, precise, and fast (Dark Mode).
**Approach**: I employed a "Code-First" design system using Tailwind CSS and CSS Variables in `globals.css`. 
- **Colors**: Deep blacks (`#050505`), elevated surfaces (`#111111`), and an electric blue accent (`#00d1ff`).
- **Typography**: Clean, sans-serif stack (Geist) with monospace accents for system IDs.
- **Components**: Built from scratch using Tailwind for layout and component abstraction, ensuring no external UI libraries were used.

## 🌲 Recursive Strategy

The file explorer implements a **Recursive Component Pattern** via the `TreeItem` component. 
- **Data Structure**: The application consumes a nested JSON tree.
- **Rendering**: Each `TreeItem` checks if its node has children. If it does and is "expanded," it recursively renders another set of `TreeItem` components.
- **Depth Handling**: This strategy allows for infinite nesting depth while maintaining high performance and a clean DOM structure.
- **Expansion State**: Managed via a `Set` of folder IDs in the parent `FileExplorer` component for $O(1)$ lookups.

## ⌨️ Keyboard Accessibility

Power users can navigate the vault entirely via keyboard:
- **Up/Down Arrows**: Move focus between visible items.
- **Right Arrow**: Expand a folder.
- **Left Arrow**: Collapse a folder.
- **Enter**: Select an item (displays properties and workspace context).

## 🃏 Wildcard Feature: Breadcrumbs

**The Gap Identified**: In deeply nested structures, users often lose track of their absolute location within the hierarchy (contextual drift). While a tree view shows neighbors, it doesn't clearly show the "lineage" of a file at a glance.

**The Solution**: I implemented a dynamic **Breadcrumb Navigation** bar.
- **Value to Business**: It provides immediate orientation for legal professionals managing 10+ levels of nesting and allows for faster spatial reasoning within the vault.
- **Implementation**: A recursive path-finding algorithm calculates the exact lineage from the root to the selected item in real-time.

## ✨ Bonus Feature: Deep Search & Auto-Expand

- **Search**: A real-time filter that matches file and folder names.
- **Auto-Expand**: When a search match is found deep within a folder, the application automatically expands all parent folders to reveal the match, fulfilling the requirement for an intuitive search experience.

---
*Built with React, Next.js, and Tailwind CSS.*
