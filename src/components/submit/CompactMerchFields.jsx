import React, { useState, useEffect } from "react";
import FiltersWrapper from '../layout/FiltersWrapper'
import { useTranslation } from "react-i18next";


export default function CompactMerchFields({ fields, form, onChange }) {
  // Tutti i numeri prodotti trovati in fields (es: ["1", "2", "3"])
    const { t } = useTranslation("common");
  
  const allProductNums = Array.from(
    new Set(
      fields
        .map((f) => {
          const match = f.id.match(/-(\d+)$/);
          return match ? match[1] : null;
        })
        .filter(Boolean)
    )
  ).sort();

  // Stato per gestire quali prodotti sono visibili
  const [visibleProducts, setVisibleProducts] = useState(allProductNums.slice(0, 1)); // Mostra almeno il primo prodotto

  // Raggruppa i campi per numero prodotto
  const groupedByProduct = fields.reduce((acc, field) => {
    const match = field.id.match(/-(\d+)$/);
    const productNum = match ? match[1] : "0";
    if (!acc[productNum]) acc[productNum] = [];
    acc[productNum].push(field);
    return acc;
  }, {});

  // Gestione input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ target: { name, value } });
  };

  // Aggiungi prodotto (il prossimo non ancora visibile)
  const handleAddProduct = () => {
    for (const num of allProductNums) {
      if (!visibleProducts.includes(num)) {
        setVisibleProducts((prev) => [...prev, num]);
        break;
      }
    }
  };

  // Rimuovi prodotto (l'ultimo visibile)
  const handleRemoveProduct = () => {
    if (visibleProducts.length > 1) {
      setVisibleProducts((prev) => prev.slice(0, prev.length - 1));
    }
  };

  return (
    <div className="space-y-6">
      {visibleProducts.map((productNum) => (
        <div
          key={productNum}
          className="border p-4 rounded-md bg-white shadow-sm"
        >
          <h3 className="font-semibold mb-3"> {t("product")} {productNum}</h3>
          <div className="grid grid-cols-2 gap-4">
            {groupedByProduct[productNum]?.map(({ id, label, type }) => {
              const value = form[id] || "";
              return (
                <div key={id} className="flex flex-col">
                  <label htmlFor={id} className="mb-1 font-medium">
                    {t(label)}
                  </label>
                  <input
                    type={type === "url" ? "url" : "text"}
                    id={id}
                    name={id}
                    value={value}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}


      <div className="flex gap-4 mt-2">
        <FiltersWrapper>
          <button
            type="button"
            onClick={handleAddProduct}
            disabled={visibleProducts.length >= 3}
            className={`px-4 py-2 rounded ${visibleProducts.length >= 3
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-monza text-white hover:bg-monzadark"
              }`}
          >
            +
          </button>
        </FiltersWrapper>

        <FiltersWrapper>

          <button
            type="button"
            onClick={handleRemoveProduct}
            disabled={visibleProducts.length <= 1}
            className={`px-4 py-2 rounded ${visibleProducts.length <= 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700"
              }`}
          >
           -
          </button>
        </FiltersWrapper>

      </div>
    </div>
  );
}
