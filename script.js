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

// Scratch off effect with randomized strokes
function scratch(x, y) {
    ctx.globalCompositeOperation = 'destination-out'; // Erase the cover
    ctx.beginPath();
    let radius = Math.random() * 20 + 10; // Randomize the radius
    let angle = Math.random() * Math.PI * 2; // Randomize the direction of the scratch

    // Randomize the scratch pattern
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
    ctx.stroke();
}


let winningArea = { x: 0, y: 0, width: 50, height: 50 };

// Create the scratch-off area with a winning area
function createScratchArea() {
    // Draw a gray "scratching" cover
    ctx.fillStyle = '#999';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add prize text (hidden under the scratch-off layer)
    prize = Math.random() > 0.5 ? 'You Win $50!' : 'Try Again!'; // Random prize
    ctx.fillStyle = '#333';
    ctx.font = '20px Arial';
    ctx.fillText(prize, canvas.width / 2 - ctx.measureText(prize).width / 2, canvas.height / 2);

    // Randomly generate winning area
    winningArea.x = Math.random() * (canvas.width - 50);
    winningArea.y = Math.random() * (canvas.height - 50);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(winningArea.x, winningArea.y, winningArea.width, winningArea.height);
}

// Check if the player scratches over the winning area
function checkWin(x, y) {
    if (x > winningArea.x && x < winningArea.x + winningArea.width &&
        y > winningArea.y && y < winningArea.y + winningArea.height) {
        return true; // Player scratched over the winning area
    }
    return false;
}

// Track mouse movement and scratch
canvas.addEventListener('mousemove', (event) => {
    if (isScratching) {
        const mousePos = getMousePos(event);
        scratch(mousePos.x, mousePos.y);

        if (checkWin(mousePos.x, mousePos.y)) {
            document.getElementById('message').textContent = 'Congratulations! You Win!';
        }
    }
});

// Reset the game with animation
function resetGame() {
    // Clear canvas with fade-out effect
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 0;
    let fadeOut = setInterval(function() {
        ctx.globalAlpha += 0.1;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (ctx.globalAlpha >= 1) {
            clearInterval(fadeOut);
            createScratchArea();
            document.getElementById('message').textContent = 'Try your luck! Scratch the area to reveal your prize.';
        }
    }, 50);
}

// Play scratching sound
function playScratchSound() {
    const scratchSound = document.getElementById('scratchSound');
    scratchSound.play();
}

// Play win sound
function playWinSound() {
    const winSound = document.getElementById('winSound');
    winSound.play();
}

// Update scratch event with sound
function scratch(x, y) {
    playScratchSound(); // Play scratch sound
    ctx.globalCompositeOperation = 'destination-out'; // Erase the cover
    ctx.beginPath();
    let radius = Math.random() * 20 + 10; // Randomize the radius
    let angle = Math.random() * Math.PI * 2; // Randomize the direction of the scratch

    // Randomize the scratch pattern
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
    ctx.stroke();
}

// Show win message and play win sound
function checkWin(x, y) {
    if (x > winningArea.x && x < winningArea.x + winningArea.width &&
        y > winningArea.y && y < winningArea.y + winningArea.height) {
        document.getElementById('message').textContent = 'Congratulations! You Win!';
        playWinSound(); // Play win sound
        return true;
    }
    return false;
}

