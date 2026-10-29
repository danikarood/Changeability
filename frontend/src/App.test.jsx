import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the sign-up form title', () => {
  render(<App />);
  expect(screen.getByText(/create your account/i)).toBeInTheDocument();
});
