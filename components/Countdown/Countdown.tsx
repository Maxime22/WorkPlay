import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {styles} from './Countdown.style.ts';
import {loadRemainingTime, saveRemainingTime} from '../../utils/TimeUtils.ts';

type CountdownProps = {
  calculateUserTime: () => number;
  resetInputs: () => void;
  onStart: () => void;
  onStop: () => void;
  isCountdownRunning: boolean;
};

export const Countdown = ({
  calculateUserTime,
  resetInputs,
  onStart,
  onStop,
  isCountdownRunning,
}: CountdownProps) => {
  const [time, setTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    const initializeCountdown = async () => {
      const loadedTime = await loadRemainingTime();
      if (loadedTime !== null && loadedTime > 0) {
        setRemainingTime(loadedTime);
      }
    };

    initializeCountdown();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  function startCountdown() {
    const userTime = calculateUserTime() * 60;
    const totalTime = userTime + remainingTime;
    if (totalTime > 0) {
      resetInputs();
      setTime(totalTime);
      setRemainingTime(0);
      onStart();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          if (prevTime === 0) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            saveRemainingTime(0);
            return 0;
          }
          saveRemainingTime(prevTime - 1);
          return prevTime - 1;
        });
      }, 1000);
    }
  }

  function stopCountdown() {
    if (time > 0) {
      setRemainingTime(time);
      saveRemainingTime(time);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      onStop();
    }
  }

  function resetCountdown() {
    setRemainingTime(0);
    saveRemainingTime(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTime(0);
    onStop();
  }

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.countdownContainer}>
      <Text style={styles.countdownText}>
        {formatTime(isCountdownRunning ? time : remainingTime)}
      </Text>
      <View style={styles.startAndStopButtonContainer}>
        {isCountdownRunning ? (
          <TouchableOpacity style={styles.stopButton} onPress={stopCountdown}>
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.startButton} onPress={startCountdown}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.resetButton} onPress={resetCountdown}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
