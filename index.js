// Navigation.registerComponent('com.myApp.WelcomeScreen', () => App);
// Navigation.events().registerAppLaunchedListener(() => {
//   Navigation.setRoot({
//     root: {
//       stack: {
//         children: [
//           {
//             component: {
//               name: 'com.myApp.WelcomeScreen',
//               options: {
//                 topBar: {
//                   title: {
//                     text: 'Home',
//                     color: 'white',
//                   },
//                   background: {
//                     color: '#4d089a',
//                   },
//                 },
//               },
//             },
//           },
//         ],
//       },
//     },
//   });
// });
// index.js
import {Navigation} from 'react-native-navigation';
import {registerScreens} from './app/screens';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Initializing',
      },
    },
  });
});
console.disableYellowBox = true;
