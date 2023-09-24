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
console.log('showSectio: ', showSection);
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
