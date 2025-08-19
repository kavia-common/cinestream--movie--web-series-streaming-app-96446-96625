import React from 'react';

// PUBLIC_INTERFACE
export default function RatingStars({ value = 0, outOf = 5, onChange }) {
  /** Interactive star rating component. */
  const stars = Array.from({ length: outOf }, (_, i) => i + 1);
  return (
    <div role="radiogroup" aria-label="Rating">
      {stars.map((s) => (
        <button
          key={s}
          role="radio"
          aria-checked={s <= value}
          onClick={() => onChange && onChange(s)}
          className="btn"
          style={{ marginRight: 6, padding: '6px 8px' }}
          title={`${s} star${s > 1 ? 's' : ''}`}
        >
          {s <= value ? '★' : '☆'}
        </button>
      ))}
    </div>
  );
}
