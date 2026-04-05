// ==================== Element Selection ====================
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
const helpBtn = document.getElementById('helpBtn');
const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');
const closePopup = document.getElementById('closePopup');
const progressContainer = document.getElementById('progress-container');
const brightnessValue = document.getElementById('brightness-value');
const blendFactorLevel = document.getElementById('blend-factor-level');
const previewContainer = document.getElementById('preview-container');
const previewCanvas = document.getElementById('preview-canvas');
const previewCtx = previewCanvas.getContext('2d');
const durationDisplay = document.getElementById('duration-display');
const previewTimestamp = document.getElementById('preview-timestamp');

const videoUpload = document.getElementById('video-upload');
const uploadBtn = document.getElementById('upload-btn');
const uploadStatus = document.getElementById('upload-status');

const volumeBtn = document.getElementById('volume-btn');
const volumeSlider = document.getElementById('volume-slider');
const volumePercentage = document.getElementById('volume-percentage');

let blendFactor = 0.60;
const previewVideo = document.createElement('video');
previewVideo.muted = true;

function showCenterBsTv() {
    title.style.position = 'fixed';
    title.style.top = '50%';
    title.style.left = '50%';
    title.style.transform = 'translate(-50%, -50%)';
    title.style.fontSize = '8rem';
    title.style.fontWeight = '900';
    title.style.color = '#ffffff';
    title.style.zIndex = '1';
    title.style.pointerEvents = 'none';
    title.style.transition = 'opacity 0.6s ease';
    title.style.display = 'block';
    title.textContent = 'BsTv';
}

function hideBsTv() {
    title.style.display = 'none';
}

function updateBsTvVisibility() {
    if (video.paused || video.ended) {
        showCenterBsTv();
    } else {
        hideBsTv();
    }
}
function hideAllControls() {
    video.controls = false;
    controlsContainer.style.display = 'none';
    progressContainer.style.display = 'none';
    durationDisplay.style.display = 'none';
    previewContainer.style.display = 'none';
    helpBtn.style.display = 'none';
    uploadBtn.style.display = 'none';
    volumeBtn.style.display = 'none';
    volumeSlider.style.display = 'none';
    volumePercentage.style.display = 'none';
    toggleOff.style.display = 'none';
    updateBsTvVisibility();
}

function showAllControls() {
    controlsContainer.style.display = 'block';
    progressContainer.style.display = 'block';
    durationDisplay.style.display = 'block';
    helpBtn.style.display = 'block';
    uploadBtn.style.display = 'block';
    volumeBtn.style.display = 'block';
    volumeSlider.style.display = 'block';
    volumePercentage.style.display = 'block';
    
    toggleOn.style.display = 'none';
    toggleOff.style.display = 'block';
    hideBsTv();
}

hideAllControls();

toggleOn.addEventListener('click', showAllControls);

toggleOff.addEventListener('click', () => {
    hideAllControls();
    toggleOn.style.display = 'block';
});

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

uploadBtn.addEventListener('click', () => videoUpload.click());

videoUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
        uploadStatus.textContent = `Loading: ${file.name}`;
        uploadStatus.style.color = '#0f0';
        loadVideo(file);
    } else {
        uploadStatus.textContent = 'Please select a valid video file.';
        uploadStatus.style.color = '#f00';
    }
});

function loadVideo(file) {
    const videoURL = URL.createObjectURL(file);
    video.src = videoURL;
    previewVideo.src = videoURL;
    video.style.display = 'block';
    video.play();

    video.addEventListener('loadeddata', () => {
        requestAnimationFrame(updateBackgroundColor);
        updateDurationDisplay();
        updateVolumeDisplay();
        uploadStatus.textContent = `Loaded: ${file.name}`;
    }, { once: true });

    video.addEventListener('play', () => {
        document.body.style.backgroundColor = '#050505';
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        }
        requestAnimationFrame(updateBackgroundColor);
        updateBsTvVisibility();
    });

    video.addEventListener('pause', () => {
        exitFullscreen();
        updateBsTvVisibility();
    });

    video.addEventListener('ended', () => {
        exitFullscreen();
        document.body.style.backgroundColor = '#0a0a0a';
        updateBsTvVisibility();
    });

    video.addEventListener('timeupdate', () => {
        const progressPercentage = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        updateDurationDisplay();
    });
}

function exitFullscreen() {
    if (document.exitFullscreen) document.exitFullscreen();
}

function updateBackgroundColor() {
    if (video.paused || video.ended) return;

    if (video.videoWidth > 0 && video.videoHeight > 0) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let r = 0, g = 0, b = 0, brightness = 0;
        const sampleSize = 10;
        const totalPixels = data.length / 4;

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

        brightnessValue.textContent = Math.min(Math.max((brightness / 255) * 100, 0), 100).toFixed(2);

        const newR = Math.floor((r * blendFactor) + (10 * (1 - blendFactor)));
        const newG = Math.floor((g * blendFactor) + (10 * (1 - blendFactor)));
        const newB = Math.floor((b * blendFactor) + (10 * (1 - blendFactor)));

        document.body.style.backgroundColor = `rgb(${newR}, ${newG}, ${newB})`;
    }
    requestAnimationFrame(updateBackgroundColor);
}

