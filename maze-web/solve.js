let maze = [
  ['#','#','#','#','#','#','#'],
  ['#','.','.','.','#','.','#'],
  ['#','.','#','.','#','.','#'],
  ['#','.','#','.','.','.','#'],
  ['#','.','#','#','#','.','#'],
  ['#','.','.','.','#','.','E'],
  ['#','#','#','#','#','#','#']
];

let start = {x:1, y:1};
let goal = {x:5, y:6};

function drawMaze(path = []) {
  const mazeDiv = document.getElementById("maze");
  mazeDiv.innerHTML = "";
  mazeDiv.style.display = "grid";
  mazeDiv.style.gridTemplateColumns = "repeat(7, 48px)";
  mazeDiv.style.gap = "6px";

  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      let cell = document.createElement("div");
      cell.style.width = "48px";
      cell.style.height = "48px";
      cell.style.borderRadius = "8px";

      if (path.some(p => p.x === i && p.y === j))
        cell.style.background = "yellow";
      else if (i === start.x && j === start.y)
        cell.textContent = "🙂", cell.style.background = "#ff4b4b";
      else if (maze[i][j] === '#')
        cell.style.background = "#b91c1c";
    else if (maze[i][j] === 'E') {
  cell.textContent = "🚩";
  if (path.some(p => p.x === i && p.y === j)) {
    cell.style.background = "#6f2a2aff"; // red when solver reaches goal
  } else {
    cell.style.background = "gold"; // normal goal color
  }
}

      else
        cell.style.background = "#e5e7eb";

      mazeDiv.appendChild(cell);
    }
  }
}

function bfsSolve() {
  let queue = [{x:start.x, y:start.y, path:[]}];
  let visited = new Set();

  while(queue.length){
    let {x, y, path} = queue.shift();
  if (x === goal.x && y === goal.y) return [...path, {x, y}];


    for(let [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]){
      let nx = x+dx, ny = y+dy;
      if (maze[nx][ny] !== '#' && !visited.has(nx+","+ny)){
        visited.add(nx+","+ny);
        queue.push({x:nx, y:ny, path:[...path,{x:nx,y:ny}]});
      }
    }
  }
  return [];
}

let solution = bfsSolve();
let i = 0;

drawMaze();

setInterval(() => {
  if(i < solution.length){
    drawMaze(solution.slice(0,i));
    i++;
  }
}, 200);
