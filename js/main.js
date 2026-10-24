(function () {
  "use strict";
  var currentPage = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  var pageKey = currentPage === "" ? "index.html" : currentPage;

  document.querySelectorAll("[data-brand]").forEach(function (el) {
    el.textContent = SITE.brandName;
  });
  document.querySelectorAll("[data-tagline]").forEach(function (el) {
    el.textContent = SITE.tagline;
  });
  document.querySelectorAll("[data-big-badge]").forEach(function (el) {
    el.textContent = SITE.bigBadgeText;
  });
  document.querySelectorAll("[data-copyright]").forEach(function (el) {
    el.textContent = "© " + new Date().getFullYear() + " " + SITE.brandName + ". All rights reserved.";
  });
  document.querySelectorAll("[data-instagram]").forEach(function (el) { el.href = SITE.instagramUrl || "#"; });
  document.querySelectorAll("[data-youtube]").forEach(function (el) { el.href = SITE.youtubeUrl || "#"; });
  document.querySelectorAll("[data-whatsapp]").forEach(function (el) {
    if (SITE.whatsappNumber) el.href = "https://wa.me/" + String(SITE.whatsappNumber).replace(/\D/g, "");
  });

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }
  document.querySelectorAll("[data-service-pills]").forEach(function (target) {
    target.innerHTML = SITE.services.map(function (service) {
      return '<a class="service-pill" href="service.html?s=' + encodeURIComponent(service.slug) + '">' + escapeHTML(service.title) + '</a>';
    }).join("");
  });
  document.querySelectorAll("[data-service-cards]").forEach(function (target) {
    target.innerHTML = SITE.services.map(function (service, index) {
      return '<a class="service-card" data-aos="fade-up" data-aos-delay="' + ((index % 3) * 65) + '" href="service.html?s=' + encodeURIComponent(service.slug) + '">' +
        '<span class="service-index">0' + (index + 1) + ' / SERVICE</span><div><h2>' + escapeHTML(service.title) + '</h2>' +
        '<p>' + escapeHTML(service.shortDescription) + '</p></div><span class="text-link">Explore service <span aria-hidden="true">↗</span></span></a>';
    }).join("");
  });

  var detailTarget = document.querySelector("[data-service-detail]");
  if (detailTarget) {
    var selectedSlug = new URLSearchParams(window.location.search).get("s");
    var selectedService = SITE.services.find(function (service) { return service.slug === selectedSlug; });
    if (selectedService) {
      document.title = selectedService.title + " | " + SITE.brandName;
      detailTarget.innerHTML = '<div class="detail-banner" data-aos="fade-up"><span class="eyebrow">A service by ' + escapeHTML(SITE.brandName) + '</span><h1>' + escapeHTML(selectedService.title) + '</h1></div>' +
        '<p class="detail-copy" data-aos="fade-up">' + escapeHTML(selectedService.content) + '</p>' +
        '<div class="detail-actions"><a class="button button--primary" href="contact.html?service=' + encodeURIComponent(selectedService.slug) + '">Book this service <span aria-hidden="true">↗</span></a><a class="button button--outline" href="services.html">All services</a></div>' +
        '<div class="other-services"><div class="section-head"><div><span class="eyebrow">Keep exploring</span><h2 class="section-heading">More ways to work together</h2></div></div><div class="service-pills">' +
        SITE.services.filter(function (service) { return service.slug !== selectedService.slug; }).map(function (service) {
          return '<a class="service-pill" href="service.html?s=' + encodeURIComponent(service.slug) + '">' + escapeHTML(service.title) + '</a>';
        }).join("") + '</div></div>';
    } else {
      document.title = "Service not found | " + SITE.brandName;
      detailTarget.innerHTML = '<div class="not-found"><span class="eyebrow">A small detour</span><h1>Service not found</h1><p>That service may have moved. Browse the full list to find the right fit for your project.</p><a class="button button--primary" href="services.html">Explore all services</a></div>';
    }
  }

  document.querySelectorAll(".nav-links a[data-page]").forEach(function (link) {
    if (link.getAttribute("data-page") === pageKey) link.setAttribute("aria-current", "page");
  });

  var menuButton = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".nav-links");
  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      var expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open", !expanded);
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menuButton.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        menuButton.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    });
  }

  var header = document.querySelector(".site-header");
  function updateHeader() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  var particles = document.querySelector(".sand-particles");
  if (particles && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    for (var i = 0; i < 30; i += 1) {
      var particle = document.createElement("i");
      particle.className = "sand-particle";
      particle.style.left = (Math.random() * 100) + "%";
      particle.style.setProperty("--duration", (9 + Math.random() * 12) + "s");
      particle.style.setProperty("--delay", (-Math.random() * 18) + "s");
      particle.style.setProperty("--drift", ((Math.random() * 70) - 35) + "px");
      particle.style.opacity = String(.25 + Math.random() * .6);
      particles.appendChild(particle);
    }
  }

  var heroVideo = document.querySelector("[data-hero-video]");
  var heroVideoUrl = SITE.heroVideoUrl || (SITE.heroVideoId
    ? "https://res.cloudinary.com/" + encodeURIComponent(SITE.CLOUD_NAME || "demo") +
      "/video/upload/q_auto/" + SITE.heroVideoId + ".mp4"
    : "");
  var heroVideoPosterUrl = SITE.heroVideoPosterUrl || (SITE.heroVideoId && !SITE.heroVideoUrl
    ? videoPoster(SITE.heroVideoId)
    : "");
  var reduceHeroMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (heroVideo && heroVideoPosterUrl) heroVideo.poster = heroVideoPosterUrl;
  if (heroVideo && heroVideoUrl && reduceHeroMotion) heroVideo.classList.add("is-static");
  if (heroVideo && heroVideoUrl && !reduceHeroMotion) {
    heroVideo.addEventListener("canplay", function () {
      var playback = heroVideo.play();
      heroVideo.classList.add("is-ready");
      if (playback && typeof playback.catch === "function") {
        playback.catch(function () { heroVideo.classList.remove("is-ready"); });
      }
    }, { once: true });
    heroVideo.addEventListener("error", function () {
      heroVideo.classList.remove("is-ready");
      heroVideo.removeAttribute("src");
    });
    heroVideo.src = heroVideoUrl;
    heroVideo.load();
  }

  var profile = document.querySelector("[data-profile-photo]");
  if (profile) {
    if (SITE.profilePhotoUrl) profile.src = SITE.profilePhotoUrl;
    profile.addEventListener("error", function () {
      profile.classList.add("is-fallback");
      profile.removeAttribute("src");
    });
  }

  var badgeLink = document.querySelector("[data-profile-badge]");
  if (badgeLink && SITE.externalProfileUrl) {
    badgeLink.href = SITE.externalProfileUrl;
    badgeLink.target = "_blank";
    badgeLink.rel = "noopener noreferrer";
  } else if (badgeLink) {
    var staticBadge = document.createElement("span");
    staticBadge.className = "badge-static";
    staticBadge.textContent = SITE.bigBadgeText;
    badgeLink.replaceWith(staticBadge);
  }

    var devBadge = document.querySelector("[data-dev-badge]");
  if (devBadge) {
    var d = SITE.devBadge || {};
    if (!d.enabled || !d.url) {
      devBadge.remove();
    } else {
      devBadge.href = d.url;
      devBadge.querySelector("[data-dev-eyebrow]").textContent = d.eyebrow;
      devBadge.querySelector("[data-dev-title]").textContent = d.title;
      devBadge.querySelector("[data-dev-sub]").textContent = d.subtitle;
      devBadge.querySelector("[data-dev-cta]").firstChild.textContent = d.buttonText + " ";
    }
  }
  if (window.AOS) {
    try { window.AOS.init({ duration: 650, once: true, offset: 50, easing: "ease-out-cubic" }); }
    catch (error) { document.documentElement.classList.add("aos-fallback"); }
  } else {
    document.documentElement.classList.add("aos-fallback");
  }
}());
