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

    // --- Media Scroller Horizontal Buttons ---
    const scrollers = document.querySelectorAll('.scroller-container');

    scrollers.forEach(container => {
        const scroller = container.querySelector('.media-scroller');
        const leftBtn = container.querySelector('.scroll-btn.left');
        const rightBtn = container.querySelector('.scroll-btn.right');
        
        // Distancia a scrollear (ancho de tarjeta + gap)
        const scrollAmount = 315; 

        if(leftBtn && rightBtn && scroller) {
            
            leftBtn.addEventListener('click', () => {
                scroller.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            });

            rightBtn.addEventListener('click', () => {
                scroller.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });
        }
    });

    // --- Reproductor de Música ---
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    const musicIcon = musicBtn ? musicBtn.querySelector('i') : null;

    if (musicBtn && bgMusic) {
        // Intentar reproducir automáticamente después de 3 segundos
        setTimeout(() => {
            const playPromise = bgMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    // Autoplay started
                    musicBtn.classList.add('playing');
                    if(musicIcon) {
                        musicIcon.classList.remove('fa-play');
                        musicIcon.classList.add('fa-pause');
                    }
                }).catch(error => {
                    // Autoplay was prevented
                    console.log("Autoplay prevenido. Usuario debe interactuar.");
                });
            }
        }, 3000);

        musicBtn.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                musicBtn.classList.add('playing');
                if(musicIcon) {
                    musicIcon.classList.remove('fa-play');
                    musicIcon.classList.add('fa-pause');
                }
            } else {
                bgMusic.pause();
                musicBtn.classList.remove('playing');
                if(musicIcon) {
                    musicIcon.classList.remove('fa-pause');
                    musicIcon.classList.add('fa-play');
                }
            }
        });
    }

});