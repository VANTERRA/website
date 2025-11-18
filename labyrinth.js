const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Aktuelles Level
let currentLevel = 1;

// Spieler-Eigenschaften
const player = {
    x: 30,
    y: 30,
    width: 15,
    height: 15,
    speed: 3,
    color: '#00ff00'
};

// Ziel
const goal = {
    x: 560,
    y: 560,
    width: 20,
    height: 20,
    color: '#ffff00'
};

// Tastatur-Status
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

// Level-Definitionen - Wände (grün)
const levels = {
    1: [
        // Außenwände
        { x: 0, y: 0, width: 600, height: 10 },
        { x: 0, y: 590, width: 600, height: 10 },
        { x: 0, y: 0, width: 10, height: 600 },
        { x: 590, y: 0, width: 10, height: 600 },

        // Verwinkelte Strecke - obere Wände
        //{ x: 10, y: 100, width: 150, height: 10 },
        { x: 150, y: 10, width: 10, height: 100 },
        { x: 160, y: 150, width: 100, height: 10 },
        { x: 250, y: 100, width: 10, height: 60 },
        { x: 260, y: 100, width: 120, height: 10 },
        { x: 370, y: 10, width: 10, height: 100 },
        { x: 380, y: 50, width: 100, height: 10 },
        { x: 470, y: 60, width: 10, height: 120 },

        // Mittlere Wände
        { x: 10, y: 200, width: 80, height: 10 },
        { x: 80, y: 210, width: 10, height: 80 },
        { x: 90, y: 280, width: 120, height: 10 },
        { x: 200, y: 200, width: 10, height: 90 },
        { x: 210, y: 280, width: 100, height: 10 },
        // { x: 300, y: 220, width: 10, height: 70 },
        { x: 310, y: 220, width: 80, height: 10 },
        { x: 380, y: 180, width: 10, height: 50 },
        { x: 390, y: 180, width: 100, height: 10 },
        { x: 480, y: 190, width: 10, height: 120 },

        // Untere Wände
        { x: 10, y: 380, width: 70, height: 10 },
        { x: 120, y: 340, width: 10, height: 50 },
        { x: 130, y: 340, width: 90, height: 10 },
        { x: 210, y: 350, width: 10, height: 80 },
        { x: 220, y: 420, width: 100, height: 10 },
        { x: 310, y: 370, width: 10, height: 60 },
        { x: 320, y: 370, width: 90, height: 10 },
        { x: 400, y: 320, width: 10, height: 60 },
        { x: 410, y: 320, width: 80, height: 10 },
        { x: 480, y: 330, width: 10, height: 100 },

        // Ganz unten
        { x: 10, y: 500, width: 100, height: 10 },
        { x: 100, y: 480, width: 10, height: 30 },
        { x: 110, y: 480, width: 120, height: 10 },
        { x: 220, y: 490, width: 10, height: 90 },
        { x: 300, y: 500, width: 10, height: 80 },
        { x: 310, y: 500, width: 150, height: 10 },
        { x: 450, y: 460, width: 10, height: 50 }
    ],
    2: [
        // Außenwände
        { x: 0, y: 0, width: 600, height: 10 },
        { x: 0, y: 590, width: 600, height: 10 },
        { x: 0, y: 0, width: 10, height: 600 },
        { x: 590, y: 0, width: 10, height: 600 },

        // Noch komplexere verwinkelte Strecke
        { x: 10, y: 80, width: 100, height: 10 },
        { x: 100, y: 40, width: 10, height: 50 },
        { x: 110, y: 40, width: 80, height: 10 },
        { x: 180, y: 50, width: 10, height: 100 },
        { x: 190, y: 140, width: 90, height: 10 },
        { x: 270, y: 60, width: 10, height: 90 },
        { x: 280, y: 60, width: 100, height: 10 },
        { x: 370, y: 70, width: 10, height: 90 },
        { x: 380, y: 150, width: 80, height: 10 },
        { x: 500, y: 150, width: 220, height: 10 },
        { x: 490, y: 40, width: 10, height: 120 },

        { x: 30, y: 200, width: 80, height: 10 },
        { x: 100, y: 170, width: 10, height: 40 },
        { x: 110, y: 170, width: 70, height: 10 },
        { x: 170, y: 180, width: 10, height: 80 },
        { x: 180, y: 250, width: 120, height: 10 },
        { x: 290, y: 200, width: 10, height: 60 },
        { x: 300, y: 200, width: 90, height: 10 },
        { x: 380, y: 210, width: 10, height: 100 },
        { x: 390, y: 300, width: 220, height: 10 },
        { x: 480, y: 240, width: 10, height: 70 },

        { x: 10, y: 340, width: 90, height: 10 },
        { x: 90, y: 300, width: 10, height: 50 },
        { x: 100, y: 300, width: 80, height: 10 },
        { x: 170, y: 310, width: 10, height: 100 },
        { x: 180, y: 400, width: 100, height: 10 },
        { x: 270, y: 350, width: 10, height: 60 },
        { x: 280, y: 350, width: 70, height: 10 },
        { x: 340, y: 360, width: 10, height: 90 },
        { x: 350, y: 440, width: 120, height: 10 },
        { x: 460, y: 380, width: 10, height: 70 },

        { x: 30, y: 480, width: 80, height: 10 },
        { x: 100, y: 460, width: 10, height: 30 },
        { x: 110, y: 460, width: 90, height: 10 },
        { x: 190, y: 470, width: 10, height: 100 },
        { x: 280, y: 500, width: 10, height: 70 },
        { x: 230, y: 500, width: 160, height: 10 },
        { x: 380, y: 510, width: 10, height: 60 },
        { x: 390, y: 520, width: 200, height: 10 }
    ]
};

