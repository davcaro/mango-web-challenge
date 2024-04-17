import { render } from '@testing-library/react';
import Exercise1 from '../page';

const min = 0;
const max = 100;
const values = { min, max };

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
    const { getByRole, getByLabelText, getByTestId, findByLabelText } = render(<Exercise1 />);

    const minimumInput = await findByLabelText('Minimum input');
    expect(minimumInput).toHaveValue(values.min);
    expect(minimumInput).toHaveAttribute('min', String(min));
    expect(minimumInput).toHaveAttribute('max', String(values.max));

    const maximumInput = getByLabelText('Maximum input');
    expect(maximumInput).toHaveValue(values.max);
    expect(maximumInput).toHaveAttribute('min', String(values.min));
    expect(maximumInput).toHaveAttribute('max', String(max));

    // Range sliders
    expect(getByTestId('range-slider')).toBeInTheDocument();
    expect(getByTestId('selected-range-slider')).toHaveStyle({ left: '0%', width: '100%' });

    // Range bullets
    const minimumBullet = getByRole('slider', { name: 'Minimum slider' });
    expect(minimumBullet).toHaveAttribute('aria-valuenow', String(values.min));
    expect(minimumBullet).toHaveAttribute('aria-valuemin', String(min));
    expect(minimumBullet).toHaveAttribute('aria-valuemax', String(max));

    const maximumBullet = getByRole('slider', { name: 'Maximum slider' });
    expect(maximumBullet).toHaveAttribute('aria-valuenow', String(values.max));
    expect(maximumBullet).toHaveAttribute('aria-valuemin', String(min));
    expect(maximumBullet).toHaveAttribute('aria-valuemax', String(max));
  });

  it('should render loading and error messages', async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Network response was not ok' }),
      } as Response),
    );

    const { getByText, findByText } = render(<Exercise1 />);

    expect(getByText('Loading...')).toBeInTheDocument();
    expect(await findByText('An error has occurred')).toBeInTheDocument();
  });
});
