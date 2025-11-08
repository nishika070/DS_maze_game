let time = 0;
let timerInterval = null;
let skin = "🙂";
let moves = 0;
let optimalMoves = 0;

let N = getSize();
let maze = Array.from({ length: N }, () => Array(N).fill('#'));
let px = 1, py = 1;

// ---------------- Timer ----------------
function startTimer() {
  clearInterval(timerInterval);
  time = 0;
  document.getElementById("timer").textContent = time;
  timerInterval = setInterval(() => {
    time++;
    document.getElementById("timer").textContent = time;
  }, 1000);
}

function getSize() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get("size") || 7);
}

// ---------------- Maze Generation ----------------
function generateMaze() {
  function carve(x, y) {
    let dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    dirs.sort(() => Math.random() - 0.5);
    for (let [dx, dy] of dirs) {
      let nx = x + dx * 2, ny = y + dy * 2;
      if (nx > 0 && ny > 0 && nx < N-1 && ny < N-1 && maze[nx][ny] === '#') {
        maze[x + dx][y + dy] = '.';
        maze[nx][ny] = '.';
        carve(nx, ny);
      }
    }
  }

  let startX = 1, startY = 1;
  if (N >= 15) {
    startX = Math.floor(Math.random() * (N/3)) * 2 + 1;
    startY = Math.floor(Math.random() * (N/3)) * 2 + 1;
  }

  maze[startX][startY] = '.';
  carve(startX, startY);
  maze[N-2][N-2] = 'E';
}
generateMaze();

// ---------------- Optimal Path (Precomputed BFS) ----------------
function computeOptimalPath() {
  let queue = [{ x: 1, y: 1, path: [] }];
  let visited = new Set();

  while (queue.length) {
    let { x, y, path } = queue.shift();
    if (maze[x][y] === 'E') {
      optimalMoves = path.length + 1;
      return;
    }
    for (let [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      let nx = x + dx, ny = y + dy;
      if (maze[nx][ny] !== '#' && !visited.has(nx + "," + ny)) {
        visited.add(nx + "," + ny);
        queue.push({ x: nx, y: ny, path: [...path, { x, y }] });
      }
    }
  }
}
computeOptimalPath();

// ---------------- Draw Maze ----------------
function draw(path = []) {
  let mazeDiv = document.getElementById("maze");
  let cellSize = Math.floor(420 / N);
  mazeDiv.style.gridTemplateColumns = `repeat(${N}, ${cellSize}px)`;
  mazeDiv.innerHTML = "";

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      let c = document.createElement("div");
      c.classList.add("cell");
      c.style.width = cellSize + "px";
      c.style.height = cellSize + "px";

      if (path.some(p => p.x === i && p.y === j)) c.style.background = "yellow";
      else if (i === px && j === py) c.classList.add("player"), c.textContent = skin;
      else if (maze[i][j] === '#') c.classList.add("wall");
      else if (maze[i][j] === 'E') c.classList.add("goal");
      else c.classList.add("path");

      mazeDiv.appendChild(c);
    }
  }

  document.getElementById("moves").textContent = moves;
}

// ---------------- Check Win ----------------
function checkWin() {
  if (maze[px][py] === 'E') {
    clearInterval(timerInterval);
    let stars = getStars(moves, optimalMoves);
    setTimeout(() => {
      alert(`🎉 You Win!\nMoves: ${moves}\nOptimal: ${optimalMoves}\nRating: ${stars}`);
    }, 150);
  }
}

// ---------------- Movement ----------------
document.addEventListener("keydown", (e) => {
  let k = e.key.toLowerCase();
  let nx = px, ny = py;
  if (k === 'w') nx--;
  if (k === 's') nx++;
  if (k === 'a') ny--;
  if (k === 'd') ny++;

  if (maze[nx][ny] !== '#') {
    px = nx; py = ny; moves++; draw();
    checkWin();
  }
});

// ---------------- Auto Solve ----------------
document.getElementById("solveBtn").addEventListener("click", () => {
  moves = 0;
  px = 1; py = 1;
  draw();
  startTimer();
  solveMaze();
});

function solveMaze() {
  let queue = [{ x: 1, y: 1, path: [] }];
  let visited = new Set();

  while (queue.length) {
    let { x, y, path } = queue.shift();
    if (maze[x][y] === 'E') { animatePath([...path, { x, y }]); return; }

    for (let [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      let nx = x + dx, ny = y + dy;
      if (maze[nx][ny] !== '#' && !visited.has(nx + "," + ny)) {
        visited.add(nx + "," + ny);
        queue.push({ x: nx, y: ny, path: [...path, { x, y }] });
      }
    }
  }
}

function animatePath(path) {
  let i = 0;
  let timer = setInterval(() => {
    if (i < path.length) {
      px = path[i].x; py = path[i].y;
      moves++; draw(path.slice(0, i));
      i++;
    } else {
      clearInterval(timer);
      alert(`🤖 Auto Solved!\nOptimal Path = ${path.length} moves`);
    }
  }, 140);
}

// ---------------- Skin ----------------
function changeSkin(s) {
  skin = s;
  document.getElementById("skin").textContent = s;
  draw();
}

// ---------------- Star Rating ----------------
function getStars(m, best) {
  if (m <= best) return "⭐⭐⭐⭐⭐";
  if (m <= best * 1.2) return "⭐⭐⭐⭐";
  if (m <= best * 1.5) return "⭐⭐⭐";
  return "⭐⭐";
}

// ---------------- Start Game ----------------
draw();
startTimer();
