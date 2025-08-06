export default function ItalicQuotes({ text }) {
  // Divide il testo in segmenti, mantenendo le virgolette
  const parts = text.split(/(".*?")/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('"') && part.endsWith('"')) {
          // Qui manteniamo le virgolette, tutto in italic
          return <em key={i}>{part}</em>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
