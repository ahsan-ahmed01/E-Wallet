import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export default function CustomSpinner({
  loading,
  textContent = 'Loading...',
  color = 'blue',
  size,
}) {
  return (
    <Spinner
      visible={loading}
      textContent={textContent}
      textStyle={styles.spinnerTextStyle}
      color={color}
      overlayColor={'rgba(255,255,255,1)'}
      customIndicator={<ActivityIndicator size={size} color="#0000ff" />}
    />
  );
}
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#000',
  },
});
