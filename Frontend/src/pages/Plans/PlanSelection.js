import React, { useEffect, useState } from 'react';
import { createCheckoutSession, getPlans } from '../../api/subscription';

export default function PlanSelection() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState('');

  useEffect(() => {
    getPlans()
      .then((d) => setPlans(d?.plans || []))
      .catch(() => setPlans([]))
      .finally(() => setLoading(false));
  }, []);

  const startCheckout = async (planId) => {
    setCheckingOut(planId);
    try {
      const res = await createCheckoutSession(planId);
      if (res?.redirect_url) {
        window.location.href = res.redirect_url;
      } else {
        // if using client secret flow, fallback to result page
        window.location.href = '/payment/result?status=success';
      }
    } catch {
      alert('Unable to start checkout. Please try again.');
    } finally {
      setCheckingOut('');
    }
  };

  return (
    <div>
      <h1>Choose your plan</h1>
      <p className="helper">Select a plan to continue. Subscription can be changed anytime.</p>
      {loading && <div className="helper">Loading plans...</div>}
      <div className="grid">
        {plans.map((p) => (
          <div className="card" key={p.id} style={{ padding: 16 }}>
            <h3 style={{ marginTop: 0 }}>{p.name}</h3>
            <div className="helper">{p.description}</div>
            <div style={{ fontSize: 24, margin: '8px 0' }}>
              {p.price === 0 ? 'Free' : `$${(p.price / 100).toFixed(2)}`} <span className="helper">/ {p.interval || 'month'}</span>
            </div>
            <ul className="helper">
              {(p.features || []).map((f, idx) => <li key={idx}>{f}</li>)}
            </ul>
            <button
              className={`btn ${p.price === 0 ? 'success' : 'primary'}`}
              disabled={!!checkingOut}
              onClick={() => startCheckout(p.id)}
            >
              {checkingOut === p.id ? 'Processing...' : (p.price === 0 ? 'Activate' : 'Subscribe')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