decreaseBlendBtn.addEventListener('click', () => {
    blendFactor = Math.max(0, blendFactor - 0.1);
    updateBlendFactorDisplay();
});

increaseBlendBtn.addEventListener('click', () => {
    blendFactor = Math.min(1, blendFactor + 0.1);
    updateBlendFactorDisplay();
});

function updateBlendFactorDisplay() {
    blendFactorLevel.textContent = Math.round(blendFactor * 10);
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function updateDurationDisplay() {
    if (video.duration) {
        durationDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
    }
}

video.volume = 1.0;

function updateVolumeDisplay() {
    if (!volumeSlider || !volumePercentage) return;
    
    volumeSlider.value = video.volume;
    volumePercentage.textContent = `${Math.round(video.volume * 100)}%`;

    const icon = volumeBtn ? volumeBtn.querySelector('i') : null;
    if (icon) {
        icon.classList.remove('fa-volume-up', 'fa-volume-down', 'fa-volume-mute');
        if (video.volume === 0) icon.classList.add('fa-volume-mute');
        else if (video.volume < 0.5) icon.classList.add('fa-volume-down');
        else icon.classList.add('fa-volume-up');
    }
}

volumeSlider.addEventListener('input', () => {
    video.volume = parseFloat(volumeSlider.value);
    updateVolumeDisplay();
});

volumeBtn.addEventListener('click', () => {
    if (video.volume > 0) {
        video.dataset.lastVolume = video.volume;
        video.volume = 0;
    } else {
        video.volume = parseFloat(video.dataset.lastVolume) || 1.0;
    }
    updateVolumeDisplay();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        video.volume = Math.min(1, video.volume + 0.1);
        updateVolumeDisplay();
    }
    if (e.key === 'ArrowDown') {
        video.volume = Math.max(0, video.volume - 0.1);
        updateVolumeDisplay();
    }
});

function seekToTime(event, isClick = false) {
    const rect = progressContainer.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const seekTime = (x / rect.width) * video.duration;
    const finalTime = Math.min(Math.max(seekTime, 0), video.duration);
    if (isClick) video.currentTime = finalTime;
    return finalTime;
}

progressContainer.addEventListener('click', (e) => seekToTime(e, true));

progressContainer.addEventListener('mousedown', (e) => {
    seekToTime(e, true);
    const moveHandler = (ev) => seekToTime(ev, true);
    const upHandler = () => {
        document.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('mouseup', upHandler);
    };
    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);
});

async function updatePreview(seekTime) {
    if (previewContainer.style.display !== 'block' || previewVideo.readyState < 2) return;
    try {
        previewVideo.currentTime = seekTime;
        await new Promise(resolve => { previewVideo.onseeked = resolve; });
        previewCanvas.width = 160;
        previewCanvas.height = 90;
        previewCtx.drawImage(previewVideo, 0, 0, 160, 90);
        previewTimestamp.textContent = formatTime(seekTime);
    } catch (err) {}
}

progressContainer.addEventListener('mousemove', (e) => {
    if (video.readyState < 2 || previewVideo.readyState < 2) return;
    const seekTime = seekToTime(e);
    previewContainer.style.display = 'block';
    const rect = progressContainer.getBoundingClientRect();
    previewContainer.style.left = `${Math.min(Math.max(e.clientX - 80, rect.left), rect.right - 160)}px`;
    updatePreview(seekTime);
});

progressContainer.addEventListener('mouseleave', () => {
    previewContainer.style.display = 'none';
});

document.addEventListener("DOMContentLoaded", () => {
    const playPauseBtn = document.getElementById("play-pause-btn");
    const playPauseIcon = playPauseBtn?.querySelector("i");
    const forwardBtn = document.getElementById("forward-btn");
    const backwardBtn = document.getElementById("backward-btn");

    playPauseBtn?.addEventListener("click", () => {
        if (video.paused || video.ended) {
            video.play();
            if (playPauseIcon) playPauseIcon.classList.replace("fa-play", "fa-pause");
        } else {
            video.pause();
            if (playPauseIcon) playPauseIcon.classList.replace("fa-pause", "fa-play");
        }
    });

    video.addEventListener("play", () => {
        if (playPauseIcon) playPauseIcon.classList.replace("fa-play", "fa-pause");
        updateBsTvVisibility();
    });

    video.addEventListener("pause", () => {
        if (playPauseIcon) playPauseIcon.classList.replace("fa-pause", "fa-play");
        updateBsTvVisibility();
    });

    forwardBtn?.addEventListener("click", () => video.currentTime += 10);
    backwardBtn?.addEventListener("click", () => {
        video.currentTime = Math.max(0, video.currentTime - 10);
    });
});

video.addEventListener('loadedmetadata', updateVolumeDisplay);
