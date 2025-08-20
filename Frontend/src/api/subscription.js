import api from './client';

// PUBLIC_INTERFACE
export async function getPlans() {
  /** Retrieve available subscription plans for onboarding. */
  const { data } = await api.get('/subscriptions/plans');
  return data;
}

// PUBLIC_INTERFACE
export async function createCheckoutSession(planId) {
  /** Create a checkout session for the selected plan, returns redirect URL or client secret. */
  const { data } = await api.post('/subscriptions/checkout', { plan_id: planId });
  return data;
}

// PUBLIC_INTERFACE
export async function getSubscriptionStatus() {
  /** Get the current subscription status for the authenticated user. */
  const { data } = await api.get('/subscriptions/status');
  return data;
}

// PUBLIC_INTERFACE
export async function handlePaymentResult(params) {
  /** Notify server about payment success/cancel with gateway params. */
  const { data } = await api.post('/subscriptions/result', params);
  return data;
}
