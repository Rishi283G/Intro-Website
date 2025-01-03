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

// Initialize all animations
document.addEventListener("DOMContentLoaded", () => {
  try {
    initSmoothScroll();
  } catch (error) {
    console.error("Animation initialization error:", error);
  }
});
