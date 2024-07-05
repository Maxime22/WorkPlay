import PushNotification from 'react-native-push-notification';

export function ScheduleNotification(delayInSeconds: number) {
  if (delayInSeconds < 0) {
    throw new Error('Delay must be a positive number in seconds.');
  }

  PushNotification.localNotificationSchedule({
    channelId: 'default-notification-channel-id',
    message: 'Fin de jeu',
    date: new Date(Date.now() + delayInSeconds * 1000),
    allowWhileIdle: false,
    playSound: true,
    soundName: 'default', // Use system default sound
    importance: 'default',
    vibrate: false,
  });
}

export function ScheduleAlarm(delayInSeconds: number) {
  if (delayInSeconds < 0) {
    throw new Error('Delay must be a positive number in seconds.');
  }

  PushNotification.localNotificationSchedule({
    channelId: 'alarm-notification-channel-id',
    message: 'Your alarm is ringing!',
    date: new Date(Date.now() + delayInSeconds * 1000),
    allowWhileIdle: true,
    playSound: true,
    soundName: 'alarm_sound', // Custom sound file name without extension
    importance: 'high',
    vibrate: true,
  });
}
