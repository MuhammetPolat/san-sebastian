// 1. Sticky Navbar
const header = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 2. Scroll Animations (Fade in)
const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};
const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// 3. ULTRA ŞAŞALI: 3D Tilt (Eğilme) Efekti
// Kartların üzerine gelince farenin yönüne doğru 3 boyutlu eğilmesini sağlar
const tiltElements = document.querySelectorAll('.tilt-card, .tilt-btn');

tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left; // Farenin X konumu
        const y = e.clientY - rect.top;  // Farenin Y konumu
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Farenin merkezden ne kadar uzakta olduğuna göre eğilme açısı hesapla (max 15 derece)
        const rotateX = ((y - centerY) / centerY) * -15; 
        const rotateY = ((x - centerX) / centerX) * 15;

        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        el.style.transition = "transform 0.1s ease-out"; 
    });

    // Fare üzerinden çekilince kartı orijinal haline pürüzsüzce döndür
    el.addEventListener('mouseleave', () => {
        el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        el.style.transition = "transform 0.5s ease-out";
    });
});
