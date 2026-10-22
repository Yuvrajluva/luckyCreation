/* EDIT YOUR PORTFOLIO HERE: name, contact details, service copy and media IDs. */
var SITE = {
  brandName: "Lucky Creation",
  tagline: "Stories, shaped by light.",
  whatsappNumber: "919950543576",
  instagramUrl: "https://www.instagram.com/",
  youtubeUrl: "https://www.youtube.com/",
  profilePhotoUrl: "",
  externalProfileUrl: "",
  bigBadgeText: "Scale your business online",
  CLOUD_NAME: "luckycreationcloud",

  /* HERO VIDEO
     Best: upload hero-background.mp4 to Cloudinary and paste its public ID in heroVideoId
     (e.g. "hero-background"). The site will then serve it from the CDN, trimmed and compressed.
     If heroVideoId is empty, the local file below is used as a fallback. */
  heroVideoUrl: "assets/hero-background.mp4",
  heroVideoPosterUrl: "assets/hero-background-poster.jpg",
  heroVideoId: "",
  heroVideoMaxSeconds: 8,

  services: [
    {
      slug: "editing",
      title: "Editing",
      shortDescription: "A considered edit that gives every moment room to land.",
      content: "Bring your footage, references or a rough idea. I shape it into a clear, cinematic story with thoughtful pacing, clean color and sound that carries the feeling. From a short social cut to a polished brand film, every frame earns its place."
    },
    {
      slug: "video-shoot",
      title: "Video Shoot",
      shortDescription: "A nimble camera crew for the stories happening now.",
      content: "From a small business launch to a day in the life, I plan and shoot with a light footprint and a sharp eye. We make a simple shot plan together, find the strongest natural light and leave with footage ready for the platform and audience you have in mind."
    },
    {
      slug: "cinematic-shoot",
      title: "Cinematic Shoot",
      shortDescription: "Atmospheric visuals for places, people and ideas.",
      content: "For the work that deserves a little more scale. Cinematic shoots combine intentional movement, carefully shaped light and a considered visual treatment to make a place or story feel immersive. We will map the mood, locations and final formats before the camera rolls."
    },
    {
      slug: "promotion-brand-shoot",
      title: "Promotion & Brand Shoot",
      shortDescription: "Make your next campaign feel unmistakably yours.",
      content: "A brand film can explain what a page of copy cannot. Together we will find the human detail behind your business, then create concise, memorable films and photographs for campaigns, websites and social channels."
    },
    {
      slug: "wedding-birthday-shoot",
      title: "Wedding & Birthday Shoot",
      shortDescription: "The little in-between moments, held onto beautifully.",
      content: "Celebrations move quickly. I work quietly and attentively, capturing the energy, familiar faces and unplanned moments alongside the big ones. The result is a personal keepsake with honest color, gentle pacing and the feeling of being there again."
    },
    {
      slug: "car-delivery-shoot",
      title: "Car Delivery Shoot",
      shortDescription: "A first-drive memory with a little more cinema.",
      content: "Turn a new car handover into a story worth sharing. We can capture the reveal, first look and drive with polished detail shots and a portrait-format edit made for your socials."
    },
    {
      slug: "social-media-account-management",
      title: "Social Media Account Management",
      shortDescription: "A more consistent, thoughtful voice online.",
      content: "Good social media starts with a clear point of view. I help plan a realistic content rhythm, shape short-form video and keep the visual language consistent, so your account feels active, recognizable and connected to the people you want to reach."
    }
  ],
   photos: [
    { id: "demo_photo_01", title: "Last light on the dunes" },
    { id: "demo_photo_02", title: "The quiet streets of Pushkar" },
    { id: "demo_photo_03", title: "Desert colors at dusk" },
    { id: "demo_photo_04", title: "A moment in the old town" },
    { id: "demo_photo_01", title: "The Aravalli horizon" },
    { id: "demo_photo_02", title: "Market day" },
    { id: "demo_photo_03", title: "Warmth after the rain" },
    { id: "demo_photo_04", title: "A walk by the lake" },
    { id: "demo_photo_01", title: "Portrait in golden light" },
    { id: "demo_photo_02", title: "Textures of Rajasthan" },
    { id: "demo_photo_03", title: "Evening at the ghats" },
    { id: "demo_photo_01", title: "A place to pause" },
    { id: "demo_photo_01", title: "Beyond the city" },
    { id: "demo_photo_02", title: "A clear morning" },
    { id: "demo_photo_03", title: "Stillness and sand" },
    { id: "demo_photo_04", title: "The last frame of the day" }
  ],
  videos: [
    { id: "video01_mp4_compress", title: "Pushkar, in a passing moment" },
    { id: "video02_mp4_compress", title: "A brand story in warm light" },
    { id: "video03_mp4_compress", title: "The long way home" },
    { id: "video04Compressed", title: "A celebration to remember" },
    { id: "video01_mp4_compress", title: "Desert roads at sundown" },
    { id: "video02_mp4_compress", title: "Made by hand" },
    { id: "video03_mp4_compress", title: "A new set of keys" },
    { id: "video04Compressed", title: "An afternoon in town" },
    { id: "video01_mp4_compress", title: "A quieter kind of luxury" },
    { id: "video02_mp4_compress", title: "The color of the season" },
    { id: "video03_mp4_compress", title: "Frames from the fair" },
    { id: "video04Compressed", title: "A small story, well told" }
  ]
};

