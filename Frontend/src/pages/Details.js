import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import RatingStars from '../components/RatingStars';
import { addToWatchlist, getContentDetails, removeFromWatchlist, submitRatingReview } from '../api/content';
import { useAuth } from '../context/AuthContext';

export default function Details() {
  const { id } = useParams();
  const { token } = useAuth();
  const [details, setDetails] = useState(null);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [myRating, setMyRating] = useState(0);
  const [review, setReview] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getContentDetails(id)
      .then((d) => {
        setDetails(d || null);
        setInWatchlist(Boolean(d?.in_watchlist));
        setMyRating(d?.my_review?.rating || 0);
        setReview(d?.my_review?.text || '');
      })
      .catch(() => setDetails(null));
  }, [id]);

  const toggleWatchlist = async () => {
    try {
      if (!inWatchlist) {
        await addToWatchlist(id);
        setInWatchlist(true);
      } else {
        await removeFromWatchlist(id);
        setInWatchlist(false);
      }
    } catch {
      // ignore
    }
  };

  const submit = async () => {
    setSaving(true);
    try {
      await submitRatingReview(id, { rating: myRating, text: review });
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  if (!details) return <div className="helper">Loading...</div>;

  return (
    <div>
      <h1>{details.title}</h1>
      <p className="helper">{details.genre} • {details.year} • {details.language}</p>
      <VideoPlayer src={details.stream_url} poster={details.thumbnail} controls autoPlay={false} />
      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        {token && (
          <button className={`btn ${inWatchlist ? 'danger' : 'success'}`} onClick={toggleWatchlist}>
            {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </button>
        )}
      </div>

      <section className="section">
        <h2>About</h2>
        <p className="helper">{details.description}</p>
      </section>

      <section className="section">
        <h2>Ratings & Reviews</h2>
        <div style={{ display: 'grid', gap: 8 }}>
          <div>
            <strong>Average:</strong> {details.avg_rating?.toFixed?.(1) || '—'} / 5
          </div>
          {token && (
            <div className="form" style={{ maxWidth: 600 }}>
              <label>Your rating</label>
              <RatingStars value={myRating} onChange={setMyRating} />
              <label htmlFor="review">Your review</label>
              <textarea
                id="review"
                className="input"
                rows={4}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share your thoughts..."
              />
              <button className="btn primary" disabled={saving} onClick={submit}>
                {saving ? 'Saving...' : 'Submit'}
              </button>
            </div>
          )}
          <div>
            {(details.reviews || []).map((r, idx) => (
              <div key={idx} className="card" style={{ padding: 10, marginBottom: 8 }}>
                <div><strong>{r.user?.name || 'User'}</strong> • {r.rating}★</div>
                <div className="helper">{r.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
