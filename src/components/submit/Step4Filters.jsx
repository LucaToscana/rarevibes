import CardStaticWrapper from "../layout/CardStaticWrapper";
import FiltersWrapper from "../layout/FiltersWrapper";
import SectionTitle from "../layout/SectionTitle";

function Step4Filters({
  artistType,
  artFilters,
  musicFilters,
  selectedSubgenres,
  toggleSubgenre,
  selectAllSubgenres,
  expandedGenre,
  toggleExpandGenre,
}) {
  return (
    <>
      {(artistType === "visual" || artistType === "both") && (
        <CardStaticWrapper>
          <section className="mb-6">
            <SectionTitle><h2 className="">Generi Arti Visuali</h2></SectionTitle>
            {artFilters.genres.map((genre) => {
              const allSelected = genre.subgenres.every((s) => selectedSubgenres.includes(s.key));
              return (
                <div key={genre.key} className="border p-4 rounded bg-gray-100 mb-3">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 font-semibold">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={() => selectAllSubgenres(genre)}
                      />
                      {genre.label}
                    </label>
                    <FiltersWrapper>
                      <button
                        type="button"
                        onClick={() => toggleExpandGenre(genre.key)}
                        className="text-sm text-black underline"
                      >
                        {expandedGenre === genre.key ? "Nascondi" : "Mostra sottogeneri"}
                      </button>
                    </FiltersWrapper>
                  </div>
                  {expandedGenre === genre.key && (
                    <div className="pl-4 mt-2 space-y-1">
                      {genre.subgenres.map((sub) => (
                        <label key={sub.key} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedSubgenres.includes(sub.key)}
                            onChange={() => toggleSubgenre(sub.key)}
                          />
                          {sub.label}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        </CardStaticWrapper>
      )}

      {(artistType === "music" || artistType === "both") && (
        <CardStaticWrapper>
          <section>
            <h2 className="text-xl font-semibold mb-4">Generi Musicali</h2>
            {musicFilters.genres.map((genre) => {
              const allSelected = genre.subgenres.every((s) => selectedSubgenres.includes(s.key));
              return (
                <div key={genre.key} className="border p-4 rounded bg-gray-100 mb-3">
                  <div className="flex items-center justify-between">
                    <FiltersWrapper>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={allSelected}
                          onChange={() => selectAllSubgenres(genre)}
                          className="peer hidden"
                        />
                        <div
                          className={`w-5 h-5 rounded border flex items-center justify-center transition
                          ${allSelected ? 'bg-monza border-black' : 'bg-white border-black'}
                        `}
                        >
                          {allSelected && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        {genre.label}
                      </label>

                    </FiltersWrapper>
                    <FiltersWrapper>
                      <button
                        type="button"
                        onClick={() => toggleExpandGenre(genre.key)}
                        className="text-sm text-black underline"
                      >
                        {expandedGenre === genre.key ? "Nascondi" : "Mostra sottogeneri"}
                      </button>
                    </FiltersWrapper>
                  </div>
                  {expandedGenre === genre.key && (
                    <div className="pl-4 mt-2 space-y-1">
                      {genre.subgenres.map((sub) => (
                        <FiltersWrapper>
                          <label key={sub.key} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedSubgenres.includes(sub.key)}
                              onChange={() => toggleSubgenre(sub.key)}
                              className="peer hidden"

                            />
                            <div
                              className={`w-5 h-5 rounded border flex items-center justify-center transition
                          ${selectedSubgenres.includes(sub.key) ? 'bg-monza border-black' : 'bg-white border-black'}
                        `}
                            >
                              {selectedSubgenres.includes(sub.key) && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>


                            {sub.label}
                          </label>
                        </FiltersWrapper>

                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        </CardStaticWrapper>
      )}
    </>
  );
}

export default Step4Filters;
