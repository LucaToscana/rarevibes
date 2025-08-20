import FiltersWrapper from "./FiltersWrapper";

// components/filters/MerchCategoryFilter.jsx
export default function MerchCategoryFilter({
  categories,
  selectedCategories,
  onChange,
}) {
  const handleToggle = (key) => {
    const isSelected = selectedCategories.includes(key);
    const newSelection = isSelected
      ? selectedCategories.filter((c) => c !== key)
      : [...selectedCategories, key];
    onChange(newSelection);
  };

  return (
    <div>
      {<h2 className="text-xs text-monza mb-6">Categoria Articolo</h2>}
      <div className="flex gap-2 flex-wrap mb-8 ">
        {categories.map((cat) => (
          <FiltersWrapper>
            <button
              key={cat.key}
              className={`text-xs px-3 py-1 transition min-w-12 ${selectedCategories.includes(cat.key)
                ? " bio-highlight-small line-through  decoration-2 p-1"
                : " px-4 py-2  bio-highlight-white-small  "
                }`}
                
              onClick={() => handleToggle(cat.key)}
            >
              {cat.label}
            </button>
          </FiltersWrapper>
        ))}
      </div>
    </div>
  );
}