// Fallen (rote Hindernisse) - diese führen zum Game Over
const traps = {
    1: [
        { x: 60, y: 110, width: 30, height: 30 },
        { x: 180, y: 120, width: 25, height: 25 },
        { x: 270, y: 70, width: 35, height: 35 },
        { x: 420, y: 100, width: 30, height: 30 },
        { x: 40, y: 240, width: 25, height: 25 },
        { x: 140, y: 230, width: 30, height: 30 },
        { x: 240, y: 240, width: 25, height: 25 },
        { x: 340, y: 250, width: 30, height: 30 },
        { x: 430, y: 250, width: 25, height: 25 },
        { x: 60, y: 420, width: 30, height: 30 },
        { x: 160, y: 380, width: 25, height: 25 },
        { x: 260, y: 460, width: 30, height: 30 },
        { x: 350, y: 400, width: 25, height: 25 },
        { x: 440, y: 380, width: 30, height: 30 },
        { x: 140, y: 520, width: 25, height: 25 },
        { x: 360, y: 540, width: 30, height: 30 }
    ],
    2: [
        { x: 210, y: 10, width: 35, height: 35 },
        { x: 30, y: 170, width: 25, height: 25 },
        { x: 50, y: 100, width: 25, height: 25 },
        { x: 130, y: 70, width: 30, height: 30 },
        { x: 220, y: 90, width: 25, height: 25 },
        { x: 310, y: 100, width: 30, height: 30 },
        { x: 420, y: 90, width: 50, height: 50 },
        { x: 520, y: 100, width: 30, height: 30 },
        { x: 60, y: 230, width: 25, height: 25 },
        { x: 130, y: 200, width: 30, height: 30 },
        { x: 220, y: 220, width: 25, height: 25 },
        { x: 330, y: 240, width: 30, height: 30 },
        { x: 430, y: 270, width: 25, height: 25 },
        { x: 520, y: 280, width: 30, height: 30 },
        { x: 40, y: 360, width: 25, height: 25 },
        { x: 130, y: 340, width: 30, height: 30 },
        { x: 220, y: 360, width: 25, height: 25 },
        { x: 310, y: 380, width: 30, height: 30 },
        { x: 400, y: 390, width: 25, height: 25 },
        { x: 510, y: 420, width: 30, height: 30 },
        { x: 60, y: 510, width: 25, height: 25 },
        { x: 150, y: 490, width: 30, height: 30 },
        { x: 240, y: 520, width: 25, height: 25 },
        { x: 330, y: 540, width: 30, height: 30 },
        { x: 430, y: 550, width: 25, height: 25 }
    ]
};

