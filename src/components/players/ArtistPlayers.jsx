import React, { useState, useEffect } from 'react';
import SoundCloudPlayer from './SoundCloudPlayer';
import SpotifyPlayer from './SpotifyPlayer';
import YouTubePlayer from './YouTubePlayer';


export default function ArtistPlayers({ artist }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulo loader per 1.5 secondi
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 border-4 border-t-transparent border-monza rounded-full animate-spin mb-4" />
            <p className="heading-monoton ">Loading...</p>
        </div>
    }

    return (
        <div className="space-y-6 mt-6">
            {artist.youtube && (
                <PlayerWrapper label="YouTube">
                    <YouTubePlayer videoId={artist.youtube.replace('watch?v=', '')} />
                </PlayerWrapper>
            )}
            {artist.soundcloud && (
                <PlayerWrapper label="SoundCloud">
                    <SoundCloudPlayer url={artist.soundcloud} height={166} />
                </PlayerWrapper>
            )}
            {artist.spotify && (
                <PlayerWrapper label="Spotify">
                    <SpotifyPlayer url={artist.spotify} />
                </PlayerWrapper>
            )}
        </div>
    );
}
function PlayerWrapper({ label, children }) {
    return (
        <div className="relative p-[2px] rounded-xl bg-gradient-to-r from-monza via-monza/10 to-iron">
            <div className="rounded-xl bg-iron/10 backdrop-blur-md p-4">
                <div className="text-sm font-monoton uppercase tracking-wider mb-2 text-white/90 drop-shadow-sm">
                    {label}
                </div>
                <div className="overflow-hidden rounded-md">
                    {children}
                </div>
            </div>
        </div>
    );
}
