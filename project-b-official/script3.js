let darkTreeBarkImage;
let lightTreeBarkImage;
let currentBackground;
let drawingBuffer;
let drawing = false;

function preload() {
  darkTreeBarkImage = loadImage('lib/images/darktreebark.jpg'); 
  lightTreeBarkImage = loadImage('lib/images/lighttreebark.jpg'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  currentBackground = darkTreeBarkImage; 
  background(currentBackground);

  drawingBuffer = createGraphics(windowWidth, windowHeight);
  drawingBuffer.clear();

  // Create the button
  let moveButton = createButton("Let's move!");
  moveButton.position(10, 10); 
  moveButton.mousePressed(goToPageFour);
}

function draw() {
  background(currentBackground);
  image(drawingBuffer, 0, 0);

  if (drawing) {
    drawingBuffer.stroke(0);
    drawingBuffer.strokeWeight(3); 
    drawingBuffer.line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function mousePressed() {
  drawing = true; // start my drawing
}

function mouseReleased() {
  drawing = false; // stop my drawing
}

function keyPressed() {
  if (key === ' ') { 
    currentBackground = currentBackground === darkTreeBarkImage ? lightTreeBarkImage : darkTreeBarkImage;
    drawingBuffer.background(currentBackground);
  }
}

// Button callback function
function goToPageFour() {
  window.location.href = 'page4.html'; 
}
