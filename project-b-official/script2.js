console.log("Script started");

let player;
let trees = [];
let treeCount = 21;
let fogParticles = [];
let flashlight;
let flashlightFound = false;
let btn;

let mySound; 
let treeImage;
let flashlightImage; 

function preload() {
  console.log("Preloading assets"); 
  mySound = loadSound("lib/sound/forestrain.wav", function() {
    console.log("Sound loaded successfully"); 
  }, function(error) {
    console.error("Error loading sound:", error); 
  });
  treeImage = loadImage("lib/images/darktree.png", function() {
    console.log("Image loaded successfully"); 
  }, function(error) {
    console.error("Error loading image:", error); 
  });
  flashlightImage = loadImage("lib/images/flashlight.png", function() {
    console.log("Flashlight image loaded successfully");
  }, function(error) {
    console.error("Error loading flashlight image:", error);
  });
}

function setup() {
  console.log("Setting up canvas"); 
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('display', 'block');
  canvas.parent('canvasWrapper'); 
  player = new Player();

  flashlight = {
    x: random(width),
    y: random(height),
    size: 50 
  };

  for (let i = 0; i < treeCount; i++) {
    let tree = new Tree(random(width), random(height), 20);
    trees.push(tree);
  }

  for (let i = 0; i < 20; i++) {
    let x = random(windowWidth);
    let y = random(windowHeight);
    let width = random(100, 300);
    let height = random(50, 150);
    let speed = random(0.5, 2) * (random() < 0.5 ? 1 : -1);
    fogParticles.push(new FogParticle(x, y, width, height, speed));
  }

  window.addEventListener('click', function() {
    if (!mySound.isPlaying()) {
      mySound.loop();
      console.log("Sound played on click");
    }
  });
}

function draw() {
  background(13, 10, 10);

  player.update();
  player.display();

  fogParticles.forEach(particle => {
    particle.move();
    particle.display();
  });

  for (let tree of trees) {
    tree.display();
  }

  if (!flashlightFound) {
    image(flashlightImage, flashlight.x, flashlight.y, flashlight.size, flashlight.size);
    if (dist(player.x, player.y, flashlight.x, flashlight.y) < (player.size / 2 + flashlight.size / 2)) {
      flashlightFound = true;
      createFoundButton();
    }
  }
}

function createFoundButton() {
  if (!btn) {
    btn = createButton('Found it!');
    btn.position(width / 2 - 50, height / 2 - 25);
    btn.mousePressed(goToNextPage);
    btn.style('z-index', '2'); // is my button above the canvas ?
  }
}

function goToNextPage() {
  window.location.href = 'page3.html';
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    player.move(0, -2);
  } else if (keyCode === DOWN_ARROW) {
    player.move(0, 2);
  } else if (keyCode === LEFT_ARROW) {
    player.move(-2, 0);
  } else if (keyCode === RIGHT_ARROW) {
    player.move(2, 0);
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
    player.stopY();
  }
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    player.stopX();
  }
  return false;
}

class FogParticle {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  move() {
    this.x += this.speed;
    if (this.x > windowWidth || this.x < 0) {
      this.speed *= -1;
    }
  }

  display() {
    noStroke();
    fill(255, 255, 255, 40);
    ellipse(this.x, this.y, this.width, this.height);
  }
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.size = 25;
    this.speedX = 0;
    this.speedY = 0;
    this.direction = 'down';
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.speedX > 0) this.direction = 'left';
    else if (this.speedX < 0) this.direction = 'right';
    else if (this.speedY > 0) this.direction = 'up';
    else if (this.speedY < 0) this.direction = 'down';
  }

  display() {
    fill(122, 31, 20);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
    this.drawBeak();
  }

  drawBeak() {
    const beakWidth = this.size * 1;
    const beakHeight = this.size * 1.3;
    const beakOffsetX = this.size * -0.4;
    const beakOffsetY = 0;

    push();
    translate(this.x, this.y);
    rotate(this.getBeakDirection());

    fill(150, 35, 21);
    beginShape();
    vertex(beakOffsetX + beakWidth, beakOffsetY);
    quadraticVertex(beakOffsetX + beakWidth / 2, beakOffsetY + beakHeight, beakOffsetX, beakOffsetY);
    quadraticVertex(beakOffsetX + beakWidth / 2, beakOffsetY - beakHeight, beakOffsetX + beakWidth, beakOffsetY);
    endShape(CLOSE);

    pop();
  }

  getBeakDirection() {
    if (this.direction === 'right') {
      return 0;
    } else if (this.direction === 'left') {
      return PI;
    } else if (this.direction === 'down') {
      return HALF_PI;
    }
    return -HALF_PI;
  }

  move(x, y) {
    this.speedX = x;
    this.speedY = y;
  }

  stopX() {
    this.speedX = 0;
  }

  stopY() {
    this.speedY = 0;
  }
}

class Tree {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  display() {
    imageMode(CENTER);
    image(treeImage, this.x, this.y, this.radius * 15, this.radius * 15);
  }
}
