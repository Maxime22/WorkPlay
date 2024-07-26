import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  countdownContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  countdownText: {
    fontSize: 60,
  },
  startAndStopButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 16,
  },
  startButton: {
    width: 120,
    height: 60,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopButton: {
    width: 120,
    height: 60,
    backgroundColor: '#aa6f73',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButton: {
    width: 120,
    height: 60,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  remainingTimeText: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
});
