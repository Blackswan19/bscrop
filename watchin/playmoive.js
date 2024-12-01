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
let videoUrl, currentTitle, currentDescription; function openPopup(imageSrc, video, title, description) { document.getElementById('popupOverlay').style.display = 'flex'; document.getElementById('popupImage').src = imageSrc; videoUrl = video; currentTitle = title; currentDescription = description; document.getElementById('movieTitle').innerText = currentTitle; document.getElementById('movieDescription').innerText = currentDescription; } function closePopup() { document.getElementById('popupOverlay').style.display = 'none'; } function modifyLink(videoUrl) { let modifiedUrl = videoUrl; if (videoUrl.includes("youtu.be")) { modifiedUrl = `https://www.yout-ube.com/watch?v=${videoUrl.split("youtu.be/")[1].split("?")[0]}`; } else if (videoUrl.includes("youtube.com")) { modifiedUrl = videoUrl.replace(/youtube/i, "yout-ube"); } if (modifiedUrl.includes("yout-ube.com/watch?v=")) { window.open(modifiedUrl, "_self"); } else { document.getElementById("result").innerHTML = "Invalid URL"; } } function playVideo() { modifyLink(videoUrl); }              
function toggleSearchBar() {
    const searchBar = document.getElementById('searchBar');
    if (searchBar.style.display === 'none' || searchBar.style.display === '') {
        searchBar.style.display = 'block';
        searchBar.focus();
    } else {
        searchBar.style.display = 'none';
    }
}

// Search movies
function searchMovies() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const movies = document.querySelectorAll('#movieList img');
    movies.forEach(movie => {
        const title = movie.getAttribute('data-title').toLowerCase();
        if (title.includes(query)) {
            movie.style.display = 'block';
        } else {
            movie.style.display = 'none';
        }
    });
}