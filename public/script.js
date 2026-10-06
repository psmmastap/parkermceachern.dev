// Footer year.
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Typing effect for the hero name (skipped for reduced motion).
const name = "Parker McEachern";
const typedEl = document.getElementById("typed-name");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (typedEl) {
  if (reducedMotion) {
    typedEl.textContent = name;
  } else {
    let i = 0;
    const type = () => {
      typedEl.textContent = name.slice(0, i);
      if (i < name.length) {
        i += 1;
        setTimeout(type, 90);
      }
    };
    type();
  }
}

// Simple fade-in on scroll.
const fadeEls = document.querySelectorAll("section:not(.hero)");
fadeEls.forEach((el) => el.classList.add("fade"));

if (!reducedMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  fadeEls.forEach((el) => observer.observe(el));
} else {
  fadeEls.forEach((el) => el.classList.add("visible"));
}
