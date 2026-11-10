document.addEventListener('DOMContentLoaded', function () {
  function initShowMore(listId, toggleId, itemClass, extraClass) {
    var list = document.getElementById(listId);
    var toggleBtn = document.getElementById(toggleId);
    if (!list || !toggleBtn) return;
    var totalCount = list.querySelectorAll('.' + itemClass).length;
    var extraCount = list.querySelectorAll('.' + itemClass + '.' + extraClass).length;
    toggleBtn.textContent = 'Show all ' + totalCount;
    toggleBtn.addEventListener('click', function () {
      var showingAll = list.classList.toggle('show-all');
      toggleBtn.textContent = showingAll ? 'Show fewer' : 'Show all ' + totalCount;
    });
    if (extraCount === 0) {
      toggleBtn.style.display = 'none';
    }
  }

  initShowMore('pubs-list', 'pubs-toggle', 'pub-item', 'pub-extra');
  initShowMore('media-list', 'media-toggle', 'media-item', 'media-extra');

  function track(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  }

  var emailBtn = document.getElementById('email-btn');
  if (emailBtn) {
    emailBtn.addEventListener('click', function () {
      track('contact_email');
      window.location.href = 'mailto:' + 'sean.manning' + '@' + 'nuphase.tech';
    });
  }

  // Click events for the actions that matter, tagged with the section they came from.
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href');
    var section = a.closest('section, .hero-band');
    var where = section ? (section.id || 'hero') : 'header';
    if (href.indexOf('linkedin.com/in/') !== -1) track('contact_linkedin', { location: where });
    else if (href === '#groundwork-case-study') track('case_study_click', { location: where });
    else if (href.indexOf('groundworkpay.com') !== -1) track('groundwork_click', { location: where, destination: href });
    else if (href.indexOf('scholar.google.com') !== -1) track('scholar_click');
  });

  // One event the first time the Groundwork case study is read on screen.
  var caseStudy = document.getElementById('groundwork-case-study');
  if (caseStudy && 'IntersectionObserver' in window) {
    var seen = new IntersectionObserver(function (entries) {
      if (entries.some(function (en) { return en.isIntersecting; })) {
        track('case_study_view');
        seen.disconnect();
      }
    }, { threshold: 0.4 });
    seen.observe(caseStudy);
  }
});
