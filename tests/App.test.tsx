import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';
import {WorkPlayApp} from '../App.tsx';
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
  resetInputs: jest.fn(),
  loadRemainingTime: jest.fn(),
  saveRemainingTime: jest.fn(),
}));

jest.mock('react-native-push-notification', () => ({
  localNotificationSchedule: jest.fn(),
  configure: jest.fn(),
  createChannel: jest.fn(),
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
      {title: 'Task 1', value: '', id: '1'},
      {title: 'Task 2', value: '', id: '2'},
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
      {title: 'Task 1', value: '', id: '1'},
      {title: 'Task 2', value: '', id: '2'},
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
        setInputs(inputs.filter(input => input.id !== id));
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

  it('disables inputs when the countdown is running and enables them when it stops', async () => {
    const mockInputs: InputItem[] = [
      {title: 'Task 1', value: '1', id: '1'},
      {title: 'Task 2', value: '2', id: '2'},
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

    fireEvent.press(screen.getByText('Start'));

    const textInputs = screen.getAllByPlaceholderText('Enter value');
    textInputs.forEach(input => {
      expect(input.props.editable).toBe(false);
    });

    fireEvent.press(screen.getByText('Stop'));

    textInputs.forEach(input => {
      expect(input.props.editable).toBe(true);
    });
  });

  it('calculates user time correctly with valid inputs', async () => {
    // Mocking loadInputs to initialize with an empty list
    (loadInputs as jest.Mock).mockImplementation(
      async (setInputs: React.Dispatch<React.SetStateAction<InputItem[]>>) => {
        setInputs([]);
      },
    );

    // Mocking addInputUtil to add inputs to the list
    (addInputUtil as jest.Mock).mockImplementation(
      (
        inputs: InputItem[],
        newInput: InputItem,
        setInputs: React.Dispatch<React.SetStateAction<InputItem[]>>,
      ) => {
        setInputs([...inputs, newInput]);
      },
    );

    const {getByPlaceholderText, getByText, getAllByPlaceholderText} = render(
      <WorkPlayApp />,
    );

    // Add first input
    fireEvent.press(getByText('+'));
    fireEvent.changeText(getByPlaceholderText('Enter Title'), 'Task 1');
    fireEvent.press(getByText('Save'));

    // Add second input
    fireEvent.press(getByText('+'));
    fireEvent.changeText(getByPlaceholderText('Enter Title'), 'Task 2');
    fireEvent.press(getByText('Save'));

    // Add third input
    fireEvent.press(getByText('+'));
    fireEvent.changeText(getByPlaceholderText('Enter Title'), 'Task 3');
    fireEvent.press(getByText('Save'));

    // Wait for inputs to be added
    await waitFor(() => {
      expect(getByText('Task 1')).toBeTruthy();
      expect(getByText('Task 2')).toBeTruthy();
      expect(getByText('Task 3')).toBeTruthy();
    });

    // Get all text inputs for time values
    const textInputs = getAllByPlaceholderText('Enter value');

    // Set values for each input
    fireEvent.changeText(textInputs[0], '5');
    fireEvent.changeText(textInputs[1], '10');
    fireEvent.changeText(textInputs[2], '15');

    // Simulate starting the countdown
    fireEvent.press(getByText('Start'));

    // Check if the countdown shows the correct total time (in seconds converted to hh:mm:ss format)
    await waitFor(() => {
      expect(getByText('00:30:00')).toBeTruthy(); // Total time is 5+10+15=30 minutes -> 30*60=1800 seconds
    });
  });

  it('returns 0 if no inputs', () => {
    const {getByText} = render(<WorkPlayApp />);

    // Simuler le début du compte à rebours sans ajouter d'entrées
    fireEvent.press(getByText('Start'));

    // Assurez-vous que la méthode calculateUserTime renvoie 0
    expect(getByText('00:00:00')).toBeTruthy(); // Supposons que le format est mm:ss
  });

  it('handles inputs with empty strings or non-numeric values', async () => {
    // Mocking loadInputs to initialize with an empty list
    (loadInputs as jest.Mock).mockImplementation(
      async (setInputs: React.Dispatch<React.SetStateAction<InputItem[]>>) => {
        setInputs([]);
      },
    );

    // Mocking addInputUtil to add inputs to the list
    (addInputUtil as jest.Mock).mockImplementation(
      (
        inputs: InputItem[],
        newInput: InputItem,
        setInputs: React.Dispatch<React.SetStateAction<InputItem[]>>,
      ) => {
        setInputs([...inputs, newInput]);
      },
    );

    const {getByPlaceholderText, getByText, getAllByPlaceholderText} = render(
      <WorkPlayApp />,
    );

    // Add first input
    fireEvent.press(getByText('+'));
    fireEvent.changeText(getByPlaceholderText('Enter Title'), 'Task 1');
    fireEvent.press(getByText('Save'));

    // Add second input
    fireEvent.press(getByText('+'));
    fireEvent.changeText(getByPlaceholderText('Enter Title'), 'Task 2');
    fireEvent.press(getByText('Save'));

    // Add third input
    fireEvent.press(getByText('+'));
    fireEvent.changeText(getByPlaceholderText('Enter Title'), 'Task 3');
    fireEvent.press(getByText('Save'));

    // Wait for inputs to be added
    await waitFor(() => {
      expect(getByText('Task 1')).toBeTruthy();
      expect(getByText('Task 2')).toBeTruthy();
      expect(getByText('Task 3')).toBeTruthy();
    });

    // Get all text inputs for time values
    const textInputs = getAllByPlaceholderText('Enter value');

    // Set values for each input
    fireEvent.changeText(textInputs[0], '5');
    fireEvent.changeText(textInputs[1], '');
    fireEvent.changeText(textInputs[2], 'abc');

    // Simulate starting the countdown
    fireEvent.press(getByText('Start'));

    // Check if the countdown shows the correct total time (in seconds converted to hh:mm:ss format)
    await waitFor(() => {
      expect(getByText('00:05:00')).toBeTruthy(); // Total time is 5 minutes -> 5*60=300 seconds
    });
  });
});
