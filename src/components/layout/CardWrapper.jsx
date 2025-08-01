import React from "react";

export default function CardWrapper({ children }) {
  return (
    <div className=" relative  p-3 bg-white border-[3px] border-black shadow-[6px_6px_0px_#000] rotate-[-2deg] transition-all duration-300 ease-in-out hover:rotate-0 hover:scale-105 hover:shadow-[10px_10px_0px_#000] active:animate-shake overflow-hidden">
      {children}
    </div>
  );
}
