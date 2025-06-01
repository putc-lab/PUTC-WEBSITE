  let players = {
            bottom: {
                currentSong: 0,
                playlist: [
                    { src: 'ALBUM/LILLI/1_FIABEDELFIUME_/1 MUOVERMI_MASTER.wav', title: 'Muovermi' },
                    { src: 'ALBUM/LILLI/1_FIABEDELFIUME_/2 ACCESSORI v2_MASTER.wav', title: 'Accessori' },
                    { src: 'ALBUM/LILLI/1_FIABEDELFIUME_/3 PASTO NEGLI  OCCHI_MASTER.wav', title: 'Pasto negli occhi' },
                    { src: 'ALBUM/LILLI/1_FIABEDELFIUME_/4 TEMPO_MASTER.wav', title: 'Tempo' },
                    { src: 'ALBUM/LILLI/2_LIQUIDALINGUA_/1. PRINCIPINO.wav', title: 'Principino' },
                    { src: 'ALBUM/LILLI/2_LIQUIDALINGUA_/2. LONTANOVICINO.wav', title: 'Lontanovicino' },
                    { src: 'ALBUM/LILLI/2_LIQUIDALINGUA_/3. ALDILA.wav', title: 'Aldilà' },
                    { src: 'ALBUM/LILLI/2_LIQUIDALINGUA_/4. CHESTERFIELD.wav', title: 'Chesterfield' },
                    { src: 'ALBUM/LILLI/2_LIQUIDALINGUA_/5. CIVIC.wav', title: 'Civic' },
                    { src: 'ALBUM/LILLI/2_LIQUIDALINGUA_/6. LOVECRAFT.wav', title: 'Lovecraft' },
                    { src: 'ALBUM/LILLI/3_INCANTESIMI/1 PABLO.wav', title: 'Pablo' },
                    { src: 'ALBUM/LILLI/3_INCANTESIMI/2 TU SPERO.wav', title: 'Tu spero' },
                    { src: 'ALBUM/LILLI/3_INCANTESIMI/3 INCANTESIMI.wav', title: 'Incantesimi' },
                    { src: 'ALBUM/LILLI/3_INCANTESIMI/4 CERCHI CON LE MACCHINE.wav', title: 'Cerchi con le macchine' },
                    { src: 'ALBUM/LILLI/3_INCANTESIMI/5 TOSSE.wav', title: 'Tosse' },
                    { src: 'ALBUM/LILLI/3_INCANTESIMI/6 DIMMI TUTTO.wav', title: 'Dimmi tutto' },
                    { src: 'ALBUM/LILLI/3_INCANTESIMI/7 MELODIA.wav', title: 'Melodia' },
                    { src: 'ALBUM/LILLI/4_EROINOMADI_/CANTAUTORE_28feb_MASTER.wav', title: 'Cantautore' },
                    { src: 'ALBUM/LILLI/4_EROINOMADI_/CASIOSUEG_28feb_MASTER.wav', title: 'Casiosueg' },
                    { src: 'ALBUM/LILLI/4_EROINOMADI_/PASSIALSOLE_28feb_MASTER.wav', title: 'Passi al sole' },
                    { src: 'ALBUM/LILLI/4_EROINOMADI_/PERCHé_29feb_MASTER.wav', title: 'Perchè' },
                    { src: 'ALBUM/LILLI/4_EROINOMADI_/PROIBIZIONISMO_28feb_MASTER.wav', title: 'Proibizionismo' },
                    { src: 'ALBUM/LILLI/4_EROINOMADI_/STAREBENE_29feb_MASTER.wav', title: 'Star bene' },
                    { src: 'ALBUM/LILLI/4_EROINOMADI_/TOSSICI_4mar_MASTER.wav', title: 'Tossici' }
                ],
                isPlaying: false,
                audio: null
            }
        };

        function playSong(type, src, title) {
            const player = players[type];
            const audio = document.getElementById(type + 'Audio');

            // Find the index of the song in the playlist
            const songIndex = player.playlist.findIndex(song => song.src === src);
            if (songIndex !== -1) {
                player.currentSong = songIndex;
            }

            // Update audio source and title
            audio.src = src;
            document.getElementById(type + '-song-title').textContent = title;

            // Start playing
            audio.play()
                .then(() => {
                    player.isPlaying = true;
                    const playPauseIcon = document.getElementById(type + '-play-pause');
                    playPauseIcon.classList.remove('fa-play');
                    playPauseIcon.classList.add('fa-pause');
                })
                .catch(error => {
                    console.error('Error playing audio:', error);
                });
        }

        function resetPlayer(type) {
            const player = players[type];
            const audio = document.getElementById(type + 'Audio');
            audio.src = player.playlist[player.currentSong].src;
            document.getElementById(type + '-song-title').textContent = player.playlist[player.currentSong].title;
        }

        function formatTime(seconds) {
            if (isNaN(seconds)) return '0:00';
            const minutes = Math.floor(seconds / 60);
            seconds = Math.floor(seconds % 60);
            return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        }

        function togglePlay(type) {
            const player = players[type];
            const audio = document.getElementById(type + 'Audio');
            const playPauseIcon = document.getElementById(type + '-play-pause');

            if (audio.paused) {
                audio.play()
                    .then(() => {
                        player.isPlaying = true;
                        playPauseIcon.classList.remove('fa-play');
                        playPauseIcon.classList.add('fa-pause');
                    })
                    .catch(error => {
                        console.error('Error playing audio:', error);
                    });
            } else {
                audio.pause();
                player.isPlaying = false;
                playPauseIcon.classList.remove('fa-pause');
                playPauseIcon.classList.add('fa-play');
            }
        }

        function previousSong(type) {
            const player = players[type];
            player.currentSong = (player.currentSong - 1 + player.playlist.length) % player.playlist.length;
            const song = player.playlist[player.currentSong];
            playSong(type, song.src, song.title);
        }

        function nextSong(type) {
            const player = players[type];
            player.currentSong = (player.currentSong + 1) % player.playlist.length;
            const song = player.playlist[player.currentSong];
            playSong(type, song.src, song.title);
        }

        function songEnded(type) {
            nextSong(type);
        }

        function setVolume(type, volume) {
            const audio = document.getElementById(type + 'Audio');
            audio.volume = volume;
            players[type].previousVolume = volume;
        }

        function toggleMute(type) {
            const audio = document.getElementById(type + 'Audio');
            const volumeIcon = document.querySelector('.volume-container i');
            const volumeSlider = document.getElementById(type + '-volume');

            if (audio.volume > 0) {
                players[type].previousVolume = audio.volume;
                audio.volume = 0;
                volumeSlider.value = 0;
                volumeIcon.classList.remove('fa-volume-up');
                volumeIcon.classList.add('fa-volume-mute');
            } else {
                audio.volume = players[type].previousVolume || 1;
                volumeSlider.value = players[type].previousVolume || 1;
                volumeIcon.classList.remove('fa-volume-mute');
                volumeIcon.classList.add('fa-volume-up');
            }
        }

        function updateProgress(type) {
            const audio = document.getElementById(type + 'Audio');
            const progressBar = document.getElementById(type + '-progress');
            const currentTimeSpan = document.getElementById(type + '-current-time');
            const durationSpan = document.getElementById(type + '-duration');

            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = progress + '%';

            currentTimeSpan.textContent = formatTime(audio.currentTime);
            durationSpan.textContent = formatTime(audio.duration);
        }

        function seek(event, type) {
            const audio = document.getElementById(type + 'Audio');
            const progressBar = document.getElementById(type + '-progress-bar');
            const rect = progressBar.getBoundingClientRect();
            const percent = (event.clientX - rect.left) / rect.width;
            audio.currentTime = percent * audio.duration;
        }

        function showImage(src) {
            const overlay = document.getElementById('imageOverlay');
            const overlayImage = document.getElementById('overlayImage');
            overlayImage.src = src;
            overlay.style.display = 'flex';
        }

        function hideImage() {
            const overlay = document.getElementById('imageOverlay');
            overlay.style.display = 'none';
        }

        // Initialize player on page load
        document.addEventListener('DOMContentLoaded', function () {
            const audio = document.getElementById('bottomAudio');
            players.bottom.audio = audio;
            resetPlayer('bottom');
        });

        document.addEventListener('DOMContentLoaded', function () {
            const hamburger = document.querySelector('.hamburger-menu');
            const navContainer = document.querySelector('.nav-container');

            hamburger.addEventListener('click', function () {
                this.classList.toggle('active');
                navContainer.classList.toggle('active');
            });
        });