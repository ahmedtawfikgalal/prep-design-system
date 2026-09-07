import { render, screen } from '@testing-library/react';
import { FormField } from './FormField';

test('associates the label with the control automatically (no manual id)', () => {
  render(
    <FormField label="Email">
      <input />
    </FormField>,
  );
  // getByLabelText only resolves if FormField generated an id and wired both
  // the label's htmlFor and the control's id to it.
  expect(screen.getByLabelText('Email')).toBe(screen.getByRole('textbox'));
});

test('respects an id already present on the child control', () => {
  render(
    <FormField label="Email">
      <input id="custom-email" />
    </FormField>,
  );
  expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'custom-email');
});

test('renders its child control', () => {
  render(
    <FormField label="Email">
      <input placeholder="you@example.com" />
    </FormField>,
  );
  expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
});

test('shows a required indicator when required', () => {
  render(
    <FormField label="Name" required>
      <input />
    </FormField>,
  );
  expect(screen.getByText('*')).toBeInTheDocument();
});

test('does not show a required indicator by default', () => {
  render(
    <FormField label="Name">
      <input />
    </FormField>,
  );
  expect(screen.queryByText('*')).not.toBeInTheDocument();
});

test('announces the error message via an alert role', () => {
  render(
    <FormField label="Email" error="Email is required">
      <input />
    </FormField>,
  );
  expect(screen.getByRole('alert')).toHaveTextContent('Email is required');
});

test('wires the error to the control as its accessible description', () => {
  render(
    <FormField label="Email" error="Email is required">
      <input />
    </FormField>,
  );
  // The control is described by the error text without any consumer wiring.
  expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Email is required');
});

test('marks the control invalid for assistive tech when there is an error', () => {
  render(
    <FormField label="Email" error="Email is required">
      <input />
    </FormField>,
  );
  expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
});

test('does not mark the control invalid when there is no error', () => {
  render(
    <FormField label="Email">
      <input />
    </FormField>,
  );
  expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
});

test('wires the hint as the accessible description when there is no error', () => {
  render(
    <FormField label="Password" hint="At least 8 characters">
      <input />
    </FormField>,
  );
  expect(screen.getByText('At least 8 characters')).toBeInTheDocument();
  expect(screen.getByRole('textbox')).toHaveAccessibleDescription('At least 8 characters');
});

test('prefers the error over the hint when both are provided', () => {
  render(
    <FormField label="Password" hint="At least 8 characters" error="Password is too short">
      <input />
    </FormField>,
  );
  expect(screen.getByText('Password is too short')).toBeInTheDocument();
  expect(screen.queryByText('At least 8 characters')).not.toBeInTheDocument();
  expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Password is too short');
});
