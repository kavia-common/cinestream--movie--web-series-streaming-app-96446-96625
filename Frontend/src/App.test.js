import { render, screen } from '@testing-library/react';
import App from './App';

test('renders landing hero for unauthenticated users', () => {
  render(<App />);
  const heroTitle = screen.getByText(/Unlimited movies, shows & originals/i);
  expect(heroTitle).toBeInTheDocument();
});
