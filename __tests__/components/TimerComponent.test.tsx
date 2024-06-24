import 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import store from '../../redux/store';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import TimerComponent from '../../components/Timer/TimerComponent';

it('renders correctly', () => {
  renderer.create(
    <Provider store={store}>
      <TimerComponent />
    </Provider>,
  );
});
