// generateMockArtist.js
/**
 * Esempio semplice di utilizzo di `generateMockArtist` in un componente React.
 * 
 * Import:
 * import { generateMockArtist } from './data/generateMockArtist';
 * 
 * -----------------------------------------------------------
 * Codice di esempio (React functional component):
 * 
 * import React, { useState, useEffect } from 'react';
 * import { generateMockArtist } from './data/generateMockArtist';
 * 
 * function App() {
 *   const [artist, setArtist] = useState(null);
 * 
 *   // Al montaggio del componente, genera un artista mock e salvalo nello state
 *   useEffect(() => {
 *     const mockArtist = generateMockArtist();
 *     setArtist(mockArtist);
 *   }, []);
 * 
 *   if (!artist) return <div>Loading artist...</div>;
 * 
 *   return (
 *     <div>
 *       <h1>{artist.name}</h1>
 *       <p><strong>Bio (short):</strong> {artist.bio.short}</p>
 *       <p><strong>Origin:</strong> {artist.origin}</p>
 *       <p><strong>Genre:</strong> {artist.genre.join(", ")}</p>
 * 
 *       <img src={artist.images[0]} alt={artist.name} style={{ width: '300px' }} />
 *     </div>
 *   );
 * }
 * 
 * export default App;
 * 
 * -----------------------------------------------------------
 * Cosa fa il codice?
 * - All’avvio (useEffect senza dipendenze), genera un artista mock chiamando generateMockArtist().
 * - Salva l’oggetto nel state React (`artist`).
 * - Quando `artist` è pronto, mostra i dati principali e l’immagine.
 * 
 * -----------------------------------------------------------
 * Nota importante sulle immagini:
 * - L’immagine si aspetta di trovare il file `/artists/<slug>.jpg` dentro la cartella `public/artists/`.
 * - Per esempio, per un artista con slug "odelia", metti l’immagine `odelia.jpg` dentro `/public/artists/`.
 * 
 * -----------------------------------------------------------
 * Come generare più artisti:
 * 
 * import { generateMockArtist } from './data/generateMockArtist';
 * 
 * const generateMultipleArtists = (count = 5) => {
 *   const artists = [];
 *   for(let i = 0; i < count; i++) {
 *     artists.push(generateMockArtist(Date.now() + i));
 *   }
 *   return artists;
 * };
 * 
 * // Puoi usarla per creare liste di artisti mock e mostrarle in React tramite map()
 * 
 */



import defaultArtist from './defaultArtist';

const sampleNames = ["Odelia", "Kairo", "Luna Rae", "Echo Shade", "Nova Volt"];
const sampleGenres = [["Alternative"], ["Electronic", "Synthpop"], ["Hip-Hop"], ["Jazz", "Soul"]];
const sampleOrigins = ["Paris, France", "Berlin, Germany", "Tokyo, Japan", "Los Angeles, USA"];
const sampleLabels = ["Independent", "Moonlight Records", "Neon Tapes", "Unsigned"];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

export function generateMockArtist(id = Date.now()) {
  const name = getRandom(sampleNames);
  const genre = getRandom(sampleGenres);
  const origin = getRandom(sampleOrigins);
  const label = getRandom(sampleLabels);
  const slug = generateSlug(name);

  return {
    ...defaultArtist,
    id,
    name,
    slug,
    genre,
    origin,
    label,
    images: [`/artists/${slug}.jpg`],
    bio: {
      short: `${name} is an emerging artist blending ${genre.join(", ")} sounds.`,
      review: `${name} is gaining recognition for their unique blend of ${genre.join(" and ")}. Originating from ${origin}, they’ve built a growing fanbase.`,
      extended: `${name} began their musical journey in ${origin} under the ${label} label. Their sonic identity fuses genres like ${genre.join(", ")} and more. With a passion for storytelling and sound exploration, ${name} continues to captivate audiences worldwide.`
    },
    singles: [
      {
        title: `${name}'s Anthem`,
        year: 2024,
        cover: `/singles/${slug}-anthem.jpg`,
        featuring: [],
        platforms: {
          spotify: "",
          youtube: "",
          soundcloud: "",
          appleMusic: "",
          deezer: "",
          tidal: ""
        }
      }
    ]
  };
}
