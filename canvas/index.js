const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio;
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
Object.assign(canvas.style, {
  width: `${canvasWidth}px`,
  height: `${canvasHeight}px`,
});
canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;
ctx.scale(dpr, dpr);
//사각형 그리기
// ctx.fillRect(10,10,50,50)

// 원그리기

class Particle {
  constructor(x, y, radious, vy) {
    this.x = x;
    this.y = y;
    this.radious = radious;
    this.vy = vy;
  }
  update() {
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

const TOTAL = 20;
const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

let particles = [];
for (let i = 0; i < TOTAL; i++) {
  const x = randomNumBetween(0, canvasWidth);
  const y = randomNumBetween(0, canvasHeight);
  const radious = randomNumBetween(50, 100);
  const vy = randomNumBetween(1, 5);
  const particle = new Particle(x, y, radious, vy);
  particles.push(particle);
}

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

animate();
