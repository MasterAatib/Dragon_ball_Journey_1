const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

/* ================= IMAGES ================= */
const bg = new Image();
bg.src = "assets/background/sky.png";

const flagImg = new Image();
flagImg.src = "assets/ui/flag.png";

/* ================= GAME STATES ================= */
const MENU = 0;
const PLAYING = 1;
const GAME_OVER = 2;
const WIN = 3;

let gameState = MENU;

/* ================= WORLD ================= */
let player;
let obstacles = [];
let worldX = 0;

/* ================= LEVEL CONFIG ================= */
const LEVEL_END_X = 4000; // finish line world position
const SAFE_START_X = 400;
const FINISH_SAFE_DISTANCE = 300;

/* ================= OBSTACLE CONFIG ================= */
const OBSTACLE_COUNT = 12;
const OBSTACLE_MIN_GAP = 220;

/* ================= FINISH LINE ================= */
const finishLine = {
  x: LEVEL_END_X,
  y: 440,
  width: 128,
  height: 256,
  hitbox: {
    xOffset: 40,
    yOffset: 20,
    width: 50,
    height: 230
  }
};

/* ================= HELPERS ================= */
function worldToScreen(x) {
  return x - worldX + player.x;
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s =>
    s.classList.remove("active")
  );
  if (id) document.getElementById(id).classList.add("active");
}

/* ================= UI BUTTONS ================= */
document.getElementById("startBtn").onclick = () => {
  resetGame();
  gameState = PLAYING;
  showScreen(null);
};

document.getElementById("retryBtn").onclick =
document.getElementById("retryBtn2").onclick = () => {
  resetGame();
  gameState = PLAYING;
  showScreen(null);
};

document.getElementById("homeBtn1").onclick =
document.getElementById("homeBtn2").onclick = () => {
  gameState = MENU;
  showScreen("menu");
};

/* ================= RESET ================= */
function resetGame() {
  player = new Player();
  worldX = 0;
  generateObstacles();
}

/* ================= OBSTACLE GENERATION ================= */
function generateObstacles() {
  obstacles = [];
  let positions = [];

  const maxSpawnX = finishLine.x - FINISH_SAFE_DISTANCE;

  while (positions.length < OBSTACLE_COUNT) {
    const x =
      Math.random() * (maxSpawnX - SAFE_START_X) + SAFE_START_X;

    const tooClose = positions.some(
      px => Math.abs(px - x) < OBSTACLE_MIN_GAP
    );

    if (!tooClose) {
      positions.push(x);
      obstacles.push(new Obstacle(x));
    }
  }
}

/* ================= GAME LOOP ================= */
function gameLoop() {
  requestAnimationFrame(gameLoop);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  if (gameState !== PLAYING) return;

  /* ----- PLAYER ----- */
  player.update();
  player.draw(ctx);

  /* ----- OBSTACLES ----- */
  obstacles.forEach(o => {
    o.draw(ctx, worldX, player.x);

    const p = player.getHitbox();
    const h = o.getHitbox(worldX, player.x);

    if (
      p.x < h.x + h.width &&
      p.x + p.width > h.x &&
      p.y < h.y + h.height &&
      p.y + p.height > h.y
    ) {
      gameState = GAME_OVER;
      showScreen("gameOver");
    }
  });

  /* ----- FINISH LINE ----- */
  const flagScreenX = worldToScreen(finishLine.x);

  ctx.drawImage(
    flagImg,
    flagScreenX,
    finishLine.y,
    finishLine.width,
    finishLine.height
  );

  const p = player.getHitbox();
  const f = {
    x: flagScreenX + finishLine.hitbox.xOffset,
    y: finishLine.y + finishLine.hitbox.yOffset,
    width: finishLine.hitbox.width,
    height: finishLine.hitbox.height
  };

  if (
    p.x < f.x + f.width &&
    p.x + p.width > f.x &&
    p.y < f.y + f.height &&
    p.y + p.height > f.y
  ) {
    gameState = WIN;
    showScreen("win");
  }

  /* ----- WORLD MOVE ----- */
  worldX += 6;
}

/* ================= START ================= */
showScreen("menu");
gameLoop();