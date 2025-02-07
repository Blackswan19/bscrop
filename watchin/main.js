
const newVideos = [
    {
        youtubeLink: "https://youtu.be/pZ1NdE69VTs?list=TLGGpq33LWYWi1AyMjExMjAyNA",
        title: "ROSÉ - number one girl (official music video)", 
        category: "songs"
    },
    {
        youtubeLink: "https://youtu.be/au3UVxGmpcQ?si=H58fyEtaTjc90aod",
        title: "Korean Living Alone for 3 years. A Cozy Christmas Preparation🎄", 
        category: "video"
    },
    {
        youtubeLink: "https://youtu.be/3phX7ZmbmzU?list=TLGGWjM04ZyveL4yMjExMjAyNA",
        title: "Sean Rii - Chu Chu", 
        category: "songs"
    },
    {
        youtubeLink: "https://youtu.be/lNUcO2L-OF0?list=TLGGAGJY1D4CB7QyMjExMjAyNA",
        title: "Gang Leader Telugu Full Movie", 
        category: "movie"
    },
    {
        youtubeLink: "https://youtu.be/GfeNCye40SY?si=IBK22iRNb7qQNVmq",
        title: "A perfect day in #Kyoto recommended by local friends 🌿 Japan travel vlog", 
        category: "video"
    },
    {
        youtubeLink: "https://www.youtube.com/watch?v=cZLLEu45Es4",
        title: "Day In The Life of A Young Millionaire In Dubai", 
        category: "video"
    },
    {
        youtubeLink: "https://youtu.be/MVeeRCRw5kM?si=kgveUfPKaxA2Hl44",
        title: "what it feels like to be a memory (playlist)", 
        category: "songs"
    },
    {
        youtubeLink: "https://youtu.be/M8r3x4Re8-I?si=zzVU_Bv8eYoxNHEC",
        title: "BABYMONSTER - 'LIKE THAT' EXCLUSIVE PERFORMANCE VIDEO", 
        category: "songs"
    },
    {
        youtubeLink: "https://youtu.be/O3kS6fjj-Qs?si=vc6h15mzUrW6CS4h",
        title: "'Noah Cyrus - July' Cover by DANIELLE | NewJeans", 
        category: "songs"
    },
    {
        youtubeLink: "https://youtu.be/KrLj6nc516A?si=zcy8CEASa4quUB5L",
        title: "$1 vs $100,000,000 Car!", 
        category: "video"
    },
    {
        youtubeLink: "https://youtu.be/MUMCZZl9QCY?si=ReuQLdJD0r7hl1T_",
        title: "हिंदी Oggy and the Cockroaches 🔧 KEYS & IDEAS 🔧 Hindi Cartoons for Kids", 
        category: "video"
    },
    
    {
        youtubeLink: "https://www.youtube.com/watch?v=yoWJfsk0gvk&list=RDyoWJfsk0gvk&start_radio=1",
        title: "Bruno Mars, Anderson .Paak, Silk Sonic - Leave The Door Open (Live from the BET Awards)", 
        category: "songs"
    },
    {
        youtubeLink: "https://youtu.be/XoiOOiuH8iI?si=9steXBgO5nlKodVM",
        title: "Tyla - Water (Official Music Video)", 
        category: "songs"
    },
    {
        youtubeLink: "https://youtu.be/fRh_vgS2dFE?si=rWaYzP4Q6ez7fILL",
        title: "Justin Bieber - Sorry (PURPOSE : The Movement)", 
        category: "songs"
    },
    {
        youtubeLink: "https://youtu.be/IECkeup9njg?si=khl95DgjdMYuMZ3s",
        title: "Nothing CEO & Apple Employee Review iPhone 15 Pro", 
        category: "video"
    },
    {
        youtubeLink: "https://youtu.be/AFxCO_DyzYM?si=ZxCUZrPpylkrTnC-",
        title: "Bruno Mars Carpool Karaoke", 
        category: "video"
    },
    {
        youtubeLink: "https://youtu.be/A7tikkWLBE8?si=6ma3qa7YWC3DWPp_",
        title: "The Best Of The Internet (2021)", 
        category: "video"
    },
    {
        youtubeLink: "https://youtu.be/T9uQzj1-I5k?si=iOCGDlRhTWoIj9Tk",
        title: "Rosé answers questions from Bella Poarch, Devon Lee Carlson, Benny Blanco and many more | i-D Asks", 
        category: "video"
    },
    {
        youtubeLink: "https://youtu.be/r6WbbU_lLCA?si=mRqjMBucbbcCSKf2",
        title: "j-hope 'on the street (with J. Cole)' Official MV", 
        category: "songs"
    },
    {
        youtubeLink: "https://youtu.be/u18be_kRmC0?si=eLIGMMAw4LaoxrLH",
        title: "RM 'Wild Flower (with youjeen)' Official MV", 
        category: "songs"
    },
    {
        youtubeLink: "https://youtu.be/8ofCZObsnOo?si=5ALqaajv_Mi4tEug",
        title: "Chord Overstreet - Hold On (Lyric Video)", 
        category: "songs"
    },
    {
        youtubeLink: "https://youtu.be/JleoAppaxi0?si=KSeQ0k8OI19Z6Auw",
        title: "IU 'Love wins all' MV", 
        category: "songs"
    },
    {
        youtubeLink: "https://youtu.be/5ihFB4ZCnFY?si=NiYmkKEptXedtCLt",
        title: "Rosé Cooks Kimchi Fried Rice Dinner | Now Serving | Vogue", 
        category: "video"
    },
    {
        youtubeLink: "https://youtu.be/eJCHKjt0MPw?si=5XC22nxXq-kxBaps",
        title: "BABYMONSTER - ‘FOREVER’ M/V", 
        category: "songs"
    },
    {
        youtubeLink: "https://youtu.be/rGD5U8u1Dk0?si=7O96GSTYdQF4xViY",
        title: "1-800-hot-n-fun", 
        category: "songs"
    },
    {
        youtubeLink: "https://youtu.be/ekr2nIex040?si=gevaqInARPlAjM3W",
        title: "ROSÉ & Bruno Mars - APT. (Official Music Video)", 
        category: "songs"
    },
    {
        youtubeLink: "https://youtu.be/UNo0TG9LwwI?si=isiu1rFOg0ErT4kc",
        title: "정국 (Jung Kook) 'Standing Next to You' Official MV", 
        category: "songs"
    },
    {
        youtubeLink: "https://youtu.be/xvzrj8zmVaA?si=sLz0fUrvCqYakNts",
        title: "John Deere Mähdrescher S685i mit Raupe, 640D 12,34 m SW, biggest combine harvester - wheat harvest", 
        category: "video"
    },
    {
        youtubeLink: "https://youtu.be/tYf0BoFe9D8?si=s1bkDe9z9ajto3mn",
        title: "100 Days Building A Modern Underground Hut With A Grass Roof And A Swimming Pool", 
        category: "video"
    },
    {
        youtubeLink: "https://youtu.be/Qs2-klYtq5Y?si=RXrobyJf-ibHSY4O",
        title: "The Most BEAUTIFUL Earth Video You'll Ever See in 4K HDR 60 FPS", 
        category: "video"
    },
    {
        youtubeLink: "https://youtu.be/tZPQaihwZRA?si=YKGbZ7uCR_f6jvev",
        title: "Craziest Nature Videos of the Decade", 
        category: "video"
    },
    {
        youtubeLink: "https://youtu.be/K-mV_8aeQsk?si=8LIJYCP3kunU2Mct",
        title: "Most Unbelievable Moments Ever Caught On Camera !", 
        category: "video"
    },
    {
        youtubeLink: "https://youtu.be/JHnR-HdvTAA?si=hBKpOmRI8he2bCSE",
        title: "Google’s first mass timber building in Sunnyvale, CA", 
        category: "video"
    },
    {
        youtubeLink: "https://youtu.be/BVvnSzMqI3M?si=RHkPk6QDv7ZXr88A",
        title: "How LUXURY Rolls-Royce Cars Are Made ? (Mega Factories Video)", 
        category: "video"
    },
    {
        youtubeLink: "https://youtu.be/0eKVizvYSUQ?si=yWBAwF2yYxwUvYH2",
        title: "How Google Search Works (in 5 minutes)", 
        category: "video"
    },
    {
        youtubeLink: "https://youtu.be/Vy9X76ReGog?si=uqMKZgkKvOBsB5wD",
        title: "HUH YUNJIN from LE SSERAFIM reveals her creative inspo with Google Arts & Culture | Culture Threads", 
        category: "video"
    },
    {
        youtubeLink: "https://youtu.be/3KtWfp0UopM?si=_soRzghpr4ISIpPj",
        title: "Google — 25 Years in Search: The Most Searched", 
        category: "video"
    },
    {
        youtubeLink: "https://youtu.be/IN5TD4VRcSM?si=od2eMpzipS_aCxLV",
        title: "All of Us Are Dead | Official Trailer | Netflix", 
        category: "moive"
    },
    {
        youtubeLink: "https://youtu.be/pBuZEGYXA6E?si=4QXFRPMNfoPRHv9t",
        title: "BTS (방탄소년단) 'IDOL' Official MV", 
        category: "songs"
    },
    {
        youtubeLink: "https://youtu.be/Hz2F_S3Tl0Y?si=krg75tngZ8MXfLQc",
        title: "I Jumped From Space (World Record Supersonic Freefall)", 
        category: "video"
    },
    {
        youtubeLink: "https://youtu.be/gE3rXcUjqo4?si=IGfFpK2VHpZ1k0Oi",
        title: "Varun Tej & Rashi Khanna's Romantic Drama Full Length Movie", 
        category: "movie"
    },
    {
        youtubeLink: "https://youtu.be/T0XhbYcwD4k?si=O4xYqxv_zs-g25tR",
        title: "어느 날 갑자기 쓰나미가 부산을 덮쳤다 [뭅뭅픽] 해운대 | Haeundae | 설경구 하지원 박중훈 엄정화 이민기 강예원 김인권 송재호 김지영", 
        category: "movie"
    },
    {
        youtubeLink: "https://youtu.be/es4x5R-rV9s?si=3GukZsBU1L1_fBwa",
        title: "Amazon 4k - The World’s Largest Tropical Rainforest Part 2 | Jungle Sounds | Scenic Relaxation Film", 
        category: "video"
    },
    
    
];

