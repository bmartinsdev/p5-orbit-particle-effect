let slowSpeed = 0.4;
let slowInc = 0.24;
let rx = 14;
let ry = 14;
let orbitRadius = 140;
let orbitSpeed = 0.4;
let orbitInc = 0.016;
let wWidth = window.innerWidth;
let wHeight = window.innerHeight;
let orbitList = [];
let slowOrbitList = [];

function setup() {
  createCanvas(wWidth, wHeight);
  frameRate(24);
  for (var i = 0; i < 20; i++) {
    orbitList[i] = new Orbit(
      generateRandom(wWidth),
      generateRandom(wHeight),
      4,
      160
    );
  }
  for (var i = 0; i < 5; i++) {
    slowOrbitList[i] = new Orbit(
      generateRandom(wWidth),
      generateRandom(wHeight),
      3 + i / 6,
      200
    );
  }
}

function draw() {
  wWidth = windowWidth;
  wHeight = windowHeight;
  let follow = 0;
  let inc = 30;
  let followX = wWidth / 2;
  let followY = wHeight / 2;
  clear();
  followX = mouseX + rx * Math.cos(slowSpeed + 30);
  followY = mouseY + ry * Math.sin(slowSpeed + 30);
  for (let i = 0; i < orbitList.length; i++) {
    orbitList[i].x = wWidth / 2 + orbitRadius * Math.cos(orbitSpeed + inc);
    orbitList[i].y = wHeight / 2 + orbitRadius * Math.sin(orbitSpeed + inc);
    inc = inc + 10;
  }
  slowSpeed += slowInc;
  orbitSpeed += orbitInc;

  for (let i = 0; i < orbitList.length; i++) {
    orbitList[i].update(orbitList[follow].x, orbitList[follow].y);
    orbitList[i].show();
    follow++;
    if (follow == 5) follow = 0;
  }

  for (let i = 0; i < slowOrbitList.length; i++) {
    slowOrbitList[i].update(followX, followY);
    slowOrbitList[i].show();
  }
  stroke("#fff");
  fill("#fff");
  ellipse(wWidth / 2, wHeight / 2, 139 * 2 - 1, 139 * 2 - 1);
}

function generateRandom(size) {
  return Math.floor(Math.random() * size);
}
