// NAV scroll effect
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

burger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.service-card, .partner-card, .step, .price-card, .value-card, .contact-item, .partner-offer, .about-visual, .portfolio-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

const style = document.createElement('style');
style.textContent = '.in-view { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

document.querySelectorAll('.services-grid, .partners-grid, .steps, .pricing-grid, .values-grid, .partner-stats-grid, .portfolio-grid').forEach(parent => {
  const children = parent.querySelectorAll(':scope > *');
  children.forEach((child, i) => { child.style.transitionDelay = `${i * 0.08}s`; });
});

// ── CONTACT FORM – Formspree AJAX ──
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');

contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = contactForm.querySelector('[name="email"]').value;
  const message = contactForm.querySelector('[name="message"]').value;
  const name = contactForm.querySelector('[name="name"]').value;

  if (!name || !email || !message) {
    contactForm.querySelectorAll('[required]').forEach(f => {
      if (!f.value) f.style.borderColor = '#ef4444';
    });
    return;
  }

  contactForm.querySelectorAll('input, textarea').forEach(f => f.style.borderColor = '');
  submitBtn.textContent = 'Odesílám…';
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';
  if (formError) formError.style.display = 'none';

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      contactForm.style.display = 'none';
      if (formSuccess) formSuccess.style.display = 'block';
      contactForm.reset();
    } else {
      throw new Error('Server error');
    }
  } catch (err) {
    if (formError) formError.style.display = 'block';
    submitBtn.textContent = 'Odeslat poptávku';
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
  }
});

contactForm?.querySelectorAll('input, textarea').forEach(f => {
  f.addEventListener('input', () => f.style.borderColor = '');
});
