import musicFilters from '../locales/en/musicFilters.json';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FiltersConsole from '../components/artists/FiltersConsole';
import ArtistCard from '../components/artists/ArtistCard';
import SubFilterList from '../components/layout/SubFilterList'
import FilterHeader from '../components/layout/FilterHeader';


import { setSubFilter, setMainFilter } from '../store/filtersSlice'


export default function Artists() {
  const dispatch = useDispatch();
  const mainGenres = useSelector(state => state.filters.mainGenres)
  const [artists, setArtists] = useState([]);

  const mainFilters = useSelector(state => state.filters.mainFilter);
  const subFilters = useSelector(state => state.filters.subFilter);
  const handleReset = () => {
    dispatch(setMainFilter(['all']));
    dispatch(setSubFilter([]));

  }
  const cleanedSubFilters = subFilters.filter(key => !mainGenres.includes(key));

  const { t } = useTranslation('common');

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'data/artists.json')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => setArtists(data))
      .catch(err => console.error('Errore nel caricamento artisti:', err));
  }, []);

  //  Corretto per struttura JSON con "genres"
  const genres = musicFilters.genres || [];

  const filteredArtists = artists.filter(artist => {
    if (mainFilters.includes('all')) return true;

    if (mainFilters.includes('artist')) return artist.type === 'artist';

    if (mainFilters.includes('musician')) {
      // Nessun filtro specifico -> mostra tutti i musician
      if (subFilters.length === 0) return artist.type === 'musician';

      // Altrimenti filtra per genere
      return artist.type === 'musician' &&
        artist.genres.some(g => subFilters.includes(g));
    }

    return false;
  });


  return (
    <main className="min-h-screen px-6 py-12 max-w-7xl mx-auto">


      <div>
        <div className="mt-4">
          <SubFilterList />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-4">
          <h1 className="artist-monoton text-2xl sm:text-3xl">
            {t('artists')}
          </h1>

          <FilterHeader
            count={cleanedSubFilters.length}
            onReset={handleReset}
          />
        </div>
      </div>

      <div className="h-1 bg-monza mb-8" />

      {/* Layout a due colonne */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Colonna di sinistra: Filtri */}
        <aside className="md:col-span-1">

          <FiltersConsole genres={genres} subFilter={subFilters} />
        </aside>

        {/* Colonna di destra: Lista artisti */}
        <section className="md:col-span-3  grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {filteredArtists.map(artist => (
            <ArtistCard key={artist.id} artist={artist} showBio slug={artist.id} />
          ))}
        </section>

      </div>
    </main>
  );

}
