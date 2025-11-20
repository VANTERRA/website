document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const loginSection = document.getElementById('loginSection');
    const protectedContent = document.getElementById('protectedContent');
    const errorMessage = document.getElementById('errorMessage');
    const logoutBtn = document.getElementById('logoutBtn');

    // Passwort (kann später geändert werden)
    const correctPassword = 'Zugangsdaten';

    // Prüfe ob bereits eingeloggt
    if (sessionStorage.getItem('employeeLoggedIn') === 'true') {
        showProtectedContent();
    }

    // Login Form Handler
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const password = document.getElementById('password').value;

        if (password === correctPassword) {
            sessionStorage.setItem('employeeLoggedIn', 'true');
            showProtectedContent();
            errorMessage.textContent = '';
        } else {
            errorMessage.textContent = '⚠️ Falsches Passwort. Zugriff verweigert.';
            errorMessage.style.color = 'var(--highlight-color)';

            // Warnung in Konsole
            console.warn('SICHERHEITSWARNUNG: Fehlgeschlagener Anmeldeversuch im Mitarbeiterbereich');
        }
    });

    // Logout Handler
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            sessionStorage.removeItem('employeeLoggedIn');
            hideProtectedContent();
        });
    }

    function showProtectedContent() {
        loginSection.style.display = 'none';
        protectedContent.style.display = 'block';

        // Zeige Hausmeister-Link
        const hausmeisterLink = document.getElementById('hausmeisterLink');
        if (hausmeisterLink) {
            hausmeisterLink.style.display = 'block';
        }
    }

    function hideProtectedContent() {
        loginSection.style.display = 'block';
        protectedContent.style.display = 'none';
        document.getElementById('password').value = '';

        // Verstecke Hausmeister-Link
        const hausmeisterLink = document.getElementById('hausmeisterLink');
        if (hausmeisterLink) {
            hausmeisterLink.style.display = 'none';
        }
    }
});
