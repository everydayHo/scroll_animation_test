import App from './App.js';
import BoundingBox from './BoundingBox.js';

export default class Coin {
	constructor(x, y, vx) {
		this.img = document.querySelector('#coin-img');
		this.x = x - 20;
		this.y = y;
		this.width = 50;
		this.height = 50;
		this.frameX = 0;
		this.counter = 1;
		this.vx = vx;
		this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
	}
	update() {
		if (++this.counter % 3 === 0) {
			this.frameX = ++this.frameX % 10;
		}
		this.x += this.vx;
		this.boundingBox.x = this.x;
	}

	draw() {
		App.ctx.drawImage(
			this.img,
			(this.img.width / 10) * this.frameX,
			0,
			this.img.width / 10,
			this.img.height,
			this.x,
			this.y,
			this.width,
			this.height
		);
		// this.boundingBox.draw();
	}
}
