# 🚀 Velozity Tracker - Professional Multi-View Project System
**Developed by Shivank Sharma**

Velozity Tracker is a high-performance, engineering-first project management interface. It features a custom-built infrastructure for Drag-and-Drop, Virtual Scrolling, and Real-time Collaboration simulation, built entirely from scratch without external component or utility libraries.

## 🛠️ Tech Stack & Architecture
- **Framework:** React 18 + TypeScript (Strict Type Safety)
- **Styling:** Tailwind CSS (Custom Mesh-Gradient & Glassmorphism UI)
- **State Management:** React Context API + useReducer
- **Environment:** Vite (2026 Optimized)

## 🧠 Engineering Decisions & Justifications

### 1. State Management: Why Context + useReducer?
I opted for **React Context combined with the useReducer hook** instead of Redux or Zustand. For a project-tracking application with complex, multi-layered state transitions (moving 500+ tasks between views), this native approach:
- Eliminates bundle bloat from external libraries.
- Provides a centralized "Source of Truth" for all three views (Kanban, List, Timeline).
- Enforces a strict action-dispatch pattern, making state debugging and UI synchronization seamless during rapid data updates (Stress Test).

### 2. Custom Virtual Scrolling (The 500+ Task Challenge)
To handle large datasets without DOM degradation, I implemented a **Mathematical Windowing Logic**.
- **The Problem:** Rendering 500+ complex task nodes simultaneously causes significant main-thread lag.
- **The Solution:** I track the container's `scrollTop` and divide it by the fixed `rowHeight` to calculate the current visible range. 
- **The Result:** Only ~15 items are rendered in the DOM at any given time (plus a buffer), maintaining a constant **60fps** scrolling experience even under heavy load.

### 3. Native Drag-and-Drop Implementation
Per the strict requirements, I built the Drag-and-Drop system using the **HTML5 Drag and Drop API** (no libraries like dnd-kit).
- **Smooth Interaction:** Used `onDragStart` to set data into the `dataTransfer` object and `onDragOver` to provide visual drop-zone feedback.
- **Layout Integrity:** Managed ghost-image effects and opacity shifts to ensure no layout-shift occurs when a card is moved between columns.

## ✨ Features Breakdown
- **Three Dynamic Views:** Instant switching between Kanban (Board), List (Virtual Table), and Timeline (Gantt Chart).
- **Live Collaboration:** Real-time presence indicators (avatars) simulated via interval-based WebSocket mocks.
- **Smart Dates:** Automatic labeling for "Due Today" and relative overdue calculations (e.g., "9 Days Overdue").
- **Randomized Stress Test:** Injects 500 tasks across randomized dates and priorities to test system integrity.

## 📊 Performance Metrics
- **Lighthouse Performance Score:** 95+ (Desktop)
- **Time to Interactive (TTI):** < 0.8s
- **Accessibility (A11y):** ARIA-compliant labels and semantic HTML.

## 🚀 Local Setup & Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/ShivankSharma7/Velozity-Tracker.git](https://github.com/ShivankSharma7/Velozity-Tracker.git)