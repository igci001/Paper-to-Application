const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");

const gridSize = 20;
let rows, cols;

let snake = [{ x: 5, y: 5 }];
let direction = { x: 0, y: -1 };
let apple;
let score = 0;
let level = 1;
let interval;
let speed = 150;
let currentSkin = "🐍";
let soundEnabled = true;

// Fallback-Sounds (CORS-fähig)
const eatSound = new Audio("https://actions.google.com/sounds/v1/cartoon/pop.ogg");
const gameOverSound = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");

eatSound.volume = 0.4;
gameOverSound.volume = 0.4;

document.querySelector(".sidebar:nth-child(3) div:first-child").addEventListener("click", () => {
    currentSkin = currentSkin === "🐍" ? "🐉" : "🐍";
});

document.querySelector(".sidebar:nth-child(3) div:last-child").addEventListener("click", () => {
    soundEnabled = !soundEnabled;
});

function setupGame() {
    rows = Math.floor(gameArea.clientHeight / gridSize);
    cols = Math.floor(gameArea.clientWidth / gridSize);
    apple = spawnApple();
    clearInterval(interval);
    interval = setInterval(gameLoop, speed);
    draw();
}

function gameLoop() {
    const newHead = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y,
    };

    if (
        newHead.x < 0 ||
        newHead.y < 0 ||
        newHead.x >= cols ||
        newHead.y >= rows ||
        snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)
    ) {
        return gameOver();
    }

    snake.unshift(newHead);

    if (newHead.x === apple.x && newHead.y === apple.y) {
        score++;
        scoreDisplay.textContent = score;
        if (soundEnabled) eatSound.play();
        if (score % 5 === 0) levelUp();
        apple = spawnApple();
    } else {
        snake.pop();
    }

    draw();
}

function draw() {
    gameArea.innerHTML = "";

    snake.forEach((segment, index) => {
        const el = document.createElement("div");
        el.classList.add("snake-segment");
        el.style.left = `${segment.x * gridSize}px`;
        el.style.top = `${segment.y * gridSize}px`;
        if (index === 0) {
            el.classList.add("snake-head");
            el.textContent = currentSkin;
        }
        gameArea.appendChild(el);
    });

    const appleEl = document.createElement("div");
    appleEl.className = "apple";
    appleEl.style.left = `${apple.x * gridSize}px`;
    appleEl.style.top = `${apple.y * gridSize}px`;
    appleEl.textContent = "🍎";
    gameArea.appendChild(appleEl);
}

function spawnApple() {
    let pos;
    do {
        pos = {
            x: Math.floor(Math.random() * cols),
            y: Math.floor(Math.random() * rows),
        };
    } while (snake.some(seg => seg.x === pos.x && seg.y === pos.y));
    return pos;
}

function gameOver() {
    clearInterval(interval);
    if (soundEnabled) gameOverSound.play();
    const over = document.createElement("div");
    over.className = "game-over";
    over.textContent = "Game Over";
    gameArea.appendChild(over);

    if (score > +localStorage.getItem("highScore")) {
        localStorage.setItem("highScore", score);
    }
    highScoreDisplay.textContent = localStorage.getItem("highScore") || 0;
}

function levelUp() {
    level++;
    speed = Math.max(50, speed - 10);
    clearInterval(interval);
    interval = setInterval(gameLoop, speed);
}

window.addEventListener("keydown", e => {
    const key = e.key;
    if (key === "ArrowUp" && direction.y !== 1) direction = { x: 0, y: -1 };
    else if (key === "ArrowDown" && direction.y !== -1) direction = { x: 0, y: 1 };
    else if (key === "ArrowLeft" && direction.x !== 1) direction = { x: -1, y: 0 };
    else if (key === "ArrowRight" && direction.x !== -1) direction = { x: 1, y: 0 };
});

let startX = 0;
let startY = 0;
gameArea.addEventListener("touchstart", e => {
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
});

gameArea.addEventListener("touchmove", e => {
    if (!startX || !startY) return;
    const touch = e.touches[0];
    const diffX = touch.clientX - startX;
    const diffY = touch.clientY - startY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0 && direction.x !== -1) direction = { x: 1, y: 0 };
        else if (diffX < 0 && direction.x !== 1) direction = { x: -1, y: 0 };
    } else {
        if (diffY > 0 && direction.y !== -1) direction = { x: 0, y: 1 };
        else if (diffY < 0 && direction.y !== 1) direction = { x: 0, y: -1 };
    }
    startX = 0;
    startY = 0;
});

highScoreDisplay.textContent = localStorage.getItem("highScore") || 0;
setupGame();
