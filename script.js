document.addEventListener('DOMContentLoaded', () => {

    // --- Animación Hero e Interacción Header ---
    const body = document.body;
    // Nuevos selectores para las 3 columnas y títulos
    const heroColumns = document.querySelectorAll('.hero-images');
    const heroCta = document.querySelector('.hero-cta'); 
    
    const header = document.getElementById('main-header');
    const heroSection = document.querySelector('.hero');

    // 1. Bloqueo inicial
    body.classList.add('no-scroll');

    // 2. Disparar animación
    setTimeout(() => {
        // Activar columnas
        heroColumns.forEach(col => col.classList.add('active'));
        
        if(heroCta) heroCta.classList.add('active');

        // 3. Habilitar scroll al finalizar (3s igual que CSS transition)
        setTimeout(() => {
            body.classList.remove('no-scroll');
        }, 3000); 
    }, 100);

    // 4. Header visible solo tras scroll
    window.addEventListener('scroll', () => {
        if (!heroSection) return;
        if (window.scrollY > heroSection.offsetHeight - 100) {
            header.classList.add('header-visible');
        } else {
            header.classList.remove('header-visible');
        }
    });
    
    // Funcionalidad de filtrado para la galería de eventos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase active al botón clickeado
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.classList.remove('hide');
                    item.style.display = 'block'; // Asegura visualización correcta
                    // Pequeña animación de entrada
                    item.animate([
                        { opacity: 0, transform: 'scale(0.9)' },
                        { opacity: 1, transform: 'scale(1)' }
                    ], {
                        duration: 300,
                        fill: 'forwards'
                    });
                } else {
                    item.classList.add('hide');
                    item.style.display = 'none'; // Oculta del flujo
                }
            });
        });
    });

    // Desplazamiento suave para los enlaces de navegación (opcional si CSS scroll-behavior no es suficiente)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Scroll Animations ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Animates only once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // --- Video Interaction (Click to Unmute) ---
    const videoContainers = document.querySelectorAll('.gallery-item.video-item .img-container');
    
    videoContainers.forEach(container => {
        container.addEventListener('click', () => {
            const video = container.querySelector('video');
            const icon = container.querySelector('.text i');
            
            if (video) {
                video.muted = !video.muted;
                
                if (video.muted) {
                    // Muted
                    if(icon) {
                        icon.classList.remove('fa-volume-up');
                        icon.classList.add('fa-volume-mute');
                    }
                } else {
                    // Unmuted
                    if(icon) {
                        icon.classList.remove('fa-volume-mute');
                        icon.classList.add('fa-volume-up');
                    }
                }
            }
        });
    });
});