/* ── CURSOR ── */
const cur  = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx=0, my=0, rx=0, ry=0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx+'px'; cur.style.top = my+'px';
});
(function animRing() {
  rx += (mx-rx)*0.1; ry += (my-ry)*0.1;
  ring.style.left = rx+'px'; ring.style.top = ry+'px';
  requestAnimationFrame(animRing);
})();

/* ── EMAILJS INIT (must be called once, globally) ── */
emailjs.init("A5UXpkGm77RPa2lRC");

/* ── PRELOADER + PARTICLES ── */
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add('pl-exit');
    setTimeout(() => { preloader.style.display = 'none'; }, 1000);
  }

  document.documentElement.style.overflow = 'auto';
  document.body.style.overflow = 'auto';

  if (window.particlesJS) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 70, density: { enable: true, value_area: 800 } },
        color: { value: "#b38b6d" },
        shape: {
          type: "circle",
          stroke: { width: 0, color: "#000000" },
          polygon: { nb_sides: 5 }
        },
        opacity: { value: 0.3, random: false, anim: { enable: false } },
        size: { value: 2.5, random: true, anim: { enable: false } },
        line_linked: {
          enable: true, distance: 120,
          color: "#ffffff", opacity: 0.25, width: 2
        },
        move: {
          enable: true, speed: 1.2, direction: "none",
          random: false, straight: false, out_mode: "out", bounce: false
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: false },
          resize: true
        },
        modes: { grab: { distance: 140, line_linked: { opacity: 0.4 } } }
      },
      retina_detect: true
    });
  }
});

/* ── SCROLL BTN ── */
const scrollUpBtn = document.querySelector("#scrollUpBtn");
if (scrollUpBtn) {
  window.addEventListener('scroll', () => {
    scrollUpBtn.style.display = window.scrollY > 100 ? 'flex' : 'none';
  }, { passive: true });
  scrollUpBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ── HEADER SHRINK ── */
const hdr = document.querySelector('header');
if (hdr) {
  window.addEventListener('scroll', () => {
    hdr.style.height     = window.scrollY > 60 ? '56px' : '68px';
    hdr.style.background = window.scrollY > 60
      ? 'rgba(3,5,10,0.88)' : 'rgba(3,5,10,0.65)';
  }, { passive: true });
}

/* ── MENU TOGGLE ── */
document.getElementById('menuToggle').addEventListener('click', function () {
  const menu = document.getElementById('menu');
  menu.classList.toggle('active');
  this.classList.toggle('close');
  this.innerHTML = this.classList.contains('close')
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

/* ── EMAIL FORM SUBMIT ── */
document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const btn    = this.querySelector('button[type="submit"]');
  const status = document.getElementById('formStatus');

  // Disable button while sending
  btn.style.opacity       = '0.6';
  btn.style.pointerEvents = 'none';
  status.className        = 'form-status';
  status.style.display    = 'none';

  const params = {
    name: document.querySelector("#name").value.trim(),
    mail: document.querySelector("#email").value.trim(),
    phone:      document.querySelector("#phone").value.trim(),
    message:    document.querySelector("#message").value.trim(),
  };

  emailjs.send("service_pgwvfu5", "template_c5ege3o", params)
    .then(() => {
      status.textContent = `Thank you, ${params.name}! Your message has been sent.`;
      status.className   = 'form-status success';
      status.style.display = 'block';
      this.reset();
    })
    .catch((err) => {
      console.error("EmailJS error:", err);
      status.textContent   = "Failed to send message. Please try again later.";
      status.className     = 'form-status error';
      status.style.display = 'block';
    })
    .finally(() => {
      btn.style.opacity       = '';
      btn.style.pointerEvents = '';
    });
});