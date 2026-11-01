/* kubelo.app/tester: sets the two links from config.js, picks the language, and switches it. No cookies, no storage, nothing sent anywhere.
   Norwegian shows when navigator.language is nb, nn or no (also nb-NO and so on). ?lang=nb or ?lang=en overrides it, and the link in the header switches. */
(function () {
  var cfg = window.KUBELO_TESTER || {};
  var root = document.documentElement;
  var sw = document.getElementById('switch');
  var TITLE = { en: 'Test Kubelo before launch | Kubelo', nb: 'Test Kubelo før lanseringen | Kubelo' };
  var DESC = {
    en: 'Help us test Kubelo, a free cube app for Android, before it comes to Google Play. It takes two taps.',
    nb: 'Hjelp oss å teste Kubelo, en gratis kubeapp for Android, før appen kommer på Google Play. Det er to korte steg.'
  };

  // A link in config.js shows its button; while it is still a placeholder (not an https address), the button stays hidden and the line «comes here soon» stands in its place.
  var links = document.querySelectorAll('[data-link]');
  for (var i = 0; i < links.length; i++) {
    var key = links[i].getAttribute('data-link');
    var url = cfg[key];
    if (typeof url === 'string' && url.indexOf('https://') === 0) {
      links[i].setAttribute('href', url);
      links[i].removeAttribute('hidden');
      var soon = links[i].parentNode.querySelector('[data-soon="' + key + '"]');
      if (soon) soon.setAttribute('hidden', '');
    }
  }

  if (!cfg.PROMISE_APPROVED) {
    ['promise-en', 'promise-nb'].forEach(function (id) {
      var box = document.getElementById(id);
      if (box && box.parentNode) box.parentNode.removeChild(box);
    });
  }

  function norwegian(tag) {
    return /^(nb|nn|no)(-|_|$)/i.test(tag || '');
  }

  function choose() {
    try {
      var asked = new URLSearchParams(location.search).get('lang');
      if (asked === 'nb' || asked === 'en') return asked;
    } catch (e) { /* an old browser: use the language of the browser */ }
    return norwegian(navigator.language) ? 'nb' : 'en';
  }

  function show(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    document.title = TITLE[lang];
    var d = document.querySelector('meta[name="description"]');
    if (d) d.setAttribute('content', DESC[lang]);
    if (sw) {
      var other = lang === 'nb' ? 'en' : 'nb';
      sw.textContent = other === 'nb' ? 'Norsk' : 'English';
      sw.setAttribute('lang', other);
      sw.setAttribute('hreflang', other);
      sw.setAttribute('href', '?lang=' + other);
      sw.removeAttribute('hidden');
    }
  }

  show(choose());

  if (sw) {
    sw.addEventListener('click', function (e) {
      e.preventDefault();
      var next = root.getAttribute('data-lang') === 'nb' ? 'en' : 'nb';
      show(next);
      try { history.replaceState(null, '', '?lang=' + next); } catch (err) { /* the address stays as it was */ }
    });
  }
})();
