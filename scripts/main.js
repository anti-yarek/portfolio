// Wait for the video to be fully loaded
document.getElementById('loading-video').addEventListener('loadeddata', function() {
  // Hide the loading screen
  document.getElementById('loading-screen').style.display = 'none';
  // Display the content
  document.getElementById('content').style.display = 'block';
});
