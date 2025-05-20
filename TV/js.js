const video = document.getElementById('video');
         const canvas = document.getElementById('canvas');
         const ctx = canvas.getContext('2d');
         const title = document.getElementById('title');
         const progressBar = document.getElementById('progress-bar');
         const toggleOn = document.getElementById('toggle-on');
         const toggleOff = document.getElementById('toggle-off');
         const decreaseBlendBtn = document.getElementById('decrease-blend');
         const increaseBlendBtn = document.getElementById('increase-blend');
         const controlsContainer = document.getElementById('controls-container');
         let blendFactor = 0.60;
         const helpBtn = document.getElementById('helpBtn');
         const popup = document.getElementById('popup');
         const overlay = document.getElementById('overlay');
         const closePopup = document.getElementById('closePopup');
         const progressContainer = document.getElementById('progress-container');
         const brightnessValue = document.getElementById('brightness-value');
         const blendFactorLevel = document.getElementById('blend-factor-level');
         const dropArea = document.getElementById('drop-area');
         const previewContainer = document.getElementById('preview-container');
         const previewCanvas = document.getElementById('preview-canvas');
         const previewCtx = previewCanvas.getContext('2d');
         const durationDisplay = document.getElementById('duration-display');
         const previewTimestamp = document.getElementById('preview-timestamp');

         // Create a temporary off-screen video element for preview
         const previewVideo = document.createElement('video');
         previewVideo.muted = true;

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

         video.controls = false;
         title.style.display = 'block';

         // Drag-and-drop functionality
         dropArea.addEventListener('dragover', (event) => {
            event.preventDefault();
            dropArea.classList.add('dragover');
         });

         dropArea.addEventListener('dragleave', () => {
            dropArea.classList.remove('dragover');
         });

         dropArea.addEventListener('drop', (event) => {
            event.preventDefault();
            dropArea.classList.remove('dragover');
            const file = event.dataTransfer.files[0];
            if (file && file.type.startsWith('video/')) {
               const videoURL = URL.createObjectURL(file);
               video.src = videoURL;
               previewVideo.src = videoURL;
               video.style.display = 'block';
               video.play();

               video.addEventListener('loadeddata', () => {
                  requestAnimationFrame(updateBackgroundColor);
                  updateDurationDisplay();
               });

               video.addEventListener('play', () => {
                  document.body.style.backgroundColor = '#050505';
                  if (document.documentElement.requestFullscreen) {
                     document.documentElement.requestFullscreen();
                  }
                  requestAnimationFrame(updateBackgroundColor);
               });

               video.addEventListener('pause', () => {
                  exitFullscreen();
               });

               video.addEventListener('ended', () => {
                  exitFullscreen();
                  document.body.style.backgroundColor = '#0a0a0a';
               });

               video.addEventListener('timeupdate', () => {
                  const progressPercentage = (video.currentTime / video.duration) * 100;
                  progressBar.style.width = progressPercentage + '%';
                  updateDurationDisplay();
               });
            } else {
               alert('Please drop a valid video file.');
            }
         });

         function exitFullscreen() {
            if (document.exitFullscreen) {
               document.exitFullscreen();
            }
         }

         function updateBackgroundColor() {
            if (!video.paused && !video.ended) {
               if (video.videoWidth > 0 && video.videoHeight > 0) {
                  canvas.width = video.videoWidth;
                  canvas.height = video.videoHeight;
                  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  const data = imageData.data;
                  let r = 0, g = 0, b = 0, brightness = 0;
                  const totalPixels = data.length / 4;
                  const sampleSize = 10;

                  for (let i = 0; i < data.length; i += sampleSize * 4) {
                     r += data[i];
                     g += data[i + 1];
                     b += data[i + 2];
                     brightness += (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]);
                  }

                  r = Math.floor(r / (totalPixels / sampleSize));
                  g = Math.floor(g / (totalPixels / sampleSize));
                  b = Math.floor(b / (totalPixels / sampleSize));
                  brightness = Math.floor(brightness / (totalPixels / sampleSize));

                  const brightnessPercentage = Math.min(Math.max((brightness / 255) * 100, 0), 100);
                  brightnessValue.textContent = brightnessPercentage.toFixed(2);

                  const newR = Math.floor((r * blendFactor) + (10 * (1 - blendFactor)));
                  const newG = Math.floor((g * blendFactor) + (10 * (1 - blendFactor)));
                  const newB = Math.floor((b * blendFactor) + (10 * (1 - blendFactor)));

                  document.body.style.backgroundColor = `rgb(${newR}, ${newG}, ${newB})`;
               }
               requestAnimationFrame(updateBackgroundColor);
            }
         }

         toggleOn.addEventListener('click', function() {
            video.controls = true;
            controlsContainer.style.display = 'block';
            title.style.display = 'block';
            toggleOn.style.display = 'none';
            toggleOff.style.display = 'block';
            progressContainer.style.display = 'block';
            durationDisplay.style.display = 'block';
            dropArea.style.display = 'block';
         });

         toggleOff.addEventListener('click', function() {
            video.controls = false;
            controlsContainer.style.display = 'none';
            title.style.display = 'none';
            toggleOff.style.display = 'none';
            toggleOn.style.display = 'block';
            progressContainer.style.display = 'none';
            durationDisplay.style.display = 'none';
            dropArea.style.display = 'none';
         });

         decreaseBlendBtn.addEventListener('click', () => {
            if (blendFactor > 0) {
               blendFactor = Math.max(0, blendFactor - 0.1);
               updateBlendFactorDisplay();
            }
         });

         increaseBlendBtn.addEventListener('click', () => {
            if (blendFactor < 1) {
               blendFactor = Math.min(1, blendFactor + 0.1);
               updateBlendFactorDisplay();
            }
         });

         function updateBlendFactorDisplay() {
            const blendFactorLevelValue = Math.round(blendFactor * 10);
            blendFactorLevel.textContent = blendFactorLevelValue;
         }

         function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
         }

         function updateDurationDisplay() {
            if (video.duration) {
               durationDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
            }
         }

         // Progress bar interaction
         let lastSeekTime = 0;

         function seekToTime(event, isClick = false) {
            const rect = progressContainer.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const width = rect.width;
            const seekTime = (x / width) * video.duration;
            lastSeekTime = Math.min(Math.max(seekTime, 0), video.duration);
            if (isClick) {
               video.currentTime = lastSeekTime;
            }
            return lastSeekTime;
         }

         progressContainer.addEventListener('click', function(event) {
            const seekTime = seekToTime(event, true);
            console.log(`Clicked to seek to: ${seekTime.toFixed(2)}s`);
         });

         progressContainer.addEventListener('mousedown', function(event) {
            seekToTime(event, true);

            function onMouseMove(e) {
               seekToTime(e, true);
            }

            function onMouseUp() {
               document.removeEventListener('mousemove', onMouseMove);
               document.removeEventListener('mouseup', onMouseUp);
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
         });

         // Preview on hover
         async function updatePreview(seekTime) {
            if (previewContainer.style.display !== 'block' || previewVideo.readyState < 2) return;

            try {
               previewVideo.currentTime = seekTime;
               await new Promise((resolve) => {
                  previewVideo.onseeked = resolve;
                  previewVideo.onerror = () => {
                     console.error('Preview video seek error');
                     resolve();
                  };
               });

               previewCanvas.width = 160;
               previewCanvas.height = 90;
               previewCtx.drawImage(previewVideo, 0, 0, previewVideo.videoWidth, previewVideo.videoHeight, 0, 0, 160, 90);
               previewTimestamp.textContent = formatTime(seekTime);
            } catch (error) {
               console.error('Error updating preview:', error);
            }
         }

         progressContainer.addEventListener('mousemove', function(event) {
            if (video.readyState >= 2 && previewVideo.readyState >= 2) {
               const seekTime = seekToTime(event);
               previewContainer.style.display = 'block';
               const rect = progressContainer.getBoundingClientRect();
               previewContainer.style.left = `${Math.min(Math.max(event.clientX - 80, rect.left), rect.right - 160)}px`;
               updatePreview(seekTime);
            }
         });

         progressContainer.addEventListener('mouseleave', () => {
            previewContainer.style.display = 'none';
            previewVideo.onseeked = null;
            previewVideo.onerror = null;
         });

         document.addEventListener("DOMContentLoaded", () => {
            const playPauseBtn = document.getElementById("play-pause-btn");
            const playPauseIcon = playPauseBtn.querySelector("i");
            const forwardBtn = document.getElementById("forward-btn");
            const backwardBtn = document.getElementById("backward-btn");

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

            video.addEventListener("play", () => {
               playPauseIcon.classList.remove("fa-play");
               playPauseIcon.classList.add("fa-pause");
            });

            video.addEventListener("pause", () => {
               playPauseIcon.classList.remove("fa-pause");
               playPauseIcon.classList.add("fa-play");
            });

            forwardBtn.addEventListener("click", () => {
               video.currentTime += 10;
            });

            backwardBtn.addEventListener("click", () => {
               video.currentTime -= 10;
               if (video.currentTime < 0) video.currentTime = 0;
            });
         });

         // Subtitle handling (retained with null check)
         document.addEventListener("DOMContentLoaded", () => {
            const subtitleBtn = document.getElementById("subtitle-btn");
            const subtitleIcon = subtitleBtn?.querySelector("i");
            const track = document.getElementById("subtitle-track");
            let subtitlesEnabled = true;

            if (subtitleBtn) {
               subtitleBtn.addEventListener("click", () => {
                  subtitlesEnabled = !subtitlesEnabled;
                  track.mode = subtitlesEnabled ? "showing" : "hidden";
                  if (subtitlesEnabled) {
                     subtitleIcon.classList.add("fa-closed-captioning");
                     subtitleIcon.classList.remove("fa-closed-captioning-slash");
                  } else {
                     subtitleIcon.classList.remove("fa-closed-captioning");
                     subtitleIcon.classList.add("fa-closed-captioning-slash");
                  }
               });
            }

            track.mode = "showing";
         });
