
const snakeArea = document.getElementById("snakeArea");
const scoreDisplay = document.getElementById("score");
const highscoreDisplay = document.getElementById("highscore");
const finalScoreDisplay = document.getElementById("finalScore");
const finalHighscoreDisplay = document.getElementById("finalHighscore");

const startMenu = document.getElementById("startMenu");
const sizeSelection = document.getElementById("sizeSelection");
const gameOverScreen = document.getElementById("gameOverScreen");
const shop = document.getElementById("shop");

const snakeColors = document.getElementById("snakeColors");
const fruitColors = document.getElementById("fruitColors");

let gridSize = 20;
let rows = 30;
let cols = 30;
let snake = [];
let direction = { x: 1, y: 0 };
let fruit = {};
let score = 0;
let highscore = 0;
let interval;
let gamePaused = false;
let selectedSnakeColor = "green";
let selectedFruitColor = "red";

const unlocks = {
  snake: [
    { color: "green", unlocked: true },
    { color: "yellow", unlockScore: 5 },
    { color: "blue", unlockScore: 10 },
    { color: "purple", unlockScore: 15 },
    { color: "black", unlockScore: 20 }
  ],
  fruit: [
    { color: "red", unlocked: true },
    { color: "orange", unlockScore: 5 },
    { color: "pink", unlockScore: 10 },
    { color: "cyan", unlockScore: 15 },
    { color: "lime", unlockScore: 20 }
  ]
};

function showSizeSelection() {
  startMenu.style.display = "none";
  gameOverScreen.style.display = "none";
  shop.style.display = "none";
  sizeSelection.style.display = "flex";
}

function startGame(size) {
  clearInterval(interval);
  sizeSelection.style.display = "none";
  gridSize = Math.floor(600 / size);
  rows = size;
  cols = size;
  snakeArea.style.gridTemplateRows = `repeat(${rows}, ${gridSize}px)`;
  snakeArea.style.gridTemplateColumns = `repeat(${cols}, ${gridSize}px)`;
  snakeArea.style.width = `${cols * gridSize}px`;
  snakeArea.style.height = `${rows * gridSize}px`;
  snake = [{ x: Math.floor(cols / 2), y: Math.floor(rows / 2) }];
  direction = { x: 1, y: 0 };
  score = 0;
  scoreDisplay.textContent = score;
  gamePaused = false;
  fruit = spawnFruit();
  draw();
  interval = setInterval(move, 150);
}

function restartGame() {
  startGame(cols);
}

function draw() {
  snakeArea.innerHTML = "";
  snake.forEach(seg => {
    const el = document.createElement("div");
    el.className = "snake-segment";
    el.style.backgroundColor = selectedSnakeColor;
    snakeArea.appendChild(el);
  });
  const fruitEl = document.createElement("div");
  fruitEl.className = "fruit";
  fruitEl.style.backgroundColor = selectedFruitColor;
  snakeArea.children[fruit.y * cols + fruit.x].appendChild(fruitEl);
  snake.forEach((seg, i) => {
    const index = seg.y * cols + seg.x;
    if (snakeArea.children[index]) {
      snakeArea.children[index].classList.add("snake-segment");
    }
  });
}

function move() {
  if (gamePaused) return;
  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  };
  if (
    head.x < 0 || head.y < 0 || head.x >= cols || head.y >= rows ||
    snake.some(seg => seg.x === head.x && seg.y === head.y)
  ) {
    gameOver();
    return;
  }
  snake.unshift(head);
  if (head.x === fruit.x && head.y === fruit.y) {
    score++;
    scoreDisplay.textContent = score;
    if (score > highscore) {
      highscore = score;
      highscoreDisplay.textContent = highscore;
    }
    fruit = spawnFruit();
  } else {
    snake.pop();
  }
  draw();
}

function spawnFruit() {
  let pos;
  do {
    pos = {
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows)
    };
  } while (snake.some(s => s.x === pos.x && s.y === pos.y));
  return pos;
}

function gameOver() {
  clearInterval(interval);
  finalScoreDisplay.textContent = score;
  finalHighscoreDisplay.textContent = highscore;
  gameOverScreen.style.display = "flex";
}

document.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowUp":
      if (direction.y !== 1) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y !== -1) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x !== 1) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x !== -1) direction = { x: 1, y: 0 };
      break;
  }
});

function openShop() {
  gamePaused = true;
  shop.style.display = "flex";
  sizeSelection.style.display = "none";
  startMenu.style.display = "none";
  gameOverScreen.style.display = "none";
  renderShop();
}

function closeShop() {
  shop.style.display = "none";
  gamePaused = false;
}

function renderShop() {
  snakeColors.innerHTML = "";
  fruitColors.innerHTML = "";

  unlocks.snake.forEach(item => {
    const el = document.createElement("div");
    el.className = "color-option";
    el.style.backgroundColor = item.color;
    if (!item.unlocked && highscore < item.unlockScore) {
      el.classList.add("locked");
    } else {
      el.onclick = () => {
        selectedSnakeColor = item.color;
        draw();
      };
    }
    snakeColors.appendChild(el);
  });

  unlocks.fruit.forEach(item => {
    const el = document.createElement("div");
    el.className = "color-option";
    el.style.backgroundColor = item.color;
    if (!item.unlocked && highscore < item.unlockScore) {
      el.classList.add("locked");
    } else {
      el.onclick = () => {
        selectedFruitColor = item.color;
        draw();
      };
    }
    fruitColors.appendChild(el);
  });
}
