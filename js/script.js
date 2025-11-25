document.addEventListener('DOMContentLoaded', function () {
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Sammle Formulardaten
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Easter Egg: Prüfe auf spezielle Eingaben
            const specialName = 'Jonas Reuter';
            const specialMessage = 'Video Chimera';

            if (data.name === specialName && data.message.includes(specialMessage)) {
                console.log('%c🔓 GEHEIMER VIDEOZUGANG ERKANNT', 'color: #00ff00; font-size: 18px; font-weight: bold;');
                console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #00ff00;');
                console.log('%cZugangsdaten für das verschlüsselte Video:', 'color: #00ff00; font-size: 14px;');
                console.log('%cPasswort: DeltaChimera09!', 'color: #ffff00; font-size: 16px; font-weight: bold; background: #000; padding: 5px;');
                console.log('%cHinweis: Dieses Passwort gewährt Zugang zu geheimen Aufzeichnugen.', 'color: #ff9900; font-size: 12px;');
                console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #00ff00;');

                alert('Nachricht empfangen. Prüfen Sie die Entwicklerkonsole für weitere Informationen.');
            } else {
                console.log('Formulardaten:', data);

                // Zeige normale Bestätigungsnachricht
                alert('Vielen Dank für Ihre Nachricht. Ein Mitarbeiter von VANTERRA wird sich in Kürze bei Ihnen melden.\n\nBitte beachten Sie: Alle Kommunikation wird überwacht und protokolliert.');
            }

            contactForm.reset();
        });
    }

    // Easter Egg: Konsolenwarnung
    console.warn('%c⚠️ VANTERRA SICHERHEITSWARNUNG', 'color: red; font-size: 20px; font-weight: bold;');
    console.log('%cUnbefugter Zugriff auf diese Konsole wird überwacht und protokolliert.', 'color: #e94560; font-size: 14px;');
    console.log('%cSollten Sie verdächtige Aktivitäten bemerken, kontaktieren Sie sofort die Sicherheitsabteilung.', 'color: #666; font-size: 12px;');
});
