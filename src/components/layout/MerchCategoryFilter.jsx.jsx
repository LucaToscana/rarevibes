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
    <div className="flex gap-2 flex-wrap mb-8">
      {categories.map((cat) => (
        <button
          key={cat.key}
          className={`text-sm px-3 py-1 rounded-full border transition ${
            selectedCategories.includes(cat.key)
              ? "bg-monza text-white border-monza"
              : "bg-white text-gray-700 border-gray-300"
          }`}
          onClick={() => handleToggle(cat.key)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
