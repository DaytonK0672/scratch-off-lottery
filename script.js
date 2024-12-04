const canvas = document.getElementById('scratch-off-canvas');
const ctx = canvas.getContext('2d');

// Canvas size
canvas.width = 300;
canvas.height = 150;

// Game state variables
let isScratching = false;
let scratchArea = [];
let prize = null;

// Create the scratch-off area
function createScratchArea() {
    // Draw a gray "scratching" cover
    ctx.fillStyle = '#999';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add prize text (hidden under the scratch-off layer)
    prize = Math.random() > 0.5 ? 'You Win $50!' : 'Try Again!'; // Random prize
    ctx.fillStyle = '#333';
    ctx.font = '20px Arial';
    ctx.fillText(prize, canvas.width / 2 - ctx.measureText(prize).width / 2, canvas.height / 2);
}

// Scratch off effect
function startScratch(event) {
    isScratching = true;
    const mousePos = getMousePos(event);
    scratch(mousePos.x, mousePos.y);
}

// Stop scratching
function stopScratch() {
    isScratching = false;
}

// Get mouse position relative to canvas
function getMousePos(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

// Scratch off
function scratch(x, y) {
    ctx.globalCompositeOperation = 'destination-out'; // Erase the cover
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
}

// Track mouse movement and scratch
canvas.addEventListener('mousemove', (event) => {
    if (isScratching) {
        const mousePos = getMousePos(event);
        scratch(mousePos.x, mousePos.y);
    }
});

canvas.addEventListener('mousedown', startScratch);
canvas.addEventListener('mouseup', stopScratch);
canvas.addEventListener('touchstart', (e) => startScratch(e.touches[0]));
canvas.addEventListener('touchend', stopScratch);
canvas.addEventListener('touchmove', (e) => {
    if (isScratching) {
        const mousePos = getMousePos(e.touches[0]);
        scratch(mousePos.x, mousePos.y);
    }
});

// Reset game
document.getElementById('resetButton').addEventListener('click', resetGame);

// Reset the scratch-off ticket and game state
function resetGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createScratchArea();
    document.getElementById('message').textContent = 'Try your luck! Scratch the area to reveal your prize.';
}

// Initialize the game
createScratchArea();
