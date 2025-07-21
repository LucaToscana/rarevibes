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

  const { t } = useTranslation("common");

  const mergeGenres = (genres1, genres2) => {
    const map = {};
    [...genres1, ...genres2].forEach((g) => {
      if (!map[g.key]) {
        map[g.key] = g;
      }
    });
    return Object.values(map);
  };

  const allGenres = mergeGenres(musicFilters.genres, artFilters.genres);

  // useFilterManagement riceve sempre tutti i filtri
  const {
    handleReset,
    cleanedSubFilters,
    mainFilter,
  } = useFilterManagement(allGenres);

  // Ora è sicuro usare mainFilter per filtrare i generi visibili
  const currentFilterData =
    mainFilter.includes("all")
      ? allGenres
      : mainFilter.includes("artist")
        ? artFilters.genres
        : musicFilters.genres;
  const { filteredArtists: rawFilteredArtists } = useFilteredArtists();

  //  Filtro aggiuntivo per il nome
  const filteredArtists = filterArtists(rawFilteredArtists, searchTerm);

  //  Gestione altezza sezione filtri a scomparsa
  useEffect(() => {
    if (contentRef.current) {
      const height = `${contentRef.current.scrollHeight}px`;
      if (isSubFilterListVisible) {
        setContentHeight(height);
      } else {
        setContentHeight(height);
        setTimeout(() => {
          setContentHeight("0px");
        }, 10);
      }
    }
  }, [isSubFilterListVisible]);

  const toggleSubFilterListVisibility = () => {
    setIsSubFilterListVisible((prev) => !prev);
  };

  return (
    <main className="min-h-screen px-6 py-12 max-w-7xl mx-auto">
      <div>
        <h1 className="artist-monoton text-2xl sm:text-3xl lg:text-6xl whitespace-nowrap mt-12">
          {t("artists")}
        </h1>

        {/* Header con barra ricerca + reset filtri */}
        <div className="flex flex-row w-full items-center justify-between gap-4 mt-8">
          <div className="relative flex-[3]">
            <FaSearch className="absolute top-3 left-3 text-gray-500" />
            <input
              type="text"
              placeholder={t("placeholdersFilter") || "Search by name"}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-monza"
            />
          </div>

          <div className="flex flex-row flex-[1] items-center gap-4 justify-end">
            <FilterHeader
              count={
                cleanedSubFilters.length +
                (mainFilter.includes("all") && mainFilter.length === 1
                  ? 0
                  : mainFilter.length)
              }
              onReset={handleReset}
            />

            <button
              onClick={toggleSubFilterListVisibility}
              className="focus:outline-none rounded-full p-2"
              aria-label={
                isSubFilterListVisible ? t("hide_filters") : t("show_filters")
              }
            >
              {isSubFilterListVisible ? (
                <FaChevronUp className="h-5 w-5 bg-iron text-monza rounded-full" />
              ) : (
                <FaChevronDown className="h-5 w-5 bg-iron text-monza rounded-full" />
              )}
            </button>
          </div>
        </div>
        {/* Subfiltri a scomparsa */}
        <div
          ref={contentRef}
          style={{ maxHeight: isSubFilterListVisible ? contentHeight : "0px" }}
          className={`
            overflow-hidden h-96 transition-[max-height] duration-300 ease-in-out
            relative rounded-md ${isSubFilterListVisible ? "mt-4" : ""}
          `}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-black bg-opacity-60"
            aria-hidden="true"
          />
          {isSubFilterListVisible && (
            <div
              className="relative z-10 p-4 w-full h-48 text-white custom-red-scrollbar"
              style={{
                maxHeight: `${contentRef.current?.scrollHeight - 32}px`,
                overflowY: "auto",
              }}
            >
              <SubFilterList genres={currentFilterData} />
            </div>
          )}
        </div>
      </div>

      <div className="h-1 bg-monza mb-8" />

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <FiltersConsole genres={currentFilterData} />
        </aside>

        <section className="md:col-span-3 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:[grid-auto-rows:300px]">
          {filteredArtists.length > 0 ? (
            filteredArtists.map((artist, index) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                showBio
                slug={artist.id}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center text-center text-gray-400 py-12">
              <p className="text-xl">{t("no_artists_found") || "No artists found."}</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
