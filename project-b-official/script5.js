let homeImage;
let returnButton;

function preload() {
  // Make sure the path to home.jpg is correct relative to the HTML file
  homeImage = loadImage('lib/images/home.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  
  // Display the home image
  image(homeImage, width / 2, height / 2, windowWidth, windowHeight);
  
  // Create the "Return to Start" button
  returnButton = createButton('Return to Start');
  returnButton.position(width / 2 - returnButton.width / 2, height / 2 + 40);
  returnButton.mousePressed(() => window.location.href = 'index.html'); // Replace with the correct URL to your start page
}

function draw() {
  image(homeImage, width / 2, height / 2, windowWidth, windowHeight);
}
