document.addEventListener('DOMContentLoaded', function () {

  // mobile menu toggle
  var menuBtn = document.getElementById('menu');
  var navbar = document.getElementById('navbar');
  if (menuBtn && navbar) {
    menuBtn.addEventListener('click', function () {
      var open = navbar.classList.toggle('is-open');
      menuBtn.classList.toggle('is-active', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navbar.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navbar.classList.remove('is-open');
        menuBtn.classList.remove('is-active');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href');
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // scroll-to-top button visibility
  var topBtn = document.querySelector('.top');
  window.addEventListener('scroll', function () {
    if (topBtn) topBtn.classList.toggle('is-visible', window.scrollY > 400);
  });

  // reveal-on-scroll
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Salesforce Path stepper
  var stages = document.querySelectorAll('.path-stage');
  var panels = document.querySelectorAll('.path-panel');
  stages.forEach(function (stage) {
    stage.addEventListener('click', function () {
      stages.forEach(function (s) { s.classList.remove('is-active'); s.setAttribute('aria-selected', 'false'); });
      panels.forEach(function (p) { p.classList.remove('is-active'); });

      stage.classList.add('is-active');
      stage.setAttribute('aria-selected', 'true');
      var target = document.getElementById(stage.dataset.target);
      if (target) target.classList.add('is-active');
    });
  });

  // contact form -> opens the visitor's mail client with the message pre-filled
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('cf-name').value.trim();
      var email = document.getElementById('cf-email').value.trim();
      var subject = document.getElementById('cf-subject').value.trim() || 'Portfolio enquiry';
      var message = document.getElementById('cf-message').value.trim();

      var body = 'From: ' + name + ' (' + email + ')\n\n' + message;
      var mailto = 'mailto:ujjwalkumar949494@gmail.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);

      window.location.href = mailto;
    });
  }

  // footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
