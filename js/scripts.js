document.addEventListener('DOMContentLoaded', function() {
        const video = document.getElementById('myVideo');
        video.play().catch(error => {
            console.log('Autoplay non riuscito:', error);
        });
    });
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        let players = {
            bottom: {
                currentSong: 0,
                playlist: shuffleArray([
                    {src: 'ALBUM/Jaz Jizz Trio_Master/1_FAI_Master.wav', title: 'FAI'},
                    {src: 'ALBUM/Jaz Jizz Trio_Master/2. Derek_Master.wav', title: 'Derek'},
                    {src: 'ALBUM/Jaz Jizz Trio_Master/3. Le solite beghe. w:Marcello Rotondella_master.wav', title: 'Le solite beghe'},
                    {src: 'ALBUM/Jaz Jizz Trio_Master/4. Mai Usato_Master.wav', title: 'Mai Usato'},
                    {src: 'ALBUM/Jaz Jizz Trio_Master/5. Surgelati_Master.wav', title: 'Surgelati'},
                    {src: 'ALBUM/Jaz Jizz Trio_Master/6. un Inverno_Master.wav', title: 'Un Inverno'},
                    {src: 'ALBUM/Jaz Jizz Trio_Master/7. Valle Di Lanzo_Master.wav', title: 'Valle Di Lanzo'}
                ]),
                isPlaying: false,
                audio: null,
                previousVolume: 1
            }
        };

        function resetPlayer(type) {
            const audio = document.getElementById(type + 'Audio');
            if (players[type].playlist.length > 0) {
                audio.src = players[type].playlist[0].src;
                document.getElementById(type + '-song-title').textContent = players[type].playlist[0].title;
            }
        }

        function formatTime(seconds) {
            if (isNaN(seconds)) return '0:00';
            const minutes = Math.floor(seconds / 60);
            seconds = Math.floor(seconds % 60);
            return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        }

        function updateProgress(type) {
            const audio = document.getElementById(type + 'Audio');
            const progress = document.getElementById(type + '-progress');
            const currentTime = document.getElementById(type + '-current-time');
            const duration = document.getElementById(type + '-duration');
            
            if (audio.duration) {
                const percent = (audio.currentTime / audio.duration) * 100;
                progress.style.width = percent + '%';
                
                currentTime.textContent = formatTime(audio.currentTime);
                duration.textContent = formatTime(audio.duration);
            }
        }

        function seek(event, type) {
            const audio = document.getElementById(type + 'Audio');
            const progressBar = document.getElementById(type + '-progress-bar');
            const rect = progressBar.getBoundingClientRect();
            const percent = (event.clientX - rect.left) / rect.width;
            audio.currentTime = percent * audio.duration;
        }

        function togglePlay(type) {
            const audio = document.getElementById(type + 'Audio');
            const playPauseBtn = document.getElementById(type + '-play-pause');
            
            if (audio.paused) {
                if (!audio.src && players[type].playlist.length > 0) {
                    const firstSong = players[type].playlist[0];
                    audio.src = firstSong.src;
                    document.getElementById(type + '-song-title').textContent = firstSong.title;
                }
                audio.play();
                playPauseBtn.classList.remove('fa-play');
                playPauseBtn.classList.add('fa-pause');
            } else {
                audio.pause();
                playPauseBtn.classList.remove('fa-pause');
                playPauseBtn.classList.add('fa-play');
            }
        }

        function previousSong(type) {
            players[type].currentSong--;
            if (players[type].currentSong < 0) {
                players[type].currentSong = players[type].playlist.length - 1;
            }
            const song = players[type].playlist[players[type].currentSong];
            document.getElementById(type + '-song-title').textContent = song.title;
            document.getElementById(type + 'Audio').src = song.src;
            togglePlay(type);
        }

        function nextSong(type) {
            players[type].currentSong++;
            if (players[type].currentSong >= players[type].playlist.length) {
                players[type].currentSong = 0;
            }
            const song = players[type].playlist[players[type].currentSong];
            document.getElementById(type + '-song-title').textContent = song.title;
            document.getElementById(type + 'Audio').src = song.src;
            togglePlay(type);
        }

        function songEnded(type) {
            nextSong(type);
        }

        function setVolume(type, volume) {
            const audio = document.getElementById(type + 'Audio');
            const volumeSlider = document.getElementById(type + '-volume');
            audio.volume = volume;
            volumeSlider.style.setProperty('--volume-percentage', (volume * 100) + '%');
        }

        function toggleMute(type) {
            const audio = document.getElementById(type + 'Audio');
            const volumeIcon = document.querySelector('.volume-container i');
            const volumeSlider = document.getElementById(type + '-volume');
            
            if (audio.volume > 0) {
                players[type].previousVolume = audio.volume;
                audio.volume = 0;
                volumeSlider.value = 0;
                volumeIcon.className = 'fas fa-volume-mute';
                volumeSlider.style.setProperty('--volume-percentage', '0%');
            } else {
                const newVolume = players[type].previousVolume || 1;
                audio.volume = newVolume;
                volumeSlider.value = newVolume;
                volumeIcon.className = 'fas fa-volume-up';
                volumeSlider.style.setProperty('--volume-percentage', (newVolume * 100) + '%');
            }
        }

        // Initialize player on page load
        document.addEventListener('DOMContentLoaded', function() {
            const audio = document.getElementById('bottomAudio');
            players.bottom.audio = audio;
            resetPlayer('bottom');
        });

        // Aggiungiamo l'Intersection Observer per la sezione interattiva
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Rimuovi l'observer dopo la prima inizializzazione
                    if (!isInteractiveInitialized) {
                        initInteractive();
                        observer.disconnect();
                    }
                }
            });
        }, { threshold: 0.1 });

        // Osserva la sezione interattiva
        observer.observe(document.querySelector('.interactive-section'));

     let scene, camera, renderer, model;
        let parts = [];
        const synths = [];
        let sculptMode = false;
        let originalVertices = new Map();
        let isInteractiveInitialized = false;
        let previousMousePosition = { x: 0, y: 0 };
        let rotationVelocity = { x: 0, y: 0 };
        let isDragging = false;
        let selectedPart = null;
        const dampingFactor = 0.95;
        const sculptStrength = 0.3;  // Reduced for finer control on mobile
        const sculptRadius = 3;      // Reduced for more precise sculpting
        let lastSculptTime = 0;
        const sculptCooldown = 8;    // Reduced for more frequent updates (~120fps)
        const touchRotationFactor = 0.015;  // Fine-tuned rotation speed for touch

        function sculptMesh(mesh, point, dynamicStrength = sculptStrength) {
            const currentTime = performance.now();
            if (currentTime - lastSculptTime < sculptCooldown) return;
            lastSculptTime = currentTime;

            const positions = mesh.geometry.attributes.position;
            const originalPositions = originalVertices.get(mesh);
            
            // Converti il punto di impatto in coordinate locali del mesh
            const localPoint = point.clone().applyMatrix4(mesh.matrixWorld.invert());
            
            // Itera attraverso tutti i vertici
            for (let i = 0; i < positions.array.length; i += 3) {
                const vertex = new THREE.Vector3(
                    positions.array[i],
                    positions.array[i + 1],
                    positions.array[i + 2]
                );
                
                // Calcola la distanza dal punto di impatto
                const distance = vertex.distanceTo(localPoint);
                
                // Funzione di falloff più morbida con easing
                if (distance < sculptRadius) {
                    // Usa una funzione smoothstep cubica per un falloff più naturale
                    const t = 1 - (distance / sculptRadius);
                    const smoothFalloff = t * t * (3 - 2 * t);
                    const intensity = smoothFalloff * dynamicStrength;
                    
                    // Direzione della deformazione con smorzamento
                    const direction = vertex.clone().sub(localPoint).normalize();
                    const dampedIntensity = intensity * (1 - Math.pow(distance / sculptRadius, 2));
                    
                    // Applica la deformazione
                    vertex.add(direction.multiplyScalar(dampedIntensity));
                    
                    positions.array[i] = vertex.x;
                    positions.array[i + 1] = vertex.y;
                    positions.array[i + 2] = vertex.z;
                }
            }
            
            // Aggiorna la geometria
            positions.needsUpdate = true;
            mesh.geometry.computeVertexNormals();
        }

        function initInteractive() {
            if (isInteractiveInitialized) return;
            isInteractiveInitialized = true;

            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0xffffff);
            document.getElementById('scene-container').appendChild(renderer.domElement);

            // Illuminazione migliorata
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
            scene.add(ambientLight);

            const frontLight = new THREE.DirectionalLight(0xffffff, 0.8);
            frontLight.position.set(0, 0, 100);
            scene.add(frontLight);

            const topLight = new THREE.DirectionalLight(0xb400fb, 0.5);
            topLight.position.set(0, 100, 0);
            scene.add(topLight);

            const bottomLight = new THREE.DirectionalLight(0xb400fb, 0.3);
            bottomLight.position.set(0, -100, 0);
            scene.add(bottomLight);

            camera.position.z = 95;

            animate();

            const loader = new THREE.GLTFLoader();
            loader.load('3d/ImageToStl.com_nosfondo.glb', 
                (gltf) => {
                    model = gltf.scene;
                    model.rotation.x = -Math.PI / 2;

                    // Scala il modello in base alla dimensione dello schermo
                    if (window.innerWidth <= 480) {
                        model.scale.set(0.6, 0.09, 0.6);
                        
                        // Aggiusta le luci per mobile
                        topLight.intensity = 1;    // Ridotta da 0.5
                        bottomLight.intensity = 0.1; // Ridotta da 0.3
                        frontLight.intensity = 0.07;    // Aumentata da 0.8
                    }
                    
                    
                    // Prepara una lista di tutti i mesh nel modello
                    model.traverse((child) => {
                        if (child.isMesh) {
                            // Abilita il raycast su ogni mesh
                            child.raycast = THREE.Mesh.prototype.raycast;
                            
                            // Salva le posizioni originali
                            const positions = child.geometry.attributes.position.array;
                            originalVertices.set(child, Float32Array.from(positions));
                            
                            child.geometry.attributes.position.usage = THREE.DynamicDrawUsage;
                            
                            // Materiale migliorato e trasparente per il raycast
                            child.material = new THREE.MeshPhongMaterial({
                                color: 0x000000,
                                specular: 0xb400fb,
                                shininess: 150,
                                emissive: 0x330044,
                                emissiveIntensity: 0.1,
                                side: THREE.DoubleSide, // Rende il mesh visibile da entrambi i lati
                                transparent: true,
                                opacity: 1
                            });

                            // Aggiorna le normali e i buffer
                            child.geometry.computeBoundingSphere();
                            child.geometry.computeBoundingBox();
                            child.geometry.computeVertexNormals();
                            
                            parts.push(child);
                            
                            const synth = new Tone.Synth({
                                oscillator: { type: "sine" },
                                envelope: {
                                    attack: 0.1,
                                    decay: 0.2,
                                    sustain: 0.3,
                                    release: 1
                                }
                            }).toDestination();
                            synths.push(synth);
                        }
                    });

                    scene.add(model);
                    console.log('Modello caricato con successo');
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total * 100) + '% caricato');
                },
                (error) => {
                    console.error('Errore nel caricamento del modello:', error);
                }
            );

            const raycaster = new THREE.Raycaster();
            raycaster.params.Line.threshold = 0.1; // Aumenta la precisione del raycast
            const mouse = new THREE.Vector2();

            window.addEventListener('keydown', (event) => {
                if (event.key.toLowerCase() === 's') {
                    sculptMode = !sculptMode;
                    document.body.style.cursor = sculptMode ? 'crosshair' : 'default';
                }
            });

            renderer.domElement.addEventListener('mousedown', onMouseDown);
            renderer.domElement.addEventListener('mousemove', onMouseMove);
            renderer.domElement.addEventListener('mouseup', onMouseUp);

            // Touch events per dispositivi mobili
            let touchCount = 0;
            let lastTouchY = 0;
            let touchStartY = 0;
            let isScrolling = false;
            let isInteractionEnabled = false;
            let lastTap = 0;
            
            renderer.domElement.addEventListener('touchstart', (event) => {
                const now = Date.now();
                const timeSinceLastTap = now - lastTap;
                
                // Gestione doppio tap
                if (timeSinceLastTap < 300) {
                    isInteractionEnabled = !isInteractionEnabled;
                    document.body.style.cursor = isInteractionEnabled ? 'crosshair' : 'default';
                    
                    // Mostra feedback visivo
                    const instructions = document.getElementById('mobile-instructions');
                    instructions.style.display = 'block';
                    instructions.textContent = isInteractionEnabled ? 
                        'Interaction enabled - One finger to sculpt • Two fingers to rotate' : 
                        'Interaction disabled';
                    setTimeout(() => {
                        instructions.style.display = 'none';
                    }, 2000);
                    
                    event.preventDefault();
                    return;
                }
                lastTap = now;

                if (!isInteractionEnabled) return;

                touchCount = event.touches.length;
                touchStartY = event.touches[0].clientY;
                lastTouchY = touchStartY;
                isScrolling = false;

                // Verifica se il touch è sul modello 3D
                const touch = event.touches[0];
                const rect = renderer.domElement.getBoundingClientRect();
                mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
                mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
                
                raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObjects(parts);
                const isTouchingModel = intersects.length > 0;

                if (isTouchingModel) {
                    if (touchCount === 1) {
                        sculptMode = true;
                        document.body.style.cursor = 'crosshair';
                        
                        // Inizializza Tone.js
                        if (Tone.context.state !== 'running') {
                            Tone.start();
                        }
                        event.preventDefault();
                    } 
                    else if (touchCount === 2) {
                        sculptMode = false;
                        isDragging = true;
                        document.body.style.cursor = 'grab';
                        
                        const touch = event.touches[0];
                        previousMousePosition = {
                            x: touch.clientX,
                            y: touch.clientY
                        };
                        event.preventDefault();
                    }
                }
            });

            renderer.domElement.addEventListener('touchmove', (event) => {
                if (!isInteractionEnabled) return;

                const currentTouchY = event.touches[0].clientY;
                const touchDeltaY = currentTouchY - lastTouchY;

                // Verifica se il touch è sul modello 3D
                const touch = event.touches[0];
                const rect = renderer.domElement.getBoundingClientRect();
                mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
                mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
                
                raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObjects(parts);
                const isTouchingModel = intersects.length > 0;

                if (!isTouchingModel) {
                    // Permetti lo scroll naturale se non si sta toccando il modello
                    return;
                }

                // Determina se l'utente sta cercando di scrollare
                if (!isScrolling && Math.abs(currentTouchY - touchStartY) > 10) {
                    isScrolling = true;
                    sculptMode = false;
                }
                
                if (isScrolling) {
                    // Non prevenire lo scroll naturale
                    return;
                }
                
                event.preventDefault(); // Previene lo scroll solo durante la scultura/rotazione
                
                if (touchCount === 1 && sculptMode) {
                    // Sculpting con un dito
                    if (intersects.length > 0) {
                        // Applica una deformazione più fluida
                        const touchDelta = {
                            x: touch.clientX - (previousMousePosition ? previousMousePosition.x : touch.clientX),
                            y: touch.clientY - (previousMousePosition ? previousMousePosition.y : touch.clientY)
                        };
                        const touchSpeed = Math.sqrt(touchDelta.x * touchDelta.x + touchDelta.y * touchDelta.y);
                        const dynamicStrength = Math.min(sculptStrength * (1 + touchSpeed * 0.01), sculptStrength * 2);

                        sculptMesh(intersects[0].object, intersects[0].point, dynamicStrength);
                        
                        // Riproduci il suono con frequenza basata sulla velocità
                        const synth = synths[parts.indexOf(intersects[0].object)];
                        if (synth) {
                            const frequency = 220 + (touchSpeed * 2);
                            synth.frequency.setValueAtTime(frequency, Tone.now());
                            synth.triggerAttackRelease(frequency, '32n');
                        }
                    }
                } 
                else if (touchCount === 2 && isDragging) {
                    // Rotazione con due dita
                    const touch1 = event.touches[0];
                    const touch2 = event.touches[1];
                    
                    const currentCenter = {
                        x: (touch1.clientX + touch2.clientX) / 2,
                        y: (touch1.clientY + touch2.clientY) / 2
                    };
                    
                    if (previousMousePosition) {
                        const deltaRotationX = (currentCenter.y - previousMousePosition.y) * touchRotationFactor;
                        const deltaRotationY = (currentCenter.x - previousMousePosition.x) * touchRotationFactor;
                        
                        // Applica una rotazione più fluida con interpolazione
                        model.rotation.x += deltaRotationX;
                        model.rotation.y += deltaRotationY;
                        
                        // Aggiungi inerzia alla rotazione
                        rotationVelocity.x = deltaRotationX * 0.8;
                        rotationVelocity.y = deltaRotationY * 0.8;
                    }
                    
                    previousMousePosition = currentCenter;
                }
                
                lastTouchY = currentTouchY;
            });

            renderer.domElement.addEventListener('touchend', (event) => {
                if (!isInteractionEnabled) return;
                
                touchCount = event.touches.length;
                isScrolling = false;
                
                if (touchCount < 2) {
                    isDragging = false;
                }
                if (touchCount === 0) {
                    sculptMode = false;
                    document.body.style.cursor = 'default';
                }
            });

            function onMouseDown(event) {
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
                previousMousePosition = { x: event.clientX, y: event.clientY };

                raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObjects(parts, true);

                if (intersects.length > 0) {
                    isDragging = true;
                    selectedPart = intersects[0].object;
                    rotationVelocity = { x: 0, y: 0 };
                    
                    if (sculptMode) {
                        // Applica sculpting a tutte le parti intersecate
                        intersects.forEach(intersect => {
                            sculptMesh(intersect.object, intersect.point);
                            const partIndex = parts.indexOf(intersect.object);
                            if (partIndex >= 0) {
                                const frequency = 220 + (Math.random() * 220);
                                synths[partIndex].triggerAttackRelease(frequency, "16n");
                            }
                        });
                    } else {
                        const partIndex = parts.indexOf(selectedPart);
                        if (partIndex >= 0) {
                            synths[partIndex].triggerAttackRelease("C4", "8n");
                        }
                    }
                }
            }

            function onMouseMove(event) {
                if (!isDragging) return;

                const currentMousePosition = { x: event.clientX, y: event.clientY };
                const deltaMove = {
                    x: (currentMousePosition.x - previousMousePosition.x) / window.innerWidth,
                    y: (currentMousePosition.y - previousMousePosition.y) / window.innerHeight
                };

                if (sculptMode) {
                    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
                    raycaster.setFromCamera(mouse, camera);
                    const intersects = raycaster.intersectObjects(parts, true);

                    if (intersects.length > 0) {
                        // Applica sculpting a tutte le parti intersecate
                        intersects.forEach(intersect => {
                            sculptMesh(intersect.object, intersect.point);
                            const partIndex = parts.indexOf(intersect.object);
                            if (partIndex >= 0) {
                                const frequency = 220 + (intersect.distance * 100);
                                synths[partIndex].frequency.value = frequency;
                            }
                        });
                    }
                } else {
                    rotationVelocity.x = -deltaMove.y * 2;
                    rotationVelocity.y = -deltaMove.x * 2;
                    
                    selectedPart.rotation.x += rotationVelocity.x;
                    selectedPart.rotation.y += rotationVelocity.y;

                    const partIndex = parts.indexOf(selectedPart);
                    if (partIndex >= 0) {
                        const frequency = 220 + (Math.abs(deltaMove.y) * 1000);
                        synths[partIndex].frequency.value = frequency;
                    }
                }

                previousMousePosition = currentMousePosition;
            }

            function onMouseUp() {
                isDragging = false;
                selectedPart = null;
            }

            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        }

        function animate() {
            requestAnimationFrame(animate);
            
            if (model) {
                model.rotation.y += 0.001;
            }

            if (!isDragging && selectedPart) {
                selectedPart.rotation.x += rotationVelocity.x;
                selectedPart.rotation.y += rotationVelocity.y;
                rotationVelocity.x *= dampingFactor;
                rotationVelocity.y *= dampingFactor;
            }

            renderer.render(scene, camera);
        }

        // Inizializza Tone.js quando l'utente interagisce
        document.addEventListener('click', async () => {
            await Tone.start();
        });

        // Mostra le istruzioni appropriate in base al dispositivo
        if (window.innerWidth <= 480) {
            document.querySelector('.desktop-instructions').style.display = 'none';
            document.querySelector('.mobile-instructions').style.display = 'block';
        }
  
        document.addEventListener('DOMContentLoaded', function() {
            let timer = null;
            window.addEventListener('scroll', function() {
                document.body.classList.add('is-scrolling');
                
                if (timer !== null) {
                    clearTimeout(timer);
                }
                
                timer = setTimeout(function() {
                    document.body.classList.remove('is-scrolling');
                }, 100);
            }, false);
        });
 
        let isScrolling;
        
        window.addEventListener('scroll', function() {
            document.body.classList.add('scrolling');
            
            // Clear our timeout throughout the scroll
            window.clearTimeout(isScrolling);
            
            isScrolling = setTimeout(function() {
                document.body.classList.remove('scrolling');
            }, 66); // Tempo ridotto per una risposta più immediata
        });
   
        // Gestione colore scrollbar
        let scrolling = false;
        let scrollTimeout;

        window.addEventListener('wheel', function() {
            if (!scrolling) {
                document.documentElement.classList.add('scrolling');
                scrolling = true;
            }
            
            clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(function() {
                document.documentElement.classList.remove('scrolling');
                scrolling = false;
            }, 150);
        }, { passive: true });

        // Touch events per dispositivi mobili
        window.addEventListener('touchmove', function() {
            if (!scrolling) {
                document.documentElement.classList.add('scrolling');
                scrolling = true;
            }
            
            clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(function() {
                document.documentElement.classList.remove('scrolling');
                scrolling = false;
            }, 150);
        }, { passive: true });

        
  