// Aktuelle Wände und Fallen
let walls = levels[currentLevel];
let currentTraps = traps[currentLevel];

// Event Listener für Tastatur
document.addEventListener('keydown', (e) => {
    if (keys.hasOwnProperty(e.key)) {
        e.preventDefault();
        keys[e.key] = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (keys.hasOwnProperty(e.key)) {
        e.preventDefault();
        keys[e.key] = false;
    }
});

// Level laden
function loadLevel(level) {
    currentLevel = level;
    walls = levels[currentLevel];
    currentTraps = traps[currentLevel];
    player.x = 30;
    player.y = 30;
}

// Kollisionserkennung
function checkCollision(newX, newY) {
    for (let wall of walls) {
        if (newX < wall.x + wall.width &&
            newX + player.width > wall.x &&
            newY < wall.y + wall.height &&
            newY + player.height > wall.y) {
            return true;
        }
    }
    return false;
}

// Prüfe ob Ziel erreicht wurde
function checkGoal() {
    if (player.x < goal.x + goal.width &&
        player.x + player.width > goal.x &&
        player.y < goal.y + goal.height &&
        player.y + player.height > goal.y) {
        return true;
    }
    return false;
}

// Prüfe Kollision mit Fallen
function checkTrapCollision() {
    for (let trap of currentTraps) {
        if (player.x < trap.x + trap.width &&
            player.x + player.width > trap.x &&
            player.y < trap.y + trap.height &&
            player.y + player.height > trap.y) {
            return true;
        }
    }
    return false;
}

// Spieler bewegen
function updatePlayer() {
    let newX = player.x;
    let newY = player.y;

    if (keys.ArrowUp) {
        newY -= player.speed;
    }
    if (keys.ArrowDown) {
        newY += player.speed;
    }
    if (keys.ArrowLeft) {
        newX -= player.speed;
    }
    if (keys.ArrowRight) {
        newX += player.speed;
    }

    // Nur bewegen wenn keine Kollision
    if (!checkCollision(newX, newY)) {
        player.x = newX;
        player.y = newY;
    }

    // Prüfe Fallen
    if (checkTrapCollision()) {
        alert('💀 Game Over! Du hast eine Falle berührt!');
        player.x = 30;
        player.y = 30;
        return;
    }

    // Prüfe ob Ziel erreicht
    if (checkGoal()) {
        if (currentLevel < 2) {
            alert(`🎉 Level ${currentLevel} geschafft! Weiter zu Level ${currentLevel + 1}`);
            loadLevel(currentLevel + 1);
        } else {
            alert('🏆 Glückwunsch! Du hast alle Level geschafft!');
            loadLevel(1);
        }
    }
}

// Zeichnen
function draw() {
    // Canvas löschen
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Level-Anzeige
    ctx.fillStyle = '#00ff00';
    ctx.font = '16px monospace';
    ctx.fillText(`Level: ${currentLevel}`, 20, 30);

    // Fallen zeichnen (rot, pulsierend)
    const trapPulse = Math.sin(Date.now() / 150) * 0.2 + 0.8;
    ctx.fillStyle = '#ff0000';
    ctx.globalAlpha = trapPulse;
    for (let trap of currentTraps) {
        ctx.fillRect(trap.x, trap.y, trap.width, trap.height);
    }
    ctx.globalAlpha = 1;

    // Ziel zeichnen (pulsierend)
    const pulse = Math.sin(Date.now() / 200) * 0.3 + 0.7;
    ctx.fillStyle = goal.color;
    ctx.globalAlpha = pulse;
    ctx.fillRect(goal.x, goal.y, goal.width, goal.height);
    ctx.globalAlpha = 1;

    // Wände zeichnen
    ctx.fillStyle = '#00ff00';
    for (let wall of walls) {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    }

    // Spieler zeichnen
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Spiel-Loop
function gameLoop() {
    updatePlayer();
    draw();
    requestAnimationFrame(gameLoop);
}

// Spiel starten
gameLoop();
