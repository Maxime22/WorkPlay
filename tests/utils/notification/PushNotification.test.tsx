import PushNotification from 'react-native-push-notification';
import {
  ScheduleNotification,
  ScheduleAlarm,
} from '../../../utils/notification/PushNotification';

// Mock PushNotification.localNotificationSchedule to track calls
jest.mock('react-native-push-notification', () => ({
  localNotificationSchedule: jest.fn(),
  createChannel: jest.fn(),
  configure: jest.fn(),
  cancelLocalNotification: jest.fn(),
  cancelAllLocalNotifications: jest.fn(),
}));

describe('ScheduleNotification', () => {
  it('should schedule a local notification after 10 seconds', () => {
    const delayInSeconds = 10;
    ScheduleNotification(delayInSeconds);

    expect(PushNotification.localNotificationSchedule).toHaveBeenCalledWith(
      expect.objectContaining({
        channelId: 'default-notification-channel-id',
        message: 'Fin de jeu',
        allowWhileIdle: false,
        playSound: true,
        soundName: 'default',
        importance: 'default',
        vibrate: false,
      }),
    );
  });
});

describe('ScheduleAlarm', () => {
  it('should schedule a local alarm after 10 seconds', () => {
    const delayInSeconds = 10;
    ScheduleAlarm(delayInSeconds);

    expect(PushNotification.localNotificationSchedule).toHaveBeenCalledWith(
      expect.objectContaining({
        channelId: 'alarm-notification-channel-id',
        message: 'Your alarm is ringing!',
        allowWhileIdle: true,
        playSound: true,
        soundName: 'alarm_sound',
        importance: 'high',
        vibrate: true,
      }),
    );
  });
});
