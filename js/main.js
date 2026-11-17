/* ==========================================================================
   Pinnawala Elephant Tour — site behaviour
   Vanilla JS, no dependencies. Works from file:// as well as over HTTP.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------------------
     Header: sticky shadow + mobile navigation
     ---------------------------------------------------------------------- */
  function initHeader() {
    var header = document.querySelector('.header');
    var burger = document.querySelector('.burger');
    var scrim = document.querySelector('.nav-scrim');
    var nav = document.querySelector('.nav');
    if (!header) return;

    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 10);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    function closeNav() {
      document.body.classList.remove('nav-open');
      if (burger) burger.setAttribute('aria-expanded', 'false');
    }

    if (burger && nav) {
      burger.addEventListener('click', function () {
        var open = document.body.classList.toggle('nav-open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      nav.addEventListener('click', function (e) {
        if (e.target.closest('a')) closeNav();
      });
    }
    if (scrim) scrim.addEventListener('click', closeNav);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ----------------------------------------------------------------------
     Language selector dropdown
     ---------------------------------------------------------------------- */
  function initLangMenus() {
    var langs = document.querySelectorAll('.lang');
    Array.prototype.forEach.call(langs, function (lang) {
      var btn = lang.querySelector('.lang__btn');
      if (!btn) return;
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = lang.getAttribute('data-open') === 'true';
        lang.setAttribute('data-open', open ? 'false' : 'true');
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      });
    });
    document.addEventListener('click', function () {
      Array.prototype.forEach.call(langs, function (lang) {
        lang.setAttribute('data-open', 'false');
        var b = lang.querySelector('.lang__btn');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ----------------------------------------------------------------------
     Hero slider — 4 slides, fade + Ken Burns, autoplay, swipe, keyboard
     ---------------------------------------------------------------------- */
  function initHero() {
    var hero = document.querySelector('[data-hero]');
    if (!hero) return;

    var slides = hero.querySelectorAll('.hero__slide');
    var captions = hero.querySelectorAll('.hero__caption');
    var dots = hero.querySelectorAll('.hero__dot');
    var prev = hero.querySelector('.hero__arrow--prev');
    var next = hero.querySelector('.hero__arrow--next');
    if (slides.length < 2) return;

    var index = 0;
    var timer = null;
    var DURATION = 6000;

    function show(i, dir) {
      index = (i + slides.length) % slides.length;
      Array.prototype.forEach.call(slides, function (s, n) {
        s.classList.toggle('is-active', n === index);
        s.setAttribute('aria-hidden', n === index ? 'false' : 'true');
      });
      Array.prototype.forEach.call(captions, function (c, n) {
        c.classList.toggle('is-active', n === index);
      });
      Array.prototype.forEach.call(dots, function (d, n) {
        d.setAttribute('aria-selected', n === index ? 'true' : 'false');
      });
      // Nudge the progress animation so it restarts cleanly.
      var active = dots[index];
      if (active) {
        active.style.transition = 'none';
        void active.offsetWidth;
        active.style.transition = '';
      }
      // Lazy-load the neighbouring slide image.
      var nextImg = slides[(index + 1) % slides.length].querySelector('img');
      if (nextImg && nextImg.loading === 'lazy') nextImg.loading = 'eager';
      void dir;
    }

    function play() {
      if (reduceMotion) return;
      stop();
      hero.classList.remove('is-paused');
      timer = window.setInterval(function () { show(index + 1); }, DURATION);
    }
    function stop() {
      if (timer) { window.clearInterval(timer); timer = null; }
      hero.classList.add('is-paused');
    }
    function goto(i) { show(i); play(); }

    if (prev) prev.addEventListener('click', function () { goto(index - 1); });
    if (next) next.addEventListener('click', function () { goto(index + 1); });
    Array.prototype.forEach.call(dots, function (d, n) {
      d.addEventListener('click', function () { goto(n); });
    });

    hero.addEventListener('mouseenter', stop);
    hero.addEventListener('mouseleave', play);
    hero.addEventListener('focusin', stop);

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else play();
    });

    // Keyboard support when the slider region has focus
    hero.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); goto(index - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goto(index + 1); }
    });

    // Touch swipe
    var startX = null, startY = null;
    hero.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      stop();
    }, { passive: true });
    hero.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      var dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
        goto(index + (dx < 0 ? 1 : -1));
      } else {
        play();
      }
      startX = startY = null;
    }, { passive: true });

    show(0);
    play();
  }

  /* ----------------------------------------------------------------------
     Reveal on scroll
     ---------------------------------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(items, function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(items, function (el, i) {
      // Stagger siblings a little for a softer entrance.
      var stagger = el.getAttribute('data-reveal');
      if (stagger === '' || stagger === null) {
        var siblingIndex = Array.prototype.indexOf.call(el.parentNode.children, el);
        el.style.setProperty('--delay', Math.min(siblingIndex, 5) * 80 + 'ms');
      } else {
        el.style.setProperty('--delay', parseInt(stagger, 10) + 'ms');
      }
      io.observe(el);
      void i;
    });
  }

  /* ----------------------------------------------------------------------
     Gallery: category filter + lightbox
     ---------------------------------------------------------------------- */
  function initGallery() {
    var groups = document.querySelectorAll('[data-lightbox]');
    var figures = document.querySelectorAll('[data-lightbox] figure');
    var filters = document.querySelectorAll('.filters button');

    if (filters.length) {
      Array.prototype.forEach.call(filters, function (btn) {
        btn.addEventListener('click', function () {
          var cat = btn.getAttribute('data-filter');
          Array.prototype.forEach.call(filters, function (b) {
            b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
          });
          Array.prototype.forEach.call(figures, function (fig) {
            var match = cat === 'all' || (fig.getAttribute('data-cat') || '').indexOf(cat) > -1;
            fig.classList.toggle('is-hidden', !match);
          });
        });
      });
    }

    if (!figures.length || !groups.length) return;

    var box = document.querySelector('.lightbox');
    if (!box) return;
    var boxImg = box.querySelector('img');
    var boxCap = box.querySelector('.lightbox__caption');
    var boxCount = box.querySelector('.lightbox__count');
    var lastFocus = null;
    var current = 0;
    // Each [data-lightbox] block is its own sequence, so paging through a
    // property's photo strip never wanders into a different gallery.
    var activeGroup = groups[0];

    function visibleFigures() {
      return Array.prototype.filter.call(activeGroup.querySelectorAll('figure'), function (f) {
        return !f.classList.contains('is-hidden');
      });
    }

    function render() {
      var list = visibleFigures();
      var fig = list[current];
      if (!fig) return;
      var img = fig.querySelector('img');
      var full = img.getAttribute('data-full') || img.currentSrc || img.src;
      boxImg.src = full;
      boxImg.alt = img.alt || '';
      var cap = fig.querySelector('figcaption');
      boxCap.textContent = cap ? cap.textContent.trim() : (img.alt || '');
      boxCount.textContent = (current + 1) + ' / ' + list.length;
      // restart the entrance animation
      boxImg.style.animation = 'none';
      void boxImg.offsetWidth;
      boxImg.style.animation = '';
    }

    function open(fig) {
      activeGroup = fig.closest('[data-lightbox]') || activeGroup;
      var list = visibleFigures();
      current = list.indexOf(fig);
      if (current < 0) current = 0;
      lastFocus = document.activeElement;
      render();
      box.classList.add('is-open');
      box.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      var closeBtn = box.querySelector('.lightbox__close');
      if (closeBtn) closeBtn.focus();
    }

    function close() {
      box.classList.remove('is-open');
      box.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    function step(d) {
      var list = visibleFigures();
      current = (current + d + list.length) % list.length;
      render();
    }

    Array.prototype.forEach.call(figures, function (fig) {
      fig.setAttribute('tabindex', '0');
      fig.setAttribute('role', 'button');
      fig.addEventListener('click', function () { open(fig); });
      fig.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(fig); }
      });
    });

    box.querySelector('.lightbox__close').addEventListener('click', close);
    box.querySelector('.lightbox__prev').addEventListener('click', function () { step(-1); });
    box.querySelector('.lightbox__next').addEventListener('click', function () { step(1); });
    box.addEventListener('click', function (e) {
      if (e.target === box) close();
    });
    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'Tab') {
        // simple focus trap
        var focusables = box.querySelectorAll('button');
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    // Touch swipe inside the lightbox
    var sx = null;
    box.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      sx = null;
    }, { passive: true });
  }

  /* ----------------------------------------------------------------------
     Enquiry form — client-side validation, honeypot, mailto/endpoint submit
     ---------------------------------------------------------------------- */
  function initForm() {
    var form = document.querySelector('[data-enquiry]');
    if (!form) return;
    var status = form.querySelector('.form-status');

    function setError(field, message) {
      var input = field.querySelector('input, select, textarea');
      var err = field.querySelector('.field__error');
      if (!input) return;
      if (message) {
        input.setAttribute('aria-invalid', 'true');
        if (err) { err.textContent = message; err.classList.add('is-shown'); }
      } else {
        input.removeAttribute('aria-invalid');
        if (err) err.classList.remove('is-shown');
      }
    }

    function validate() {
      var ok = true;
      var firstBad = null;
      Array.prototype.forEach.call(form.querySelectorAll('.field, .checkbox'), function (field) {
        var input = field.querySelector('input, select, textarea');
        if (!input || !input.required) return;
        var value = input.type === 'checkbox' ? input.checked : input.value.trim();
        var message = '';
        if (!value) {
          message = input.getAttribute('data-msg-required') || 'This field is required.';
        } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim())) {
          message = input.getAttribute('data-msg-email') || 'Please enter a valid email address.';
        }
        setError(field, message);
        if (message) { ok = false; if (!firstBad) firstBad = input; }
      });
      if (firstBad) firstBad.focus();
      return ok;
    }

    Array.prototype.forEach.call(form.querySelectorAll('input, select, textarea'), function (input) {
      input.addEventListener('input', function () {
        var field = input.closest('.field, .checkbox');
        if (field && input.getAttribute('aria-invalid')) setError(field, '');
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.classList.remove('is-shown', 'form-status--ok', 'form-status--err');

      // Honeypot: a filled hidden field means a bot.
      var hp = form.querySelector('[name="company_website"]');
      if (hp && hp.value) return;

      if (!validate()) {
        status.textContent = form.getAttribute('data-msg-invalid') || 'Please check the highlighted fields and try again.';
        status.classList.add('is-shown', 'form-status--err');
        return;
      }

      var endpoint = form.getAttribute('data-endpoint');
      var data = new FormData(form);

      if (endpoint) {
        var btn = form.querySelector('button[type="submit"]');
        if (btn) btn.disabled = true;
        fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
          .then(function (res) {
            if (!res.ok) throw new Error('Request failed');
            form.reset();
            status.textContent = form.getAttribute('data-msg-success') ||
              'Thank you. Your enquiry has been sent — we will reply as soon as possible.';
            status.classList.add('is-shown', 'form-status--ok');
          })
          .catch(function () {
            status.textContent = form.getAttribute('data-msg-error') ||
              'Sorry, the enquiry could not be sent. Please message us on WhatsApp instead.';
            status.classList.add('is-shown', 'form-status--err');
          })
          .then(function () { if (btn) btn.disabled = false; });
        return;
      }

      // No endpoint configured yet: fall back to the visitor's mail client
      // so no enquiry is ever silently lost before launch.
      var to = form.getAttribute('data-mailto') || '';
      var lines = [];
      data.forEach(function (value, key) {
        if (key === 'company_website' || !String(value).trim()) return;
        var label = form.querySelector('[name="' + key + '"]');
        var labelEl = label && label.closest('.field, .checkbox');
        var text = labelEl && labelEl.querySelector('label');
        lines.push((text ? text.textContent.replace('*', '').trim() : key) + ': ' + value);
      });
      var subject = 'Website enquiry — Pinnawala Elephant Tour';
      window.location.href = 'mailto:' + to +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines.join('\n'));

      status.textContent = form.getAttribute('data-msg-mailto') ||
        'Your email programme should now open with the enquiry ready to send. If it does not, please message us on WhatsApp.';
      status.classList.add('is-shown', 'form-status--ok');
    });
  }

  /* ----------------------------------------------------------------------
     Small helpers
     ---------------------------------------------------------------------- */
  function initYear() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* Prefill the enquiry form when arriving from a property / package CTA. */
  function initPrefill() {
    var params = new URLSearchParams(window.location.search);
    ['property', 'interest'].forEach(function (key) {
      var value = params.get(key);
      if (!value) return;
      var field = document.querySelector('[name="' + key + '"]');
      if (!field) return;
      field.value = value;
      if (field.value !== value && field.tagName === 'SELECT') {
        // value not in the list — leave the default selection alone
        field.selectedIndex = 0;
      }
    });
  }

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    initHeader();
    initLangMenus();
    initHero();
    initReveal();
    initGallery();
    initForm();
    initPrefill();
    initYear();
  });
})();
