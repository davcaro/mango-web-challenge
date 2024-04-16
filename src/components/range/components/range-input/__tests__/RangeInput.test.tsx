import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RangeInput } from '../RangeInput';

const min = 0;
const max = 100;
const value = 50;
const steps = [0, 20, 40, 60, 80, 100];

describe('RangeInput', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('should render a number input', () => {
    const { getByRole, getByText } = render(<RangeInput value={value} onChange={mockOnChange} />);

    expect(getByRole('spinbutton')).toHaveValue(value);
    expect(getByText('€')).toBeInTheDocument();
  });

  it('should change value on input', async () => {
    const user = userEvent.setup();

    const { getByRole } = render(<RangeInput min={min} max={max} value={value} onChange={mockOnChange} />);

    const input = getByRole('spinbutton');

    await user.clear(input);
    await user.type(input, '75');
    expect(mockOnChange).toHaveBeenCalledWith(75);
  });

  it('should round values to 2 decimals with no steps defined', async () => {
    const user = userEvent.setup();

    const { getByRole } = render(<RangeInput min={min} max={max} value={value} onChange={mockOnChange} />);

    const input = getByRole('spinbutton');

    await user.clear(input);
    await user.type(input, '75.1234');

    expect(input).toHaveValue(75.1234);
    expect(mockOnChange).toHaveBeenCalledWith(75.12);

    // When the input is blurred, the value should be reset to the value provided in component props
    fireEvent.blur(input);
    expect(input).toHaveValue(value);
  });

  it('should round values to the nearest step', async () => {
    const user = userEvent.setup();

    const { getByRole } = render(
      <RangeInput min={min} max={max} steps={steps} value={value} onChange={mockOnChange} />,
    );

    const input = getByRole('spinbutton');

    await user.clear(input);
    await user.type(input, '57');

    expect(mockOnChange).toHaveBeenCalledWith(60);
  });

  it('should not exceed min and max range', async () => {
    const user = userEvent.setup();

    const { getByRole } = render(<RangeInput min={min} max={max} value={value} onChange={mockOnChange} />);

    const input = getByRole('spinbutton');

    await user.clear(input);
    await user.type(input, '-20');
    expect(mockOnChange).toHaveBeenCalledWith(min);

    await user.clear(input);
    await user.type(input, '120');
    expect(mockOnChange).toHaveBeenCalledWith(max);
  });

  it('should render correctly with no min, max, steps or value defined', async () => {
    const user = userEvent.setup();

    const { getByRole } = render(<RangeInput onChange={mockOnChange} />);

    const input = getByRole('spinbutton');
    expect(input).toHaveValue(0);

    await user.clear(input);
    await user.type(input, '75');

    expect(mockOnChange).toHaveBeenCalledWith(0);
  });
});
