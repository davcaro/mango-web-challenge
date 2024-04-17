import { render } from '@testing-library/react';
import { Loader } from '../Loader';

describe('Loader', () => {
  it('should render a loading message', () => {
    const { getByText } = render(<Loader />);

    expect(getByText('Loading...')).toBeInTheDocument();
  });
});
