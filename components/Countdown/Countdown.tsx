import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles} from './Countdown.style.ts';

export const Countdown = () => {
  const [time, setTime] = useState(0);

  function startCountdown() {
    setTime(10);
    const interval = setInterval(() => {
      setTime(prevTime => {
        if (prevTime === 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  }

  function stopCountdown() {
    setTime(0);
  }

  return (
    <View>
      <Text style={styles.countdownText}>{time}</Text>
      <TouchableOpacity style={styles.button} onPress={startCountdown}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={stopCountdown}>
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>
    </View>
  );
};
