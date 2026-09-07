import { Toast } from './Toast';

export default {
  title: 'Components/Toast',
  component: Toast,
};

export const Info = () => <Toast variant="info" message="Heads up — something happened." onClose={() => {}} />;

export const Success = () => (
  <Toast variant="success" message="Your changes were saved." onClose={() => {}} />
);

export const Error = () => (
  <Toast variant="error" message="Something went wrong. Please try again." onClose={() => {}} />
);

export const WithoutCloseButton = () => (
  <Toast variant="info" message="This toast has no dismiss affordance." />
);
