(function () {
  "use strict";

  var data      = window.__BRAND__ || {};
  var FEMAIL    = (data.contact && data.contact.email) || "manuelperez@cetis17.edu.mx";
  var reduced   = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ── helpers ──────────────────────────────────────────────── */
  function $(sel, scope) { return (scope || document).querySelector(sel); }
  function $$(sel, scope) { return Array.from((scope || document).querySelectorAll(sel)); }
  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "] failed:", e); }
  }

  /* ── 1. Progress bar ──────────────────────────────────────── */
  function initProgressBar() {
    var pgb = document.getElementById("pgb");
    if (!pgb) return;
    window.addEventListener("scroll", function () {
      var d = document.documentElement;
      pgb.style.width = (d.scrollTop / (d.scrollHeight - d.clientHeight) * 100) + "%";
    }, { passive: true });
  }

  /* ── 2. Nav solidifies on scroll ─────────────────────────── */
  function initNav() {
    var nav = document.getElementById("nav");
    if (!nav) return;
    window.addEventListener("scroll", function () {
      nav.classList.toggle("solid", window.scrollY > 60);
    }, { passive: true });
  }

  /* ── 3. Mobile menu ───────────────────────────────────────── */
  function initMobileMenu() {
    var mob  = document.getElementById("mob");
    var burg = document.getElementById("burg");
    if (!mob || !burg) return;
    window.tM = function () {
      var o = mob.classList.toggle("o");
      burg.classList.toggle("o", o);
      document.body.style.overflow = o ? "hidden" : "";
    };
    window.cM = function () {
      mob.classList.remove("o");
      burg.classList.remove("o");
      document.body.style.overflow = "";
    };
  }

  /* ── 4. Smooth scroll ─────────────────────────────────────── */
  function initSmoothScroll() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest("a[href^=\"#\"]");
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 65,
        behavior: reduced ? "auto" : "smooth"
      });
      if (window.cM) window.cM();
    });
  }

  /* ── 5. Custom cursor — opacity:0 fix (gotcha A.3) ───────── */
  function initCursor() {
    if (!fineHover || window.innerWidth <= 900) return;
    var cd = document.getElementById("cd");
    var cr = document.getElementById("cr");
    if (!cd || !cr) return;
    var mx = 0, my = 0, rx = 0, ry = 0, firstMove = false;

    window.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      cd.style.left = mx + "px"; cd.style.top = my + "px";
      if (!firstMove) {
        firstMove = true;
        rx = mx; ry = my;
        cr.style.left = rx + "px"; cr.style.top = ry + "px";
        cd.style.opacity = "1";
        cr.style.opacity = "1";
      }
    }, { passive: true });

    (function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      cr.style.left = rx + "px";
      cr.style.top  = ry + "px";
      requestAnimationFrame(loop);
    })();

    $$("a, button, .inc, .sc").forEach(function (el) {
      el.addEventListener("mouseover", function (e) {
        if (!el.contains(e.relatedTarget)) cr.classList.add("big");
      });
      el.addEventListener("mouseout", function (e) {
        if (!el.contains(e.relatedTarget)) cr.classList.remove("big");
      });
    });
  }

  /* ── 6. Particle canvas (hero) ────────────────────────────── */
  function initParticles() {
    if (reduced) return;
    var c = document.getElementById("hcv");
    if (!c) return;
    var ctx = c.getContext("2d"), W, H, pts = [];

    function resize() {
      W = c.width  = c.offsetWidth  || innerWidth;
      H = c.height = c.offsetHeight || innerHeight;
    }
    function init() {
      resize();
      pts = [];
      var n = Math.max(15, Math.floor((W * H) / 20000));
      for (var i = 0; i < n; i++) pts.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28,
        r: Math.random() * 1.2 + .4, o: Math.random() * .45 + .1
      });
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(function (p) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(195,154,62," + p.o + ")";
        ctx.fill();
      });
      for (var i = 0; i < pts.length; i++) {
        for (var j = i + 1; j < pts.length; j++) {
          var dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          var d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = "rgba(195,154,62," + (0.14 * (1 - d / 110)) + ")";
            ctx.lineWidth = .6;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    window.addEventListener("resize", init, { passive: true });
    init();
    draw();
  }

  /* ── 7. Button ripple ─────────────────────────────────────── */
  function initRipple() {
    $$(".btn").forEach(function (b) {
      b.addEventListener("click", function (e) {
        var r   = b.getBoundingClientRect();
        var s   = Math.max(r.width, r.height) * 2;
        var rip = document.createElement("span");
        rip.className  = "ripple";
        rip.style.cssText = "width:" + s + "px;height:" + s + "px;left:" + (e.clientX - r.left - s / 2) + "px;top:" + (e.clientY - r.top - s / 2) + "px";
        b.appendChild(rip);
        rip.addEventListener("animationend", function () { rip.remove(); });
      });
    });
  }

  /* ── 8. Service card toggles ──────────────────────────────── */
  function initServiceToggles() {
    window.tog = function (btn) {
      var sc  = btn.closest(".sc");
      var was = sc.classList.contains("op");
      $$(".sc").forEach(function (c) { c.classList.remove("op"); });
      if (!was) sc.classList.add("op");
    };
  }

  /* ── 9. FAQ accordion ─────────────────────────────────────── */
  function initFAQ() {
    window.faq = function (btn) {
      var f    = btn.parentElement;
      var a    = f.querySelector(".fqa");
      var open = f.classList.contains("op");
      $$(".fq").forEach(function (q) {
        q.classList.remove("op");
        var qa = q.querySelector(".fqa");
        if (qa) qa.style.maxHeight = null;
      });
      if (!open) {
        f.classList.add("op");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    };
  }

  /* ── 10. Contact form ─────────────────────────────────────── */
  function initForm() {
    var form = document.getElementById("cform");
    var sbtn = document.getElementById("sbtn");
    var fmsg = document.getElementById("fmsg");
    if (!form || !sbtn || !fmsg) return;

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      var honey = form.querySelector("[name=\"_honey\"]");
      if (honey && honey.value) return;
      fmsg.className = "fmsg";
      sbtn.disabled  = true;
      sbtn.textContent = "Sending…";
      try {
        var res = await fetch("https://formsubmit.co/ajax/" + FEMAIL, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            _subject:  "DSF inquiry — " + form.intent.value,
            _template: "table",
            intent:    form.intent.value,
            name:      form.name.value,
            firm:      (form.firm  && form.firm.value)  || "—",
            email:     form.email.value,
            phone:     (form.phone && form.phone.value) || "—",
            message:   form.message.value
          })
        });
        var d = await res.json();
        if (res.ok && (d.success === true || d.success === "true")) {
          fmsg.className   = "fmsg ok";
          fmsg.textContent = "✓ Message sent — we'll reply within one business day.";
          form.reset();
        } else {
          throw new Error("not ok");
        }
      } catch (_) {
        fmsg.className = "fmsg er";
        fmsg.innerHTML = "Something went wrong. Email us at <a href=\"mailto:" + FEMAIL + "\" style=\"color:inherit;text-decoration:underline\">" + FEMAIL + "</a>";
      } finally {
        sbtn.disabled    = false;
        sbtn.textContent = "Send message →";
      }
    });
  }

  /* ── 11. CTA intent sync ──────────────────────────────────── */
  function initIntent() {
    $$("[data-intent]").forEach(function (b) {
      b.addEventListener("click", function () {
        var s = document.getElementById("intent");
        if (s) s.value = b.dataset.intent;
      });
    });
  }

  /* ── 12. Active nav highlight ─────────────────────────────── */
  function initActiveNav() {
    if (!("IntersectionObserver" in window)) return;
    $$("section[id]").forEach(function (sec) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          $$(".nlinks a").forEach(function (a) { a.classList.remove("act"); });
          var a = $(".nlinks a[href=\"#" + sec.id + "\"]");
          if (a) a.classList.add("act");
        });
      }, { threshold: .35 }).observe(sec);
    });
  }

  /* ── 13. Scroll reveals — threshold 0.04 + 6s safety (A.8) ─ */
  function initReveals() {
    var els = $$("[data-reveal]");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      });
    }, { threshold: 0.04, rootMargin: "0px 0px -2% 0px" });

    els.forEach(function (el) { io.observe(el); });

    setTimeout(function () {
      $$("[data-reveal]:not(.is-visible)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("is-visible");
        }
      });
    }, 6000);
  }

  /* ── 14. Counter animation ────────────────────────────────── */
  function initCounters() {
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        countUp(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: .5 });
    $$(".ct").forEach(function (el) { io.observe(el); });
  }

  function countUp(el) {
    var to  = parseInt(el.dataset.to, 10);
    var t0  = performance.now();
    var dur = 1800;
    (function f(now) {
      var p = Math.min((now - t0) / dur, 1);
      var v = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(v * to);
      if (p < 1) {
        requestAnimationFrame(f);
      } else {
        el.textContent = to;
        var pf = el.closest(".pf");
        if (pf) setTimeout(function () { pf.classList.add("glow"); }, 150);
      }
    })(t0);
  }

  /* ── 15. Desktop-only effects ─────────────────────────────── */
  function initDesktopEffects() {
    if (!fineHover || window.innerWidth <= 900) return;

    /* Magnetic CTAs (not on form submit — gotcha C.2) */
    $$(".btn-g:not(.fbtn)").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        el.style.transform = "translate(" +
          (e.clientX - r.left - r.width  / 2) * .28 + "px," +
          (e.clientY - r.top  - r.height / 2) * .38 + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });

    /* 3D tilt — service cards */
    $$(".sc").forEach(function (c) {
      c.addEventListener("mousemove", function (e) {
        var r = c.getBoundingClientRect();
        c.style.transform =
          "perspective(900px) rotateY(" + ((e.clientX - r.left) / r.width  * 6 - 3) + "deg)" +
          " rotateX("               + (-(((e.clientY - r.top) / r.height * 5) - 2.5)) + "deg)" +
          " translateZ(4px)";
      });
      c.addEventListener("mouseleave", function () { c.style.transform = ""; });
    });

    /* 3D tilt — industry cards */
    $$(".inc").forEach(function (c) {
      c.addEventListener("mousemove", function (e) {
        var r = c.getBoundingClientRect();
        c.style.transform =
          "perspective(700px) rotateY(" + ((e.clientX - r.left) / r.width  * 5 - 2.5) + "deg)" +
          " rotateX("               + (-(((e.clientY - r.top) / r.height * 4) - 2))   + "deg)";
      });
      c.addEventListener("mouseleave", function () { c.style.transform = ""; });
    });
  }

  /* ── 16. GSAP scroll animations ──────────────────────────── */
  function initGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    var ease = "power3.out";

    /* Section eyebrows */
    gsap.utils.toArray(".eye").forEach(function (el) {
      gsap.from(el, {
        opacity: 0, x: -24, duration: .8, ease: ease,
        scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" }
      });
    });

    /* Section headings + paragraphs */
    gsap.utils.toArray(".abh, .svhd h2, .inhd h2, .fdh2, .cth").forEach(function (el) {
      gsap.from(el, {
        opacity: 0, y: 44, duration: 1, ease: ease,
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" }
      });
    });

    /* About body text */
    gsap.utils.toArray(".abp, .abq").forEach(function (el, i) {
      gsap.from(el, {
        opacity: 0, y: 28, duration: .85, delay: i * 0.08, ease: ease,
        scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" }
      });
    });

    /* Service cards stagger */
    if ($(".scgrid")) {
      gsap.from(".scgrid .sc", {
        opacity: 0, y: 52, duration: .9, ease: ease, stagger: .1,
        scrollTrigger: { trigger: ".scgrid", start: "top 80%", toggleActions: "play none none none" }
      });
    }

    /* Advisory cards stagger */
    if ($(".advg")) {
      gsap.from(".advg .advc", {
        opacity: 0, y: 40, duration: .8, ease: ease, stagger: .12,
        scrollTrigger: { trigger: ".advg", start: "top 80%", toggleActions: "play none none none" }
      });
    }

    /* Industry cards stagger */
    if ($(".ing")) {
      gsap.from(".ing .inc", {
        opacity: 0, scale: .96, duration: .9, ease: ease, stagger: .12,
        scrollTrigger: { trigger: ".ing", start: "top 80%", toggleActions: "play none none none" }
      });
    }

    /* Founder card */
    if ($(".fdcard")) {
      gsap.from(".fdcard", {
        opacity: 0, x: -44, duration: 1, ease: ease,
        scrollTrigger: { trigger: ".fdg", start: "top 80%", toggleActions: "play none none none" }
      });
      gsap.from(".fdtag", {
        opacity: 0, y: 16, duration: .6, ease: ease, stagger: .06,
        scrollTrigger: { trigger: ".fdtags", start: "top 85%", toggleActions: "play none none none" }
      });
    }

    /* Process steps */
    if ($(".prstep")) {
      gsap.from(".prstep", {
        opacity: 0, x: 32, duration: .75, ease: ease, stagger: .15,
        scrollTrigger: { trigger: ".prg", start: "top 78%", toggleActions: "play none none none" }
      });
    }

    /* Proof numbers */
    if ($(".pfg")) {
      gsap.from(".pf", {
        opacity: 0, y: 32, duration: .8, ease: ease, stagger: .12,
        scrollTrigger: { trigger: ".pfg", start: "top 82%", toggleActions: "play none none none" }
      });
    }

    /* FAQ items */
    if ($(".fqw")) {
      gsap.from(".fq", {
        opacity: 0, y: 18, duration: .65, ease: ease, stagger: .07,
        scrollTrigger: { trigger: ".fqw", start: "top 82%", toggleActions: "play none none none" }
      });
    }

    /* Contact section */
    if ($(".ctg")) {
      gsap.from(".ctlead, .ctinfo > div", {
        opacity: 0, y: 28, duration: .75, ease: ease, stagger: .12,
        scrollTrigger: { trigger: ".ctg", start: "top 80%", toggleActions: "play none none none" }
      });
    }

    /* About image parallax */
    if ($(".abimg")) {
      gsap.to(".abimg", {
        yPercent: -8, ease: "none",
        scrollTrigger: { trigger: "#about", start: "top bottom", end: "bottom top", scrub: .5 }
      });
    }

    /* Process image parallax */
    if ($(".prsticky img")) {
      gsap.to(".prsticky img", {
        yPercent: -6, ease: "none",
        scrollTrigger: { trigger: "#process", start: "top bottom", end: "bottom top", scrub: .5 }
      });
    }
  }

  /* ── Boot ─────────────────────────────────────────────────── */
  function boot() {
    safe(initProgressBar,   "progressBar");
    safe(initNav,           "nav");
    safe(initMobileMenu,    "mobileMenu");
    safe(initSmoothScroll,  "smoothScroll");
    safe(initCursor,        "cursor");
    safe(initParticles,     "particles");
    safe(initRipple,        "ripple");
    safe(initServiceToggles,"serviceToggles");
    safe(initFAQ,           "faq");
    safe(initForm,          "form");
    safe(initIntent,        "intent");
    safe(initActiveNav,     "activeNav");
    safe(initReveals,       "reveals");
    safe(initCounters,      "counters");
    safe(initDesktopEffects,"desktopEffects");

    if (window.gsap && window.ScrollTrigger) {
      safe(initGSAP, "gsap");
    }

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
