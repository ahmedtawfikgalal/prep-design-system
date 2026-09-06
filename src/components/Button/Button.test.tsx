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
  // primary variant should use the primary background color from tokens
  expect(button).toHaveStyle({ backgroundColor: '#0066CC' });
});

test('applies secondary variant styling when specified', () => {
  render(<Button variant="secondary">Click me</Button>);
  const button = screen.getByRole('button');
  expect(button).toHaveStyle({ backgroundColor: '#6C757D' });
});