let glasses;
let x, y;
let vx, vy;
let gravity = 0.5;
let bounceFactor = 0.7;
let friction = 0.98;

function preload() {
  glasses = loadImage("glasses.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  x = width / 2;
  y = 0;

  vx = random(-5, 5);
  vy = 0;
}

function draw() {
  background(0);

  vy += gravity;

  x += vx;
  y += vy;

  if (y + glasses.height/4 > height) {
    y = height - glasses.height/4;
    vy *= -bounceFactor;
    vx *= friction;
  }

  if (y - glasses.height/4 < 0) {
    y = glasses.height/4;
    vy *= -bounceFactor;
  }

  if (x - glasses.width/4 < 0) {
    x = glasses.width/4;
    vx *= -bounceFactor;
  }

  if (x + glasses.width/4 > width) {
    x = width - glasses.width/4;
    vx *= -bounceFactor;
  }

  image(glasses, x, y, glasses.width/2, glasses.height/2);
}

function resetGlasses() {
  glasses.x = width / 2;
  y = 0;
  vy = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  resetGlasses();
}