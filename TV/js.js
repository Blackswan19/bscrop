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

         // Drag-and-drop functionality on the drop area
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
               video.style.display = 'block';
               video.play();

               video.addEventListener('loadeddata', () => {
                  requestAnimationFrame(updateBackgroundColor);
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
            dropArea.style.display = 'block';
         });

         toggleOff.addEventListener('click', function() {
            video.controls = false;
            controlsContainer.style.display = 'none';
            title.style.display = 'none';
            toggleOff.style.display = 'none';
            toggleOn.style.display = 'block';
            progressContainer.style.display = 'none';
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

         progressContainer.addEventListener('click', function(event) {
            const rect = progressContainer.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const width = rect.width;
            const clickPosition = (x / width) * video.duration;
            video.currentTime = clickPosition;
         });

         progressContainer.addEventListener('mousedown', function(event) {
            const rect = progressContainer.getBoundingClientRect();
            const width = rect.width;

            function onMouseMove(e) {
               const x = e.clientX - rect.left;
               const dragPosition = (x / width) * video.duration;
               video.currentTime = Math.min(Math.max(dragPosition, 0), video.duration);
            }

            function onMouseUp() {
               document.removeEventListener('mousemove', onMouseMove);
               document.removeEventListener('mouseup', onMouseUp);
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
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

         document.addEventListener("DOMContentLoaded", () => {
            const subtitleBtn = document.getElementById("subtitle-btn");
            const subtitleIcon = subtitleBtn.querySelector("i");
            const track = document.getElementById("subtitle-track");
            let subtitlesEnabled = true;

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

            track.mode = "showing";
         });

         document.addEventListener("DOMContentLoaded", () => {
            const customMenu = document.querySelector(".custom-menu");

            document.addEventListener("contextmenu", (event) => {
               event.preventDefault();
               customMenu.style.display = "block";
               customMenu.style.top = `${event.pageY}px`;
               customMenu.style.left = `${event.pageX}px`;
            });

            document.addEventListener("click", () => {
               customMenu.style.display = "none";
            });
         });
