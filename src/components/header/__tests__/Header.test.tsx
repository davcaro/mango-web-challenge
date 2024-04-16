import { render } from '@testing-library/react';
import { Header } from '../Header';

describe('Header', () => {
  it('should render a link to home page with the logo', () => {
    const { getByRole } = render(<Header />);

    const link = getByRole('link');
    expect(link).toHaveAttribute('href', '/');
    expect(link).toHaveAttribute('title', 'Home');

    expect(getByRole('img')).toBeInTheDocument();
  });
});
