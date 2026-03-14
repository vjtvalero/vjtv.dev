// ── Dark mode ───────────────────────────────────────────────
const DARK = 'dark';
const root = document.documentElement;
const btn  = document.getElementById('theme-toggle');

const applyTheme = (dark) => {
  root.setAttribute('data-theme', dark ? DARK : 'light');
  if (btn) btn.textContent = dark ? '🌙' : '☀️';
};

applyTheme(localStorage.getItem('theme') === DARK);

if (btn) {
  btn.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === DARK;
    localStorage.setItem('theme', isDark ? 'light' : DARK);
    applyTheme(!isDark);
  });
}

// ── Masthead date ──────────────────────────────────────────
const dateEl = document.getElementById('todays-date');
if (dateEl) {
  dateEl.textContent = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}

// ── Scroll fade-in ─────────────────────────────────────────
const style = document.createElement('style');
style.textContent = `
  .ai-item, .article, .stat-row {
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.35s ease, transform 0.35s ease;
  }
  .ai-item.visible, .article.visible, .stat-row.visible {
    opacity: 1;
    transform: none;
  }
`;
document.head.appendChild(style);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.ai-item, .article, .stat-row').forEach(el => observer.observe(el));
