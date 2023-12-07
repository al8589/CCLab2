let bullets = [];
let enemies = [];
let score = 0;
let playerImage;
let enemyImage;
let totalEnemies = 15;
let gameOver = false;
let stoneImage;
let bgImage;
let nextButton; // Button to proceed to the next page

function preload() {
  enemyImage = loadImage('lib/images/titan.png');
  playerImage = loadImage('lib/images/slingshot.png');
  stoneImage = loadImage('lib/images/stone.png');
  bgImage = loadImage('lib/images/grassclearing.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  spawnEnemies(totalEnemies);
}

function draw() {
  image(bgImage, width / 2, height / 2, windowWidth, windowHeight);
  
  if (!gameOver) {
    updateBullets();
    updateEnemies();
    displayScore();
    drawPlayer(mouseX, height - 50);
  }

  // Hide the button if the game is not over
  if (nextButton && !gameOver) {
    nextButton.hide();
  }
}

function spawnEnemies(count) {
  for (let i = 0; i < count; i++) {
    let x = random(enemyImage.width / 2, width - enemyImage.width / 2);
    let y = random(-800, -enemyImage.height);
    enemies.push({ x, y });
  }
}

function updateBullets() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    let bullet = bullets[i];
    bullet.y -= 10;
    if (bullet.y < 0) {
      bullets.splice(i, 1);
    } else {
      image(stoneImage, bullet.x, bullet.y, stoneImage.width / 13, stoneImage.height / 13);
    }
  }
}

function updateEnemies() {
  for (let i = enemies.length - 1; i >= 0; i--) {
    let enemy = enemies[i];
    enemy.y += 2;
    if (enemy.y - enemyImage.height / 2 > height) {
      endGame("You Failed! Reload to try again.", false);
    } else {
      image(enemyImage, enemy.x, enemy.y, enemyImage.width / 3, enemyImage.height / 3);
    }

    for (let j = bullets.length - 1; j >= 0; j--) {
      let bullet = bullets[j];
      if (dist(enemy.x, enemy.y, bullet.x, bullet.y) < enemyImage.width / 20) {
        enemies.splice(i, 1);
        bullets.splice(j, 1);
        score++;
        if (score >= totalEnemies) {
          endGame("You made it!", true);
        }
        break;
      }
    }
  }
}

function drawPlayer(x, y) {
  image(playerImage, x, y, playerImage.width / 9, playerImage.height / 9);
}

function displayScore() {
  fill(255);
  textSize(20);
  text(`Score: ${score}`, 10, 30);
}

function mousePressed() {
  if (!gameOver) {
    bullets.push({ x: mouseX, y: height - 50 });
  }
}

function endGame(message, success) {
  textAlign(CENTER);
  textSize(32);
  fill(255);
  text(message, width / 2, height / 2 - 40);
  gameOver = true;
  noLoop();

  // Only create the button if the player has won
  if (success) {
    if (!nextButton) {
      nextButton = createButton('Home is just up front.');
      nextButton.position(width / 2 - nextButton.width / 2, height / 2 + 40);
      nextButton.mousePressed(() => window.location.href = 'page5.html'); // Change to your actual URL
    }
    nextButton.show();
  }
}
