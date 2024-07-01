import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';
import WorkPlayApp from '../App.tsx';
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
      async (setInputs: React.Dispatch<React.SetStateAction<string[]>>) => {
        setInputs([]);
      },
    );
    render(<WorkPlayApp />);
    expect(screen.getByText('+')).toBeTruthy();
  });

  it('loads inputs on mount', async () => {
    const mockInputs = ['Task 1', 'Task 2'];
    (loadInputs as jest.Mock).mockImplementation(
      async (setInputs: React.Dispatch<React.SetStateAction<string[]>>) => {
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
      async (setInputs: React.Dispatch<React.SetStateAction<string[]>>) => {
        setInputs([]);
      },
    );
    (addInputUtil as jest.Mock).mockImplementation(
      (
        inputs: string[],
        title: string,
        setInputs: React.Dispatch<React.SetStateAction<string[]>>,
      ) => {
        setInputs([...inputs, title]);
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
      'New Task',
      expect.any(Function),
    );
  });

  it('deletes an input', async () => {
    const mockInputs = ['Task 1', 'Task 2'];
    (loadInputs as jest.Mock).mockImplementation(
      async (setInputs: React.Dispatch<React.SetStateAction<string[]>>) => {
        setInputs(mockInputs);
      },
    );
    (deleteInputUtil as jest.Mock).mockImplementation(
      (
        inputs: string[],
        index: number,
        setInputs: React.Dispatch<React.SetStateAction<string[]>>,
      ) => {
        setInputs(inputs.filter((input: string, i: number) => i !== index));
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
      0,
      expect.any(Function),
    );
  });
});
