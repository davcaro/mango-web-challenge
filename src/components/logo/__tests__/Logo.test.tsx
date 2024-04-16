import { render } from '@testing-library/react';
import { Logo } from '../Logo';

describe('Logo', () => {
  it('should render an image with the logo', () => {
    const { getByRole } = render(<Logo />);

    const img = getByRole('img');
    expect(img).toHaveAttribute('src', '/mango.svg');
    expect(img).toHaveAttribute('alt', 'Mango Logo');
  });
});
