let glasses;
let x, y;
let vx, vy;
let gravity = 0.5;
let bounceFactor = 0.7;
let friction = 0.98;
let t = 0; 

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
  strokeWeight(2);

  let lines = 10; 
  let spacing = 40; 

  for (let i = 0; i < lines; i++) {
     let yOffset = i * spacing + (windowHeight - 200); 
    beginShape();
    for (let x = 0; x <= width; x += 20) {
      let angle = map(x, 0, width, 0, TWO_PI * 2); 
      let y = yOffset + sin(angle + i * 0.5 - t) * 40;

      let inter = map(x, 0, width, 0, 1);
      let c = lerpColor(color('#e7e7e7ff'), color('#c4c5c6ff'), inter);
      stroke(c);

      vertex(x, y);
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
