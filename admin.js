function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Einfache Authentifizierung (in Produktion sollte dies serverseitig erfolgen)
    if (username === 'admin' && password === 'C1rv0n!X24') {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminContent').style.display = 'block';
        document.getElementById('errorMessage').style.display = 'none';
        sessionStorage.setItem('adminLoggedIn', 'true');
    } else {
        document.getElementById('errorMessage').style.display = 'block';
    }
}

function handleLogout() {
    sessionStorage.removeItem('adminLoggedIn');
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('adminContent').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

// Prüfe ob bereits eingeloggt
window.onload = function () {
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminContent').style.display = 'block';
    }
}
