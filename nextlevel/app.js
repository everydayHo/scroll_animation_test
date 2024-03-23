const cursorBox = document.querySelector('.cursor');
const cursor = document.querySelector('.cursor_default_inner');
const cursorTrace = document.querySelector('.cursor_trace_inner');
let posX;
let posY;
document.addEventListener('mousemove', (e) => {
	posX = e.clientX;
	posY = e.clientY;
	cursor.style.transform = `translate(${posX - 10}px , ${posY - 10}px)`;
	cursorTrace.style.transform = `translate(${posX - 20}px , ${posY - 20}px)`;
});

document.addEventListener('mousedown', () => {
	cursorBox.classList.add('cursor-active');
	cursorTrace.style.transform = `translate(${posX - 20}px , ${posY - 20}px) scale(0.5)`;
});
document.addEventListener('mouseup', () => {
	cursorBox.classList.remove('cursor-active');
	cursorTrace.style.transform = `scale(1) translate(${posX - 20}px , ${posY - 20}px)`;
});

function crreateRipple(e) {
	let ripple = document.createElement('span');
	ripple.classList.add('ripple');
	ripple.style.left = `${posX - 10}px`;
	ripple.style.top = `${posY - 10}px`;
	cursorBox.appendChild(ripple);
	ripple.addEventListener('animationend', () => {
		cursorBox.removeChild(ripple);
	});
}

document.addEventListener('click', (e) => {
	crreateRipple(e);
});

const preloaderBtn = document.querySelector('.preloader_btn');
const holdText = document.querySelector('.prloader_btn_hold');
const showSection = document.querySelector('.show_section');
const posterSection = document.querySelector('.poster_section');
let intervalId = null;
let scale = 1;
const preloaderHideThreshold = 14;
function setPreloaderStyle(scale) {
	preloaderBtn.style.transform = `scale(${scale})`;
	holdText.style.opacity = 1 - (scale - 1) / preloaderHideThreshold;
}
preloaderBtn.addEventListener('mousedown', () => {
	intervalId = setInterval(() => {
		scale += 0.175;
		setPreloaderStyle(scale);
		if (scale >= 1 + preloaderHideThreshold) {
			preloaderBtn.parentElement.classList.remove('shown-area');
			preloaderBtn.parentElement.classList.add('hidden-area');
			showSection.classList.remove('hidden-area');
			showSection.classList.add('shown-area');
			posterSection.classList.remove('hidden-area');
			posterSection.classList.add('shown-area');
			clearInterval(intervalId);
		}
	}, 10);
});

preloaderBtn.addEventListener('mouseup', () => {
	clearInterval(intervalId);
	intervalId = setInterval(() => {
		scale -= 0.075;
		if (scale <= 1) {
			clearInterval(intervalId);
		}
		setPreloaderStyle(scale);
	});
});
showSection.addEventListener('mousemove', (e) => {
	const xRelativeToHeader = posX / showSection.clientWidth;
	const yRelativeToHeader = posY / showSection.clientHeight;
	const headerTitle = document.querySelector('.header_tit');
	const circle1 = document.querySelector('.circle_01');
	const circle2 = document.querySelector('.circle_02');
	headerTitle.style.transform = `translate(${xRelativeToHeader * -30}px, ${yRelativeToHeader * -30}px)`;
	circle1.style.transform = `translate(${xRelativeToHeader * -10}px, ${yRelativeToHeader * -10}px)`;
	circle2.style.transform = `translate(${xRelativeToHeader * -15}px, ${yRelativeToHeader * -15}px)`;
});

const options = {
	threshold: 0.2,
};
const callback = (entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('poster_img_visble');
		}
	});
};

const observer = new IntersectionObserver(callback, options);
const posterImgWrappers = document.querySelectorAll('.poster_img_wrapper');
posterImgWrappers.forEach((posterimgwapper) => {
	observer.observe(posterimgwapper);
});

const posterPallax = document.querySelector('.poster_parallax');
posterPallax.addEventListener('mousemove', (e) => {
	const xrelativeToPosterPrallx = posX / posterPallax.clientWidth;
	const yrelativeToPosterPrallx = posY / posterPallax.clientHeight;
	const posterImg2 = document.querySelector('.poster_img_wrapper02');
	const posterImg3 = document.querySelector('.poster_img_wrapper03');
	posterImg2.style.transform = `translate(${xrelativeToPosterPrallx * -30}px, ${yrelativeToPosterPrallx * -30}px)`;
	posterImg3.style.transform = `translate(${xrelativeToPosterPrallx * 30}px, ${yrelativeToPosterPrallx * 30}px)`;
});

const radomBetweenNumber = (max, min) => {
	return Math.ceil(Math.random() * (max - min) + min);
};

console.log(radomBetweenNumber(295, 1));

const arr1 = [2, 14, 16, 25, 26, 30, 32, 36, 37, 38, 44];
const arr2 = [7, 19, 26, 28, 29, 30, 33, 35, 36, 37];
const arr3 = [5, 9, 12, 18, 21, 23, 24, 25, 26, 36, 39, 43, 45];
const arr4 = [2, 5, 11, 17, 18, 26, 29, 30, 37, 38, 42, 44];

const result = [];

arr1.map((el) => {
	arr2.map((el2) => {
		arr3.map((el3) => {
			arr4.map((el4) => {
				const matchValue = el === el2 && el2 === el3 && el3 === el4;
				if (matchValue) {
					result.push(el4);
				}
			});
		});
	});
});

console.log(new Set(result));
