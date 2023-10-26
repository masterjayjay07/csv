import { render, screen } from '@testing-library/react';
import Header from './index';

test('show the header text', () => {
  render(<Header />);

  const headerElement = screen.getByText('CSV Reader');
  expect(headerElement).toBeInTheDocument();
});
