import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import store from '../features/store';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>e
      <App />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
