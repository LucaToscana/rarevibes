// Config dei campi, tienilo fuori dal componente per chiarezza
export const artistFieldsConfig = [
  {
    id: "name-va",
    label: "artistname",
    type: "text",
    required: true,
    group: "main",
  },
  {
    id: "images-va",
    label: "images",
    type: "image-array",
    required: true,
    group: "main",
  },
  {
    id: "bio-extended-va",
    label: "aboutproject_min50",
    type: "textarea",
    required: true,
    group: "main",
  },

  // Socials (singoli campi url)
  { id: "website-va", label: "Sito Web", type: "url", group: "social" },
  { id: "youtube-va", label: "YouTube", type: "url", group: "social" },
  { id: "instagram-va", label: "Instagram", type: "url", group: "social" },
  { id: "facebook-va", label: "Facebook", type: "url", group: "social" },
  { id: "threads-va", label: "Threads", type: "url", group: "social" },
  { id: "linkedin-va", label: "LinkedIn", type: "url", group: "social" },
  { id: "snapchat-va", label: "Snapchat", type: "url", group: "social" },
  { id: "telegram-va", label: "Telegram", type: "url", group: "social" },
  { id: "discord-va", label: "Discord", type: "url", group: "social" },

  { id: "tiktok-va", label: "TikTok", type: "url", group: "social" },
  { id: "twitter-va", label: "Twitter", type: "url", group: "social" },

  // Merchandising 1, 2, 3
  {
    id: "merch-name-va-1",
    label: "product",
    type: "text",
    group: "merch",
  },
  { id: "merch-price-va-1", label: "price", type: "text", group: "merch" },
  {
    id: "merch-image-va-1",
    label: "imageurl",
    type: "url",
    group: "merch",
  },
  {
    id: "merch-link-va-1",
    label: "buylink",
    type: "url",
    group: "merch",
  },

  {
    id: "merch-name-va-2",
    label: "product",
    type: "text",
    group: "merch",
  },
  { id: "merch-price-va-2", label: "price", type: "text", group: "merch" },
  {
    id: "merch-image-va-2",
    label: "imageurl",
    type: "url",
    group: "merch",
  },
  {
    id: "merch-link-va-2",
    label: "buylink",
    type: "url",
    group: "merch",
  },

  {
    id: "merch-name-va-3",
    label: "product",
    type: "text",
    group: "merch",
  },
  { id: "merch-price-va-3", label: "price", type: "text", group: "merch" },
  {
    id: "merch-image-va-3",
    label: "imageurl",
    type: "url",
    group: "merch",
  },
  {
    id: "merch-link-va-3",
    label: "buylink",
    type: "url",
    group: "merch",
  },
];

