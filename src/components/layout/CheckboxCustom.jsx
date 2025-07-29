import React from "react";
import FiltersWrapper from "./FiltersWrapper";

export function CheckboxCustom({ item, isSelected, onToggle }) {
  return (
    <FiltersWrapper>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(item)}
          className="peer hidden"
        />
        <div
          className={`w-5 h-5 rounded border flex items-center justify-center transition
            ${isSelected ? 'bg-monza border-black' : 'bg-white border-black'}
          `}
        >
          {isSelected && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        {item.label}
      </label>
    </FiltersWrapper>
  );
}
