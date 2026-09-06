import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
};

export const Button = ({ children, variant = 'primary', onClick }: ButtonProps) => {
  const backgroundColor = variant === 'primary' ? colors.primary : colors.secondary;
  const textColor = variant === 'primary' ? colors.textOnPrimary : colors.textOnSecondary;

  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor,
        color: textColor,
        padding: `${spacing.sm} ${spacing.md}`,
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
};