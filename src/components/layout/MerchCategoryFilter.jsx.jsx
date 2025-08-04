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
    <div className="flex gap-2 flex-wrap mb-8 ">
      {categories.map((cat) => (
        <FiltersWrapper>
        <button
          key={cat.key}
          className={`text-xs px-3 py-1 transition min-w-12 ${
            selectedCategories.includes(cat.key)
              ? "text-xs bio-highlight-white-small line-through  decoration-2 p-1"
              : "text-xs px-4 py-2 "
          }`}
          onClick={() => handleToggle(cat.key)}
        >
          {cat.label}
        </button>
        </FiltersWrapper>
      ))}
    </div>
  );
}/*************    const baseButton = "text-xs px-4 py-2 ";
    const active =
      "text-xs bio-highlight-white-small line-through  decoration-2 p-1"; */