// ── Navbar hide on scroll ──
const navbar = document.querySelector('.navbar-main');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('hidden', window.scrollY > 10);
    }, { passive: true });
}

// ── Shuffle helper ──
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// ── Player ──
const players = {
    bottom: {
        currentSong: 0,
        playlist: shuffleArray([
            { src: 'ALBUM/Jaz Jizz Trio_Master/1_FAI_Master.wav', title: 'FAI', artist: 'Jaz Jizz Trio' },
            { src: 'ALBUM/Jaz Jizz Trio_Master/2. Derek_Master.wav', title: 'Derek', artist: 'Jaz Jizz Trio' },
            { src: 'ALBUM/Jaz Jizz Trio_Master/3. Le solite beghe. w:Marcello Rotondella_master.wav', title: 'Le solite beghe', artist: 'Jaz Jizz Trio' },
            { src: 'ALBUM/Jaz Jizz Trio_Master/4. Mai Usato_Master.wav', title: 'Mai Usato', artist: 'Jaz Jizz Trio' },
            { src: 'ALBUM/Jaz Jizz Trio_Master/5. Surgelati_Master.wav', title: 'Surgelati', artist: 'Jaz Jizz Trio' },
            { src: 'ALBUM/Jaz Jizz Trio_Master/6. un Inverno_Master.wav', title: 'Un Inverno', artist: 'Jaz Jizz Trio' },
            { src: 'ALBUM/Jaz Jizz Trio_Master/7. Valle Di Lanzo_Master.wav', title: 'Valle Di Lanzo', artist: 'Jaz Jizz Trio' },
            { src: 'ALBUM/LILLI/1_FIABEDELFIUME_/1 MUOVERMI_MASTER.wav', title: 'Muovermi', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/1_FIABEDELFIUME_/2 ACCESSORI v2_MASTER.wav', title: 'Accessori', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/1_FIABEDELFIUME_/3 PASTO NEGLI  OCCHI_MASTER.wav', title: 'Pasto negli occhi', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/1_FIABEDELFIUME_/4 TEMPO_MASTER.wav', title: 'Tempo', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/2_LIQUIDALINGUA_/1. PRINCIPINO.wav', title: 'Principino', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/2_LIQUIDALINGUA_/2. LONTANOVICINO.wav', title: 'Lontanovicino', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/2_LIQUIDALINGUA_/3. ALDILA.wav', title: 'Aldilà', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/2_LIQUIDALINGUA_/4. CHESTERFIELD.wav', title: 'Chesterfield', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/2_LIQUIDALINGUA_/5. CIVIC.wav', title: 'Civic', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/2_LIQUIDALINGUA_/6. LOVECRAFT.wav', title: 'Lovecraft', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/3_INCANTESIMI/1 PABLO.wav', title: 'Pablo', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/3_INCANTESIMI/2 TU SPERO.wav', title: 'Tu spero', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/3_INCANTESIMI/3 INCANTESIMI.wav', title: 'Incantesimi', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/3_INCANTESIMI/4 CERCHI CON LE MACCHINE.wav', title: 'Cerchi con le macchine', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/3_INCANTESIMI/5 TOSSE.wav', title: 'Tosse', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/3_INCANTESIMI/6 DIMMI TUTTO.wav', title: 'Dimmi tutto', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/3_INCANTESIMI/7 MELODIA.wav', title: 'Melodia', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/4_EROINOMADI_/CANTAUTORE_28feb_MASTER.wav', title: 'Cantautore', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/4_EROINOMADI_/CASIOSUEG_28feb_MASTER.wav', title: 'Casiosueg', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/4_EROINOMADI_/PASSIALSOLE_28feb_MASTER.wav', title: 'Passi al sole', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/4_EROINOMADI_/PERCHé_29feb_MASTER.wav', title: 'Perchè', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/4_EROINOMADI_/PROIBIZIONISMO_28feb_MASTER.wav', title: 'Proibizionismo', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/4_EROINOMADI_/STAREBENE_29feb_MASTER.wav', title: 'Star bene', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/4_EROINOMADI_/TOSSICI_4mar_MASTER.wav', title: 'Tossici', artist: 'Robert Bishop, lillilillililli, Carro' },
        
        ]),
        isPlaying: false,
        previousVolume: 1
    }
};

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
}

function updateProgress(type) {
    const audio = document.getElementById(type + 'Audio');
    const progress = document.getElementById(type + '-progress');
    const currentTime = document.getElementById(type + '-current-time');
    const duration = document.getElementById(type + '-duration');
    if (!audio.duration) return;
    progress.style.width = (audio.currentTime / audio.duration * 100) + '%';
    currentTime.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);
}

function seek(event, type) {
    const audio = document.getElementById(type + 'Audio');
    const bar = document.getElementById(type + '-progress-bar');
    const rect = bar.getBoundingClientRect();
    audio.currentTime = ((event.clientX - rect.left) / rect.width) * audio.duration;
}

function loadSong(type, index) {
    const player = players[type];
    const song = player.playlist[index];
    const audio = document.getElementById(type + 'Audio');
    audio.src = song.src;
    document.getElementById(type + '-song-title').textContent = song.title;
    const artistEl = document.getElementById(type + '-artist-name');
    if (artistEl) artistEl.textContent = song.artist || '';
}

function togglePlay(type) {
    const audio = document.getElementById(type + 'Audio');
    const icon = document.getElementById(type + '-play-pause');
    if (audio.paused) {
        if (!audio.src) loadSong(type, 0);
        audio.play();
        icon.classList.replace('fa-play', 'fa-pause');
    } else {
        audio.pause();
        icon.classList.replace('fa-pause', 'fa-play');
    }
}

function previousSong(type) {
    const p = players[type];
    p.currentSong = (p.currentSong - 1 + p.playlist.length) % p.playlist.length;
    loadSong(type, p.currentSong);
    const audio = document.getElementById(type + 'Audio');
    audio.play();
    document.getElementById(type + '-play-pause').classList.replace('fa-play', 'fa-pause');
}

function nextSong(type) {
    const p = players[type];
    p.currentSong = (p.currentSong + 1) % p.playlist.length;
    loadSong(type, p.currentSong);
    const audio = document.getElementById(type + 'Audio');
    audio.play();
    document.getElementById(type + '-play-pause').classList.replace('fa-play', 'fa-pause');
}

function songEnded(type) { nextSong(type); }

function setVolume(type, volume) {
    document.getElementById(type + 'Audio').volume = volume;
}

function toggleMute(type) {
    const audio = document.getElementById(type + 'Audio');
    const icon = document.querySelector('.volume-container i');
    const slider = document.getElementById(type + '-volume');
    if (audio.volume > 0) {
        players[type].previousVolume = audio.volume;
        audio.volume = 0;
        slider.value = 0;
        icon.className = 'fas fa-volume-mute';
    } else {
        const v = players[type].previousVolume || 1;
        audio.volume = v;
        slider.value = v;
        icon.className = 'fas fa-volume-up';
    }
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
    loadSong('bottom', 0);
});