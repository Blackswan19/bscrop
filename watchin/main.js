let filteredMedia = [];
let currentIndex = -1;

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
        document.getElementById("addResult").textContent = "Enter a valid Youtube link.";
        return;
    }

    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    if (!regex.test(youtubeLink)) {
        document.getElementById("addResult").textContent = "Enter a valid Youtube link.";
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
    // Add new media at the beginning to display at the top
    storedMedia.unshift({
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

// Function to open the popup with media details
function openPopup(index) {
    currentIndex = index;
    const media = filteredMedia[index];
    document.getElementById("popupTitle").textContent = media.title;
    document.getElementById("popupImage").src = media.image;
    document.getElementById("popupOverlay").style.display = "flex";
}

// Function to close the popup
function closePopup() {
    document.getElementById("popupOverlay").style.display = "none";
}
// Function to play the video in a mini tab (popup window)
function playInMiniTab() {
    const media = filteredMedia[currentIndex];
    if (media) {
        // Open a popup window for the video player
        const popup = window.open('', 'VideoPlayer', 'width=800,height=450,resizable=yes,scrollbars=no');
        
        // Use the modified URL for the embed
        const modifiedUrl = modifyLink(media.link);
        const embedUrl = getEmbedUrl(modifiedUrl); // Get embed URL from modified link
        
        popup.document.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>BsVideosaver/playing/${media.title}   </title>
                
                <link rel="icon" type="image/x-icon" href="https://i.ibb.co/HqNHsqy/vidsave.png">
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Alata&family=Corinthia:wght@400;700&family=DM+Serif+Display:ital@0;1&family=Geologica:wght@100..900&family=Lavishly+Yours&family=League+Spartan:wght@100..900&family=Merriweather+Sans:ital,wght@0,300..800;1,300..800&family=Mrs+Saint+Delafield&family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        scroll-behavior: smooth;
                        font-family: "Prompt", sans-serif;
                    }

                    body { 
                        margin: 0; 
                        background: #000; 
                        color: white;
                    }
                    ::-webkit-scrollbar {
                        display: none;
                    }
                    .header {
                           background: #0000005c;
    padding: 10px 15px;
    align-items: center;
    position: fixed;
    backdrop-filter: blur(3px);
    display: flex
;
    gap: 10px;
    flex-direction: row-reverse;
    justify-content: flex-end;
       border-radius: 44px;
    top: 25px;
    left: 55px;
    max-width: 359px;
                    }
    // .header:hover{
    // left: 5px;
    // position: fixed;
    // transition: 1s;}
                    .header button {
                            padding: 11px 15px;
    font-size: 14px;
    border: none;
    border-radius: 35px;
    cursor: pointer;
    background-color: white;
    color: black;
    transition: background-color 0.3s;
    white-space: nowrap;

                    }
                    .header button:hover {
                        background-color: #0041ff; 
                        color: white;
                    }
                    .header .title {
                        font-size: 10px;
                        font-weight: 600;
                    }
                    iframe {
                        width: 100%;
                        height: calc(100vh - 50px);
                        border: none;
                        position: absolute;
                        z-index: -1;
                        top: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <span class="title">${media.title}</span>
                    <button onclick="window.opener.focus(); window.close()">Go Back</button>
                </div>
                <iframe src="${embedUrl}" frameborder="0" allowfullscreen></iframe>
            </body>
            </html>
        `);
        popup.document.close();
    }
}
// Function to convert YouTube URL to embed URL
function getEmbedUrl(youtubeLink) {
    const videoId = youtubeLink.match(/(?:v=|\/)([0-9A-Za-z_-]{11}).*/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : youtubeLink;
}

// Function to play the video
function playVideo() {
    const media = filteredMedia[currentIndex];
    const videoUrl = media.link;
    const modifiedUrl = modifyLink(videoUrl);
    window.open(modifiedUrl, "_self");
    closePopup();
}

// Function to modify YouTube link
function modifyLink(videoUrl) {
    let modifiedUrl = videoUrl;
    if (videoUrl.includes("youtu.be")) {
        modifiedUrl = `https://www.yout-ube.com/watch?v=${videoUrl.split("youtu.be/")[1].split("?")[0]}`;
    } else if (videoUrl.includes("youtube.com")) {
        modifiedUrl = videoUrl.replace(/youtube/i, "yout-ube");
    }
    return modifiedUrl;
}

// Function to delete media from the list
function deleteMedia() {
    let storedMedia = JSON.parse(localStorage.getItem("storedMedia")) || [];
    if (currentIndex < 0 || currentIndex >= storedMedia.length) return;
    storedMedia.splice(currentIndex, 1);
    localStorage.setItem("storedMedia", JSON.stringify(storedMedia));
    filteredMedia = [...storedMedia];
    displayStoredMedia();
    closePopup();
}

// Function to filter media by category
function filterByCategory(category) {
    const storedMedia = JSON.parse(localStorage.getItem("storedMedia")) || [];
    filteredMedia = storedMedia.filter(media => media.category === category);
    displayStoredMedia(filteredMedia);
}

// Function to filter media based on search input
function filterMedia(searchQuery) {
    const storedMedia = JSON.parse(localStorage.getItem("storedMedia")) || [];
    if (!searchQuery) {
        filteredMedia = storedMedia;
        displayStoredMedia(filteredMedia);
        return;
    }

    // Filter media by partial match of the search query
    filteredMedia = storedMedia.filter(media =>
        media.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    displayStoredMedia(filteredMedia);
}

// Add event listener for real-time search
document.getElementById("searchBar").addEventListener("input", (event) => {
    const searchQuery = event.target.value;
    filterMedia(searchQuery);
});
// Function to open the Add Movie popup
function openAddMoviePopup() {
    document.getElementById("addMoviePopup").style.display = "flex";
}

// Function to close the Add Movie popup
function closeAddMoviePopup() {
    document.getElementById("addMoviePopup").style.display = "none";
    document.getElementById("videoTitle").value = '';
    document.getElementById("addYoutubeLink").value = '';
    document.getElementById("addResult").textContent = '';
}

// Load media on page load
window.onload = function () {
    displayStoredMedia();
};

// // Context menu functionality
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
