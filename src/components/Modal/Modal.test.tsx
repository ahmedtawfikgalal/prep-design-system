import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

const noop = () => {};

test('renders nothing when closed', () => {
  render(
    <Modal isOpen={false} onClose={noop} title="Hidden">
      <p>Body content</p>
    </Modal>,
  );
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(screen.queryByText('Body content')).not.toBeInTheDocument();
});

test('renders title and children when open', () => {
  render(
    <Modal isOpen onClose={noop} title="Confirm">
      <p>Body content</p>
    </Modal>,
  );
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(screen.getByText('Confirm')).toBeInTheDocument();
  expect(screen.getByText('Body content')).toBeInTheDocument();
});

test('exposes the dialog as a modal to assistive tech', () => {
  render(
    <Modal isOpen onClose={noop} title="Confirm">
      <p>Body</p>
    </Modal>,
  );
  expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
});

test('labels the dialog with its title', () => {
  render(
    <Modal isOpen onClose={noop} title="Confirm">
      <p>Body</p>
    </Modal>,
  );
  expect(screen.getByRole('dialog')).toHaveAccessibleName('Confirm');
});

test('calls onClose when the close button is clicked', () => {
  const handleClose = vi.fn();
  render(
    <Modal isOpen onClose={handleClose} title="Confirm">
      <p>Body</p>
    </Modal>,
  );
  fireEvent.click(screen.getByRole('button', { name: 'Close' }));
  expect(handleClose).toHaveBeenCalledTimes(1);
});

test('calls onClose when the overlay is clicked', () => {
  const handleClose = vi.fn();
  const { container } = render(
    <Modal isOpen onClose={handleClose} title="Confirm">
      <p>Body</p>
    </Modal>,
  );
  fireEvent.click(container.querySelector('.modal-overlay')!);
  expect(handleClose).toHaveBeenCalledTimes(1);
});

test('does not call onClose when the dialog content is clicked', () => {
  const handleClose = vi.fn();
  render(
    <Modal isOpen onClose={handleClose} title="Confirm">
      <p>Body</p>
    </Modal>,
  );
  fireEvent.click(screen.getByText('Body'));
  expect(handleClose).not.toHaveBeenCalled();
});

test('calls onClose when Escape is pressed', () => {
  const handleClose = vi.fn();
  render(
    <Modal isOpen onClose={handleClose} title="Confirm">
      <p>Body</p>
    </Modal>,
  );
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(handleClose).toHaveBeenCalledTimes(1);
});

test('does not listen for Escape while closed', () => {
  const handleClose = vi.fn();
  render(
    <Modal isOpen={false} onClose={handleClose} title="Confirm">
      <p>Body</p>
    </Modal>,
  );
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(handleClose).not.toHaveBeenCalled();
});
