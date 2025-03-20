import { render, screen } from '@testing-library/react';
import App from './App';

test('checks that Little Lemon is in the h1 tag', () => {
  render(<App />);
  const headingElement = screen.getAllByText(/Little Lemon/i);
  expect(headingElement[0]).toBeInTheDocument();
  expect(headingElement[0]).toHaveTextContent('Little Lemon');
});

test('checks that the Reserve Table button is in the document', () => {

  render(<App />);
  const buttonElement = screen.getAllByText(/Reserve Table/i);
  //select the first button
  expect(buttonElement[0]).toBeInTheDocument();
  expect(buttonElement[0]).toHaveTextContent('Reserve Table');
});
