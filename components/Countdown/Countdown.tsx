import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { styles } from './Countdown.style.ts';

type CountdownProps = {
  calculateUserTime: () => number;
  resetInputs: () => void;
};
export const Countdown = ({calculateUserTime, resetInputs}:CountdownProps) => {
  const [time, setTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  function startCountdown() {
    const userTime = calculateUserTime();
    resetInputs();
    setTime(userTime * 60); // Suppose that userTime is in minutes, convert to seconds
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setTime(prevTime => {
        if (prevTime === 0) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  }

  function stopCountdown() {
    setTime(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
      <View style={styles.countdownContainer}>
        <Text style={styles.countdownText}>{formatTime(time)}</Text>
        <View style={styles.startAndStopButtonContainer} >
        <TouchableOpacity style={styles.startButton} onPress={startCountdown}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stopButton} onPress={stopCountdown}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      </View>
      </View>
  );
};
