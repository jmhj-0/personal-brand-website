import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app without crashing', () => {
  render(<App />);
  expect(screen.getByText(/Developer/i)).toBeInTheDocument();
});