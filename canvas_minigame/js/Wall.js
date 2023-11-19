import App from './App.js';
import { randomNumBetween } from './utils.js';

export default class Wall {
	constructor(config) {
		this.img = document.querySelector('#wall-img');
		this.type = config.type; // 'BIG', 'SMALL'
		switch (this.type) {
			case 'BIG':
				this.sizeX = 18 / 30;
				this.sx = this.img.width * (9 / 30);
				break;
			case 'SMALL':
				this.sizeX = 9 / 30;
				this.sx = this.img.width * (0 / 30);
				break;
		}
		this.width = App.height * this.sizeX;
		this.height = App.height;
		this.gapY = randomNumBetween(App.height * 0.2, App.height * 0.35);
		this.x = App.width;
		this.y1 = -this.height + randomNumBetween(30, App.height - this.gapY - 30);
		this.y2 = this.y1 + this.height + this.gapY;
		this.generateNext = false;
		this.gapNextX = App.width * randomNumBetween(0.6, 0.75);
	}
	get isOutside() {
		return this.x + this.width < 0;
	}
	get canGennerateNext() {
		return !this.generateNext && this.x + this.width < this.gapNextX;
	}
	update() {
		this.x += -6;
	}
	draw() {
		App.ctx.drawImage(
			this.img,
			this.sx,
			0,
			this.img.width * this.sizeX,
			this.img.height,
			this.x,
			this.y1,
			this.width,
			App.height
		);
		App.ctx.drawImage(
			this.img,
			this.sx,
			0,
			this.img.width * this.sizeX,
			this.img.height,
			this.x,
			this.y2,
			this.width,
			App.height
		);
	}
}