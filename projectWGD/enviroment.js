// Function to set up the environment
function setupEnvironment(scene) {
    // Sky and Fog
    const skyColor = 0xbcd4ff; // Light blue sky (morning)
    scene.background = new THREE.Color(skyColor); // Set background to sky color
    scene.fog = new THREE.Fog(skyColor, 20, 100); // Add fog for distance
  
    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Soft light to illuminate everything
    scene.add(ambientLight);
  
    // Sunlight
    const sunLight = new THREE.DirectionalLight(0xffd27f, 1.5); // Warm morning sunlight
    sunLight.position.set(5, 10, 5);
    sunLight.castShadow = true; // Enable shadows for objects
    scene.add(sunLight);
  
    // Ground Plane for additional contrast (optional)
    const groundGeometry = new THREE.PlaneGeometry(200, 200);
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x87a96b }); // Green for grass
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2; // Lay flat on the ground
    ground.position.y = -0.1; // Slightly below the road to avoid overlapping
    scene.add(ground);
  }