import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import CardStaticWrapper from "../layout/CardStaticWrapper";
import FiltersWrapper from "../layout/FiltersWrapper";
import { useEffect } from "react";
import { addVisitedArtist } from "../../store/visitedArtistsSlice";

export default function ArtistTrackListCard({ onSelect, selectArtist }) {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  // Recupera artisti visitati dal Redux store
  const items = useSelector((state) => state.visitedArtists.visited);

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + "data/artists.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const musicArtists = data.filter((a) =>
          Array.isArray(a.type) && a.type.includes("music")
        );
        // Aggiungi i default allo store
        musicArtists.slice(0, 10).forEach((artist) => {
          dispatch(addVisitedArtist(artist));
        });
      })
      .catch((err) =>
        console.error("Errore nel caricamento artisti default:", err)
      );
  }, [dispatch]);

  return (
    <div className="w-72 sm:w-fit mb-5">
      <CardStaticWrapper>
        <div className="sm:w-fit md:h-full flex flex-col justify-between block relative overflow-x-hidden">
          <h2 className="text-xs font-heming md:mb-2 font-bold z-10 pl-1 pt-1 lowercase">
            {t("recentArtists")}
          </h2>
          <div
            className="max-w-md shadow-md overflow-hidden relative text-white max-h-48"
            style={{
              backgroundImage: selectArtist?.images
                ? `url(${selectArtist?.images[0]})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "60px",
            }}
          >
            <div className="absolute inset-0 bg-white bg-opacity-40" />
            {/* Lista con sfondo per ogni artista */}
            <ul className="relative z-10 space-y-2 overflow-y-auto pr-1 max-h-[150px] p-1 overflow-x-hidden ml-3">
              {items.slice(0, 10).map((item, index) => {
                const backgroundImage = item.image || item.images?.[0] || "";

                return (
                  <FiltersWrapper key={item.id || index}>
                    <li
                      onClick={() => onSelect(item)}
                      className="cursor-pointer relative w-56 md:w-72 font-heming overflow-hidden group z-50"
                      style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      {/* Overlay per oscurare lo sfondo */}
                      <div className="absolute inset-0 bg-black bg-opacity-60 group-hover:bg-opacity-40 transition-all pointer-events-none" />
                      {/* Contenuto testo */}
                      <div className="relative z-10 px-3 py-2 text-white flex items-center space-x-2">
                        <p className="text-xs font-semibold truncate">
                          {item.singles?.[0]?.title || "No title"}
                        </p>
                        <span className="text-xs text-zinc-400 select-none">–</span>
                        <p className="text-xs text-zinc-300 truncate">{item.name}</p>
                      </div>
                    </li>
                  </FiltersWrapper>
                );
              })}
            </ul>
          </div>
        </div>
      </CardStaticWrapper>
    </div>
  );
}
