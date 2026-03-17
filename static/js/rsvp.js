document.addEventListener('DOMContentLoaded', function () {

    /* ── Formulario RSVP ── */
    const formRsvp = document.getElementById('rsvp-form');
    if (formRsvp) {
        formRsvp.addEventListener('submit', async function (e) {
            e.preventDefault();
            const btn = formRsvp.querySelector('button[type="submit"]');

            const nombre      = document.getElementById('nombre').value.trim();
            const dni         = document.getElementById('dni').value.trim();
            const telefono    = document.getElementById('telefono').value.trim();
            const restriccion = document.getElementById('restriccion')?.value || 'Ninguna';

            if (!nombre || !dni || !telefono) {
                mostrarToast('error', '⚠️ Completá nombre, DNI y teléfono.');
                return;
            }

            btn.disabled    = true;
            btn.textContent = 'Enviando...';

            try {
                const res  = await fetch('/api/rsvp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, dni, telefono, restriccion })
                });
                const data = await res.json();

                if (res.ok && data.success) {
                    mostrarToast('success', '🥂 ¡Genial! Tu asistencia fue confirmada.');
                    formRsvp.reset();
                    otraGroup.style.display = 'none';
                } else {
                    mostrarToast('error', data.message || 'Hubo un error, intentá de nuevo.');
                }
            } catch {
                mostrarToast('error', 'No se pudo conectar con el servidor.');
            } finally {
                btn.disabled    = false;
                btn.textContent = 'Confirmar Asistencia';
            }
        });
    }

    /* ── Formulario Música ── */
    const formMusica = document.getElementById('musica-form');
    if (formMusica) {
        formMusica.addEventListener('submit', async function (e) {
            e.preventDefault();
            const btn = formMusica.querySelector('button[type="submit"]');

            const nombre  = document.getElementById('nombre-musica').value.trim();
            const cancion = document.getElementById('cancion').value.trim();
            const artista = document.getElementById('artista').value.trim();

            if (!nombre || !cancion) {
                mostrarToast('error', '⚠️ Completá tu nombre y la canción.');
                return;
            }

            btn.disabled    = true;
            btn.textContent = 'Enviando...';

            try {
                const res  = await fetch('/api/musica', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, cancion, artista })
                });
                const data = await res.json();

                if (res.ok && data.success) {
                    mostrarToast('success', '🎵 ¡Gracias! Tu canción fue enviada.');
                    formMusica.reset();
                } else {
                    mostrarToast('error', data.message || 'Hubo un error, intentá de nuevo.');
                }
            } catch {
                mostrarToast('error', 'No se pudo conectar con el servidor.');
            } finally {
                btn.disabled    = false;
                btn.textContent = 'Enviar Sugerencia';
            }
        });
    }

    /* ── Formulario Carta ── */
    const formCarta = document.getElementById('carta-form');
    if (formCarta) {
        formCarta.addEventListener('submit', async function (e) {
            e.preventDefault();
            const btn = formCarta.querySelector('button[type="submit"]');

            const nombre     = document.getElementById('nombre-carta').value.trim();
            const sugerencia = document.getElementById('sugerencia-carta').value.trim();

            if (!nombre || !sugerencia) {
                mostrarToast('error', '⚠️ Completá tu nombre y tu mensaje.');
                return;
            }

            btn.disabled    = true;
            btn.textContent = 'Enviando...';

            try {
                const res  = await fetch('/api/carta', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, sugerencia })
                });
                const data = await res.json();

                if (res.ok && data.success) {
                    mostrarToast('success', '💌 ¡Gracias! Tu mensaje fue guardado.');
                    formCarta.reset();
                } else {
                    mostrarToast('error', data.message || 'Hubo un error, intentá de nuevo.');
                }
            } catch {
                mostrarToast('error', 'No se pudo conectar con el servidor.');
            } finally {
                btn.disabled    = false;
                btn.textContent = 'Enviar';
            }
        });
    }

    /* ── Toast notification ── */
    function mostrarToast(tipo, mensaje) {
        // Eliminar toast anterior si existe
        document.querySelector('.toast')?.remove();

        const toast = document.createElement('div');
        toast.className = `toast toast--${tipo}`;
        toast.innerHTML = `<span>${mensaje}</span><button class="toast__close" aria-label="Cerrar">✕</button>`;
        document.body.appendChild(toast);

        // Animar entrada
        requestAnimationFrame(() => toast.classList.add('toast--visible'));

        // Cerrar al hacer click
        toast.querySelector('.toast__close').addEventListener('click', () => cerrarToast(toast));

        // Auto-cerrar a los 5s
        setTimeout(() => cerrarToast(toast), 5000);
    }

    function cerrarToast(toast) {
        toast.classList.remove('toast--visible');
        toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }
});