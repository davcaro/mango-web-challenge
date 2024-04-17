import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Link } from '../Link';

describe('Link', () => {
  it('should render a link', () => {
    const { getByRole } = render(<Link href='/test'>Test</Link>);

    const link = getByRole('link');
    expect(link).toHaveAttribute('href', '/test');
    expect(link).toHaveTextContent('Test');
  });
});
