import enBios from "../locales/en/bios.json";
import frBios from "../locales/fr/bios.json";
import itBios from "../locales/it/bios.json";
import esBios from "../locales/es/bios.json";

/**
 * Filtra gli artisti in base al nome, label, titoli dei singoli o ai contenuti delle bio in tutte le lingue.
 *
 * @param {Array} artists - Lista completa di artisti.
 * @param {string} searchTerm - Testo da cercare (nome, bio, label, titoli singoli).
 * @returns {Array} artisti filtrati
 */
export function filterArtists(artists, searchTerm) {
  if (!searchTerm.trim()) return artists;

  const term = searchTerm.toLowerCase();

  const allLocalizedBios = {
    en: enBios,
    fr: frBios,
    it: itBios,
    es: esBios,
  };

  return artists.filter((artist) => {
    // Cerca nel nome
    const nameMatch = artist.name?.toLowerCase().includes(term);

    // Cerca nella label
    const labelMatch = artist.label?.toLowerCase().includes(term);

    // Cerca nei titoli dei singoli
    const singlesMatch = (artist.singles || []).some(single =>
      single.title?.toLowerCase().includes(term)
    );

    // Cerca nelle bio in tutte le lingue
    const biosInAllLangs = Object.values(allLocalizedBios)
      .map((bios) => bios?.[artist.slug] || {})
      .filter(Boolean);

    const bioMatch = biosInAllLangs.some((bio) => {
      const short = bio.short?.toLowerCase() || "";
      const review = bio.review?.toLowerCase() || "";
      const extended = bio.extended?.toLowerCase() || "";
      return (
        short.includes(term) ||
        review.includes(term) ||
        extended.includes(term)
      );
    });

    return nameMatch || labelMatch || singlesMatch || bioMatch;
  });
}
