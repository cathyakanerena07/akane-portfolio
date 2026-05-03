/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
let mx = 0, my = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

document.querySelectorAll('a, button, .solve-item').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('large'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('large'));
});

/* ── HOVER MASK REVEAL ── */
const wrap   = document.getElementById('maskWrap');
const imgTop = document.getElementById('imgTop');
let maskRadius = 0, targetRadius = 0, animFrame = null;

function lerp(a, b, t) { return a + (b - a) * t; }

function animateMask() {
  maskRadius = lerp(maskRadius, targetRadius, 0.1);
  const rect = wrap.getBoundingClientRect();
  const px   = mx - rect.left;
  const py   = my - rect.top;
  const m    = `radial-gradient(circle ${maskRadius}px at ${px}px ${py}px, black 60%, transparent 100%)`;
  imgTop.style.webkitMaskImage = m;
  imgTop.style.maskImage       = m;
  animFrame = requestAnimationFrame(animateMask);
}

wrap.addEventListener('mouseenter', () => {
  targetRadius = 220;
  if (!animFrame) animateMask();
  cursor.classList.add('large');
});
wrap.addEventListener('mouseleave', () => {
  targetRadius = 0;
  cursor.classList.remove('large');
});

/* ── SOLVE ACCORDION ── */
document.querySelectorAll('.solve-item').forEach(item => {
  item.querySelector('.solve-item-header').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.solve-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* Scroll to contact form when CTA clicked */
document.querySelectorAll('.solve-item-cta').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── CONTACT SECTION PARALLAX ── */
const contactBg = document.getElementById('contactBg');
window.addEventListener('scroll', () => {
  const section = contactBg.closest('.contact-photo-section');
  const rect    = section.getBoundingClientRect();
  const ratio   = -rect.top / window.innerHeight;
  contactBg.style.transform = `translateY(${ratio * 40}px) scale(1.1)`;
});

/* ── SCROLL REVEAL ── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const siblings = [...e.target.parentElement.querySelectorAll('.reveal, .reveal-scale')];
      const idx = siblings.indexOf(e.target);
      setTimeout(() => e.target.classList.add('visible'), idx * 90);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-scale').forEach(el => revealObs.observe(el));

/* ── CONTACT FORM SUBMIT (Formspree) ── */
const FORMSPREE_ID = 'mwvylklv';

async function handleSubmit(e) {
  e.preventDefault();
  const form    = e.target;
  const btn     = form.querySelector('button[type="submit"]');
  const success = document.getElementById('formSuccess');
  const error   = document.getElementById('formError');

  btn.disabled    = true;
  btn.textContent = 'Sending…';
  success.classList.remove('show');
  error.classList.remove('show');

  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method:  'POST',
      body:    new FormData(form),
      headers: { 'Accept': 'application/json' },
    });

    if (res.ok) {
      success.classList.add('show');
      form.reset();
      setTimeout(() => success.classList.remove('show'), 5000);
    } else {
      error.classList.add('show');
    }
  } catch {
    error.classList.add('show');
  } finally {
    btn.disabled    = false;
    btn.textContent = 'Send Message →';
  }
}
