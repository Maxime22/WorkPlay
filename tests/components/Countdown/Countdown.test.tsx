import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { Countdown } from '../../../components/Countdown/Countdown.tsx';

jest.useFakeTimers();

describe('Countdown Component', () => {
    it('displays initial time as 00:00:00', () => {
        const { getByText } = render(<Countdown />);
        expect(getByText('00:00:00')).toBeTruthy();
    });

    it('starts the countdown when the Start button is pressed', () => {
        const { getByText } = render(<Countdown />);

        fireEvent.press(getByText('Start'));

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(getByText('00:59:59')).toBeTruthy();
    });

    it('stops the countdown when the Stop button is pressed', () => {
        const { getByText } = render(<Countdown />);

        fireEvent.press(getByText('Start'));

        act(() => {
            jest.advanceTimersByTime(3000);
        });

        fireEvent.press(getByText('Stop'));

        expect(getByText('00:00:00')).toBeTruthy();
    });
});
