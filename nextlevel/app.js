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
