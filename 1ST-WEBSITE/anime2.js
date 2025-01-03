document.addEventListener('DOMContentLoaded', function() {
    // Particle background effect for hero section
    const hero = document.getElementById('hero');
    
    for(let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3}px;
            height: ${Math.random() * 3}px;
            background: ${Math.random() > 0.5 ? '#ff006e' : '#00fff2'};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random()};
            pointer-events: none;
            border-radius: 50%;
            animation: float ${5 + Math.random() * 10}s linear infinite;
        `;
        hero.appendChild(particle);
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                if(entry.target.classList.contains('anime-card')) {
                    entry.target.style.transitionDelay = `${Math.random() * 0.5}s`;
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.anime-card, blockquote, .genre-tag').forEach(el => {
        observer.observe(el);
    });

    // Tilt effect for anime cards
    document.querySelectorAll('.anime-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale3d(1.02, 1.02, 1.02)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Add floating animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translate(0, 0); }
            50% { transform: translate(${Math.random() * 20}px, ${Math.random() * 20}px); }
            100% { transform: translate(0, 0); }
        }
    `;
    document.head.appendChild(style);

    // Genre tag hover effect with ripple
    document.querySelectorAll('.genre-tag').forEach(tag => {
        tag.addEventListener('click', function(e) {
            let ripple = document.createElement('div');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            let rect = this.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                pointer-events: none;
                width: ${this.offsetWidth * 2}px;
                height: ${this.offsetWidth * 2}px;
                left: ${x - this.offsetWidth}px;
                top: ${y - this.offsetWidth}px;
                animation: ripple 1s linear;
                opacity: 0;
            `;
            
            setTimeout(() => ripple.remove(), 1000);
        });
    });

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            0% { transform: scale(0); opacity: 1; }
            100% { transform: scale(1); opacity: 0; }
        }
    `;
    document.head.appendChild(rippleStyle);
});