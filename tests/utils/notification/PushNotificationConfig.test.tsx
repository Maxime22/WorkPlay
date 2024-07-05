import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

// Mock the PushNotification library
jest.mock('react-native-push-notification', () => ({
  configure: jest.fn(),
  createChannel: jest.fn(),
}));

describe('PushNotificationConfig', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
  });

  it('should configure PushNotification correctly', () => {
    require('../../../utils/notification/PushNotificationConfig.ts');

    expect(PushNotification.configure).toHaveBeenCalledWith({
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });
  });
});
