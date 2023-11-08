const gameContainer = document.getElementById('game-container');
const paddleA = document.getElementById('paddleA');
const paddleB = document.getElementById('paddleB');
const ball = document.getElementById('ball');

const gameWidth = gameContainer.clientWidth;
const gameHeight = gameContainer.clientHeight;

let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

let paddleAY = gameHeight / 2 - paddleA.clientHeight / 2;
let paddleBY = gameHeight / 2 - paddleB.clientHeight / 2;
const paddleHeight = paddleA.clientHeight;

function updateGameArea() {
  // Move the ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Simple AI for the left paddle
  if (ballX < gameWidth / 2 && ballSpeedX < 0) {
    const paddleACenter = paddleAY + paddleHeight / 2;
    if (ballY < paddleACenter) {
      paddleAY -= 5;
    } else {
      paddleAY += 5;
    }
    paddleA.style.top = paddleAY + 'px';
  }

  // Check for collisions with top and bottom walls
  if (ballY < 0 || ballY > gameHeight - ball.clientHeight) {
    ballSpeedY = -ballSpeedY;
  }

  // Check for collisions with paddles
  if (
    (ballX <= 20 && ballY >= paddleAY && ballY <= paddleAY + paddleHeight) ||
    (ballX >= gameWidth - 20 - paddleB.clientWidth &&
      ballY >= paddleBY &&
      ballY <= paddleBY + paddleHeight)
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Check if the ball goes out of bounds
  if (ballX < 0 || ballX > gameWidth) {
    // Ball out of bounds, reset to center
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    ballSpeedX = -ballSpeedX;
  }

  // Update ball position
  ball.style.left = ballX + 'px';
  ball.style.top = ballY + 'px';
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowUp') {
    if (paddleBY > 0) {
      paddleBY -= 10;
      paddleB.style.top = paddleBY + 'px';
    }
  } else if (event.key === 'ArrowDown') {
    if (paddleBY + paddleHeight < gameHeight) {
      paddleBY += 10;
      paddleB.style.top = paddleBY + 'px';
    }
  }
});

setInterval(updateGameArea, 1000 / 60);
