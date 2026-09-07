import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

export default {
  title: 'Components/Modal',
  component: Modal,
};

export const Default = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm action">
        <p>Are you sure you want to continue? This action cannot be undone.</p>
      </Modal>
    </>
  );
};

export const WithoutTitle = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>A modal without a title still renders a close affordance.</p>
      </Modal>
    </>
  );
};

export const LongContent = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Terms of service">
        {Array.from({ length: 8 }, (_, i) => (
          <p key={i}>
            Paragraph {i + 1}: lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        ))}
      </Modal>
    </>
  );
};
