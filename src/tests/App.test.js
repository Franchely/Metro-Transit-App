import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders app', () => {
  render(<App />);
  const title = screen.getByText("NexTrip");
  expect(title).toBeInTheDocument();
});
