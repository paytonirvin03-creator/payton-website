import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

function initModel(containerId, color, isShield) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 2. Create Geometry
    let geometry;
    if (isShield) {
        // Shield Shape using LatheGeometry
        const points = [];
        // Create a "curved disk" profile
        for (let i = 0; i <= 10; i++) {
            // x = radius, y = depth/height
            const x = i * 0.15; 
            const y = Math.pow(i * 0.1, 2); // Slight curve for the front face
            points.push(new THREE.Vector2(x, y));
        }
        // Add a small rim at the edge
        points.push(new THREE.Vector2(1.6, 0.1)); 

        geometry = new THREE.LatheGeometry(points, 32);
    } else {
        // Kali/Tech Representation (Icosahedron/Wireframe)
        geometry = new THREE.IcosahedronGeometry(1, 1);
    }

    const material = new THREE.MeshPhongMaterial({
        color: color,
        wireframe: true,
        side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Rotate so the front of the shield faces the camera initially
    if (isShield) {
        mesh.rotation.x = Math.PI / 2;
    }

    // 3. Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    camera.position.z = 4;

    // 4. Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        if (isShield) {
            // Spin the shield for the interactive effect
            mesh.rotation.z += 0.01; 
        } else {
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.01;
        }
        renderer.render(scene, camera);
    }

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    animate();
}

// Initialize both models
initModel('shield-3d', 0x00ff88, true); // Green Vortex
initModel('kali-3d', 0x0088ff, false); // Blue Tech Sphere
