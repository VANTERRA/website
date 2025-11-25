// Kabel-Minispiel für VANTERRA

const cables = [
    { id: 1, color: '#e74c3c', label: 'ROT' },      // Rot
    { id: 2, color: '#3498db', label: 'BLAU' },     // Blau
    { id: 3, color: '#ffeb3b', label: 'GELB' },     // Gelb (heller/intensiver)
    { id: 4, color: '#2ecc71', label: 'GRÜN' },     // Grün
    { id: 5, color: '#9b59b6', label: 'LILA' },     // Lila
    { id: 6, color: '#e67e22', label: 'ORANGE' },   // Orange
    { id: 7, color: '#1abc9c', label: 'TÜRKIS' },   // Türkis
    { id: 8, color: '#e91e63', label: 'PINK' }      // Pink
];

// Richtige Reihenfolge (kann angepasst werden)
const correctOrder = [3, 1, 5, 2, 4, 6, 7, 8]; // GELB, ROT, LILA, BLAU, GRÜN, ORANGE, TÜRKIS, GRAU

// Freizugebender Code
const secretCode = '-075';

let cutCables = [];
let gameOver = false;

// Kabel zufällig mischen und anzeigen
function initGame() {
    const container = document.getElementById('cablesContainer');
    container.innerHTML = '';

    // Kabel in zufälliger Reihenfolge anzeigen (aber Lösung bleibt gleich)
    const shuffledCables = [...cables].sort(() => Math.random() - 0.5);

    shuffledCables.forEach(cable => {
        const cableDiv = document.createElement('div');
        cableDiv.className = 'cable';
        cableDiv.innerHTML = `
            <div class="cable-connector" style="background: ${cable.color};"></div>
            <div class="cable-label" style="color: ${cable.color};">${cable.label}</div>
            <div class="cable-wire" style="background: linear-gradient(135deg, ${cable.color} 0%, ${adjustColor(cable.color, -30)} 100%);" 
                 data-cable-id="${cable.id}" 
                 onclick="cutCable(${cable.id})">
            </div>
            <div class="cable-connector" style="background: ${cable.color};"></div>
        `;
        container.appendChild(cableDiv);
    });
}

// Kabel durchschneiden
function cutCable(cableId) {
    if (gameOver) return;

    // Prüfen ob Kabel bereits durchgeschnitten
    if (cutCables.includes(cableId)) return;

    const cableWire = document.querySelector(`[data-cable-id="${cableId}"]`);
    const expectedCableId = correctOrder[cutCables.length];

    if (cableId === expectedCableId) {
        // Richtig!
        cutCables.push(cableId);
        cableWire.classList.add('cut');

        updateStatus(`&gt; Kabel ${getCableLabel(cableId)} durchgeschnitten... ✓`);
        updateCutsText();

        // Prüfen ob alle Kabel durchgeschnitten
        if (cutCables.length === correctOrder.length) {
            setTimeout(() => {
                revealCode();
            }, 500);
        }
    } else {
        // Falsch!
        showError();
        setTimeout(() => {
            resetGame();
        }, 2000);
    }
}

// Zeige den geheimen Code
function revealCode() {
    gameOver = true;
    updateStatus('&gt; ZUGRIFF GEWÄHRT! Code wird angezeigt...');

    const codeDisplay = document.getElementById('codeDisplay');
    codeDisplay.style.display = 'block';

    // Code mit Animation anzeigen
    let currentCode = '???';
    codeDisplay.textContent = currentCode;

    setTimeout(() => {
        let index = 0;
        const revealInterval = setInterval(() => {
            currentCode = currentCode.substring(0, index) + secretCode[index] + currentCode.substring(index + 1);
            codeDisplay.textContent = currentCode;
            index++;

            if (index >= secretCode.length) {
                clearInterval(revealInterval);
                updateStatus(`&gt; SYSTEMCODE: ${secretCode} - Zugriff erfolgreich!`);

                // Zeige Reset-Button
                document.getElementById('resetButton').style.display = 'block';
            }
        }, 300);
    }, 1000);
}

// Fehler anzeigen
function showError() {
    gameOver = true;
    const errorDisplay = document.getElementById('errorDisplay');
    errorDisplay.style.display = 'block';
    updateStatus('&gt; FEHLER! Sicherheitssystem aktiviert!');
}

// Spiel zurücksetzen
function resetGame() {
    cutCables = [];
    gameOver = false;

    document.getElementById('codeDisplay').style.display = 'none';
    document.getElementById('errorDisplay').style.display = 'none';
    document.getElementById('resetButton').style.display = 'none';

    updateStatus('&gt; System bereit...');
    updateCutsText();

    initGame();
}

// Status-Text aktualisieren
function updateStatus(text) {
    document.getElementById('statusText').textContent = text;
}

// Anzahl geschnittener Kabel aktualisieren
function updateCutsText() {
    document.getElementById('cutsText').textContent = `> Durchschnittene Kabel: ${cutCables.length}/8`;
}

// Kabel-Label anhand ID holen
function getCableLabel(id) {
    const cable = cables.find(c => c.id === id);
    return cable ? cable.label : '';
}

// Farbe abdunkeln
function adjustColor(color, amount) {
    const num = parseInt(color.replace('#', ''), 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
    const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

// Spiel initialisieren
document.addEventListener('DOMContentLoaded', () => {
    initGame();
});
