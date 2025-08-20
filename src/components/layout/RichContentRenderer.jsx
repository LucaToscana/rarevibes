import React from 'react';

export default function RichContentRenderer({ text, youtube }) {
  const getYoutubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^?&]+)/);
    return match ? match[1] : null;
  };
  const youtubeId = youtube ? getYoutubeId(youtube) : null;
  const playerId = youtubeId
    ? `youtube-player-${youtubeId}`
    : `youtube-player-${Math.random().toString(36).substring(2, 9)}`;

  const parseInline = (str) => {
    const elements = [];
    let lastIndex = 0;
    const regex = /(\*\*(.*?)\*\*|_(.*?)_|(\[([^\]]+)\]\(([^)]+)\))|["“](.+?)["”])/g;
    let match;
    while ((match = regex.exec(str)) !== null) {
      if (match.index > lastIndex) elements.push(str.slice(lastIndex, match.index));

      if (match[2]) elements.push(<strong key={lastIndex}>{match[2]}</strong>);
      else if (match[3]) elements.push(<em key={lastIndex}>{match[3]}</em>);
      else if (match[5] && match[6])
        elements.push(
          <a key={lastIndex} href={match[6]} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            {match[5]}
          </a>
        );
      else if (match[7]) elements.push(<em key={lastIndex}>"{match[7]}"</em>);

      lastIndex = regex.lastIndex;
    }
    if (lastIndex < str.length) elements.push(str.slice(lastIndex));
    return elements;
  };

  const renderWithImages = (block, index) => {
    const imgRegex = /!\[(.*?)\]\((.*?)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    while ((match = imgRegex.exec(block)) !== null) {
      if (match.index > lastIndex) parts.push(block.slice(lastIndex, match.index));
      parts.push(
        <figure key={`${index}-${lastIndex}`} className="my-6 text-center">
          <img src={match[2]} alt={match[1]} className="mx-auto rounded shadow-lg max-w-full" />
          {match[1] && <figcaption className="mt-2 text-sm text-gray-500">{match[1]}</figcaption>}
        </figure>
      );
      lastIndex = imgRegex.lastIndex;
    }
    if (lastIndex < block.length) parts.push(block.slice(lastIndex));
    return parts.map((p, i) => (typeof p === 'string' ? parseInline(p) : p));
  };

  const blocks = text.split(/\n\n+/);

  const renderBlock = (block, index) => {
    block = block.trim();
    if (!block) return null;

    const lines = block.split('\n');
    const headingMatch = lines[0].match(/^(#{2,3})\s+(.*)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const HeadingTag = `h${level + 1}`;
      return (
        <div key={index}>
          <HeadingTag className="mt-6 mb-3 font-bold text-2xl">{renderWithImages(headingMatch[2], index)}</HeadingTag>
          {lines.slice(1).map((line, i) => (
            <p key={i} className="my-2">{renderWithImages(line, index + i)}</p>
          ))}
        </div>
      );
    }

    if (block.startsWith('"') && block.endsWith('"')) {
      return (
        <blockquote key={index} className="my-4 pl-4 border-l-4 border-gray-300 italic text-gray-700">
          {renderWithImages(block.replace(/^"|"$/g, ''), index)}
        </blockquote>
      );
    }

    if (lines.every((l) => /^\d+[.)]\s/.test(l.trim()))) {
      return (
        <ol key={index} className="list-decimal list-inside my-3">
          {lines.map((l, i) => (
            <li key={i}>{renderWithImages(l.replace(/^\d+[.)]\s*/, ''), index + i)}</li>
          ))}
        </ol>
      );
    }

    if (lines.every((l) => /^\*\s+/.test(l.trim()))) {
      return (
        <ul key={index} className="list-disc list-inside my-3">
          {lines.map((l, i) => (
            <li key={i}>{renderWithImages(l.replace(/^\*\s+/, ''), index + i)}</li>
          ))}
        </ul>
      );
    }

    return (
      <p
        key={index}
        className="my-3"
        style={{
          whiteSpace: 'pre-line',
          fontFamily: 'Heming',
          fontWeight: 300,
          lineHeight: '1.6',
          fontSize: '1.125rem',
        }}
      >
        {renderWithImages(block, index)}
      </p>
    );
  };

  return (
    <div>
      {blocks.map(renderBlock)}

      {youtubeId && (
        <div className="mt-8 aspect-video w-full max-w-5xl mx-auto">
          <iframe
            id={playerId}
            className="w-full h-full rounded shadow-lg"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}
