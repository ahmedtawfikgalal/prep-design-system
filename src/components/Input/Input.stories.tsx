import { useState } from 'react';
import { Input } from './Input';

export default {
  title: 'Components/Input',
  component: Input,
};

export const Default = () => <Input placeholder="Enter text" />;

export const WithValue = () => <Input value="Hello world" onChange={() => {}} />;

export const Disabled = () => <Input placeholder="Disabled" disabled />;

export const Invalid = () => <Input value="not-an-email" onChange={() => {}} invalid />;

export const Password = () => <Input type="password" placeholder="Password" />;

export const Controlled = () => {
  const [value, setValue] = useState('');
  return <Input value={value} onChange={setValue} placeholder="Type here" />;
};
