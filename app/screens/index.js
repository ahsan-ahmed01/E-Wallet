'use strict';
import {Navigation} from 'react-native-navigation';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import Initializing from './../Initializing';
import Screen2 from './Screen2';

export function registerScreens() {
  console.log('Registering Screens');
  Navigation.registerComponent('Initializing', () => Initializing);
  Navigation.registerComponent('Screen2', () => Screen2);
  Navigation.registerComponent('SignIn', () => SignIn);
  Navigation.registerComponent('SignUp', () => SignUp);
  Navigation.registerComponent('Home', () => Home);
}
