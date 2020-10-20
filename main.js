
// Player positions
let px = 10;
let py = 10;

// Grid size and tile count
const gs = 20;
const tc = 20;

// Apple init position
let ax = 15;
let ay = 15;

// X Y velocities
let xv = 0;
let yv = 0;

// Trail
let trail = [];
let tail = 1;

// Get HTML Element
const canva = document.getElementById('game');
canva.width = 400;
canva.height = 400;
// Get context utilities
const ctx = canva.getContext('2d');

// Add event listeners for key events
document.addEventListener('keydown', keyPush)

// Render 15 times per second
setInterval(render, 1000/10);

// Render function
function render() {
    px += xv;
    py += yv;

    // Wrap if snake goes over
    if (px < 0) {
        px = tc - 1;
    }
    if (px > tc - 1) {
        px = 0;
    }
    if (py < 0) {
        py = gs - 1;
    }
    if (py > gs - 1) {
        py = 0;
    }

    // canva
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canva.width, canva.height);

    // Trail
    ctx.fillStyle = "lime";
    for (let i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs-2, gs-2);
        // check collision
        if (trail[i].x === px && trail[i].y === py) {
            tail = 1;
        }
    }

    // Add trail
    trail.push({ x: px, y: py });
    // Remove trail bigger than tail
    while (trail.length > tail) {
        trail.shift();
    }

    // Stepping on apple
    if (px === ax && py === ay) {
        tail++;
        do {
            ax = Math.floor(Math.random() * tc);
            ay = Math.floor(Math.random() * tc);
        } while (trail.find((pos) => pos.x === ax && pos.y === ay))
    }

    // Apple
    ctx.fillStyle = "red";
    ctx.fillRect(ax * gs, ay * gs, gs-2, gs-2);

}

function keyPush(e) {
    if (e.keyCode === 37 && xv !== 1) {
        xv= -1;
        yv= 0;
    } else if (e.keyCode === 38 && yv !== 1) {
        xv= 0;
        yv= -1;
    } else if (e.keyCode === 39 && xv !== -1) {
        xv= 1;
        yv= 0;
    } else if (e.keyCode === 40 && yv !== -1) {
        xv= 0;
        yv= 1;
    }
}
