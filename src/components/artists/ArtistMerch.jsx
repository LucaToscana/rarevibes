import CardWrapper from "../layout/CardWrapper";
import FiltersWrapper from "../layout/FiltersWrapper";


const ArtistMerch = ({ filteredArtists, activeCategory, priceRange }) => {
    if (!filteredArtists || filteredArtists.length === 0) {
        return null;
    }

    const allMerchItems = filteredArtists.flatMap((artist) =>
        (artist.merch || [])
            .map((item) => ({
                ...item,
                artistName: artist.name,
            }))
            .filter((item) => {
                const matchesCategory =
                    activeCategory.length === 0
                        ? true
                        : Array.isArray(item.type)
                            ? item.type.some((t) => activeCategory.includes(t))
                            : activeCategory.includes(item.type);

                // Gestione prezzo
                let price = 0;

                if (typeof item.price === "string") {
                    if (item.price.toLowerCase().includes("name your price")) {
                        price = 0;
                    } else {
                        const extracted = parseFloat(item.price.replace(/[^\d.-]/g, ""));
                        price = isNaN(extracted) ? 0 : extracted;
                    }
                } else if (typeof item.price === "number") {
                    price = item.price;
                }

                const matchesPrice =
                    !priceRange || (price >= priceRange.min && price <= priceRange.max);

                return matchesCategory && matchesPrice;
            })
    )

    if (allMerchItems.length === 0) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allMerchItems.map((item, index) => (
                <CardWrapper key={index}>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2 tracking-wide">
                        {item.artistName}
                    </h3>

                    <div className="flex items-start gap-3 sm:gap-6">
                        <img
                            loading="lazy"
                            src={item.image}
                            alt={item.name}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/assets/filicio2-small.webp";
                            }}
                            className="w-12 h-12 sm:w-14 sm:h-14 object-cover bg-gray-100 border border-gray-200 rounded-lg flex-shrink-0"
                        />

                        <div className="flex flex-col justify-between flex-grow min-w-0 relative">
                            <div >
                                <h3 className="text-xs text-gray-900 ">{item.name}</h3>
                                <p className="text-xs text-gray-600">{item.price}</p>
                            </div>
                        </div>

                        <div className="mt-auto absolute right-2 bottom-2">
                            <FiltersWrapper>
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block text-sm font-medium text-monza underline hover:text-monzadark transition"
                                >
                                    Buy
                                </a>
                            </FiltersWrapper>
                        </div>
                    </div>
                </CardWrapper>
            ))}
        </div>
    );
};

export default ArtistMerch;
