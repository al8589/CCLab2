let blob = {
    x: 300,
    y: 300,
    size: 50,
    hue: 10
  };
  
  let particles = [];
  let foodParticles = [];
  let sparks = [];
  
  let xSpeed = 0;
  let ySpeed = 0;
  let angle = 0;
  
  function setup() {
    createCanvas(600, 600);
    colorMode(HSB, 100);
    background(0);
  
    for (let i = 0; i < 15; i++) { // initializing 15 food particles
      foodParticles.push(new FoodParticle(random(width), random(height)));
    }
  }
  
  function draw() {
    background(0, 5); // slight trail effect
    
    for (let i = sparks.length - 1; i >= 0; i--) {
      sparks[i].update();
      sparks[i].show();
      if (sparks[i].alpha <= 0) {
        sparks.splice(i, 1);
      }
    }
    if (random(1) < 0.1) {
      sparks.push(new Spark(random(width), random(height)));
    }
    
    blob.x += xSpeed + 0.5 * cos(angle);
    blob.y += ySpeed + 0.5 * sin(angle);
    angle += 0.04;
    
    if (mouseIsPressed) {
      let dirX = mouseX - blob.x;
      let dirY = mouseY - blob.y;
      xSpeed = dirX * 0.01;
      ySpeed = dirY * 0.01;
    } else {
      xSpeed *= 0.95;
      ySpeed *= 0.95;
    }
    
    drawBlob(blob.x, blob.y, blob.size, blob.hue);
    
    if (keyIsDown(UP_ARROW)) {
      blob.size += 1;
    }
    
    if (keyIsDown(DOWN_ARROW)) {
      blob.size -= 1;
    }
    
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].show();
      if (particles[i].alpha <= 0) {
        particles.splice(i, 1);
      }
    }
      for (let i = foodParticles.length - 1; i >= 0; i--) {
      foodParticles[i].show();
      
      let d = dist(blob.x, blob.y, foodParticles[i].x, foodParticles[i].y);
      if (d < blob.size / 2) { // check if blob eats the food particle
        blob.size += 4; // blob grows larger when it eats a food particle
        foodParticles.splice(i, 1); // food particle goes bye bye
      }
    }
    
    blob.size += sin(frameCount * 0.05) * 0.1;
  }
  
  function mousePressed() {
    blob.size += random(5, 5.1);
    
    for (let i = 0; i < 5; i++) {
      particles.push(new Particle(blob.x, blob.y, blob.hue));
    }
  }
  
  function mouseReleased() {
    blob.size -= random(5, 5.1);
  }
  
  function drawBlob(x, y, size, hue) {
    push();
    fill(hue, 100, 50, 65);
    beginShape();
    for (let i = 0; i < TWO_PI; i += PI / 15) {
      let xOffset = cos(i + angle) * size / 1.5;
      let yOffset = sin(i + angle) * size / 1.5;
      vertex(x + cos(i) * (size * 1.3 + xOffset), y + sin(i) * (size * 2 + yOffset));
    }
    endShape(CLOSE);
    
    noStroke();
    fill(5, 90, 86);
    beginShape();
    for (let i = 0; i < TWO_PI; i += PI / 90) {
      let xOffset = cos(i - angle) * size / 100;
      let yOffset = sin(i - angle) * size / 2;
      vertex(x + cos(i) * (size * 0.4 + xOffset), y + sin(i) * (size * 1 + yOffset));
    }
    endShape(CLOSE);
    pop();
  }
  
  class Particle {
    constructor(x, y, hue) {
      this.pos = createVector(x, y);
      this.vel = p5.Vector.random2D();
      this.vel.mult(random(2, 5));
      this.alpha = 255;
      this.hue = hue;
    }
    
    update() {
      this.pos.add(this.vel);
      this.alpha -= 7;
    }
    
    show() {
      noStroke();
      fill(this.hue, 100, 100, this.alpha);
      ellipse(this.pos.x, this.pos.y, 10);
    }
  }
  
  class FoodParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    
    show() {
      fill(178,34,100); // Color of the food particles
      ellipse(this.x, this.y, 5); // Size of the food particles
    }
  }
  
  class Spark {
    constructor(x, y) {
      this.pos = createVector(x, y);
      this.vel = p5.Vector.random2D();
      this.vel.mult(random(0.5, 2));
      this.alpha = 100;
    }
    
    update() {
      this.pos.add(this.vel);
      this.alpha -= 2;
    }
    
    show() {
      noStroke();
      fill(255,160,122, this.alpha);
      ellipse(this.pos.x, this.pos.y, 5);
    }
  }