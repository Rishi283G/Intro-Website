// Particle system for hero section background
class Particle {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.speed = 0.1 + Math.random() * 0.2;
    this.radius = 1 + Math.random() * 2;
    this.color = `rgba(0, ${150 + Math.random() * 105}, 47, ${
      0.3 + Math.random() * 0.4
    })`;
    this.angle = Math.random() * Math.PI * 2;
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    if (
      this.x < 0 ||
      this.x > this.canvas.width ||
      this.y < 0 ||
      this.y > this.canvas.height
    ) {
      this.reset();
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
}

// Initialize the particle system
function initParticles() {
  const heroSection = document.querySelector(".hero");
  if (!heroSection) return; // Guard clause

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.zIndex = "0";
  canvas.style.pointerEvents = "none"; // Prevent interference with other elements
  heroSection.appendChild(canvas);

  let particles = [];
  let animationFrame;

  function resizeCanvas() {
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
    // Recreate particles on resize
    particles = Array.from({ length: 100 }, () => new Particle(canvas, ctx));
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    animationFrame = requestAnimationFrame(animate);
  }

  // Initial setup
  resizeCanvas();
  animate();

  // Debounced resize handler
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCanvas, 250);
  });

  // Cleanup function
  return () => {
    cancelAnimationFrame(animationFrame);
    window.removeEventListener("resize", resizeCanvas);
  };
}

// Scroll animations with Intersection Observer
function initScrollAnimations() {
  const elements = document.querySelectorAll(
    ".hobby-card, .goal-card, .movie-card, .section-title"
  );
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          // Once animated, no need to observe anymore
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "50px",
    }
  );

  elements.forEach((el) => {
    el.classList.add("scroll-animate");
    observer.observe(el);
  });
}

// Progress bar animation
function initProgressBars() {
  const goalCards = document.querySelectorAll(".goal-card");
  if (!goalCards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progress = entry.target.querySelector(".progress");
          if (progress) {
            const targetWidth = progress.style.width;
            progress.style.transition = "none";
            progress.style.width = "0";

            // Force reflow
            progress.offsetHeight;

            progress.style.transition = "width 1s ease-in-out";
            progress.style.width = targetWidth;

            // Stop observing after animation
            observer.unobserve(entry.target);
          }
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  goalCards.forEach((card) => observer.observe(card));
}

// Card hover effects with transform
function initCardEffects() {
  const cards = document.querySelectorAll(".hobby-card, .goal-card");
  if (!cards.length) return;

  cards.forEach((card) => {
    let timeout;

    card.addEventListener("mousemove", (e) => {
      clearTimeout(timeout);

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const angleX = (y - centerY) / 20;
      const angleY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      timeout = setTimeout(() => {
        card.style.transform =
          "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
      }, 100);
    });
  });
}

// Initialize all animations
document.addEventListener("DOMContentLoaded", () => {
  try {
    initParticles();
    initScrollAnimations();
    initProgressBars();
    initCardEffects();
  } catch (error) {
    console.error("Animation initialization error:", error);
  }
});

document
  .getElementById("suggestionForm")
  .addEventListener("submit", function (event) {
    // Show a thank you message
    const responseDiv = document.getElementById("formResponse");
    responseDiv.textContent = "Thank you for your suggestion! Submitting...";
    responseDiv.style.color = "green";

    // Optionally, you can add a small delay before the form is submitted
    setTimeout(() => {
      // Allow the form to submit
      this.submit();
    }, 1000); // 1 second delay
  });
