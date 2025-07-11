export function getClasses({ isActive, type, extraClass = '' }) {
  const base = 'font-arvo transition duration-200';
  if (type === 'button') {
    const baseButton = 'text-sm sm:text-base px-4 py-2 rounded-full';
    const active = 'bg-monza text-iron hover:bg-monzadark line-through  decoration-2';
    const inactive = 'bg-monza text-iron hover:bg-monza hover:bg-monzadark';
    return `${base} ${baseButton} ${isActive ? active : inactive} ${extraClass}`;
  }
  if (type === 'link') {
    const baseLink = 'text-lg';
    const hoverClass = extraClass.includes('btn-monza') ? 'text-sm sm:text-base px-4 py-2 rounded-full' : '';
    const activeClass = isActive ? 'line-through  decoration-2' : '';
    return `${base} ${baseLink} ${hoverClass} ${extraClass} ${activeClass}`;
  }
  return base;
}
