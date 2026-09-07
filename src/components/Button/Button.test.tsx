import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

test('renders button text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click me</Button>);

  fireEvent.click(screen.getByText('Click me'));

  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('renders as a button element', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('defaults to primary variant when none is passed', () => {
  render(<Button>Click me</Button>);
  const button = screen.getByRole('button');
  expect(button).toHaveClass('button--primary');
});

test('applies secondary variant styling when specified', () => {
  render(<Button variant="secondary">Click me</Button>);
  const button = screen.getByRole('button');
  expect(button).toHaveClass('button--secondary');
});

test('is disabled when disabled prop is true', () => {
  render(<Button disabled>Click me</Button>);
  expect(screen.getByRole('button')).toBeDisabled();
});

test('does not call onClick when disabled', () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick} disabled>Click me</Button>);
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).not.toHaveBeenCalled();
});

test('defaults to type="button" to avoid accidental form submission', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
});