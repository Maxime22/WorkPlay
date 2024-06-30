import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {WorkInput} from '../../../components/WorkInput/WorkInput.tsx';

describe('WorkInput', () => {
  const mockDeleteInput = jest.fn();
  const mockTimeActivityChange = jest.fn();
  const props = {
    inputTitle: 'Test Title',
    id: "1",
    deleteInput: mockDeleteInput,
    timeActivity: '0',
    onTimeActivityChange: mockTimeActivityChange,
    isDisabled: false,
  };

  it('renders correctly', () => {
    const {getByText, getByPlaceholderText} = render(<WorkInput {...props} />);
    expect(getByText('Test Title')).toBeTruthy();
    expect(getByPlaceholderText('Enter value')).toBeTruthy();
    expect(getByText('Delete')).toBeTruthy();
  });

  it('displays the correct title', () => {
    const {getByText} = render(<WorkInput {...props} />);
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('calls deleteInput when delete button is pressed', () => {
    const {getByText} = render(<WorkInput {...props} />);
    fireEvent.press(getByText('Delete'));
    expect(mockDeleteInput).toHaveBeenCalled();
  });

  it('calls onTimeActivityChange with the correct index when delete button is pressed', () => {
    const {getByPlaceholderText} = render(<WorkInput {...props} />);
    fireEvent(getByPlaceholderText('Enter value'), 'onChangeText', '10');
    expect(mockTimeActivityChange).toHaveBeenCalledWith('1', '10');
  });

  it('disables text input when isDisabled is true', () => {
    const disabledProps = { ...props, isDisabled: true };
    const { getByPlaceholderText, getByText } = render(<WorkInput {...disabledProps} />);
    const textInput = getByPlaceholderText('Enter value');

    expect(textInput.props.editable).toBe(false);
  });

  it('enables text input when isDisabled is false', () => {
    const { getByPlaceholderText, getByText } = render(<WorkInput {...props} />);
    const textInput = getByPlaceholderText('Enter value');

    expect(textInput.props.editable).toBe(true);
  });
});
