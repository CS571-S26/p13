import { render, screen } from '@testing-library/react';
import App from './App';

test('renders rolling loud heading', () => {
  render(<App />);
  const heading = screen.getByText(/rolling loud/i);
  expect(heading).toBeInTheDocument();
});