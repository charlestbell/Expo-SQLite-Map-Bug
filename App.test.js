import { render } from '@testing-library/react-native';
import React from 'react';
import App from './App';

test('app renders with sqlite imported', () => {
  const { getByText } = render(<App />);
  const textElement = getByText('Open up App.js to start working on your app!');
  expect(textElement).toBeTruthy();
});
