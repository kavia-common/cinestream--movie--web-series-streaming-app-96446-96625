import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Home() {
  /** Landing page with a cinematic movie collage background and central Register/Login CTA. */
  const posters = [
    // Demo images from Unsplash (royalty-free demo). Replace with real poster URLs when available.
    'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1200&q=60',
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=60',
    'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1200&q=60',
    'https://images.unsplash.com/photo-1497015289639-54688650d173?auto=format&fit=crop&w=1200&q=60',
    'https://images.unsplash.com/photo-1505682634904-d7c1de15fdf2?auto=format&fit=crop&w=1200&q=60',
    'https://images.unsplash.com/photo-1515165562835-c3b8c8f63c8a?auto=format&fit=crop&w=1200&q=60',
    'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963f?auto=format&fit=crop&w=1200&q=60',
    'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1200&q=60',
    'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=1200&q=60',
    'https://images.unsplash.com/photo-1516637090014-cb1ab0d08fc7?auto=format&fit=crop&w=1200&q=60',
    'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=1200&q=60',
    'https://images.unsplash.com/photo-1512427900058-69b95f0b33c7?auto=format&fit=crop&w=1200&q=60',
    'https://images.unsplash.com/photo-1522120692533-60a0d8a3b561?auto=format&fit=crop&w=1200&q=60',
    'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1200&q=60',
    'https://images.unsplash.com/photo-1498747946579-bde604cb8f44?auto=format&fit=crop&w=1200&q=60',
    'https://images.unsplash.com/photo-1495231916356-a86217efff12?auto=format&fit=crop&w=1200&q=60',
    'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1200&q=60',
    'https://images.unsplash.com/photo-1517638851339-a711cfcf327c?auto=format&fit=crop&w=1200&q=60',
    'https://images.unsplash.com/photo-1505682634904-d7c1de15fdf2?auto=format&fit=crop&w=1200&q=60',
    'https://images.unsplash.com/photo-1515165562835-c3b8c8f63c8a?auto=format&fit=crop&w=1200&q=60',
    'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1200&q=60',
    'https://images.unsplash.com/photo-1516637090014-cb1ab0d08fc7?auto=format&fit=crop&w=1200&q=60',
    'https://images.unsplash.com/photo-1497015289639-54688650d173?auto=format&fit=crop&w=1200&q=60',
    'https://images.unsplash.com/photo-1512427900058-69b95f0b33c7?auto=format&fit=crop&w=1200&q=60',
  ];

  return (
    <section className="landing-hero" aria-label="Welcome to CineStream">
      {/* Full-bleed collage background */}
      <div className="collage-grid" aria-hidden="true">
        {posters.concat(posters.slice(0, 12)).map((src, idx) => (
          <div className="tile" key={`${src}-${idx}`}>
            <img src={src} alt="" loading="lazy" />
          </div>
        ))}
      </div>

      {/* Center CTA card */}
      <div className="cta-card" role="dialog" aria-labelledby="cta-title" aria-describedby="cta-desc">
        <div className="brand-large">CineStream</div>
        <h1 id="cta-title" className="cta-title">Unlimited movies, shows & originals</h1>
        <p id="cta-desc" className="cta-subtitle">
          Stream anywhere. Cancel anytime. Ready to watch? Create your account or sign in.
        </p>
        <div className="cta-actions">
          <Link className="btn primary btn-lg" to="/register" aria-label="Register for CineStream">
            Register
          </Link>
          <Link className="btn btn-lg" to="/login" aria-label="Login to CineStream">
            Login
          </Link>
        </div>
        <div className="helper" style={{ textAlign: 'center' }}>
          No credit card required for the Free plan.
        </div>
      </div>
    </section>
  );
}
