import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NumberInput } from '../NumberInput';

describe('NumberInput', () => {
  it('should render a number input with no value', () => {
    const { getByRole } = render(<NumberInput />);

    const input = getByRole('spinbutton');
    expect(input).toHaveValue(null);
  });

  it('should render a number input with value and unit', () => {
    const { getByRole, getByText } = render(<NumberInput value={12.34} unit='€' />);

    const input = getByRole('spinbutton');
    expect(input).toHaveValue(12.34);
    expect(getByText('€')).toBeInTheDocument();
  });

  it('should handle change event', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();

    const { getByRole } = render(<NumberInput onChange={mockOnChange} />);

    const input = getByRole('spinbutton');

    await user.type(input, '12.34');
    expect(mockOnChange).toHaveBeenCalledWith(12.34);
  });

  it('should render a number input as read only', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();

    const { getByRole } = render(<NumberInput onChange={mockOnChange} readOnly />);

    const input = getByRole('spinbutton');
    expect(input).toHaveAttribute('readonly');

    await user.type(input, '12.34');
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
