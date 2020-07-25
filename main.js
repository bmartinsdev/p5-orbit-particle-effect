p5.disableFriendlyErrors = false;
const followInc = 0.24;
const orbitInc = 0.02;
const rx = 14;
const ry = 14;
const orbitRadius = 140;
let orbitSpeed = 0.4;
let followSpeed = 0.4;
let wWidth = window.innerWidth;
let wHeight = window.innerHeight;
let orbitList = [];
let slowOrbitList = [];

function setup() {
  createCanvas(wWidth, wHeight);
  frameRate(24);
  for (let i = 0; i < 8; i++) {
    orbitList[i] = new Orbit(wWidth / 2, wHeight / 2, 4, 120);
  }
  for (let i = 0; i < 2; i++) {
    slowOrbitList[i] = new Orbit(wWidth / 2, wHeight / 2, 3 + i / 6, 50);
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
  if (
    mouseX > 25 &&
    mouseY > 25 &&
    mouseX < wWidth - 25 &&
    mouseY < wHeight - 25
  ) {
    followX = mouseX + rx * Math.cos(followSpeed + 30);
    followY = mouseY + ry * Math.sin(followSpeed + 30);
  }
  for (let i = 0; i < orbitList.length; i++) {
    orbitList[i].x = wWidth / 2 + orbitRadius * Math.cos(orbitSpeed + inc);
    orbitList[i].y = wHeight / 2 + orbitRadius * Math.sin(orbitSpeed + inc);
    inc = inc + 10;
  }
  followSpeed += followInc;
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
  ellipse(wWidth / 2, wHeight / 2, 138 * 2, 138 * 2);
}

function generateRandom(size) {
  return Math.floor(Math.random() * size);
}