export const musicianFieldsConfig = [
  {
    id: "name-mu",
    label: "artistOrBandName",
    type: "text",
    required: true,
    group: "main",
  },
  {
    id: "images-mu",
    label: "images",
    type: "image-array",
    required: true,
    group: "main",
  },
  {
    id: "bio-review-mu",
    label: "aboutproject_min50",
    type: "textarea",
    group: "main",
  },
  {
    id: "bio-extended-mu",
    label: "abouttrack_min50",
    type: "textarea",
    required: true,
    group: "main",
  },
  { id: "label-mu", label: "Etichetta", type: "text", group: "track" },

  // Single (senza group, campi piatti)
  {
    id: "single-title-mu",
    label: "title_single_ep_album",
    type: "text",
    required: true,
    group: "track",
  },
  {
    id: "single-year-mu",
    label: "year",
    type: "number",
    required: true,
    group: "track",
  },
  {
    id: "single-cover-mu",
    label: "coverUrl",
    type: "url",
    group: "track",
  },
  {
    id: "single-featuring-mu",
    label: "featuringTags",
    type: "tags",
    group: "track",
  },
  // Link piattaforme
  {
    id: "single-platform-spotify-mu",
    label: "Spotify ",
    type: "url",
    group: "track",
  },
  {
    id: "single-platform-youtube-mu",
    label: "YouTube  (video ID o URL)",
    type: "text",
    group: "track",
  },
  {
    id: "single-platform-bandcamp-mu",
    label: "Bandcamp ",
    type: "text",
    group: "track",
  },
  {
    id: "single-platform-soundcloud-mu",
    label: "SoundCloud ",
    type: "url",
    group: "track",
  },
  {
    id: "single-platform-appleMusic-mu",
    label: "Apple Music ",
    type: "url",
    group: "track",
  },
  {
    id: "single-platform-deezer-mu",
    label: "Deezer ",
    type: "url",
    group: "track",
  },
  {
    id: "single-platform-tidal-mu",
    label: "Tidal ",
    type: "url",
    group: "track",
  },

  // Link piattaforme artista
  {
    id: "platform-spotify-mu",
    label: "Spotify",
    type: "url",
    group: "platform",
  },
  {
    id: "platform-soundcloud-mu",
    label: "SoundCloud",
    type: "url",
    group: "platform",
  },
  {
    id: "platform-youtube-mu",
    label: "YouTube",
    type: "url",
    group: "platform",
  },
  {
    id: "platform-bandcamp-mu",
    label: "Bandcamp",
    type: "url",
    group: "platform",
  },
  {
    id: "platform-appleMusic-mu",
    label: "Apple Music",
    type: "url",
    group: "platform",
  },
  { id: "platform-deezer-mu", label: "Deezer", type: "url", group: "platform" },
  { id: "platform-tidal-mu", label: "Tidal", type: "url", group: "platform" },
  {
    id: "platform-amazonMusic-mu",
    label: "Amazon Music",
    type: "url",
    group: "platform",
  },
  {
    id: "platform-audiomack-mu",
    label: "Audiomack",
    type: "url",
    group: "platform",
  },
  {
    id: "platform-napster-mu",
    label: "Napster",
    type: "url",
    group: "platform",
  },
  {
    id: "platform-beatport-mu",
    label: "Beatport",
    type: "url",
    group: "platform",
  },
  {
    id: "platform-boomplay-mu",
    label: "Boomplay",
    type: "url",
    group: "platform",
  },
  { id: "platform-shazam-mu", label: "Shazam", type: "url", group: "platform" },
  {
    id: "platform-pandora-mu",
    label: "Pandora",
    type: "url",
    group: "platform",
  },

  // Social Media (piatto)
  { id: "website-mu", label: "website", type: "url", group: "social" },
  { id: "instagram-mu", label: "Instagram", type: "url", group: "social" },
  { id: "facebook-mu", label: "Facebook", type: "url", group: "social" },
  { id: "youtube-mu", label: "YouTube", type: "url", group: "social" },
  { id: "threads-mu", label: "Threads", type: "url", group: "social" },
  { id: "linkedin-mu", label: "LinkedIn", type: "url", group: "social" },
  { id: "snapchat-mu", label: "Snapchat", type: "url", group: "social" },
  { id: "telegram-mu", label: "Telegram", type: "url", group: "social" },
  { id: "discord-mu", label: "Discord", type: "url", group: "social" },
  { id: "tiktok-mu", label: "TikTok", type: "url", group: "social" },
  { id: "twitter-mu", label: "Twitter", type: "url", group: "social" },

  // Merchandising (piatto, massimo 3 elementi)
  {
    id: "merch-name-mu-1",
    label: "Nome Prodotto 1",
    type: "text",
    group: "merch",
  },
  {
    id: "merch-price-mu-1",
    label: "Prezzo 1",
    type: "text",
    group: "merch",
  },
  {
    id: "merch-image-mu-1",
    label: "Immagine 1 (URL o percorso)",
    type: "url",
    group: "merch",
  },
  {
    id: "merch-link-mu-1",
    label: "Link Acquisto 1",
    type: "url",
    group: "merch",
  },

  {
    id: "merch-name-mu-2",
    label: "Nome Prodotto 2",
    type: "text",
    group: "merch",
  },
  {
    id: "merch-price-mu-2",
    label: "Prezzo 2",
    type: "text",
    group: "merch",
  },
  {
    id: "merch-image-mu-2",
    label: "Immagine 2 (URL o percorso)",
    type: "url",
    group: "merch",
  },
  {
    id: "merch-link-mu-2",
    label: "Link Acquisto 2",
    type: "url",
    group: "merch",
  },

  {
    id: "merch-name-mu-3",
    label: "Nome Prodotto 3",
    type: "text",
    group: "merch",
  },
  {
    id: "merch-price-mu-3",
    label: "Prezzo 3",
    type: "text",
    group: "merch",
  },
  {
    id: "merch-image-mu-3",
    label: "Immagine 3 (URL o percorso)",
    type: "url",
    group: "merch",
  },
  {
    id: "merch-link-mu-3",
    label: "Link Acquisto 3",
    type: "url",
    group: "merch",
  },
  ,
];

export const bothFieldsConfig = [
  ...musicianFieldsConfig,
  ...artistFieldsConfig.filter(
    (f) => !musicianFieldsConfig.some((mf) => mf.id === f.id)
  ),
];

export const groupFieldsByCategory = (fields) => {
  return fields.reduce(
    (acc, field) => {
      if (field.group === "main") acc.main.push(field);
      else if (field.group === "social") acc.social.push(field);
      else if (field.group === "merch") acc.merch.push(field);
      else if (field.group === "platform") acc.platform.push(field);
      else if (field.group === "track") acc.track.push(field);
      return acc;
    },
    { main: [], social: [], merch: [], platform: [], track: [] }
  );
};
