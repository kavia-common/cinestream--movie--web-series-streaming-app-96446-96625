import { render, screen } from '@testing-library/react';
import App from './App';

test('renders brand in navbar', () => {
  render(<App />);
  const brand = screen.getByText(/CineStream/i);
  expect(brand).toBeInTheDocument();
});
