import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { Countdown } from '../../../components/Countdown/Countdown.tsx';

jest.useFakeTimers();

describe('Countdown Component', () => {
    const mockCalculateUserTime = jest.fn();
    const mockResetInputs = jest.fn();

    beforeEach(() => {
        mockCalculateUserTime.mockClear();
        mockResetInputs.mockClear();
    });

    it('displays initial time as 00:00:00', () => {
        const { getByText } = render(
            <Countdown calculateUserTime={mockCalculateUserTime} resetInputs={mockResetInputs} />
        );
        expect(getByText('00:00:00')).toBeTruthy();
    });

    it('starts the countdown when the Start button is pressed', () => {
        mockCalculateUserTime.mockReturnValue(1); // Return 1 minute for testing
        const { getByText } = render(
            <Countdown calculateUserTime={mockCalculateUserTime} resetInputs={mockResetInputs} />
        );

        fireEvent.press(getByText('Start'));

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(getByText('00:59:59')).toBeTruthy();
    });

    it('stops the countdown when the Stop button is pressed', () => {
        mockCalculateUserTime.mockReturnValue(1); // Return 1 minute for testing
        const { getByText } = render(
            <Countdown calculateUserTime={mockCalculateUserTime} resetInputs={mockResetInputs} />
        );

        fireEvent.press(getByText('Start'));

        act(() => {
            jest.advanceTimersByTime(3000);
        });

        fireEvent.press(getByText('Stop'));

        expect(getByText('00:00:00')).toBeTruthy();
    });

    it('formats the time correctly', () => {
        const { getByText } = render(
            <Countdown calculateUserTime={mockCalculateUserTime} resetInputs={mockResetInputs} />
        );

        act(() => {
            jest.advanceTimersByTime(3661000); // Advance by 1 hour, 1 minute and 1 second
        });

        expect(getByText('01:01:01')).toBeTruthy(); // Check formatted time
    });
});
