import { FormField } from './FormField';
import { Input } from '../Input/Input';

export default {
  title: 'Components/FormField',
  component: FormField,
};

export const Default = () => (
  <FormField label="Email">
    <Input type="email" placeholder="you@example.com" />
  </FormField>
);

export const Required = () => (
  <FormField label="Full name" required>
    <Input placeholder="Ada Lovelace" required />
  </FormField>
);

export const WithHint = () => (
  <FormField label="Password" hint="Use at least 8 characters.">
    <Input type="password" />
  </FormField>
);

export const WithError = () => (
  <FormField label="Email" required error="Please enter a valid email address.">
    {/* No manual id, aria-describedby, or invalid wiring — FormField owns it. */}
    <Input type="email" value="not-an-email" onChange={() => {}} />
  </FormField>
);
