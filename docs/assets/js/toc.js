// "On this page": highlights the section being read in the table of contents
// (ul.toc, written by hand in each post as a list of #anchor links).
// Loaded on every page through site-js; does nothing where there is no TOC.
(function () {
  'use strict';

  var toc = document.querySelector('ul.toc');
  if (!toc) return;

  // TOC links and the headings they point to, in document order
  var items = [];
  toc.querySelectorAll('a[href^="#"]').forEach(function (link) {
    var id = decodeURIComponent(link.getAttribute('href').slice(1));
    var heading = id && document.getElementById(id);
    if (heading) items.push({ link: link, heading: heading });
  });
  if (!items.length) return;

  var OFFSET = 120; // fixed navbar plus a little air
  var current = null;

  function update() {
    var active = items[0];
    for (var i = 0; i < items.length; i++) {
      if (items[i].heading.getBoundingClientRect().top - OFFSET <= 0) active = items[i];
      else break;
    }
    // at the very bottom of the page, the last section is the one being read
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      active = items[items.length - 1];
    }
    if (active === current) return;
    if (current) current.link.classList.remove('active');
    active.link.classList.add('active');
    current = active;

    // keep the active entry visible when the TOC scrolls on its own (sticky, long TOC),
    // without moving the page
    if (toc.scrollHeight > toc.clientHeight) {
      var l = active.link.offsetTop, h = active.link.offsetHeight;
      if (l < toc.scrollTop) toc.scrollTop = l - 8;
      else if (l + h > toc.scrollTop + toc.clientHeight) toc.scrollTop = l + h - toc.clientHeight + 8;
    }
  }

  var scheduled = false;
  function onScroll() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(function () {
      scheduled = false;
      update();
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
