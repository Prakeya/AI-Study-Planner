# Adaptive AI Study Planner with Human-Algorithm Co-evolution
### A browser-based study system that watches how you work and adapts to keep you focused.

---

## Overview

Most study planners use fixed schedules and simple reminders. They cannot detect when you're distracted or dynamically adjust what you should study next — leading to poor productivity and inefficient learning order.

This project solves that by building a three-module adaptive system that monitors real-time focus using behavioral biometrics, organises subjects by prerequisite relationships, and ranks tasks by urgency and importance — all running in the browser with no backend required.

---

## The Problem

- Fixed schedules don't adapt to how a student actually behaves
- No way to detect distraction or inactivity in real time
- Subject prerequisites are ignored — students study in the wrong order
- Task prioritisation is manual and error-prone

---

## Modules

### 1. Focus Monitor — Sliding Window (Deque)

Tracks real-time concentration by monitoring three signals: **keyboard activity**, **mouse movement** (throttled to once/second), and **tab visibility changes**. Each event's timestamp is stored in a deque; events older than 30 seconds are pruned continuously via `cleanDeque()`.

**Focus Score (0–10)** is derived from the event count in the active window:
- High typing + mouse activity → higher score
- Tab switching or inactivity → lower score
- Tab inactive penalty: `events = Math.max(0, events - 3)`

**Intervention system:**
- No activity for 6 seconds → floating "Stay Focused" warning with countdown
- Continued inactivity → full-screen **Blackout mode** (blocks all interaction)
- After blackout → break suggestion popup: 5-minute break or continue

**Time complexity:** O(n) — front removal (shift) dominates

---

### 2. Subject Dependency Manager — DAG + Kahn's Algorithm

Builds a **Directed Acyclic Graph** from user-entered subject-prerequisite pairs in the format:
Subject : prereq1, prereq2

**Under the hood:**
- Adjacency list + reverse adjacency list for graph traversal
- **DFS** for cycle detection (invalid course structures rejected)
- **Kahn's Algorithm** for topological sorting (generates valid study order)
- Indegree calculation determines which subjects unlock next

**UI behaviour:**
- Nodes are colour-coded: Grey = Locked · Green = Unlocked · Blue = Completed
- Click a node to mark it complete — prerequisites must be finished first
- Graph refreshes instantly; progress resets cleanly

**Time complexity:** O(V + E) — each vertex and edge processed once

---

### 3. Task Flow Planner — Priority Queue (Max-Heap)

Ranks tasks using a **multi-criteria priority score** combining deadline urgency and importance level (1–5):
- Earlier deadline → higher priority
- Higher importance → higher priority
- Tie on deadline → compare importance

Tasks are stored in a **Binary Heap** — insert and remove both run at O(n log n). The list auto-sorts on every addition; a live countdown shows time remaining to each deadline.

**Time complexity:** O(n log n) — sorting dominates

---

## Complexity Summary

| Module | Data Structure | Time Complexity |
|---|---|---|
| Focus Monitor | Array (Deque) | O(n) |
| Subject DAG | Adjacency List + Queue + Set | O(V + E) |
| Task Planner | Array + Sorting | O(n log n) |

---

## Tech Stack

| Layer | Tool |
|---|---|
| Structure | HTML5 |
| Logic | Vanilla JavaScript (ES6+) |
| Styling | CSS3 — Gradients, Glassmorphism |
| Graph Rendering | vis-network |

---

## Setup

```bash
git clone https://github.com/HarshiniSreeS/Study-Planner-for-DSA-and-UID-project.git
```

Open `index.html` in any modern browser. No installation required.

Navigate between the **Focus Monitor**, **Subject DAG**, and **Task Flow Planner** tabs from the main interface.

**Live demo:** [harshinisrees.github.io/Study-Planner-for-DSA-and-UID-project](https://harshinisrees.github.io/Study-Plannerfor-DSA-and-UID-project/)

---

## References

1. D. Kahneman, *Thinking, Fast and Slow* (2011)
2. C. Newport, *Deep Work* (2016)
3. R. S. Sutton & A. G. Barto, *Reinforcement Learning* (2018)
4. J. Han et al., "Sliding Window Techniques," *IEEE TKDE* (2011)
5. T. H. Cormen et al., *Introduction to Algorithms* — MIT Press
6. G. Holzinger, "Human-in-the-Loop ML," *IEEE Intelligent Systems* (2016)

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

## Team

**Prakeya S · Harshini Sree · Thiyaanesh N R · Yuvanidhi R**
Team 17 AIE-A · Amrita Vishwa Vidyapeetham

*Developed as part of the Data Structures & Algorithms and User Interface Design curriculum.*
