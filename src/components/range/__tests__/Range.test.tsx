import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Range } from '../Range';

const min = 0;
const max = 100;
const steps = [0, 10, 20, 30, 40, 50];
const valuesBasicRange = { min: 25, max: 75 };
const valuesFixedRange = { min: 10, max: 40 };
const mockSliderPosition = {
  x: 500,
  y: 200,
  width: 300,
  height: 0,
  top: 200,
  right: 1000,
  bottom: 200,
  left: 500,
} as DOMRect;

describe('Range', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
    window.HTMLElement.prototype.getBoundingClientRect = () => mockSliderPosition;
  });

  it('should render minimum and maximum number inputs with limits defined', () => {
    const { getByLabelText } = render(<Range min={min} max={max} values={valuesBasicRange} onChange={mockOnChange} />);

    const minimumInput = getByLabelText('Minimum input');
    expect(minimumInput).toHaveValue(valuesBasicRange.min);
    expect(minimumInput).toHaveAttribute('min', String(min));
    expect(minimumInput).toHaveAttribute('max', String(valuesBasicRange.max));

    const maximumInput = getByLabelText('Maximum input');
    expect(maximumInput).toHaveValue(valuesBasicRange.max);
    expect(maximumInput).toHaveAttribute('min', String(valuesBasicRange.min));
    expect(maximumInput).toHaveAttribute('max', String(max));
  });

  it('should render minimum and maximum number inputs with no limits defined', () => {
    const { getByLabelText } = render(<Range values={valuesBasicRange} onChange={mockOnChange} />);

    const minimumInput = getByLabelText('Minimum input');
    expect(minimumInput).toHaveValue(valuesBasicRange.min);
    expect(minimumInput).toHaveAttribute('min', '0');
    expect(minimumInput).toHaveAttribute('max', String(valuesBasicRange.max));

    const maximumInput = getByLabelText('Maximum input');
    expect(maximumInput).toHaveValue(valuesBasicRange.max);
    expect(maximumInput).toHaveAttribute('min', String(valuesBasicRange.min));
    expect(maximumInput).toHaveAttribute('max', '0');
  });

  it('should change minimum and maximum values', async () => {
    const user = userEvent.setup();

    const { getByLabelText } = render(<Range min={min} max={max} values={valuesBasicRange} onChange={mockOnChange} />);

    const minimumInput = getByLabelText('Minimum input');
    await user.clear(minimumInput);
    await user.type(minimumInput, '30');

    expect(mockOnChange).toHaveBeenLastCalledWith({ min: 30, max: valuesBasicRange.max });

    const maximumInput = getByLabelText('Maximum input');
    await user.clear(maximumInput);
    await user.type(maximumInput, '60');

    expect(mockOnChange).toHaveBeenLastCalledWith({ min: valuesBasicRange.min, max: 60 });
  });

  it('should change minimum and maximum values and round to the closest step', async () => {
    const user = userEvent.setup();

    const { getByLabelText } = render(<Range steps={steps} values={valuesFixedRange} onChange={mockOnChange} />);

    const minimumInput = getByLabelText('Minimum input');
    await user.clear(minimumInput);
    await user.type(minimumInput, '23');

    expect(mockOnChange).toHaveBeenLastCalledWith({ min: 20, max: valuesFixedRange.max });

    const maximumInput = getByLabelText('Maximum input');
    await user.clear(maximumInput);
    await user.type(maximumInput, '27');

    expect(mockOnChange).toHaveBeenLastCalledWith({ min: valuesFixedRange.min, max: 30 });
  });

  it('should render a slider with bullets', () => {
    const { getByRole, getByTestId } = render(
      <Range min={min} max={max} values={valuesBasicRange} onChange={mockOnChange} />,
    );

    // Range sliders
    expect(getByTestId('range-slider')).toBeInTheDocument();
    expect(getByTestId('selected-range-slider')).toHaveStyle({ left: '25%', width: '50%' });

    // Range bullets
    const minimumBullet = getByRole('slider', { name: 'Minimum slider' });
    expect(minimumBullet).toHaveAttribute('aria-valuenow', String(valuesBasicRange.min));
    expect(minimumBullet).toHaveAttribute('aria-valuemin', String(min));
    expect(minimumBullet).toHaveAttribute('aria-valuemax', String(max));

    const maximumBullet = getByRole('slider', { name: 'Maximum slider' });
    expect(maximumBullet).toHaveAttribute('aria-valuenow', String(valuesBasicRange.max));
    expect(maximumBullet).toHaveAttribute('aria-valuemin', String(min));
    expect(maximumBullet).toHaveAttribute('aria-valuemax', String(max));
  });

  it('should drag a bullet in a basic range', async () => {
    const { getByRole, container } = render(
      <Range min={min} max={max} values={valuesBasicRange} onChange={mockOnChange} />,
    );

    const minimumBullet = getByRole('slider', { name: 'Minimum slider' });
    const maximumBullet = getByRole('slider', { name: 'Maximum slider' });

    fireEvent.mouseDown(minimumBullet);
    fireEvent.mouseMove(container, { clientX: mockSliderPosition.left + 100 });
    fireEvent.mouseUp(container);

    expect(mockOnChange).toHaveBeenLastCalledWith({ min: 33, max: valuesBasicRange.max });

    fireEvent.mouseDown(maximumBullet);
    fireEvent.mouseMove(container, { clientX: mockSliderPosition.left + 200 });
    fireEvent.mouseUp(container);

    expect(mockOnChange).toHaveBeenLastCalledWith({ min: valuesBasicRange.min, max: 67 });
  });

  it('should drag a bullet outside of limits', async () => {
    const { getByRole, container } = render(
      <Range min={min} max={max} values={valuesBasicRange} onChange={mockOnChange} />,
    );

    const minimumBullet = getByRole('slider', { name: 'Minimum slider' });
    const maximumBullet = getByRole('slider', { name: 'Maximum slider' });

    fireEvent.mouseDown(minimumBullet);
    fireEvent.mouseMove(container, { clientX: 0 });
    fireEvent.mouseUp(container);

    // It selects the minimum value
    expect(mockOnChange).toHaveBeenLastCalledWith({ min, max: valuesBasicRange.max });

    fireEvent.mouseDown(maximumBullet);
    fireEvent.mouseMove(container, { clientX: 1000 });
    fireEvent.mouseUp(container);

    // It selects the maximum value
    expect(mockOnChange).toHaveBeenLastCalledWith({ min: valuesBasicRange.min, max });
  });

  it('should not allow to cross bullets', async () => {
    const { getByRole, container } = render(
      <Range min={min} max={max} values={valuesBasicRange} onChange={mockOnChange} />,
    );

    const minimumBullet = getByRole('slider', { name: 'Minimum slider' });
    const maximumBullet = getByRole('slider', { name: 'Maximum slider' });

    fireEvent.mouseDown(minimumBullet);
    fireEvent.mouseMove(container, { clientX: 1000 });
    fireEvent.mouseUp(container);

    // It selects the maximum value selected by the user
    expect(mockOnChange).toHaveBeenLastCalledWith({ min: valuesBasicRange.max, max: valuesBasicRange.max });

    fireEvent.mouseDown(maximumBullet);
    fireEvent.mouseMove(container, { clientX: 0 });
    fireEvent.mouseUp(container);

    // It selects the minimum value selected by the user
    expect(mockOnChange).toHaveBeenLastCalledWith({ min: valuesBasicRange.min, max: valuesBasicRange.min });
  });

  it('should drag a bullet in a fixed range', async () => {
    const { getByRole, container } = render(<Range steps={steps} values={valuesFixedRange} onChange={mockOnChange} />);

    const minimumBullet = getByRole('slider', { name: 'Minimum slider' });
    const maximumBullet = getByRole('slider', { name: 'Maximum slider' });

    fireEvent.mouseDown(minimumBullet);
    fireEvent.mouseMove(container, { clientX: mockSliderPosition.left + 100 });
    fireEvent.mouseUp(container);

    expect(mockOnChange).toHaveBeenLastCalledWith({ min: 20, max: valuesFixedRange.max });

    fireEvent.mouseDown(maximumBullet);
    fireEvent.mouseMove(container, { clientX: mockSliderPosition.left + 200 });
    fireEvent.mouseUp(container);

    expect(mockOnChange).toHaveBeenLastCalledWith({ min: valuesFixedRange.min, max: 30 });
  });

  it('should drag a bullet without slider position', async () => {
    // No slider position
    window.HTMLElement.prototype.getBoundingClientRect = () => null as unknown as DOMRect;

    const { getByRole, container } = render(<Range steps={steps} values={valuesFixedRange} onChange={mockOnChange} />);

    const minimumBullet = getByRole('slider', { name: 'Minimum slider' });
    const maximumBullet = getByRole('slider', { name: 'Maximum slider' });

    fireEvent.mouseDown(minimumBullet);
    fireEvent.mouseMove(container, { clientX: 100 });
    fireEvent.mouseUp(container);

    expect(mockOnChange).toHaveBeenLastCalledWith({ min, max: valuesFixedRange.max });

    fireEvent.mouseDown(maximumBullet);
    fireEvent.mouseMove(container, { clientX: 200 });
    fireEvent.mouseUp(container);

    expect(mockOnChange).toHaveBeenLastCalledWith({ min: valuesFixedRange.min, max: valuesFixedRange.min });
  });

  it('should render steps marks in a fixed range', () => {
    const { getByRole } = render(<Range steps={steps} values={valuesFixedRange} onChange={mockOnChange} />);

    steps.forEach((step) => {
      const stepMark = getByRole('separator', { name: `Step ${step}€` });
      expect(stepMark).toHaveStyle({ left: `${(step / steps[steps.length - 1]) * 100}%` });
    });
  });
});
