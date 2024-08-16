import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {WorkInput} from '../../../components/WorkInput/WorkInput';

describe('WorkInput', () => {
  const mockDeleteInput = jest.fn();
  const mockTimeActivityChange = jest.fn();
  const mockHandleRatioChange = jest.fn();
  const props = {
    inputTitle: 'Test Title',
    id: '1',
    deleteInput: mockDeleteInput,
    timeActivity: '0',
    ratio: '1',
    handleRatioChange: mockHandleRatioChange,
    onTimeActivityChange: mockTimeActivityChange,
    isDisabled: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText, getByPlaceholderText} = render(<WorkInput {...props} />);
    expect(getByText('Test Title')).toBeDefined();
    expect(getByPlaceholderText('Enter value')).toBeDefined();
    expect(getByText('Delete')).toBeDefined();
  });

  it('displays the correct title', () => {
    const {getByText} = render(<WorkInput {...props} />);
    expect(getByText('Test Title')).toBeDefined();
  });

  it('opens confirmation popup when delete button is pressed', () => {
    const {getByText, queryByText} = render(<WorkInput {...props} />);
    fireEvent.press(getByText('Delete'));
    expect(queryByText('Supprimer ?')).toBeDefined();
  });

  it('calls deleteInput when confirm button is pressed in confirmation popup', () => {
    const {getByText} = render(<WorkInput {...props} />);
    fireEvent.press(getByText('Delete'));
    fireEvent.press(getByText('Oui'));
    expect(mockDeleteInput).toHaveBeenCalled();
  });

  it('closes confirmation popup when cancel button is pressed', () => {
    const {getByText, queryByText} = render(<WorkInput {...props} />);
    fireEvent.press(getByText('Delete'));
    fireEvent.press(getByText('Non'));
    expect(mockDeleteInput).not.toHaveBeenCalled();
    expect(queryByText('Supprimer ?')).toBeNull();
  });

  it('calls onTimeActivityChange with the correct index when text input changes', () => {
    const {getByPlaceholderText} = render(<WorkInput {...props} />);
    fireEvent.changeText(getByPlaceholderText('Enter value'), '10');
    expect(mockTimeActivityChange).toHaveBeenCalledWith('1', '10');
  });

  it('disables text input when isDisabled is true', () => {
    const disabledProps = {...props, isDisabled: true};
    const {getByPlaceholderText} = render(<WorkInput {...disabledProps} />);
    const textInput = getByPlaceholderText('Enter value');
    expect(textInput.props.editable).toBe(false);
  });

  it('enables text input when isDisabled is false', () => {
    const {getByPlaceholderText} = render(<WorkInput {...props} />);
    const textInput = getByPlaceholderText('Enter value');
    expect(textInput.props.editable).toBe(true);
  });

  it('calls handleRatioChange with the correct value when the ratio changes', () => {
    const {getByTestId} = render(<WorkInput {...props} />);
    const picker = getByTestId('picker-' + props.id);
    fireEvent(picker, 'onValueChange', '2');
    expect(mockHandleRatioChange).toHaveBeenCalledWith('1', '2');
  });
});
