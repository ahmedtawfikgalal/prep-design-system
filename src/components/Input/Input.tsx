import './Input.css';

type InputProps = Omit<React.ComponentPropsWithRef<'input'>, 'onChange'> & {
  onChange?: (value: string) => void;
  invalid?: boolean;
};

export const Input = ({
  ref,
  onChange,
  invalid = false,
  type = 'text',
  className,
  'aria-invalid': ariaInvalidProp,
  ...rest
}: InputProps) => {
  // Treat the field as invalid if the `invalid` prop is set OR an
  // aria-invalid attribute was injected by a parent (e.g. FormField).
  const isInvalid =
    invalid || ariaInvalidProp === true || ariaInvalidProp === 'true';

  return (
    <input
      {...rest}
      ref={ref}
      type={type}
      aria-invalid={isInvalid || undefined}
      onChange={(event) => onChange?.(event.target.value)}
      className={['input', isInvalid && 'input--invalid', className]
        .filter(Boolean)
        .join(' ')}
    />
  );
};
