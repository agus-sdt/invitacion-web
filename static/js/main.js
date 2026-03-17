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