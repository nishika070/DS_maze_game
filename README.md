# Maze Game (Data Structures Project)

## 🎮 Project Overview  
This is a browser-based maze game implemented using C++ for the logic and HTML / CSS / JavaScript (with Tailwind) for the frontend.  
It demonstrates:  
- Generating random mazes of varying sizes (7×7, 15×15, etc.)  
- Player movement via keyboard (W / A / S / D)  
- Auto-solver (uses BFS) that can solve the maze automatically  
- Scoring: fewer moves + quicker time = higher rating  
- Difficulty levels and “Generate Maze” / “Solve” / “Play Level” menu options  

## 🧠 Why C++ + Web  
The maze logic (generation, path‐finding) is written in C++ (for data-structures learning) and compiled to WebAssembly so the browser UI can use it — combining strong algorithmic foundations with modern UI.

## 🗂️ Project Structure  
/DS_maze_game
├── maze.cpp ← C++ logic for maze generation & solving
├── maze-web/ ← Frontend files
│ ├── index.html
│ ├── menu.html ← Menu page (Generate / Solve / Play)
│ ├── difficulty.html ← Choose Easy / Medium / Hard
│ ├── play.js ← Main game logic tying C++ <→ JS UI
│ ├── style.css
│ └── …
└── README.md

## 🏁 How to Run (Local Development)  
1. Clone or download this repository.  
2. **Install Emscripten SDK** (required only once):
   ```bash
   cd path/to/emsdk
   ./emsdk install latest  
   ./emsdk activate latest  
   ./emsdk_env.bat
 3.  emcc maze.cpp -O3 -s WASM=1 -s EXPORTED_FUNCTIONS='["_move_from"]' -s EXPORTED_RUNTIME_METHODS='["cwrap"]' -o maze.js
 4. Copy the generated maze.js (and maze.wasm) into the maze-web/ folder.

 5. Open the menu.html in a browser (or serve via a simple HTTP server).

 6. Use the menu to Generate Maze, Play Level, or Auto-Solve.

📌 Features

Generate Maze: Creates a new maze randomly with no manual path.

Play Level: Choose difficulty (Easy / Medium / Hard) and play.

Auto-Solve: Let the computer solve the maze, with animated path.

Score & Timer: Track number of moves and elapsed time; compare to optimal path.

Responsive UI: Maze grid scales based on size, styled with Tailwind + custom CSS.


👤 Author

Developed by Nishika |Anika | yuvika | palak (CSE / Data Structures Project).
GitHub: nishika070
