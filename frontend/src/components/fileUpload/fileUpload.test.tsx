//@ts-nocheck
import { render, screen, fireEvent } from '@testing-library/react';
import FileUploadComponent from './index';

test('Input receives text', () => {
  render(<FileUploadComponent />);
  const inputElement = screen.getByPlaceholderText('search');
  fireEvent.change(inputElement, { target: { value: 'Texto de teste' } });
  expect(inputElement.value).toBe('Texto de teste');
});

test('Button has text "Upload"', () => {
  render(<FileUploadComponent />);
  const buttonElement = screen.getByText('Upload');
  expect(buttonElement).toBeInTheDocument();
});

test('Divs has components', () => {
  render(<FileUploadComponent />);
  const fileContainer = screen.getByTestId('file-container');
  // eslint-disable-next-line testing-library/no-node-access
  const inputContainers = fileContainer.querySelectorAll('.InputContainer');
  expect(inputContainers.length).toBe(3);
});
