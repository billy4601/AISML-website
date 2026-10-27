// Progressive enhancement: native details and anchors also work without JavaScript.
const menu = document.querySelector('.mobile-menu');
if (menu) {
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.open = false;
      if (!link.hash || link.origin !== location.origin || link.pathname !== location.pathname) return;
      const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
}
