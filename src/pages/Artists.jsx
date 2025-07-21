import musicFilters from "../locales/en/musicFilters.json";
import artFilters from "../locales/en/artFilters.json";

import { useTranslation } from "react-i18next";
import FiltersConsole from "../components/artists/FiltersConsole";
import ArtistCard from "../components/artists/ArtistCard";
import SubFilterList from "../components/layout/SubFilterList";
import FilterHeader from "../components/layout/FilterHeader";
import { useFilteredArtists, useFilterManagement } from "../hook/useFilters";
import { useEffect, useRef, useState } from "react";
import { FaChevronUp, FaChevronDown, FaSearch } from "react-icons/fa";
import { filterArtists } from "../utils/filterArtists";

const bgImage =
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/197cd9216759479.6785936ec6e94.jpg";

export default function Artists() {
  const [isSubFilterListVisible, setIsSubFilterListVisible] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState("0px");
  const [searchTerm, setSearchTerm] = useState("");

  const { handleReset, cleanedSubFilters, mainFilter } = useFilterManagement(
    musicFilters.genres || []
  );

  const currentFilterData = mainFilter.includes("artist")
    ? artFilters.genres || []
    : musicFilters.genres || [];

  const { filteredArtists: rawFilteredArtists } = useFilteredArtists();

  // Filtro aggiuntivo per nome artista
const filteredArtists = filterArtists(rawFilteredArtists, searchTerm);


  useEffect(() => {
    if (isSubFilterListVisible) {
      if (contentRef.current) {
        setContentHeight(`${contentRef.current.scrollHeight}px`);
      }
    } else {
      if (contentRef.current) {
        setContentHeight(`${contentRef.current.scrollHeight}px`);
        setTimeout(() => {
          setContentHeight("0px");
        }, 10);
      }
    }
  }, [isSubFilterListVisible]);

  const { t } = useTranslation("common");

  const toggleSubFilterListVisibility = () => {
    setIsSubFilterListVisible((prev) => !prev);
  };

  return (
    <main className="min-h-screen px-6 py-12 max-w-7xl mx-auto">
      <div>
        {/* Header section with Artists title and FilterHeader */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <h1 className="artist-monoton text-2xl sm:text-3xl lg:text-6xl whitespace-nowrap">
              {t("artists")}
            </h1>

            {/* Input ricerca per nome artista */}
            <div className="relative w-full sm:w-72">
              <FaSearch className="absolute top-3 left-3 text-gray-500" />
              <input
                type="text"
                placeholder={t("placeholdersFilter") || "Search by name"}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 lg:w-96 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-monza"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 self-start sm:self-auto">
            <FilterHeader
              count={
                cleanedSubFilters.length +
                (mainFilter.includes("all") && mainFilter.length === 1
                  ? 0
                  : mainFilter.length)
              }
              onReset={handleReset}
            />

            {/* Toggle filter visibility button */}
            <button
              onClick={toggleSubFilterListVisibility}
              className="focus:outline-none active:outline-none focus:ring-0 active:ring-0 focus:border-transparent active:border-transparent !border-none rounded-full p-2"
              aria-label={
                isSubFilterListVisible ? t("hide_filters") : t("show_filters")
              }
            >
              {isSubFilterListVisible ? (
                <FaChevronUp
                  className="h-5 w-5 bg-iron text-monza  rounded-full"
                  aria-hidden="true"
                />
              ) : (
                <FaChevronDown
                  className="h-5 w-5 bg-iron text-monza rounded-full"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </div>

        {/* Filtro SubList (a scomparsa) */}
        <div
          ref={contentRef}
          style={{ maxHeight: isSubFilterListVisible ? contentHeight : "0px" }}
          className={`
            overflow-hidden h-96
            transition-[max-height] duration-300 ease-in-out
            relative
            rounded-md
            ${isSubFilterListVisible ? "mt-4" : ""}
          `}
        >
          {/* Sfondo immagine */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
            aria-hidden="true"
          />

          {/* Overlay scuro */}
          <div
            className="absolute inset-0 bg-black bg-opacity-60"
            aria-hidden="true"
          />

          {/* Contenuto sopra l'immagine */}
          {isSubFilterListVisible && (
            <div
              className="relative z-10 p-4 w-full h-48 text-white custom-red-scrollbar"
              style={{
                maxHeight: isSubFilterListVisible
                  ? `${contentRef.current ? contentRef.current.scrollHeight - 32 : 0}px`
                  : "0px",
                overflowY: "auto",
              }}
            >
              <SubFilterList genres={currentFilterData} />
            </div>
          )}
        </div>
      </div>

      <div className="h-1 bg-monza mb-8" />

      {/* Layout griglia artisti */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar sinistra */}
        <aside className="md:col-span-1">
          <FiltersConsole genres={currentFilterData} />
        </aside>

        {/* Lista artisti */}
        <section className="md:col-span-3 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {filteredArtists.length > 0 ? (
            filteredArtists.map(( artist, foundIn) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                showBio
                slug={artist.id}
                foundIn ={foundIn}
              />
            ))
          ) : (
            <p className="text-gray-400 col-span-full">{t("no_artists_found") || "No artists found."}</p>
          )}
        </section>
      </div>
    </main>
  );
}
