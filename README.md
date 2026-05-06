# AI Study Planner Co-Evolution

AI Study Planner Co-Evolution is a smart learning system designed to optimize academic productivity through advanced data structures and algorithms. It features a human-algorithm co-evolutionary approach to manage subject dependencies, prioritize tasks, and monitor focus in real-time.

## 🚀 Features

### 1. Subject Dependency Management (DAGs)
- **Algorithm**: Directed Acyclic Graphs (DAG).
- **Functionality**: Visualize subject prerequisites and determine the optimal learning path using **Topological Sorting**.
- **User Interaction**: Dynamically add subjects and their dependencies to see a structured study roadmap.

### 2. Task Flow Planner (Priority Queues)
- **Algorithm**: Max-Heap based Priority Queue.
- **Functionality**: Automatically prioritizes tasks based on a composite score of **Importance** and **Deadline Proximity**.
- **User Interaction**: Add tasks with deadlines and importance levels to receive a sorted list of what to work on next.

### 3. Focus Monitor (Sliding Window)
- **Algorithm**: Sliding Window Technique.
- **Functionality**: Tracks real-time concentration levels by monitoring user activity (keyboard, mouse, and tab visibility) within a 30-second sliding window.
- **Micro-interventions**: Provides warnings and enforced breaks ("Blackout mode") when focus drops below a threshold.

## 🛠️ Technology Stack
- **Structure**: HTML5 Semantic Elements.
- **Logic**: Vanilla JavaScript (ES6+).
- **Styling**: CSS3 with modern UI patterns (Gradients, Glassmorphism).
- **Visualization**: [vis-network](https://visjs.github.io/vis-network/docs/network/) for graph rendering.

## 📦 Setup & Usage
1. Clone the repository:
   ```bash
   git clone https://github.com/Prakeya/AI-Study-Planner.git
   ```
2. Open `index.html` in any modern web browser.
3. Navigate between the **Directed Acyclic Graphs**, **Focus Monitor**, and **Task Flow Planner** modules.

## 👨‍💻 Team
- **Team 17 AIE A** - Adaptive AI Study Planner with Human-Algorithm Co-evolution.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
