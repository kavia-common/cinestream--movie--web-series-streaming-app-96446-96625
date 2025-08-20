import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { handlePaymentResult } from '../../api/subscription';

export default function PaymentResult() {
  const [params] = useSearchParams();
  const [status, setStatus] = useState(params.get('status') || 'pending');

  useEffect(() => {
    const all = Object.fromEntries(params.entries());
    handlePaymentResult(all)
      .then((res) => setStatus(res?.status || status))
      .catch(() => setStatus('failed'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Payment {status === 'success' ? 'Successful' : status === 'failed' ? 'Failed' : 'Pending'}</h1>
      {status === 'success' ? (
        <p className="helper">Your subscription is now active.</p>
      ) : status === 'failed' ? (
        <p className="helper">There was an issue processing your payment.</p>
      ) : (
        <p className="helper">Confirming payment status...</p>
      )}
      <div style={{ display: 'flex', gap: 8 }}>
        <Link to="/" className="btn">Go Home</Link>
        <Link to="/plans" className="btn primary">Manage Plan</Link>
      </div>
    </div>
  );
}
