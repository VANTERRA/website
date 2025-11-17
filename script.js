document.addEventListener('DOMContentLoaded', function () {
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Simuliere Formular-Übermittlung
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            console.log('Formulardaten:', data);

            // Zeige Bestätigungsnachricht
            alert('Vielen Dank für Ihre Nachricht. Ein Mitarbeiter von VANTERRA wird sich in Kürze bei Ihnen melden.\n\nBitte beachten Sie: Alle Kommunikation wird überwacht und protokolliert.');

            contactForm.reset();
        });
    }

    // Easter Egg: Konsolenwarnung
    console.warn('%c⚠️ VANTERRA SICHERHEITSWARNUNG', 'color: red; font-size: 20px; font-weight: bold;');
    console.log('%cUnbefugter Zugriff auf diese Konsole wird überwacht und protokolliert.', 'color: #e94560; font-size: 14px;');
    console.log('%cSollten Sie verdächtige Aktivitäten bemerken, kontaktieren Sie sofort die Sicherheitsabteilung.', 'color: #666; font-size: 12px;');
});
