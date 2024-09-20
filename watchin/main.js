 // Function to toggle the visibility of the search bar
 function toggleSearchBar() {
    const searchBar = document.getElementById('searchBar');
    if (searchBar.style.display === 'none') {
        searchBar.style.display = 'block';
    } else {
        searchBar.style.display = 'none';
    }
}
// Function to modify the YouTube link as per the provided logic
function modifyLink() {
    const userInput = document.getElementById("userLink").value;
    let modifiedLink = userInput;

    // Check if the link is a 'youtu.be' short link
    if (userInput.toLowerCase().includes("youtu.be")) {
        // Extract video ID from youtu.be link and format it as youtube.com/watch?v=VIDEO_ID
        const videoId = userInput.split("youtu.be/")[1].split("?")[0]; // Get the video ID
        modifiedLink = `https://www.yout-ube.com/watch?v=${videoId}`;
        
    } else if (userInput.toLowerCase().includes("youtube.com")) {
        // For youtube.com links, replace 'youtube' with 'yout-ube'
        modifiedLink = userInput.replace(/youtube/i, "yout-ube");
    }

    // Check if the modified link is valid (must be a proper YouTube link)
    if (modifiedLink.includes("yout-ube.com/watch?v=")) {
        // Show the Play button and Fullscreen button
        document.getElementById("result").innerHTML = `
            <button onclick="window.open('${modifiedLink}', '_self')">Play the moive</button>
        `;
    } else {
        document.getElementById("result").innerHTML = "Invalid URL";
    }
}