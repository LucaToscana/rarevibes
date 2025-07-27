import React from "react";

export default function CardStaticWrapper({ children }) {
  return (
    <div className="relative   p-1 bg-white border-[2px] border-black shadow-[8px_8px_0px_#000] rotate-[-2deg] transition-all duration-300 ease-in-out hover:rotate-0 hover:scale-105 hover:shadow-[12px_12px_0px_#000]  overflow-hidden">
      {children}
    </div>
  );
}
