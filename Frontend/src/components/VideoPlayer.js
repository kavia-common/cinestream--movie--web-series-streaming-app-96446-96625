import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

// PUBLIC_INTERFACE
export default function VideoPlayer({ src, poster, autoPlay = false, controls = true }) {
  /** Adaptive HLS player with fallback for MP4 sources. */
  const videoRef = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    let hls;
    const isHls = src.endsWith('.m3u8') || src.includes('.m3u8');

    if (isHls && Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          setError('Playback error. Please try a different quality or device.');
        }
      });
    } else if (isHls && video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    } else {
      video.src = src;
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  if (!src) return <div className="helper">No source available.</div>;

  return (
    <div className="video-wrapper">
      <video
        ref={videoRef}
        poster={poster}
        controls={controls}
        autoPlay={autoPlay}
        style={{ width: '100%', borderRadius: 12, border: '1px solid var(--border-color)' }}
      />
      {error && <div className="helper" style={{ color: 'var(--danger)', marginTop: 4 }}>{error}</div>}
    </div>
  );
}
