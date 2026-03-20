// main.js — configuración general
// (jQuery disponible globalmente para lightbox, pero no lo usamos acá)

document.addEventListener('DOMContentLoaded', function () {

    // Configuración del lightbox
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            resizeDuration: 200,
            wrapAround: true,
            albumLabel: 'Foto %1 de %2',
            fadeDuration: 300
        });
    }

});

function guardarNombre() {
    const input = document.getElementById('nombre-global');
    const nombre = input.value.trim();

    if (!nombre) {
        input.style.border = "2px solid red";
        return;
    }

    localStorage.setItem('nombreInvitado', nombre);

    const intro = document.getElementById('intro');
    intro.classList.add('hide');

    setTimeout(() => {
        intro.style.display = 'none';
    }, 800);
}

document.addEventListener('DOMContentLoaded', () => {
    const nombre = localStorage.getItem('nombreInvitado');
    const intro = document.getElementById('intro');

    if (nombre) {
        intro.style.display = 'none';
    }
});