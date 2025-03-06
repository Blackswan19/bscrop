const uploadBtn = document.getElementById('upload-btn');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const title = document.getElementById('title');
const progressBar = document.getElementById('progress-bar');

// On/Off toggle icons
const toggleOn = document.getElementById('toggle-on');
const toggleOff = document.getElementById('toggle-off');

// Blend factor controls
const decreaseBlendBtn = document.getElementById('decrease-blend');
const increaseBlendBtn = document.getElementById('increase-blend');

// Controls container
const controlsContainer = document.getElementById('controls-container');

let blendFactor = 0.60; // Initial blend factor

const helpBtn = document.getElementById('helpBtn');
const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');
const closePopup = document.getElementById('closePopup');

helpBtn.addEventListener('click', () => {
  popup.style.display = 'block';
  overlay.style.display = 'block';
});

closePopup.addEventListener('click', () => {
  popup.style.display = 'none';
  overlay.style.display = 'none';
});

overlay.addEventListener('click', () => {
  popup.style.display = 'none';
  overlay.style.display = 'none';
});

// Initially, hide video controls and title
video.controls = false;
title.style.display = 'block';

// Upload video logic
uploadBtn.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const videoURL = URL.createObjectURL(file);
    video.src = videoURL;
    video.style.display = 'block';
    video.play();

    // Trigger update after the video is loaded
    video.addEventListener('loadeddata', () => {
      requestAnimationFrame(updateBackgroundColor);
    });

    video.addEventListener('play', () => {
      document.body.style.backgroundColor = '#050505'; // Darker background
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
      requestAnimationFrame(updateBackgroundColor); // Start updating background when playing
    });

    video.addEventListener('pause', () => {
      exitFullscreen();
    });

    video.addEventListener('ended', () => {
      exitFullscreen();
      document.body.style.backgroundColor = '#0a0a0a'; // Original dark background
    });

    // Update progress bar as the video plays
    video.addEventListener('timeupdate', () => {
      const progressPercentage = (video.currentTime / video.duration) * 100;
      progressBar.style.width = progressPercentage + '%';
    });
  }
});

// Fullscreen exit logic
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

const brightnessValue = document.getElementById('brightness-value'); // Reference to display element

function updateBackgroundColor() {
  if (!video.paused && !video.ended) {
    // Ensure the video is loaded and has dimensions before proceeding
    if (video.videoWidth > 0 && video.videoHeight > 0) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let r = 0, g = 0, b = 0, brightness = 0;
      const totalPixels = data.length / 4;
      const sampleSize = 10; // Samples every 10th pixel to improve performance

      for (let i = 0; i < data.length; i += sampleSize * 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];

        // Calculate brightness as luminance
        brightness += (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]);
      }

      r = Math.floor(r / (totalPixels / sampleSize));
      g = Math.floor(g / (totalPixels / sampleSize));
      b = Math.floor(b / (totalPixels / sampleSize));

      brightness = Math.floor(brightness / (totalPixels / sampleSize)); // Average brightness

      // Update the brightness display
      const brightnessPercentage = Math.min(Math.max((brightness / 255) * 100, 0), 100); // Normalize to 0-100
      brightnessValue.textContent = brightnessPercentage.toFixed(2); // Update display with brightness percentage

      const newR = Math.floor((r * blendFactor) + (10 * (1 - blendFactor)));
      const newG = Math.floor((g * blendFactor) + (10 * (1 - blendFactor)));
      const newB = Math.floor((b * blendFactor) + (10 * (1 - blendFactor)));

      document.body.style.backgroundColor = `rgb(${newR}, ${newG}, ${newB})`;
    }

    // Continue updating while the video is playing
    requestAnimationFrame(updateBackgroundColor);
  }
}

const progressContainer = document.getElementById('progress-container');

// Show/hide title and video controls on toggle click
toggleOn.addEventListener('click', function() {
  video.controls = true;  // Show video controls
  controlsContainer.style.display = 'block';  // Show all controls
  title.style.display = 'block';  // Show title
  toggleOn.style.display = 'none';  // Hide "on" icon
  toggleOff.style.display = 'block'; // Show "off" icon
  uploadBtn.style.display = 'block'; // Show upload button
  progressContainer.style.display = 'block'; // Show progress bar
});

toggleOff.addEventListener('click', function() {
  video.controls = false;  // Hide video controls
  controlsContainer.style.display = 'none';  // Hide all controls
  title.style.display = 'none';  // Hide title
  toggleOff.style.display = 'none';  // Hide "off" icon
  toggleOn.style.display = 'block'; // Show "on" icon
  uploadBtn.style.display = 'none'; // Hide upload button
  progressContainer.style.display = 'none'; // Hide progress bar
});

