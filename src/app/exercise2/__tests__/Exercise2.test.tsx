import { render } from '@testing-library/react';
import Exercise2 from '../page';

const values = [10, 20, 30, 40, 50];
const min = values.at(0);
const max = values.at(-1);

const mockFetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(values),
  } as Response),
);
global.fetch = mockFetch;

describe('Exercise1', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should render a range component', async () => {
    const { getByRole, getByLabelText, getByTestId, getAllByRole, findByLabelText } = render(<Exercise2 />);

    const minimumInput = await findByLabelText('Minimum input');
    expect(minimumInput).toHaveValue(min);
    expect(minimumInput).toHaveAttribute('min', String(min));
    expect(minimumInput).toHaveAttribute('max', String(max));

    const maximumInput = getByLabelText('Maximum input');
    expect(maximumInput).toHaveValue(max);
    expect(maximumInput).toHaveAttribute('min', String(min));
    expect(maximumInput).toHaveAttribute('max', String(max));

    // Range sliders
    expect(getByTestId('range-slider')).toBeInTheDocument();
    expect(getByTestId('selected-range-slider')).toHaveStyle({ left: '0%', width: '100%' });

    // Range bullets
    expect(getByRole('slider', { name: 'Minimum slider' })).toBeInTheDocument();
    expect(getByRole('slider', { name: 'Maximum slider' })).toBeInTheDocument();

    // Range step marks
    expect(getAllByRole('separator')).toHaveLength(values.length);
  });

  it('should render loading and error messages', async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.reject({
        ok: false,
        json: () => Promise.reject({ message: 'Network response was not ok' }),
      } as Response),
    );

    const { getByText, findByText } = render(<Exercise2 />);

    expect(getByText('Loading...')).toBeInTheDocument();
    expect(await findByText('An error has occurred')).toBeInTheDocument();
  });
});
