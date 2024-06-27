import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification: function (notification) {
    console.log('LOCAL NOTIFICATION ==>', notification);
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios', // par la magie du saint esprit cela règle le pb sur Android du Firebase not initialisé
});
