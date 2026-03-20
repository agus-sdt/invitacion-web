document.addEventListener('DOMContentLoaded', function () {

    /* ── INTRO (pantalla nombre) ── */
    const intro = document.getElementById('intro');
    const nombreGuardado = localStorage.getItem('nombreInvitado');

    if (nombreGuardado && intro) {
        intro.style.display = 'none';
    }

    window.guardarNombre = function () {
        const input = document.getElementById('nombre-global');
        const nombre = input.value.trim();

        if (!nombre) {
            input.style.border = "2px solid red";
            return;
        }

        localStorage.setItem('nombreInvitado', nombre);

        if (intro) {
            intro.classList.add('hide');

            setTimeout(() => {
                intro.style.display = 'none';
            }, 800);
        }
    };

    /* ── Formulario RSVP ── */
    const formRsvp = document.getElementById('rsvp-form');
    if (formRsvp) {
        formRsvp.addEventListener('submit', async function (e) {
            e.preventDefault();
            const btn = formRsvp.querySelector('button[type="submit"]');

            const nombre = localStorage.getItem('nombreInvitado');
            const dni = document.getElementById('dni').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const restriccion = document.getElementById('restriccion')?.value || 'Ninguna';

            if (!nombre || !dni || !telefono) {
                mostrarToast('error', '⚠️ Completá DNI y teléfono.');
                return;
            }

            btn.disabled = true;
            btn.textContent = 'Enviando...';

            try {
                const res = await fetch('/api/rsvp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, dni, telefono, restriccion })
                });

                const data = await res.json();

                if (res.ok && data.success) {
                    mostrarToast('success', `🥂 ¡Gracias ${nombre}! Tu asistencia fue confirmada.`);
                    formRsvp.reset();

                    const otraGroup = document.getElementById('otra-group');
                    if (otraGroup) {
                        otraGroup.style.display = 'none';
                    }
                } else {
                    mostrarToast('error', data.message || 'Hubo un error, intentá de nuevo.');
                }

            } catch {
                mostrarToast('error', 'No se pudo conectar con el servidor.');
            } finally {
                btn.disabled = false;
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

            const nombre = localStorage.getItem('nombreInvitado');
            const cancion = document.getElementById('cancion').value.trim();
            const artista = document.getElementById('artista').value.trim();

            if (!nombre || !cancion) {
                mostrarToast('error', '⚠️ Completá la canción.');
                return;
            }

            btn.disabled = true;
            btn.textContent = 'Enviando...';

            try {
                const res = await fetch('/api/musica', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, cancion, artista })
                });

                const data = await res.json();

                if (res.ok && data.success) {
                    mostrarToast('success', `🎵 ¡Gracias ${nombre}! Tu canción fue enviada.`);
                    formMusica.reset();
                } else {
                    mostrarToast('error', data.message || 'Hubo un error, intentá de nuevo.');
                }

            } catch {
                mostrarToast('error', 'No se pudo conectar con el servidor.');
            } finally {
                btn.disabled = false;
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

            const nombre = localStorage.getItem('nombreInvitado');
            const sugerencia = document.getElementById('sugerencia-carta').value.trim();

            if (!nombre || !sugerencia) {
                mostrarToast('error', '⚠️ Escribí tu mensaje.');
                return;
            }

            btn.disabled = true;
            btn.textContent = 'Enviando...';

            try {
                const res = await fetch('/api/carta', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, sugerencia })
                });

                const data = await res.json();

                if (res.ok && data.success) {
                    mostrarToast('success', `💌 ¡Gracias ${nombre}! Tu mensaje fue guardado.`);
                    formCarta.reset();
                } else {
                    mostrarToast('error', data.message || 'Hubo un error, intentá de nuevo.');
                }

            } catch {
                mostrarToast('error', 'No se pudo conectar con el servidor.');
            } finally {
                btn.disabled = false;
                btn.textContent = 'Enviar';
            }
        });
    }

    /* ── Toast notification ── */
    function mostrarToast(tipo, mensaje) {
        document.querySelector('.toast')?.remove();

        const toast = document.createElement('div');
        toast.className = `toast toast--${tipo}`;
        toast.innerHTML = `<span>${mensaje}</span><button class="toast__close">✕</button>`;
        document.body.appendChild(toast);

        requestAnimationFrame(() => toast.classList.add('toast--visible'));

        toast.querySelector('.toast__close')
            .addEventListener('click', () => cerrarToast(toast));

        setTimeout(() => cerrarToast(toast), 5000);
    }

    function cerrarToast(toast) {
        toast.classList.remove('toast--visible');
        toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }
});