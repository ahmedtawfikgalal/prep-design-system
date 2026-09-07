import { Children, cloneElement, useId } from 'react';
import './FormField.css';

type FormFieldProps = {
  label: string;
  /** Optional explicit id. When omitted, a stable id is generated and wired
   *  to the control and its label automatically. */
  id?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactElement;
};

export const FormField = ({
  label,
  id,
  required = false,
  error,
  hint,
  children,
}: FormFieldProps) => {
  const generatedId = useId();
  const child = Children.only(children) as React.ReactElement<{
    id?: string;
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
  }>;

  // Prefer an explicit id, then the child's own id, then a generated one —
  // whichever we land on becomes the single source the label points at.
  const controlId = id ?? child.props.id ?? generatedId;
  const errorId = `${controlId}-error`;
  const hintId = `${controlId}-hint`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  const control = cloneElement(child, {
    id: controlId,
    'aria-describedby': describedBy,
    ...(error ? { 'aria-invalid': true } : {}),
  });

  return (
    <div className="form-field">
      <label className="form-field__label" htmlFor={controlId}>
        {label}
        {required && (
          <span className="form-field__required" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {control}
      {error ? (
        <p className="form-field__error" id={errorId} role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="form-field__hint" id={hintId}>
          {hint}
        </p>
      ) : null}
    </div>
  );
};
