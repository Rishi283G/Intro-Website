// Smooth scrolling for anchor links
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
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

// Initialize all animations
document.addEventListener("DOMContentLoaded", () => {
  try {
    initSmoothScroll();
    initScrollAnimations();
  } catch (error) {
    console.error("Animation initialization error:", error);
  }
});
