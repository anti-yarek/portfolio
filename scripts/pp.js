const scrollbarThumb = document.getElementById('scrollbar-thumb');
const scrollbar = document.getElementById('scrollbar');
const projects = document.getElementById('projects');
let isDragging = false;
let timeoutId;
let scrollTimeout;

function setImage(liveseyv) {
  const imagePath = `../portfolio/assets/${liveseyv}`;
  scrollbarThumb.style.backgroundImage = `url('${imagePath}')`;
}

function handleScroll() {
  const scrollPercentage = (projects.scrollTop / (projects.scrollHeight - projects.clientHeight)) * 100;
  const maxThumbTop = scrollbar.clientHeight - scrollbarThumb.clientHeight;
  const thumbTop = (scrollPercentage / 100) * maxThumbTop;
  scrollbarThumb.style.top = `${thumbTop}px`;

  // Determine the image based on scroll position
  const liveseyv = projects.scrollTop > projects.scrollHeight / 2 ? 'liveseyv.png' : 'liveseyv.gif';
  setImage(liveseyv);

  // Clear the previous timeout
  clearTimeout(timeoutId);

  // Set a new timeout to detect when scrolling stops
  timeoutId = setTimeout(() => {
    // Scrolling has stopped, set the image to PNG
    setImage('liveseyv.png');
  }, 100); // Adjust the delay as needed
}

scrollbarThumb.addEventListener('mousedown', (e) => {
  e.preventDefault();
  isDragging = true;
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const maxThumbTop = scrollbar.clientHeight - scrollbarThumb.clientHeight;
    const mouseY = e.clientY - scrollbar.getBoundingClientRect().top - scrollbarThumb.clientHeight / 2;
    const newThumbTop = Math.min(maxThumbTop, Math.max(0, mouseY));
    const scrollPercentage = (newThumbTop / maxThumbTop) * 100;
    const newScrollTop = (scrollPercentage / 100) * (projects.scrollHeight - projects.clientHeight);
    projects.scrollTop = newScrollTop;
    handleScroll();
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  handleScroll(); // Ensure the image is set to PNG when interaction stops
});

projects.addEventListener('scroll', () => {
  if (!isDragging) {
    handleScroll();
  }
});

// Smooth scroll function
function smoothScroll(amount) {
  let start = projects.scrollTop;
  let end = start + amount;
  let duration = 20; // Duration of the scroll in milliseconds
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    let timeElapsed = currentTime - startTime;
    let progress = Math.min(timeElapsed / duration, 1);
    let ease = easeInOutQuad(progress);

    projects.scrollTop = start + (end - start) * ease;

    if (progress < 1) {
      requestAnimationFrame(animation);
    } else {
      handleScroll();
    }
  }

  requestAnimationFrame(animation);
}

// Ease in-out quadratic function
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// Listen for mouse wheel events for scrolling within the scrollbar
scrollbar.addEventListener('wheel', (event) => {
  event.preventDefault();
  const deltaY = event.deltaY > 0 ? 100 : -100;
  smoothScroll(deltaY);
});

// Additional handling for touchpad scrolling within the scrollbar
scrollbar.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  touch.startY = touch.clientY;
});

scrollbar.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  const deltaY = touch.clientY - touch.startY;
  projects.scrollTop += deltaY;
  handleScroll();
  touch.startY = touch.clientY;
});





document.addEventListener('DOMContentLoaded', function() {
  const loadingScreen = document.getElementById('loading-screen');
  const loadingAnimation = document.querySelector('.loading-animation');
  const leftCurtain = document.querySelector('.left-curtain');
  const rightCurtain = document.querySelector('.right-curtain');

  let isPageLoaded = false;
  let animationLoops = 0;

  // Listen for the animation iteration event
  loadingAnimation.addEventListener('animationiteration', function() {
      animationLoops++;

      // Check if the page has loaded and if the animation has looped at least once
      if (isPageLoaded && animationLoops >= 1) {
          // Hide the arrows animation
          loadingAnimation.classList.add('hide-arrows');

          // Make the loading screen background transparent at the start of the curtain animation
          loadingScreen.style.backgroundColor = 'transparent';

          // Show and animate the curtains
          leftCurtain.style.visibility = 'visible';
          rightCurtain.style.visibility = 'visible';
          leftCurtain.classList.add('open');
          rightCurtain.classList.add('open');

          // Remove the loading screen after the curtain animation ends
          leftCurtain.addEventListener('animationend', () => {
              loadingScreen.style.display = 'none';
          });

          // Remove the animation iteration listener to prevent further calls
          loadingAnimation.removeEventListener('animationiteration', arguments.callee);
      }
  });

  window.addEventListener('load', function() {
      isPageLoaded = true;
  });
});
