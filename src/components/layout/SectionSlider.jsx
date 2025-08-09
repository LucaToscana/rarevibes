import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function SectionSlider({ title, items, linkBase }) {
  const scrollRef = useRef();

useEffect(() => {
  const interval = setInterval(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 1; // velocità minore
      if (
        scrollRef.current.scrollLeft >=
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth
      ) {
        scrollRef.current.scrollLeft = 0;
      }
    }
  }, 30); // intervallo più lento
  return () => clearInterval(interval);
}, []);

  return (
    <div className="w-full space-y-4 no-scrollbar">
      <div className="bg-black/50 p-2 rounded-md">
        <h2 className="text-3xl font-bold text-white drop-shadow-text">
          {title}
        </h2>
      </div>      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 py-4 px-2 no-scrollbar"
      >
        {items.map((item) => (
          <Link
            to={`${linkBase}/${item.slug}`}
            key={item.slug}
            className="min-w-[250px] max-w-[250px] bg-white dark:bg-zinc-800 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 duration-300"
          >
            <img src={item.image} alt={item.title} className="rounded-t-xl w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-black dark:text-white">{item.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{item.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
