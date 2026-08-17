// assets/js/scene3d.js

(function () {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    // إعداد المشهد والكاميرا
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        55,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.z = 6;

    // إعداد محرك العرض مع دعم الشفافية
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // الحاوية الكلية لجميع العناصر الهندسية
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. النواة المركزية (الأمان والموثوقية المهنية)
    const coreGeometry = new THREE.IcosahedronGeometry(1.2, 0);
    const coreMaterial = new THREE.MeshStandardMaterial({
        color: 0x0b192c, // كحلي غامق
        metalness: 0.85,
        roughness: 0.15,
        flatShading: true
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    masterGroup.add(coreMesh);

    // 2. الهيكل الخارجي الشبكي (الربط والتكامل الرقمي)
    const wireGeometry = new THREE.IcosahedronGeometry(2.1, 1);
    const wireMaterial = new THREE.MeshBasicMaterial({
        color: 0x1e3e62,
        wireframe: true,
        transparent: true,
        opacity: 0.35
    });
    const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
    masterGroup.add(wireMesh);

    // 3. مدارات حلقية دوارة (المسارات واللوائح التنظيمية)
    const createRing = (radius, tiltX, tiltY, color) => {
        const ringGeo = new THREE.TorusGeometry(radius, 0.015, 16, 100);
        const ringMat = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.6
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = tiltX;
        ring.rotation.y = tiltY;
        return ring;
    };

    const ring1 = createRing(2.8, Math.PI / 3, 0, 0x1e3e62);
    const ring2 = createRing(3.2, -Math.PI / 4, Math.PI / 6, 0x2563eb);
    masterGroup.add(ring1);
    masterGroup.add(ring2);

    // 4. سحابة الجسيمات المهنية (الكوادر والمكاتب الهندسية)
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        const radius = 3.5 + Math.random() * 2.5;
        const theta = THREE.MathUtils.randFloatSpread(360);
        const phi = THREE.MathUtils.randFloatSpread(360);

        positions[i] = radius * Math.sin(theta) * Math.cos(phi);
        positions[i + 1] = radius * Math.sin(theta) * Math.sin(phi);
        positions[i + 2] = radius * Math.cos(theta);
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
        color: 0x1e3e62,
        size: 0.04,
        transparent: true,
        opacity: 0.5
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    masterGroup.add(particleSystem);

    // الإضاءة
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const pointLight = new THREE.PointLight(0x2563eb, 1.5, 20);
    pointLight.position.set(-4, -3, 2);
    scene.add(pointLight);

    // تفاعل المؤشر والشاشات اللمسية
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handlePointerMove = (clientX, clientY) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -(((clientY - rect.top) / rect.height) * 2 - 1);
        targetRotationY = mouseX * 0.6;
        targetRotationX = -mouseY * 0.6;
    };

    window.addEventListener('mousemove', (e) => {
        handlePointerMove(e.clientX, e.clientY);
    });

    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });

    // حلقة التحريك التزامنية
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // حركات دورانية متباينة
        coreMesh.rotation.y += 0.008;
        coreMesh.rotation.x += 0.004;

        wireMesh.rotation.y -= 0.003;
        wireMesh.rotation.z += 0.002;

        ring1.rotation.z += 0.005;
        ring2.rotation.z -= 0.007;

        particleSystem.rotation.y = elapsedTime * 0.03;

        // تنعيم التجاوب مع الماوس (Smooth Damping)
        masterGroup.rotation.y += (targetRotationY - masterGroup.rotation.y) * 0.05;
        masterGroup.rotation.x += (targetRotationX - masterGroup.rotation.x) * 0.05;

        // تأثير الطفو الهادئ
        masterGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.1;

        renderer.render(scene, camera);
    }
    animate();

    // التجاوب مع تعديل حجم الشاشة
    window.addEventListener('resize', () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
})();
