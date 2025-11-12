import { render, screen } from '@testing-library/react';
import App from '../App';

test('renderiza texto principal', () => {
  render(<App />);
  const heading = screen.getByText(/Hello, CWBT App!/i);
  expect(heading).toBeInTheDocument();
});