import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  /*
  onNotification: function (notification) {
    // Do something
  },
  */
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios', // solved Firebase not itinialized problem
});
