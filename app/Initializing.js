import React from 'react';
import {View, Text, StyleSheet, AsyncStorage} from 'react-native';

import {goToAuth, goHome} from './NavInit';
import {USER_KEY} from './config/config';
import CustomSpinner from './components/common/Spinner';
//********* Initialization of Application ********/
console.log('Done Initializing App');

export default class Initialising extends React.Component {
  state = {
    loading: false,
  };
  async componentDidMount() {
    this.setState({loading: true});
    setTimeout(async () => {
      try {
        const user = await AsyncStorage.getItem(USER_KEY);
        console.log('user: ', user);
        if (user) {
          goHome();
        } else {
          goToAuth();
        }
      } catch (err) {
        console.log('error: ', err);
        goToAuth();
      } finally {
        this.setState({loading: false});
      }
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomSpinner loading={this.state.loading} size={'large'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});
