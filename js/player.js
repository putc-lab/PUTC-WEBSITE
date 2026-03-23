// ─────────────────────────────────────────────
//  player.js — shared across all album pages
//  Each HTML must define `albumPlaylist` before
//  loading this script, e.g.:
//
//  <script>
//    const albumPlaylist = [
//      { src: 'ALBUM/...wav', title: 'Song title' },
//      ...
//    ];
//  </script>
//  <script src="js/player.js"></script>
// ─────────────────────────────────────────────

const PAGE_SIZE = typeof tracksPerPage !== 'undefined' ? tracksPerPage : 8;
let currentPage = 0;

let players = {
    bottom: {
        currentSong: 0,
        playlist: (typeof albumPlaylist !== 'undefined') ? albumPlaylist : [],
        isPlaying: false,
        audio: null
    }
};

const totalPages = Math.ceil(players.bottom.playlist.length / PAGE_SIZE);
const isPaginated = totalPages > 1;

// ── Render tracklist ──────────────────────────

function renderPage() {
    const list = document.getElementById('track-list');
    if (!list) return;

    const start = currentPage * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, players.bottom.playlist.length);
    const pageTracks = players.bottom.playlist.slice(start, end);

    list.innerHTML = pageTracks.map((song, i) => {
        const globalIndex = start + i;
        const safeSrc = song.src.replace(/'/g, "\\'");
        const safeTitle = song.title.replace(/'/g, "\\'");
        return `
            <li class="track-item" onclick="playSong('bottom', '${safeSrc}', '${safeTitle}')">
                <span class="track-number">${globalIndex + 1}</span>
                <i class="fas fa-play track-hover-play"></i>
                <span class="track-title">${song.title}</span>
                <span class="track-duration" id="dur-${globalIndex}">—</span>
            </li>
        `;
    }).join('');

    // aggiorna frecce paginazione se esistono
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    if (prevBtn) prevBtn.disabled = currentPage === 0;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages - 1;

    loadDurations();
}

function loadDurations() {
    const start = currentPage * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, players.bottom.playlist.length);

    for (let i = start; i < end; i++) {
        const index = i;
        if (players.bottom.playlist[index].duration) {
            const el = document.getElementById('dur-' + index);
            if (el) el.textContent = players.bottom.playlist[index].duration;
            continue;
        }
        const audio = new Audio(players.bottom.playlist[index].src);
        audio.addEventListener('loadedmetadata', function () {
            const dur = formatTime(audio.duration);
            players.bottom.playlist[index].duration = dur;
            const el = document.getElementById('dur-' + index);
            if (el) el.textContent = dur;
        });
    }
}

function changePage(dir) {
    currentPage = Math.max(0, Math.min(totalPages - 1, currentPage + dir));
    renderPage();
}

// ── Playback ──────────────────────────────────

function playSong(type, src, title) {
    const player = players[type];
    const audio = document.getElementById(type + 'Audio');

    const songIndex = player.playlist.findIndex(song => song.src === src);
    if (songIndex !== -1) player.currentSong = songIndex;

    const resolvedTitle = title ?? (songIndex !== -1 ? player.playlist[songIndex].title : '') ?? '';

    audio.src = src;
    document.getElementById(type + '-song-title').textContent = resolvedTitle;

    audio.play()
        .then(() => {
            player.isPlaying = true;
            const icon = document.getElementById(type + '-play-pause');
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
        })
        .catch(err => console.error('Error playing audio:', err));
}

function resetPlayer(type) {
    const player = players[type];
    const audio = document.getElementById(type + 'Audio');
    audio.src = player.playlist[player.currentSong].src;
    document.getElementById(type + '-song-title').textContent = player.playlist[player.currentSong].title;
}

function togglePlay(type) {
    const player = players[type];
    const audio = document.getElementById(type + 'Audio');
    const icon = document.getElementById(type + '-play-pause');

    if (audio.paused) {
        audio.play()
            .then(() => {
                player.isPlaying = true;
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
            })
            .catch(err => console.error('Error playing audio:', err));
    } else {
        audio.pause();
        player.isPlaying = false;
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
}

function previousSong(type) {
    const player = players[type];
    player.currentSong = (player.currentSong - 1 + player.playlist.length) % player.playlist.length;
    const song = player.playlist[player.currentSong];
    if (isPaginated) {
        currentPage = Math.floor(player.currentSong / PAGE_SIZE);
        renderPage();
    }
    playSong(type, song.src, song.title);
}

function nextSong(type) {
    const player = players[type];
    player.currentSong = (player.currentSong + 1) % player.playlist.length;
    const song = player.playlist[player.currentSong];
    if (isPaginated) {
        currentPage = Math.floor(player.currentSong / PAGE_SIZE);
        renderPage();
    }
    playSong(type, song.src, song.title);
}

function songEnded(type) {
    nextSong(type);
}

// ── Volume ────────────────────────────────────

function setVolume(type, volume) {
    const audio = document.getElementById(type + 'Audio');
    audio.volume = volume;
    players[type].previousVolume = volume;
}

function toggleMute(type) {
    const audio = document.getElementById(type + 'Audio');
    const icon = document.querySelector('.volume-container i');
    const slider = document.getElementById(type + '-volume');

    if (audio.volume > 0) {
        players[type].previousVolume = audio.volume;
        audio.volume = 0;
        slider.value = 0;
        icon.classList.replace('fa-volume-up', 'fa-volume-mute');
    } else {
        audio.volume = players[type].previousVolume || 1;
        slider.value = players[type].previousVolume || 1;
        icon.classList.replace('fa-volume-mute', 'fa-volume-up');
    }
}

// ── Progress ──────────────────────────────────

function updateProgress(type) {
    const audio = document.getElementById(type + 'Audio');
    const progress = (audio.currentTime / audio.duration) * 100;
    document.getElementById(type + '-progress').style.width = progress + '%';
    document.getElementById(type + '-current-time').textContent = formatTime(audio.currentTime);
    document.getElementById(type + '-duration').textContent = formatTime(audio.duration);
}

function seek(event, type) {
    const audio = document.getElementById(type + 'Audio');
    const bar = document.getElementById(type + '-progress-bar');
    const rect = bar.getBoundingClientRect();
    audio.currentTime = ((event.clientX - rect.left) / rect.width) * audio.duration;
}

// ── Utils ─────────────────────────────────────

function formatTime(seconds) {
    if (isNaN(seconds)) return '—';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
}

function showImage(src) {
    const overlay = document.getElementById('imageOverlay');
    document.getElementById('overlayImage').src = src;
    overlay.style.display = 'flex';
}

function hideImage() {
    document.getElementById('imageOverlay').style.display = 'none';
}

// ── Init ──────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('bottomAudio');
    players.bottom.audio = audio;
    resetPlayer('bottom');

    // Se c'è una tracklist dinamica, renderizza
    if (document.getElementById('track-list')) {
        renderPage();
    }

    // Hamburger menu
    const hamburger = document.querySelector('.hamburger-menu');
    const navContainer = document.querySelector('.nav-container');
    if (hamburger && navContainer) {
        hamburger.addEventListener('click', function () {
            this.classList.toggle('active');
            navContainer.classList.toggle('active');
        });
    }
});
