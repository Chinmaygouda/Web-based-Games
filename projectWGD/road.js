// Set up the scene, camera, and renderer
let scene, camera, renderer;
let roadSegments = [];
let msq=document.querySelector(".msg_cont")//accesing msg
const roadLength = 20000; // Length of each road segment
const segmentCount = 5; // Number of road segments
let currentZ = 0; // Position for the road generation
let vehicle; // Main player vehicle
let vehicleSpeed = 0.4; // Speed of the player vehicle
let vehicleDirection = 0; // Direction (-1: left, 1: right)
let npcs = []; // Array to store NPC vehicles




let score = 0; // Player's current score
let highScore = 0; // High score
let scoreDisplay = document.createElement("div"); // Create a score display element
scoreDisplay.style.position = "absolute";
scoreDisplay.style.top = "20px";
scoreDisplay.style.left = "20px";
scoreDisplay.style.fontSize = "24px";
scoreDisplay.style.color = "white";
scoreDisplay.innerHTML = `Score: ${score} | High Score: ${highScore}`;
document.body.appendChild(scoreDisplay);







function init() {
    // Create scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add light source
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    scene.add(light);

    // Create road segments
    for (let i = 0; i < segmentCount; i++) {
        createRoadSegment(currentZ);
    }

    // Create player vehicle
    createVehicle();

    // Add random NPC vehicles
    for (let i = 0; i < 5; i++) {
        createNPC();
    }

    camera.position.set(0, 2, 10); // Position the camera

    // Start animation
    animate();
}

// Create a road segment
function createRoadSegment(z) {
    const geometry = new THREE.BoxGeometry(10, 0.1, roadLength);
    const material = new THREE.MeshBasicMaterial({ color: 0x555555 }); // Grey road
    const roadSegment = new THREE.Mesh(geometry, material);
    roadSegment.position.set(0, 0, z);
    scene.add(roadSegment);
    roadSegments.push(roadSegment);
}

// Create the player vehicle
function createVehicle() {
    const geometry = new THREE.BoxGeometry(1, 0.5, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red player vehicle
    vehicle = new THREE.Mesh(geometry, material);
    vehicle.position.set(0, 0.5, 0); // Position the vehicle above the road
    scene.add(vehicle);
}

// Create random NPC vehicles
function createNPC() {
    const geometry = new THREE.BoxGeometry(1, 0.5, 2);
    const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff }); // Random color
    const npc = new THREE.Mesh(geometry, material);
    npc.position.set(
        Math.random() * 8 - 4, // Random x position within road width
        0.5, // Position above the road
        Math.random() * -100 - 50 // Random z position far ahead
    );
    scene.add(npc);
    npcs.push(npc);
}

let gamePaused = false; // Game state flag to pause score updates

function updateScore() {
    if (!gamePaused) { // Update score only if the game is not paused
        
        score += 1; // Increment score (you can change the logic based on gameplay)
        if (score > highScore) {
            highScore = score; // Update high score
            // Highlight high score
            scoreDisplay.style.color = "gold"; // Highlight in gold
            setTimeout(() => {
                scoreDisplay.style.color = "white"; // Return to white after highlighting
            }, 1000);
        }
        // Update score display
        scoreDisplay.innerHTML = `Score: ${score} | High Score: ${highScore}`;
    }
}

// Check for collisions between the player vehicle and NPCs
function checkCollisions() {
    for (let i = 0; i < npcs.length; i++) {
        const npc = npcs[i];
        const distance = vehicle.position.distanceTo(npc.position);

        // If distance is small enough, a collision occurred
        if (distance < 1.1) {
            console.log("Collision detected!");
            vehicle.position.set(0, 0.5, 0);
            msq.classList.remove("hide");
            stop(); // Stop the game
            gamePaused = true; // Pause the game
         
        }
    }
}

// Reset the game
function resetGame() {
    msq.classList.add("hide");
    vehicleSpeed = 0.4;
    score = 0; // Reset the score
    gamePaused = false; // Resume the game
    vehicle.position.set(0, 0.5, 0); // Reset player vehicle position
    npcs.forEach(npc => {
        npc.position.set(
            Math.random() * 8 - 4, // Reset random x position
            0.5,
            Math.random() * -100 - 50 // Reset z position
        );
    });
    console.log("Game reset!");
    updateScore(); // Update score display after reset
}

//stop game
function stop(){
    vehicleSpeed = 0;
    vehicleDirection = 0;
    vehicle.position.set(0, 0.5, 0);
}



// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Move road segments forward
    for (let i = 0; i < roadSegments.length; i++) {
        roadSegments[i].position.z += vehicleSpeed;
        updateScore();
    }

    // Recycle road segments
    if (roadSegments[0].position.z > roadLength / 2) {
        const segment = roadSegments.shift();
        segment.position.z = currentZ - roadLength;
        roadSegments.push(segment);
        currentZ -= roadLength;
    }

    // Move NPCs forward and recycle them
    npcs.forEach(npc => {
        npc.position.z += vehicleSpeed;
        if (npc.position.z > 10) {
            npc.position.z = Math.random() * -100 - 50;
            npc.position.x = Math.random() * 8 - 4;
        }
    });

    // Check for collisions
    checkCollisions();

    // Move player vehicle
    vehicle.position.x += vehicleDirection * 0.2; // Allow player to move left or right
    vehicle.position.x = Math.max(-4.5, Math.min(4.5, vehicle.position.x)); // Keep within bounds

    renderer.render(scene, camera);
}

// Handle keyboard input for player movement
window.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") {
        vehicleDirection = -.6; // Move left
    } else if (event.key === "ArrowRight") {
        vehicleDirection = .6; // Move right
    }
    
});

window.addEventListener("keyup", event => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        vehicleDirection = 0; // Stop moving
    }
});

// Handle window resizing
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize the game
init();