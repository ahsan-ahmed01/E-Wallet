import React, {Component} from 'react';
import {Platform, AppState, AppRegistry} from 'react-native';
import {Navigation} from 'react-native-navigation';
// import {registerScreens} from './screens';
// import Entypo from 'react-native-vector-icons/Entypo';
// import Ionic from 'react-native-vector-icons/Ionicons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const goToAuth = () =>
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'BottomTabsId',
        children: [
          {
            component: {
              name: 'SignIn',
              options: {
                bottomTab: {
                  fontSize: 12,
                  text: 'Sign In',
                  //   icon: require('./signin.png'),
                },
              },
            },
          },
          {
            component: {
              name: 'SignUp',
              options: {
                bottomTab: {
                  text: 'Sign Up',
                  fontSize: 12,
                  //   icon: require('./signup.png'),
                },
              },
            },
          },
        ],
      },
    },
  });

export const goHome = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: 'App',
        children: [
          {
            component: {
              name: 'Home',
            },
          },
        ],
      },
    },
  });
