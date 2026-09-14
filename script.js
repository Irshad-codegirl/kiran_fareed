/* =========================================================
   KIRAN FARID — PORTFOLIO SCRIPTS
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar background on scroll ---------- */
  const nav = document.getElementById('kfNav');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');

  function onScroll(){
    const scrollY = window.scrollY || window.pageYOffset;

    // Navbar solid state
    nav.classList.toggle('scrolled', scrollY > 20);

    // Scroll progress bar
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';

    // Back to top visibility
    backToTop.classList.toggle('visible', scrollY > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Mobile menu toggle ---------- */
  const burger = document.getElementById('kfBurger');
  const links = document.getElementById('kfLinks');

  function closeMenu(){
    burger.classList.remove('open');
    links.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }

  burger.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ---------- Active link highlight on scroll (scrollspy) ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.kf-link');

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(section => spyObserver.observe(section));

  /* ---------- Scroll-reveal animations ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting){
        // small stagger for elements revealing together
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, index * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Animated skill bars ---------- */
  const skillCards = document.querySelectorAll('.skill-card');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const card = entry.target;
        const level = card.getAttribute('data-level') || 0;
        const fill = card.querySelector('.skill-bar-fill');
        requestAnimationFrame(() => {
          fill.style.width = level + '%';
        });
        skillObserver.unobserve(card);
      }
    });
  }, { threshold: 0.4 });

  skillCards.forEach(card => skillObserver.observe(card));

  /* ---------- Hero code-window typing effect ---------- */
  const typedStatusEl = document.getElementById('typedStatus');
  if (typedStatusEl){
    const phrases = [
      'open to opportunities',
      'building responsive UIs',
      'learning every day'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeLoop(){
      const current = phrases[phraseIndex];

      if (!deleting){
        charIndex++;
        typedStatusEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length){
          deleting = true;
          setTimeout(typeLoop, 1600);
          return;
        }
      } else {
        charIndex--;
        typedStatusEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0){
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }

      const speed = deleting ? 35 : 65;
      setTimeout(typeLoop, speed);
    }

    typeLoop();
  }

  /* ---------- Contact form (front-end only, no backend) ---------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitLabel = document.getElementById('submitLabel');

  if (contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('cfName').value.trim();
      const email = document.getElementById('cfEmail').value.trim();
      const subject = document.getElementById('cfSubject').value.trim();
      const message = document.getElementById('cfMessage').value.trim();

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !subject || !message){
        formStatus.textContent = 'Please fill in all fields before sending.';
        formStatus.classList.add('error');
        return;
      }

      if (!emailPattern.test(email)){
        formStatus.textContent = 'Please enter a valid email address.';
        formStatus.classList.add('error');
        return;
      }

      formStatus.classList.remove('error');

      const originalLabel = submitLabel.textContent;
      submitLabel.textContent = 'Sending...';

      // Simulated send — no backend is connected in this static template.
      setTimeout(() => {
        submitLabel.textContent = originalLabel;
        formStatus.textContent = `Thanks, ${name.split(' ')[0]}! Your message has been prepared. Please email mrmk41989@gmail.com directly to reach Kiran.`;
        contactForm.reset();
      }, 900);
    });
  }

});