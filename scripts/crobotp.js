$("input.slider").on("input change", function(event) {
    var element = $(this).parents("div.slide-container");
    var pos = event.target.value;
  
    element.find("div.before").css({width: pos + "%"});
    element.find("div.after").css({width: (100 - pos) + "%"}); // Adjust width of after image
  
    element.find("div.slider-button").css({left: "calc(" + pos + "% - 2.4vw)"});
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
