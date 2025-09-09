let glasses;
let x, y;
let vx, vy;
let gravity = 0.5;
let bounceFactor = 0.7;
let friction = 0.98;
let t = 0; 
let alphaValue = 0;
let fadeSpeed = 2;  

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
  noFill();

  if (frameCount < 100) {
    return;
  }
  strokeWeight(2);

  if (alphaValue < 255) {
    alphaValue += fadeSpeed;
  }

  let lines = 10; 
  let spacing = 40; 

  for (let i = 0; i < lines; i++) {
    let yOffset = i * spacing + (windowHeight - 200); 
    beginShape();
    for (let xPos = 0; xPos <= width; xPos += 20) {
      let angle = map(xPos, 0, width, 0, TWO_PI * 2); 
      let yPos = yOffset + sin(angle + i * 0.5 - t) * 40;

      let inter = map(xPos, 0, width, 0, 1);
      let c = lerpColor(color('#e7e7e7ff'), color('#c4c5c6ff'), inter);
      stroke(red(c), green(c), blue(c), alphaValue);

      vertex(xPos, yPos);
    }
    endShape();
  }

  t += 0.005; 
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

  tint(255, alphaValue);
  image(glasses, x, y, glasses.width/2, glasses.height/2);
}

function resetGlasses() {
  x = width / 2;
  y = 0;
  vy = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  resetGlasses();
}
