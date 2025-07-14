// defaultArtist.js

const defaultArtist = {
  id: 1,
  name: "Odelia",
  slug: "odelia",
  type: "musician",
  images: [
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/df00d922634873.56357e9e40721.jpg",
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/53f6c717180319.5634931be500f.jpg",
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/006a6182007313.5d10e7695551e.jpg"
  ],
  bio: {
    short: "Odelia is an emerging artist blending Alternative and Indie sounds.",
    review: "Odelia is gaining recognition for her unique mix of Alternative and Indie styles. Originating from Paris, she has built a growing fanbase.",
    extended: "Odelia began her musical journey in Paris under the Independent label. Her sonic identity fuses Alternative and Indie music, with a passion for storytelling and sound exploration that captivates audiences worldwide."
  },
  genre: ["Alternative", "Indie"],
  years_active: "2019–present",
  origin: "Paris, France",
  label: "Independent",
  singles: [
    {
      title: "Sunset Drive",
      year: 2023,
      cover: "/singles/sunset-drive.jpg",
      featuring: [],
      platforms: {
        spotify: "https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp",
        youtube: "HamLxGxeDqI",
        soundcloud: "https://soundcloud.com/artist/sunset-drive",
        appleMusic: "https://music.apple.com/us/album/sunset-drive/1440831170?i=1440831172",
        deezer: "https://www.deezer.com/track/87654321",
        tidal: "https://tidal.com/browse/track/12345678"
      }
    }
  ],
  defaultPlatform: "youtube",
  platforms: {
    spotify: "https://open.spotify.com/artist/5ht7ItJgpBH7W6vJ5BqpPr",
    soundcloud: "https://soundcloud.com/odeliaofficial",
    youtube: "https://www.youtube.com/channel/UCr7U5BQejf4Nk0LYtqGU0Tg",
    bandcamp: "https://odelia.bandcamp.com/",
    appleMusic: "https://music.apple.com/us/artist/odelia/123456789",
    deezer: "https://www.deezer.com/artist/1234567",
    tidal: "https://tidal.com/browse/artist/1234567",
    amazonMusic: "https://music.amazon.com/artists/B001234567",
    audiomack: "https://audiomack.com/odelia",
    napster: "https://us.napster.com/artist/odelia",
    beatport: "https://www.beatport.com/artist/odelia/123456",
    boomplay: "https://www.boomplay.com/artist/1234567",
    shazam: "https://www.shazam.com/artist/odelia/1234567",
    pandora: "https://www.pandora.com/artist/odelia/AR1234567"
  },
  socials: {
    instagram: "https://instagram.com/odeliaofficial",
    twitter: "https://twitter.com/odeliaofficial",
    tiktok: "https://www.tiktok.com/@odeliaofficial",
    facebook: "https://www.facebook.com/odeliaofficial",
    youtube: "https://www.youtube.com/odeliaofficial",
    threads: "https://www.threads.net/@odeliaofficial",
    linkedin: "https://www.linkedin.com/in/odeliaofficial",
    snapchat: "https://www.snapchat.com/add/odeliaofficial",
    telegram: "https://t.me/odeliaofficial",
    discord: "https://discord.gg/odelia",
    website: "https://www.odeliamusic.com"
  },
  press_kit: {
    pdf: "/presskits/odelia-epk.pdf",
    contact_email: "contact@odeliamusic.com"
  },
  merch: [
    {
      name: "Odelia Logo T-Shirt",
      price: "€25",
      image: "/merch/odelia-tshirt.jpg",
      link: "https://shop.odeliamusic.com/tshirt"
    }
  ]
};

export default defaultArtist;
