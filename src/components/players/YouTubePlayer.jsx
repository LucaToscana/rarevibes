export default function YouTubePlayer({ videoId }) {
  if (!videoId) return null;

  return (
    <div className="youtube-wrapper">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        
      ></iframe>
    </div>
  );
}
