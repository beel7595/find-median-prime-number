import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer'

import App from '../App';


test('should render App', () => {
  render(<App />);
  const linkElement = screen.getByTestId("app");
  expect(linkElement).toBeInTheDocument();
})

test('matches snapshot', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
})

const stepUp = () => {
  const utils = render(<App />);
  const input = utils.getByTestId("input");
  const submit = utils.getByTestId("submit");
  return ({
    input,
    submit,
    utils
  })
}

test('input should be a number', () => {
  const { input } = stepUp();
  fireEvent.change(input, { target: { value: 'test' } });
  expect(input.value).toBe('0');
})

test('input should be a number without 0 ahead', () => {
  const { input } = stepUp();
  fireEvent.change(input, { target: { value: '0001' } });
  expect(input.value).toBe('1');
})

test('input should be a integer', () => {
  const { input } = stepUp();
  fireEvent.change(input, { target: { value: '100.54' } });
  expect(input.value).toBe('100');
})

test('input should be a number less than Less than 2 to the 32nd power', () => {
  const { input } = stepUp();
  fireEvent.change(input, { target: { value: '4294967297' } });
  expect(input.value).toBe('4294967296');
})

// test('input number to submit', () => {
//   const { utils, submit, input } = stepUp();
//   fireEvent.change(input, { target: { value: '100' } });
//   fireEvent.click(submit);
//   expect(utils.number).toBe('100');
// })
