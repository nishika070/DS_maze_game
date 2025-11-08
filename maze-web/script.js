let playerX = 1;
let playerY = 1;

let move_from; // C++ function reference

// Draw maze UI
function drawMaze() {
  const mazeDiv = document.getElementById("maze");
  mazeDiv.innerHTML = "";

  let mazeLayout = [
    "#######",
    "#...#.#",
    "#.#.#.#",
    "#.#...#",
    "#.###.#",
    "#...#.E",
    "#######"
  ];

  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");

      if (i === playerX && j === playerY) {
        cell.classList.add("player");
        cell.textContent = "🙂";
      }
      else if (mazeLayout[i][j] === '#') {
        cell.classList.add("wall");
      }
      else if (mazeLayout[i][j] === 'E') {
        cell.classList.add("goal");
        cell.textContent = "🚩";
      }
      else {
        cell.classList.add("path");
      }

      mazeDiv.appendChild(cell);
    }
  }
}


// Wait until C++ WebAssembly is loaded
Module.onRuntimeInitialized = () => {

  // Link JavaScript to C++ function
  move_from = Module.cwrap("move_from", "number", ["number", "number", "number"]);

  drawMaze();

  // Movement handler
  document.addEventListener("keydown", (e) => {
    const k = e.key.toLowerCase();
    if (!"wasd".includes(k)) return;

    const code = k.charCodeAt(0);

    const result = move_from(playerX, playerY, code);

    if (result >= 1000) {
      const packed = result - 1000;
      playerX = Math.floor(packed / 100);
      playerY = packed % 100;
      drawMaze();
      setTimeout(() => alert("🎉 YOU WIN 🎉"), 10);
    }
    else if (result !== -1) {
      const nx = Math.floor(result / 100);
      const ny = result % 100;
      playerX = nx;
      playerY = ny;
      drawMaze();
    }
  });
};
