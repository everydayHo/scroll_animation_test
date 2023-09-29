const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio;
let canvasWidth, canvasHeight, particles;
//사각형 그리기
// ctx.fillRect(10,10,50,50)
function init() {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  const TOTAL = canvasWidth / 40;
  Object.assign(canvas.style, {
    width: `${canvasWidth}px`,
    height: `${canvasHeight}px`,
  });
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  ctx.scale(dpr, dpr);

  particles = [];
  for (let i = 0; i < TOTAL; i++) {
    const x = randomNumBetween(0, canvasWidth);
    const y = randomNumBetween(0, canvasHeight);
    const radious = randomNumBetween(50, 100);
    const vy = randomNumBetween(1, 5);
    const particle = new Particle(x, y, radious, vy);
    particles.push(particle);
  }
}

//dot Gui

const feGaussianBlur = document.querySelector('feGaussianBlur');
const feColorMatrix = document.querySelector('feColorMatrix');
const controls = new (function () {
  this.blurValue = 40;
  this.alphaChannel = 100;
  this.alphaOffset = -23;
  this.acc = 1.03;
})();
let gui = new dat.GUI();
const f1 = gui.addFolder('Gooey Effect');
f1.add(controls, 'blurValue', 0, 100).onChange((value) => {
  feGaussianBlur.setAttribute('stdDeviation', value);
});
f1.add(controls, 'alphaChannel', 1, 200).onChange((values) => {
  feColorMatrix.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${values} ${controls.alphaOffset}`);
});
f1.add(controls, 'alphaOffset', -40, 40).onChange((values) => {
  feColorMatrix.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${controls.alphaChannel} ${values}`);
});
const f2 = gui.addFolder('particle Property');
f2.add(controls, 'acc', 1, 1.5, 0.01).onChange((value) => {
  particles.forEach((particle) => {
    particle.acc = value;
  });
});

// 원그리기

class Particle {
  constructor(x, y, radious, vy) {
    this.x = x;
    this.y = y;
    this.radious = radious;
    this.vy = vy;
    // 가속도 1이하로 주면 멈추는 느낌
    this.acc = 1.03;
  }
  update() {
    this.vy *= this.acc;
    this.y += this.vy;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radious, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = 'orange';
    ctx.fill();
    ctx.closePath();
  }
}

const x = 100;
const y = 100;
const radious = 50;

const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

// 모니터 주사율마다 같은 애니매이션 적용
let interval = 1000 / 60;
let now, delta;
let then = Date.now();

function animate() {
  window.requestAnimationFrame(animate);
  now = Date.now();
  delta = now - then;
  if (delta < interval) return;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
    if (particle.y - particle.radious > canvasHeight) {
      particle.y = -particle.radious;
      particle.x = randomNumBetween(0, canvasWidth);
      particle.radious = randomNumBetween(50, 100);
      particle.vy = randomNumBetween(1, 5);
    }
  });

  then = now - (delta % interval);
}
window.addEventListener('load', () => {
  init();
  animate();
});

window.addEventListener('resize', () => {
  init();
});
