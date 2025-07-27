import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import CardWrapper from "./CardWrapper"

export default function SearchWithCaptcha({
  searchTerm,
  onSearchChange,
  showCaptcha,
  onCaptchaSubmit,
  onCaptchaInputChange,
  captchaInput,
  placeholder,
  captchaQuestion = "3 + 4?",
}) {
  return (
    <CardWrapper>
      <div className="relative flex-[3] w-96">
        <FaSearch className="absolute top-3 left-3 text-gray-500" />

        {!showCaptcha ? (
          <input
            type="text"
            placeholder={placeholder || "Search..."}
            value={searchTerm}
            onChange={onSearchChange}
            className={`pl-10 font-arvo pr-4 py-2 w-full  rounded-md text-black h-10 focus:outline-none ${searchTerm ? "text-base" : "text-xs"
              }`}
          />

        ) : (
          <form
            onSubmit={onCaptchaSubmit}
            className="pl-10 pr-4 font-arvo w-full border border-red-500 rounded-md text-black flex items-center gap-2"
          >
            <label className="text-red-600 font-semibold whitespace-nowrap">
              Are you human? {captchaQuestion}
            </label>
            <input
              type="number"
              value={captchaInput}
              onChange={onCaptchaInputChange}
              className="w-16 p-1 border border-gray-400 rounded"
              required
            />
            <button
              type="submit"
              className="bg-monza text-white px-3 py-1 rounded"
            >
              Verify
            </button>
          </form>
        )}
      </div>
    </CardWrapper>
  )
}
