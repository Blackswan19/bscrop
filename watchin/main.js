// --- Data & state ---
        let filteredMedia = [];
        let currentIndex = -1;

        function displayStoredMedia(mediaList){
            const area = document.getElementById('displayArea');
            area.innerHTML = '';
            const stored = mediaList || JSON.parse(localStorage.getItem('storedMedia')) || [];
            filteredMedia = stored;

            // create cards
            stored.forEach((m, i) => {
                const card = document.createElement('article');
                card.className = 'card';

                const thumb = document.createElement('div');
                thumb.className = 'thumb';
                thumb.innerHTML = `<img src="${m.image}" loading="lazy" alt="${(m.title||'saved video').replace(/"/g,'')}"><div class="play"><i class="fa-solid fa-play"></i></div>`;
                thumb.addEventListener('click', () => openPopup(i));

                const meta = document.createElement('div');
                meta.className = 'meta';
                meta.innerHTML = `<div class="title">${m.title || '#savedvideo'}</div><div class="cat">${m.category || ''}</div>`;

                card.appendChild(thumb);
                card.appendChild(meta);

                area.appendChild(card);
            });
        }

        function openPopup(index){
            currentIndex = index;
            const media = filteredMedia[index];
            if(!media) return;
            document.getElementById('popupTitle').textContent = media.title || '#savedvideo';
            document.getElementById('popupImage').src = media.image;
            document.getElementById('popupOverlay').classList.add('active');
        }
        function closePopup(){ document.getElementById('popupOverlay').classList.remove('active'); }

        function openAddMoviePopup(){ document.getElementById('addMoviePopup').classList.add('active'); }
        function closeAddMoviePopup(){ document.getElementById('addMoviePopup').classList.remove('active'); document.getElementById('addResult').textContent=''; document.getElementById('videoTitle').value=''; document.getElementById('addYoutubeLink').value=''; }

        function videoExists(link){ const stored = JSON.parse(localStorage.getItem('storedMedia')) || []; return stored.some(s=>s.link===link); }

        function storeMedia(){
            const youtubeLink = document.getElementById('addYoutubeLink').value.trim();
            const title = document.getElementById('videoTitle').value.trim() || '#savedvideo';
            const category = document.getElementById('categorySelect').value || 'video';
            const resultEl = document.getElementById('addResult');
            resultEl.textContent='';

            if(!youtubeLink){ resultEl.textContent='Enter a valid YouTube link.'; return; }
            const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
            if(!regex.test(youtubeLink)){ resultEl.textContent='Enter a valid YouTube link.'; return; }

            let videoId;
            try{
                const urlObj = new URL(youtubeLink);
                if(urlObj.hostname.includes('youtu.be')) videoId = urlObj.pathname.slice(1);
                else videoId = urlObj.searchParams.get('v');
            }catch(e){ resultEl.textContent='Invalid YouTube link.'; return; }

            if(!videoId){ resultEl.textContent='Invalid YouTube link.'; return; }
            const imageUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;

            let stored = JSON.parse(localStorage.getItem('storedMedia')) || [];
            if(videoExists(youtubeLink)){ resultEl.textContent='This video is already saved.'; return; }

            stored.unshift({ image:imageUrl, link:youtubeLink, title:title, category:category });
            localStorage.setItem('storedMedia', JSON.stringify(stored));
            displayStoredMedia(); closeAddMoviePopup();
        }

        function deleteMedia(){ let stored = JSON.parse(localStorage.getItem('storedMedia')) || []; if(currentIndex<0||currentIndex>=stored.length) return; stored.splice(currentIndex,1); localStorage.setItem('storedMedia', JSON.stringify(stored)); filteredMedia=[...stored]; displayStoredMedia(); closePopup(); }

        function filterByCategory(category){
    const stored = JSON.parse(localStorage.getItem('storedMedia')) || [];
    
    // Highlight active button
    document.querySelectorAll('.nav button').forEach(btn=>{
        btn.classList.remove('active');
        if(btn.getAttribute('onclick').includes(`'${category}'`)){
            btn.classList.add('active');
        }
    });

    // Filter media
    if(category==='all'){
        filteredMedia = stored;
    } else {
        filteredMedia = stored.filter(m => m.category === category);
    }
    displayStoredMedia(filteredMedia);
}

        function filterMedia(){ const q = document.getElementById('searchBar').value.trim().toLowerCase(); const stored = JSON.parse(localStorage.getItem('storedMedia')) || []; if(!q){ filteredMedia = stored; displayStoredMedia(filteredMedia); return; } filteredMedia = stored.filter(m=> (m.title||'').toLowerCase().includes(q)); displayStoredMedia(filteredMedia); }

        function playInMiniTab(){ const media = filteredMedia[currentIndex]; if(!media) return; const popup = window.open('','VideoPlayer','width=900,height=540'); const embed = getEmbedUrl(media.link); popup.document.write(`<!doctype html><html><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>${(media.title||'Video')}</title></head><body style=\"margin:0;background:#000;\"><iframe src=\"${embed}\" style=\"width:100%;height:100vh;border:0;\" allowfullscreen></iframe></body></html>`); popup.document.close(); }

        function playVideo(){ const media = filteredMedia[currentIndex]; if(!media) return; window.open(modifyLink(media.link),'_self'); closePopup(); }

        function getEmbedUrl(youtubeLink){ const vid = youtubeLink.match(/(?:v=|\/)([0-9A-Za-z_-]{11}).*/)?.[1]; return vid?`https://www.youtube.com/embed/${vid}?autoplay=1&rel=0` : youtubeLink; }

        function modifyLink(videoUrl){ let modified = videoUrl; if(videoUrl.includes('youtu.be')){ modified = `https://www.yout-ube.com/watch?v=${videoUrl.split('youtu.be/')[1].split('?')[0]}`; } else if(videoUrl.includes('youtube.com')){ modified = videoUrl.replace(/youtube/i,'yout-ube'); } return modified; }

        // context menu
        // document.addEventListener('contextmenu', e=>{ e.preventDefault(); const menu = document.getElementById('customMenu'); menu.style.left=`${e.pageX}px`; menu.style.top=`${e.pageY}px`; menu.style.display='block'; setTimeout(()=>menu.classList.add('active'),10); });
        // document.addEventListener('click', ()=>{ const menu = document.getElementById('customMenu'); menu.style.display='none'; menu.classList.remove('active'); });

        // // load
        window.addEventListener('load', ()=>{ displayStoredMedia(); });
 document.addEventListener("DOMContentLoaded", () => {
            const customMenu = document.querySelector(".custom-menu");

            document.addEventListener("contextmenu", (event) => {
                event.preventDefault();
                if (customMenu) {
                    customMenu.style.display = "block";
                    customMenu.style.top = `${event.pageY}px`;
                    customMenu.style.left = `${event.pageX}px`;
                }
            });

            document.addEventListener("click", () => {
                if (customMenu) {
                    customMenu.style.display = "none";
                }
            });
        });
