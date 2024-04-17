import { render } from '@testing-library/react';
import HomePage from '../page';

describe('HomePage', () => {
  it('should render the links to the exercises', () => {
    const { getByRole } = render(<HomePage />);

    expect(getByRole('link', { name: 'Exercise 1' })).toHaveAttribute('href', '/exercise1');
    expect(getByRole('link', { name: 'Exercise 2' })).toHaveAttribute('href', '/exercise2');
  });
});
