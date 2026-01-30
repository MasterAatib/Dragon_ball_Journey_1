let jumpPressed = false;

window.addEventListener("keydown", e => {
  if (e.code === "Space") jumpPressed = true;
});

window.addEventListener("keyup", e => {
  if (e.code === "Space") jumpPressed = false;
});

document.getElementById("jumpBtn").onclick = () => {
  jumpPressed = true;
  setTimeout(() => jumpPressed = false, 120);
};
document.getElementById("startBtn").onclick = () => {
  resetGame();
  gameState = PLAYING;
  showScreen("");
};

document.getElementById("retryBtn").onclick =
document.getElementById("retryBtn2").onclick = () => {
  resetGame();
  gameState = PLAYING;
  showScreen("");
};

document.getElementById("homeBtn1").onclick =
document.getElementById("homeBtn2").onclick = () => {
  gameState = MENU;
  showScreen("menu");
};