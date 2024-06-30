import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';
import { WorkPlayApp, InputItem } from '../App.tsx';
import {
  loadInputs,
  addInput as addInputUtil,
  deleteInput as deleteInputUtil,
} from '../utils/StorageUtils.ts';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock('../utils/StorageUtils.ts', () => ({
  loadInputs: jest.fn(),
  addInput: jest.fn(),
  deleteInput: jest.fn(),
}));

jest.mock('react-native-push-notification', () => ({
  localNotificationSchedule: jest.fn(),
  configure: jest.fn(),
}));

describe('WorkPlayApp', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders correctly', () => {
    (loadInputs as jest.Mock).mockImplementation(
      async (setInputs: React.Dispatch<React.SetStateAction<InputItem[]>>) => {
        setInputs([]);
      },
    );
    render(<WorkPlayApp />);
    expect(screen.getByText('+')).toBeTruthy();
  });

  it('loads inputs on mount', async () => {
    const mockInputs: InputItem[] = [
      { title: 'Task 1', value: '', id: '1' },
      { title: 'Task 2', value: '', id: '2' },
    ];
    (loadInputs as jest.Mock).mockImplementation(
      async (setInputs: React.Dispatch<React.SetStateAction<InputItem[]>>) => {
        setInputs(mockInputs);
      },
    );

    render(<WorkPlayApp />);

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeTruthy();
      expect(screen.getByText('Task 2')).toBeTruthy();
    });

    expect(loadInputs).toHaveBeenCalledTimes(1);
  });

  it('adds a new input', async () => {
    (loadInputs as jest.Mock).mockImplementation(
      async (setInputs: React.Dispatch<React.SetStateAction<InputItem[]>>) => {
        setInputs([]);
      },
    );
    (addInputUtil as jest.Mock).mockImplementation(
      (
        inputs: InputItem[],
        newInput: InputItem,
        setInputs: React.Dispatch<React.SetStateAction<InputItem[]>>,
      ) => {
        setInputs([...inputs, newInput]);
      },
    );

    render(<WorkPlayApp />);

    fireEvent.press(screen.getByText('+'));
    fireEvent.changeText(
      screen.getByPlaceholderText('Enter Title'),
      'New Task',
    );
    fireEvent.press(screen.getByText('Save'));

    await waitFor(() => {
      expect(screen.getByText('New Task')).toBeTruthy();
    });

    expect(addInputUtil).toHaveBeenCalledWith(
      [],
        expect.objectContaining({
          title: 'New Task',
          value: '',
          id: expect.any(String),
        }),
      expect.any(Function),
    );
  });

  it('deletes an input', async () => {
    const mockInputs: InputItem[] = [
      { title: 'Task 1', value: '', id: '1' },
      { title: 'Task 2', value: '', id: '2' },
    ];
    (loadInputs as jest.Mock).mockImplementation(
      async (setInputs: React.Dispatch<React.SetStateAction<InputItem[]>>) => {
        setInputs(mockInputs);
      },
    );
    (deleteInputUtil as jest.Mock).mockImplementation(
      (
        inputs: InputItem[],
        id: string,
        setInputs: React.Dispatch<React.SetStateAction<InputItem[]>>,
      ) => {
        setInputs(inputs.filter((input) => input.id !== id));
      },
    );

    render(<WorkPlayApp />);

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeTruthy();
      expect(screen.getByText('Task 2')).toBeTruthy();
    });

    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.press(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.queryByText('Task 1')).toBeNull();
      expect(screen.getByText('Task 2')).toBeTruthy();
    });

    expect(deleteInputUtil).toHaveBeenCalledWith(
      mockInputs,
      '1',
      expect.any(Function),
    );
  });
});