// Function to check if a video already exists in storedMedia
function videoExists(link) {
    const storedMedia = JSON.parse(localStorage.getItem("storedMedia")) || [];
    return storedMedia.some(media => media.link === link); // Check if video with the same link exists
}

// Loop through the new videos and process each one
newVideos.forEach(video => {
    if (videoExists(video.youtubeLink)) {
        console.log(`Video with link ${video.youtubeLink} already exists. Skipping...`);
        return; // Skip adding this video if it already exists
    }

    let videoId;
    try {
        const urlObj = new URL(video.youtubeLink);
        if (urlObj.hostname === "youtu.be") {
            videoId = urlObj.pathname.slice(1); // For youtu.be links
        } else {
            videoId = urlObj.searchParams.get("v"); // For youtube.com links
        }
    } catch (error) {
        console.log("Invalid YouTube link.");
    }

    // Generate thumbnail URL
    const imageUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;

    let storedMedia = JSON.parse(localStorage.getItem("storedMedia")) || [];
    storedMedia.push({
        image: imageUrl,
        link: video.youtubeLink,
        title: video.title,
        category: video.category, // Save category
    });

    // Save the updated list to localStorage
    localStorage.setItem("storedMedia", JSON.stringify(storedMedia));
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
})
      
let currentIndex;
        let filteredMedia = []; // Keeps track of the filtered results.

        function storeMedia() {
            const youtubeLink = document.getElementById("addYoutubeLink").value;
            const title = document.getElementById("videoTitle").value || "#savedvideo";
            const category = document.getElementById("categorySelect").value; // Get category

            if (!youtubeLink) {
                document.getElementById("addResult").textContent = "Enter a valid YouTube link.";
                return;
            }

            const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
            if (!regex.test(youtubeLink)) {
                document.getElementById("addResult").textContent = "Enter a valid YouTube link.";
                return;
            }

            // Extract videoId from URL
            let videoId;
            try {
                const urlObj = new URL(youtubeLink);
                if (urlObj.hostname === "youtu.be") {
                    videoId = urlObj.pathname.slice(1); // For youtu.be links
                } else {
                    videoId = urlObj.searchParams.get("v"); // For youtube.com links
                }
            } catch (error) {
                document.getElementById("addResult").textContent = "Invalid YouTube link.";
                return;
            }

            if (!videoId) {
                document.getElementById("addResult").textContent = "Invalid YouTube link.";
                return;
            }

            // Generate thumbnail URL
            const imageUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;

            let storedMedia = JSON.parse(localStorage.getItem("storedMedia")) || [];
            storedMedia.push({
                image: imageUrl,
                link: youtubeLink,
                title: title,
                category: category, // Save category
            });

            localStorage.setItem("storedMedia", JSON.stringify(storedMedia));

            displayStoredMedia();
            closeAddMoviePopup();
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
    const media = filteredMedia[currentIndex]; // Play video from filteredMedia
    const videoUrl = media.link;
    const modifiedUrl = modifyLink(videoUrl);
    window.open(modifiedUrl, "_self");
    closePopup();
}

        function deleteMedia() {
            let storedMedia = JSON.parse(localStorage.getItem("storedMedia")) || [];
            storedMedia.splice(currentIndex, 1);
            localStorage.setItem("storedMedia", JSON.stringify(storedMedia));
            displayStoredMedia();
            closePopup();
        }

        function filterByCategory(category) {
            const storedMedia = JSON.parse(localStorage.getItem("storedMedia")) || [];
            filteredMedia = storedMedia.filter(media => media.category === category); // Filter by category
            displayStoredMedia(filteredMedia);
        }

        function filterMedia() {
    const searchQuery = document.getElementById("searchBar").value.toLowerCase();
    if (!searchQuery) {
        // If the search bar is empty, display all stored media
        displayStoredMedia();
        return;
    }

    // Filter the media based on the search query
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
            displayStoredMedia(); // Displays all media on page load
        };
