import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, Left, Body, Right, Title} from 'native-base';

const HeaderApp = ({title}) => {
  return (
    <View>
      <Header>
        <Left />
        <Body style={styles.title}>
          <Title>{title}</Title>
        </Body>
        <Right />
      </Header>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {},
});

export default HeaderApp;
