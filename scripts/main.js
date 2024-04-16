document.addEventListener("DOMContentLoaded", function() {
    // Display the loading screen
    var loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'flex'; // Show loading screen
  
    // Hide the loading screen once the content is fully loaded
    window.addEventListener('load', function() {
      loadingScreen.style.display = 'none'; // Hide loading screen
    });
  });
  