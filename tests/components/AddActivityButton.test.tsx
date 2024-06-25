import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {AddActivityButton} from '../../components/AddActivity/AddActivityButton.tsx';

describe('AddActivityButton', () => {
  it('renders correctly + button', () => {
    const {getByText} = render(<AddActivityButton onPress={() => {}} />);
    expect(getByText('+')).toBeTruthy();
  });

  it('calls onPress when the button is pressed', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(<AddActivityButton onPress={onPressMock} />);
    fireEvent.press(getByText('+'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
