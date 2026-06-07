/* ── CURSOR ── */
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

/* ── MENU TOGGLE ── */
document.getElementById('menuToggle').addEventListener('click', function () {
  const menu = document.getElementById('menu');
  menu.classList.toggle('active');
  this.innerHTML = menu.classList.contains('active')
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

/* ── SCROLL BUTTON ── */
const scrollBtn = document.getElementById('scrollUpBtn');
window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 100 ? 'flex' : 'none';
});
scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── TYPING ── */
const bioText = "Welcome to my portfolio. I'm a beginner data analyst and web developer with a growing passion for transforming data into meaningful insights and building clean, responsive websites. With foundational experience in HTML, CSS, JavaScript, Python, and SQL, I specialize in turning complex datasets into clear, actionable strategies and creating user-friendly web applications. I also utilize data visualization tools to bring clarity to patterns and trends that drive better decision-making.";

function typeLine(el, text, i = 0, cursor) {
  if (i < text.length) {
    el.textContent += text.charAt(i);
    setTimeout(() => typeLine(el, text, i + 1, cursor), 22);
  } else {
    if (cursor) cursor.style.display = 'none';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const el     = document.getElementById('line1');
    const typeCursor = document.getElementById('typeCursor');
    if (el) typeLine(el, bioText, 0, typeCursor);
  }, 1200);
});

/* ── SKILLS CYCLING & SCROLL REVEAL ── */
const skillCards = document.querySelectorAll('.skill-card');
let activeIdx = 0;

// Scroll reveal with stagger
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = document.querySelectorAll('.skill-card');
      cards.forEach((card, i) => {
        setTimeout(() => card.classList.add('revealed'), i * 70);
      });
      observer.disconnect();
    }
  });
}, { threshold: 0.1 });
const grid = document.getElementById('skillsGrid');
if (grid) observer.observe(grid);

// Active cycling
setInterval(() => {
  skillCards.forEach(c => c.classList.remove('active'));
  skillCards[activeIdx].classList.add('active');
  activeIdx = (activeIdx + 1) % skillCards.length;
}, 1500);