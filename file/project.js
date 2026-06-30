/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});
(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

/* ── PRELOADER ── */
window.addEventListener('load', function () {
  const pre = document.getElementById('preloader');
  pre.classList.add('pl-exit');
  setTimeout(() => {
    pre.style.display = 'none';
    document.body.classList.add('loaded');
    initScrollReveal();
  }, 900);

  if (window.particlesJS) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 50, density: { enable: true, value_area: 900 } },
        color: { value: "#b38b6d" },
        shape: { type: "circle" },
        opacity: { value: 0.2, random: true },
        size: { value: 2, random: true },
        line_linked: { enable: true, distance: 130, color: "#c8924a", opacity: 0.12, width: 1 },
        move: { enable: true, speed: 0.8, direction: "none", out_mode: "out" }
      },
      interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "grab" }, resize: true },
        modes: { grab: { distance: 160, line_linked: { opacity: 0.3 } } }
      },
      retina_detect: true
    });
  }
});

/* ── SCROLL REVEAL (IntersectionObserver) ── */
function initScrollReveal() {
  const cards = document.querySelectorAll('.project-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  cards.forEach(card => observer.observe(card));
}

/* ── MENU TOGGLE ── */
const toggle = document.getElementById('menuToggle');
if (toggle) {
  toggle.addEventListener('click', function () {
    const m = document.getElementById('menu');
    m.classList.toggle('active');
    this.innerHTML = m.classList.contains('active')
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });
}

/* ── SCROLL BUTTON ── */
const scrollBtn = document.getElementById('scrollUpBtn');
if (scrollBtn) {
  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 100 ? 'flex' : 'none';
  });
  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
