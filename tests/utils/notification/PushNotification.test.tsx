// utils/PushNotification.test.js

import PushNotification from 'react-native-push-notification';
import {PushMyNotification} from '../../../utils/notification/PushNotification';

// Mock PushNotification.localNotificationSchedule to track calls
jest.mock('react-native-push-notification', () => ({
  localNotificationSchedule: jest.fn(),
}));

describe('PushMyNotification', () => {
  it('should schedule a local notification after 10 seconds', () => {
    PushMyNotification(10);

    // Verify that localNotificationSchedule was called with the correct parameters
    expect(PushNotification.localNotificationSchedule).toHaveBeenCalledWith({
      channelId: 'default-channel-id',
      message: 'Fin de jeu',
      date: expect.any(Date),
      allowWhileIdle: false,
      repeatTime: 1,
    });
  });
});
