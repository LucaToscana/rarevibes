export const validateStep1 = (
  formBase,
  artistType,
  setModalMessage,
  setModalType,
  setModalOpen,
  goNextStep
) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formBase.name || !formBase.email || !formBase.message || !artistType) {
    setModalMessage("Tutti i campi sono obbligatori.");
    setModalType("error");
    setModalOpen(true);
    return;
  }

  if (!emailRegex.test(formBase.email)) {
    setModalMessage("Inserisci un indirizzo email valido, tipo nome@email.com");
    setModalType("error");
    setModalOpen(true);
    return;
  }

  if (formBase.message.trim().length < 100) {
    setModalMessage("Hey, dedicaci qualche riga in più! La tua biografia merita almeno 100 caratteri.");
    setModalType("error");
    setModalOpen(true);
    return;
  }

  goNextStep();
};

export const validateStep2Visual = (formVisual, setModalMessage, setModalType, setModalOpen, goNextStep) => {
  const {
    "name-va": name,
    "images-va": images,
    "bio-extended-va": bio,
    "youtube-va": youtube,
    "instagram-va": instagram,
    "twitter-va": twitter,
    "tiktok-va": tiktok,
    "facebook-va": facebook,
    "threads-va": threads,
    "linkedin-va": linkedin,
    "snapchat-va": snapchat,
    "telegram-va": telegram,
    "discord-va": discord,
    "website-va": website,
  } = formVisual;

  if (!name.trim()) {
    setModalMessage("Inserisci il nome d’arte.");
    setModalType("error");
    setModalOpen(true);
    return;
  }

  if (!images || images.length === 0) {
    setModalMessage("Aggiungi almeno un’immagine rappresentativa del tuo lavoro.");
    setModalType("error");
    setModalOpen(true);
    return;
  }

  if (bio.trim().length < 100) {
    setModalMessage("Raccontaci qualcosa in più su un tuo progetto, opera o visione artistica. Almeno 100 caratteri.");
    setModalType("error");
    setModalOpen(true);
    return;
  }

  const atLeastOneSocial = [
    youtube,
    instagram,
    twitter,
    tiktok,
    facebook,
    threads,
    linkedin,
    snapchat,
    telegram,
    discord,
    website,
  ].some((link) => link && link.trim() !== "");

  if (!atLeastOneSocial) {
    setModalMessage("Inserisci almeno un link social o un sito web dove possiamo trovarti.");
    setModalType("error");
    setModalOpen(true);
    return;
  }

  goNextStep();
};

export const validateStep3Music = (
  formMusic,
  setModalMessage,
  setModalType,
  setModalOpen,
  goNextStep
) => {
  if (!formMusic["name-mu"].trim()) {
    setModalMessage("Inserisci il nome dell’artista.");
    setModalType("error");
    setModalOpen(true);
    return;
  }

  if (!formMusic["images-mu"] || formMusic["images-mu"].length === 0) {
    setModalMessage("Carica almeno un’immagine rappresentativa.");
    setModalType("error");
    setModalOpen(true);
    return;
  }

  if (!formMusic["bio-extended-mu"] || formMusic["bio-extended-mu"].trim().length < 100) {
    setModalMessage("Raccontaci un po’ di più! La biografia deve contenere almeno 100 caratteri.");
    setModalType("error");
    setModalOpen(true);
    return;
  }

  if (!formMusic["single-title-mu"] || !formMusic["single-year-mu"]) {
    setModalMessage("Inserisci il titolo e l’anno del brano o album.");
    setModalType("error");
    setModalOpen(true);
    return;
  }

  const singlePlatforms = [
    "single-platform-spotify-mu",
    "single-platform-youtube-mu",
    "single-platform-bandcamp-mu",
    "single-platform-soundcloud-mu",
    "single-platform-appleMusic-mu",
    "single-platform-deezer-mu",
    "single-platform-tidal-mu",
  ];

  const hasSinglePlatform = singlePlatforms.some(
    (key) => formMusic[key] && formMusic[key].trim() !== ""
  );

  if (!hasSinglePlatform) {
    setModalMessage("Inserisci almeno un link per ascoltare il tuo brano o album.");
    setModalType("error");
    setModalOpen(true);
    return;
  }

  const generalPlatforms = [
    "platform-spotify-mu",
    "platform-soundcloud-mu",
    "platform-youtube-mu",
    "platform-bandcamp-mu",
    "platform-appleMusic-mu",
    "platform-deezer-mu",
    "platform-tidal-mu",
    "platform-amazonMusic-mu",
    "platform-audiomack-mu",
    "platform-napster-mu",
    "platform-beatport-mu",
    "platform-boomplay-mu",
    "platform-shazam-mu",
    "platform-pandora-mu",
  ];

  const hasGeneralPlatform = generalPlatforms.some(
    (key) => formMusic[key] && formMusic[key].trim() !== ""
  );

  if (!hasGeneralPlatform) {
    setModalMessage("Inserisci almeno un link a una piattaforma dove si può trovare la tua musica.");
    setModalType("error");
    setModalOpen(true);
    return;
  }

  goNextStep();
};

export const validateStep4Genres = (
  selectedSubgenres,
  setModalMessage,
  setModalType,
  setModalOpen,
  goNextStep
) => {
  if (!selectedSubgenres || selectedSubgenres.length < 3) {
    setModalMessage("Seleziona almeno 3 sottogeneri per rappresentare al meglio il tuo stile.");
    setModalType("error");
    setModalOpen(true);
    return;
  }

  goNextStep();
};
