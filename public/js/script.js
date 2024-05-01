const slider = document.getElementById('slider');
const slideWidth = slider.querySelector('.nav-news-card').clientWidth;
const slideCount = slider.children.length;
const maxTranslate = -slideWidth * (slideCount - 4); // Display 4 slides at a time
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let translate = 0;

slider.addEventListener('mousedown', (e) => {
  isDragging = true;
  startPosition = e.clientX;
  slider.style.transition = 'none';
  currentTranslate = currentTranslate || 0;
});

slider.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const currentPosition = e.clientX;
  translate = currentTranslate + currentPosition - startPosition;
  if (translate <= 0 && translate >= maxTranslate) {
    slider.style.transform = `translateX(${translate}px)`;
  }
});

slider.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  currentTranslate = translate; // Store the current translate value
  slider.style.transition = 'transform 0.6s ease-in-out';
});
