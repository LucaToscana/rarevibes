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
        return <span       style={{ whiteSpace: 'pre-line',fontFamily: 'Heming', fontWeight: 300 , lineHeight: '1.6', fontSize: '1.125rem' }} key={i}>{part}</span>;
      })}
    </>
  );
}
