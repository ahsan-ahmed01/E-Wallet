import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';

import {Content, Button, Text} from 'native-base';
const RoundedButton = ({handleClick, text}) => {
  return (
    <TouchableOpacity>
      <Button rounded onPress={handleClick}>
        <Text>{text}</Text>
      </Button>
    </TouchableOpacity>
  );
};

export default RoundedButton;
