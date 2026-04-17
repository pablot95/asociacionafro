document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;
    const heroColumns = document.querySelectorAll('.hero-images');
    const heroCta = document.querySelector('.hero-cta'); 
    
    const header = document.getElementById('main-header');
    const heroSection = document.querySelector('.hero');

    body.classList.add('no-scroll');

    setTimeout(() => {
        heroColumns.forEach(col => col.classList.add('active'));
        
        if(heroCta) heroCta.classList.add('active');

        setTimeout(() => {
            body.classList.remove('no-scroll');
        }, 3000); 
    }, 100);

    window.addEventListener('scroll', () => {
        if (!heroSection) return;
        if (window.scrollY > heroSection.offsetHeight - 100) {
            header.classList.add('header-visible');
        } else {
            header.classList.remove('header-visible');
        }
    });
    
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    const scrollers = document.querySelectorAll('.scroller-container');

    scrollers.forEach(container => {
        const scroller = container.querySelector('.media-scroller');
        const leftBtn = container.querySelector('.scroll-btn.left');
        const rightBtn = container.querySelector('.scroll-btn.right');
        
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

    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    const musicIcon = musicBtn ? musicBtn.querySelector('i') : null;

    if (musicBtn && bgMusic) {
        setTimeout(() => {
            const playPromise = bgMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    musicBtn.classList.add('playing');
                    if(musicIcon) {
                        musicIcon.classList.remove('fa-play');
                        musicIcon.classList.add('fa-pause');
                    }
                }).catch(error => {
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
