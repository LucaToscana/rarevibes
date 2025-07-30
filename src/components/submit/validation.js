export const validateStep1 = (
  formBase,
  artistType,
  showModal,
  goNextStep,
  t
) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formBase.name || !formBase.email || !formBase.message || !artistType) {
    showModal(t("allfieldsrequired"), "error");
    return;
  }

  if (!emailRegex.test(formBase.email)) {
    showModal(t("invalidemail"), "error");
    return;
  }

  if (formBase.message.trim().length < 50) {
    showModal(t("aboutyou_min50"), "error");
    return;
  }

  goNextStep();
};
export const validateStep2Visual = (formVisual, showModal, goNextStep, t) => {
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
    showModal(t("enterartistname"), "error");
    return;
  }

  if (!images || images.length === 0) {
    showModal(
      t("atleastoneimage"),
      "error"
    );
    return;
  }

  if (bio.trim().length < 50) {
    showModal(
      t("aboutproject_min50"),
      "error"
    );
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
    showModal(
      t("entersocials"),
      "error"
    );
    return;
  }

  goNextStep();
};

export const validateStep3Music = (formMusic, showModal, goNextStep ,t ) => {
  if (!formMusic["name-mu"].trim()) {
    showModal(t("enterartistname"), "error");
    return;
  }

  if (!formMusic["images-mu"] || formMusic["images-mu"].length === 0) {
    showModal(t("atleastoneimage"), "error");
    return;
  }

  if (
    !formMusic["bio-extended-mu"] ||
    formMusic["bio-extended-mu"].trim().length < 50
  ) {
    showModal(
      t("aboutproject_min50"),
      "error"
    );
    return;
  }

  if (!formMusic["single-title-mu"] || !formMusic["single-year-mu"]) {
    showModal(t("enterTitleAndYear"), "error");
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
    showModal(
      t("atleastonelink"),
      "error"
    );
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
    showModal(
      t("atleastonelink"),
      "error"
    );
    return;
  }

  goNextStep();
};

export const validateStep4Genres = (
  selectedSubgenres,
  showModal,
  goNextStep,
  t
) => {
  if (!selectedSubgenres || selectedSubgenres.length < 1) {
    showModal(
      t("min1subgenres"),
      "error"
    );
    return;
  }

  goNextStep();
};
