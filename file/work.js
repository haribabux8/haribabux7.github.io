// ── Cursor
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx+'px'; cursor.style.top = my+'px';
});
(function animRing(){
  rx += (mx-rx)*0.1; ry += (my-ry)*0.1;
  ring.style.left = rx+'px'; ring.style.top = ry+'px';
  requestAnimationFrame(animRing);
})();

// ── Preloader
window.addEventListener('load', function(){
  const pre = document.getElementById('preloader');
  setTimeout(() => {
    pre.classList.add('pl-exit');
    setTimeout(() => {
      pre.style.display = 'none';
      document.body.classList.add('loaded');
      initScrollReveal();
    }, 950);
  }, 500);

  if(window.particlesJS){
    particlesJS("particles-js",{
      particles:{
        number:{value:50,density:{enable:true,value_area:900}},
        color:{value:"#b38b6d"},
        shape:{type:"circle"},
        opacity:{value:0.16,random:true},
        size:{value:1.7,random:true},
        line_linked:{enable:true,distance:120,color:"#c8924a",opacity:0.09,width:1},
        move:{enable:true,speed:0.65,direction:"none",out_mode:"out"}
      },
      interactivity:{
        detect_on:"canvas",
        events:{onhover:{enable:true,mode:"grab"},resize:true},
        modes:{grab:{distance:150,line_linked:{opacity:0.22}}}
      },
      retina_detect:true
    });
  }
});

// ── Scroll reveal
function initScrollReveal(){
  const cards = document.querySelectorAll('.exp-card');
  const dividers = document.querySelectorAll('.section-divider, .more-soon');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        const delay = (el.dataset.delay || 0) * 120;
        setTimeout(() => {
          el.style.transition = `opacity 0.75s ${delay}ms cubic-bezier(0.16,1,0.3,1), transform 0.75s ${delay}ms cubic-bezier(0.16,1,0.3,1)`;
          el.classList.add('reveal');
        }, 100);
        io.unobserve(el);
      }
    });
  }, { threshold: 0.08 });

  cards.forEach((c,i) => { c.dataset.delay = i; io.observe(c); });
  dividers.forEach(d => io.observe(d));
}

// ── Menu toggle
const toggle = document.getElementById('menuToggle');
if(toggle){
  toggle.addEventListener('click', function(){
    const m = document.getElementById('menu');
    m.classList.toggle('active');
    this.innerHTML = m.classList.contains('active')
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });
}

// ── Scroll button
const scrollBtn = document.getElementById('scrollUpBtn');
if(scrollBtn){
  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 100 ? 'flex' : 'none';
  });
  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── Overflow
document.documentElement.style.overflow = 'auto';
document.body.style.overflow = 'auto';
