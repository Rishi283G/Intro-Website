// Particle effect for hero section
class Particle {
    constructor(canvas, ctx) {
      this.canvas = canvas;
      this.ctx = ctx;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.speed = 0.5 + Math.random() * 1;
      this.angle = Math.random() * Math.PI * 2;
      this.size = 1 + Math.random() * 2;
      this.color = `rgba(0, ${150 + Math.random() * 105}, 47, ${0.3 + Math.random() * 0.4})`;
    }
  
    update() {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
  
      if (this.x < 0) this.x = this.canvas.width;
      if (this.x > this.canvas.width) this.x = 0;
      if (this.y < 0) this.y = this.canvas.height;
      if (this.y > this.canvas.height) this.y = 0;
    }
  
    draw() {
      this.ctx.fillStyle = this.color;
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }
  
  // Initialize particle system
  function initParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const heroSection = document.getElementById('gaming-hero');
    
    if (!heroSection) return;
  
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    canvas.style.pointerEvents = 'none';
    
    heroSection.appendChild(canvas);
  
    function resizeCanvas() {
      canvas.width = heroSection.offsetWidth;
      canvas.height = heroSection.offsetHeight;
    }
  
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  
    const particles = Array.from({ length: 50 }, () => new Particle(canvas, ctx));
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    }
  
    animate();
  }
  
  // Game card hover effect
  function initGameCards() {
    const cards = document.querySelectorAll('.game-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
      });
  
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
    });
  }
  
  // Setup cards glow effect
  function initSetupCards() {
    const cards = document.querySelectorAll('.setup-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
      });
    });
  }
  
  // Achievements animation
  function initAchievements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('timeline-item-visible');
        }
      });
    }, { threshold: 0.5 });
  
    document.querySelectorAll('.timeline-item').forEach(item => {
      observer.observe(item);
      item.classList.add('timeline-item-hidden');
    });
  }
  
  // Typing effect for hero text
  function initTypingEffect() {
    const text = document.querySelector('.hobby-hero h1');
    if (!text) return;
  
    const originalText = text.textContent;
    text.textContent = '';
    let index = 0;
  
    function typeText() {
      if (index < originalText.length) {
        text.textContent += originalText[index];
        index++;
        setTimeout(typeText, 50);
      }
    }
  
    typeText();
  }
  
  // Initialize everything when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initGameCards();
    initSetupCards();
    initAchievements();
    initTypingEffect();
    
    // Add smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  });
  
  // Add required CSS
  const style = document.createElement('style');
  style.textContent = `
    .timeline-item-hidden {
      opacity: 0;
      transform: translateX(-50px);
      transition: all 0.6s ease;
    }
  
    .timeline-item-visible {
      opacity: 1;
      transform: translateX(0);
    }
  
    .setup-card {
      position: relative;
      overflow: hidden;
    }
  
    .setup-card::before {
      content: '';
      position: absolute;
      top: var(--y, 0);
      left: var(--x, 0);
      transform: translate(-50%, -50%);
      width: 0;
      height: 0;
      background: radial-gradient(circle, rgba(0, 255, 47, 0.4) 0%, transparent 50%);
      transition: width 0.5s, height 0.5s;
      border-radius: 50%;
    }
  
    .setup-card:hover::before {
      width: 200px;
      height: 200px;
    }
  `;
  
  document.head.appendChild(style);