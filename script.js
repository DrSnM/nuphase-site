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
    else if (href.indexOf('#groundwork-case-study') !== -1) track('case_study_click', { location: where });
    else if (href.indexOf('/ai-workflow-review') === 0) track('ai_review_click', { location: where });
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

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Selected results: one headline result at a time, advancing on its own.
  var achv = document.getElementById('achv');
  if (achv) {
    var ITEMS = [
      ['88–94%', 'Field-validated accuracy classifying petroleum contamination from infrared spectra.', 'Across three regulatory thresholds and 2,700+ lab-measured samples, for Chevron and Kuwait Oil Company.'],
      ['15,341', 'Lab-referenced soil samples modelled nationally for soil organic carbon.', 'R² = 0.85, validated on 350+ samples never seen in training.'],
      ['93–94%', 'Soil texture class accuracy in the field, from a handheld infrared scan.', 'A compositional-statistics model built with a commercial soil-testing laboratory.'],
      ['2 d → 1 h', 'Calibration turnaround after the process was rebuilt.', 'A manual, judgement-heavy process became a pipeline more than 90% automated.'],
      ['2011', 'Co-founded Sensability with two University of Adelaide colleagues.', 'The patents are now licensed into Breville’s Eye Q toaster range.'],
      ['$1.3–1.8M', 'A year in turnover at Ziltek, the business I led as CEO.', 'Five full-time staff plus interns.'],
      ['2025', 'Led Ziltek through acquisition by GXLab.', 'Its customers and technology kept intact.'],
      ['11 countries', 'Delivering, commissioning and meeting customers in person.', 'From Houston and Jakarta to Port Harcourt, Kuwait City and Stockholm.'],
      ['20 years', 'Between the technical work and the commercial calls on top of it.', 'Inventor, spin-out founder, licensor and executive.']
    ];
    var DWELL = 5600, idx = 0, paused = false, elapsed = 0, lastT = 0;
    var el = function (id) { return document.getElementById(id); };
    var slide = el('slide'), pips = el('pips'), bar = el('bar');
    el('ac-n').textContent = String(ITEMS.length).padStart(2, '0');
    ITEMS.forEach(function (it, k) {
      var b = document.createElement('button');
      b.type = 'button'; b.setAttribute('aria-label', 'Show result ' + (k + 1) + ': ' + it[0]);
      b.addEventListener('click', function () { track('results_nav', { index: k + 1 }); go(k); });
      pips.appendChild(b);
    });
    var paint = function (k) {
      var it = ITEMS[k];
      el('af').textContent = it[0]; el('at').textContent = it[1]; el('as').textContent = it[2];
      el('ac-i').textContent = String(k + 1).padStart(2, '0');
      Array.prototype.forEach.call(pips.children, function (b, j) { if (j === k) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
    };
    var go = function (k) {
      idx = (k + ITEMS.length) % ITEMS.length; elapsed = 0;
      if (reduceMotion) { paint(idx); return; }
      slide.classList.add('out');
      setTimeout(function () { paint(idx); slide.classList.remove('out'); }, 300);
    };
    var tick = function (ts) {
      if (!lastT) lastT = ts;
      var dt = ts - lastT; lastT = ts;
      if (!paused && !reduceMotion && !document.hidden) { elapsed += dt; if (elapsed >= DWELL) go(idx + 1); }
      bar.style.width = (reduceMotion ? 0 : Math.min(100, elapsed / DWELL * 100)) + '%';
      requestAnimationFrame(tick);
    };
    achv.addEventListener('mouseenter', function () { paused = true; });
    achv.addEventListener('mouseleave', function () { paused = false; });
    achv.addEventListener('focusin', function () { paused = true; });
    achv.addEventListener('focusout', function () { paused = false; });
    paint(0); requestAnimationFrame(tick);
  }

  // Title-area background: a field of needles that point at the cursor and "thermalise" when it rests.
  var hero = document.querySelector('.hero-home'), cv = document.getElementById('vf');
  if (hero && cv && cv.getContext) {
    var ctx = cv.getContext('2d');
    var INK = '23,25,31', PI = Math.PI, SP = 58, LEN = 13, HEAD = 4;
    var W = 0, H = 0, DPR = 1, N = 0, px, py, th, ang;
    var cur = null, lastMove = -1e9, heat = 1, lastTs = 0, tx = 0, ty = 0, hasT = false;
    // Each needle is a rotor held by the cursor's "magnet" and shaken by temperature:
    //   d(theta) = -a h sin(theta - phi) dt + sqrt(2 s dt) N(0,1), phi = direction to the cursor.
    // While the cursor moves the field is strong and the temperature low; after a pause the field fades
    // and the temperature rises, so the needles drift into disorder.
    var A_FIELD = 9, S_COLD = 0.3, S_HOT = 1.7, IDLE_AFTER = 1.2, HEAT_TAU = 1.7, COOL_TAU = 0.12;
    var randn = function () { var u = 0, v = Math.random(); while (!u) u = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * PI * v); };
    var localTarget = function () {
      if (!cur) { hasT = false; return; }
      var r = hero.getBoundingClientRect(); tx = cur.x - r.left; ty = cur.y - r.top; hasT = true;
    };
    var draw = function (h) {
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0); ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(' + INK + ',' + (0.2 - 0.07 * h).toFixed(3) + ')'; ctx.lineWidth = 1; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.beginPath();
      for (var i = 0; i < N; i++) {
        var c = Math.cos(ang[i]), s = Math.sin(ang[i]), hx = px[i] + c * LEN / 2, hy = py[i] + s * LEN / 2;
        ctx.moveTo(px[i] - c * LEN / 2, py[i] - s * LEN / 2); ctx.lineTo(hx, hy);
        ctx.moveTo(hx - HEAD * Math.cos(ang[i] - 0.5), hy - HEAD * Math.sin(ang[i] - 0.5)); ctx.lineTo(hx, hy); ctx.lineTo(hx - HEAD * Math.cos(ang[i] + 0.5), hy - HEAD * Math.sin(ang[i] + 0.5));
      }
      ctx.stroke();
    };
    var settle = function () {   // reduced motion: no animation, just point at the cursor
      localTarget(); if (!hasT) return;
      for (var i = 0; i < N; i++) th[i] = ang[i] = Math.atan2(ty - py[i], tx - px[i]);
      draw(0);
    };
    var build = function () {
      DPR = window.devicePixelRatio || 1; W = hero.clientWidth; H = hero.clientHeight;
      cv.width = W * DPR; cv.height = H * DPR;
      var dy = SP * 0.866, rows = Math.ceil(H / dy) + 2, cols = Math.ceil(W / SP) + 2, r, c, k = 0;
      N = rows * cols; px = new Float32Array(N); py = new Float32Array(N); th = new Float32Array(N); ang = new Float32Array(N);
      for (r = 0; r < rows; r++) for (c = 0; c < cols; c++, k++) { px[k] = (c + (r % 2 ? 0.5 : 0) - 0.5) * SP; py[k] = (r - 0.5) * dy; th[k] = ang[k] = Math.random() * 2 * PI; }
      if (reduceMotion) settle(); else draw(1);
    };
    if (window.ResizeObserver) new ResizeObserver(build).observe(hero); else window.addEventListener('resize', build);
    var move = function (x, y) { cur = { x: x, y: y }; lastMove = performance.now(); if (reduceMotion) settle(); };
    document.addEventListener('pointermove', function (e) { if (e.pointerType !== 'touch') move(e.clientX, e.clientY); });
    document.addEventListener('touchstart', function (e) { var t = e.touches[0]; if (t) move(t.clientX, t.clientY); }, { passive: true });
    document.addEventListener('touchmove', function (e) { var t = e.touches[0]; if (t) move(t.clientX, t.clientY); }, { passive: true });
    if (reduceMotion) window.addEventListener('scroll', settle, { passive: true });
    // One physics step of length dt seconds. Frames are split into steps of at most 50 ms so the behaviour
    // follows real time even when the browser throttles animation.
    var step = function (dt, wantHeat) {
      heat += (wantHeat - heat) * Math.min(1, dt / (wantHeat > heat ? HEAT_TAU : COOL_TAU));
      var s = S_COLD + (S_HOT - S_COLD) * heat, a = A_FIELD * (1 - 0.94 * heat), noise = Math.sqrt(2 * s * dt);
      for (var i = 0; i < N; i++) {
        var f = 0;
        if (hasT) {
          var dx = tx - px[i], dy = ty - py[i], d = Math.sqrt(dx * dx + dy * dy), h = Math.max(0.25, 1 / (1 + (d / 520) * (d / 520)));
          f = -a * h * Math.sin(th[i] - Math.atan2(dy, dx));
        }
        th[i] += f * dt + noise * randn();
      }
    };
    var frame = function (ts) {
      var real = Math.min(0.4, Math.max(0.001, (ts - (lastTs || ts)) / 1000)); lastTs = ts;
      var r = hero.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) {   // only simulate while the title area is on screen
        localTarget();
        var idle = (performance.now() - lastMove) / 1000, wantHeat = (!cur || idle > IDLE_AFTER) ? 1 : 0;
        while (real > 1e-6) { var h = Math.min(0.05, real); step(h, wantHeat); real -= h; }
        for (var i = 0; i < N; i++) { var diff = Math.atan2(Math.sin(th[i] - ang[i]), Math.cos(th[i] - ang[i])); ang[i] += diff * 0.3; }
        draw(heat);
      }
      requestAnimationFrame(frame);
    };
    build(); if (!reduceMotion) requestAnimationFrame(frame);
  }
});
