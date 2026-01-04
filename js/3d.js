// ============================================
// 3D SCENE - THREE.JS
// ============================================

let scene, camera, renderer, controls;
let heroMesh;

function init3D() {
    const container = document.getElementById('hero3D');
    if (!container) return;
    
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 10, 50);
    
    // Camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 2, 5);
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Controls (if OrbitControls is available)
    // Note: OrbitControls may need to be loaded separately
    // For now, we'll use mouse-based camera movement
    try {
        if (typeof THREE.OrbitControls !== 'undefined') {
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.enableZoom = false;
            controls.enablePan = false;
            controls.minPolarAngle = Math.PI / 3;
            controls.maxPolarAngle = Math.PI / 2.2;
        }
    } catch (e) {
        console.log('OrbitControls not available, using mouse movement');
    }
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xDC143C, 1);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0xDC143C, 0.5);
    pointLight.position.set(-5, 3, 5);
    scene.add(pointLight);
    
    // Create mountain/terrain
    createTerrain();
    
    // Create particles
    createParticles();
    
    // Animate
    animate();
    
    // Handle resize
    window.addEventListener('resize', onWindowResize);
}

function createTerrain() {
    // Create a simple terrain using a plane with noise
    const geometry = new THREE.PlaneGeometry(20, 20, 50, 50);
    
    // Add some height variation
    const vertices = geometry.attributes.position.array;
    for (let i = 2; i < vertices.length; i += 3) {
        vertices[i] = Math.random() * 2 - 1; // Random height
    }
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
    
    const material = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        metalness: 0.3,
        roughness: 0.7
    });
    
    const terrain = new THREE.Mesh(geometry, material);
    terrain.rotation.x = -Math.PI / 2;
    terrain.position.y = -2;
    scene.add(terrain);
    
    // Add a figure/character placeholder (simple geometry)
    const figureGeometry = new THREE.CapsuleGeometry(0.3, 1.5, 4, 8);
    const figureMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        metalness: 0.5,
        roughness: 0.5
    });
    
    heroMesh = new THREE.Mesh(figureGeometry, figureMaterial);
    heroMesh.position.set(0, 0, 0);
    scene.add(heroMesh);
}

function createParticles() {
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 50;
        positions[i + 1] = Math.random() * 20;
        positions[i + 2] = (Math.random() - 0.5) * 50;
        
        // Red tint for some particles
        const isRed = Math.random() > 0.7;
        colors[i] = isRed ? 0.86 : 0.1;
        colors[i + 1] = isRed ? 0.08 : 0.1;
        colors[i + 2] = isRed ? 0.24 : 0.1;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.6
    });
    
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    
    // Animate particles
    function animateParticles() {
        const positions = particles.attributes.position.array;
        for (let i = 1; i < positions.length; i += 3) {
            positions[i] -= 0.01;
            if (positions[i] < -5) {
                positions[i] = 20;
            }
        }
        particles.attributes.position.needsUpdate = true;
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate hero mesh slightly
    if (heroMesh) {
        heroMesh.rotation.y += 0.005;
    }
    
    // Update controls
    if (controls) {
        controls.update();
    }
    
    // Mouse interaction (using stored mouse position)
    if (camera && !controls) {
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 0.5 + 2 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);
    }
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    if (!camera || !renderer) return;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Mouse move for camera movement
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init3D);
} else {
    init3D();
}

// Product 3D Viewer (for product pages)
function initProduct3D(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(400, 400);
    container.appendChild(renderer.domElement);
    
    camera.position.z = 5;
    
    // Create a simple product representation
    const geometry = new THREE.BoxGeometry(2, 2, 0.1);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0x1a1a1a,
        metalness: 0.5,
        roughness: 0.5
    });
    const product = new THREE.Mesh(geometry, material);
    scene.add(product);
    
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);
    
    function animate() {
        requestAnimationFrame(animate);
        product.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

// Export
window.initProduct3D = initProduct3D;

