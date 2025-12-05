// Globaler Schnee-Effekt
(function () {
    // Erstelle Canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'globalSnowCanvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.5s;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let animationId;
    let snowflakes = [];
    const snowflakeCount = 150;

    function initSnow() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        snowflakes = [];

        for (let i = 0; i < snowflakeCount; i++) {
            snowflakes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 1,
                speed: Math.random() * 1 + 0.5,
                drift: Math.random() * 0.5 - 0.25
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';

        snowflakes.forEach(flake => {
            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
            ctx.fill();

            flake.y += flake.speed;
            flake.x += flake.drift;

            if (flake.y > canvas.height) {
                flake.y = -10;
                flake.x = Math.random() * canvas.width;
            }
            if (flake.x > canvas.width) flake.x = 0;
            if (flake.x < 0) flake.x = canvas.width;
        });

        animationId = requestAnimationFrame(animate);
    }

    function startSnow() {
        initSnow();
        canvas.style.opacity = '0.8';
        animate();
    }

    function stopSnow() {
        canvas.style.opacity = '0';
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    }

    // Prüfe beim Laden ob Schnee aktiviert ist
    window.addEventListener('load', function () {
        if (localStorage.getItem('snowEnabled') === 'true') {
            startSnow();
        }
    });

    // Resize Handler
    window.addEventListener('resize', function () {
        if (localStorage.getItem('snowEnabled') === 'true') {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });

    // Globale Funktionen
    window.toggleGlobalSnow = function (enable) {
        if (enable) {
            startSnow();
        } else {
            stopSnow();
        }
    };
})();
