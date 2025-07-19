export function getClasses({ isActive, type, extraClass = '' }) {
  const base = ' transition duration-200';
  if (type === 'button') {
    const baseButton = 'text-2xs sm:text-base px-4 py-2 rounded-xs';
    const active = 'text-2xs bio-highlight line-through  decoration-2 p-1';
    const inactive = 'text-2xs  bio-highlight-white';

    return `${base} ${baseButton} ${isActive ? active : inactive} ${extraClass}`;

  }
  if (type === 'filter-button') {
    const baseButton = 'text-base sm:text-base px-4 py-2 rounded-xs';
    const active = 'text-base bio-highlight-white-small line-through  decoration-2 p-1';
    const inactive = 'text-base  bio-highlight-small ';
    return `${base} ${baseButton} ${isActive ? active : inactive} ${extraClass}`;
  }
  if (type === 'link') {
    const baseLink = 'text-lg';
    const hoverClass = extraClass.includes('btn-monza') ? 'text-2xs text-sm sm:text-base px-4 py-2 rounded-full' : '';
    const activeClass = isActive ? 'text-2xs line-through  decoration-2' : '';
    return `${base} ${baseLink} ${hoverClass} ${extraClass} ${activeClass}`;
  }
  return base;
}


/**
 * @file This file contains a utility function for fetching all artist data.
 */

/**
 * Fetches all artist data directly from the JSON file.
 * This is a pure utility function, independent of React components or hooks,
 * making it suitable for data fetching in various parts of the application.
 *
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of all
 * artist objects. Returns an empty array in case of an error to ensure consistency.
 * @example
 * import { fetchAllArtists } from './utils/fetchAllArtists';
 *
 * async function loadData() {
 * const allArtists = await fetchAllArtists();
 * console.log(allArtists); // The complete list of artists
 * }
 */
