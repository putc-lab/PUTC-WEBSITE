 let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        let renderer = new THREE.WebGLRenderer({ antialias: true });
        let container = document.getElementById('model-container');

        // Imposta le dimensioni iniziali
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        container.appendChild(renderer.domElement);

        // Aggiungi luce
        const light = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(light);

        // Aggiungi luce direzionale
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
        directionalLight2.position.set(-5, -5, -5);
        scene.add(directionalLight2);

        // Posiziona la camera
        camera.position.z = 95;

        // Carica il modello
        const loader = new THREE.GLTFLoader();
        let model;

        loader.load(
            '3d/ImageToStl.com_nosfondo.glb',
            function (gltf) {
                model = gltf.scene;

                // Applica il materiale con riflessi viola
                model.traverse((child) => {
                    if (child.isMesh) {
                        const originalColor = child.material.color;
                        child.material = new THREE.MeshPhongMaterial({
                            color: originalColor,  // Usa il colore originale
                            specular: 0xb400fb,  // Mantiene i riflessi viola
                            shininess: 150,
                            emissive: 0x000000
                        });
                    }
                });

                scene.add(model);

                // Ruota il modello in posizione verticale
                model.rotation.x = 0; // Rimuoviamo la rotazione iniziale

                // Scala il modello
                model.scale.set(1, 0.3, 1);

                // Centra il modello
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                model.position.sub(center);
            },
            undefined,
            function (error) {
                console.error(error);
            }
        );

        // Animazione
        function animate() {
            requestAnimationFrame(animate);
            if (model) {
                model.rotation.x += 0.007;
                model.rotation.y += 0.009; // Aggiunta rotazione Y leggermente più lenta
            }
            renderer.render(scene, camera);
        }
        animate();

        // Responsive
        let initialScale = { x: 1, y: 0.3, z: 1 }; // Memorizza la scala iniziale con i valori esatti
        window.addEventListener('resize', function () {
            const width = container.clientWidth;
            const height = container.clientHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize(width, height, false);

            // Mantieni la scala del modello
            if (model) {
                model.scale.set(initialScale.x, initialScale.y, initialScale.z);
            }
        });

        // Aggiungi evento di click al menu hamburger
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const navContainer = document.querySelector('.nav-container');

        hamburgerMenu.addEventListener('click', function () {
            navContainer.classList.toggle('active');
        });