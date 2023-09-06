import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('renders app title', () => {
  render(<App />);
  const linkElement = screen.getByText(/favorites/i);
  fireEvent.click(linkElement);
  const headingElement = screen.getByText(/favorites/i);
  expect(headingElement).toBeInTheDocument();
});
