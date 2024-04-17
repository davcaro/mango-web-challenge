import { render } from '@testing-library/react';
import { Error } from '../Error';

describe('Error', () => {
  it('should render a loading message', () => {
    const { getByText } = render(<Error />);

    expect(getByText('An error has occurred')).toBeInTheDocument();
  });
});
