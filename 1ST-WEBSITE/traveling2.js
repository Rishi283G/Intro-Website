// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('fade-in');
          }
      });
  }, observerOptions);

  // Observe all major sections except hero (which is always visible)
  const sections = [
      '#travel-goals',
      '#travel-gallery',
      '#travel-quotes',
      '.destination-card',
      '.gallery img',
      'blockquote'
  ];

  sections.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
          observer.observe(element);
      });
  });

  // Parallax effect for destination cards
  document.querySelectorAll('.destination-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / 20;
          const rotateY = (centerX - x) / 20;
          
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      });
      
      card.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
  });

  // Image gallery zoom effect
  document.querySelectorAll('.gallery img').forEach(img => {
      img.addEventListener('click', () => {
          img.classList.toggle('expanded');
          if (img.classList.contains('expanded')) {
              const overlay = document.createElement('div');
              overlay.classList.add('gallery-overlay');
              document.body.appendChild(overlay);
              setTimeout(() => overlay.style.opacity = '1', 0);
              overlay.addEventListener('click', () => {
                  img.classList.remove('expanded');
                  overlay.style.opacity = '0';
                  setTimeout(() => overlay.remove(), 300);
              });
          }
      });
  });

  // Add dynamic styles for gallery overlay
  const style = document.createElement('style');
  style.textContent = `
      .gallery-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          z-index: 999;
          opacity: 0;
          transition: opacity 0.3s;
      }
      
      .gallery img.expanded {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(1.5);
          z-index: 1000;
          max-width: 90vw;
          max-height: 90vh;
          object-fit: contain;
          cursor: zoom-out;
      }
  `;
  document.head.appendChild(style);
});