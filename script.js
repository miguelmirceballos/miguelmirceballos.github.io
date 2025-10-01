/* ===== Theme toggle with persistence ===== */
(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');

  const applyTheme = (mode) => {
    if (mode === 'light') root.classList.add('light');
    else root.classList.remove('light');
    localStorage.setItem('theme', mode);
    themeToggle.textContent = mode === 'light' ? '🌙' : '🌓';
  };

  // initial: check localStorage, then prefers-color-scheme
  const saved = localStorage.getItem('theme');
  if (saved) applyTheme(saved);
  else {
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(prefersLight ? 'light' : 'dark');
  }

  themeToggle.addEventListener('click', () => {
    const current = root.classList.contains('light') ? 'light' : 'dark';
    applyTheme(current === 'light' ? 'dark' : 'light');
  });
})();

/* ===== Scroll reveal using IntersectionObserver ===== */
(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(ent => {
        if (ent.isIntersecting) {
          ent.target.classList.add('show');
          observer.unobserve(ent.target);
        }
      });
    },
    { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
  );

  document.querySelectorAll('[data-animate]').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
})();

/* ===== Simple form simulation (frontend only) ===== */
(() => {
  const form = document.getElementById('contact-form');
  const status = form.querySelector('.form-status');
  const clearBtn = document.getElementById('clear-btn');

  form.addEventListener('submit', e => {
    e.preventDefault();
    status.textContent = 'Enviando...';
    const formData = new FormData(form);
    // Simula petición — en producción reemplaza por fetch a tu endpoint
    setTimeout(() => {
      status.textContent = '✅ Mensaje enviado. Gracias — te responderé pronto.';
      form.reset();
      setTimeout(() => status.textContent = '', 4500);
    }, 900);
  });

  clearBtn.addEventListener('click', () => {
    form.reset();
    status.textContent = '';
  });

  // Year
  document.getElementById('year').textContent = new Date().getFullYear();
})();

/* ===== Optional: small tilt effect for profile-card ===== */
(() => {
  const tiltEl = document.querySelector('[data-tilt]');
  if (!tiltEl) return;
  tiltEl.addEventListener('mousemove', (e) => {
    const r = tiltEl.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * 6; // rotateX
    const ry = (px - 0.5) * -8; // rotateY
    tiltEl.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
  });
  tiltEl.addEventListener('mouseleave', () => tiltEl.style.transform = '');
})();
