import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { Countdown } from '../../../components/Countdown/Countdown.tsx';

jest.useFakeTimers();

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
    });

    it('displays initial time as 00:00:00', () => {
        const { getByText } = render(
            <Countdown calculateUserTime={mockCalculateUserTime} resetInputs={mockResetInputs} onStart={mockOnStart} onStop={mockOnStop} />
        );
        expect(getByText('00:00:00')).toBeTruthy();
    });

    it('starts the countdown when the Start button is pressed', () => {
        mockCalculateUserTime.mockReturnValue(1); // Return 1 minute for testing
        const { getByText } = render(
            <Countdown calculateUserTime={mockCalculateUserTime} resetInputs={mockResetInputs} onStart={mockOnStart} onStop={mockOnStop} />
        );

        fireEvent.press(getByText('Start'));

        expect(mockCalculateUserTime).toHaveBeenCalled();
        expect(mockResetInputs).toHaveBeenCalled();
        expect(mockOnStart).toHaveBeenCalled();

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(getByText('00:00:59')).toBeTruthy();
    });

    it('stops the countdown when the Stop button is pressed', () => {
        mockCalculateUserTime.mockReturnValue(1); // Return 1 minute for testing
        const { getByText } = render(
            <Countdown calculateUserTime={mockCalculateUserTime} resetInputs={mockResetInputs} onStart={mockOnStart} onStop={mockOnStop} />
        );

        fireEvent.press(getByText('Start'));

        act(() => {
            jest.advanceTimersByTime(3000);
        });

        fireEvent.press(getByText('Stop'));

        expect(mockOnStop).toHaveBeenCalled();
        expect(getByText('00:00:00')).toBeTruthy();
    });

    it('formats the time correctly', () => {
        mockCalculateUserTime.mockReturnValue(61); // Return 1 minute for testing

        const { getByText } = render(
            <Countdown calculateUserTime={mockCalculateUserTime} resetInputs={mockResetInputs} onStart={mockOnStart} onStop={mockOnStop} />
        );

        fireEvent.press(getByText('Start'));

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(getByText('01:00:59')).toBeTruthy(); // Check formatted time
    });
});
