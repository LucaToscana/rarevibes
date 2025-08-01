import musicFilters from "../data/musicFilters.json";
import artFilters from "../data/artFilters.json";

import { useTranslation } from "react-i18next";
import FiltersConsole from "../components/artists/FiltersConsole";
import ArtistCard from "../components/artists/ArtistCard";
import SubFilterList from "../components/layout/SubFilterList";
import FilterHeader from "../components/layout/FilterHeader";
import { useFilteredArtists, useFilterManagement } from "../hook/useFilters";
import { useEffect, useRef, useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { filterArtists } from "../utils/filterArtists";
import SectionTitle from '../components/layout/SectionTitle'
import CardWrapper from "../components/layout/CardWrapper";
import SearchWithCaptcha from "../components/layout/SearchWithCaptcha";
import CardStaticWrapper from "../components/layout/CardStaticWrapper";
const bgImage =
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/197cd9216759479.6785936ec6e94.jpg";

export default function Artists() {
  const [isSubFilterListVisible, setIsSubFilterListVisible] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState("0px");

  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimestamps, setSearchTimestamps] = useState([]);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaInput, setCaptchaInput] = useState("");
  const captchaAnswer = 7; // esempio 3 + 4

  const { t } = useTranslation("common");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
      : mainFilter.includes("visualarts")
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

  // Gestione input ricerca con rate limiting
  const handleSearchChange = (e) => {
    const now = Date.now();

    // Tieni solo i timestamps degli ultimi 60s
    const recentTimestamps = searchTimestamps.filter(
      (t) => now - t < 60000
    );

    if (recentTimestamps.length >= 100) {
      // Troppe ricerche in 60s => mostra captcha
      setShowCaptcha(true);
      return; // blocca aggiornamento ricerca
    }

    // Aggiorna lista timestamps e searchTerm
    setSearchTimestamps([...recentTimestamps, now]);
    setSearchTerm(e.target.value);
  };

  // Verifica risposta captcha
  const handleCaptchaSubmit = (e) => {
    e.preventDefault();
    if (parseInt(captchaInput) === captchaAnswer) {
      setShowCaptcha(false);
      setCaptchaInput("");
      setSearchTimestamps([]); // resetta contatore
    } else {
      alert("error!");
    }
  };

  return (
    <main className="min-h-screen px-6 py-12 max-w-7xl mx-auto  pt-24">
      <div>

        {/* Header con barra ricerca + reset filtri */}
        <div className="flex flex-col md:flex-row w-full gap-8 mt-8 mb-8">
          <SectionTitle> {t('artists')}</SectionTitle>

          <SearchWithCaptcha
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            showCaptcha={showCaptcha}
            onCaptchaSubmit={handleCaptchaSubmit}
            captchaInput={captchaInput}
            onCaptchaInputChange={(e) => setCaptchaInput(e.target.value)}
            placeholder={t("placeholdersFilter")}
          />
          <div className="flex flex-row items-center justify-center  gap-6 w-fit h-full">
            <div className="flex flex-row items-center justify-center w-fit h-full">
              <FilterHeader
                count={
                  cleanedSubFilters.length +
                  (mainFilter.includes("all") && mainFilter.length === 1
                    ? 0
                    : mainFilter.length)
                }
                onReset={handleReset}
              />
            </div>



            <div
              onClick={toggleSubFilterListVisibility}

              className="flex flex-row items-center justify-center gap-4 h-full">
              <CardWrapper>

                <button
                  className="focus:outline-none "
                  aria-label={
                    isSubFilterListVisible ? t("hide_filters") : t("show_filters")
                  }
                >
                  {isSubFilterListVisible ? (
                    <FaChevronUp className="h-5 w-5  text-monza rounded-full" />
                  ) : (
                    <FaChevronDown className="h-5 w-5  text-monza rounded-full" />
                  )}
                </button>
              </CardWrapper>

            </div>

          </div>
        </div>


        {isSubFilterListVisible && (

          <div className="m-8">
            <CardStaticWrapper>

              {/* Subfiltri a scomparsa */}
              <div
                ref={contentRef}
                style={{ maxHeight: isSubFilterListVisible ? contentHeight : "0px" }}
                className={`
            overflow-hidden h-96 transition-[max-height] duration-300 ease-in-out
            relative  ${isSubFilterListVisible ? "mt-4" : ""}
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
            </CardStaticWrapper> </div>
        )}
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <FiltersConsole genres={currentFilterData} />
        </aside>

        <section
          className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4"
          style={{ alignContent: 'start' }}
        >
          {filteredArtists.length > 0 ? (
            filteredArtists.map((artist) => (
              <div key={artist.id} className="w-full">
                <ArtistCard
                  key={artist.id}
                  artist={artist}
                  showBio
                  slug={artist.id}
                /></div>
            ))
          ) : (
            <div className="animate-fade-in">
              <CardWrapper>
                <div className="col-span-full flex flex-col items-center justify-center text-center py-12">
                  <p className="text-xl font-arvo text-monza">
                    {t("no_artists_found") || "No artists found."}
                  </p>
                </div>
              </CardWrapper></div>
          )}
        </section>

      </div>
    </main>
  );
}
