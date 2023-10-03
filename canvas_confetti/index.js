'use strict';

import Particle from './js/Particle.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio > 2 ? 1 : 1;
const fps = 60;
const interval = 1000 / fps;
let now, delta;
let then = Date.now();
let canvasWidth, canvasHeight;
const partices = [];
let deg = 0;
function init() {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  ctx.scale(dpr, dpr);

  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;
}

function confetti({ x, y, count, deg, colors, shapes, spread }) {
  for (let i = 0; i < count; i++) {
    partices.push(new Particle(x, y, deg, colors, shapes, spread));
  }
}
function render() {
  requestAnimationFrame(render);
  now = Date.now();
  delta = now - then;

  if (delta < interval) return;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  deg += 1;
  // confetti({
  //   x: 0, //0~1
  //   y: 0.5, //0~1
  //   count: 10,
  //   deg: -50,
  // });
  // confetti({
  //   x: 1,
  //   y: 0.5,
  //   count: 10,
  //   deg: -130,
  // });
  confetti({
    x: 0.5, //0~1
    y: 0.5, //0~1
    count: 5,
    deg: 225 + deg,
    spread: 1,
  });
  confetti({
    x: 0.5, //0~1
    y: 0.5, //0~1
    count: 5,
    deg: 90 + deg,
    spread: 1,
  });
  confetti({
    x: 0.5, //0~1
    y: 0.5, //0~1
    count: 5,
    deg: 315 + deg,
    spread: 1,
  });
  for (let i = partices.length - 1; i >= 0; i--) {
    partices[i].update();
    partices[i].draw(ctx);
    if (partices[i].opacity < 0) partices.splice(i, 1);
    if (partices[i].y > canvasHeight) partices.splice(i, 1);
  }
  then = now - (delta % interval);
}

window.addEventListener('load', () => {
  init();
  render();
});

window.addEventListener('resize', () => {
  init();
});
// window.addEventListener('click', () => {
//   confetti({
//     x: 0,
//     y: 0.5,
//     count: 10,
//     deg: -50,
//     shapes: ['circle', 'square'],
//     spread: 20,
//   });
// });
