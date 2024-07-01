import PushNotification from 'react-native-push-notification';

export function PushMyNotification(delayInSeconds: number) {
  if (delayInSeconds < 0) {
    throw new Error('Delay must be a positive number in seconds.');
  }

  PushNotification.localNotificationSchedule({
    channelId: 'default-channel-id',
    message: 'Fin de jeu',
    date: new Date(Date.now() + delayInSeconds * 1000),
    allowWhileIdle: false,
    repeatTime: 1,
  });
}
