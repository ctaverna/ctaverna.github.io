// Cookie consent for Google Analytics (Google Consent Mode v2, basic mode).
//
// gtag.js is not even downloaded until the visitor accepts: no request to Google and no
// cookie before a choice. The choice (accept or reject; closing the banner counts as
// reject) is kept in localStorage for about 6 months, then asked again, as the Italian
// Garante's cookie guidelines (10 June 2021) allow. "Cookie settings" in the footer and the
// button on the privacy page reopen the banner at any time.
(function () {
  'use strict';

  var KEY = 'ga-consent';
  var MAX_AGE = 182 * 24 * 60 * 60 * 1000; // about 6 months
  var id = window.GA_MEASUREMENT_ID;
  var privacyUrl = window.PRIVACY_URL || '/privacy/';
  if (!id || typeof window.gtag !== 'function') return;

  function read() {
    try {
      var c = JSON.parse(window.localStorage.getItem(KEY));
      if (c && (c.v === 'granted' || c.v === 'denied') && Date.now() - c.t < MAX_AGE) return c.v;
    } catch (e) { /* storage blocked or corrupted: ask again */ }
    return null;
  }

  function save(v) {
    try { window.localStorage.setItem(KEY, JSON.stringify({ v: v, t: Date.now() })); } catch (e) {}
  }

  var loaded = false;
  function loadAnalytics() {
    gtag('consent', 'update', { analytics_storage: 'granted' });
    if (loaded) return;
    loaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', id);
  }

  // On revocation: stop analytics storage and delete the _ga cookies of this site.
  function stopAnalytics() {
    if (loaded) gtag('consent', 'update', { analytics_storage: 'denied' });
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (name.indexOf('_ga') !== 0) return;
      document.cookie = name + '=; Max-Age=0; path=/';
      document.cookie = name + '=; Max-Age=0; path=/; domain=.' + location.hostname;
    });
  }

  var banner = null;
  function hide() {
    if (banner) banner.hidden = true;
  }

  function choose(v) {
    save(v);
    hide();
    if (v === 'granted') loadAnalytics(); else stopAnalytics();
  }

  function show() {
    if (!banner) {
      banner = document.createElement('div');
      banner.className = 'cc-banner';
      banner.setAttribute('role', 'region');
      banner.setAttribute('aria-label', 'Cookie consent');
      banner.innerHTML =
        '<p class="cc-text">May I use Google Analytics cookies to count visits to this blog? ' +
        'Nothing is set unless you accept. <a href="' + privacyUrl + '">Privacy</a></p>' +
        '<div class="cc-actions">' +
        '<button type="button" class="cc-btn" data-choice="denied">Reject</button>' +
        '<button type="button" class="cc-btn" data-choice="granted">Accept</button>' +
        '</div>' +
        '<button type="button" class="cc-close" data-choice="denied" ' +
        'aria-label="Close and reject" title="Close and reject">&times;</button>';
      banner.addEventListener('click', function (e) {
        var v = e.target.getAttribute('data-choice');
        if (v) choose(v);
      });
      document.body.appendChild(banner);
    }
    banner.hidden = false;
  }

  // "Cookie settings" next to the copyright in the theme's footer.
  function addFooterLink() {
    var copyright = document.querySelector('footer .copyright');
    if (!copyright) return;
    copyright.insertAdjacentHTML('beforeend',
      '&nbsp;&bull;&nbsp;<a href="' + privacyUrl + '" class="text-muted">Privacy</a>' +
      '&nbsp;&bull;&nbsp;<a href="#" class="text-muted cc-settings">Cookie settings</a>');
  }

  function init() {
    addFooterLink();
    document.addEventListener('click', function (e) {
      var link = e.target.closest && e.target.closest('.cc-settings');
      if (!link) return;
      e.preventDefault();
      show();
    });
    var choice = read();
    if (choice === 'granted') loadAnalytics();
    else if (choice === null) show();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
