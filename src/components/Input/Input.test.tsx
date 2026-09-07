import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

test('renders an input with the given placeholder', () => {
  render(<Input placeholder="Email" />);
  expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
});

test('calls onChange with the new value when the user types', () => {
  const handleChange = vi.fn();
  render(<Input onChange={handleChange} placeholder="Email" />);

  fireEvent.change(screen.getByPlaceholderText('Email'), {
    target: { value: 'hello@example.com' },
  });

  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleChange).toHaveBeenCalledWith('hello@example.com');
});

test('defaults to type="text"', () => {
  render(<Input placeholder="Email" />);
  expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'text');
});

test('respects an explicit type', () => {
  render(<Input type="password" placeholder="Password" />);
  expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password');
});

test('is disabled when the disabled prop is true', () => {
  render(<Input placeholder="Email" disabled />);
  // The `disabled` attribute is the real guarantee that a user cannot edit the
  // field — the browser blocks input entirely. (We can't meaningfully assert
  // "onChange not fired" with fireEvent, which dispatches change events
  // synthetically regardless of the disabled state.)
  expect(screen.getByPlaceholderText('Email')).toBeDisabled();
});

test('marks the field as invalid for assistive tech when invalid', () => {
  render(<Input placeholder="Email" invalid />);
  expect(screen.getByPlaceholderText('Email')).toHaveAttribute('aria-invalid', 'true');
});

test('does not set aria-invalid when valid', () => {
  render(<Input placeholder="Email" />);
  expect(screen.getByPlaceholderText('Email')).not.toHaveAttribute('aria-invalid');
});

test('applies the invalid modifier class when invalid', () => {
  render(<Input placeholder="Email" invalid />);
  expect(screen.getByPlaceholderText('Email')).toHaveClass('input--invalid');
});
