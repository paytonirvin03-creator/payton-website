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
        // 1. Define the 2D Shape of a Medieval Shield
        const shape = new THREE.Shape();
        
        // Start at top-left
        shape.moveTo(-1, 1.2); 
        // Top edge
        shape.lineTo(1, 1.2);  
        // Right side
        shape.lineTo(1, 0);   
        // Bottom point (quadratic curve for the shield "V" shape)
        shape.quadraticCurveTo(1, -1.2, 0, -1.5);
        shape.quadraticCurveTo(-1, -1.2, -1, 0);
        // Back to start
        shape.lineTo(-1, 1.2);

        // 2. Extrude the shape to give it thickness
        const extrudeSettings = {
            steps: 2,
            depth: 0.2,
            bevelEnabled: true,
            bevelThickness: 0.1,
            bevelSize: 0.1,
            bevelSegments: 3
        };

        geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    } else {
        // Kali/Tech Representation (Icosahedron/Wireframe)
        geometry = new THREE.IcosahedronGeometry(1, 1);
    }

    const material = new THREE.MeshPhongMaterial({
        color: color,
        wireframe: true,
        emissive: color,
        emissiveIntensity: 0.5,
        side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Rotate so the front of the shield faces the camera initially
    if (isShield) {
        mesh.rotation.y = Math.PI; // Flip to face forward
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
