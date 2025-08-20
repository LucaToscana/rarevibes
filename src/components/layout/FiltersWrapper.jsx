
export default function FiltersWrapper({ children }) {
  return (
    <div className="relative w-fit   p-1 bg-white border-[2px] border-black shadow-[4px_4px_0px_#000] rotate-[-2deg] transition-all duration-300 ease-in-out hover:rotate-0 hover:scale-105 hover:shadow-[6px_6px_0px_#000]  overflow-hidden">
      {children}
    </div>
  );
}
