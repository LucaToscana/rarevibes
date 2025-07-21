// utils/filterArtistsByName.js

/**
 * Filtra una lista di artisti per nome, ignorando maiuscole/minuscole.
 * @param {Array} artists - Lista completa di artisti.
 * @param {string} searchTerm - Termine di ricerca da confrontare con i nomi.
 * @returns {Array} - Artisti filtrati per nome.
 */
export function filterArtistsByName(artists, searchTerm) {
  if (!searchTerm.trim()) return artists;

  const lowerSearch = searchTerm.toLowerCase();

  return artists.filter((artist) =>
    artist.name.toLowerCase().includes(lowerSearch)
  );
}
