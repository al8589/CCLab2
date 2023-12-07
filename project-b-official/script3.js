let darkTreeBarkImage;
let lightTreeBarkImage;
let currentBackground;
let drawingBuffer;
let drawing = false;

function preload() {
  darkTreeBarkImage = loadImage('lib/images/darktreebark.jpg'); // Make sure this path is correct
  lightTreeBarkImage = loadImage('lib/images/lighttreebark.jpg'); // Make sure this path is correct
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  currentBackground = darkTreeBarkImage; // Start with dark tree bark image
  background(currentBackground);

  // Create a graphics buffer where the drawings will be stored
  drawingBuffer = createGraphics(windowWidth, windowHeight);
  drawingBuffer.clear();

  // Create the button
  let moveButton = createButton("Let's move!");
  moveButton.position(10, 10); // You can change the position as needed
  moveButton.mousePressed(goToPageFour);
}

function draw() {
  // Draw the current background and the drawing buffer
  background(currentBackground);
  image(drawingBuffer, 0, 0);

  // If the mouse is pressed, draw on the buffer
  if (drawing) {
    drawingBuffer.stroke(0); // Set line color to black
    drawingBuffer.strokeWeight(3); // Set line thickness
    drawingBuffer.line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function mousePressed() {
  drawing = true; // Start drawing
}

function mouseReleased() {
  drawing = false; // Stop drawing
}

function keyPressed() {
  if (key === ' ') { // Check if the spacebar is pressed
    // Toggle the background
    currentBackground = currentBackground === darkTreeBarkImage ? lightTreeBarkImage : darkTreeBarkImage;
    // Redraw the background to apply the change
    drawingBuffer.background(currentBackground); // Apply background change to the drawing buffer
  }
}

// Button callback function
function goToPageFour() {
  window.location.href = 'page4.html'; // Redirect to page 4 (change to the correct URL)
}
