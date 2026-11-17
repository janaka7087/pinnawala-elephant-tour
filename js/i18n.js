/* ==========================================================================
   Pinnawala Elephant Tour — language switching
   Reads window.PET_I18N (js/i18n-data.js). No network request, so the
   selector also works when the site is opened straight from disk.
   ========================================================================== */
(function () {
  'use strict';

  var DICT = window.PET_I18N || {};
  var DEFAULT = 'en';
  var STORE = 'pet-lang';
  var LANGS = ['en', 'ru', 'de'];

  function stored() {
    try { return window.localStorage.getItem(STORE); } catch (e) { return null; }
  }
  function remember(lang) {
    try { window.localStorage.setItem(STORE, lang); } catch (e) { /* private mode */ }
  }

  function pick() {
    var fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (fromUrl && LANGS.indexOf(fromUrl) > -1) return fromUrl;
    var saved = stored();
    if (saved && LANGS.indexOf(saved) > -1) return saved;
    var browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return LANGS.indexOf(browser) > -1 ? browser : DEFAULT;
  }

  function translate(key, lang) {
    var table = DICT[lang] || {};
    if (Object.prototype.hasOwnProperty.call(table, key)) return table[key];
    var fallback = DICT[DEFAULT] || {};
    return Object.prototype.hasOwnProperty.call(fallback, key) ? fallback[key] : null;
  }

  function apply(lang) {
    document.documentElement.setAttribute('lang', lang);

    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function (el) {
      var value = translate(el.getAttribute('data-i18n'), lang);
      if (value !== null) el.textContent = value;
    });

    // data-i18n-attr="placeholder:form.name|aria-label:cta.enquire"
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-attr]'), function (el) {
      el.getAttribute('data-i18n-attr').split('|').forEach(function (pair) {
        var bits = pair.split(':');
        if (bits.length !== 2) return;
        var value = translate(bits[1].trim(), lang);
        if (value !== null) el.setAttribute(bits[0].trim(), value);
      });
    });

    Array.prototype.forEach.call(document.querySelectorAll('[data-lang-label]'), function (el) {
      el.textContent = lang.toUpperCase();
    });

    Array.prototype.forEach.call(document.querySelectorAll('[data-set-lang]'), function (btn) {
      btn.setAttribute('aria-current', btn.getAttribute('data-set-lang') === lang ? 'true' : 'false');
    });

    remember(lang);
    document.dispatchEvent(new CustomEvent('pet:langchange', { detail: { lang: lang } }));
  }

  function init() {
    apply(pick());
    Array.prototype.forEach.call(document.querySelectorAll('[data-set-lang]'), function (btn) {
      btn.addEventListener('click', function () {
        apply(btn.getAttribute('data-set-lang'));
      });
    });
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
