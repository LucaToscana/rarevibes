export function getClasses({ isActive, type, extraClass = "" }) {
  const base = " transition duration-200 lowercase";
  if (type === "link-nav") {
    const baseButton = "text-base sm:text-base px-4 py-2 rounded-xs";
    const active =
      "text-base bio-highlight-white-small line-through  decoration-2 p-1";
    const inactive = "text-xs  bio-highlight-white";

    return `${base} ${baseButton} ${
      isActive ? active : inactive
    } ${extraClass}`;
  }

  if (type === "button-nav") {
    const baseButton = "text-base sm:text-base px-4 py-2 rounded-xs";
    const active =
      "text-base bio-highlight-small line-through  decoration-2 p-1";
    const inactive = "text-xs  bio-highlight";
    return `${base} ${baseButton} ${
      isActive ? active : inactive
    } ${extraClass}`;
  }

  if (type === "button") {
    const baseButton = "text-xs sm:text-base px-4 py-2 rounded-xs";
    const active = "text-xs bio-highlight line-through  decoration-2 p-1";
    const inactive = "text-xs  bio-highlight-white";

    return `${base} ${baseButton} ${
      isActive ? active : inactive
    } ${extraClass}`;
  }
  if (type === "filter-button") {
    const baseButton = "text-base sm:text-base px-4 py-2 rounded-xs";
    const active =
      "text-base bio-highlight-white-small line-through  decoration-2 p-1";
    const inactive = "text-base  bio-highlight-small ";
    return `${base} ${baseButton} ${
      isActive ? active : inactive
    } ${extraClass}`;
  }
  if (type === "link") {
    const baseLink = "text-lg";
    const hoverClass = extraClass.includes("btn-monza")
      ? "text-xs text-sm sm:text-base px-4 py-2 rounded-full"
      : "";
    const activeClass = isActive ? "text-xs line-through  decoration-2" : "";
    return `${base} ${baseLink} ${hoverClass} ${extraClass} ${activeClass}`;
  }
  return base;
}
export async function fetchAllArtists() {
  return fetch(import.meta.env.BASE_URL + "data/artists.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      return data; // Corrected: return data directly from this .then() block
    })
    .catch((err) => {
      console.error("Error loading artists:", err);
      return []; // Important: Return an empty array or handle error gracefully
    });
}
/**
 * Calculates the top N most prevalent genres from a list of artists.
 * If the number of unique prevalent genres is less than N, it fills the remaining
 * spots with random unique genres from the entire available pool. This ensures
 * you always get a list up to the specified limit, prioritizing popular genres.
 *
 * @param {Array<Object>} artists - An array of artist objects, where each object is expected
 * to have a 'genres' array property (e.g., `artist.genres = ['Pop', 'Rock']`).
 * @param {number} [limit=10] - The maximum number of genres to return. Defaults to 10.
 * @returns {Array<string>} An array of unique genre strings, ordered by popularity first,
 * then by random selection for the remaining slots until the limit is met.
 * Returns an empty array if no artists or genres are provided.
 * @example
 * import { getTopPopularAndRandomGenres } from './utils/getTopPopularAndRandomGenres';
 *
 * const myArtists = [{ genres: ['Pop', 'Rock'] }, { genres: ['Pop', 'Jazz'] }];
 * const popularGenres = getTopPopularAndRandomGenres(myArtists, 3);
 * console.log(popularGenres); // e.g., ['pop', 'rock', 'jazz']
 */
export function getTopPopularAndRandomGenres(artists, limit = 10) {
  if (!artists || artists.length === 0) {
    return [];
  }

  const genreCounts = {};
  const allUniqueGenres = new Set(); // Stores all distinct genres found across all artists

  // 1. Count genre occurrences and populate the set of all unique genres
  artists.forEach((artist) => {
    (artist.genres || []).forEach((genre) => {
      const lowerCaseGenre = genre.toLowerCase(); // Standardize to lowercase for consistent counting
      genreCounts[lowerCaseGenre] = (genreCounts[lowerCaseGenre] || 0) + 1;
      allUniqueGenres.add(lowerCaseGenre);
    });
  });

  // 2. Sort genres by prevalence (most frequent first)
  const sortedPrevalentGenres = Object.keys(genreCounts)
    .map((genre) => ({
      name: genre,
      count: genreCounts[genre],
    }))
    .sort((a, b) => b.count - a.count) // Sort descending by count
    .map((item) => item.name); // Extract just the genre names

  // 3. Build the final list, prioritizing prevalent genres
  const finalGenres = [];
  const usedGenres = new Set(); // Tracks genres already added to finalGenres to ensure uniqueness

  for (const genre of sortedPrevalentGenres) {
    if (finalGenres.length < limit && !usedGenres.has(genre)) {
      finalGenres.push(genre);
      usedGenres.add(genre);
    } else if (finalGenres.length >= limit) {
      break; // We've hit our limit
    }
  }

  // 4. If the limit hasn't been met, fill with random unique genres
  if (finalGenres.length < limit) {
    // Get genres that haven't been used yet
    const availableRandomGenres = Array.from(allUniqueGenres).filter(
      (genre) => !usedGenres.has(genre)
    );

    // Shuffle these available genres to pick randomly
    for (let i = availableRandomGenres.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableRandomGenres[i], availableRandomGenres[j]] = [
        availableRandomGenres[j],
        availableRandomGenres[i],
      ];
    }

    // Add random genres until the limit is reached
    for (const genre of availableRandomGenres) {
      if (finalGenres.length < limit) {
        finalGenres.push(genre);
        usedGenres.add(genre); // Mark as used
      } else {
        break; // Limit reached
      }
    }
  }

  return finalGenres;
}
