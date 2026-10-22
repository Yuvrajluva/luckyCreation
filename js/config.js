/* EDIT YOUR PORTFOLIO HERE: name, contact details, service copy and media IDs. */
var SITE = {
  brandName: "Desert Frame Studio",
  tagline: "Stories, shaped by light.",
  whatsappNumber: "910000000000",
  instagramUrl: "https://www.instagram.com/",
  youtubeUrl: "https://www.youtube.com/",
  profilePhotoUrl: "",
  externalProfileUrl: "",
  bigBadgeText: "Scale your business online",
  CLOUD_NAME: "demo",
  heroVideoUrl: "assets/hero-background.mp4",
  heroVideoPosterUrl: "assets/hero-background-poster.jpg",
  heroVideoId: "",
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
    { id: "sample", title: "Last light on the dunes" },
    { id: "cld-sample", title: "The quiet streets of Pushkar" },
    { id: "sample", title: "Desert colors at dusk" },
    { id: "cld-sample", title: "A moment in the old town" },
    { id: "sample", title: "The Aravalli horizon" },
    { id: "cld-sample", title: "Market day" },
    { id: "sample", title: "Warmth after the rain" },
    { id: "cld-sample", title: "A walk by the lake" },
    { id: "sample", title: "Portrait in golden light" },
    { id: "cld-sample", title: "Textures of Rajasthan" },
    { id: "sample", title: "Evening at the ghats" },
    { id: "cld-sample", title: "A place to pause" },
    { id: "sample", title: "Beyond the city" },
    { id: "cld-sample", title: "A clear morning" },
    { id: "sample", title: "Stillness and sand" },
    { id: "cld-sample", title: "The last frame of the day" }
  ],
  videos: [
    { id: "samples/cld-sample-video", title: "Pushkar, in a passing moment" },
    { id: "samples/sea-turtle", title: "A brand story in warm light" },
    { id: "samples/elephants", title: "The long way home" },
    { id: "dog", title: "A celebration to remember" },
    { id: "samples/cld-sample-video", title: "Desert roads at sundown" },
    { id: "samples/sea-turtle", title: "Made by hand" },
    { id: "samples/elephants", title: "A new set of keys" },
    { id: "dog", title: "An afternoon in town" },
    { id: "samples/cld-sample-video", title: "A quieter kind of luxury" },
    { id: "samples/sea-turtle", title: "The color of the season" },
    { id: "samples/elephants", title: "Frames from the fair" },
    { id: "dog", title: "A small story, well told" }
  ]
};

/* Cloudinary helpers: paste only each asset's public ID into the lists above. */
function photoThumb(id) {
  return "https://res.cloudinary.com/" + encodeURIComponent(SITE.CLOUD_NAME || "demo") +
    "/image/upload/f_auto,q_auto,w_600,ar_4:5,c_fill,g_auto/" + String(id || "");
}
function photoFull(id) {
  return "https://res.cloudinary.com/" + encodeURIComponent(SITE.CLOUD_NAME || "demo") +
    "/image/upload/f_auto,q_auto,w_1600/" + String(id || "");
}
function videoSrc(id) {
  var gravity = SITE.CLOUD_NAME === "demo" ? "g_center" : "g_auto";
  return "https://res.cloudinary.com/" + encodeURIComponent(SITE.CLOUD_NAME || "demo") +
    "/video/upload/q_auto,w_720,ar_9:16,c_fill," + gravity + "/" + String(id || "") + ".mp4";
}
function videoPoster(id) {
  return "https://res.cloudinary.com/" + encodeURIComponent(SITE.CLOUD_NAME || "demo") +
    "/video/upload/so_0,f_jpg,q_auto,w_720,ar_9:16,c_fill,g_auto/" + String(id || "") + ".jpg";
}
