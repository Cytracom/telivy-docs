(() => {
  let frame = 0;

  const place = () => {
    frame = 0;
    const list = document.getElementById('table-of-contents-content');
    if (!list) return;

    let dot = list.querySelector(':scope > .toc-dot');
    if (!dot) {
      dot = document.createElement('span');
      dot.className = 'toc-dot';
      dot.setAttribute('aria-hidden', 'true');
      list.prepend(dot);
      list.classList.add('has-toc-dot');
    }

    const link = list.querySelector('.toc-item[data-active-deepest="true"] > a');
    if (!link) {
      dot.classList.remove('is-visible');
      return;
    }

    const listBox = list.getBoundingClientRect();
    const linkBox = link.getBoundingClientRect();
    const lineHeight = parseFloat(getComputedStyle(link).lineHeight) || linkBox.height;
    const center = linkBox.top - listBox.top + Math.min(linkBox.height, lineHeight) / 2;
    dot.style.transform = `translateY(${center}px)`;
    dot.classList.add('is-visible');
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(place);
  };

  new MutationObserver(schedule).observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['data-active-deepest'],
  });
  window.addEventListener('resize', schedule);
  schedule();
})();
