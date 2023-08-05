import {AppRegistry} from 'react-native';
// import messaging from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';

// Background mode:
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Message handled in the background!', remoteMessage);
// });

// messaging().onNotificationOpenedApp(async remoteMessage => {
//     console.log('Message handled in the background!', remoteMessage.notification);
// });

// Kill mode
// messaging().getInitialNotification(async remoteMessage => {
//     console.log('Message handled in the kill!', remoteMessage);
// });

AppRegistry.registerComponent(appName, () => App);
