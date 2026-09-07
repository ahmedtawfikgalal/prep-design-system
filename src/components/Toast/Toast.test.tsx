import { render, screen, fireEvent, act } from '@testing-library/react';
import { Toast } from './Toast';

test('renders the message', () => {
  render(<Toast message="Saved!" />);
  expect(screen.getByText('Saved!')).toBeInTheDocument();
});

test('defaults to the info variant with a polite status role', () => {
  render(<Toast message="Info" />);
  const toast = screen.getByRole('status');
  expect(toast).toHaveClass('toast--info');
});

test('applies the success variant class', () => {
  render(<Toast message="Done" variant="success" />);
  expect(screen.getByRole('status')).toHaveClass('toast--success');
});

test('uses an assertive alert role for the error variant', () => {
  render(<Toast message="Failed" variant="error" />);
  const toast = screen.getByRole('alert');
  expect(toast).toHaveClass('toast--error');
});

test('renders a close button and calls onClose when it is clicked', () => {
  const handleClose = vi.fn();
  render(<Toast message="Saved" onClose={handleClose} />);
  fireEvent.click(screen.getByRole('button', { name: 'Close' }));
  expect(handleClose).toHaveBeenCalledTimes(1);
});

test('does not render a close button when no onClose is provided', () => {
  render(<Toast message="Saved" />);
  expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
});

test('auto-dismisses after the given duration', () => {
  vi.useFakeTimers();
  const handleClose = vi.fn();
  try {
    render(<Toast message="Saved" onClose={handleClose} duration={3000} />);

    expect(handleClose).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(handleClose).toHaveBeenCalledTimes(1);
  } finally {
    vi.useRealTimers();
  }
});

test('does not auto-dismiss when no duration is provided', () => {
  vi.useFakeTimers();
  const handleClose = vi.fn();
  try {
    render(<Toast message="Saved" onClose={handleClose} />);
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(handleClose).not.toHaveBeenCalled();
  } finally {
    vi.useRealTimers();
  }
});
