import { randomNumBetween } from './Utils.js';

export default class Paticle {
  constructor() {
    this.rFriction = randomNumBetween(0.95, 1.01);
    this.algleFriction = randomNumBetween(0.97, 0.99);
    this.r = innerHeight / 4;
    this.angle = randomNumBetween(0, 360);
    this.rAlpha = randomNumBetween(0, 5);
    this.angleAlpha = randomNumBetween(1, 2);
    this.opacity = randomNumBetween(0.2, 1);
  }
  update() {
    this.rAlpha *= this.rFriction;
    this.angleAlpha *= this.algleFriction;
    this.r += this.rAlpha;
    this.angle += this.angleAlpha;
    this.x = window.innerWidth / 2 + this.r * Math.cos((Math.PI / 180) * this.angle);
    this.y = window.innerHeight / 2 + this.r * Math.sin((Math.PI / 180) * this.angle);
    this.opacity -= 0.003;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();
    ctx.closePath();
  }
}
