document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');

    // Listen for the page fully loaded event
    window.addEventListener('load', function() {
        // Delay to ensure the animation completes a full loop
        setTimeout(() => {
            // Trigger the ending animation (add your animation code here)
            loadingScreen.classList.add('fade-out');

            // Remove the loading screen after the animation
            loadingScreen.addEventListener('animationend', () => {
                loadingScreen.remove();
            });
        }, 1000); // Adjust this delay based on your animation length
    });
});
