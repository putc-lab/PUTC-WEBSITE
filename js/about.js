const container = document.getElementById('model-container');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor(0x000000, 0);
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

camera.position.z = 150;

// Luci
scene.add(new THREE.AmbientLight(0xffffff, 0.8));

const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.4);
dirLight1.position.set(5, 5, 5);
scene.add(dirLight1);

const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
dirLight2.position.set(-5, -5, -5);
scene.add(dirLight2);

// Pivot group — ruota come una moneta
const pivot = new THREE.Group();
scene.add(pivot);

// Carica modello
const loader = new THREE.GLTFLoader();
let model;

loader.load(
    '3d/ImageToStl.com_nosfondo.glb',
    function (gltf) {
        model = gltf.scene;

        model.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshPhongMaterial({
                    color: child.material.color,
                    specular: 0xb400fb,
                    shininess: 150,
                    emissive: 0x000000
                });
            }
        });

        // Centra il modello
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        // Metti in piedi il modello dentro il pivot
        model.rotation.x = Math.PI / 2;

        // Scala
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 140 / maxDim;
        model.scale.set(scale, scale, scale);

        // Aggiungi al pivot, non alla scena
        pivot.add(model);
    },
    undefined,
    (error) => console.error('Errore caricamento modello:', error)
);

// Animazione — ruota il pivot su Y come una moneta
function animate() {
    requestAnimationFrame(animate);
    pivot.rotation.y += 0.03;
    renderer.render(scene, camera);
}
animate();

// Responsive
window.addEventListener('resize', () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
});