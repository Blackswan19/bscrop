// Function to clear stored media
function clearStoredMedia() {
    localStorage.removeItem("storedMedia");
    displayStoredMedia();
}

// Function to check if a video already exists in storedMedia
function videoExists(link) {
    const storedMedia = JSON.parse(localStorage.getItem("storedMedia")) || [];
    return storedMedia.some(media => media.link === link);
}

// Function to store a new video
function storeMedia() {
    const youtubeLink = document.getElementById("addYoutubeLink").value;
    const title = document.getElementById("videoTitle").value || "#savedvideo";
    const category = document.getElementById("categorySelect").value;

    if (!youtubeLink) {
        document.getElementById("addResult").textContent = "Enter a valid YouTube link.";
        return;
    }

    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    if (!regex.test(youtubeLink)) {
        document.getElementById("addResult").textContent = "Enter a valid YouTube link.";
        return;
    }

    let videoId;
    try {
        const urlObj = new URL(youtubeLink);
        if (urlObj.hostname === "youtu.be") {
            videoId = urlObj.pathname.slice(1);
        } else {
            videoId = urlObj.searchParams.get("v");
        }
    } catch (error) {
        document.getElementById("addResult").textContent = "Invalid YouTube link.";
        return;
    }

    if (!videoId) {
        document.getElementById("addResult").textContent = "Invalid YouTube link.";
        return;
    }

    const imageUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
    let storedMedia = JSON.parse(localStorage.getItem("storedMedia")) || [];
    storedMedia.push({
        image: imageUrl,
        link: youtubeLink,
        title: title,
        category: category,
    });
    localStorage.setItem("storedMedia", JSON.stringify(storedMedia));
    displayStoredMedia();
    closeAddMoviePopup();
}

// Function to display stored media
function displayStoredMedia(mediaList) {
    const displayArea = document.getElementById("displayArea");
    displayArea.innerHTML = '';

    const storedMedia = mediaList || JSON.parse(localStorage.getItem("storedMedia")) || [];
    filteredMedia = storedMedia;

    storedMedia.forEach((media, index) => {
        const mediaItem = document.createElement("div");
        mediaItem.style.textAlign = "center";
        mediaItem.innerHTML = `
            <img src="${media.image}" class="displayImage" onclick="openPopup(${index})">
            <p>${media.title || "#savedvideo"}</p>
        `;
        displayArea.appendChild(mediaItem);
    });
}

function openPopup(index) {
    currentIndex = index;
    const media = filteredMedia[index];
    document.getElementById("popupTitle").textContent = media.title;
    document.getElementById("popupImage").src = media.image;
    document.getElementById("popupOverlay").style.display = "flex";
}

function closePopup() {
    document.getElementById("popupOverlay").style.display = "none";
}

function playVideo() {
    const media = filteredMedia[currentIndex];
    const videoUrl = media.link;
    const modifiedUrl = modifyLink(videoUrl);
    window.open(modifiedUrl, "_self");
    closePopup();
}

function modifyLink(videoUrl) {
    let modifiedUrl = videoUrl;
    if (videoUrl.includes("youtu.be")) {
        modifiedUrl = `https://www.yout-ube.com/watch?v=${videoUrl.split("youtu.be/")[1].split("?")[0]}`;
    } else if (videoUrl.includes("youtube.com")) {
        modifiedUrl = videoUrl.replace(/youtube/i, "yout-ube");
    }
    return modifiedUrl;
}

function deleteMedia() {
    let storedMedia = JSON.parse(localStorage.getItem("storedMedia")) || [];
    if (currentIndex < 0 || currentIndex >= storedMedia.length) return;
    storedMedia.splice(currentIndex, 1);
    localStorage.setItem("storedMedia", JSON.stringify(storedMedia));
    filteredMedia = [...storedMedia];
    displayStoredMedia();
    closePopup();
}

function filterByCategory(category) {
    const storedMedia = JSON.parse(localStorage.getItem("storedMedia")) || [];
    filteredMedia = storedMedia.filter(media => media.category === category);
    displayStoredMedia(filteredMedia);
}

function filterMedia() {
    const searchQuery = document.getElementById("searchBar").value.toLowerCase();
    if (!searchQuery) {
        displayStoredMedia();
        return;
    }
    const filtered = filteredMedia.filter(media => media.title.toLowerCase().includes(searchQuery));
    displayStoredMedia(filtered);
}

function openAddMoviePopup() {
    document.getElementById("addMoviePopup").style.display = "flex";
}

function closeAddMoviePopup() {
    document.getElementById("addMoviePopup").style.display = "none";
}

window.onload = function () {
    displayStoredMedia();
};
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
