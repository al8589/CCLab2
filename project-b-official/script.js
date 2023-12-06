<<<<<<< HEAD
var rain = [];
var speed;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvasWrapper');
  for (var i = 0; i < 800; i++) {
    rain[i] = new Rain();
  }
}

function draw() {
  clear();
  var distance = dist(mouseX, mouseY, width / 2, height / 2);
  speed = map(distance, 0, dist(0, 0, width / 2, height / 2), 35, 0);
  
  translate(width / 2, height / 2);
  for (var i = 0; i < rain.length; i++) {
    rain[i].update();
    rain[i].show();
  }
}
=======
var rain = [];
var speed;

function setup() {
  createCanvas(600, 600);
  for (var i = 0; i < 800; i++) {
    rain[i] = new Rain();
  }
}

function draw() {
  clear();
  var distance = dist(mouseX, mouseY, width / 2, height / 2);
  speed = map(distance, 0, dist(0, 0, width / 2, height / 2), 30, 0);
   
  translate(width / 2, height / 2);
  for (var i = 0; i < rain.length; i++) {
    rain[i].update();
    rain[i].show();
  }
}
>>>>>>> d87814900eb67686bce6147c9d63af6861b7c15c
