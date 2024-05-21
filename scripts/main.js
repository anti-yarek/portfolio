document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingAnimation = document.querySelector('.loading-animation');
    const leftCurtain = document.querySelector('.left-curtain');
    const rightCurtain = document.querySelector('.right-curtain');

    let animationLoops = 0;

    // Listen for the animation iteration event
    loadingAnimation.addEventListener('animationiteration', function() {
        animationLoops++;

        if (animationLoops === 2) { // Adjust the number of loops as needed
            // Hide the arrows animation
            loadingAnimation.classList.add('hide-arrows');

            // Make the loading screen background transparent
            loadingScreen.style.backgroundColor = 'transparent';

            // Show and animate the curtains
            leftCurtain.classList.add('open');
            rightCurtain.classList.add('open');

            // Remove the loading screen after the curtain animation ends
            leftCurtain.addEventListener('animationend', () => {
                loadingScreen.style.display = 'none';
            });
        }
    });

    window.addEventListener('load', function() {
        loadingScreen.style.display = 'flex';
    });
});
