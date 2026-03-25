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
            { src: 'ALBUM/Jaz Jizz Trio_Master/1_FAI_Master.mp3', title: 'FAI', artist: 'Jaz Jizz Trio' },
            { src: 'ALBUM/Jaz Jizz Trio_Master/2. Derek_Master.mp3', title: 'Derek', artist: 'Jaz Jizz Trio' },
            { src: 'ALBUM/Jaz Jizz Trio_Master/3. Le solite beghe. w:Marcello Rotondella_master.mp3', title: 'Le solite beghe', artist: 'Jaz Jizz Trio' },
            { src: 'ALBUM/Jaz Jizz Trio_Master/4. Mai Usato_Master.mp3', title: 'Mai Usato', artist: 'Jaz Jizz Trio' },
            { src: 'ALBUM/Jaz Jizz Trio_Master/5. Surgelati_Master.mp3', title: 'Surgelati', artist: 'Jaz Jizz Trio' },
            { src: 'ALBUM/Jaz Jizz Trio_Master/6. un Inverno_Master.mp3', title: 'Un Inverno', artist: 'Jaz Jizz Trio' },
            { src: 'ALBUM/Jaz Jizz Trio_Master/7. Valle Di Lanzo_Master.mp3', title: 'Valle Di Lanzo', artist: 'Jaz Jizz Trio' },
            { src: 'ALBUM/LILLI/1_FIABEDELFIUME_/1 MUOVERMI_MASTER.mp3', title: 'Muovermi', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/1_FIABEDELFIUME_/2 ACCESSORI v2_MASTER.mp3', title: 'Accessori', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/1_FIABEDELFIUME_/3 PASTO NEGLI  OCCHI_MASTER.mp3', title: 'Pasto negli occhi', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/1_FIABEDELFIUME_/4 TEMPO_MASTER.mp3', title: 'Tempo', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/2_LIQUIDALINGUA_/1. PRINCIPINO.mp3', title: 'Principino', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/2_LIQUIDALINGUA_/2. LONTANOVICINO.mp3', title: 'Lontanovicino', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/2_LIQUIDALINGUA_/3. ALDILA.mp3', title: 'Aldilà', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/2_LIQUIDALINGUA_/4. CHESTERFIELD.mp3', title: 'Chesterfield', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/2_LIQUIDALINGUA_/5. CIVIC.mp3', title: 'Civic', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/2_LIQUIDALINGUA_/6. LOVECRAFT.mp3', title: 'Lovecraft', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/3_INCANTESIMI/1 PABLO.mp3', title: 'Pablo', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/3_INCANTESIMI/2 TU SPERO.mp3', title: 'Tu spero', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/3_INCANTESIMI/3 INCANTESIMI.mp3', title: 'Incantesimi', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/3_INCANTESIMI/4 CERCHI CON LE MACCHINE.mp3', title: 'Cerchi con le macchine', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/3_INCANTESIMI/5 TOSSE.mp3', title: 'Tosse', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/3_INCANTESIMI/6 DIMMI TUTTO.mp3', title: 'Dimmi tutto', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/3_INCANTESIMI/7 MELODIA.mp3', title: 'Melodia', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/4_EROINOMADI_/CANTAUTORE_28feb_MASTER.mp3', title: 'Cantautore', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/4_EROINOMADI_/CASIOSUEG_28feb_MASTER.mp3', title: 'Casiosueg', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/4_EROINOMADI_/PASSIALSOLE_28feb_MASTER.mp3', title: 'Passi al sole', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/4_EROINOMADI_/PERCHé_29feb_MASTER.mp3', title: 'Perchè', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/4_EROINOMADI_/PROIBIZIONISMO_28feb_MASTER.mp3', title: 'Proibizionismo', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/4_EROINOMADI_/STAREBENE_29feb_MASTER.mp3', title: 'Star bene', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/LILLI/4_EROINOMADI_/TOSSICI_4mar_MASTER.mp3', title: 'Tossici', artist: 'Robert Bishop, lillilillililli, Carro' },
            { src: 'ALBUM/KABIRO/03 - Kabiro - 4. sidrax divinorum-001.mp3', title: 'Sidrax', artist: 'Kabiro' },
            { src: 'ALBUM/KABIRO/01 - Kabiro - 2.armonici_delay.mp3', title: 'Armonici delay', artist: 'Kabiro' },
            { src: 'ALBUM/KABIRO/02 - Kabiro - 3. esporre-imporre-pocoriverbero.mp3', title: 'Esporre/Imporre', artist: 'Kabiro' },
            { src: 'ALBUM/KABIRO/04 - Kabiro - 5. chef bananas-001.mp3', title: 'Chef bananas', artist: 'Kabiro' },
            { src: 'ALBUM/KABIRO/05 - Kabiro - 6. organo-modale.mp3', title: 'Organo modale', artist: 'Kabiro' },
            { src: 'ALBUM/KABIRO/06 - Kabiro - o_mio_mia_gran.mp3', title: 'O mio mia gran', artist: 'Kabiro' },
            { src: 'ALBUM/KABIRO/07 - Kabiro - 1.brutto.mp3', title: 'Brutto', artist: 'Kabiro' },
            { src: 'ALBUM/KABIRO/08 - Kabiro - 8. Live.mp3', title: 'Live at Afekt festival', artist: 'Kabiro, Roya Naini' }
        
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