import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import CardStaticWrapper from "../layout/CardStaticWrapper";
import { CheckboxCustom } from "../layout/CheckboxCustom";
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



                    <CheckboxCustom
                      item={genre}
                      isSelected={allSelected}
                      onToggle={selectAllSubgenres}
                    />



                    <button
                      type="button"
                      onClick={() => toggleExpandGenre(genre.key)}
                      className="text-sm text-black underline"
                    >
                      {expandedGenre === genre.key ?
                        <FiltersWrapper>
                          <FaChevronUp
                            className="h-5 w-5 text-monza  rounded-full"
                            aria-hidden="true"
                          /></FiltersWrapper>
                        : <FiltersWrapper>
                          <FaChevronDown
                            className="h-5 w-5 text-monza rounded-full"
                            aria-hidden="true"
                          />
                        </FiltersWrapper>}
                    </button>
                  </div>
                  {expandedGenre === genre.key && (
                    <div className="pl-4 mt-2 space-y-1">
                      {genre.subgenres.map((sub) => (
                        <CheckboxCustom
                          key={sub.key}

                          item={sub}
                          isSelected={selectedSubgenres.includes(sub.key)}
                          onToggle={()=>toggleSubgenre(sub.key)}
                        />
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


                    <CheckboxCustom
                      item={genre}
                      isSelected={allSelected}
                      onToggle={selectAllSubgenres}
                    />


                    <button
                      type="button"
                      onClick={() => toggleExpandGenre(genre.key)}
                      className="text-sm text-black underline"
                    >
                      {expandedGenre === genre.key ?
                        <FiltersWrapper>
                          <FaChevronUp
                            className="h-5 w-5 text-monza  rounded-full"
                            aria-hidden="true"
                          /></FiltersWrapper>
                        : <FiltersWrapper>
                          <FaChevronDown
                            className="h-5 w-5 text-monza rounded-full"
                            aria-hidden="true"
                          />
                        </FiltersWrapper>}
                    </button>


                  </div>
                  {expandedGenre === genre.key && (
                    <div className="pl-4 mt-2 space-y-1">
                      {genre.subgenres.map((sub) => (


                        <CheckboxCustom
                          key={sub.key}

                          item={sub}
                          isSelected={selectedSubgenres.includes(sub.key)}
                          onToggle={()=>toggleSubgenre(sub.key)}
                        />

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
