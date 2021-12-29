import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  it('renders the header correctly', () => {
    render(<Header />);
    const cleoLogo = screen.getByRole('img');
    expect(cleoLogo).toBeInTheDocument();
  });
});
