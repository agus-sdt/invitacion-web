document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');

    function handleScroll() {
        const carousel = document.getElementById('home');
        const threshold = carousel ? carousel.offsetHeight - navbar.offsetHeight : window.innerHeight;

        if ((window.scrollY || window.pageYOffset) >= threshold) {
            navbar.classList.add('navbar-visible');
        } else {
            navbar.classList.remove('navbar-visible');
        }
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
});