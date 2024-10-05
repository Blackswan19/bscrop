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
            video.addEventListener('play', () => {
                document.body.style.backgroundColor = '#050505'; // Even darker background
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                }
                requestAnimationFrame(updateBackgroundColor);
            });

            video.addEventListener('pause', exitFullscreen);
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

    // Dynamically update background color
    function updateBackgroundColor() {
        if (!video.paused && !video.ended) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            let r = 0, g = 0, b = 0;
            const totalPixels = data.length / 4;
            const sampleSize = 10;

            for (let i = 0; i < data.length; i += sampleSize * 4) {
                r += data[i];
                g += data[i + 1];
                b += data[i + 2];
            }

            r = Math.floor(r / (totalPixels / sampleSize));
            g = Math.floor(g / (totalPixels / sampleSize));
            b = Math.floor(b / (totalPixels / sampleSize));

            const newR = Math.floor((r * blendFactor) + (10 * (1 - blendFactor)));
            const newG = Math.floor((g * blendFactor) + (10 * (1 - blendFactor)));
            const newB = Math.floor((b * blendFactor) + (10 * (1 - blendFactor)));

            document.body.style.backgroundColor = `rgb(${newR}, ${newG}, ${newB})`;
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


    // Adjust blend factor with buttons
    decreaseBlendBtn.addEventListener('click', () => {
        if (blendFactor > 0) {
            blendFactor = Math.max(0, blendFactor - 0.05); // Decrease blend factor
        }
    });

    increaseBlendBtn.addEventListener('click', () => {
        if (blendFactor < 1) {
            blendFactor = Math.min(1, blendFactor + 0.05); // Increase blend factor
        }
    });