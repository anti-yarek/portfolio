const scrollbarThumb = document.getElementById('scrollbar-thumb');
const scrollbar = document.getElementById('scrollbar');
const projects = document.getElementById('projects');
let isDragging = false;
let timeoutId;

function setImage(liveseyvcp) {
  const imagePath = `../portfolio/assets/${liveseyvcp}`;
  scrollbarThumb.style.backgroundImage = `url('${imagePath}')`;
}

function handleScroll() {
  const scrollPercentage = (projects.scrollTop / (projects.scrollHeight - projects.clientHeight)) * 100;
  const maxThumbTop = scrollbar.clientHeight - scrollbarThumb.clientHeight;
  const thumbTop = (scrollPercentage / 100) * maxThumbTop;
  scrollbarThumb.style.top = `${thumbTop}px`;

  // Determine the image based on scroll position
  const liveseyvcp = projects.scrollTop > projects.scrollHeight / 2 ? 'liveseyvcp.png' : 'liveseyvcp.gif';
  setImage(liveseyvcp);

  // Clear the previous timeout
  clearTimeout(timeoutId);

  // Set a new timeout to detect when scrolling stops
  timeoutId = setTimeout(() => {
    // Scrolling has stopped, set the image to PNG
    setImage('liveseyvcp.png');
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

// Listen for mouse wheel events for scrolling within the scrollbar
scrollbar.addEventListener('wheel', (event) => {
  event.preventDefault();
  projects.scrollTop += event.deltaY;
  handleScroll();
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


$("input.slider").on("input change", function(event) {
  var element = $(this).parents("div.slide-container");
  var pos = event.target.value;

  element.find("div.before").css({width: pos + "%"});
  element.find("div.after").css({width: (100 - pos) + "%"}); // Adjust width of after image

  element.find("div.slider-button").css({left: "calc(" + pos + "% - 1.7vw)"});
});