(function () {
  "use strict";

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }

  function renderPhotos(target, photos, limit) {
    if (!target) return;
    var list = typeof limit === "number" ? photos.slice(0, limit) : photos;
    target.innerHTML = list.map(function (photo, index) {
      var title = escapeHTML(photo.title || ("Portfolio photograph " + (index + 1)));
      var full = escapeHTML(photoFull(photo.id));
      var thumb = escapeHTML(photoThumb(photo.id));
      /* FIX: data-type="image" tells the lightbox this link is a picture.
         Cloudinary URLs have no file extension, so without it the lightbox
         showed an empty white card with only the title. */
      return '<a class="photo-card" data-aos="fade-up" data-aos-delay="' + ((index % 4) * 45) + '" href="' + full + '" data-gallery="portfolio-photos" data-type="image" data-title="' + title + '" aria-label="Open photo: ' + title + '">' +
        '<img src="' + thumb + '" alt="' + title + '" loading="lazy" decoding="async">' +
        '<span class="photo-caption">' + title + '</span></a>';
    }).join("");

    target.querySelectorAll(".photo-card img").forEach(function (image) {
      image.addEventListener("error", function () {
        var card = image.closest(".photo-card");
        card.classList.add("is-fallback");
        card.removeAttribute("href");
        card.removeAttribute("data-gallery");
        card.setAttribute("aria-disabled", "true");
        image.removeAttribute("src");
      }, { once: true });
    });
    if (window.GLightbox) {
      window.GLightbox({ selector: '[data-gallery="portfolio-photos"]', touchNavigation: true, loop: true, keyboardNavigation: true });
    }
  }

  function playVideo(card, video) {
    if (!video || card.classList.contains("is-fallback")) return;
    var promise = video.play();
    if (promise && typeof promise.catch === "function") {
      promise.catch(function () {
        if (!video.muted) {
          video.muted = true;
          card.classList.remove("is-unmuted");
          video.play().catch(function () {});
        } else {
          card.classList.remove("is-playing");
        }
      });
    }
  }

  function renderVideos(target, videos, limit) {
    if (!target) return;
    var list = typeof limit === "number" ? videos.slice(0, limit) : videos;
    target.innerHTML = list.map(function (item, index) {
      var title = escapeHTML(item.title || ("Portfolio film " + (index + 1)));
      var src = escapeHTML(videoSrc(item.id));
      var poster = escapeHTML(videoPoster(item.id));
      /* Videos start PAUSED and MUTED: no autoplay, and only metadata is downloaded
         until the visitor presses play. */
      return '<article class="video-card" data-aos="fade-up" data-aos-delay="' + ((index % 4) * 45) + '" aria-label="' + title + '">' +
        '<video muted loop playsinline preload="metadata" poster="' + poster + '" src="' + src + '#t=0.001" aria-label="' + title + '"></video>' +
        '<div class="video-controls">' +
        '<button class="video-control video-play" type="button" aria-label="Play video: ' + title + '" aria-pressed="false">' +
        '<svg class="icon-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg><svg class="icon-pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg></button>' +
        '<!-- Icon classes are intentionally swapped: style.css shows .icon-sound while muted and .icon-muted while unmuted. -->' +
        '<button class="video-control video-mute" type="button" aria-label="Unmute video: ' + title + '" aria-pressed="false">' +
        '<svg class="icon-muted" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 4V5L7 9H3zm12-2v2a4 4 0 0 1 0 6v2a6 6 0 0 0 0-10zm0-4v2a10 10 0 0 1 0 18v-2a8 8 0 0 0 0-18z"/></svg><svg class="icon-sound" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 4V5L7 9H3zm13.6 3 2.1 2.1-1.4 1.4-2.1-2.1-2.1 2.1-1.4-1.4 2.1-2.1-2.1-2.1 1.4-1.4 2.1 2.1 2.1-2.1 1.4 1.4z"/></svg></button>' +
        '</div><span class="video-title">' + title + '</span></article>';
    }).join("");

    /* Only used to pause a video when it scrolls out of view (never starts playback). */
    var observer = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          var video = entry.target;
          video.pause();
        }
      });
    }, { threshold: 0.1 }) : null;

    target.querySelectorAll(".video-card").forEach(function (card) {
      var video = card.querySelector("video");
      var retries = 0;

      video.muted = true;
      video.autoplay = false;

      video.addEventListener("loadeddata", function () { card.classList.remove("is-fallback"); });
      video.addEventListener("error", function () {
        /* Cloudinary can answer 423 while it is still generating the video: retry a few times. */
        if (retries < 5) {
          retries++;
          setTimeout(function () { video.load(); }, 4000);
          return;
        }
        card.classList.add("is-fallback");
        video.pause();
        card.classList.remove("is-playing");
      });
      video.addEventListener("play", function () {
        card.classList.add("is-playing");
        card.querySelector(".video-play").setAttribute("aria-pressed", "true");
        card.querySelector(".video-play").setAttribute("aria-label", "Pause video: " + (video.getAttribute("aria-label") || "portfolio film"));
      });
      video.addEventListener("pause", function () {
        card.classList.remove("is-playing");
        card.querySelector(".video-play").setAttribute("aria-pressed", "false");
        card.querySelector(".video-play").setAttribute("aria-label", "Play video: " + (video.getAttribute("aria-label") || "portfolio film"));
      });
      video.addEventListener("volumechange", function () {
        card.classList.toggle("is-unmuted", !video.muted);
        var muteButton = card.querySelector(".video-mute");
        muteButton.setAttribute("aria-pressed", String(!video.muted));
        muteButton.setAttribute("aria-label", (video.muted ? "Unmute video: " : "Mute video: ") + (video.getAttribute("aria-label") || "portfolio film"));
      });
      if (observer) observer.observe(video);

      card.querySelector(".video-play").addEventListener("click", function () {
        if (video.paused) {
          playVideo(card, video);
        } else {
          video.pause();
        }
      });
      card.querySelector(".video-mute").addEventListener("click", function () {
        video.muted = !video.muted;
      });
    });
  }

  document.querySelectorAll("[data-photo-grid]").forEach(function (target) {
    var limit = target.getAttribute("data-limit");
    renderPhotos(target, SITE.photos, limit ? Number(limit) : undefined);
  });
  document.querySelectorAll("[data-video-grid]").forEach(function (target) {
    var limit = target.getAttribute("data-limit");
    renderVideos(target, SITE.videos, limit ? Number(limit) : undefined);
  });
  if (window.AOS && typeof window.AOS.refreshHard === "function") window.AOS.refreshHard();
}());
