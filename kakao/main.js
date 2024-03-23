'usestrict';

const listContainer = document.querySelector('.list_item_wrapper');
const listItem = document.querySelectorAll('.list-item');
const listContainerStart = listContainer.offsetTop - 600;
const listContainerEnd = listContainer.offsetTop;
const itemHeight = (listContainerEnd - listContainerStart) / listItem.length;
const videoPlayBack = 500;
const videoSection = document.querySelector('.video_section');
const videoWrapper = document.querySelector('.fixed_wrapper');
const videoElement = document.querySelector('.video');
const fixedDescApper = 3470;
const fixedDescDisapper = 3800;
const fixedDesc = document.querySelector('.fixed_desc');

window.addEventListener('scroll', () => {
	const windowScrollY = window.scrollY;
	listItem.forEach((item, idx) => {
		if (item.classList.contains('act')) {
			item.classList.remove('act');
		}
		if (windowScrollY > listContainerStart && windowScrollY < listContainerEnd) {
			const tagetIndex = parseInt((windowScrollY - listContainerStart) / itemHeight);
			if (idx === tagetIndex) {
				item.classList.add('act');
			} else {
				item.classList.remove('act');
			}
		}
	});
	const scrollBottom = windowScrollY + document.documentElement.clientHeight;
	const pannel1Img = document.querySelector('.panell_img_section');
	const panell1pos = pannel1Img.offsetTop + pannel1Img.offsetHeight + 100;

	if (scrollBottom > pannel1Img.offsetTop && scrollBottom < panell1pos) {
		const translateX = 80 - 80 * 4 * ((scrollBottom - pannel1Img.offsetTop) / (pannel1Img.offsetHeight + 100));
		const translateY = -13 + 13 * ((scrollBottom - pannel1Img.offsetTop) / (pannel1Img.offsetHeight + 100));
		const lotationDegree = 23 - 23 * 1.5 * ((scrollBottom - pannel1Img.offsetTop) / (pannel1Img.offsetHeight + 100));
		pannel1Img.children[0].style.transform = `translate(${translateX}px, ${translateY}px) rotate(${lotationDegree}deg)`;
	}
	//비디오 섹션이 끝나고 비디오 포지션변경
	centerElement('.fixed_wrapper', videoElement);
	centerElement('.bank_beyond');
	const videoSectoinEnd = videoSection.offsetTop + videoSection.offsetHeight - (videoWrapper.offsetHeight + (window.innerHeight - videoWrapper.offsetHeight) / 2);

	if (windowScrollY > videoSectoinEnd) {
		Object.assign(videoWrapper.style, {
			position: 'relative',
			top: 'initial',
			left: 'initial',
			transform: `translateY(${videoSection.offsetHeight - videoWrapper.offsetHeight}px)`,
		});
	}
	if (windowScrollY > fixedDescApper && windowScrollY < fixedDescDisapper) {
		Object.assign(fixedDesc.style, {
			transform: `translateY(${(fixedDescDisapper - windowScrollY) / 2}px)`,
			opacity: `${(windowScrollY - fixedDescApper) * 0.005}`,
		});
	} else if (windowScrollY > fixedDescDisapper) {
		Object.assign(fixedDesc.style, {
			transform: `translateY(0px)`,
			opacity: 1,
		});
	} else {
		Object.assign(fixedDesc.style, {
			transform: `translateY(200px)`,
			opacity: 0,
		});
	}
});

videoElement.addEventListener('loadedmetadata', (e) => {
	videoSection.style.height = videoElement.duration * videoPlayBack + 'px';
});
function centerElement(el, video) {
	const element = document.querySelector(el);
	const parent = element.parentElement;

	// 스크롤이 요소의 센터에 들어 올 때
	const viewCenter = (document.documentElement.clientHeight - element.offsetHeight) / 2;
	const scrollCenter = parent.offsetTop - viewCenter;
	if (window.scrollY > scrollCenter) {
		Object.assign(element.style, {
			position: 'fixed',
			top: `50%`,
			left: `50%`,
			transform: `translate(-50%, -50%)`,
		});
		if (video) {
			//비디오 재생시간
			video.currentTime = (window.scrollY - videoSection.offsetTop) / videoPlayBack;
		}
	} else {
		Object.assign(element.style, {
			position: 'relative',
			top: 'initial',
			left: 'initial',
			transform: 'initial',
		});
	}
}

// 슬라이더

const sliderContainer = document.querySelector('.slider_container');
const sliderWrapper = document.querySelector('.slider_content_wrapper');
const sliderContentWapper = document.querySelector('.slider_content');
const sliderImages = document.querySelectorAll('.slider_image');
const sliderIndex = document.querySelector('.slider-index p');
let currentImage = 0;

const sliderChangeHandler = (step) => {
	currentImage += step;
	if (currentImage < 0) {
		currentImage = sliderImages.length - 1;
	}
	if (currentImage >= sliderImages.length) {
		currentImage = 0;
	}
	sliderWrapper.scrollLeft = sliderImages[currentImage].offsetLeft;
};
sliderContainer.addEventListener('click', (e) => {
	e.preventDefault();
	if (e.target.classList.contains('left-btn')) {
		sliderChangeHandler(-1);
	}
	if (e.target.classList.contains('right-btn')) {
		sliderChangeHandler(1);
	}
});
sliderWrapper.addEventListener('scroll', () => {
	const imageWidth = sliderImages[0].offsetWidth;
	currentImage = Math.round(sliderWrapper.scrollLeft / imageWidth);
	sliderIndex.innerText = `${currentImage + 1} / ${sliderImages.length}`;
});
