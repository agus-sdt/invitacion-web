// Contador regresivo para la fecha del casamiento
document.addEventListener('DOMContentLoaded', function () {

    const weddingDate = new Date(2026, 11, 5, 18, 0, 0).getTime();
    const countdownContainer = document.getElementById('countdown');

    if (!countdownContainer) return;

    const countdownTimer = setInterval(function () {
        const now      = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            clearInterval(countdownTimer);
            countdownContainer.innerHTML = `
                <h2 class="font-display font-italic text-gold text-center">¡Es hoy!</h2>
            `;
            return;
        }

        const days    = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownContainer.innerHTML = `
            <div class="countdown">
                <div class="countdown__item">
                    <span class="countdown__number">${String(days).padStart(2, '0')}</span>
                    <span class="countdown__label">Días</span>
                </div>
                <div class="countdown__item">
                    <span class="countdown__number">${String(hours).padStart(2, '0')}</span>
                    <span class="countdown__label">Horas</span>
                </div>
                <div class="countdown__item">
                    <span class="countdown__number">${String(minutes).padStart(2, '0')}</span>
                    <span class="countdown__label">Minutos</span>
                </div>
                <div class="countdown__item">
                    <span class="countdown__number">${String(seconds).padStart(2, '0')}</span>
                    <span class="countdown__label">Segundos</span>
                </div>
            </div>
        `;

    }, 1000);
});