const blendFactorLevel = document.getElementById('blend-factor-level'); // Reference to display element

// Adjust blend factor with buttons
decreaseBlendBtn.addEventListener('click', () => {
  if (blendFactor > 0) {
    blendFactor = Math.max(0, blendFactor - 0.1); // Decrease blend factor by 0.1
    updateBlendFactorDisplay();
  }
});

increaseBlendBtn.addEventListener('click', () => {
  if (blendFactor < 1) {
    blendFactor = Math.min(1, blendFactor + 0.1); // Increase blend factor by 0.1
    updateBlendFactorDisplay();
  }
});

// Function to update the blend factor display
function updateBlendFactorDisplay() {
  // Convert blendFactor (range 0-1) to a 10-level scale
  const blendFactorLevelValue = Math.round(blendFactor * 10);
  blendFactorLevel.textContent = blendFactorLevelValue; // Update the display with the new value
}

// Add event listener for clicking on the progress bar to seek
progressContainer.addEventListener('click', function(event) {
  const rect = progressContainer.getBoundingClientRect();
  const x = event.clientX - rect.left; // Get horizontal position of the click
  const width = rect.width; // Get width of the progress bar
  const clickPosition = (x / width) * video.duration; // Calculate the new time
  video.currentTime = clickPosition; // Set the video time
});

// Add event listener for dragging the progress bar to seek
progressContainer.addEventListener('mousedown', function(event) {
  const rect = progressContainer.getBoundingClientRect();
  const width = rect.width;

  function onMouseMove(e) {
    const x = e.clientX - rect.left;
    const dragPosition = (x / width) * video.duration;
    video.currentTime = Math.min(Math.max(dragPosition, 0), video.duration); // Clamp to video duration
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});




document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("video");
  const playPauseBtn = document.getElementById("play-pause-btn");
  const playPauseIcon = playPauseBtn.querySelector("i");
  const forwardBtn = document.getElementById("forward-btn");
  const backwardBtn = document.getElementById("backward-btn");

  // Play/Pause Functionality
  playPauseBtn.addEventListener("click", () => {
     if (video.paused || video.ended) {
        video.play();
        playPauseIcon.classList.remove("fa-play");
        playPauseIcon.classList.add("fa-pause");
     } else {
        video.pause();
        playPauseIcon.classList.remove("fa-pause");
        playPauseIcon.classList.add("fa-play");
     }
  });

  // Sync Play/Pause Button with Video State
  video.addEventListener("play", () => {
     playPauseIcon.classList.remove("fa-play");
     playPauseIcon.classList.add("fa-pause");
  });

  video.addEventListener("pause", () => {
     playPauseIcon.classList.remove("fa-pause");
     playPauseIcon.classList.add("fa-play");
  });

  // Skip Forward (10 seconds)
  forwardBtn.addEventListener("click", () => {
     video.currentTime += 10;
  });

  // Skip Backward (10 seconds)
  backwardBtn.addEventListener("click", () => {
     video.currentTime -= 10;
     if (video.currentTime < 0) video.currentTime = 0; // Prevent negative time
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("video");
  const subtitleBtn = document.getElementById("subtitle-btn");
  const subtitleIcon = subtitleBtn.querySelector("i");
  const track = document.getElementById("subtitle-track");

  // Track visibility state
  let subtitlesEnabled = true;

  // Toggle Subtitles On/Off
  subtitleBtn.addEventListener("click", () => {
     subtitlesEnabled = !subtitlesEnabled;
     track.mode = subtitlesEnabled ? "showing" : "hidden";

     // Update button icon (optional: change style for active/inactive)
     if (subtitlesEnabled) {
        subtitleIcon.classList.add("fa-closed-captioning");
        subtitleIcon.classList.remove("fa-closed-captioning-slash");
     } else {
        subtitleIcon.classList.remove("fa-closed-captioning");
        subtitleIcon.classList.add("fa-closed-captioning-slash");
     }
  });

  // Optional: Default state for track
  track.mode = "showing"; // Enable subtitles by default
});
document.addEventListener("DOMContentLoaded", () => {
  const customMenu = document.querySelector(".custom-menu");

  // Show custom menu on right-click
  document.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      customMenu.style.display = "block";
      customMenu.style.top = `${event.pageY}px`;
      customMenu.style.left = `${event.pageX}px`;
  });

  // Hide the menu when clicking elsewhere
  document.addEventListener("click", () => {
      customMenu.style.display = "none";
  });
});
