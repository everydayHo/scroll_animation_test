import Background from './Background.js';
import Wall from './Wall.js';
import Player from './Player.js';
import Coin from './Coin.js';

export default class App {
	static canvas = document.querySelector('canvas');
	static ctx = this.canvas.getContext('2d');
	static dpr = devicePixelRatio > 1 ? 2 : 1;
	static interval = 1000 / 60;
	static width = 1024;
	static height = 768;
	constructor() {
		this.backgrounds = [
			new Background({
				img: document.querySelector('#bg3-img'),
				speed: -1,
			}),
			new Background({
				img: document.querySelector('#bg2-img'),
				speed: -2,
			}),
			new Background({
				img: document.querySelector('#bg1-img'),
				speed: -4,
			}),
		];
		this.walls = [new Wall({ type: 'SMALL' })];
		this.player = new Player();
		this.coins = [];
		window.addEventListener('resize', this.resize.bind(this));
	}
	resize() {
		App.canvas.width = App.width * App.dpr;
		App.canvas.height = App.height * App.dpr;
		App.ctx.scale(App.dpr, App.dpr);
		// 반응형때 4:3비율 유지
		const width =
			innerWidth > innerHeight ? innerHeight * 0.9 : innerWidth * 0.9;
		App.canvas.style.width = width + 'px';
		App.canvas.style.height = width * (3 / 4) + 'px';
	}
	render() {
		let now, delta;
		let then = Date.now();
		const frame = () => {
			requestAnimationFrame(frame);
			now = Date.now();
			delta = now - then;
			if (delta < App.interval) return;
			App.ctx.clearRect(0, 0, App.width, App.height);
			// 배경관련
			this.backgrounds.forEach((background) => {
				background.update();
				background.draw();
			});
			// 벽관련
			for (let i = this.walls.length - 1; i >= 0; i--) {
				this.walls[i].update();
				this.walls[i].draw();
				if (this.walls[i].isOutside) {
					this.walls.splice(i, 1);
					continue;
				}
				if (this.walls[i].canGennerateNext) {
					this.walls[i].generateNext = true;
					const newWall = new Wall({
						type: Math.random() > 0.3 ? 'SMALL' : 'BIG',
					});
					this.walls.push(newWall);

					// 코인생성관련
					if (Math.random() < 0.5) {
						const x = newWall.x + newWall.width / 2;
						const y = newWall.y2 - newWall.gapY / 2;
						this.coins.push(new Coin(x, y, newWall.vx));
					}
				}
				//벽과 플레이어 충돌관련
				if (this.walls[i].isColliding(this.player.boundingBox)) {
					this.player.boundingBox.color = `rgba(255, 0, 0,0.3)`;
				} else {
					this.player.boundingBox.color = `rgba(0, 0, 255,0.3)`;
				}
			}
			// 플레이어
			this.player.update();
			this.player.draw();

			// 코인관련
			for (let i = this.coins.length - 1; i >= 0; i--) {
				this.coins[i].update();
				this.coins[i].draw();
				if (this.coins[i].x + this.coins[i].width < 0) {
					this.coins.splice(i, 1);
				}
			}
			then = now - (delta % App.interval);
		};
		requestAnimationFrame(frame);
	}
}
