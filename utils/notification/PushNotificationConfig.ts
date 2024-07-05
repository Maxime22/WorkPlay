import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios', // solved Firebase not itinialized problem
});

// Create a channel for notifications
PushNotification.createChannel(
  {
    channelId: 'default-notification-channel-id',
    channelName: 'Default Notification Channel',
    channelDescription: 'A channel for default notifications',
    playSound: true,
    soundName: 'default', // Use system default sound
    importance: 3, // IMPORTANCE_DEFAULT
    vibrate: true,
  },
  () => {},
);

// Create a channel for alarms
PushNotification.createChannel(
  {
    channelId: 'alarm-notification-channel-id',
    channelName: 'Alarm Notification Channel',
    channelDescription: 'A channel for alarm notifications',
    playSound: true,
    soundName: 'alarm_sound', // Custom sound file name without extension
    importance: 4, // IMPORTANCE_HIGH
    vibrate: true,
  },
  () => {},
);
