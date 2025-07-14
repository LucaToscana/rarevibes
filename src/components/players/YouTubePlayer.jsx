import { useSelector } from 'react-redux'

export default function YouTubePlayer({ videoId }) {
  const autoplay = useSelector(state => state.player.autoPlay)  // prendi autoplay dallo store

  if (!videoId) return null;

  const autoplayParam = autoplay ? 1 : 0;

  return (
    <div className="youtube-wrapper">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoplayParam}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