document.addEventListener('DOMContentLoaded', function () {
            setTimeout(function () {
                const splash = document.querySelector('.splash-screen');
                splash.style.display = 'none';
            }, 3000);
        });

  
        document.addEventListener('DOMContentLoaded', function() {
            const hamburger = document.querySelector('.hamburger-menu');
            const nav = document.querySelector('.nav-container');
            
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                nav.classList.toggle('active');
            });
        });
  
// Miglioro la transizione di nav-container e artwork-container: scompaiono in modo fluido e riappaiono solo in cima
(function() {
    const nav = document.querySelector('.nav-container');
    const artwork = document.querySelector('.artwork-container');
    if (nav) nav.style.transition = 'opacity 0.5s';
    if (artwork) artwork.style.transition = 'opacity 0.5s';
    window.addEventListener('scroll', function() {
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > 0) {
            if (nav) {
                nav.style.opacity = '0';
                nav.style.pointerEvents = 'none';
            }
            if (artwork) {
                artwork.style.opacity = '0';
                artwork.style.pointerEvents = 'none';
            }
        } else {
            if (nav) {
                nav.style.opacity = '1';
                nav.style.pointerEvents = '';
            }
            if (artwork) {
                artwork.style.opacity = '1';
                artwork.style.pointerEvents = '';
            }
        }
    }, false);
})();
  