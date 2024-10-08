import React, {useState} from 'react';
import {render, fireEvent, act, waitFor} from '@testing-library/react-native';
import {Countdown} from '../../../components/Countdown/Countdown.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.useFakeTimers();
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

const ONE_MINUTE = 1;
const ONE_HOUR_AND_ONE_MINUTE = 61;

describe('Countdown Component', () => {
  const mockCalculateUserTime = jest.fn();
  const mockResetInputs = jest.fn();
  const mockOnStart = jest.fn();
  const mockOnStop = jest.fn();

  beforeEach(() => {
    mockCalculateUserTime.mockClear();
    mockResetInputs.mockClear();
    mockOnStart.mockClear();
    mockOnStop.mockClear();
    jest.clearAllMocks();
  });

  it('displays initial time as 00:00:00', () => {
    const {getByText} = render(
      <Countdown
        calculateUserTime={mockCalculateUserTime}
        resetInputs={mockResetInputs}
        onStart={mockOnStart}
        onStop={mockOnStop}
        isCountdownRunning={false}
      />,
    );
    expect(getByText('00:00:00')).toBeTruthy();
  });

  it('returns 0 if no inputs', () => {
    const localMockCalculateUserTime = jest.fn(() => 0);
    const {getByText} = render(
      <Countdown
        calculateUserTime={localMockCalculateUserTime}
        resetInputs={mockResetInputs}
        onStart={mockOnStart}
        onStop={mockOnStop}
        isCountdownRunning={false}
      />,
    );
    fireEvent.press(getByText('Start'));
    expect(getByText('00:00:00')).toBeTruthy();
  });

  it('starts the countdown when the Start button is pressed', () => {
    mockCalculateUserTime.mockReturnValue(1); // Return 1 minute for testing

    const TestComponent = () => {
      const [isCountdownRunning, setIsCountdownRunning] = useState(false);

      const handleStart = () => {
        mockOnStart();
        setIsCountdownRunning(true);
      };

      return (
        <Countdown
          calculateUserTime={mockCalculateUserTime}
          resetInputs={mockResetInputs}
          onStart={handleStart}
          onStop={mockOnStop}
          isCountdownRunning={isCountdownRunning}
        />
      );
    };

    const {getByText} = render(<TestComponent />);

    fireEvent.press(getByText('Start'));

    expect(mockCalculateUserTime).toHaveBeenCalled();
    expect(mockResetInputs).toHaveBeenCalled();
    expect(mockOnStart).toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(getByText('00:00:59')).toBeTruthy();
  });

  it('does not start the countdown when the Start button is pressed but time is 0', () => {
    mockCalculateUserTime.mockReturnValue(0);
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify({time: 0}));
    const {getByText} = render(
      <Countdown
        calculateUserTime={mockCalculateUserTime}
        resetInputs={mockResetInputs}
        onStart={mockOnStart}
        onStop={mockOnStop}
        isCountdownRunning={false}
      />,
    );

    fireEvent.press(getByText('Start'));

    expect(mockCalculateUserTime).toHaveBeenCalled();
    expect(mockResetInputs).not.toHaveBeenCalled();
    expect(mockOnStart).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(getByText('00:00:00')).toBeTruthy();
  });

  it('stops the countdown when the Stop button is pressed', () => {
    mockCalculateUserTime.mockReturnValue(ONE_MINUTE); // Return 1 minute for testing

    const TestComponent = () => {
      const [isCountdownRunning, setIsCountdownRunning] = useState(false);

      const handleStart = () => {
        mockOnStart();
        setIsCountdownRunning(true);
      };
      const handleStop = () => {
        mockOnStop();
        setIsCountdownRunning(false);
      };

      return (
        <Countdown
          calculateUserTime={mockCalculateUserTime}
          resetInputs={mockResetInputs}
          onStart={handleStart}
          onStop={handleStop}
          isCountdownRunning={isCountdownRunning}
        />
      );
    };

    const {getByText} = render(<TestComponent />);

    fireEvent.press(getByText('Start'));

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    fireEvent.press(getByText('Pause'));

    expect(mockOnStop).toHaveBeenCalled();
    expect(getByText('00:00:57')).toBeTruthy();
  });

  it('formats the time correctly', () => {
    mockCalculateUserTime.mockReturnValue(ONE_HOUR_AND_ONE_MINUTE);

    const TestComponent = () => {
      const [isCountdownRunning, setIsCountdownRunning] = useState(false);

      const handleStart = () => {
        mockOnStart();
        setIsCountdownRunning(true);
      };
      const handleStop = () => {
        mockOnStop();
        setIsCountdownRunning(false);
      };

      return (
        <Countdown
          calculateUserTime={mockCalculateUserTime}
          resetInputs={mockResetInputs}
          onStart={handleStart}
          onStop={handleStop}
          isCountdownRunning={isCountdownRunning}
        />
      );
    };
    const {getByText} = render(<TestComponent />);

    fireEvent.press(getByText('Start'));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(getByText('01:00:59')).toBeTruthy(); // Check formatted time
  });

  it('loads the remaining time from AsyncStorage on mount (initializeCountdown)', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(
      JSON.stringify({time: 60, timestamp: new Date().getTime() - 10000}),
    );

    const TestComponent = () => {
      const [isCountdownRunning, setIsCountdownRunning] = useState(false);

      const handleStart = () => {
        mockOnStart();
        setIsCountdownRunning(true);
      };
      const handleStop = () => {
        mockOnStop();
        setIsCountdownRunning(false);
      };

      return (
        <Countdown
          calculateUserTime={mockCalculateUserTime}
          resetInputs={mockResetInputs}
          onStart={handleStart}
          onStop={handleStop}
          isCountdownRunning={isCountdownRunning}
        />
      );
    };
    const {getByText} = render(<TestComponent />);

    await waitFor(() => expect(getByText('00:00:50')).toBeTruthy()); // 60 seconds - 10 seconds elapsed
  });

  it('continues countdown from loaded remaining time', async () => {
    mockCalculateUserTime.mockReturnValue(ONE_MINUTE);
    AsyncStorage.getItem.mockResolvedValueOnce(
      JSON.stringify({time: 80, timestamp: new Date().getTime() - 10000}),
    );

    const TestComponent = () => {
      const [isCountdownRunning, setIsCountdownRunning] = useState(false);

      const handleStart = () => {
        mockOnStart();
        setIsCountdownRunning(true);
      };
      const handleStop = () => {
        mockOnStop();
        setIsCountdownRunning(false);
      };

      return (
        <Countdown
          calculateUserTime={mockCalculateUserTime}
          resetInputs={mockResetInputs}
          onStart={handleStart}
          onStop={handleStop}
          isCountdownRunning={isCountdownRunning}
        />
      );
    };
    const {getByText} = render(<TestComponent />);

    await waitFor(() => expect(getByText('00:01:10')).toBeTruthy());

    fireEvent.press(getByText('Start'));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(getByText('00:02:09')).toBeTruthy();
  });

  it('saves remaining time on stop', async () => {
    mockCalculateUserTime.mockReturnValue(ONE_MINUTE);

    const TestComponent = () => {
      const [isCountdownRunning, setIsCountdownRunning] = useState(false);

      const handleStart = () => {
        mockOnStart();
        setIsCountdownRunning(true);
      };
      const handleStop = () => {
        mockOnStop();
        setIsCountdownRunning(false);
      };

      return (
        <Countdown
          calculateUserTime={mockCalculateUserTime}
          resetInputs={mockResetInputs}
          onStart={handleStart}
          onStop={handleStop}
          isCountdownRunning={isCountdownRunning}
        />
      );
    };
    const {getByText} = render(<TestComponent />);

    fireEvent.press(getByText('Start'));

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    fireEvent.press(getByText('Pause'));

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'remainingTime',
      expect.stringMatching(/{"time":57,"timestamp":[0-9]+}/),
    );
  });

  it('saves remaining time on start', async () => {
    mockCalculateUserTime.mockReturnValue(ONE_MINUTE);
    const {getByText} = render(
      <Countdown
        calculateUserTime={mockCalculateUserTime}
        resetInputs={mockResetInputs}
        onStart={mockOnStart}
        onStop={mockOnStop}
        isCountdownRunning={false}
      />,
    );

    fireEvent.press(getByText('Start'));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'remainingTime',
      expect.stringMatching(/{"time":59,"timestamp":[0-9]+}/),
    );
  });

  it('does not stop the countdown when Stop button is pressed but time is 0', () => {
    const {getByText} = render(
      <Countdown
        calculateUserTime={mockCalculateUserTime}
        resetInputs={mockResetInputs}
        onStart={mockOnStart}
        onStop={mockOnStop}
        isCountdownRunning={true}
      />,
    );

    fireEvent.press(getByText('Pause'));

    expect(mockOnStop).not.toHaveBeenCalled();
    expect(getByText('00:00:00')).toBeTruthy();
  });

  it('resets the countdown when the Reset button is pressed', () => {
    mockCalculateUserTime.mockReturnValue(ONE_MINUTE);
    const {getByText} = render(
      <Countdown
        calculateUserTime={mockCalculateUserTime}
        resetInputs={mockResetInputs}
        onStart={mockOnStart}
        onStop={mockOnStop}
        isCountdownRunning={false}
      />,
    );

    fireEvent.press(getByText('Start'));

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    fireEvent.press(getByText('Reset'));

    expect(mockOnStop).toHaveBeenCalled();
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'remainingTime',
      expect.stringMatching(/{"time":0,"timestamp":[0-9]+}/),
    );
    expect(getByText('00:00:00')).toBeTruthy();
  });
});
