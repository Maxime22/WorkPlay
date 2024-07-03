import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {AddActivity} from '../../../components/AddActivity/AddActivity.tsx';
import {Alert} from 'react-native';

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

describe('AddActivity', () => {
  it('renders correctly', () => {
    const {getByText} = render(<AddActivity addInput={() => {}} />);
    expect(getByText('+')).toBeTruthy();
  });

  it('opens the modal when the button is pressed', () => {
    const {getByText, getByPlaceholderText} = render(
      <AddActivity addInput={() => {}} />,
    );
    fireEvent.press(getByText('+'));
    expect(getByPlaceholderText('Enter Title')).toBeTruthy();
  });

  it('closes the modal when the close button is pressed', () => {
    const {getByText, queryByPlaceholderText} = render(
      <AddActivity addInput={() => {}} />,
    );
    fireEvent.press(getByText('+'));
    fireEvent.press(getByText('×'));
    expect(queryByPlaceholderText('Enter Title')).toBeNull();
  });

  it('calls addInput with the correct title and closes the modal', () => {
    const addInputMock = jest.fn();
    const {getByText, getByPlaceholderText} = render(
      <AddActivity addInput={addInputMock} />,
    );

    fireEvent.press(getByText('+'));
    fireEvent.changeText(getByPlaceholderText('Enter Title'), 'New Activity');
    fireEvent.press(getByText('Save'));

    expect(addInputMock).toHaveBeenCalledWith('New Activity');
    expect(addInputMock).toHaveBeenCalledTimes(1);
    expect(getByText('+')).toBeTruthy(); // Check if modal closed
  });

  it('shows an alert if the title is empty', () => {
    const {getByText, getByPlaceholderText} = render(
      <AddActivity addInput={() => {}} />,
    );

    fireEvent.press(getByText('+'));
    fireEvent.changeText(getByPlaceholderText('Enter Title'), '');
    fireEvent.press(getByText('Save'));

    expect(Alert.alert).toHaveBeenCalledWith('Title cannot be empty');
  });
});