/* ------------------------------------------------------------------
   Cloudinary helpers: paste only each asset's public ID into the lists above.
   ------------------------------------------------------------------ */
function cloudBase(type) {
  return "https://res.cloudinary.com/" + encodeURIComponent(SITE.CLOUD_NAME || "demo") + "/" + type + "/upload/";
}

function photoThumb(id) {
  return cloudBase("image") + "f_auto,q_auto,w_600,ar_4:5,c_fill,g_auto/" + String(id || "");
}

function photoFull(id) {
  // Ends in .jpg so the lightbox (GLightbox) recognises the link as an image.
  return cloudBase("image") + "q_auto,w_1600/" + String(id || "") + ".jpg";
}

/* Videos: no file extension, so f_auto + vc_auto let Cloudinary pick the smallest
   format/codec (WebM/MP4, AV1/VP9/H.264) each browser supports. q_auto:eco = smaller files. */
function videoSrc(id) {
  // Safe version: explicit .mp4, plain q_auto, g_center (no g_auto / f_auto / vc_auto).
  // Once this plays, you can add f_auto,vc_auto or g_auto back one at a time.
  return cloudBase("video") + "q_auto,w_720,ar_9:16,c_fill,g_center/" + String(id || "") + ".mp4";
}

function videoPoster(id) {
  return cloudBase("video") + "so_0,f_jpg,q_auto,w_720,ar_9:16,c_fill,g_auto/" + String(id || "") + ".jpg";
}

/* Hero video: served from Cloudinary if heroVideoId is set (trimmed + compressed),
   otherwise falls back to the local file. */
function heroVideoSrc() {
  if (SITE.heroVideoId) {
    return cloudBase("video") + "q_auto,w_1280,du_" +
      (SITE.heroVideoMaxSeconds || 8) + "/" + String(SITE.heroVideoId) + ".mp4";
  }
  return SITE.heroVideoUrl;
}

function heroVideoPoster() {
  if (SITE.heroVideoId && !SITE.heroVideoPosterUrl) {
    return cloudBase("video") + "so_0,f_jpg,q_auto,w_1280/" + String(SITE.heroVideoId) + ".jpg";
  }
  return SITE.heroVideoPosterUrl;
}

/* Should the hero video load at all? Skips small screens and Data Saver / slow connections. */
function shouldLoadHeroVideo() {
  var conn = navigator.connection || {};
  var slow = conn.saveData || /(^|-)2g$/.test(conn.effectiveType || "");
  var small = window.matchMedia && window.matchMedia("(max-width: 768px)").matches;
  return !slow && !small;
}

/* Call once after the page loads, e.g. initHeroVideo(document.querySelector("#hero-video")).
   On mobile/slow connections only the poster image is shown. */
function initHeroVideo(el) {
  if (!el) return;
  el.muted = true;
  el.loop = true;
  el.playsInline = true;
  el.preload = "none";
  el.poster = heroVideoPoster();
  if (shouldLoadHeroVideo()) {
    el.src = heroVideoSrc();
    var p = el.play();
    if (p && p.catch) p.catch(function () {});
  }
}

/* GRID VIDEOS: paused and muted by default.
   Videos load only their metadata (first frame), stay paused, and are muted.
   The viewer presses play on the native controls and can unmute there.
   Mark each video like:
     <video data-src="VIDEO_URL" playsinline></video>
   then call lazyLoadVideos() once after the grid has been built. */
function lazyLoadVideos(root) {
  var vids = (root || document).querySelectorAll("video[data-src]");
  Array.prototype.forEach.call(vids, function (v) {
    if (v.getAttribute("data-ready")) return;
    v.setAttribute("data-ready", "1");
    setupPausedMutedVideo(v, v.getAttribute("data-src"));
  });
}

function setupPausedMutedVideo(video, src) {
  video.autoplay = false;
  video.removeAttribute("autoplay");
  video.muted = true;
  video.defaultMuted = true;
  video.setAttribute("muted", "");
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.controls = true;
  video.preload = "metadata";

  // Cloudinary may return 423 while it generates the transformed video: retry a few times.
  var tries = 0;
  video.addEventListener("error", function () {
    if (tries < 6) {
      tries++;
      setTimeout(function () { video.src = src; video.load(); }, 4000);
    }
  });

  // "#t=0.001" makes iOS/Safari show the first frame while still paused.
  video.src = src + "#t=0.001";
}
